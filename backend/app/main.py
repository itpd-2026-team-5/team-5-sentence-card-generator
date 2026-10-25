from fastapi import Depends, FastAPI, HTTPException, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app import study
from app.auth import (
    check_password,
    current_user,
    end_session,
    hash_password,
    send_verification,
    signed_in_user,
    start_session,
    verify_email,
)
from app.config import PLACEMENT_TESTS, settings
from app.db import get_db
from app.generation import (
    REWRITE_WARNING,
    deck_level,
    generate_cards,
    gloss_marks,
    mark_context,
    more_cards,
    regenerate_card,
    regenerate_marked,
)
from app.llm import BrowserProvider, LLMError, LLMProvider, NeedsLLM, get_provider
from app.mail import MailError
from app.models import (
    Card,
    Deck,
    DeckShare,
    GenerationLog,
    Profile,
    ReviewState,
    SourceText,
    TextWord,
    User,
)
from app.schemas import (
    BatchRegenerateIn,
    BatchRegenerateOut,
    CardDecksIn,
    CardOut,
    CardUpdate,
    Credentials,
    DeckIn,
    DeckOut,
    DeckUpdate,
    GenerateIn,
    GenerateOut,
    GlossIn,
    MarkIn,
    MarkOut,
    MoreIn,
    OrderIn,
    ProfileIn,
    ProfileOut,
    RegenerateIn,
    ReviewIn,
    ReviewOut,
    ShareIn,
    ShareOut,
    SignUp,
    StatsOut,
    StudyDecksIn,
    StudyOut,
    TaughtDeck,
    TextDetail,
    TextIn,
    TextSummary,
    UserOut,
    VerifyIn,
)
from app.tokenize import find_sentences, tokenize

# The schema is managed by Alembic: run `alembic upgrade head` before starting the server.
app = FastAPI(title="Sentence Cards Generator")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FIRST_DECK = "My first deck"


def create_profile(db: Session, user: User) -> Profile:
    """A learner profile with a first deck. Two requests may race to create it (the first page
    a new user opens asks for several things at once); the loser reads the winner's profile."""
    try:
        profile = Profile(user_id=user.id)
        db.add(profile)
        # The profile row must exist before its first deck refers to it.
        db.flush()
        db.add(
            Deck(
                profile_id=profile.id,
                name=FIRST_DECK,
                position=1,
                known_language=profile.known_language or "en",
                target_language=profile.target_language or "de",
            )
        )
        db.commit()
    except IntegrityError:
        db.rollback()
        profile = db.scalar(select(Profile).where(Profile.user_id == user.id))
    return profile


def current_profile(db: Session = Depends(get_db), user: User = Depends(current_user)) -> Profile:
    """The signed-in user's learner profile; accounts made before profiles get one on first use."""
    return user.profile or create_profile(db, user)


def pick_provider(request: Request, output) -> LLMProvider:
    """The learner's own key in their browser, or the server's provider."""
    if request.headers.get("x-llm") == "browser":
        return BrowserProvider(output.model_dump() if output else None)
    return get_provider()


def llm_call(db: Session, action):
    """Run an action that calls the LLM; turn the browser hand-off and LLM errors into replies."""
    try:
        return action()
    except NeedsLLM as e:
        db.rollback()
        return JSONResponse({"detail": "needs_llm", "llm_request": e.request}, status_code=409)
    except LLMError as e:
        db.rollback()
        raise HTTPException(502, str(e)) from e


def own(model, item_id: int, db: Session, profile: Profile, name: str):
    item = db.get(model, item_id)
    if item is None or item.profile_id != profile.id:
        raise HTTPException(404, f"{name} not found")
    return item


def own_text(text_id: int, db: Session, profile: Profile) -> SourceText:
    return own(SourceText, text_id, db, profile, "Text")


def own_deck(deck_id: int, db: Session, profile: Profile) -> Deck:
    return own(Deck, deck_id, db, profile, "Deck")


def own_card(card_id: int, db: Session, profile: Profile) -> Card:
    return own(Card, card_id, db, profile, "Card")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


# ---------- accounts ----------


def user_out(user: User) -> UserOut:
    return UserOut(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        verified=user.email_verified_at is not None,
    )


@app.post("/api/auth/register", response_model=UserOut, status_code=201)
def register(data: SignUp, response: Response, db: Session = Depends(get_db)):
    """Create an account and email a link to confirm the address. The new user is signed in,
    but the app stays locked until they open the link."""
    email = data.email.strip().lower()
    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(409, "An account with this email already exists")
    user = User(
        email=email, full_name=data.full_name.strip(), password_hash=hash_password(data.password)
    )
    db.add(user)
    db.commit()
    create_profile(db, user)
    start_session(db, user, response)
    try:
        send_verification(db, user)
    except MailError:
        # The account exists; the user can ask for the email again from the app.
        pass
    return user_out(user)


@app.post("/api/auth/login", response_model=UserOut)
def login(data: Credentials, response: Response, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == data.email.strip().lower()))
    if user is None or not check_password(data.password, user.password_hash):
        raise HTTPException(401, "Wrong email or password")
    start_session(db, user, response)
    return user_out(user)


@app.post("/api/auth/logout", status_code=204)
def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    end_session(db, request, response)


@app.get("/api/auth/me", response_model=UserOut)
def me(user: User = Depends(signed_in_user)):
    return user_out(user)


@app.post("/api/auth/verify", response_model=UserOut)
def verify(data: VerifyIn, db: Session = Depends(get_db)):
    """Confirm an email address with the token from the emailed link."""
    return user_out(verify_email(db, data.token))


@app.post("/api/auth/resend", status_code=204)
def resend(db: Session = Depends(get_db), user: User = Depends(signed_in_user)):
    if user.email_verified_at is not None:
        return
    try:
        send_verification(db, user)
    except MailError as e:
        raise HTTPException(502, str(e)) from e


# ---------- profile ----------


def profile_out(profile: Profile) -> ProfileOut:
    data = ProfileIn.model_validate(profile, from_attributes=True)
    return ProfileOut(
        **data.model_dump(),
        placement_tests=PLACEMENT_TESTS,
        set_up=profile.set_up,
        study_deck_ids=profile.study_deck_ids or [],
    )


@app.get("/api/profile", response_model=ProfileOut)
def read_profile(profile: Profile = Depends(current_profile)):
    return profile_out(profile)


@app.put("/api/profile", response_model=ProfileOut)
def update_profile(
    data: ProfileIn,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    if data.known_language == data.target_language:
        raise HTTPException(422, "Known and target language must differ")
    if data.sentence_min_words > data.sentence_max_words:
        raise HTTPException(422, "Minimum sentence length is above the maximum")
    if data.sentence_max_chars and data.sentence_min_chars > data.sentence_max_chars:
        raise HTTPException(422, "Minimum length in characters is above the maximum")
    first_time = not profile.set_up
    for key, value in data.model_dump().items():
        setattr(profile, key, value)
    if first_time:
        # The decks made before the learner chose their languages take the chosen pair.
        for deck in db.scalars(select(Deck).where(Deck.profile_id == profile.id)):
            deck.known_language = data.known_language
            deck.target_language = data.target_language
    profile.set_up = True
    db.commit()
    return profile_out(profile)


@app.put("/api/profile/study-decks", response_model=ProfileOut)
def save_study_decks(
    data: StudyDecksIn,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """Remember which decks the learner chose to study, so Today opens with the same choice."""
    owned = set(db.scalars(select(Deck.id).where(Deck.profile_id == profile.id)))
    profile.study_deck_ids = [d for d in dict.fromkeys(data.deck_ids) if d in owned]
    db.commit()
    return profile_out(profile)


# ---------- decks ----------


def _count(db: Session, query) -> int:
    return db.scalar(select(func.count()).select_from(query.subquery())) or 0


def deck_out(db: Session, deck: Deck) -> DeckOut:
    now = study.now_utc()
    in_deck = select(Card.id).where(Card.decks.any(Deck.id == deck.id))
    active = in_deck.where(Card.status == "active")
    return DeckOut(
        id=deck.id,
        name=deck.name,
        description=deck.description,
        instructions=deck.instructions,
        known_language=deck.known_language,
        target_language=deck.target_language,
        level=deck.level,
        effective_level=deck_level(deck.profile, deck),
        new_per_day=deck.new_per_day,
        reviews_per_day=deck.reviews_per_day,
        cards=_count(db, in_deck),
        due=_count(db, active.join(ReviewState).where(ReviewState.due <= now)),
        new=_count(db, active.outerjoin(ReviewState).where(ReviewState.card_id.is_(None))),
        needs_check=_count(db, in_deck.where(Card.needs_check.is_(True))),
        archived=_count(db, in_deck.where(Card.status == "archived")),
        to_regenerate=_count(db, in_deck.where(Card.needs_regeneration.is_(True))),
        teachers=[share.teacher.email for share in deck.shares],
    )


@app.get("/api/decks", response_model=list[DeckOut])
def list_decks(db: Session = Depends(get_db), profile: Profile = Depends(current_profile)):
    decks = db.scalars(
        select(Deck).where(Deck.profile_id == profile.id).order_by(Deck.position, Deck.id)
    ).all()
    return [deck_out(db, d) for d in decks]


@app.put("/api/decks/order", status_code=204)
def reorder_decks(
    data: OrderIn, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    """Put the learner's decks in the order they want to study them."""
    for position, deck_id in enumerate(data.ids, start=1):
        own_deck(deck_id, db, profile).position = position
    db.commit()


@app.post("/api/decks", response_model=DeckOut, status_code=201)
def create_deck(
    data: DeckIn, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    last = db.scalar(select(func.max(Deck.position)).where(Deck.profile_id == profile.id))
    values = data.model_dump()
    # A new deck starts with the learner's language pair unless it names its own.
    values["known_language"] = values["known_language"] or profile.known_language
    values["target_language"] = values["target_language"] or profile.target_language
    if values["known_language"] == values["target_language"]:
        raise HTTPException(422, "A deck's two languages must differ")
    deck = Deck(profile_id=profile.id, position=(last or 0) + 1, **values)
    db.add(deck)
    db.commit()
    return deck_out(db, deck)


@app.patch("/api/decks/{deck_id}", response_model=DeckOut)
def update_deck(
    deck_id: int,
    data: DeckUpdate,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    deck = own_deck(deck_id, db, profile)
    for key, value in data.model_dump(exclude_unset=True).items():
        if value is not None:
            setattr(deck, key, value)
    if deck.known_language == deck.target_language:
        raise HTTPException(422, "A deck's two languages must differ")
    db.commit()
    return deck_out(db, deck)


@app.delete("/api/decks/{deck_id}", status_code=204)
def delete_deck(
    deck_id: int, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    """Delete a deck. Its cards that are in no other deck are deleted with it."""
    deck = own_deck(deck_id, db, profile)
    if db.scalar(select(func.count()).select_from(Deck).where(Deck.profile_id == profile.id)) == 1:
        raise HTTPException(409, "Keep at least one deck")
    for card in list(deck.cards):
        if len(card.decks) == 1:
            db.delete(card)
    db.delete(deck)
    db.commit()


# ---------- texts ----------


@app.get("/api/texts", response_model=list[TextSummary])
def list_texts(db: Session = Depends(get_db), profile: Profile = Depends(current_profile)):
    texts = db.scalars(
        select(SourceText)
        .where(SourceText.profile_id == profile.id)
        .order_by(SourceText.position, SourceText.id)
    ).all()
    card_counts = dict(
        db.execute(
            select(Card.text_id, func.count())
            .where(Card.profile_id == profile.id)
            .group_by(Card.text_id)
        ).all()
    )
    return [
        TextSummary(
            id=t.id,
            title=t.title,
            source_url=t.source_url,
            position=t.position,
            to_learn=sum(1 for w in t.words if w.status == "learn"),
            cards=card_counts.get(t.id, 0),
        )
        for t in texts
    ]


@app.post("/api/texts", response_model=TextSummary, status_code=201)
def create_text(
    data: TextIn, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    last = db.scalar(
        select(func.max(SourceText.position)).where(SourceText.profile_id == profile.id)
    )
    text = SourceText(profile_id=profile.id, position=(last or 0) + 1, **data.model_dump())
    db.add(text)
    db.commit()
    return TextSummary(
        id=text.id,
        title=text.title,
        source_url=text.source_url,
        position=text.position,
        to_learn=0,
        cards=0,
    )


@app.put("/api/texts/order", status_code=204)
def reorder_texts(
    data: OrderIn, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    """Put the learner's texts in the order they want to work through them."""
    for position, text_id in enumerate(data.ids, start=1):
        own_text(text_id, db, profile).position = position
    db.commit()


def text_detail(text: SourceText, db: Session) -> TextDetail:
    learn = {w.word.lower() for w in text.words if w.status == "learn"}
    in_decks: dict[str, list[str]] = {}
    if learn:
        rows = db.execute(
            select(func.lower(Card.word), Deck.name)
            .join(Card.decks)
            .where(Card.profile_id == text.profile_id, func.lower(Card.word).in_(learn))
            .distinct()
        )
        for word, deck in rows:
            in_decks.setdefault(word, []).append(deck)
    return TextDetail(
        id=text.id,
        title=text.title,
        source_url=text.source_url,
        notes=text.notes,
        body=text.body,
        sentences=tokenize(text.body),
        marks=[
            MarkOut(
                word=w.word,
                sentence=w.sentence,
                status=w.status,
                gloss=w.gloss,
                decks=sorted(in_decks.get(w.word.lower(), [])) if w.status == "learn" else [],
            )
            for w in sorted(text.words, key=lambda w: w.id)
        ],
    )


@app.get("/api/texts/{text_id}", response_model=TextDetail)
def read_text(
    text_id: int, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    return text_detail(own_text(text_id, db, profile), db)


@app.put("/api/texts/{text_id}", response_model=TextDetail)
def update_text(
    text_id: int,
    data: TextIn,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """Edit a text. Cards already made from it keep their sentences; marks keep their words."""
    text = own_text(text_id, db, profile)
    for key, value in data.model_dump().items():
        setattr(text, key, value)
    db.commit()
    return text_detail(text, db)


@app.get("/api/texts/{text_id}/find", response_model=list[str])
def find_in_text(
    text_id: int,
    word: str = Query(min_length=1, max_length=100),
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """The sentences of a text that contain a word, so the learner can pick its context."""
    return find_sentences(own_text(text_id, db, profile).body, word)


@app.delete("/api/texts/{text_id}", status_code=204)
def delete_text(
    text_id: int, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    db.delete(own_text(text_id, db, profile))
    db.commit()


@app.put("/api/texts/{text_id}/marks", status_code=204)
def mark_word(
    text_id: int,
    data: MarkIn,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """Mark a word in one sentence. A word and its sentence are the mark's identity, so the same
    word can be learned in two sentences, for two meanings; ignoring a word is for the whole text,
    since an ignored word is kept out of every sentence."""
    text = own_text(text_id, db, profile)
    same_word = [w for w in text.words if w.word.lower() == data.word.lower()]
    if data.status == "learn":
        for w in same_word:
            if w.status == "ignore":
                text.words.remove(w)
        if not any(w.status == "learn" and w.sentence == data.sentence for w in same_word):
            text.words.append(
                TextWord(
                    word=data.word,
                    sentence=data.sentence,
                    context=mark_context(text, data.sentence),
                    status="learn",
                )
            )
    elif data.status == "ignore":
        for w in same_word:
            text.words.remove(w)
        text.words.append(
            TextWord(word=data.word, sentence=data.sentence, context="", status="ignore")
        )
    else:
        for w in same_word:
            if w.status == "ignore" or w.sentence == data.sentence:
                text.words.remove(w)
    db.commit()


@app.post("/api/texts/{text_id}/generate", response_model=GenerateOut)
def generate(
    text_id: int,
    data: GenerateIn,
    request: Request,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    text = own_text(text_id, db, profile)
    deck = own_deck(data.deck_id, db, profile)
    provider = pick_provider(request, data.llm_output)

    def run():
        cards, rewritten = generate_cards(db, provider, profile, text, deck)
        warning = ""
        if cards and rewritten / len(cards) >= REWRITE_WARNING:
            warning = (
                f"{rewritten} of {len(cards)} sentences failed a check and had to be written "
                "again. The deck's instructions may ask for something hard to meet, or the model "
                "may not suit this language; try clearer instructions or another model."
            )
        return GenerateOut(
            created=[CardOut.model_validate(c) for c in cards], rewritten=rewritten, warning=warning
        )

    return llm_call(db, run)


@app.post("/api/texts/{text_id}/glosses", response_model=TextDetail)
def gloss_words(
    text_id: int,
    data: GlossIn,
    request: Request,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """Translate each word marked to learn as it is used in its sentence, so the learner can
    see which meaning each mark is, such as "Bank: bench" and "Bank: bank"."""
    text = own_text(text_id, db, profile)
    provider = pick_provider(request, data.llm_output)

    def run():
        gloss_marks(db, provider, profile, text)
        return text_detail(text, db)

    return llm_call(db, run)


# ---------- cards ----------


def reachable_card(card_id: int, db: Session, user: User) -> Card:
    """A card the user may correct: their own, or one in a deck a student shared with them."""
    card = db.get(Card, card_id)
    if card is not None:
        owner = db.get(Profile, card.profile_id)
        if owner.user_id == user.id or any(
            share.teacher_id == user.id for deck in card.decks for share in deck.shares
        ):
            return card
    raise HTTPException(404, "Card not found")


@app.get("/api/cards", response_model=list[CardOut])
def list_cards(
    deck_id: int | None = None,
    text_id: int | None = None,
    status: str | None = None,
    needs_check: bool | None = None,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    query = select(Card).where(Card.profile_id == profile.id).order_by(Card.position, Card.id)
    if deck_id is not None:
        query = query.where(Card.decks.any(Deck.id == deck_id))
    if text_id is not None:
        query = query.where(Card.text_id == text_id)
    if status is not None:
        query = query.where(Card.status == status)
    if needs_check is not None:
        query = query.where(Card.needs_check.is_(needs_check))
    return db.scalars(query).all()


@app.put("/api/cards/order", status_code=204)
def reorder_cards(
    data: OrderIn, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    for position, card_id in enumerate(data.ids, start=1):
        own_card(card_id, db, profile).position = position
    db.commit()


@app.patch("/api/cards/{card_id}", response_model=CardOut)
def update_card(
    card_id: int,
    data: CardUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    card = reachable_card(card_id, db, user)
    owner = db.get(Profile, card.profile_id)
    is_teacher = owner.user_id != user.id
    flags = {"status", "needs_check", "note", "needs_regeneration", "teacher_checked"}
    changes = data.model_dump(exclude_unset=True, exclude=flags)
    for key, value in changes.items():
        setattr(card, key, value)
    if changes:
        # A person checked the card, so the generator's warnings no longer apply.
        card.edited = True
        card.problems = []
        card.status = "active"
        # A teacher's correction is checked by that teacher; a learner's needs checking again.
        card.teacher_checked_at = study.now_utc() if is_teacher else None
    if data.status is not None:
        card.status = data.status
    if data.needs_check and not card.can_ask_teacher:
        raise HTTPException(409, "Share one of this card's decks with a teacher first")
    if data.needs_check is not None:
        card.needs_check = data.needs_check
    if data.note is not None:
        card.note = data.note
    if data.needs_regeneration is not None:
        card.needs_regeneration = data.needs_regeneration
    if data.teacher_checked is not None:
        if not is_teacher:
            raise HTTPException(403, "Only a teacher of this deck can confirm a card")
        card.teacher_checked_at = study.now_utc() if data.teacher_checked else None
        if data.teacher_checked:
            card.needs_check = False
    db.commit()
    return card


@app.put("/api/cards/{card_id}/decks", response_model=CardOut)
def set_card_decks(
    card_id: int,
    data: CardDecksIn,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """Put a card in one or more decks; a card always belongs to at least one."""
    card = own_card(card_id, db, profile)
    card.decks = [own_deck(deck_id, db, profile) for deck_id in dict.fromkeys(data.deck_ids)]
    db.commit()
    return card


@app.post("/api/cards/{card_id}/regenerate", response_model=CardOut)
def regenerate(
    card_id: int,
    data: RegenerateIn,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(current_user),
):
    """Write a new sentence in place. A teacher may do this too, with their own key; the
    sentence is still written for the student's level and the deck's instructions."""
    card = reachable_card(card_id, db, user)
    owner = db.get(Profile, card.profile_id)
    provider = pick_provider(request, data.llm_output)
    return llm_call(
        db,
        lambda: CardOut.model_validate(
            regenerate_card(db, provider, owner, card, data.feedback, data.instructions)
        ),
    )


@app.post("/api/decks/{deck_id}/regenerate-marked", response_model=BatchRegenerateOut)
def regenerate_marked_cards(
    deck_id: int,
    data: BatchRegenerateIn,
    request: Request,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """Rewrite the next batch of the deck's cards marked for regeneration. Call again while
    `remaining` is above zero."""
    deck = own_deck(deck_id, db, profile)
    provider = pick_provider(request, data.llm_output)

    def run():
        done, remaining = regenerate_marked(db, provider, profile, deck)
        return BatchRegenerateOut(
            regenerated=[CardOut.model_validate(c) for c in done], remaining=remaining
        )

    return llm_call(db, run)


@app.post("/api/cards/{card_id}/more", response_model=GenerateOut)
def more(
    card_id: int,
    data: MoreIn,
    request: Request,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """More cards for the same word, each with a different sentence and its own progress."""
    card = own_card(card_id, db, profile)
    provider = pick_provider(request, data.llm_output)
    return llm_call(
        db,
        lambda: GenerateOut(
            created=[
                CardOut.model_validate(c)
                for c in more_cards(db, provider, profile, card, data.count)
            ]
        ),
    )


@app.delete("/api/cards/{card_id}", status_code=204)
def delete_card(card_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    card = reachable_card(card_id, db, user)
    owner = db.get(Profile, card.profile_id)
    owner.cards_deleted += 1
    db.delete(card)
    db.commit()


# ---------- sharing a deck with a teacher ----------


@app.get("/api/decks/{deck_id}/shares", response_model=list[ShareOut])
def list_shares(
    deck_id: int, db: Session = Depends(get_db), profile: Profile = Depends(current_profile)
):
    deck = own_deck(deck_id, db, profile)
    return [ShareOut(email=s.teacher.email, created_at=s.created_at) for s in deck.shares]


@app.post("/api/decks/{deck_id}/shares", response_model=ShareOut, status_code=201)
def share_deck(
    deck_id: int,
    data: ShareIn,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """Let a teacher, who already has an account, see and correct this deck."""
    deck = own_deck(deck_id, db, profile)
    teacher = db.scalar(select(User).where(User.email == data.email.strip().lower()))
    if teacher is None:
        raise HTTPException(404, "No account with this email; ask your teacher to sign up first")
    if teacher.id == profile.user_id:
        raise HTTPException(422, "You cannot share a deck with yourself")
    share = db.get(DeckShare, (deck.id, teacher.id))
    if share is None:
        share = DeckShare(deck_id=deck.id, teacher_id=teacher.id)
        db.add(share)
        db.commit()
    return ShareOut(email=teacher.email, created_at=share.created_at)


@app.delete("/api/decks/{deck_id}/shares/{email}", status_code=204)
def unshare_deck(
    deck_id: int,
    email: str,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    deck = own_deck(deck_id, db, profile)
    for share in list(deck.shares):
        if share.teacher.email == email.lower():
            db.delete(share)
    db.commit()


# ---------- teaching: the decks students shared with the signed-in user ----------


def taught_deck(deck_id: int, db: Session, user: User) -> Deck:
    if db.get(DeckShare, (deck_id, user.id)) is None:
        raise HTTPException(404, "Deck not found")
    return db.get(Deck, deck_id)


@app.get("/api/teaching", response_model=list[TaughtDeck])
def list_taught(db: Session = Depends(get_db), user: User = Depends(current_user)):
    shares = db.scalars(select(DeckShare).where(DeckShare.teacher_id == user.id)).all()
    return [
        TaughtDeck(
            id=share.deck.id,
            name=share.deck.name,
            description=share.deck.description,
            instructions=share.deck.instructions,
            known_language=share.deck.known_language,
            target_language=share.deck.target_language,
            student=share.deck.profile.user.email if share.deck.profile.user else "",
            student_name=share.deck.profile.user.full_name if share.deck.profile.user else "",
            cards=len(share.deck.cards),
            needs_check=sum(1 for c in share.deck.cards if c.needs_check),
            to_check=sum(1 for c in share.deck.cards if _to_check(c)),
            archived=sum(1 for c in share.deck.cards if c.status == "archived"),
        )
        for share in shares
    ]


def _to_check(card: Card) -> bool:
    """The teacher has not confirmed the card since it last changed."""
    return card.status != "archived" and card.teacher_checked_at is None


@app.get("/api/teaching/{deck_id}/cards", response_model=list[CardOut])
def taught_cards(deck_id: int, db: Session = Depends(get_db), user: User = Depends(current_user)):
    deck = taught_deck(deck_id, db, user)
    # Every card is there; the ones the student asked about come first, then the ones the
    # teacher has not confirmed yet, then the rest.
    return sorted(deck.cards, key=lambda c: (not c.needs_check, not _to_check(c), c.position, c.id))


@app.get("/api/stats", response_model=StatsOut)
def stats(db: Session = Depends(get_db), profile: Profile = Depends(current_profile)):
    """Tokens as the LLM provider reported them on each answer, and how the learner judged the
    cards: kept as written, edited, rewritten, archived, or deleted."""
    input_tokens, output_tokens = db.execute(
        select(
            func.coalesce(func.sum(GenerationLog.input_tokens), 0),
            func.coalesce(func.sum(GenerationLog.output_tokens), 0),
        ).where(GenerationLog.profile_id == profile.id)
    ).one()
    cards = db.scalars(select(Card).where(Card.profile_id == profile.id)).all()
    return StatsOut(
        input_tokens=input_tokens,
        output_tokens=output_tokens,
        cards=len(cards),
        kept_as_generated=sum(
            1 for c in cards if not c.edited and not c.regenerations and c.status == "active"
        ),
        edited=sum(1 for c in cards if c.edited),
        regenerated=sum(1 for c in cards if c.regenerations),
        regenerations=sum(c.regenerations for c in cards),
        archived=sum(1 for c in cards if c.status == "archived"),
        deleted=profile.cards_deleted,
        failed_checks=sum(1 for c in cards if c.status == "flagged"),
    )


# ---------- study ----------


@app.get("/api/study", response_model=StudyOut)
def study_next(
    decks: str = "",
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    """The next card to study, from the decks the learner chose (comma-separated ids)."""
    deck_ids = [int(d) for d in decks.split(",") if d.strip().isdigit()]
    now = study.now_utc()
    queue = study.queue(db, profile, now, deck_ids)
    new_done, reviews_done = study.today(db, profile, now)
    card = queue.next_card
    return StudyOut(
        card=CardOut.model_validate(card) if card else None,
        intervals=study.preview(card, now) if card else None,
        is_new=card is not None and card.review is None,
        new=queue.new,
        review=queue.review,
        again=queue.again,
        next_due=queue.next_due,
        new_done=new_done,
        reviews_done=reviews_done,
    )


@app.post("/api/cards/{card_id}/review", response_model=ReviewOut)
def review_card(
    card_id: int,
    data: ReviewIn,
    db: Session = Depends(get_db),
    profile: Profile = Depends(current_profile),
):
    card = own_card(card_id, db, profile)
    if card.status != "active":
        raise HTTPException(409, "Only checked cards can be studied")
    state = study.review(db, card, data.rating, data.too_hard, study.now_utc())
    return ReviewOut(card_id=card.id, due=state.due, reps=state.reps)
