# Changelog

All notable changes to the Sentence Cards Generator are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Give each deck its own language pair, its own level if you like, a description, and its own daily limits for new cards and reviews.
- Set your level separately for each language you learn, and bound sentences by a minimum as well as a maximum number of characters.
- Mark cards to rewrite and rewrite them together, or rewrite one straight from the deck or while you study.
- Archive a card to stop studying it without deleting it.
- Keep a link from a text to where it came from, add notes to it, and put your texts in the order you want.
- Write sentences with your own key from any Anthropic-compatible or OpenAI-compatible provider, such as OpenRouter, or switch back to the service's key without forgetting yours.
- See how your cards turned out: how many you kept as written, edited, rewrote, archived, or deleted, and the tokens the provider reported.
- As a teacher, see who each shared deck belongs to and how many cards are left to check, and confirm a card once it is right.

### Changed

- Study counts new cards, reviews, and cards to see again today separately, and the decks you chose are kept for your next visit.
- Cards keep the instructions they were written with, and the word is highlighted with its article.
- A sentence that fails a check is rewritten before you see it, up to three times.
- You can ask your teacher about a card only once its deck is shared with a teacher.
- The deck list is a compact table, and the teacher sees every card of a shared deck, the ones you asked about first.
- Read-aloud can be switched off in Settings as well as during study.

## [0.1.0] - 2026-10-18

### Added

- Create an account with your full name, email, and password, and confirm your email through a link before you start.
- Choose the language you speak, the language you learn, and your level, with a link to a free placement test for each language.
- Set how long sentences may be, in words and in characters.
- Bring in a text you chose: paste it, edit it later, and see only the sentences with your marked words.
- Mark the words to learn or to ignore by clicking them, or type a word to find the sentences it appears in and pick the meaning you want.
- Get a card for each marked word, generated into the deck you choose: a new sentence at your level, its translation, and the word's meaning in that sentence.
- Organise cards in decks, with instructions for each deck that steer its sentences; a card can belong to several decks.
- Edit a card's sentence, translation, word, and meaning; rewrite it with a reason; mark it bad; delete it; or add more cards for the same word.
- Study one deck or several with spaced repetition (FSRS): the sentence stays in place, the word's meaning and the translation appear around it, the sentence is read aloud, and each answer shows when the card returns.
- Ask your teacher about a card, with a note.
- Share a deck with your teacher, who sees only that deck and corrects its cards in a sheet, one card per row.
- Use your own Anthropic API key, kept in your browser and sent straight to Anthropic, never to our server.
- Run the whole product with one command, `docker compose up`, following the setup page.
