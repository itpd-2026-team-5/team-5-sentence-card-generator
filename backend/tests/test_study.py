from datetime import UTC, datetime, timedelta

import pytest

from app import study
from app.generation import build_prompt, too_hard_examples
from app.models import Deck, Profile
from tests.helpers import first_deck, profile_id

TEXT = "Sie warf ihm einen bösen Blick zu. Dann hob sie den Kopf und sagte etwas."
T0 = datetime(2026, 10, 8, 9, 0, tzinfo=UTC)


@pytest.fixture
def clock(monkeypatch):
    """A clock the test moves by hand."""
    now = {"t": T0}
    monkeypatch.setattr(study, "now_utc", lambda: now["t"])
    return now


def make_cards(client, words=("Blick", "Kopf", "sagte")):
    text = client.post("/api/texts", json={"title": "T", "body": TEXT}).json()
    for word in words:
        client.put(
            f"/api/texts/{text['id']}/marks",
            json={"word": word, "sentence": "s", "status": "learn"},
        )
    return client.post(
        f"/api/texts/{text['id']}/generate", json={"deck_id": first_deck(client)}
    ).json()["created"]


def test_new_cards_come_in_the_learners_order(client, clock):
    cards = make_cards(client)
    client.put("/api/cards/order", json={"ids": [cards[2]["id"], cards[0]["id"], cards[1]["id"]]})
    first = client.get("/api/study").json()
    assert first["card"]["id"] == cards[2]["id"]
    assert first["is_new"] is True
    assert (first["due"], first["new"]) == (0, 3)
    assert set(first["intervals"]) == {"again", "hard", "good", "easy"}


def test_rating_schedules_the_card_and_moves_on(client, clock):
    cards = make_cards(client)
    first = client.get("/api/study").json()["card"]
    reviewed = client.post(f"/api/cards/{first['id']}/review", json={"rating": "good"}).json()
    assert reviewed["reps"] == 1

    second = client.get("/api/study").json()
    assert second["card"]["id"] != first["id"]
    assert (second["new_done"], second["reviews_done"]) == (1, 0)

    # After the learning step passes, the reviewed card is due again.
    clock["t"] = T0 + timedelta(hours=1)
    ids_due = []
    for _ in range(len(cards)):
        card = client.get("/api/study").json()["card"]
        ids_due.append(card["id"])
        client.post(f"/api/cards/{card['id']}/review", json={"rating": "easy"})
    assert first["id"] in ids_due


def test_again_returns_soon_and_easy_returns_later(client, clock):
    make_cards(client, words=("Blick",))
    card = client.get("/api/study").json()["card"]
    again = client.post(f"/api/cards/{card['id']}/review", json={"rating": "again"}).json()
    assert datetime.fromisoformat(again["due"]) - T0 < timedelta(hours=1)

    study_now = client.get("/api/study").json()
    assert study_now["card"] is None
    assert study_now["next_due"] is not None

    clock["t"] = T0 + timedelta(hours=1)
    card = client.get("/api/study").json()["card"]
    easy = client.post(f"/api/cards/{card['id']}/review", json={"rating": "easy"}).json()
    assert datetime.fromisoformat(easy["due"]) - clock["t"] >= timedelta(days=1)


def test_new_cards_are_capped_per_day(client, clock, monkeypatch):
    monkeypatch.setattr(study, "NEW_CARDS_PER_DAY", 2)
    make_cards(client)
    assert client.get("/api/study").json()["new"] == 2
    for _ in range(2):
        card = client.get("/api/study").json()["card"]
        client.post(f"/api/cards/{card['id']}/review", json={"rating": "easy"})
    assert client.get("/api/study").json()["card"] is None

    clock["t"] = T0 + timedelta(days=1)
    assert client.get("/api/study").json()["new"] == 1


def test_bad_and_flagged_cards_are_not_studied(client, clock):
    cards = make_cards(client, words=("Blick", "Kopf"))
    client.patch(f"/api/cards/{cards[0]['id']}", json={"status": "bad"})
    assert client.get("/api/study").json()["new"] == 1
    refused = client.post(f"/api/cards/{cards[0]['id']}/review", json={"rating": "good"})
    assert refused.status_code == 409


def test_too_hard_feeds_the_next_generation(client, clock, db_session):
    cards = make_cards(client, words=("Blick",))
    client.post(f"/api/cards/{cards[0]['id']}/review", json={"rating": "again", "too_hard": True})
    assert too_hard_examples(db_session, profile_id(client)) == [cards[0]["sentence"]]
    profile = Profile(
        known_language="en",
        target_language="de",
        level="A2",
        sentence_min_words=8,
        sentence_max_words=12,
        sentence_max_chars=0,
    )
    deck = Deck(name="D", instructions="Football only.")
    prompt = build_prompt(
        profile, deck, [], [], [], too_hard_examples(db_session, profile_id(client))
    )
    assert "Football only." in prompt
    assert cards[0]["sentence"] in prompt

    # Writing a new sentence clears the flag.
    client.post(f"/api/cards/{cards[0]['id']}/regenerate", json={"feedback": ""})
    assert too_hard_examples(db_session, profile_id(client)) == []


def test_deleting_a_card_removes_its_schedule(client, clock):
    cards = make_cards(client, words=("Blick",))
    client.post(f"/api/cards/{cards[0]['id']}/review", json={"rating": "good"})
    assert client.delete(f"/api/cards/{cards[0]['id']}").status_code == 204
    assert client.get("/api/study").json()["card"] is None


def test_interval_labels():
    assert study.format_interval(timedelta(seconds=30)) == "1 min"
    assert study.format_interval(timedelta(minutes=10)) == "10 min"
    assert study.format_interval(timedelta(hours=5)) == "5 h"
    assert study.format_interval(timedelta(days=3)) == "3 d"
    assert study.format_interval(timedelta(days=90)) == "3 mo"
