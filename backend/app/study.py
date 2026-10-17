"""Study sessions: FSRS decides which card comes next and when each one returns."""

from dataclasses import dataclass
from datetime import UTC, datetime, timedelta

from fsrs import Card as FsrsCard
from fsrs import Rating, Scheduler
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import Card, Deck, Profile, ReviewState

NEW_CARDS_PER_DAY = 10
RATINGS = {"again": Rating.Again, "hard": Rating.Hard, "good": Rating.Good, "easy": Rating.Easy}

scheduler = Scheduler()


@dataclass
class Queue:
    next_card: Card | None
    due: int
    new: int
    # When the next card comes back, if nothing is due right now.
    next_due: datetime | None


def _studyable(profile: Profile, deck_ids: list[int] | None = None):
    # Cards that failed a check or were marked bad are not studied.
    condition = (Card.profile_id == profile.id) & (Card.status == "active")
    if deck_ids:
        # Only the decks the learner chose for this session.
        condition &= Card.decks.any(Deck.id.in_(deck_ids))
    return condition


def _new_budget(db: Session, profile: Profile, now: datetime) -> int:
    day_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    started = db.scalar(
        select(func.count())
        .select_from(ReviewState)
        .join(Card)
        .where(Card.profile_id == profile.id, ReviewState.started_at >= day_start)
    )
    return max(NEW_CARDS_PER_DAY - (started or 0), 0)


def queue(db: Session, profile: Profile, now: datetime, deck_ids: list[int] | None = None) -> Queue:
    due_query = (
        select(Card)
        .join(ReviewState)
        .where(_studyable(profile, deck_ids), ReviewState.due <= now)
        .order_by(ReviewState.due)
    )
    due_cards = db.scalars(due_query).all()
    new_cards = db.scalars(
        select(Card)
        .outerjoin(ReviewState)
        .where(_studyable(profile, deck_ids), ReviewState.card_id.is_(None))
        .order_by(Card.position, Card.id)
        .limit(_new_budget(db, profile, now))
    ).all()
    next_due = None
    if not due_cards and not new_cards:
        next_due = db.scalar(
            select(func.min(ReviewState.due)).join(Card).where(_studyable(profile, deck_ids))
        )
    first = (due_cards or new_cards or [None])[0]
    return Queue(next_card=first, due=len(due_cards), new=len(new_cards), next_due=next_due)


def today(db: Session, profile: Profile, now: datetime) -> tuple[int, int]:
    """How many new cards the learner started today, and how many reviews of older cards."""
    day_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
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


def _state(card: Card) -> FsrsCard:
    return FsrsCard.from_dict(card.review.fsrs) if card.review else FsrsCard()


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
    review_state.fsrs = updated.to_dict()
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
