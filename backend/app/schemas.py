from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

Language = Literal["en", "de", "ru"]
Level = Literal["A1", "A2", "B1", "B2", "C1", "C2"]


class ProfileIn(BaseModel):
    # The pair a new deck starts with.
    known_language: Language
    target_language: Language
    # The learner's level in each language they learn.
    levels: dict[Language, Level] = Field(default_factory=dict)
    sentence_min_words: int = Field(default=8, ge=3, le=30)
    sentence_max_words: int = Field(default=12, ge=3, le=30)
    # 0 means no bound in characters.
    sentence_min_chars: int = Field(default=0, ge=0, le=500)
    sentence_max_chars: int = Field(default=0, ge=0, le=500)


class ProfileOut(ProfileIn):
    model_config = ConfigDict(from_attributes=True)
    placement_tests: dict[str, str]
    # False until the learner first saves their settings.
    set_up: bool
    study_deck_ids: list[int]


class StudyDecksIn(BaseModel):
    deck_ids: list[int]


class DeckIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    description: str = Field(default="", max_length=2000)
    instructions: str = Field(default="", max_length=2000)
    known_language: Language | None = None
    target_language: Language | None = None
    # Empty means the learner's level in the target language.
    level: Level | Literal[""] = ""
    new_per_day: int = Field(default=10, ge=0, le=999)
    reviews_per_day: int = Field(default=200, ge=0, le=9999)


class DeckUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=2000)
    instructions: str | None = Field(default=None, max_length=2000)
    known_language: Language | None = None
    target_language: Language | None = None
    level: Level | Literal[""] | None = None
    new_per_day: int | None = Field(default=None, ge=0, le=999)
    reviews_per_day: int | None = Field(default=None, ge=0, le=9999)


class DeckOut(BaseModel):
    id: int
    name: str
    description: str
    instructions: str
    known_language: str
    target_language: str
    level: str
    # The level generation uses: the deck's own, or the learner's in the target language.
    effective_level: str
    new_per_day: int
    reviews_per_day: int
    cards: int
    due: int
    new: int
    needs_check: int
    archived: int
    to_regenerate: int
    teachers: list[str]


class TextIn(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    body: str = Field(min_length=1, max_length=50000)
    # Where the text came from; kept apart from the body, so no card is made from a link.
    source_url: str = Field(default="", max_length=500, pattern=r"^(https?://\S+)?$")
    notes: str = Field(default="", max_length=2000)

    @field_validator("body")
    @classmethod
    def not_blank(cls, body: str) -> str:
        if not body.strip():
            raise ValueError("The text is empty")
        return body


class TextSummary(BaseModel):
    id: int
    title: str
    source_url: str
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
    source_url: str
    notes: str
    body: str
    sentences: list[Sentence]
    marks: list["MarkOut"]


class MarkOut(BaseModel):
    """A word marked in one sentence: the word and its sentence are the mark's identity, so the
    same word can be learned in two meanings from one text."""

    word: str
    sentence: str
    status: Literal["learn", "ignore"]
    # The word's translation in this sentence, once it has been looked up.
    gloss: str
    # The learner's decks that already have a card for this word.
    decks: list[str]


class GlossIn(BaseModel):
    llm_output: "LLMOutput | None" = None


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
    highlight: str
    instructions: str
    source_sentence: str
    sentence: str
    translation: str
    status: str
    problems: list[str]
    position: int
    edited: bool
    needs_check: bool
    note: str
    needs_regeneration: bool
    regenerations: int
    teacher_checked_at: datetime | None
    deck_ids: list[int]
    # The text it came from still exists, so the card can link to it.
    text_exists: bool
    # One of its decks is shared with a teacher, so the learner can ask them about it.
    can_ask_teacher: bool


class GenerateOut(BaseModel):
    created: list[CardOut]
    # How many of the new cards' sentences failed a check and had to be written again.
    rewritten: int = 0
    # Set when so many had to be written again that the instructions or the model may be wrong.
    warning: str = ""


class StatsOut(BaseModel):
    """Token use as the provider reported it, and how the learner judged the cards."""

    input_tokens: int
    output_tokens: int
    cards: int
    kept_as_generated: int
    edited: int
    regenerated: int
    regenerations: int
    archived: int
    deleted: int
    failed_checks: int


class CardUpdate(BaseModel):
    sentence: str | None = Field(default=None, min_length=1, max_length=1000)
    translation: str | None = Field(default=None, min_length=1, max_length=1000)
    word_form: str | None = Field(default=None, min_length=1, max_length=100)
    word_translation: str | None = Field(default=None, max_length=200)
    status: Literal["active", "archived"] | None = None
    needs_check: bool | None = None
    note: str | None = Field(default=None, max_length=1000)
    needs_regeneration: bool | None = None
    # A teacher confirms the card is right as it stands.
    teacher_checked: bool | None = None


class CardDecksIn(BaseModel):
    deck_ids: list[int] = Field(min_length=1)


class RegenerateIn(BaseModel):
    feedback: str = Field(default="", max_length=500)
    # Instructions for this card's next sentence; they replace the ones it keeps.
    instructions: str | None = Field(default=None, max_length=2000)
    llm_output: LLMOutput | None = None


class BatchRegenerateIn(BaseModel):
    llm_output: LLMOutput | None = None


class BatchRegenerateOut(BaseModel):
    regenerated: list["CardOut"]
    # Cards still marked; a learner with their own key sends one batch at a time.
    remaining: int


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
    description: str
    instructions: str
    known_language: str
    target_language: str
    student: str
    student_name: str
    cards: int
    needs_check: int
    # Cards the teacher has not confirmed since they last changed.
    to_check: int
    archived: int


class ReviewIn(BaseModel):
    rating: Literal["again", "hard", "good", "easy"]
    # The sentence was too hard for the learner; the next generation is told to go easier.
    too_hard: bool = False


class StudyOut(BaseModel):
    card: CardOut | None
    # How long until the card returns, for each rating.
    intervals: dict[str, str] | None
    is_new: bool
    # Left in this session: new cards, reviews of cards from earlier days, and cards to see
    # again today because they were just learned or forgotten.
    new: int
    review: int
    again: int
    next_due: datetime | None
    # Done today: new cards started, and reviews of cards started before today.
    new_done: int
    reviews_done: int


class ReviewOut(BaseModel):
    card_id: int
    due: datetime
    reps: int


TextDetail.model_rebuild()
GlossIn.model_rebuild()
