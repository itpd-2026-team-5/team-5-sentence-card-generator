# Decisions

## DEC-001

Accept plain text as the input for now, not transcripts from particular media such as YouTube or Netflix.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** there are too many kinds of media to focus on just one, so the learner decides where to find texts and the product takes plain text from any source.

## DEC-002

Build a web app for Firefox and Chrome; Safari is not needed, and a mobile app is a later idea.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** a web app is enough for now, and the Customer asked for Firefox and Chrome; a mobile app, so that students can rehearse offline, is a later idea.

## DEC-003

Always give the LLM the sentence the word appeared in as context, so the generated sentence uses the same meaning.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** a word on its own removes the context, and the LLM may then write a sentence with the wrong meaning of the word.

## DEC-004

Let technical users write their own prompt, and give other users a short questionnaire (profession, study goals) that produces the prompt for them.

- **Status:** Reversed by [DEC-013](#dec-013)
- **Date:** 2026-10-01
- **Made by:** KaramKhaddour, Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** technical users want control over the prompt, while other users should get sentences on their own topics without writing a prompt.

## DEC-005

Schedule reviews with an established spaced-repetition algorithm, such as FSRS used by Anki.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** the Customer wants the scheduling Anki uses today, maybe FSRS, rather than a scheduler of our own.

## DEC-006

Use React for the frontend and Python with FastAPI for the backend.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** KaramKhaddour proposed, Customer agreed
- **Source:** [the kickoff meeting](../reports/week-01/meeting-report.md)
- **Why:** the lemmatization libraries the Customer used in songs2anki are in Python, the team has members who work in Python, and React suits a web application.

## DEC-007

Keep source texts separate from generated cards, generate cards into a selected deck, and allow each card to belong to one or more decks.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** the prototype confused selecting words in a text with studying a deck; cards must remain independent when the source text is later edited, and selecting the initial deck avoids assigning each generated card manually.

## DEC-008

Let the learner choose one or more decks before starting a study session.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** automatically collecting cards from every deck hides which material the learner will study; choosing the deck first makes the session's scope clear.

## DEC-009

Keep the original-language sentence in the same position when revealing the translation below it.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** the prototype moved the original sentence when the back of the card appeared; keeping it in place lets the learner read the translation without relocating the original text.

## DEC-010

Play the sentence audio automatically when a study card is shown.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** learners may review while moving and only be able to listen; the Customer's workflow pronounces the sentence rather than separately pronouncing the target word.

## DEC-011

Show the target word's translation in the meaning used by the card's sentence.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** the learner should not have to search the whole translated sentence to find the word's meaning, and the displayed meaning must match its context.

## DEC-012

Represent additional sentences for the same word as separate cards with independent review progress.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Team, not contested
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** the team proposed learning one word through several sentences, and the Customer agreed that separate cards are simpler and can have different review progress.

## DEC-013

Use optional generation instructions per deck instead of the global personal-profile questionnaire.

- **Status:** Active
- **Reverses:** [DEC-004](#dec-004)
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** global personal details can mix unrelated interests into a deck's topic and discourage learners from sharing information; the Customer preferred deck-specific instructions, which the team accepted.

## DEC-014

Support sentence-length limits in characters, even if word-count limits are also available.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** a sentence with only a few long German words can still be difficult to read, so word count alone does not control its visual length.

## DEC-015

Send the word's surrounding sentence context to the LLM instead of the whole source text.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** this confirms the contextual-meaning requirement in DEC-003 while narrowing the input to the source sentence and neighbouring sentences where necessary; the exact sufficient context size still needs testing.

## DEC-016

Let learners edit source texts and find context sentences by entering a word separately from the original text.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** learners should be able to remove or add text and locate a word's context without manually searching a long source; a summary can omit the word they wanted to learn.

## DEC-017

Present cards from a shared deck in a compact teacher table with relevant information and editing controls immediately visible.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** teachers may review hundreds of cards on desktop, so large card blocks and opening each card individually slow the work; the Customer also confirmed that teacher access is limited to explicitly shared decks.

## DEC-018

Let the teacher regenerate individual cards while editing them rather than waiting until after submitting the review.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** the teacher is responsible for reaching a correct result and needs to inspect each regenerated sentence before finishing the review.

## DEC-019

Support personal API keys without requiring a service subscription or forcing a learner to share their key with a teacher.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** learners must retain a personal-key option, teachers may prefer their own provider or model, and teacher access must not expose a learner's key; browser-only requests were suggested if technically feasible, while a service subscription remained optional and undecided.

## DEC-020

Keep payments between learners and teachers outside the service.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** judging whether a teacher's work merits payment would add responsibility the service should not take on; learners and teachers can arrange payment independently.

## DEC-021

Use the Needs check state to identify cards the learner wants a teacher to review.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Team, not contested
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** the prototype's label had no clear trigger, and the team and Customer clarified it as a teacher-review request through a flag or a learner's question rather than an unexplained generation state.

## DEC-022

Let learners select their language level and offer optional links to external placement tests.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Team, not contested
- **Source:** [the Week 2 validation meeting](../reports/week-02/meeting-report.md)
- **Why:** the prototype already allowed manual level selection, and the team proposed external tests for learners who are unsure; the Customer did not object, but specific tests and the reliability of the approach were not established.
