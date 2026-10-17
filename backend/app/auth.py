"""Accounts: email and password, a session cookie, and the signed-in user for each request."""

import hashlib
import hmac
import secrets
from datetime import UTC, datetime, timedelta

from fastapi import Depends, HTTPException, Request, Response
from sqlalchemy.orm import Session as DbSession

from app import mail
from app.config import settings
from app.db import get_db
from app.models import Session, User

COOKIE = "session"
# scrypt parameters: about 16 MiB of memory per hash, which slows down guessing.
_N, _R, _P = 2**14, 8, 1


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=_N, r=_R, p=_P)
    return f"scrypt${salt.hex()}${digest.hex()}"


def check_password(password: str, stored: str) -> bool:
    try:
        _, salt, digest = stored.split("$")
    except ValueError:
        return False
    candidate = hashlib.scrypt(password.encode(), salt=bytes.fromhex(salt), n=_N, r=_R, p=_P)
    return hmac.compare_digest(candidate.hex(), digest)


def _token_hash(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def start_session(db: DbSession, user: User, response: Response) -> None:
    token = secrets.token_urlsafe(32)
    db.add(Session(token_hash=_token_hash(token), user_id=user.id))
    db.commit()
    response.set_cookie(
        COOKIE, token, httponly=True, samesite="lax", max_age=60 * 60 * 24 * 30, path="/"
    )


def end_session(db: DbSession, request: Request, response: Response) -> None:
    token = request.cookies.get(COOKIE)
    if token:
        session = db.get(Session, _token_hash(token))
        if session:
            db.delete(session)
            db.commit()
    response.delete_cookie(COOKIE, path="/")


def signed_in_user(request: Request, db: DbSession = Depends(get_db)) -> User:
    """The signed-in user, verified or not: for the account endpoints themselves."""
    token = request.cookies.get(COOKIE)
    session = db.get(Session, _token_hash(token)) if token else None
    if session is None:
        raise HTTPException(401, "Sign in first")
    return session.user


def current_user(user: User = Depends(signed_in_user)) -> User:
    """The signed-in user, who must have verified their email to use the app."""
    if user.email_verified_at is None:
        raise HTTPException(403, "verify_email")
    return user


VERIFY_LINK_VALID = timedelta(days=2)
RESEND_AFTER = timedelta(minutes=1)


def send_verification(db: DbSession, user: User) -> None:
    """Email a one-time link that proves the user owns the address."""
    now = datetime.now(UTC)
    sent = user.verify_sent_at
    if sent is not None and sent.tzinfo is None:
        sent = sent.replace(tzinfo=UTC)
    if sent is not None and now - sent < RESEND_AFTER:
        raise HTTPException(429, "We just sent a link; wait a minute before asking again")
    token = secrets.token_urlsafe(32)
    user.verify_token_hash = _token_hash(token)
    user.verify_sent_at = now
    db.commit()
    link = f"{settings.app_url}/#/verify?token={token}"
    mail.send(
        user.email,
        "Confirm your email for Sentence Cards",
        f"Hello {user.full_name},\n\n"
        f"Open this link to confirm your email address and start using Sentence Cards:\n\n"
        f"{link}\n\n"
        f"The link works for {VERIFY_LINK_VALID.days} days. "
        f"If you did not sign up, ignore this email.\n",
    )


def verify_email(db: DbSession, token: str) -> User:
    user = db.query(User).filter_by(verify_token_hash=_token_hash(token)).one_or_none()
    if user is None:
        raise HTTPException(400, "This link is not valid; it may have been used already")
    sent = user.verify_sent_at
    if sent is not None and sent.tzinfo is None:
        sent = sent.replace(tzinfo=UTC)
    if sent is None or datetime.now(UTC) - sent > VERIFY_LINK_VALID:
        raise HTTPException(400, "This link has expired; sign in and ask for a new one")
    user.email_verified_at = datetime.now(UTC)
    user.verify_token_hash = None
    db.commit()
    return user
