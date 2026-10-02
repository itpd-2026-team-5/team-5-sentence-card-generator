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