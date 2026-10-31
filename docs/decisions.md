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

## DEC-050

Limit sentence-generation validation to three attempts before marking the card as Failed check.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** Three attempts were accepted as sufficient at 00:05:50 after the presenter explained that a failed attempt is retried immediately; this makes the retry policy behind DEC-048 bounded.

## DEC-051

Generate only one card for the same word in an identical source sentence within the destination deck.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:10:42–00:11:42 the Customer clarified DEC-043: repeated occurrences in an identical source sentence share an identifier, while a different source context or meaning must remain distinguishable.

## DEC-052

Separate the interface language from proficiency settings for each supported learning language.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:15:57–00:17:46 the Customer required an independent interface-language choice and a level for German, Russian, and English, retaining external placement-test links and deck-specific overrides.

## DEC-053

Retain external placement-test links without building an integrated placement test for the current delivery.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:13:52–00:14:27 the Customer confirmed the direction of DEC-049 because the team lacks assessment expertise and an internally generated test would not establish reliable proficiency.

## DEC-054

Defer a service-wide paid subscription to a Could Have feature after the course project.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:20:40–00:21:36 the Customer described a possible subscription including service-funded generation, then deferred its implementation; the example prices were not an agreed tariff.

## DEC-055

Use an explicit API endpoint label and check whether a user-provided endpoint is reachable.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:22:44–00:24:00 the Customer found Address ambiguous and requested terminology that makes the expected OpenAI-compatible endpoint clear, with a reachability check.

## DEC-056

Label LLM rewrites as Regenerated and unchanged output as Kept as generated, grouping related statistics together.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:26:07–00:26:44 the Customer distinguished LLM regeneration from manual editing so that the relationship between generated, retained, and edited cards is understandable.

## DEC-057

Provide separate pronunciation playback for the source word, translated word, source sentence, and translated sentence for learners and teachers.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:30:00–00:32:13 and 01:03:41–01:04:35 the Customer required access to each element's pronunciation; buttons and clearly indicated clickable text remain interface alternatives to compare.

## DEC-058

Use clearly distinguishable green for new cards and blue for review cards.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:33:17–00:33:52 the Customer requested familiar Anki-style colors with stronger contrast so the study counters are easier to interpret.

## DEC-059

Keep study controls and progress visible independently of a long list of selectable decks.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:37:04–00:41:04 the Customer requested a visible Study control, clearer progress, and a separate deck-list area so that many decks do not force scrolling to reach the action.

## DEC-060

Keep Review as the label for cards that have already been studied and are due again.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:28:35–00:29:12 the Customer considered the term, compared it with Anki, and confirmed keeping it.

## DEC-061

Preserve student notes after teacher acknowledgment and visually distinguish addressed notes from outstanding ones.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:54:50–00:55:55 the Customer accepted retaining the note rather than deleting it, with the approval state and a visual hint showing that the request has been addressed.

## DEC-062

Prioritize and visibly identify learner-requested teacher reviews even when the learner leaves no note.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:57:30–00:59:23 the Customer confirmed the direction of DEC-044 and clarified that priority must follow the review request rather than the presence of a comment; any color marker needs an explanation.

## DEC-063

Preserve the source capitalization of selected words in the word tray.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:12:59–01:13:11 the Customer pointed out that lowercasing German nouns loses their original spelling.

## DEC-064

Show a context-sensitive translation for each selected word so different meanings can be distinguished.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:11:22–01:12:37 the Customer supported the team's translation proposal and specified that selecting words with different translations must produce cards for both meanings.

## DEC-065

Let the learner inspect and edit newly generated cards on the text page before approving their addition to a deck.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:15:27–01:16:39 the Customer wanted to correct cards immediately after generation; approved cards can leave the temporary preview and remain in their destination deck.

## DEC-066

Make the text page show which decks contain cards for each selected word.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:17:02–01:18:59 the Customer found that a card-to-text link does not answer the reverse question and proposed a separate view of existing cards alongside newly generated cards.

## DEC-067

Show both the learning language and translation language explicitly in deck and generation controls.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:47:03–00:47:19 and 01:13:40–01:14:13 the Customer found German from English and a German-only destination label confusing and requested clearer language information.

## DEC-068

Keep learner, teacher, and service API keys isolated so that none is disclosed to another party.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:20:24–01:21:10 the Customer explicitly required that sharing a deck reveals neither participant's key and that service users cannot obtain the built-in service key.

## DEC-069

Preserve stored application data when the service is stopped and restarted.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:21:20–01:21:33 the Customer required shutdown behavior that does not lose data or damage the database.

## DEC-070

Support self-hosting the application on a Linux virtual machine.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:21:38–01:22:07 the Customer required Linux operation; the exact distribution version and remaining prerequisites were left to specification.

## DEC-071

Make the application usable on a phone without horizontal scrolling.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:05:33–01:06:18 and 01:22:20–01:23:20 the Customer requested a usable mobile workflow and measurable usability scenarios; opening an individual card is an option for avoiding a wide teacher table.

## DEC-072

Warn the learner when 30% of cards in a generation batch require regeneration.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:24:54–01:28:06 the Customer rejected relying on global model statistics because different keys and models can be used, and selected an initial per-batch threshold that may be revised after observing results.

## DEC-073

Notify the learner immediately when an expired or rejected API key prevents generation.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:27:01–01:27:21 the Customer distinguished a known key failure from uncertain prompt or model quality and required an immediate notification.

## DEC-074

Use an explicit Save changes action before applying teacher edits and review-status changes to a learner's cards.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:50:53–00:53:21 the Customer objected to immediate application and asked for a save step that allows the teacher to review or undo a pending change.

## DEC-075

Keep US-08 open until its playback scope and audio-failure behavior are verified against AC-01 and AC-02.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Team, not contested
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:32:33–01:32:48 the presenter explicitly left US-08 open because the current audio approach needs rework; the Customer had requested playback for all four card elements, and AC-02 was not demonstrated.

## DEC-076

Track problematic-generation reporting separately from the basic sentence-generation workflow of US-03.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Team, not contested
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:31:50–01:32:27 the Customer described the warning as fault tolerance and the team proposed separate follow-up scope; this separation does not itself establish that every existing US-03 acceptance criterion passed.

## DEC-077

Label active, archived, and teacher-requested card counts explicitly in the deck list.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:43:53–00:46:08 the Customer found bare numbers and Asked counts unclear and requested words or dedicated columns that explain the statistics.

## DEC-078

Explain that proficiency defaults affect future generation and that a deck can override its level.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:17:58–00:19:01 the Customer requested moving the override explanation to a visible position and clarifying what changing the default will affect.

## DEC-079

Allow the learner to reorder the decks selected for study on Today.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 00:41:37–00:43:38 the Customer asked about study order and proposed reordering decks before selecting and studying them.

## DEC-080

Explain the teacher-review action icons with a legend near the table.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:04:44–01:05:23 the Customer found the check, archive, and delete icons understandable but requested an explanation of their exact effects; a compact rewrite icon is an interface option to evaluate.

## DEC-081

Indicate that text rows can be reordered by dragging.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Customer
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:07:46–01:08:10 drag and drop was available but undiscoverable, so the Customer requested a familiar marker indicating that rows can move.

## DEC-082

Close US-01, US-02, and US-03 for the demonstrated text-to-card workflow.

- **Status:** Active
- **Date:** 2026-10-24
- **Made by:** Team, not contested
- **Source:** [the Week 4 validation meeting](../reports/week-04/meeting-report.md#decisions).
- **Why:** At 01:29:24 the Customer agreed with the basic text-and-word capability; at 01:29:31–01:29:35 KaramKhaddour explicitly confirmed satisfaction of the text-input criteria and described them; at 01:30:39–01:31:00 the team concluded that US-01 and US-02 could close, and at 01:31:24–01:32:27 reached the same conclusion for US-03 with problem reporting tracked separately under [DEC-076](#dec-076), without objection from the Customer.
  This records the team's closure decision and the spoken participant confirmations, not a separate Customer confirmation that every AC-nn passed; the report distinguishes these results from individual test details not recorded in the discussion.

## DEC-083

Keep interface-language options in their native names and show deck-language names in the selected interface language.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:09:43–00:10:47, the Customer confirmed the current direction after comparing the language picker with Linux, agreeing that users must recognize their own language, and checking the translated language name in the deck settings.

## DEC-084

Select the learning and translation language pair in the generation flow, filter destination decks by that pair, and let a new deck inherit it.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:14:55–00:16:39, the Customer found the global pair unnecessary when selecting a destination for a text and proposed choosing the pair beside the deck selector, with creation of a matching deck when needed.

## DEC-085

Move learning-language selection into the per-language proficiency controls and remove the separate Languages for new decks settings card.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:12:10–00:12:47 and 00:17:17–00:17:41, the Customer found the separate card confusing and proposed selecting each learning language and its level together; the pair needed for generation belongs in the flow recorded by [DEC-084](#dec-084).

## DEC-086

Vertically align the sentence-length range separator with its input fields.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:17:56–00:18:15, the Customer identified the word to between the minimum and maximum inputs as bottom-aligned and asked for it to be moved higher.

## DEC-087

Restore the missing mobile navigation so users can switch between the application's sections.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Team, not contested
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:20:26–00:21:05, during the mobile demonstration the navigation did not appear; KaramKhaddour identified this as a problem and stated that it should be visible at the bottom so users can change sections.

## DEC-088

Provide an easily discoverable global sound control near the top of the interface and preserve its setting across study sessions.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:21:14–00:22:33, the Customer proposed a control near the top-right corner that applies across sessions, rather than requiring users to return to Settings to change the global default.

## DEC-089

Keep the study-session sound override for that session only and initialize each new session from the global sound default.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:22:42–00:23:36, after considering removal of the override and persistence between sessions, the Customer chose to keep a quick session-only override for cases such as being interrupted in a public place.

## DEC-090

Allow provider-token counts to be removed from the user-facing Settings statistics.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:24:18–00:24:37, the displayed input and output token counts were both zero, and the Customer said those counts may be removed; this permits removing that display rather than requiring the removal of internal usage collection or card-quality statistics.

## DEC-091

Keep Teaching available to every account rather than hiding it behind a separate teacher-only account category.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:25:17–00:25:43, the Customer confirmed the current direction after learning that Teaching appears for everyone and agreed to retain it because any user can become a teacher.

## DEC-092

Show the account email in the Teaching workflow where users need it to receive shared decks.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:26:41–00:27:21, the Customer could not immediately find the email needed for sharing and proposed displaying it there instead of making users search near the bottom of Settings.

## DEC-093

If card reordering is implemented, keep the user-defined order separate from card identifiers.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:38:49–00:41:28, the Customer described the problems caused by encoding order in identifiers and directed the team to keep those concepts separate; this is a constraint on a possible future feature, whose delivery is deferred by [DEC-094](#dec-094).

## DEC-094

Postpone individual-card reordering rather than scheduling it as required work for the next sprint.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:44:31–00:45:52, after exploring the interaction with existing review progress and scheduling, the Customer agreed that reordering could be a future feature and asked the team to focus on the existing interface; no scheduling algorithm for it was selected.

## DEC-095

Show each sentence, its translation, and an approval action directly in the desktop teacher table, with card details available for further inspection.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:48:19–00:49:50, the Customer confirmed and refined the compact review direction in [DEC-017](#dec-017), so busy teachers can check and approve sentences without opening every card and searching the side panel.

## DEC-096

Keep teacher pronunciation controls in the card details rather than adding them to the summary review table.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:50:03–00:50:22, the Customer expected teachers to know both languages and not need playback for every quick review, so leaving those controls in the details keeps the table uncluttered.

## DEC-097

Keep the learner's generation instructions read-only for teachers while allowing teachers to enter corrective feedback for regeneration.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:53:26–00:55:19, the Customer distinguished the instructions that determine a deck's topic from the teacher's explanation of what was wrong: the learner controls the former, while the teacher needs the latter to improve the sentence.

## DEC-098

Allow teachers to archive shared cards while reserving permanent deletion for the learner.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:55:49–00:57:52, after considering both deletion and archiving, the Customer's final direction was to let teachers archive and leave permanent deletion to the student, avoiding an irreversible removal that might later prove mistaken.

## DEC-099

Keep the regenerated sentence preview and rewrite actions visible together in the card-editing workflow.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 00:58:10–00:59:44, the Customer could not see the generated result without scrolling after Rewrite now and required quick feedback so a teacher can inspect the result and retry; a two-column desktop layout and repositioned mobile controls were options, not a fixed layout decision.

## DEC-100

Prioritize improving the existing desktop and mobile interfaces in Week 6, with particular attention to mobile usability.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 01:00:03–01:00:40, KaramKhaddour proposed improving presentation rather than adding more functionality, and the Customer agreed to that focus after the review exposed navigation and teacher-layout problems.

## DEC-101

Verify that pronunciation and LLM generation work from the actual deployment environment, including any replacement VM.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 01:00:40–01:01:25, the Customer added working audio and LLM API access to the next steps; discussing an external VM did not select a migration, a provider, or a pronunciation service.

## DEC-102

Accept the demonstrated deployed version as sufficient for the Week 5 submission despite the blocked live LLM generation.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 01:02:49–01:03:31, when saleemasekrea000 asked whether the deployed version with existing cards could be submitted, the Customer explicitly said this version was sufficient; this is a submission-scope decision, not an acceptance verdict for every story or a claim that live generation passed.

## DEC-103

Carry trials of alternative LLM API providers into the next sprint instead of requiring a provider replacement for the current submission.

- **Status:** Active
- **Date:** 2026-10-31
- **Made by:** Customer
- **Source:** [the Week 5 validation meeting](../reports/week-05/meeting-report.md#decisions), with [transcript evidence](../reports/week-05/meeting-transcript.md).
- **Why:** At 01:01:13–01:01:29 and 01:03:25–01:03:31, the Customer allowed other providers to be tried the following week after accepting the current deployed version for submission; a free-provider aggregator and a Chinese provider were possibilities, and neither was selected.
