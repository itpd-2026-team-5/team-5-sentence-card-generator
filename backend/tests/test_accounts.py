from fastapi.testclient import TestClient

from app.main import app
from tests.conftest import verify_link_token
from tests.helpers import first_deck

TEXT = "Ich gehe heute zur Bank. Dort hole ich Geld."


def one_card(client):
    text = client.post("/api/texts", json={"title": "T", "body": TEXT}).json()
    client.put(
        f"/api/texts/{text['id']}/marks",
        json={"word": "Geld", "sentence": "Dort hole ich Geld.", "status": "learn"},
    )
    url = f"/api/texts/{text['id']}/generate"
    return client.post(url, json={"deck_id": first_deck(client)}).json()["created"][0]


def test_sign_up_sign_out_and_sign_in(client):
    assert client.get("/api/auth/me").json()["email"] == "learner@example.com"
    assert client.post("/api/auth/logout").status_code == 204
    assert client.get("/api/decks").status_code == 401
    wrong = {"email": "learner@example.com", "password": "not the one"}
    assert client.post("/api/auth/login", json=wrong).status_code == 401
    right = {"email": "Learner@Example.com", "password": "correct horse"}
    assert client.post("/api/auth/login", json=right).status_code == 200
    assert client.get("/api/decks").status_code == 200


def test_an_email_has_one_account(client):
    again = {"email": "learner@example.com", "password": "another one", "full_name": "Ann"}
    assert TestClient(app).post("/api/auth/register", json=again).status_code == 409


def test_sign_up_needs_a_full_name(client):
    nameless = {"email": "new@example.com", "password": "correct horse"}
    assert TestClient(app).post("/api/auth/register", json=nameless).status_code == 422


def test_the_app_is_locked_until_the_email_is_verified(client):
    new = TestClient(app)
    account = {"email": "new@example.com", "password": "correct horse", "full_name": "Ana Neu"}
    user = new.post("/api/auth/register", json=account).json()
    assert (user["full_name"], user["verified"]) == ("Ana Neu", False)
    assert new.get("/api/decks").json()["detail"] == "verify_email"
    assert new.get("/api/auth/me").json()["verified"] is False

    # A second email right away is refused, so nobody can flood an inbox.
    assert new.post("/api/auth/resend").status_code == 429
    assert new.post("/api/auth/verify", json={"token": "x" * 20}).status_code == 400

    token = verify_link_token("new@example.com")
    assert new.post("/api/auth/verify", json={"token": token}).json()["verified"] is True
    assert new.get("/api/decks").status_code == 200
    # The link works once.
    assert new.post("/api/auth/verify", json={"token": token}).status_code == 400


def test_a_new_learner_starts_on_settings(client):
    profile = client.get("/api/profile").json()
    assert profile["set_up"] is False
    del profile["placement_tests"], profile["set_up"]
    assert client.put("/api/profile", json=profile).json()["set_up"] is True


def test_learners_do_not_see_each_others_cards(client, teacher):
    card = one_card(client)
    assert teacher.get("/api/cards").json() == []
    assert teacher.patch(f"/api/cards/{card['id']}", json={"status": "bad"}).status_code == 404
    assert teacher.get(f"/api/teaching/{first_deck(client)}/cards").status_code == 404


def test_a_teacher_corrects_only_the_shared_deck(client, teacher):
    card = one_card(client)
    deck = first_deck(client)
    other = client.post("/api/decks", json={"name": "Private"}).json()["id"]

    assert (
        client.post(f"/api/decks/{deck}/shares", json={"email": "nobody@x.org"}).status_code == 404
    )
    shared = client.post(f"/api/decks/{deck}/shares", json={"email": "teacher@example.com"})
    assert shared.status_code == 201
    assert [s["email"] for s in client.get(f"/api/decks/{deck}/shares").json()] == [
        "teacher@example.com"
    ]

    taught = teacher.get("/api/teaching").json()
    assert [(d["id"], d["student"], d["cards"]) for d in taught] == [
        (deck, "learner@example.com", 1)
    ]
    assert teacher.get(f"/api/teaching/{other}/cards").status_code == 404

    url = f"/api/cards/{card['id']}"
    fixed = teacher.patch(url, json={"sentence": "Dort hole ich mein Geld ab."}).json()
    assert fixed["sentence"] == "Dort hole ich mein Geld ab."
    fresh = teacher.post(f"{url}/regenerate", json={"feedback": "Too short."})
    assert fresh.status_code == 200
    assert client.get("/api/cards").json()[0]["sentence"] == fresh.json()["sentence"]

    client.delete(f"/api/decks/{deck}/shares/teacher@example.com")
    assert teacher.get("/api/teaching").json() == []
    assert teacher.patch(url, json={"status": "bad"}).status_code == 404


def test_own_key_in_the_browser(client):
    """With the learner's own key the server hands the request to the browser and never
    calls the LLM itself; the browser sends the answer back with the same request."""
    text = client.post("/api/texts", json={"title": "T", "body": TEXT}).json()
    client.put(
        f"/api/texts/{text['id']}/marks",
        json={"word": "Geld", "sentence": "Dort hole ich Geld.", "status": "learn"},
    )
    url = f"/api/texts/{text['id']}/generate"
    body = {"deck_id": first_deck(client)}
    browser = {"X-LLM": "browser"}

    handoff = client.post(url, json=body, headers=browser)
    assert handoff.status_code == 409
    request = handoff.json()["llm_request"]
    assert "Geld" in request["prompt"] and request["schema"]["required"] == ["cards"]
    assert client.get("/api/cards").json() == []

    answer = {
        "cards": [
            {
                "word": "Geld",
                "word_form": "Geld",
                "word_translation": "money",
                "sentence": "Ich habe heute leider kein Geld bei mir.",
                "translation": "Unfortunately I have no money on me today.",
            }
        ]
    }
    output = {"data": answer, "model": "claude-opus-5-5", "input_tokens": 900, "output_tokens": 80}
    done = client.post(url, json={**body, "llm_output": output}, headers=browser).json()
    assert done["created"][0]["word_translation"] == "money"
    assert client.get("/api/usage").json()["input_tokens"] == 900


def test_two_first_requests_at_once_share_one_profile(client, db_session):
    """The first page a new user opens asks for several things at once; a race to create the
    profile must not fail either request."""
    from app.main import create_profile
    from app.models import Profile, User

    user = db_session.query(User).filter_by(email="learner@example.com").one()
    again = create_profile(db_session, user)
    assert again.id == db_session.query(Profile).filter_by(user_id=user.id).one().id
    assert len(client.get("/api/decks").json()) == 1
