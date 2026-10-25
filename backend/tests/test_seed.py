"""The demo data: anyone who runs the app gets the same accounts, decks, and cards."""

import pytest
from fastapi.testclient import TestClient

from app.db import Base, SessionLocal, engine
from app.main import app
from app.seed import seed


@pytest.fixture
def db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    with SessionLocal() as session:
        yield session
    Base.metadata.drop_all(engine)


def sign_in(email: str, password: str) -> TestClient:
    c = TestClient(app)
    assert c.post("/api/auth/login", json={"email": email, "password": password}).status_code == 200
    return c


def test_the_demo_accounts_can_sign_in_and_see_their_decks(db):
    assert seed(db) is True
    learner = sign_in("learner@example.com", "learner-demo")
    decks = {d["name"]: d for d in learner.get("/api/decks").json()}
    assert list(decks) == ["Travel by train", "Shopping", "At work", "Русский: дома"]
    assert decks["Shopping"]["needs_check"] == 1 and decks["At work"]["archived"] == 1
    assert decks["Travel by train"]["teachers"] == ["teacher@example.com"]
    # Three reviews are due, one card is back again today, and the rest are new.
    study = learner.get("/api/study").json()
    assert (study["review"], study["again"]) == (3, 1)
    # Both meanings of Bank are marked in the same text.
    text = next(t for t in learner.get("/api/texts").json() if t["title"] == "Am Bahnhof")
    marks = learner.get(f"/api/texts/{text['id']}").json()["marks"]
    assert sorted(m["gloss"] for m in marks if m["word"] == "Bank") == ["bank", "bench"]

    teacher = sign_in("teacher@example.com", "teacher-demo")
    assert sorted(d["name"] for d in teacher.get("/api/teaching").json()) == [
        "Shopping",
        "Travel by train",
    ]
    ivan = sign_in("ivan.teacher@example.com", "teacher-demo")
    assert [d["name"] for d in ivan.get("/api/teaching").json()] == ["Русский: дома"]


def test_seeding_again_changes_nothing_unless_reset(db):
    assert seed(db) is True
    assert seed(db) is False
    learner = sign_in("learner@example.com", "learner-demo")
    learner.patch(
        f"/api/decks/{learner.get('/api/decks').json()[0]['id']}", json={"name": "Renamed"}
    )
    assert seed(db, reset=True) is True
    learner = sign_in("learner@example.com", "learner-demo")
    assert learner.get("/api/decks").json()[0]["name"] == "Travel by train"
    assert len(learner.get("/api/cards").json()) == 16
