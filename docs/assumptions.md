# Assumptions

## ASM-01

An LLM writes natural sentences in Russian, English, and German at a fixed length while keeping to the learner's known words.

- **Status:** Open
- **How to check:** In Week 5, a fluent reviewer of each language checks the 30 sentences per language from the [real-model check](../reports/week-04/llm-cost-and-quality-check.md) as [`TOS-02`](threshold-of-success.md#tos-02) describes, the Russian and English ones by reviewers the team knows and the German ones by an outside reviewer; the unknown words are counted again once the known-word list keeps to the deck's language.
  The first real run kept every sentence within the length bounds, and the German sentences had 0.8 unknown words on average, but the Russian and English ones had about 6, because the list mixed the learner's languages.

## ASM-02

The token cost per card is low enough for the course budget and for a learner who generates hundreds of cards.

- **Status:** Confirmed
- **How to check:** In Week 4, measure the cost of 100 cards with the model we chose, including regenerations, and compare it with the $4 of usage the team bought and with a subscription that keeps a 50% margin.
- **Outcome:** 100 cards and 10 rewrites cost $0.54 at list price with Claude Sonnet 4.5, about $0.0054 a card, so $4 makes about 730 cards, enough for the course's checks; a learner making 300 cards a month costs $1.63 to $2.89, which a subscription of $3.30 to $5.80 a month covers with a 50% margin, per the [real-model check](../reports/week-04/llm-cost-and-quality-check.md).

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
