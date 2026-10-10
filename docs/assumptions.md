# Assumptions

## ASM-01

An LLM writes natural sentences in Russian, English, and German at a fixed length while keeping to the learner's known words.

- **Status:** Open
- **How to check:** In Week 2, generate 30 sentences per language for a sample learner profile, have a speaker check them, and count the unknown words in each.

## ASM-02

The token cost per card is low enough for the course budget and for a learner who generates hundreds of cards.

- **Status:** Open
- **How to check:** In Week 2, measure the cost of 100 cards with the model we choose, including regenerations.

## ASM-03

A learner's level can be determined well enough, by asking them or by a placement test.

- **Status:** Open
- **How to check:** Open question from the kickoff; compare both approaches with two learners in Week 3.

## ASM-04

The words a learner did not pick in a text are words they know.

- **Status:** Open
- **How to check:** The Customer suggested this at the kickoff; check it against two learners' marked texts in Week 2.

## ASM-05

A short questionnaire produces prompts that work as well as a prompt the learner writes.

- **Status:** Open
- **How to check:** In Week 3, compare sentences from both kinds of prompt for the same words.

## ASM-06

Teachers will review their students' cards often enough for it to be worth building.

- **Status:** Open
- **How to check:** Ask the Customer how often they would review, and ask one teacher, in Week 2.

## ASM-07

Students are willing to share their decks with a teacher.

- **Status:** Open
- **How to check:** Ask two learners in Week 2.

## ASM-08

Learners will study in our app with our FSRS scheduling, rather than export everything to Anki.

- **Status:** Open
- **How to check:** Ask the Customer in Week 2 whether Anki export is still needed, and watch whether the first test users study in the app.

## ASM-09

Ordering texts is enough for a learner to say which words come first.

- **Status:** Refuted
- **How to check:** Test with the Customer on the first word-picker prototype.
- **Outcome:** shown the prototype on 2026-10-09, the Customer separated texts from decks: cards are generated into a deck the learner names, and the learner chooses which deck or decks to study, per [`DEC-007`](decisions.md#dec-007) and [`DEC-008`](decisions.md#dec-008).
  The order of the texts does not decide which words come first; the deck the learner studies does.
