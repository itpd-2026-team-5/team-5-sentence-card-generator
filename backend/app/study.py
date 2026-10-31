"""Study sessions: FSRS decides which card comes next and when each one returns."""

from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from typing import cast

from fsrs import Card as FsrsCard
from fsrs import Rating, Scheduler
from fsrs.card import CardDict
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import Card, Deck, Profile, ReviewState

RATINGS = {"again": Rating.Again, "hard": Rating.Hard, "good": Rating.Good, "easy": Rating.Easy}
# FSRS states: a card being learned or relearned comes back within the same day.
LEARNING, REVIEW, RELEARNING = 1, 2, 3

scheduler = Scheduler()


@dataclass
class Queue:
    next_card: Card | None
    # Left in this session: new cards, reviews from earlier days, and cards to see again today.
    new: int
    review: int
    again: int
    # When the next card comes back, if nothing is due right now.
    next_due: datetime | None


def _day_start(now: datetime) -> datetime:
    return now.replace(hour=0, minute=0, second=0, microsecond=0)


def _studyable(card: Card) -> bool:
    # Cards that failed a check or were archived are not studied.
    return card.status == "active"


def _chosen_decks(db: Session, profile: Profile, deck_ids: list[int] | None) -> list[Deck]:
    query = select(Deck).where(Deck.profile_id == profile.id).order_by(Deck.position, Deck.id)
    decks = db.scalars(query).all()
    return [d for d in decks if d.id in deck_ids] if deck_ids else list(decks)


def queue(db: Session, profile: Profile, now: datetime, deck_ids: list[int] | None = None) -> Queue:
    """The session over the chosen decks. Each deck adds at most its daily number of new
    cards and of reviews; cards being learned or relearned today come back without a limit."""
    day_start = _day_start(now)
    seen: set[int] = set()
    again: list[Card] = []
    review: list[Card] = []
    new: list[Card] = []
    upcoming: list[datetime] = []
    for deck in _chosen_decks(db, profile, deck_ids):
        cards = [c for c in deck.cards if _studyable(c)]
        started_today = sum(
            1 for c in cards if c.review and _aware(c.review.started_at) >= day_start
        )
        reviewed_today = sum(
            1
            for c in cards
            if c.review
            and c.review.reviewed_at
            and _aware(c.review.reviewed_at) >= day_start
            and _aware(c.review.started_at) < day_start
        )
        new_left = max(deck.new_per_day - started_today, 0)
        reviews_left = max(deck.reviews_per_day - reviewed_today, 0)
        for card in sorted(cards, key=lambda c: (c.position, c.id)):
            if card.id in seen:
                continue
            state = card.review
            if state is None:
                if new_left:
                    new.append(card)
                    new_left -= 1
                    seen.add(card.id)
                continue
            if _aware(state.due) > now:
                upcoming.append(_aware(state.due))
                continue
            if state.fsrs.get("state") in (LEARNING, RELEARNING):
                again.append(card)
                seen.add(card.id)
            elif reviews_left:
                review.append(card)
                reviews_left -= 1
                seen.add(card.id)
    again.sort(key=_due)
    review.sort(key=_due)
    first = next(iter(again or review or new), None)
    next_due = min(upcoming) if first is None and upcoming else None
    return Queue(first, len(new), len(review), len(again), next_due)


def _aware(moment: datetime) -> datetime:
    # SQLite returns naive datetimes; they are stored in UTC.
    return moment if moment.tzinfo else moment.replace(tzinfo=UTC)


def today(db: Session, profile: Profile, now: datetime) -> tuple[int, int]:
    """How many new cards the learner started today, and how many reviews of older cards."""
    day_start = _day_start(now)
    reviewed = (Card.profile_id == profile.id) & (ReviewState.reviewed_at >= day_start)
    new = db.scalar(
        select(func.count())
        .select_from(ReviewState)
        .join(Card)
        .where(reviewed, ReviewState.started_at >= day_start)
    )
    old = db.scalar(
        select(func.count())
        .select_from(ReviewState)
        .join(Card)
        .where(reviewed, ReviewState.started_at < day_start)
    )
    return new or 0, old or 0


def _due(card: Card) -> datetime:
    assert card.review is not None
    return card.review.due


def _state(card: Card) -> FsrsCard:
    return FsrsCard.from_dict(cast(CardDict, card.review.fsrs)) if card.review else FsrsCard()


def format_interval(delta: timedelta) -> str:
    seconds = max(int(delta.total_seconds()), 0)
    if seconds < 3600:
        return f"{max(seconds // 60, 1)} min"
    if seconds < 86400:
        return f"{seconds // 3600} h"
    days = round(seconds / 86400)
    if days < 30:
        return f"{days} d"
    if days < 365:
        return f"{round(days / 30)} mo"
    return f"{round(days / 365, 1)} y"


def preview(card: Card, now: datetime) -> dict[str, str]:
    """How long until the card returns, for each rating, without saving anything."""
    state = _state(card)
    return {
        name: format_interval(scheduler.review_card(state, rating, now)[0].due - now)
        for name, rating in RATINGS.items()
    }


def review(db: Session, card: Card, rating: str, too_hard: bool, now: datetime) -> ReviewState:
    updated, _ = scheduler.review_card(_state(card), RATINGS[rating], now)
    if card.review is None:
        card.review = ReviewState(
            fsrs=updated.to_dict(),
            due=updated.due,
            started_at=now,
            reps=0,
            lapses=0,
            too_hard=False,
        )
    review_state = card.review
    review_state.fsrs = dict(updated.to_dict())
    review_state.due = updated.due
    review_state.reps += 1
    review_state.reviewed_at = now
    if rating == "again":
        review_state.lapses += 1
    review_state.too_hard = too_hard
    db.commit()
    return review_state


def now_utc() -> datetime:
    return datetime.now(UTC)
