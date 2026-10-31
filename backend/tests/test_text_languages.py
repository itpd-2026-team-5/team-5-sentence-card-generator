"""Language boundaries apply before vocabulary limits and on every generation path."""

import json

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.db import Base
from app.generation import (
    generate_cards,
    learner_vocabulary,
    more_cards,
    regenerate_card,
    regenerate_marked,
)
from app.llm import BrowserProvider, NeedsLLM
from app.main import create_text, update_text
from app.models import Card, Deck, Profile, SourceText, TextWord
from app.schemas import TextIn


@pytest.fixture
def language_db():
    engine = create_engine("sqlite://")
    Base.metadata.create_all(engine)
    with Session(engine) as db:
        yield db
    engine.dispose()


def add_profile(db):
    profile = Profile(target_language="de")
    db.add(profile)
    db.flush()
    return profile


def test_vocabulary_filters_language_before_limit_and_keeps_marks_separate(language_db):
    db = language_db
    profile = add_profile(db)
    other = add_profile(db)
    german = SourceText(profile_id=profile.id, title="German", language="de", body="Bank Haus")
    german.words.append(TextWord(word="Bank", sentence="Bank Haus", status="learn"))
    english = SourceText(
        profile_id=profile.id, title="English", language="en", body="Bank house ignored"
    )
    english.words.append(TextWord(word="ignored", sentence="", status="ignore"))
    db.add_all(
        [
            german,
            english,
            SourceText(profile_id=profile.id, title="Russian", language="ru", body="дом книга"),
            SourceText(profile_id=other.id, title="Other", language="en", body="private"),
        ]
    )
    db.flush()
    assert learner_vocabulary(db, profile.id, "en") == (["bank", "house"], ["ignored"])
    assert learner_vocabulary(db, profile.id, "de") == (["haus"], [])
    assert learner_vocabulary(db, profile.id, "ru") == (["дом", "книга"], [])

    # An earlier, long German text must not consume English's 150-word budget.
    german.body = " ".join("wort" + chr(97 + i // 26) + chr(97 + i % 26) for i in range(160))
    db.flush()
    assert len(learner_vocabulary(db, profile.id, "de")[0]) == 150
    assert learner_vocabulary(db, profile.id, "en")[0] == ["bank", "house"]


@pytest.mark.parametrize("operation", ["generate", "more", "rewrite", "batch"])
def test_all_generation_paths_use_the_destination_decks_language(language_db, operation):
    db = language_db
    profile = add_profile(db)
    deck = Deck(profile_id=profile.id, name="English", target_language="en")
    text = SourceText(profile_id=profile.id, title="English", language="en", body="house tree")
    text.words.append(TextWord(word="house", sentence="house tree", status="learn"))
    db.add_all(
        [
            deck,
            text,
            SourceText(profile_id=profile.id, title="German", language="de", body="Haus Baum"),
        ]
    )
    db.flush()
    card = Card(
        profile_id=profile.id,
        word="house",
        word_form="house",
        word_translation="дом",
        sentence="A house",
        translation="Дом",
        source_sentence="An older source",
        needs_regeneration=True,
    )
    card.decks.append(deck)
    db.add(card)
    db.commit()
    provider = BrowserProvider(None)
    with pytest.raises(NeedsLLM) as request:
        if operation == "generate":
            generate_cards(db, provider, profile, text, deck)
        elif operation == "more":
            more_cards(db, provider, profile, card, 1)
        elif operation == "rewrite":
            regenerate_card(db, provider, profile, card, "simpler")
        else:
            regenerate_marked(db, provider, profile, deck)
    prompt = json.loads(
        request.value.request["prompt"].split("\n", 1)[1].split("\n\nAnswer with only")[0]
    )
    assert prompt["target_language"] == "English"
    assert prompt["known_words"] == ["tree"]


def test_text_language_defaults_to_profile_and_can_be_corrected(language_db):
    db = language_db
    profile = add_profile(db)
    created = create_text(TextIn(title="Text", body="A text"), db, profile)
    assert created.language == "de"
    # Old clients that omit language must not reset an existing language label.
    changed = update_text(
        created.id, TextIn(title="Text", body="A text", language="en"), db, profile
    )
    assert changed.language == "en"
    unchanged = update_text(created.id, TextIn(title="Edited", body="Another text"), db, profile)
    assert unchanged.language == "en"


def test_text_rejects_an_unsupported_language():
    from pydantic import ValidationError

    with pytest.raises(ValidationError):
        TextIn(title="Text", body="A text", language="xx")


def test_generation_rejects_a_deck_in_a_different_language(language_db):
    from fastapi import HTTPException

    from app.main import generate
    from app.schemas import GenerateIn

    db = language_db
    profile = add_profile(db)
    text = SourceText(profile_id=profile.id, title="Russian", language="ru", body="дом книга")
    deck = Deck(profile_id=profile.id, name="German", target_language="de")
    db.add_all([text, deck])
    db.commit()
    with pytest.raises(HTTPException) as error:
        generate(text.id, GenerateIn(deck_id=deck.id), None, db, profile)
    assert error.value.status_code == 422


def test_language_migration_backfills_existing_texts_and_preserves_them():
    import importlib.util
    from pathlib import Path

    from alembic.migration import MigrationContext
    from alembic.operations import Operations
    from sqlalchemy import inspect, text

    path = Path(__file__).parents[1] / "migrations/versions/e51d8a70c923_text_language.py"
    spec = importlib.util.spec_from_file_location("text_language_migration", path)
    migration = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(migration)
    engine = create_engine("sqlite://")
    with engine.begin() as connection:
        for statement in [
            "CREATE TABLE profiles (id INTEGER PRIMARY KEY, target_language VARCHAR(2))",
            "CREATE TABLE texts (id INTEGER PRIMARY KEY, profile_id INTEGER, body TEXT)",
            "CREATE TABLE cards (id INTEGER PRIMARY KEY, text_id INTEGER)",
            "CREATE TABLE decks (id INTEGER PRIMARY KEY, target_language VARCHAR(2))",
            "CREATE TABLE card_decks (card_id INTEGER, deck_id INTEGER)",
            "INSERT INTO profiles VALUES (1, 'de'), (2, 'ru'), (3, 'en')",
            "INSERT INTO texts VALUES (1, 1, 'English'), (2, 2, 'Russian'), (3, 3, 'Ambiguous')",
            "INSERT INTO cards VALUES (1, 1), (2, 3)",
            "INSERT INTO decks VALUES (1, 'en'), (2, 'de')",
            "INSERT INTO card_decks VALUES (1, 1), (2, 1), (2, 2)",
        ]:
            connection.execute(text(statement))
        with Operations.context(MigrationContext.configure(connection)):
            migration.upgrade()
            assert connection.execute(
                text("SELECT language FROM texts ORDER BY id")
            ).scalars().all() == [
                "en",
                "ru",
                "en",
            ]
            assert not next(
                c for c in inspect(connection).get_columns("texts") if c["name"] == "language"
            )["nullable"]
            migration.downgrade()
            assert "language" not in {c["name"] for c in inspect(connection).get_columns("texts")}
            assert connection.scalar(text("SELECT COUNT(*) FROM texts")) == 3
    engine.dispose()
