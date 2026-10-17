def first_deck(client) -> int:
    """The deck every learner starts with."""
    return client.get("/api/decks").json()[0]["id"]


def profile_id(client) -> int:
    """The signed-in learner's profile id, read from one of their cards."""
    from app.db import SessionLocal
    from app.models import Profile, User

    email = client.get("/api/auth/me").json()["email"]
    with SessionLocal() as db:
        user = db.query(User).filter_by(email=email).one()
        return db.query(Profile).filter_by(user_id=user.id).one().id
