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
| P6 | Not found. Checked: the reading, saved-words and practice screens. Not checked: the FAQ and help pages. | [`p1-2-word-marked-to-learn.png`](../../reports/week-01/images/alt-02-language-reactor-p1-2-word-marked-to-learn.png), [`p3-1-saved-words-list.png`](../../reports/week-01/images/alt-02-language-reactor-p3-1-saved-words-list.png), [`p4-1-phrasepump-practice.png`](../../reports/week-01/images/alt-02-language-reactor-p4-1-phrasepump-practice.png) |
| P7 | Can the user run it on their own machine or server? | Deployment: VPS, local host. |

## Research board

Screenshots and working notes: [Figma board (view-only)](https://www.figma.com/board/BNB6VIlMsWQBvprl1BtgjX/Untitled?node-id=0-1&t=hbcZ6d4ggpXsBFHJ-1). Copies of the screenshots are in [`reports/week-01/images/`](../../reports/week-01/images/).

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

## ALT-02: Language Reactor

- **Link:** <https://www.languagereactor.com/>
- **Looked at:** 2026-10-02, web app in the browser. Version not shown.
- **Type:** adjacent substitute.
- **Problem and users:** a toolbox for learners to "discover, understand, and learn from native materials", with a browser extension that turns shows into language lessons. Source: its home page, visible in [`p5-2-translation-language.png`](../../reports/week-01/images/alt-02-language-reactor-p5-2-translation-language.png). A feature called PhrasePump, used for practice, appears in its own panel (see P4).
- **How deep:** hands-on use of the web app with study language Arabic and translation language English, using a pasted Arabic text. Not tried: German, English or Russian as the study language, the browser extension on video sites, and the FAQ and help pages (not read).
- **Screenshots:** [board](https://www.figma.com/board/BNB6VIlMsWQBvprl1BtgjX/Untitled?node-id=0-1&t=hbcZ6d4ggpXsBFHJ-1), copies in `reports/week-01/images/`.

### Observations per property

| Property | Observation | Evidence |
|---|---|---|
| P1 | A learner can paste their own text (a title field, a text box, a "Start reading" button). Clicking a word in the text shows its translation and marks it "Marked to Learn". The saved word appears in a Saved Words list with its translation and the sentence it came from. **Not observed:** a finished flashcard, or an export to Anki. | [`p1-1-add-own-text.png`](../../reports/week-01/images/alt-02-language-reactor-p1-1-add-own-text.png), [`p1-2-word-marked-to-learn.png`](../../reports/week-01/images/alt-02-language-reactor-p1-2-word-marked-to-learn.png), [`p3-1-saved-words-list.png`](../../reports/week-01/images/alt-02-language-reactor-p3-1-saved-words-list.png) |
| P2 | The sentence has an English translation shown beside it. The dictionary panel has Explain, Examples and Grammar tabs, and a Lexa AI Chat (beta) tab. The Grammar tab explains the word's structure in prose. The Examples tab lists five sentences with English translations. **Not confirmed:** whether an LLM writes those example sentences, because the screenshot does not label their source. | [`p1-2-word-marked-to-learn.png`](../../reports/week-01/images/alt-02-language-reactor-p1-2-word-marked-to-learn.png), [`p2-1-examples-tab.png`](../../reports/week-01/images/alt-02-language-reactor-p2-1-examples-tab.png) |
| P3 | Saved words can be filtered by status (Marked as Known, Marked to Learn, Don't learn) and colour tags, selected in bulk, and changed together. The list can be sorted by due date. Practice settings have New Items and Session Size sliders; by their names they set amounts, not which words come first (our reading). **Not observed:** any control that sets which words are learned first. | [`p3-1-saved-words-list.png`](../../reports/week-01/images/alt-02-language-reactor-p3-1-saved-words-list.png), [`p4-2-sort-by-due-date.png`](../../reports/week-01/images/alt-02-language-reactor-p4-2-sort-by-due-date.png), [`p4-1-phrasepump-practice.png`](../../reports/week-01/images/alt-02-language-reactor-p4-1-phrasepump-practice.png) |
| P4 | Practice happens inside the product. The PhrasePump panel has a "Start practice" button, "Today's practice: 66", "0 items due for urgent review", and counts of Marked to Learn, Learning Now and Learned. Saved words carry due dates ("Tomorrow", "No due date"). A team member reported that Start practice suggested words (no screenshot of this step). The scheduling method is not stated. | [`p4-1-phrasepump-practice.png`](../../reports/week-01/images/alt-02-language-reactor-p4-1-phrasepump-practice.png), [`p4-2-sort-by-due-date.png`](../../reports/week-01/images/alt-02-language-reactor-p4-2-sort-by-due-date.png) |
| P5 | The language dialog has separate "Study language" (Arabic) and "Translation language" (English) settings. **Not yet evidenced by a screenshot:** Russian, German and English as study languages, and an interface-language setting. | [`p5-2-translation-language.png`](../../reports/week-01/images/alt-02-language-reactor-p5-2-translation-language.png) |
| P6 | Not found. Checked: the saved-words, practice and reading screens, and the side menu (Media, Chatbot, PhrasePump, Saved, Help, Settings, Forum). Not checked: the FAQ and help pages. | [`p5-2-translation-language.png`](../../reports/week-01/images/alt-02-language-reactor-p5-2-translation-language.png) (side menu) |
| P7 | Not found. It is offered as a web app (languagereactor.com) and as a browser extension; both are ways to use the product, not to run it on your own server. No self-hosted or local-server option was seen. Not checked: the FAQ and help pages. | [`p5-2-translation-language.png`](../../reports/week-01/images/alt-02-language-reactor-p5-2-translation-language.png) (extension text) |

### Strengths

- The path from the learner's own text to a saved word is complete in one place: paste text, click a word, see its translation, and find it in the saved list (P1).
- Practice runs inside the product, and saved words carry due dates that the list can be sorted by (P4).
- Study language and translation language are separate settings (P5).

### Weaknesses

- **No teacher feature found** (P6). This matters because our project must let a teacher connect and review cards.
- **No control over which words come first** (P3). The practice sliders (New Items, Session Size) and the filters and sorting do not set a learning priority in anything we saw. This matters because re-prioritizing words is part of the stated problem.
- **No self-hosted option found** (P7). It runs through a browser extension and in the browser. This matters because our project is deployed on a VPS or local host.

### Not found out

Whether an LLM writes the Examples-tab sentences; how the due dates are calculated; whether a finished card can be exported to Anki; Russian, German and English as study languages; an interface-language setting; the FAQ and help pages.
