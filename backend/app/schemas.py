from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Language = Literal["en", "de", "ru"]
Level = Literal["A1", "A2", "B1", "B2", "C1", "C2"]


class ProfileIn(BaseModel):
    known_language: Language
    target_language: Language
    level: Level
    sentence_min_words: int = Field(default=8, ge=3, le=30)
    sentence_max_words: int = Field(default=12, ge=3, le=30)
    # 0 means no limit in characters.
    sentence_max_chars: int = Field(default=0, ge=0, le=500)


class ProfileOut(ProfileIn):
    model_config = ConfigDict(from_attributes=True)
    placement_tests: dict[str, str]
    # False until the learner first saves their settings.
    set_up: bool


class DeckIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    instructions: str = Field(default="", max_length=2000)


class DeckUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    instructions: str | None = Field(default=None, max_length=2000)


class DeckOut(BaseModel):
    id: int
    name: str
    instructions: str
    cards: int
    due: int
    new: int
    needs_check: int


class TextIn(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    body: str = Field(min_length=1, max_length=50000)


class TextSummary(BaseModel):
    id: int
    title: str
    position: int
    to_learn: int
    cards: int


class Token(BaseModel):
    text: str
    word: bool


class Sentence(BaseModel):
    text: str
    words: list[str]
    # Every piece of the sentence in order: words and the punctuation and spaces between them.
    tokens: list[Token]


class TextDetail(BaseModel):
    id: int
    title: str
    body: str
    sentences: list[Sentence]
    marks: dict[str, Literal["learn", "ignore"]]


class MarkIn(BaseModel):
    word: str = Field(min_length=1, max_length=100)
    sentence: str
    status: Literal["learn", "ignore", "none"]


class OrderIn(BaseModel):
    ids: list[int]


class LLMOutput(BaseModel):
    """What the browser got back from Claude when the learner uses their own key."""

    data: dict
    model: str = Field(max_length=100)
    input_tokens: int = Field(ge=0)
    output_tokens: int = Field(ge=0)


class GenerateIn(BaseModel):
    deck_id: int
    llm_output: LLMOutput | None = None


class CardOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    text_id: int | None
    text_title: str
    word: str
    word_form: str
    word_translation: str
    source_sentence: str
    sentence: str
    translation: str
    status: str
    problems: list[str]
    position: int
    edited: bool
    needs_check: bool
    note: str
    deck_ids: list[int]


class GenerateOut(BaseModel):
    created: list[CardOut]


class UsageOut(BaseModel):
    cards: int
    requests: int
    input_tokens: int
    output_tokens: int


class CardUpdate(BaseModel):
    sentence: str | None = Field(default=None, min_length=1, max_length=1000)
    translation: str | None = Field(default=None, min_length=1, max_length=1000)
    word_form: str | None = Field(default=None, min_length=1, max_length=100)
    word_translation: str | None = Field(default=None, max_length=200)
    status: Literal["active", "bad"] | None = None
    needs_check: bool | None = None
    note: str | None = Field(default=None, max_length=1000)


class CardDecksIn(BaseModel):
    deck_ids: list[int] = Field(min_length=1)


class RegenerateIn(BaseModel):
    feedback: str = Field(default="", max_length=500)
    llm_output: LLMOutput | None = None


class MoreIn(BaseModel):
    count: int = Field(default=1, ge=1, le=3)
    llm_output: LLMOutput | None = None


class Credentials(BaseModel):
    email: str = Field(min_length=3, max_length=254, pattern=r"^[^@\s]+@[^@\s]+$")
    password: str = Field(min_length=8, max_length=200)


class SignUp(Credentials):
    full_name: str = Field(min_length=2, max_length=200)


class VerifyIn(BaseModel):
    token: str = Field(min_length=10, max_length=200)


class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    verified: bool


class ShareIn(BaseModel):
    email: str = Field(min_length=3, max_length=254)


class ShareOut(BaseModel):
    email: str
    created_at: datetime


class TaughtDeck(BaseModel):
    """A deck a student shared with the signed-in teacher."""

    id: int
    name: str
    instructions: str
    student: str
    cards: int
    needs_check: int
    bad: int


class ReviewIn(BaseModel):
    rating: Literal["again", "hard", "good", "easy"]
    # The sentence was too hard for the learner; the next generation is told to go easier.
    too_hard: bool = False


class StudyOut(BaseModel):
    card: CardOut | None
    # How long until the card returns, for each rating.
    intervals: dict[str, str] | None
    is_new: bool
    due: int
    new: int
    next_due: datetime | None
    # Done today: new cards started, and reviews of cards started before today.
    new_done: int
    reviews_done: int


class ReviewOut(BaseModel):
    card_id: int
    due: datetime
    reps: int
