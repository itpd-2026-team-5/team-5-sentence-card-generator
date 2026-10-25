"""The changes the Customer asked for in the Week 4 meeting."""

from app.generation import _match
from tests.helpers import first_deck

TEXT = "Ich sitze auf der Bank im Park. Danach bringe ich mein Geld zur Bank."
PARK, MONEY = "Ich sitze auf der Bank im Park.", "Danach bringe ich mein Geld zur Bank."


def add_text(client):
    return client.post("/api/texts", json={"title": "Bank", "body": TEXT}).json()


def mark(client, text_id, word, sentence, status="learn"):
    client.put(
        f"/api/texts/{text_id}/marks", json={"word": word, "sentence": sentence, "status": status}
    )


def marks(client, text_id):
    return client.get(f"/api/texts/{text_id}").json()["marks"]


def generate(client, text_id, deck_id):
    return client.post(f"/api/texts/{text_id}/generate", json={"deck_id": deck_id}).json()


def test_a_word_in_two_sentences_of_one_text_gets_a_card_for_each(client):
    """A word and its sentence identify a mark, so both meanings of "Bank" can be learned."""
    text = add_text(client)
    mark(client, text["id"], "Bank", PARK)
    mark(client, text["id"], "Bank", MONEY)
    mark(client, text["id"], "Bank", MONEY)
    assert [m["sentence"] for m in marks(client, text["id"])] == [PARK, MONEY]
    created = generate(client, text["id"], first_deck(client))["created"]
    assert sorted(c["source_sentence"] for c in created) == sorted([PARK, MONEY])
    # Clearing one sentence's mark keeps the other.
    mark(client, text["id"], "Bank", PARK, "none")
    assert [m["sentence"] for m in marks(client, text["id"])] == [MONEY]


def test_ignoring_a_word_replaces_its_marks_and_learning_it_lifts_the_ignore(client):
    text = add_text(client)
    mark(client, text["id"], "Bank", PARK)
    mark(client, text["id"], "Bank", MONEY, "ignore")
    assert [m["status"] for m in marks(client, text["id"])] == ["ignore"]
    mark(client, text["id"], "Bank", PARK)
    assert [(m["status"], m["sentence"]) for m in marks(client, text["id"])] == [("learn", PARK)]


def test_each_mark_gets_its_meaning_and_the_decks_that_have_the_word(client):
    text = add_text(client)
    mark(client, text["id"], "Bank", PARK)
    assert marks(client, text["id"])[0]["decks"] == []
    glossed = client.post(f"/api/texts/{text['id']}/glosses", json={}).json()["marks"]
    assert glossed[0]["gloss"] == "[Bank]"
    deck = client.get("/api/decks").json()[0]
    generate(client, text["id"], deck["id"])
    assert marks(client, text["id"])[0]["decks"] == [deck["name"]]


def test_generation_warns_when_many_sentences_had_to_be_written_again(client):
    """The Customer's threshold: warn when 30% of a run's sentences failed a check."""
    text = add_text(client)
    mark(client, text["id"], "Geld", MONEY)
    ok = generate(client, text["id"], first_deck(client))
    assert ok["rewritten"] == 0 and ok["warning"] == ""

    profile = client.get("/api/profile").json()
    del profile["placement_tests"], profile["set_up"], profile["study_deck_ids"]
    # The offline provider's sentences are about 60 characters, so 200 can never be met.
    client.put("/api/profile", json={**profile, "sentence_min_words": 3, "sentence_min_chars": 200})
    mark(client, text["id"], "Bank", PARK)
    bad = generate(client, text["id"], first_deck(client))
    assert bad["rewritten"] == 1 and "1 of 1 sentences" in bad["warning"]


def test_decks_can_be_put_in_order(client):
    first = first_deck(client)
    second = client.post("/api/decks", json={"name": "Second"}).json()["id"]
    assert client.put("/api/decks/order", json={"ids": [second, first]}).status_code == 204
    assert [d["id"] for d in client.get("/api/decks").json()] == [second, first]


def test_answers_are_matched_by_id_or_else_by_word():
    items = [{"id": "0", "word": "Bank"}, {"id": "1", "word": "Bank"}, {"id": "2", "word": "Geld"}]
    answers = [{"id": "1", "word": "Bank"}, {"word": "geld"}, {"word": "Bank"}, {"word": "Zug"}]
    assert [key for key, _ in _match(items, answers)] == ["1", "2", "0"]


def test_an_answered_question_keeps_its_note_and_can_be_reopened(client, teacher):
    text = add_text(client)
    mark(client, text["id"], "Geld", MONEY)
    deck = first_deck(client)
    card = generate(client, text["id"], deck)["created"][0]
    client.post(f"/api/decks/{deck}/shares", json={"email": "teacher@example.com"})
    client.patch(f"/api/cards/{card['id']}", json={"needs_check": True, "note": "Is it right?"})

    url = f"/api/cards/{card['id']}"
    answered = teacher.patch(url, json={"teacher_checked": True}).json()
    assert answered["needs_check"] is False and answered["note"] == "Is it right?"
    reopened = teacher.patch(url, json={"needs_check": True, "teacher_checked": False}).json()
    assert reopened["needs_check"] is True and reopened["teacher_checked_at"] is None
    taught = teacher.get("/api/teaching").json()[0]
    assert (taught["target_language"], taught["known_language"]) == ("de", "en")
