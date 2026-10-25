"""The changes the Customer asked for at the Week 3 meeting (DEC-024 to DEC-048)."""

from datetime import UTC, datetime, timedelta

import pytest

from app import study
from app.db import SessionLocal
from app.generation import MAX_ATTEMPTS, build_prompt
from app.models import Deck, GenerationLog, Profile
from tests.helpers import first_deck

TEXT = "Ich gehe heute zur Bank. Dort hole ich Geld. Danach sitze ich auf der Bank im Park."
T0 = datetime(2026, 10, 20, 9, tzinfo=UTC)


@pytest.fixture
def clock(monkeypatch):
    now = {"t": T0}
    monkeypatch.setattr(study, "now_utc", lambda: now["t"])
    return now


def add_text(client, body=TEXT, **extra):
    return client.post("/api/texts", json={"title": "Park", "body": body, **extra}).json()


def mark(client, text_id, word, sentence):
    client.put(
        f"/api/texts/{text_id}/marks", json={"word": word, "sentence": sentence, "status": "learn"}
    )


def generate(client, text_id, deck_id):
    return client.post(f"/api/texts/{text_id}/generate", json={"deck_id": deck_id}).json()


def test_each_deck_has_its_own_languages_and_level(client):
    """DEC-024, DEC-025: a language pair per deck, a level per language, a deck override."""
    profile = client.get("/api/profile").json()
    del profile["placement_tests"], profile["set_up"], profile["study_deck_ids"]
    client.put("/api/profile", json={**profile, "levels": {"de": "B1", "ru": "A1"}})
    russian = client.post(
        "/api/decks", json={"name": "Russian", "known_language": "en", "target_language": "ru"}
    ).json()
    assert (russian["target_language"], russian["effective_level"]) == ("ru", "A1")
    hard = client.patch(f"/api/decks/{russian['id']}", json={"level": "B2"}).json()
    assert (hard["level"], hard["effective_level"]) == ("B2", "B2")
    same = {"name": "X", "known_language": "de", "target_language": "de"}
    assert client.post("/api/decks", json=same).status_code == 422

    deck = Deck(known_language="en", target_language="ru", level="", instructions="")
    learner = Profile(levels={"ru": "A1"}, sentence_min_words=5, sentence_max_words=12)
    learner.sentence_min_chars = learner.sentence_max_chars = 0
    prompt = build_prompt(learner, deck, [], [], [], [])
    assert '"target_language": "Russian"' in prompt and '"level": "A1"' in prompt


def test_description_is_kept_apart_from_the_instructions_each_card_keeps(client):
    """DEC-032, DEC-033."""
    deck = client.post(
        "/api/decks",
        json={"name": "Travel", "description": "Trips by train", "instructions": "Spoken German."},
    ).json()
    assert (deck["description"], deck["instructions"]) == ("Trips by train", "Spoken German.")
    text = add_text(client)
    mark(client, text["id"], "Geld", "Dort hole ich Geld.")
    card = generate(client, text["id"], deck["id"])["created"][0]
    client.patch(f"/api/decks/{deck['id']}", json={"instructions": "Formal German."})
    assert client.get(f"/api/cards?deck_id={deck['id']}").json()[0]["instructions"] == (
        "Spoken German."
    )
    rewritten = client.post(
        f"/api/cards/{card['id']}/regenerate", json={"feedback": "", "instructions": "Slang."}
    ).json()
    assert (rewritten["instructions"], rewritten["regenerations"]) == ("Slang.", 1)


def test_archive_is_not_delete(client):
    """DEC-034: archiving keeps the card out of study; deleting removes it, and both count."""
    text = add_text(client)
    mark(client, text["id"], "Geld", "Dort hole ich Geld.")
    mark(client, text["id"], "Park", "Danach sitze ich auf der Bank im Park.")
    a, b = generate(client, text["id"], first_deck(client))["created"]
    assert client.patch(f"/api/cards/{a['id']}", json={"status": "archived"}).status_code == 200
    assert client.get("/api/decks").json()[0]["archived"] == 1
    assert client.get("/api/study").json()["new"] == 1
    client.delete(f"/api/cards/{b['id']}")
    stats = client.get("/api/stats").json()
    assert (stats["archived"], stats["deleted"], stats["cards"]) == (1, 1, 1)


def test_mark_cards_and_regenerate_them_in_one_batch(client):
    """DEC-035."""
    text = add_text(client)
    for word, sentence in [
        ("Geld", "Dort hole ich Geld."),
        ("Park", "Danach sitze ich auf der Bank im Park."),
    ]:
        mark(client, text["id"], word, sentence)
    deck = first_deck(client)
    cards = generate(client, text["id"], deck)["created"]
    for card in cards:
        client.patch(f"/api/cards/{card['id']}", json={"needs_regeneration": True})
    assert client.get("/api/decks").json()[0]["to_regenerate"] == 2
    done = client.post(f"/api/decks/{deck}/regenerate-marked", json={}).json()
    assert (len(done["regenerated"]), done["remaining"]) == (2, 0)
    assert all(not c["needs_regeneration"] and c["regenerations"] == 1 for c in done["regenerated"])


def test_the_same_word_in_another_meaning_or_deck_gets_its_own_card(client):
    """DEC-043: a duplicate is the same word from the same sentence in the same deck."""
    text = add_text(client)
    mark(client, text["id"], "Bank", "Ich gehe heute zur Bank.")
    first = first_deck(client)
    assert len(generate(client, text["id"], first)["created"]) == 1
    assert generate(client, text["id"], first)["created"] == []
    other = client.post("/api/decks", json={"name": "Other"}).json()["id"]
    assert len(generate(client, text["id"], other)["created"]) == 1
    # The same word marked in its other meaning gets a card in the first deck again.
    mark(client, text["id"], "Bank", "Danach sitze ich auf der Bank im Park.")
    assert len(generate(client, text["id"], first)["created"]) == 1


def test_a_failed_sentence_is_rewritten_before_it_is_shown(client, db_session):
    """DEC-048: up to MAX_ATTEMPTS requests, each telling the model what failed."""
    profile = client.get("/api/profile").json()
    del profile["placement_tests"], profile["set_up"], profile["study_deck_ids"]
    # The offline provider's sentences are about 60 characters, so 200 can never be met.
    client.put("/api/profile", json={**profile, "sentence_min_words": 3, "sentence_min_chars": 200})
    text = add_text(client)
    mark(client, text["id"], "Geld", "Dort hole ich Geld.")
    card = generate(client, text["id"], first_deck(client))["created"][0]
    assert card["status"] == "flagged" and "under 200" in card["problems"][0]
    assert db_session.query(GenerationLog).count() == MAX_ATTEMPTS


def test_study_shows_new_review_and_again_and_limits_reviews_per_deck(client, clock):
    """DEC-041, DEC-042."""
    text = add_text(client)
    for word, sentence in [
        ("Geld", "Dort hole ich Geld."),
        ("Park", "Danach sitze ich auf der Bank im Park."),
    ]:
        mark(client, text["id"], word, sentence)
    generate(client, text["id"], first_deck(client))
    card = client.get("/api/study").json()["card"]
    client.post(f"/api/cards/{card['id']}/review", json={"rating": "again"})
    clock["t"] = T0 + timedelta(minutes=5)
    now = client.get("/api/study").json()
    assert (now["new"], now["review"], now["again"]) == (1, 0, 1)

    # Once both have graduated to reviews, a deck limit of one review a day holds.
    for _ in range(5):
        c = client.get("/api/study").json()["card"]
        if c:
            client.post(f"/api/cards/{c['id']}/review", json={"rating": "easy"})
    clock["t"] = T0 + timedelta(days=60)
    assert client.get("/api/study").json()["review"] == 2
    client.patch(f"/api/decks/{first_deck(client)}", json={"reviews_per_day": 1})
    later = client.get("/api/study").json()
    assert (later["new"], later["review"], later["again"]) == (0, 1, 0)


def test_the_chosen_study_decks_are_remembered(client):
    """DEC-030."""
    other = client.post("/api/decks", json={"name": "Other"}).json()["id"]
    saved = client.put("/api/profile/study-decks", json={"deck_ids": [other, 9999]}).json()
    assert saved["study_deck_ids"] == [other]
    assert client.get("/api/profile").json()["study_deck_ids"] == [other]


def test_texts_keep_their_source_apart_and_can_be_reordered(client):
    """DEC-046, DEC-047."""
    a = add_text(client, source_url="https://example.org/park", notes="From a blog")
    b = add_text(client, body="Zwei.")
    assert client.get(f"/api/texts/{a['id']}").json()["source_url"] == "https://example.org/park"
    assert all(
        "example" not in w
        for s in client.get(f"/api/texts/{a['id']}").json()["sentences"]
        for w in s["words"]
    )
    assert (
        client.post(
            "/api/texts", json={"title": "x", "body": "y", "source_url": "not a url"}
        ).status_code
        == 422
    )
    assert client.put("/api/texts/order", json={"ids": [b["id"], a["id"]]}).status_code == 204
    assert [t["id"] for t in client.get("/api/texts").json()] == [b["id"], a["id"]]


def test_a_card_links_its_text_only_while_the_text_exists(client):
    """DEC-037."""
    text = add_text(client)
    mark(client, text["id"], "Geld", "Dort hole ich Geld.")
    card = generate(client, text["id"], first_deck(client))["created"][0]
    assert card["text_exists"] is True
    client.delete(f"/api/texts/{text['id']}")
    kept = client.get("/api/cards").json()[0]
    assert (kept["text_exists"], kept["text_title"]) == (False, "Park")


def test_the_teacher_sees_every_card_asked_ones_first_and_confirms_them(client, teacher):
    """DEC-044, DEC-045."""
    text = add_text(client)
    for word, sentence in [
        ("Geld", "Dort hole ich Geld."),
        ("Park", "Danach sitze ich auf der Bank im Park."),
    ]:
        mark(client, text["id"], word, sentence)
    deck = first_deck(client)
    first, second = generate(client, text["id"], deck)["created"]
    client.post(f"/api/decks/{deck}/shares", json={"email": "teacher@example.com"})
    client.patch(f"/api/cards/{second['id']}", json={"needs_check": True, "note": "?"})

    taught = teacher.get("/api/teaching").json()[0]
    assert (taught["student_name"], taught["to_check"], taught["needs_check"]) == (
        "Test Person",
        2,
        1,
    )
    assert [c["id"] for c in teacher.get(f"/api/teaching/{deck}/cards").json()] == [
        second["id"],
        first["id"],
    ]

    url = f"/api/cards/{second['id']}"
    assert client.patch(url, json={"teacher_checked": True}).status_code == 403
    confirmed = teacher.patch(url, json={"teacher_checked": True}).json()
    assert confirmed["needs_check"] is False and confirmed["teacher_checked_at"]
    assert teacher.get("/api/teaching").json()[0]["to_check"] == 1
    # The learner changing the card asks for a new check.
    client.patch(url, json={"sentence": "Hier ist mein Geld."})
    assert teacher.get("/api/teaching").json()[0]["to_check"] == 2


def test_new_decks_take_the_languages_chosen_at_first_setup(client):
    profile = client.get("/api/profile").json()
    del profile["placement_tests"], profile["set_up"], profile["study_deck_ids"]
    client.put("/api/profile", json={**profile, "known_language": "ru", "target_language": "en"})
    deck = client.get("/api/decks").json()[0]
    assert (deck["known_language"], deck["target_language"]) == ("ru", "en")


def test_highlight_falls_back_to_the_word_form():
    from app.generation import _highlight

    assert (
        _highlight(
            {
                "highlight": "der Bahnsteig",
                "sentence": "Auf der Bahnsteig.",
                "word_form": "Bahnsteig",
            }
        )
        == "der Bahnsteig"
    )
    assert (
        _highlight(
            {"highlight": "missing", "sentence": "Auf dem Bahnsteig.", "word_form": "Bahnsteig"}
        )
        == "Bahnsteig"
    )
    with SessionLocal():
        pass


def test_the_cards_are_read_from_an_answer_wrapped_in_text():
    """A model behind a gateway that drops structured output may fence or explain its JSON."""
    from app.llm import LLMError, parse_json

    bare = '{"cards": []}'
    assert parse_json(bare) == {"cards": []}
    assert parse_json('Here you go:\n```json\n{"cards": [1]}\n```') == {"cards": [1]}
    assert parse_json('Sure! {"cards": [2]} Hope it helps.') == {"cards": [2]}
    for broken in ["No cards today.", '{"cards": [', "[1, 2]"]:
        with pytest.raises(LLMError):
            parse_json(broken)


def test_a_blank_text_is_refused(client):
    assert client.post("/api/texts", json={"title": "Empty", "body": "  \n "}).status_code == 422
    assert client.get("/api/texts").json() == []
