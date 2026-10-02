# Alternatives

**Problem space:** Language learners (Russian, English, German) who build Anki decks from texts they choose, and teachers who review their cards, are trying to turn selected words into sentence cards with translations and pronunciations, and keep the cards prioritized, without doing it by hand.

## Properties

The same set is used for every alternative.

| ID | Property | Traces to the project description |
|---|---|---|
| P1 | Can a learner get a card for a word they picked in their own uploaded text, without writing the sentence, translation or pronunciation by hand? | Problem: tedious manual card creation. Solution: words selected in user-uploaded texts. |
| P2 | Does the card give a sentence in both the known and the target language, produced by an LLM? | Solution: LLM, sentences in the known and target language. |
| P3 | Can the learner change which words get learned first without editing cards one by one? | Problem: re-prioritizing cards. |
| P4 | Does the product schedule reviews itself with spaced repetition? | Solution: spaced repetition. |
| P5 | Does it work for Russian, English and German, both for card content and for the interface? | Solution: supported languages. |
| P6 | Can a teacher connect to a learner and review their cards? | Solution: teacher support. |
| P7 | Can the user run it on their own machine or server? | Deployment: VPS, local host. |

## Research board

Screenshots and working notes: [Figma board (view-only)](https://www.figma.com/board/BNB6VIlMsWQBvprl1BtgjX/Untitled?node-id=0-1&t=hbcZ6d4ggpXsBFHJ-1). The ALT-01 and ALT-03 screenshots are also copied to [`reports/week-01/images/`](../../reports/week-01/images/).

## ALT-01: Migaku

- **Link:** <https://migaku.com/>
- **Looked at:** 2026-10-02, mobile app version 1.1961.1.
- **Type:** direct competitor.
- **Problem and users:** helps language learners make flashcards from content they study, such as web pages, YouTube, ebooks and pasted text. Source: migaku.com home page.
- **How deep:** hands-on use of the mobile app (French), plus reading the home page, FAQ and pricing page. The web version and help centre were not used. Prices and trial terms were not visible on the pages read.
- **Screenshots:** [board](https://www.figma.com/board/BNB6VIlMsWQBvprl1BtgjX/Untitled?node-id=0-1&t=hbcZ6d4ggpXsBFHJ-1), copies in `reports/week-01/images/`.

### Observations per property

| Property | Observation | Evidence |
|---|---|---|
| P1 | A learner can bring their own content: the home screen offers Clipboard (paste text), Reader (import ebooks), Photo, YouTube, Web Browser and Vocabulary Decks. Words are selected in the text and a Card Creator opens with deck, card type "Sentence", target word and sentence filled in. The card still has fields to edit by hand. | [`alt-01-migaku-p1-1-reader-tracked-word.jpg`](../../reports/week-01/images/alt-01-migaku-p1-1-reader-tracked-word.jpg), [`p1-2-card-creator-sentence-type.jpg`](../../reports/week-01/images/alt-01-migaku-p1-2-card-creator-sentence-type.jpg), [`p1-3-content-sources.jpg`](../../reports/week-01/images/alt-01-migaku-p1-3-content-sources.jpg) |
| P2 | The Card Creator has separate fields for sentence, sentence translation, definition, sentence audio, word audio and image, each with a "CREATE" or "SEARCH" button. A separate panel answers "What does this word mean in context?" with an AI-written explanation, and the website says "ChatGPT AI generated explanations". **Not confirmed:** whether the sentence or its translation is written by an LLM. | [`p2-1-card-creator-fields.jpg`](../../reports/week-01/images/alt-01-migaku-p2-1-card-creator-fields.jpg), [`p2-2-card-creator-audio-image.jpg`](../../reports/week-01/images/alt-01-migaku-p2-2-card-creator-audio-image.jpg), [`p2-3-ai-word-explanation.jpg`](../../reports/week-01/images/alt-01-migaku-p2-3-ai-word-explanation.jpg) |
| P3 | Words have statuses (known, learning, tracked and unknown, ignored) that can be changed for several words at once, and the word list has Sort by and Filter. **Not observed:** any control that sets which words are learned first. | [`p3-1-word-list-tracked.jpg`](../../reports/week-01/images/alt-01-migaku-p3-1-word-list-tracked.jpg), [`p3-2-word-status-change.jpg`](../../reports/week-01/images/alt-01-migaku-p3-2-word-status-change.jpg) |
| P4 | The home screen shows "0 reviews" and "1 new", and the website says "Built-in spaced repetition system" with Anki export. The review screen itself was not opened. | [`p1-3-content-sources.jpg`](../../reports/week-01/images/alt-01-migaku-p1-3-content-sources.jpg); migaku.com home page |
| P5 | "I want to learn" lists 11 languages: Cantonese, English, French, German, Italian, Japanese, Korean, Mandarin, Portuguese, Spanish, Vietnamese. **No Russian.** App language is a separate setting; the website shows English and Japanese. | [`p5-1-language-select.jpg`](../../reports/week-01/images/alt-01-migaku-p5-1-language-select.jpg); migaku.com home page |
| P6 | Not found. Checked: mobile app, home page, FAQ page, pricing page. Not checked: web version, help centre. | none (absence) |
| P7 | Not found. Delivered as a Chrome extension, iOS and Android apps and a web platform. | migaku.com home page |

### Strengths

- Accepts the learner's own content from many sources (P1), so card creation starts from texts the user chose.
- Word statuses can be changed in bulk (P3, observed in [`p3-2-word-status-change.jpg`](../../reports/week-01/images/alt-01-migaku-p3-2-word-status-change.jpg)).
- Sentence, translation, definition, audio and image are all in one Card Creator screen (P2, observed in [`p2-1-card-creator-fields.jpg`](../../reports/week-01/images/alt-01-migaku-p2-1-card-creator-fields.jpg)).

### Weaknesses

- **No Russian as a learning language** (P5, [`p5-1-language-select.jpg`](../../reports/week-01/images/alt-01-migaku-p5-1-language-select.jpg)). This matters because Russian learners are a target user of our project.
- **The AI explanation can be wrong on a misspelled word** (P2). Given "Russi" (a typo of "Russie"), it described it as a past participle of "ruser" ([`p2-3-ai-word-explanation.jpg`](../../reports/week-01/images/alt-01-migaku-p2-3-ai-word-explanation.jpg)). This is one example, so it shows a risk, not a rate.
- **No teacher or sharing feature found** (P6). This matters because our project must let a teacher review cards.
- **Paid** (a free 10-day trial and a subscription model, per the home page). Prices were not seen.

## ALT-03: LinguaCafe

- **Link:** <https://github.com/simjanos-dev/LinguaCafe>
- **Looked at:** 2026-10-02. Latest release v0.15-beta (2025-04-13); `main` at commit `c1ea298` (2025-03-19); user manual wiki at revision `bd39cec` (2025-03-22).
- **Type:** open-source, self-hosted option (GPL-3.0).
- **Problem and users:** "helps language learners acquire vocabulary by reading": the learner imports texts, looks up unknown words while reading, and reviews them later. Source: README.
- **How deep:** read the README, the [overview site](https://simjanos-dev.github.io/LinguaCafeHome/), the user manual wiki (Setup, Usage and features, FAQ) and the Anki export code (`app/Services/AnkiApiService.php`). **Not installed or used hands-on**, so every observation below comes from the project's own documentation, screenshots and code.
- **Screenshots:** on the [board](https://www.figma.com/board/BNB6VIlMsWQBvprl1BtgjX/Untitled?node-id=0-1&t=hbcZ6d4ggpXsBFHJ-1). They are the vendor's own images, taken from the [overview site](https://simjanos-dev.github.io/LinguaCafeHome/), not captures from our own install, and copied to `reports/week-01/images/`. **They show an older version than v0.15-beta:** the home page reports "version V0001" and the calendar covers 2023 to 2024.

### Observations per property

| Property | Observation | Evidence |
|---|---|---|
| P1 | The learner imports their own content: plain text, text file, e-book, YouTube subtitles, subtitle file, Jellyfin subtitles or a web page. Clicking a word in the reader shows dictionary results; the word starts being learned once the learner saves a translation, picked from the dictionary results or typed by hand. A highlighted word can be sent to Anki as a card with the word, reading, translation and the sentence it appeared in. The sentence is taken from the text, not written for the card. | [`alt-03-linguacafe-p1-1-import-sources.png`](../../reports/week-01/images/alt-03-linguacafe-p1-1-import-sources.png), [`alt-03-linguacafe-p1-2-library-word-counts.png`](../../reports/week-01/images/alt-03-linguacafe-p1-2-library-word-counts.png), [`alt-03-linguacafe-p1-3-reader-word-panel.png`](../../reports/week-01/images/alt-03-linguacafe-p1-3-reader-word-panel.png); [Usage and features: Books, Reading](https://github.com/simjanos-dev/LinguaCafe/wiki/3.-Usage-and-features); [`AnkiApiService.php`](https://github.com/simjanos-dev/LinguaCafe/blob/c1ea298ce40c65b9dd33e9b26fd2e52fae66f2c8/app/Services/AnkiApiService.php) |
| P2 | **No LLM.** Translations come from imported dictionaries (Wiktionary, dict.cc and others), DeepL or LibreTranslate, and they translate the selected word or phrase. The Anki card has one `translation` field for the word; the example sentence is not translated. The review card shows the same: the German sentence, then only "all" for the word *allen*. | [Setup: dictionaries, DeepL, LibreTranslate](https://github.com/simjanos-dev/LinguaCafe/wiki/2.-Setup); [`AnkiApiService.php`](https://github.com/simjanos-dev/LinguaCafe/blob/c1ea298ce40c65b9dd33e9b26fd2e52fae66f2c8/app/Services/AnkiApiService.php) (fields `word`, `reading`, `translation`, `example_sentence`); [`alt-03-linguacafe-p2-1-hover-translation.png`](../../reports/week-01/images/alt-03-linguacafe-p2-1-hover-translation.png), [`alt-03-linguacafe-p2-2-admin-dictionaries.png`](../../reports/week-01/images/alt-03-linguacafe-p2-2-admin-dictionaries.png), [`alt-03-linguacafe-p4-2-review-card-back.png`](../../reports/week-01/images/alt-03-linguacafe-p4-2-review-card-back.png) |
| P3 | Each word has a level: new, learning 1 to 7, known, or ignored. Ignored words drop out of reviews and statistics, and a review can be limited to one book or chapter. The Vocabulary page filters by stage, book and translation and has an "Order by" menu for the list. **Not found:** a way to set which of the chosen words come up first in reviews. | [`alt-03-linguacafe-p3-1-vocabulary-levels.png`](../../reports/week-01/images/alt-03-linguacafe-p3-1-vocabulary-levels.png), [`alt-03-linguacafe-p1-3-reader-word-panel.png`](../../reports/week-01/images/alt-03-linguacafe-p1-3-reader-word-panel.png); [Usage and features: Reading, Review](https://github.com/simjanos-dev/LinguaCafe/wiki/3.-Usage-and-features) |
| P4 | Built-in spaced repetition "similar to the Leitner system", configurable under Admin > Reviews, plus a practice mode that does not change the schedule. Words can also be exported to Anki, or to a file with chosen fields (word, reading, translation, stage and others). | [`alt-03-linguacafe-p4-1-review-card-front.png`](../../reports/week-01/images/alt-03-linguacafe-p4-1-review-card-front.png), [`alt-03-linguacafe-p4-2-review-card-back.png`](../../reports/week-01/images/alt-03-linguacafe-p4-2-review-card-back.png), [`alt-03-linguacafe-p4-3-vocabulary-export.png`](../../reports/week-01/images/alt-03-linguacafe-p4-3-vocabulary-export.png); [Usage and features: Review](https://github.com/simjanos-dev/LinguaCafe/wiki/3.-Usage-and-features) |
| P5 | Russian, English and German are all supported as learning languages, with DeepL and lemma generation for each; German also gets gender tagging. **Interface:** no translation files found in the repository, and every screenshot shows English menus, so the interface appears to be English only (not confirmed in a current install). Text to speech uses the browser's SpeechSynthesis API, and the author says it only worked for them in Chrome on desktop. The language picker in the (older) screenshot lists Russian and German but not English. | [`alt-03-linguacafe-p5-1-language-select.png`](../../reports/week-01/images/alt-03-linguacafe-p5-1-language-select.png); [Setup: Supported Languages](https://github.com/simjanos-dev/LinguaCafe/wiki/2.-Setup#supported-languages); [Usage and features: Text to speech](https://github.com/simjanos-dev/LinguaCafe/wiki/3.-Usage-and-features) |
| P6 | Not found. Multiple user accounts were "added recently", but some features, including Anki, do not work for more than one user. The README still says "only one user/server is supported". The screenshots show an admin page with a Users tab and a learner told "Your account and password was created by an admin", so an admin manages accounts, but nothing lets one user see another's cards. No teacher role or card sharing is documented. | [`alt-03-linguacafe-p6-1-admin-created-account.png`](../../reports/week-01/images/alt-03-linguacafe-p6-1-admin-created-account.png), [`alt-03-linguacafe-p2-2-admin-dictionaries.png`](../../reports/week-01/images/alt-03-linguacafe-p2-2-admin-dictionaries.png); [Setup: Multiple users](https://github.com/simjanos-dev/LinguaCafe/wiki/2.-Setup); [README](https://github.com/simjanos-dev/LinguaCafe#active-development-disclaimer) |
| P7 | **Yes.** It runs with `docker compose up -d` on x64; Apple silicon needs an extra step, and Raspberry Pi and other Armv8 devices do not work. RAM use can be over 2 GB with every language installed. | [Setup: Installation](https://github.com/simjanos-dev/LinguaCafe/wiki/2.-Setup#installation); [README](https://github.com/simjanos-dev/LinguaCafe#supported-platforms) |

### Strengths

- Free and self-hosted with Docker (P7), which is the deployment our project description asks for.
- Supports all three of our languages, Russian, English and German (P5), unlike ALT-01, which has no Russian.
- Starts from the learner's own text, and every saved word keeps the sentence it came from (P1), so the card has real context.

### Weaknesses

- **No LLM-written sentences, and the sentence is not translated** (P2). The card's only sentence is the original one from the text, and the translation is for the word alone. This matters because sentences in both the known and the target language are the core of our project.
- **The learner still picks or types a translation for every word** (P1), so card creation is easier but not automatic.
- **No teacher role, and Anki export works for only one user per server** (P6). The Anki export also needs AnkiConnect running on the same machine as the server.
- **No control over which words come first** (P3). Levels follow the review schedule, not the learner's priority.
- **Development has slowed:** the last release was 2025-04-13 and the last commit on `main` was 2025-03-19, and the README warns of bugs. This is a risk for anyone depending on it, not a missing feature.
