# Changelog

All notable changes to the Sentence Cards Generator are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-10-31

### Added

- Try the product with demo data: one command creates a learner and two teachers with decks, texts, and cards, with no API key or email needed.
- Choose English, German, or Russian for the interface independently of learning languages, using a compact globe menu on the sign-in page or the language setting; the choice is remembered in this browser.
- Set each text's language when adding or editing it, and generate its cards into a deck with the same learning language.

### Changed

- Teachers see a compact card overview and open a card to edit, listen, rewrite, confirm, reopen, archive, or delete it; edits are saved explicitly, with an unsaved-edit warning.
- Each teacher pronunciation button sits beside the sentence, translation, word, or meaning it reads.
- Dropdowns share themed colors, rounded menus, selection highlights, and focus states; model suggestions support searching and a typed model name.
- The text-file chooser uses the app's violet and cyan button colors.

### Fixed

- Text lists and readers stay open when an older API response omits the text's language; they show "Language not set" instead of crashing.
- Card generation and rewriting use known and ignored words from texts in the deck's learning language, so one language no longer fills another language's vocabulary limit.
- Card details wrap narrow fields, status badges, and long text so the panel fits the screen without horizontal scrolling.

## [0.2.0] - 2026-10-25

### Added

- Give each deck its own language pair, its own level if you like, a description, and its own daily limits for new cards and reviews.
- Set your level separately for each language you learn, and bound sentences by a minimum as well as a maximum number of characters.
- Mark cards to rewrite and rewrite them together, or rewrite one straight from the deck or while you study.
- Archive a card to stop studying it without deleting it.
- Keep a link from a text to where it came from, add notes to it, and put your texts in the order you want.
- Write sentences with your own key from any Anthropic-compatible or OpenAI-compatible provider, such as OpenRouter, or switch back to the service's key without forgetting yours.
- See how your cards turned out: how many you kept as written, edited, rewrote, archived, or deleted, and the tokens the provider reported.
- As a teacher, see who each shared deck belongs to and how many cards are left to check, and confirm a card once it is right.
- Load a text from a `.txt` file instead of pasting it.
- Add another language to learn beside your main pair in Settings, and pick a level only for the languages you learn.
- Learn the same word in two meanings from one text, such as "Bank" as a bench and as a bank: a word is marked in each of its sentences, and each mark gets its own card.
- See what each word you picked means in its sentence, and which of your decks already have a card for it.
- See the cards you just generated on the text's page, and change one there straight away.
- A warning when 30% or more of a run's sentences failed a check and had to be written again, since the deck's instructions or the model may be the problem.
- Listen to each part of a card on its own: the word, its meaning, the sentence, and the translation, while you study and when you teach.
- Put your decks in order on Today; new cards come in that order.
- Check a key's connection in Settings before saving it, and pick a model from the ones the provider lists.
- As a teacher, see a legend for the marks and buttons, and reopen a question you answered.

### Changed

- Study counts new cards, reviews, and cards to see again today separately, and the decks you chose are kept for your next visit.
- Cards keep the instructions they were written with, and the word is highlighted with its article.
- A sentence that fails a check is rewritten before you see it, up to three times.
- You can ask your teacher about a card only once its deck is shared with a teacher.
- The deck list is a compact table, and the teacher sees every card of a shared deck, the ones you asked about first.
- Read-aloud can be switched off in Settings as well as during study.
- A blank text is refused with a message, and study says so when the browser cannot read a sentence aloud.
- Small and secondary text is larger and brighter, so it is easier to read.
- Today shows the study button and the day's progress first, and the decks in their own list below; new cards are green and cards to review blue, as in Anki.
- The deck list shows the language learned and the language it is translated into in two columns, the active and archived cards in words, and the cards asked to the teacher in their own column.
- The statistics say "kept as generated" and "regenerated", side by side, and the own-key form says "Base URL".
- An answered question keeps the learner's note, crossed out, and the cards a learner asked about stand out by their colour; on a phone the teacher sees one card per row.
- Words in the list to learn keep their capital letters, and the texts show a handle to drag them by.
- Settings explains at the top what a level changes, and that a deck's own level wins.

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

[Unreleased]: https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.3.0
[0.2.0]: https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.2.0
[0.1.0]: https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.1.0
