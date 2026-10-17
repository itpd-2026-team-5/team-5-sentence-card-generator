import os

# Must be set before the app modules are imported.
os.environ["DATABASE_URL"] = "sqlite:///./test.db"
os.environ["LLM_PROVIDER"] = "fake"
# Keep emails in memory (app.mail.OUTBOX) instead of sending them.
os.environ["SMTP_HOST"] = ""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event

from app.db import Base, engine
from app.main import app


# SQLite ignores foreign keys unless asked, and PostgreSQL enforces them; test like production.
@event.listens_for(engine, "connect")
def _foreign_keys(connection, _record):
    connection.execute("PRAGMA foreign_keys=ON")


def verify_link_token(email: str) -> str:
    """The token in the last verification email sent to an address."""
    from app.mail import OUTBOX

    message = next(m for m in reversed(OUTBOX) if m["To"] == email)
    return message.get_content().split("#/verify?token=")[1].split()[0]


def signed_in(email: str) -> TestClient:
    """A browser with its own cookies, signed up, verified, and signed in."""
    c = TestClient(app)
    account = {"email": email, "password": "correct horse", "full_name": "Test Person"}
    response = c.post("/api/auth/register", json=account)
    assert response.status_code == 201, response.text
    verified = c.post("/api/auth/verify", json={"token": verify_link_token(email)})
    assert verified.json()["verified"] is True
    return c


@pytest.fixture
def client():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    with signed_in("learner@example.com") as c:
        yield c
    Base.metadata.drop_all(engine)


@pytest.fixture
def teacher(client):
    """A second account, in its own browser."""
    with signed_in("teacher@example.com") as c:
        yield c


@pytest.fixture
def db_session(client):
    from app.db import SessionLocal

    with SessionLocal() as session:
        yield session
