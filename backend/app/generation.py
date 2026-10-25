"""The per-learner context pipeline: build one request for a batch of words, check every sentence."""

import json

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.llm import LLMError, LLMProvider
from app.models import Card, Deck, GenerationLog, Profile, ReviewState, SourceText, TextWord
from app.tokenize import context_for, split_words, tokenize

LANGUAGES = {"en": "English", "de": "German", "ru": "Russian"}
MAX_KNOWN_WORDS = 150
BATCH_SIZE = 20
# A sentence that fails a check is rewritten, with the check's findings, up to this many
# times in all; one that still fails is kept as "failed a check" so the learner can fix it.
MAX_ATTEMPTS = 3
DEFAULT_LEVEL = "A2"

SYSTEM = """You write example sentences for a language learner's flashcards.
For each word, write one new sentence in the target language that uses the word with the same meaning it has in its source sentence; the context around the source sentence tells you which meaning that is.
Never copy the source sentence or its context.
Write for the learner's level, and build the sentence from words the learner already knows where you can.
Never use a word from the avoid list.
Keep every sentence within the given word count and character bounds.
Follow the deck's instructions, if there are any, for the topic and the style.
Translate each sentence into the learner's known language.
In word_form, give the exact form of the word as it appears in your sentence.
In highlight, give the exact part of your sentence to highlight for the learner: the word form, and for a German noun its article right before it as well, such as "der Bahnsteig".
In word_translation, translate the word as it is used in your sentence, in one to three words of the learner's known language.
If too_hard_examples are given, the learner found those sentences too hard: write simpler ones, with shorter and more common words.
If a word comes with a rejected sentence and feedback, write a different sentence that fixes what the feedback says.
If a word comes with existing_sentences, write a sentence that is clearly different from all of them."""

CARD_SCHEMA = {
    "type": "object",
    "properties": {
        "cards": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "word": {"type": "string"},
                    "word_form": {"type": "string"},
                    "highlight": {"type": "string"},
                    "word_translation": {"type": "string"},
                    "sentence": {"type": "string"},
                    "translation": {"type": "string"},
                },
                "required": [
                    "word",
                    "word_form",
                    "highlight",
                    "word_translation",
                    "sentence",
                    "translation",
                ],
                "additionalProperties": False,
            },
        }
    },
    "required": ["cards"],
    "additionalProperties": False,
}


def learner_vocabulary(db: Session, profile_id: int) -> tuple[list[str], list[str]]:
    """Words the learner knows (in their texts but not picked) and words to avoid (marked ignore)."""
    texts = db.scalars(select(SourceText).where(SourceText.profile_id == profile_id)).all()
    marked = {(w.word.lower(), w.status) for t in texts for w in t.words}
    learning = {word for word, status in marked if status == "learn"}
    avoid = sorted({word for word, status in marked if status == "ignore"})
    known: list[str] = []
    seen = learning | set(avoid)
    for text in texts:
        for sentence in tokenize(text.body):
            for word in sentence["words"]:
                lower = word.lower()
                if lower not in seen:
                    seen.add(lower)
                    known.append(lower)
    return known[:MAX_KNOWN_WORDS], avoid


def too_hard_examples(db: Session, profile_id: int, limit: int = 5) -> list[str]:
    """The learner's most recent sentences that they flagged as too hard while studying."""
    return list(
        db.scalars(
            select(Card.sentence)
            .join(ReviewState)
            .where(Card.profile_id == profile_id, ReviewState.too_hard.is_(True))
            .order_by(ReviewState.reviewed_at.desc())
            .limit(limit)
        )
    )


def deck_level(profile: Profile, deck: Deck) -> str:
    """The deck's own level, or the learner's level in the deck's target language."""
    return deck.level or (profile.levels or {}).get(deck.target_language) or DEFAULT_LEVEL


def build_prompt(
    profile: Profile,
    deck: Deck,
    words: list[dict],
    known: list[str],
    avoid: list[str],
    hard: list[str],
    instructions: str | None = None,
) -> str:
    request = {
        "target_language": LANGUAGES[deck.target_language],
        "known_language": LANGUAGES[deck.known_language],
        "level": deck_level(profile, deck),
        "deck_instructions": deck.instructions if instructions is None else instructions,
        "sentence_length_in_words": [profile.sentence_min_words, profile.sentence_max_words],
        "sentence_min_characters": profile.sentence_min_chars or None,
        "sentence_max_characters": profile.sentence_max_chars or None,
        "known_words": known,
        "avoid_words": avoid,
        "too_hard_examples": hard,
        "words": words,
    }
    return "Write one card for each word in this request.\n" + json.dumps(
        request, ensure_ascii=False
    )


def check_card(card: dict, profile: Profile, avoid: list[str]) -> list[str]:
    problems = []
    tokens = [t.lower() for t in split_words(card["sentence"])]
    if card["word_form"].lower() not in tokens:
        problems.append(f'"{card["word_form"]}" does not appear in the sentence')
    if not profile.sentence_min_words <= len(tokens) <= profile.sentence_max_words:
        problems.append(
            f"{len(tokens)} words, outside {profile.sentence_min_words}"
            f"-{profile.sentence_max_words}"
        )
    length = len(card["sentence"])
    if profile.sentence_min_chars and length < profile.sentence_min_chars:
        problems.append(f"{length} characters, under {profile.sentence_min_chars}")
    if profile.sentence_max_chars and length > profile.sentence_max_chars:
        problems.append(f"{length} characters, over {profile.sentence_max_chars}")
    used = sorted(set(avoid) & set(tokens))
    if used:
        problems.append("uses avoided words: " + ", ".join(used))
    return problems


def _highlight(r: dict) -> str:
    """The span to highlight, if the model gave one that is really in the sentence."""
    span = (r.get("highlight") or "").strip()
    return span if span and span.lower() in r["sentence"].lower() else r["word_form"]


def _next_position(db: Session, profile: Profile) -> int:
    return (
        db.scalar(select(func.max(Card.position)).where(Card.profile_id == profile.id)) or 0
    ) + 1


def _same_card_exists(deck: Deck, word: TextWord) -> bool:
    """A card for the same word, from the same sentence, is already in this deck. The same
    word in another meaning, or in another deck, still gets its own card."""
    return any(
        card.word.lower() == word.word.lower() and card.source_sentence == word.sentence
        for card in deck.cards
    )


def generate_cards(
    db: Session, provider: LLMProvider, profile: Profile, text: SourceText, deck: Deck
) -> list[Card]:
    """Generate cards into a deck for the words marked to learn in a text that it has no card
    for yet."""
    pending = [w for w in text.words if w.status == "learn" and not _same_card_exists(deck, w)]
    known, avoid = learner_vocabulary(db, profile.id)
    cards: list[Card] = []
    position = _next_position(db, profile)

    for start in range(0, len(pending), BATCH_SIZE):
        batch = pending[start : start + BATCH_SIZE]
        by_word = {w.word.lower(): w for w in batch}
        items = [_item(w) for w in batch]
        results = _with_retries(db, provider, profile, deck, items, known, avoid)
        for r in results:
            source = by_word.pop(r["word"].lower(), None)
            if source is None:
                continue
            card = _new_card(profile, text, source.word, source.sentence, source.context, r)
            card.instructions = deck.instructions
            card.position = position + len(cards)
            card.decks.append(deck)
            db.add(card)
            cards.append(card)
    db.commit()
    return cards


def _item(word: TextWord) -> dict:
    return {
        "word": word.word,
        "source_sentence": word.sentence,
        "context": word.context or word.sentence,
    }


def _with_retries(db, provider, profile, deck, items, known, avoid, instructions=None):
    """Ask for the cards, then rewrite each one that failed a check, telling the model what
    failed, until it passes or the attempts run out. A learner's own key runs in the browser,
    which sends one request at a time, so there the first answer is final."""
    results = _request(db, provider, profile, deck, items, known, avoid, instructions)
    attempts = MAX_ATTEMPTS if getattr(provider, "retries", True) else 1
    for _ in range(attempts - 1):
        failed = [r for r in results if r["problems"]]
        if not failed:
            break
        by_word = {i["word"].lower(): i for i in items}
        retry = [
            {
                **by_word[r["word"].lower()],
                "rejected_sentence": r["sentence"],
                "feedback": "It failed these checks: " + "; ".join(r["problems"]),
            }
            for r in failed
            if r["word"].lower() in by_word
        ]
        if not retry:
            break
        fixed = {
            r["word"].lower(): r
            for r in _request(db, provider, profile, deck, retry, known, avoid, instructions)
        }
        results = [fixed.get(r["word"].lower(), r) if r["problems"] else r for r in results]
    return results


def more_cards(
    db: Session, provider: LLMProvider, profile: Profile, card: Card, count: int
) -> list[Card]:
    """More cards for the same word, each with a new sentence, in the same decks.
    Each card keeps its own review progress."""
    known, avoid = learner_vocabulary(db, profile.id)
    siblings = db.scalars(
        select(Card.sentence).where(Card.profile_id == profile.id, Card.word == card.word)
    ).all()
    item = {
        "word": card.word,
        "source_sentence": card.source_sentence,
        "context": card.context or card.source_sentence,
        "existing_sentences": list(siblings),
    }
    deck = card.decks[0]
    results = _request(db, provider, profile, deck, [item] * count, known, avoid, card.instructions)
    position = _next_position(db, profile)
    cards = []
    for r in results[:count]:
        new = _new_card(profile, None, card.word, card.source_sentence, card.context, r)
        new.text_id, new.text_title = card.text_id, card.text_title
        new.instructions = card.instructions
        new.position = position + len(cards)
        new.decks.extend(card.decks)
        db.add(new)
        cards.append(new)
    db.commit()
    return cards


def _new_card(profile, text, word, source_sentence, context, r) -> Card:
    return Card(
        profile_id=profile.id,
        text_id=text.id if text else None,
        text_title=text.title if text else "",
        word=word,
        word_form=r["word_form"],
        highlight=_highlight(r),
        word_translation=r["word_translation"],
        source_sentence=source_sentence,
        context=context,
        sentence=r["sentence"],
        translation=r["translation"],
        status="flagged" if r["problems"] else "active",
        problems=r["problems"],
    )


def _request(db, provider, profile, deck, items, known, avoid, instructions=None) -> list[dict]:
    prompt = build_prompt(
        profile, deck, items, known, avoid, too_hard_examples(db, profile.id), instructions
    )
    result = provider.generate_json(SYSTEM, prompt, CARD_SCHEMA)
    db.add(
        GenerationLog(
            profile_id=profile.id,
            model=result.model,
            words=len(items),
            input_tokens=result.input_tokens,
            output_tokens=result.output_tokens,
        )
    )
    cards = result.data["cards"]
    for card in cards:
        card.setdefault("highlight", card.get("word_form", ""))
        card["problems"] = check_card(card, profile, avoid)
    return cards


def _apply(card: Card, r: dict) -> None:
    card.word_form = r["word_form"]
    card.highlight = _highlight(r)
    card.word_translation = r["word_translation"]
    card.sentence = r["sentence"]
    card.translation = r["translation"]
    card.problems = r["problems"]
    card.status = "flagged" if r["problems"] else "active"
    card.edited = False
    card.needs_regeneration = False
    card.regenerations += 1
    card.teacher_checked_at = None
    if card.review:
        card.review.too_hard = False


def _rejected(card: Card, feedback: str) -> dict:
    return {
        "word": card.word,
        "source_sentence": card.source_sentence,
        "context": card.context or card.source_sentence,
        "rejected_sentence": card.sentence,
        "feedback": feedback or "The sentence was marked for a rewrite without a reason.",
    }


def regenerate_card(
    db: Session,
    provider: LLMProvider,
    profile: Profile,
    card: Card,
    feedback: str,
    instructions: str | None = None,
) -> Card:
    """Replace a card's sentence in place, telling the LLM what was wrong with the old one.
    The card keeps the instructions it was made with, unless new ones are given."""
    if instructions is not None:
        card.instructions = instructions
    known, avoid = learner_vocabulary(db, profile.id)
    deck = card.decks[0]
    results = _with_retries(
        db, provider, profile, deck, [_rejected(card, feedback)], known, avoid, card.instructions
    )
    if not results:
        raise LLMError("No sentence came back; try again.")
    _apply(card, results[0])
    db.commit()
    return card


def regenerate_marked(
    db: Session, provider: LLMProvider, profile: Profile, deck: Deck
) -> tuple[list[Card], int]:
    """Rewrite the next batch of cards in a deck that are marked for regeneration; returns
    the rewritten cards and how many are still marked."""
    marked = sorted(
        (c for c in deck.cards if c.needs_regeneration), key=lambda c: (c.position, c.id)
    )
    # One card per word in a batch, so each answer matches exactly one card.
    batch = list({c.word.lower(): c for c in reversed(marked)}.values())[::-1][:BATCH_SIZE]
    if not batch:
        return [], 0
    known, avoid = learner_vocabulary(db, profile.id)
    by_word = {c.word.lower(): c for c in batch}
    items = [_rejected(c, "") for c in batch]
    # One request per instructions set, since each card keeps the ones it was made with.
    done: list[Card] = []
    for instructions in dict.fromkeys(c.instructions for c in batch):
        group = [i for i in items if by_word[i["word"].lower()].instructions == instructions]
        for r in _with_retries(db, provider, profile, deck, group, known, avoid, instructions):
            card = by_word.pop(r["word"].lower(), None)
            if card is not None:
                _apply(card, r)
                done.append(card)
    db.commit()
    return done, len(marked) - len(done)


def mark_context(text: SourceText, sentence: str) -> str:
    return context_for(text.body, sentence)
