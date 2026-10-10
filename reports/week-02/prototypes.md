# Week 02 prototypes

## From a text to a studied card

- **What it is:** a code spike of the whole learner flow, in a web app (React and FastAPI) that runs on a laptop.
  The learner fills in a profile, pastes a text, marks the words to learn and to ignore, generates one card per word, edits or rejects a card, and studies the cards with FSRS.
  It was built only to get a reaction and is not product code, so it is not merged into this repository.
  The sentences in the screenshots come from the spike's offline placeholder generator, not from an LLM: "This is a short practice sentence that uses … today." is the placeholder.
  The one German sentence on a card, for `Verspätung`, was typed by a team member in the card editor to show what an edited card looks like.
  The texts and the profile are sample data written by the team.
  The spike was shown to the Customer in the validation meeting on 2026-10-09, on a laptop and then at phone width; the screenshots were taken on 2026-10-10 from the same build, with clean sample data.
- **View:**
  - [Today](images/prototype-studio-01-today.png): the cards due, chosen by FSRS, and the texts in progress.
  - [Library](images/prototype-studio-02-library.png): the learner's texts, in the order the learner dragged them into.
  - [Reader](images/prototype-studio-03-reader.png) and [the word menu](images/prototype-studio-04-reader-word-menu.png): click a word to learn it or ignore it; words left alone count as known.
  - [Cards](images/prototype-studio-05-cards.png) and [the card editor](images/prototype-studio-06-card-editor.png): edit the sentence, the translation, and the word form; ask for a new sentence with a reason; mark a card bad; delete it.
  - [Profile](images/prototype-studio-07-profile.png): languages, CEFR level, profession, interests, and goals, which go into every generation request.
  - [Study, front](images/prototype-studio-08-study-front.png) and [back](images/prototype-studio-09-study-back.png): the sentence, then its translation and the sentence the word came from, with the next interval for each rating and a "too hard" flag.
  - [Library on a phone](images/prototype-studio-10-phone-library.png).
- **Tested:**
  - [`US-01`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30), exercising `AC-01`: a German text pasted and saved.
  - [`US-02`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31), exercising `AC-01`, `AC-02`, and `AC-03`: words marked to learn, a word marked to ignore that gets no card, and a mark cleared.
  - [`US-04`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/37), exercising `AC-01` and `AC-03`: a card marked bad leaves the review queue but stays in the deck with a "bad" badge, and an edited sentence replaces the old one.
  - [`US-09`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/42), exercising `AC-01`: new cards come up in the order of the texts.
  - [`US-10`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36), exercising `AC-01`: "Hard" brings a new card back in 5 minutes and "Easy" in 10 days.
  - [`ASM-04`](../../docs/assumptions.md#asm-04) (words the learner did not pick are words they know) and [`ASM-09`](../../docs/assumptions.md#asm-09) (ordering texts is enough to say which words come first) are the risky parts it puts in front of the Customer.
  - It does not test [`US-03`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32) or [`ASM-01`](../../docs/assumptions.md#asm-01) (an LLM writes good sentences at the learner's level), because the spike was run without an LLM; that is the next prototype.
- **Question:** does picking words in a text, ordering the texts, and fixing cards in one editor match how the Customer would build, study, and correct a deck?
- **What the customer said:** in the validation meeting on 2026-10-09 (times from its transcript), the Customer said three stories are enough for a prototype (00:15:02), and then:
  - Texts and decks are different things, and the spike mixes them up: words are picked in a text, the generated cards go into a deck, and a card no longer depends on its text once it is generated, because the text can be edited afterwards. A card belongs to at least one deck and can be added to more, and cards are generated for a deck the learner names (00:26:25 to 00:30:02, 01:03:48).
  - The learner first chooses a deck, or several, and studies those, as in Anki, rather than one session made of every deck (00:47:52 to 00:50:27).
  - The "About you" questions are not needed and may make a learner defensive about sharing personal information; instructions per deck should steer the sentences instead, and the questions may stay only as optional analytics (00:41:27 to 00:44:42).
  - On a card, the sentence stays where it was on the front and the translation is added below it; the target word and its translation in this context are shown above the sentence in a smaller font; the source sentence and the text's name sit behind a spoiler; and the sentence is read aloud automatically, because reviews often happen on the go (00:16:24 to 00:19:09, 00:35:24).
  - Marking a card bad should be possible straight from the list of cards (00:32:44); regenerating a card in place is "quite nice", and a second card with a new sentence for the same word is a good idea (00:36:21 to 00:39:28).
  - Sentence length should also be limitable in characters, because German words are long (00:44:42).
  - Most of the Customer's users will study on a phone (00:11:17), and the 1 to 4 key hints are not needed there (00:17:40).
- **What changed:**
  - Cards are generated into a deck and studied by deck, per [`DEC-007`](../../docs/decisions.md#dec-007) and [`DEC-008`](../../docs/decisions.md#dec-008): [`US-03`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32), [`US-09`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/42), and [`US-10`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36) change, recorded in each issue's comment, and [`ASM-09`](../../docs/assumptions.md#asm-09) (ordering texts is enough to say which words come first) is `Refuted`.
  - Per-deck instructions replace the profile questionnaire, per [`DEC-013`](../../docs/decisions.md#dec-013): [`DEC-004`](../../docs/decisions.md#dec-004) is reversed, and [`US-06`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/39) changes.
