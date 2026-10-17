# Decisions

## DEC-001

Accept plain text as the input for now, not transcripts from particular media such as YouTube or Netflix.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-01/meeting-report.md)
- **Why:** there are too many kinds of media to focus on just one, so the learner decides where to find texts and the product takes plain text from any source.

## DEC-002

Build a web app for Firefox and Chrome; Safari is not needed, and a mobile app is a later idea.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-01/meeting-report.md)
- **Why:** a web app is enough for now, and the Customer asked for Firefox and Chrome; a mobile app, so that students can rehearse offline, is a later idea.

## DEC-003

Always give the LLM the sentence the word appeared in as context, so the generated sentence uses the same meaning.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-01/meeting-report.md)
- **Why:** a word on its own removes the context, and the LLM may then write a sentence with the wrong meaning of the word.

## DEC-004

Let technical users write their own prompt, and give other users a short questionnaire (profession, study goals) that produces the prompt for them.

- **Status:** Reversed by [DEC-013](#dec-013)
- **Date:** 2026-10-01
- **Made by:** KaramKhaddour, Customer
- **Source:** [the kickoff meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-01/meeting-report.md)
- **Why:** technical users want control over the prompt, while other users should get sentences on their own topics without writing a prompt.

## DEC-005

Schedule reviews with an established spaced-repetition algorithm, such as FSRS used by Anki.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** Customer
- **Source:** [the kickoff meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-01/meeting-report.md)
- **Why:** the Customer wants the scheduling Anki uses today, maybe FSRS, rather than a scheduler of our own.

## DEC-006

Use React for the frontend and Python with FastAPI for the backend.

- **Status:** Active
- **Date:** 2026-10-01
- **Made by:** KaramKhaddour proposed, Customer agreed
- **Source:** [the kickoff meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-01/meeting-report.md)
- **Why:** the lemmatization libraries the Customer used in songs2anki are in Python, the team has members who work in Python, and React suits a web application.

## DEC-007

Keep source texts separate from generated cards, generate cards into a selected deck, and allow each card to belong to one or more decks.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** the prototype confused selecting words in a text with studying a deck; cards must remain independent when the source text is later edited, and selecting the initial deck avoids assigning each generated card manually.

## DEC-008

Let the learner choose one or more decks before starting a study session.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** automatically collecting cards from every deck hides which material the learner will study; choosing the deck first makes the session's scope clear.

## DEC-009

Keep the original-language sentence in the same position when revealing the translation below it.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** the prototype moved the original sentence when the back of the card appeared; keeping it in place lets the learner read the translation without relocating the original text.

## DEC-010

Play the sentence audio automatically when a study card is shown.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** learners may review while moving and only be able to listen; the Customer's workflow pronounces the sentence rather than separately pronouncing the target word.

## DEC-011

Show the target word's translation in the meaning used by the card's sentence.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** the learner should not have to search the whole translated sentence to find the word's meaning, and the displayed meaning must match its context.

## DEC-012

Represent additional sentences for the same word as separate cards with independent review progress.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Team, not contested
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** the team proposed learning one word through several sentences, and the Customer agreed that separate cards are simpler and can have different review progress.

## DEC-013

Use optional generation instructions per deck instead of the global personal-profile questionnaire.

- **Status:** Active
- **Reverses:** [DEC-004](#dec-004)
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** global personal details can mix unrelated interests into a deck's topic and discourage learners from sharing information; the Customer preferred deck-specific instructions, which the team accepted.

## DEC-014

Support sentence-length limits in characters, even if word-count limits are also available.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** a sentence with only a few long German words can still be difficult to read, so word count alone does not control its visual length.

## DEC-015

Send the word's surrounding sentence context to the LLM instead of the whole source text.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** this confirms the contextual-meaning requirement in DEC-003 while narrowing the input to the source sentence and neighbouring sentences where necessary; the exact sufficient context size still needs testing.

## DEC-016

Let learners edit source texts and find context sentences by entering a word separately from the original text.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** learners should be able to remove or add text and locate a word's context without manually searching a long source; a summary can omit the word they wanted to learn.

## DEC-017

Present cards from a shared deck in a compact teacher table with relevant information and editing controls immediately visible.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** teachers may review hundreds of cards on desktop, so large card blocks and opening each card individually slow the work; the Customer also confirmed that teacher access is limited to explicitly shared decks.

## DEC-018

Let the teacher regenerate individual cards while editing them rather than waiting until after submitting the review.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** the teacher is responsible for reaching a correct result and needs to inspect each regenerated sentence before finishing the review.

## DEC-019

Support personal API keys without requiring a service subscription or forcing a learner to share their key with a teacher.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** learners must retain a personal-key option, teachers may prefer their own provider or model, and teacher access must not expose a learner's key; browser-only requests were suggested if technically feasible, while a service subscription remained optional and undecided.

## DEC-020

Keep payments between learners and teachers outside the service.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Customer
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** judging whether a teacher's work merits payment would add responsibility the service should not take on; learners and teachers can arrange payment independently.

## DEC-021

Use the Needs check state to identify cards the learner wants a teacher to review.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Team, not contested
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** the prototype's label had no clear trigger, and the team and Customer clarified it as a teacher-review request through a flag or a learner's question rather than an unexplained generation state.

## DEC-022

Let learners select their language level and offer optional links to external placement tests.

- **Status:** Active
- **Date:** 2026-10-09
- **Made by:** Team, not contested
- **Source:** [the Week 2 validation meeting](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/reports/week-02/meeting-report.md)
- **Why:** the prototype already allowed manual level selection, and the team proposed external tests for learners who are unsure; the Customer did not object, but specific tests and the reliability of the approach were not established.

## DEC-023

Build the product with a React and TypeScript frontend on Vite, a Python FastAPI backend with SQLAlchemy and Alembic on PostgreSQL, Claude through the official Anthropic SDKs, and docker compose to run it all.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Team
- **Source:** team discussion while building the prototype, carried into the product in [#59](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/59), [#60](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/60), and [#61](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/61)
- **Why:** confirms the direction of [`DEC-006`](#dec-006) and fills in what it left open.
  TypeScript catches API mismatches before the Customer sees them, and Vite gives a fast development loop.
  PostgreSQL keeps each learner's cards, decks, and review history with real foreign keys, and Alembic migrates it on start, so a schema change never needs a manual step.
  The official Anthropic SDKs give structured JSON output, typed errors, and, in the browser, the learner's own key that never reaches our server ([`DEC-019`](#dec-019)).
  docker compose starts the database, a local mail inbox, the backend, and the frontend with one command, the same on every laptop, which is what makes [the setup page](setup.md) work from a clean checkout.
  The team already works in Python and React, and the prototype was built and shown to the Customer on this stack.

## DEC-024

Store the learning and translation language pair per deck.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** A learner may study several languages at once, so one account-wide pair prevents different decks from serving different language combinations.

## DEC-025

Store proficiency separately for each language and allow a deck to override its default level.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer described studying multiple languages and using different levels within an account; a single global level would obstruct those cases.

## DEC-026

Provide both minimum and maximum sentence lengths in characters.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** Some generated sentences had been too short and simplistic, while word counts alone do not control the visual length of German sentences.

## DEC-027

Make API-key and model selection support LLM providers generically rather than presenting Anthropic as the only provider.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer may use an aggregator such as OpenRouter and asked for a unified provider and model selection interface.

## DEC-028

Let the learner explicitly switch between a saved personal API key and the service's key.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** A learner should be able to keep a personal key saved while choosing a different funding source or a model supplied by the service.

## DEC-029

Use the LLM provider's usage statistics for token spending and expose useful card-quality statistics in the application instead of relying on request counts.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** A request can generate several cards, making request counts hard to interpret; regenerated and discarded cards can help a learner assess model quality.

## DEC-030

Persist the learner's selected study decks between visits to Today.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** Automatically reselecting every deck with due cards makes a learner repeatedly exclude decks they do not want to study.

## DEC-031

Present the deck list compactly with readable per-deck statistics.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer asked for table-like rows showing the deck name, card and review counts, and teacher access without large blocks or small statistics.

## DEC-032

Keep the deck's description separate from its generation instructions.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** Instructions can change between generation runs, so displaying the current instructions as a description of every existing card is misleading.

## DEC-033

Retain the generation instructions used for each card.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Team, not contested
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The team proposed keeping the instructions with each card, and the Customer agreed that this would preserve control over later generation and regeneration.

## DEC-034

Distinguish archiving a card from permanently deleting it and label the archive action accordingly.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The demonstrated bad-card flag stopped study without deleting the card, so the Customer asked for an archive name and icon and a way to hide archived cards.

## DEC-035

Provide quick actions to mark cards for batch regeneration and to regenerate an individual card from the deck list or study screen.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** Opening the editor and typing feedback for hundreds of cards is inconvenient, and a learner may discover a bad sentence only while studying.

## DEC-036

Enable a request for teacher review only when the deck has a teacher assigned.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The demonstration allowed asking a teacher to check a card without an assigned teacher, which the presenter identified as a bug.

## DEC-037

Preserve a card's source context and text title, linking back to the text only while that text exists.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer needs the origin to interpret or correct the word, while deleting a source text must not leave a broken link on an independent card.

## DEC-038

Highlight the target word and its article where applicable in the original-language sentence without requiring a highlighted equivalent in the translation.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** German nouns need to be learned with their articles, while idioms and nonliteral translations may have no directly corresponding word to highlight.

## DEC-039

Allow the learner to disable automatic sentence audio within the application.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** Muting the whole device to avoid review audio also suppresses other applications' notifications.

## DEC-040

Provide a keyboard shortcut to reveal the answer during desktop study.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The desktop interface should allow revealing a card without requiring a pointer click; the exact key was left to the implementation.

## DEC-041

Provide per-deck daily limits for new cards and scheduled reviews.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer uses these controls in Anki to determine the size of a daily session and asked for equivalent settings.

## DEC-042

Show separate study counts for new cards, reviews from earlier sessions, and cards that need to be reviewed again in the current session.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** Two counters do not explain the remaining work when a card needs to return during the same session.

## DEC-043

Use the marked word and its source context within the destination deck to determine whether an equivalent card already exists.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer asked for repeat generation to avoid duplicates while allowing a different meaning or a different destination deck to receive a card.

## DEC-044

Let a teacher review all cards in an explicitly shared deck while prioritizing cards the learner marked for review.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** A learner may fail to notice problems, so marking a card should affect review priority rather than restrict the teacher to marked cards.

## DEC-045

Show the student associated with each shared deck and the remaining review work on the Teaching page.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** A teacher handling decks from several students needs to identify the owner and see how much review is pending.

## DEC-046

Store the source URL and other text metadata separately from the text used for word selection.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer wants traceability to the original material without generating vocabulary cards from words in a link.

## DEC-047

Allow learners to reorder their source texts.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** Learners may add texts they do not yet want to work on, and the Customer asked for movable rows or an equivalent ordering mechanism.

## DEC-048

Regenerate sentences that fail automated checks before presenting them as cards ready for review.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer found the failed-check state unclear and asked for generation to reach a valid result before ordinary review; retry limits still need to be specified.

## DEC-049

Keep an integrated placement test as a Could Have feature while retaining links to external tests.

- **Status:** Active
- **Date:** 2026-10-17
- **Made by:** Customer
- **Source:** [the Week 3 validation meeting](../reports/week-03/meeting-report.md).
- **Why:** The Customer appreciated the real external tests and explicitly described a test inside the application as optional rather than a required capability.
