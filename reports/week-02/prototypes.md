# Week 02 prototypes

## From a text to a studied card

- **What it is:** a code spike of the whole learner flow, in a web app (React and FastAPI) that runs on a laptop.
  The learner fills in a profile, pastes a text, marks the words to learn and to ignore, generates one card per word, edits or rejects a card, and studies the cards with FSRS.
  It was built only to get a reaction and is not product code, so it is not merged into this repository.
  The sentences in the screenshots come from the spike's offline placeholder generator, not from an LLM: "This is a short practice sentence that uses … today." is the placeholder.
  The one German sentence on a card, for `Verspätung`, was typed by a team member in the card editor to show what an edited card looks like.
  The texts and the profile are sample data written by the team.
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
- **Question:** does picking words in a text, ordering the texts, and fixing cards in one editor match how the Customer would build and correct a deck, and is "every word you did not pick is known" a fair rule?
- **What the customer said:** TODO after the Week 2 validation meeting.
- **What changed:** TODO after the Week 2 validation meeting: the `DEC-nnn`, and where the change is recorded.
