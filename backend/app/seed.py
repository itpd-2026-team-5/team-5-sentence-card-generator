"""Demo data: a learner, two teachers, and their decks, texts, and cards, written straight into
the database so the app can be tried on any machine without an LLM key or an email inbox.

Run it inside the backend container, after `docker compose up`:

    docker compose exec backend uv run --no-dev python -m app.seed

It only touches the demo accounts below. Run it again with `--reset` to start them over.
"""

import sys
from datetime import UTC, datetime, timedelta
from typing import Any

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app import study
from app.auth import hash_password
from app.db import SessionLocal
from app.main import FIRST_DECK, create_profile
from app.models import (
    Card,
    Deck,
    DeckShare,
    GenerationLog,
    Profile,
    SourceText,
    TextWord,
    User,
)
from app.tokenize import context_for

LEARNER = ("learner@example.com", "learner-demo", "Lena Lerner")
TEACHER = ("teacher@example.com", "teacher-demo", "Tamara Lehrer")
RU_TEACHER = ("ivan.teacher@example.com", "teacher-demo", "Ivan Petrov")
ACCOUNTS = (LEARNER, TEACHER, RU_TEACHER)

# Each deck: its fields, the teacher it is shared with, and one text with the cards made from it.
# A card is (word, source sentence, its meaning there, the part to highlight, the new sentence,
# its translation). The sentences are written by hand, so the demo needs no LLM.
DECKS: list[dict[str, Any]] = [
    {
        "name": "Travel by train",
        "description": "Words from my train trips",
        "instructions": "Everyday situations at the station and on the train.",
        "target": "de",
        "teacher": TEACHER,
        "text": (
            "Am Bahnhof",
            "https://www.bahn.de/",
            (
                "Ich warte am Bahnhof auf meinen Zug. Leider hat der Zug heute zwanzig Minuten "
                "Verspätung. Ich setze mich auf eine Bank am Gleis. Später hole ich Geld von der "
                "Bank. Die Fahrkarte habe ich schon gestern gekauft."
            ),
        ),
        "cards": [
            (
                "Verspätung",
                "Leider hat der Zug heute zwanzig Minuten Verspätung.",
                "delay",
                "Verspätung",
                "Der Bus hat heute leider eine große Verspätung.",
                "Unfortunately, the bus has a long delay today.",
            ),
            (
                "Gleis",
                "Ich setze mich auf eine Bank am Gleis.",
                "platform",
                "Gleis",
                "Unser Zug fährt heute von Gleis drei ab.",
                "Our train leaves from platform three today.",
            ),
            # The same word in two meanings: one card for each of its sentences.
            (
                "Bank",
                "Ich setze mich auf eine Bank am Gleis.",
                "bench",
                "eine alte Bank",
                "Im Park steht eine alte Bank unter dem Baum.",
                "In the park there is an old bench under the tree.",
            ),
            (
                "Bank",
                "Später hole ich Geld von der Bank.",
                "bank",
                "Die Bank",
                "Die Bank öffnet morgen erst um neun Uhr.",
                "The bank only opens at nine tomorrow.",
            ),
            (
                "Fahrkarte",
                "Die Fahrkarte habe ich schon gestern gekauft.",
                "ticket",
                "die Fahrkarte",
                "Ich kaufe die Fahrkarte am Automaten.",
                "I buy the ticket at the machine.",
            ),
        ],
    },
    {
        "name": "Shopping",
        "description": "At the market and in shops",
        "instructions": "Shopping at the market and in the supermarket, polite everyday German.",
        "target": "de",
        "level": "A1",
        "teacher": TEACHER,
        "text": (
            "Auf dem Markt",
            "",
            (
                "Am Samstag gehe ich auf den Markt. Ich kaufe frisches Gemüse und ein Kilo Äpfel. "
                "Die Verkäuferin ist sehr freundlich. Ich bezahle mit Karte, weil ich kein Bargeld "
                "habe."
            ),
        ),
        "cards": [
            (
                "Gemüse",
                "Ich kaufe frisches Gemüse und ein Kilo Äpfel.",
                "vegetables",
                "das Gemüse",
                "Kann ich das Gemüse bitte mit Karte bezahlen?",
                "Can I pay for the vegetables by card, please?",
            ),
            (
                "Verkäuferin",
                "Die Verkäuferin ist sehr freundlich.",
                "saleswoman",
                "Die Verkäuferin",
                "Die Verkäuferin gibt mir eine kleine Tüte.",
                "The saleswoman gives me a small bag.",
            ),
            (
                "Bargeld",
                "Ich bezahle mit Karte, weil ich kein Bargeld habe.",
                "cash",
                "Bargeld",
                "Hast du noch Bargeld für den Markt?",
                "Do you still have cash for the market?",
            ),
            (
                "bezahle",
                "Ich bezahle mit Karte, weil ich kein Bargeld habe.",
                "pay",
                "bezahle",
                "Ich bezahle heute das Brot und die Milch.",
                "Today I pay for the bread and the milk.",
            ),
        ],
    },
    {
        "name": "At work",
        "description": "Office words",
        "instructions": "Sentences about an office job.",
        "target": "de",
        "level": "B1",
        "teacher": None,
        "text": (
            "Im Büro",
            "",
            (
                "Jeden Morgen lese ich zuerst meine E-Mails. Um zehn Uhr haben wir eine Besprechung "
                "mit dem ganzen Team. Danach schreibe ich einen Bericht für meine Chefin."
            ),
        ),
        "cards": [
            (
                "Besprechung",
                "Um zehn Uhr haben wir eine Besprechung mit dem ganzen Team.",
                "meeting",
                "Die Besprechung",
                "Die Besprechung beginnt heute eine Stunde später.",
                "The meeting starts an hour later today.",
            ),
            (
                "Bericht",
                "Danach schreibe ich einen Bericht für meine Chefin.",
                "report",
                "den Bericht",
                "Bis Freitag muss ich den Bericht fertig schreiben.",
                "I have to finish writing the report by Friday.",
            ),
            (
                "Chefin",
                "Danach schreibe ich einen Bericht für meine Chefin.",
                "boss",
                "Meine Chefin",
                "Meine Chefin arbeitet heute von zu Hause.",
                "My boss is working from home today.",
            ),
        ],
    },
    {
        "name": "Русский: дома",
        "description": "First Russian words",
        "instructions": "Simple sentences about home.",
        "target": "ru",
        "teacher": RU_TEACHER,
        "text": (
            "Дома",
            "",
            (
                "Утром я пью горячий чай на кухне. Потом я мою посуду и открываю окно. Вечером мы "
                "с сестрой готовим суп."
            ),
        ),
        "cards": [
            (
                "чай",
                "Утром я пью горячий чай на кухне.",
                "tea",
                "чай",
                "Мама наливает мне чай с лимоном.",
                "Mum pours me tea with lemon.",
            ),
            (
                "посуду",
                "Потом я мою посуду и открываю окно.",
                "dishes",
                "посуду",
                "После ужина я всегда мою посуду.",
                "After dinner I always wash the dishes.",
            ),
            (
                "окно",
                "Потом я мою посуду и открываю окно.",
                "window",
                "окно",
                "Пожалуйста, закрой окно, на улице холодно.",
                "Please close the window, it is cold outside.",
            ),
            (
                "суп",
                "Вечером мы с сестрой готовим суп.",
                "soup",
                "суп",
                "Этот суп очень вкусный и горячий.",
                "This soup is very tasty and hot.",
            ),
        ],
    },
]


def account(db: Session, email: str, password: str, name: str) -> tuple[User, Profile]:
    """A verified account with a set-up profile, as if the person had confirmed their email."""
    user = User(
        email=email,
        full_name=name,
        password_hash=hash_password(password),
        email_verified_at=datetime.now(UTC),
    )
    db.add(user)
    db.commit()
    profile = create_profile(db, user)
    profile.levels = {"de": "A2", "ru": "A1"}
    profile.sentence_min_words, profile.sentence_max_words = 5, 12
    profile.sentence_min_chars, profile.sentence_max_chars = 25, 90
    profile.set_up = True
    db.commit()
    return user, profile


def remove(db: Session) -> None:
    """Delete the demo accounts and everything they own."""
    emails = [email for email, _, _ in ACCOUNTS]
    users = db.scalars(select(User).where(User.email.in_(emails))).all()
    for user in users:
        profile = db.scalar(select(Profile).where(Profile.user_id == user.id))
        if profile is not None:
            for card in db.scalars(select(Card).where(Card.profile_id == profile.id)):
                db.delete(card)
            texts = select(SourceText.id).where(SourceText.profile_id == profile.id)
            db.execute(delete(TextWord).where(TextWord.text_id.in_(texts)))
            db.execute(delete(SourceText).where(SourceText.profile_id == profile.id))
            for deck in db.scalars(select(Deck).where(Deck.profile_id == profile.id)):
                db.delete(deck)
            db.execute(delete(GenerationLog).where(GenerationLog.profile_id == profile.id))
            db.flush()
            db.delete(profile)
        db.execute(delete(DeckShare).where(DeckShare.teacher_id == user.id))
        db.delete(user)
    db.commit()


def seed(db: Session, reset: bool = False) -> bool:
    """Create the demo; returns False, and changes nothing, when it already exists."""
    exists = db.scalar(select(User).where(User.email == LEARNER[0]))
    if exists and not reset:
        return False
    remove(db)

    _, profile = account(db, *LEARNER)
    teachers = {spec: account(db, *spec)[0] for spec in (TEACHER, RU_TEACHER)}
    now = study.now_utc()
    # The profile's first deck becomes the first demo deck.
    first = db.scalars(
        select(Deck).where(Deck.profile_id == profile.id, Deck.name == FIRST_DECK)
    ).one()
    cards: dict[str, Card] = {}
    position = 0

    for index, spec in enumerate(DECKS, start=1):
        deck = first if index == 1 else Deck(profile_id=profile.id)
        deck.name, deck.position = spec["name"], index
        deck.description, deck.instructions = spec["description"], spec["instructions"]
        deck.known_language, deck.target_language = "en", spec["target"]
        deck.level = spec.get("level", "")
        db.add(deck)
        if spec["teacher"]:
            deck.shares.append(DeckShare(teacher_id=teachers[spec["teacher"]].id))

        title, source_url, body = spec["text"]
        text = SourceText(
            profile_id=profile.id,
            title=title,
            source_url=source_url,
            body=body,
            position=index,
            language=spec["target"],
        )
        db.add(text)
        db.flush()
        for word, source, meaning, highlight, sentence, translation in spec["cards"]:
            context = context_for(body, source)
            text.words.append(
                TextWord(word=word, sentence=source, context=context, status="learn", gloss=meaning)
            )
            position += 1
            card = Card(
                profile_id=profile.id,
                text_id=text.id,
                text_title=title,
                word=word,
                word_form=word,
                word_translation=meaning,
                highlight=highlight,
                source_sentence=source,
                context=context,
                sentence=sentence,
                translation=translation,
                instructions=spec["instructions"],
                position=position,
            )
            card.decks.append(deck)
            db.add(card)
            cards[f"{spec['name']}/{word}/{meaning}"] = card
    db.commit()

    # What a learner who has used the app for a while would have: a question for the teacher,
    # one the teacher answered, a card marked to rewrite, an archived card, and some reviews.
    asked = cards["Shopping/Gemüse/vegetables"]
    asked.needs_check, asked.note = True, "Is this how you would say it at a market?"
    answered = cards["Shopping/Verkäuferin/saleswoman"]
    answered.note, answered.teacher_checked_at = "Is Tüte the right word for a bag?", now
    cards["At work/Bericht/report"].needs_regeneration = True
    cards["At work/Chefin/boss"].status = "archived"
    for key, rating, days_ago in [
        ("Travel by train/Gleis/platform", "easy", 30),
        ("Travel by train/Fahrkarte/ticket", "easy", 25),
        ("Shopping/Bargeld/cash", "easy", 30),
        ("Travel by train/Verspätung/delay", "again", 0),
    ]:
        study.review(db, cards[key], rating, False, now - timedelta(days=days_ago, minutes=30))
    profile.study_deck_ids = [
        deck.id
        for deck in db.scalars(select(Deck).where(Deck.profile_id == profile.id))
        if deck.target_language == "de"
    ]
    db.commit()
    return True


def main() -> None:
    reset = "--reset" in sys.argv[1:]
    with SessionLocal() as db:
        created = seed(db, reset)
    if not created:
        print("The demo accounts already exist; run with --reset to start them over.")
        return
    print("Demo data created. Sign in at http://localhost:5173 with:")
    for email, password, name in ACCOUNTS:
        print(f"  {email:<28} {password:<14} {name}")


if __name__ == "__main__":
    main()
