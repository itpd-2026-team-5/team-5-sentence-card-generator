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

SYSTEM = """You write example sentences for a language learner's flashcards.
For each word, write one new sentence in the target language that uses the word with the same meaning it has in its source sentence; the context around the source sentence tells you which meaning that is.
Never copy the source sentence or its context.
Write for the learner's level, and build the sentence from words the learner already knows where you can.
Never use a word from the avoid list.
Keep every sentence within the given word count, and within the character limit when one is given.
Follow the deck's instructions, if there are any, for the topic and the style.
Translate each sentence into the learner's known language.
In word_form, give the exact form of the word as it appears in your sentence.
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
                    "word_translation": {"type": "string"},
                    "sentence": {"type": "string"},
                    "translation": {"type": "string"},
                },
                "required": ["word", "word_form", "word_translation", "sentence", "translation"],
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


def build_prompt(
    profile: Profile,
    deck: Deck,
    words: list[dict],
    known: list[str],
    avoid: list[str],
    hard: list[str],
) -> str:
    request = {
        "target_language": LANGUAGES[profile.target_language],
        "known_language": LANGUAGES[profile.known_language],
        "level": profile.level,
        "deck_instructions": deck.instructions,
        "sentence_length_in_words": [profile.sentence_min_words, profile.sentence_max_words],
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
    if profile.sentence_max_chars and len(card["sentence"]) > profile.sentence_max_chars:
        problems.append(f"{len(card['sentence'])} characters, over {profile.sentence_max_chars}")
    used = sorted(set(avoid) & set(tokens))
    if used:
        problems.append("uses avoided words: " + ", ".join(used))
    return problems


def _next_position(db: Session, profile: Profile) -> int:
    return (
        db.scalar(select(func.max(Card.position)).where(Card.profile_id == profile.id)) or 0
    ) + 1


def generate_cards(
    db: Session, provider: LLMProvider, profile: Profile, text: SourceText, deck: Deck
) -> list[Card]:
    """Generate cards into a deck for the words marked to learn in a text that have no card yet."""
    existing = set(
        db.scalars(select(Card.word).where(Card.text_id == text.id, Card.profile_id == profile.id))
    )
    pending = [w for w in text.words if w.status == "learn" and w.word not in existing]
    known, avoid = learner_vocabulary(db, profile.id)
    cards: list[Card] = []
    position = _next_position(db, profile)

    for start in range(0, len(pending), BATCH_SIZE):
        batch = pending[start : start + BATCH_SIZE]
        by_word = {w.word.lower(): w for w in batch}
        results = _run(db, provider, profile, deck, batch, known, avoid)
        # One retry for the words whose sentence failed a check.
        retry = [
            by_word[r["word"].lower()]
            for r in results
            if r["problems"] and r["word"].lower() in by_word
        ]
        if retry and getattr(provider, "retries", True):
            retried = {
                r["word"].lower(): r for r in _run(db, provider, profile, deck, retry, known, avoid)
            }
            results = [retried.get(r["word"].lower(), r) if r["problems"] else r for r in results]
        for r in results:
            source = by_word.pop(r["word"].lower(), None)
            if source is None:
                continue
            card = _new_card(profile, text, source.word, source.sentence, source.context, r)
            card.position = position + len(cards)
            card.decks.append(deck)
            db.add(card)
            cards.append(card)
    db.commit()
    return cards


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
    results = _request(db, provider, profile, deck, [item] * count, known, avoid)
    position = _next_position(db, profile)
    cards = []
    for r in results[:count]:
        new = _new_card(profile, None, card.word, card.source_sentence, card.context, r)
        new.text_id, new.text_title = card.text_id, card.text_title
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
        word_translation=r["word_translation"],
        source_sentence=source_sentence,
        context=context,
        sentence=r["sentence"],
        translation=r["translation"],
        status="flagged" if r["problems"] else "active",
        problems=r["problems"],
    )


def _run(db, provider, profile, deck, words: list[TextWord], known, avoid) -> list[dict]:
    items = [
        {"word": w.word, "source_sentence": w.sentence, "context": w.context or w.sentence}
        for w in words
    ]
    return _request(db, provider, profile, deck, items, known, avoid)


def _request(db, provider, profile, deck, items, known, avoid) -> list[dict]:
    prompt = build_prompt(profile, deck, items, known, avoid, too_hard_examples(db, profile.id))
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
        card["problems"] = check_card(card, profile, avoid)
    return cards


def regenerate_card(
    db: Session, provider: LLMProvider, profile: Profile, card: Card, feedback: str
) -> Card:
    """Replace a card's sentence in place, telling the LLM what was wrong with the old one."""
    known, avoid = learner_vocabulary(db, profile.id)
    item = {
        "word": card.word,
        "source_sentence": card.source_sentence,
        "context": card.context or card.source_sentence,
        "rejected_sentence": card.sentence,
        "feedback": feedback or "The sentence was marked bad without a reason.",
    }
    results = _request(db, provider, profile, card.decks[0], [item], known, avoid)
    if not results:
        raise LLMError("No sentence came back; try again.")
    r = results[0]
    card.word_form = r["word_form"]
    card.word_translation = r["word_translation"]
    card.sentence = r["sentence"]
    card.translation = r["translation"]
    card.problems = r["problems"]
    card.status = "flagged" if r["problems"] else "active"
    card.edited = False
    if card.review:
        card.review.too_hard = False
    db.commit()
    return card


def mark_context(text: SourceText, sentence: str) -> str:
    return context_for(text.body, sentence)
