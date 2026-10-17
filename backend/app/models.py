from datetime import datetime

from sqlalchemy import JSON, Column, DateTime, ForeignKey, String, Table, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class User(Base):
    """An account. The same person can be a learner and, for decks shared with them, a teacher."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(254), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(200), default="")
    password_hash: Mapped[str] = mapped_column(String(300))
    # Set when the user opens the link we emailed; until then the app stays locked.
    email_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    # Only a hash of the emailed token is kept, like the session token.
    verify_token_hash: Mapped[str | None] = mapped_column(String(64), index=True)
    verify_sent_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    profile: Mapped["Profile"] = relationship(back_populates="user", uselist=False)


class Session(Base):
    """A signed-in browser. Only a hash of the cookie's token is stored."""

    __tablename__ = "sessions"

    token_hash: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    user: Mapped[User] = relationship()


class Profile(Base):
    """A learner's settings and everything they own: texts, decks, cards."""

    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), unique=True
    )
    known_language: Mapped[str] = mapped_column(String(2), default="en")
    target_language: Mapped[str] = mapped_column(String(2), default="de")
    level: Mapped[str] = mapped_column(String(2), default="A2")
    sentence_min_words: Mapped[int] = mapped_column(default=8)
    sentence_max_words: Mapped[int] = mapped_column(default=12)
    # German words run long, so a sentence can also be capped in characters (0 = no cap).
    sentence_max_chars: Mapped[int] = mapped_column(default=0)
    # False until the learner first saves their settings; the app opens on Settings until then.
    set_up: Mapped[bool] = mapped_column(default=False)

    user: Mapped[User | None] = relationship(back_populates="profile")


# A card belongs to at least one deck and may belong to several.
card_decks = Table(
    "card_decks",
    Base.metadata,
    Column("card_id", ForeignKey("cards.id", ondelete="CASCADE"), primary_key=True),
    Column("deck_id", ForeignKey("decks.id", ondelete="CASCADE"), primary_key=True),
)


class Deck(Base):
    """What the learner studies. Its instructions steer every sentence generated for it."""

    __tablename__ = "decks"

    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    name: Mapped[str] = mapped_column(String(100))
    instructions: Mapped[str] = mapped_column(Text, default="")
    position: Mapped[int] = mapped_column(default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    cards: Mapped[list["Card"]] = relationship(secondary=card_decks, back_populates="decks")
    profile: Mapped[Profile] = relationship()
    shares: Mapped[list["DeckShare"]] = relationship(
        back_populates="deck", cascade="all, delete-orphan"
    )


class DeckShare(Base):
    """A learner lets a teacher see and correct one deck; the teacher sees no other deck."""

    __tablename__ = "deck_shares"

    deck_id: Mapped[int] = mapped_column(
        ForeignKey("decks.id", ondelete="CASCADE"), primary_key=True
    )
    teacher_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    deck: Mapped[Deck] = relationship(back_populates="shares")
    teacher: Mapped[User] = relationship()


class SourceText(Base):
    __tablename__ = "texts"

    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    title: Mapped[str] = mapped_column(String(200))
    body: Mapped[str] = mapped_column(Text)
    position: Mapped[int] = mapped_column(default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    words: Mapped[list["TextWord"]] = relationship(
        back_populates="text", cascade="all, delete-orphan"
    )


class TextWord(Base):
    """A word the learner marked in a text: to learn, or to ignore."""

    __tablename__ = "text_words"

    id: Mapped[int] = mapped_column(primary_key=True)
    text_id: Mapped[int] = mapped_column(ForeignKey("texts.id"))
    word: Mapped[str] = mapped_column(String(100))
    sentence: Mapped[str] = mapped_column(Text)
    # The sentence with its neighbours, so the LLM can tell which meaning the word has.
    context: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(10))  # "learn" or "ignore"

    text: Mapped[SourceText] = relationship(back_populates="words")


class Card(Base):
    """A sentence for one word. Once generated it no longer depends on its text, which the
    learner may edit or delete; the text's title and the source sentence are kept as a note."""

    __tablename__ = "cards"

    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    text_id: Mapped[int | None] = mapped_column(ForeignKey("texts.id", ondelete="SET NULL"))
    text_title: Mapped[str] = mapped_column(String(200), default="")
    word: Mapped[str] = mapped_column(String(100))
    word_form: Mapped[str] = mapped_column(String(100))
    # The word's meaning in this sentence, in the learner's known language.
    word_translation: Mapped[str] = mapped_column(String(200), default="")
    source_sentence: Mapped[str] = mapped_column(Text)
    context: Mapped[str] = mapped_column(Text, default="")
    sentence: Mapped[str] = mapped_column(Text)
    translation: Mapped[str] = mapped_column(Text)
    # "active"; "flagged" when the generated sentence failed a check;
    # "bad" when a person marked it for removal or regeneration.
    status: Mapped[str] = mapped_column(String(10), default="active")
    problems: Mapped[list[str]] = mapped_column(JSON, default=list)
    # The learner wants their teacher to look at this card; the note says why.
    needs_check: Mapped[bool] = mapped_column(default=False)
    note: Mapped[str] = mapped_column(Text, default="")
    # The learner's order: lower comes first.
    position: Mapped[int] = mapped_column(default=0)
    # True once a person changed the sentence, translation, or word form by hand.
    edited: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    review: Mapped["ReviewState | None"] = relationship(
        back_populates="card", cascade="all, delete-orphan", uselist=False
    )
    decks: Mapped[list[Deck]] = relationship(secondary=card_decks, back_populates="cards")

    @property
    def deck_ids(self) -> list[int]:
        return [deck.id for deck in self.decks]


class ReviewState(Base):
    """Where a card is in the learner's FSRS schedule. A card without one is new."""

    __tablename__ = "review_states"

    card_id: Mapped[int] = mapped_column(
        ForeignKey("cards.id", ondelete="CASCADE"), primary_key=True
    )
    # The FSRS card, as the fsrs library serialises it.
    fsrs: Mapped[dict] = mapped_column(JSON)
    due: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    reps: Mapped[int] = mapped_column(default=0)
    lapses: Mapped[int] = mapped_column(default=0)
    # The learner said the sentence was too hard; the next generation is told to go easier.
    too_hard: Mapped[bool] = mapped_column(default=False)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    card: Mapped[Card] = relationship(back_populates="review")


class GenerationLog(Base):
    __tablename__ = "generation_logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    model: Mapped[str] = mapped_column(String(100))
    words: Mapped[int]
    input_tokens: Mapped[int]
    output_tokens: Mapped[int]
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
