from app.generation import check_card
from app.models import Profile
from tests.helpers import first_deck

TEXT = "Sie warf ihm einen bösen Blick zu. Dann hob sie den Kopf und sagte etwas."


def test_profile_defaults_and_update(client):
    profile = client.get("/api/profile").json()
    assert profile["target_language"] == "de"
    assert profile["placement_tests"]["en"].startswith("https://")

    update = {**profile, "level": "B1", "sentence_max_chars": 90}
    del update["placement_tests"], update["set_up"]
    saved = client.put("/api/profile", json=update).json()
    assert (saved["level"], saved["sentence_max_chars"]) == ("B1", 90)

    same = {**update, "known_language": "de"}
    assert client.put("/api/profile", json=same).status_code == 422


def test_pick_words_and_generate_cards(client):
    text = client.post("/api/texts", json={"title": "Kapitel 5", "body": TEXT}).json()
    detail = client.get(f"/api/texts/{text['id']}").json()
    assert detail["sentences"][1]["words"][-2] == "sagte"

    marks = f"/api/texts/{text['id']}/marks"
    sentence = detail["sentences"][1]["text"]
    client.put(marks, json={"word": "sagte", "sentence": sentence, "status": "learn"})
    client.put(marks, json={"word": "Blick", "sentence": "x", "status": "learn"})
    client.put(marks, json={"word": "Blick", "sentence": "x", "status": "none"})
    client.put(marks, json={"word": "Kopf", "sentence": sentence, "status": "ignore"})
    assert client.get(f"/api/texts/{text['id']}").json()["marks"] == {
        "sagte": "learn",
        "kopf": "ignore",
    }

    created = client.post(
        f"/api/texts/{text['id']}/generate", json={"deck_id": first_deck(client)}
    ).json()["created"]
    assert [c["word"] for c in created] == ["sagte"]
    assert created[0]["status"] == "active"
    assert created[0]["source_sentence"] == sentence
    assert created[0]["text_title"] == "Kapitel 5"
    assert created[0]["word_translation"]
    assert created[0]["deck_ids"] == [first_deck(client)]

    # A second run only generates for words without a card.
    assert (
        client.post(
            f"/api/texts/{text['id']}/generate", json={"deck_id": first_deck(client)}
        ).json()["created"]
        == []
    )
    assert client.get("/api/texts").json()[0]["cards"] == 1
    assert client.get("/api/usage").json()["requests"] == 1


def test_check_card_flags_bad_sentences():
    profile = Profile(sentence_min_words=8, sentence_max_words=12)
    card = {"word_form": "sagte", "sentence": "Er sagte nichts."}
    problems = check_card(card, profile, avoid=["nichts"])
    assert any("outside 8-12" in p for p in problems)
    assert any("nichts" in p for p in problems)


def _one_card(client):
    text = client.post("/api/texts", json={"title": "T", "body": TEXT}).json()
    client.put(
        f"/api/texts/{text['id']}/marks",
        json={"word": "Blick", "sentence": "Sie warf ihm einen bösen Blick zu.", "status": "learn"},
    )
    client.put(
        f"/api/texts/{text['id']}/marks",
        json={"word": "sagte", "sentence": "Dann hob sie den Kopf.", "status": "learn"},
    )
    return client.post(
        f"/api/texts/{text['id']}/generate", json={"deck_id": first_deck(client)}
    ).json()["created"]


def test_edit_card_clears_warnings(client):
    card = _one_card(client)[0]
    edited = client.patch(
        f"/api/cards/{card['id']}",
        json={"sentence": "Sein Blick war kalt.", "translation": "His look was cold."},
    ).json()
    assert edited["sentence"] == "Sein Blick war kalt."
    assert edited["edited"] is True
    assert edited["status"] == "active"
    assert edited["problems"] == []


def test_mark_bad_and_regenerate(client):
    card = _one_card(client)[0]
    bad = client.patch(f"/api/cards/{card['id']}", json={"status": "bad"}).json()
    assert bad["status"] == "bad"
    assert [c["id"] for c in client.get("/api/cards?status=bad").json()] == [card["id"]]

    fresh = client.post(
        f"/api/cards/{card['id']}/regenerate", json={"feedback": "Too formal."}
    ).json()
    assert fresh["status"] == "active"
    assert client.get("/api/usage").json()["requests"] == 2


def test_reorder_cards(client):
    first, second = _one_card(client)
    assert (first["position"], second["position"]) == (1, 2)
    client.put("/api/cards/order", json={"ids": [second["id"], first["id"]]})
    assert [c["id"] for c in client.get("/api/cards").json()] == [second["id"], first["id"]]
