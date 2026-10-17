from datetime import UTC, datetime

import pytest

from app import study
from app.generation import check_card
from app.models import Profile
from app.tokenize import context_for, find_sentences
from tests.helpers import first_deck

TEXT = (
    "Ich gehe heute zur Bank. Dort hole ich Geld. "
    "Danach sitze ich auf der Bank im Park. Die Sonne scheint."
)


@pytest.fixture(autouse=True)
def clock(monkeypatch):
    monkeypatch.setattr(study, "now_utc", lambda: datetime(2026, 10, 17, 9, tzinfo=UTC))


def cards_in(client, deck_id, words=("Geld", "Sonne")):
    text = client.post("/api/texts", json={"title": "Park", "body": TEXT}).json()
    for word in words:
        sentence = find_sentences(TEXT, word)[0]
        client.put(
            f"/api/texts/{text['id']}/marks",
            json={"word": word, "sentence": sentence, "status": "learn"},
        )
    url = f"/api/texts/{text['id']}/generate"
    return text, client.post(url, json={"deck_id": deck_id}).json()["created"]


def test_a_learner_starts_with_one_deck_and_can_add_more(client):
    decks = client.get("/api/decks").json()
    assert [d["name"] for d in decks] == ["My first deck"]
    verbs = client.post(
        "/api/decks", json={"name": "Verbs", "instructions": "Use verbs of motion."}
    )
    assert verbs.status_code == 201
    assert verbs.json()["instructions"] == "Use verbs of motion."
    renamed = client.patch(f"/api/decks/{verbs.json()['id']}", json={"name": "Motion"}).json()
    assert renamed["name"] == "Motion"


def test_cards_are_generated_into_the_chosen_deck(client):
    deck = client.post("/api/decks", json={"name": "Park"}).json()
    _, cards = cards_in(client, deck["id"])
    assert all(c["deck_ids"] == [deck["id"]] for c in cards)
    counts = {d["name"]: (d["cards"], d["new"]) for d in client.get("/api/decks").json()}
    assert counts == {"My first deck": (0, 0), "Park": (2, 2)}
    assert len(client.get(f"/api/cards?deck_id={deck['id']}").json()) == 2


def test_a_card_can_belong_to_several_decks_but_not_none(client):
    other = client.post("/api/decks", json={"name": "Other"}).json()
    _, cards = cards_in(client, first_deck(client))
    url = f"/api/cards/{cards[0]['id']}/decks"
    both = client.put(url, json={"deck_ids": [first_deck(client), other["id"]]}).json()
    assert sorted(both["deck_ids"]) == sorted([first_deck(client), other["id"]])
    assert client.put(url, json={"deck_ids": []}).status_code == 422


def test_study_only_the_chosen_decks(client):
    a = client.post("/api/decks", json={"name": "A"}).json()
    b = client.post("/api/decks", json={"name": "B"}).json()
    cards_in(client, a["id"], words=("Geld",))
    cards_in(client, b["id"], words=("Sonne",))
    only_b = client.get(f"/api/study?decks={b['id']}").json()
    assert only_b["card"]["word"] == "Sonne"
    assert only_b["new"] == 1
    assert client.get(f"/api/study?decks={a['id']},{b['id']}").json()["new"] == 2


def test_deleting_a_deck_keeps_cards_that_are_in_another_deck(client):
    keep = first_deck(client)
    gone = client.post("/api/decks", json={"name": "Gone"}).json()["id"]
    _, cards = cards_in(client, gone)
    client.put(f"/api/cards/{cards[0]['id']}/decks", json={"deck_ids": [gone, keep]})
    assert client.delete(f"/api/decks/{gone}").status_code == 204
    assert [c["id"] for c in client.get("/api/cards").json()] == [cards[0]["id"]]
    assert client.delete(f"/api/decks/{keep}").status_code == 409


def test_cards_keep_their_note_when_the_text_is_edited_or_deleted(client):
    text, cards = cards_in(client, first_deck(client), words=("Geld",))
    edited = client.put(
        f"/api/texts/{text['id']}", json={"title": "Park", "body": "Ganz neu."}
    ).json()
    assert edited["body"] == "Ganz neu."
    client.delete(f"/api/texts/{text['id']}")
    card = client.get("/api/cards").json()[0]
    assert card["sentence"] == cards[0]["sentence"]
    assert (card["text_title"], card["source_sentence"]) == ("Park", "Dort hole ich Geld.")


def test_find_a_word_and_send_its_neighbours_as_context(client):
    text = client.post("/api/texts", json={"title": "Park", "body": TEXT}).json()
    found = client.get(f"/api/texts/{text['id']}/find?word=bank").json()
    assert found == ["Ich gehe heute zur Bank.", "Danach sitze ich auf der Bank im Park."]
    assert context_for(TEXT, found[1]) == (
        "Dort hole ich Geld. Danach sitze ich auf der Bank im Park. Die Sonne scheint."
    )
    assert find_sentences(TEXT, "Sonn") == ["Die Sonne scheint."]


def test_more_cards_for_the_same_word(client):
    _, cards = cards_in(client, first_deck(client), words=("Geld",))
    more = client.post(f"/api/cards/{cards[0]['id']}/more", json={"count": 2}).json()["created"]
    assert [c["word"] for c in more] == ["Geld", "Geld"]
    sentences = {c["sentence"] for c in [*cards, *more]}
    assert len(sentences) == 3
    assert all(c["deck_ids"] == cards[0]["deck_ids"] for c in more)


def test_ask_the_teacher_to_check_a_card(client):
    _, cards = cards_in(client, first_deck(client), words=("Geld",))
    url = f"/api/cards/{cards[0]['id']}"
    flagged = client.patch(url, json={"needs_check": True, "note": "Is this natural?"}).json()
    assert (flagged["needs_check"], flagged["note"]) == (True, "Is this natural?")
    assert flagged["status"] == "active"
    assert client.get("/api/decks").json()[0]["needs_check"] == 1


def test_a_character_limit_flags_long_sentences():
    profile = Profile(sentence_min_words=1, sentence_max_words=30, sentence_max_chars=20)
    card = {"word_form": "Geld", "sentence": "Ich habe heute kein Geld dabei."}
    assert any("over 20" in p for p in check_card(card, profile, avoid=[]))
