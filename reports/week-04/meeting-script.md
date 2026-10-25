# Week 4 Customer Validation Script

## Context

Our problem-space sentence: learners need to turn words selected from their own texts into useful sentence cards, study the decks they choose, and have a teacher correct the cards they share.

We believe real LLM generation and the revised deck, settings, and teaching workflows can support this task.
We will demonstrate the running application rather than rely on placeholder output.
The [Week 3 report](../week-03/meeting-report.md) leaves story acceptance, generation context, provider quality and cost, language-level assessment, teacher sharing, and service-key funding to settle.
The [quality requirements](../../docs/quality-requirements/README.md) propose measurable outcomes; their priorities and the architecture's response to them need the Customer's verdict.

Target: establish which demonstrated stories the Customer accepts against their acceptance criteria, whether the quality requirements and architecture answer the product's drivers, and which changes the team must deliver in Week 5.

Plan for 30 minutes and request 60 minutes for the full review.
Each agenda item gives its allocation as **30-minute plan / 60-minute plan**; the totals are 30 and 60 minutes respectively.
Use the shorter plan for focused checks and the longer plan for alternatives and detailed feedback.
Questions 8, 17, and 18 have priority when discussion needs more time; preserve the final read-back and record any unanswered questions for follow-up.

## Agenda

1. **Permissions (2 / 3 min).**
   Show: nothing.
   Ask questions 1-3 before recording and note each answer separately.
2. **Previous commitments and unresolved questions (2 / 5 min).**
   Show: the Week 3 [action points](../week-03/meeting-report.md#action-points), [open questions](../week-03/meeting-report.md#open-questions), and [decisions](../../docs/decisions.md).
   Ask questions 4-5; identify the evidence for each completed action and which questions remain open.
3. **Working software and core-story verdicts (8 / 12 min).**
   Show: the application's Texts page, reader, generation controls, resulting deck, and [US-01](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30), [US-02](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31), and [US-03](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32).
   For US-01, demonstrate AC-01 with a 300-word German text, AC-02 with a Russian `.txt` file, and AC-03 with empty input.
   For US-02, demonstrate AC-01 by marking five words, AC-02 by excluding an ignored word from generation, and AC-03 by unmarking a word selected by mistake.
   For US-03, demonstrate AC-01 by generating cards for ten marked words, AC-02 with the contextual meaning of Bank, AC-03 by comparing new sentences with their sources, and AC-04 by simulating an unavailable generator.
   Check the current issue body before each demonstration and work through its criteria individually.
   Ask questions 6-8, each immediately after its story; record acceptance or rejection and every failed or unproven criterion.
4. **Settings, providers, and usage information (1 / 5 min).**
   Show: Settings, Edit Deck, external placement-test links, personal/service key selection, provider and model fields, and card and token statistics.
   Ask questions 9-10 while checking account defaults, deck overrides, interface language, and what the user can infer from the controls.
5. **Study workflow and pronunciation (2 / 6 min).**
   Show: Today, selection of several decks, study counters, a card before and after revealing its answer, difficulty ratings, sound controls, and leaving and resuming a session.
   Show the audio story's current acceptance criteria from the [story issues](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues) and check each one while the feature runs.
   Ask questions 11-12; record its verdict separately from feedback on the Today screen.
6. **Teacher review and card correction (2 / 6 min).**
   Show: a learner sharing a deck and requesting review, the teacher account's Teaching page, the card list, student notes, editing and regeneration, and review-status controls.
   Use demonstration accounts without showing real credentials or keys.
   Ask questions 13-14; compare a requested card with and without a student note, and check what happens when an edit or status change is saved.
7. **Text-to-card traceability (1 / 4 min).**
   Show: text ordering, the word tray, two occurrences of Bank with different meanings, the destination deck and its language pair, generated cards, and source-context links.
   Ask question 15 while following a selected word into its card and back to the text.
   Compare an identical word and source sentence with the same word in a different context.
8. **Quality requirements and architecture against the drivers (8 / 13 min).**
   Show: the [quality priority matrix](../../docs/quality-requirements/README.md), [product goal and constraints](../../docs/product-vision.md), [threshold of success](../../docs/threshold-of-success.md), and [risk register](../../docs/risks.md).
   Present the container view and driver-to-choice mapping on screen, supported by the [system context](../../docs/architecture/context.png), [runtime container configuration](../../docker-compose.yml), [generation flow](../../backend/app/generation.py), and [personal-key request path](../../frontend/src/llm.ts).
   Trace the frontend, backend, persistent database, and external LLM responsibilities against key confidentiality, generation correctness, response time, provider failure, and mobile operation.
   Walk through learner, teacher, and service-key boundaries; distinguish browser pronunciation from a stored-audio alternative, and show how deployment and persistence address shutdown and restart.
   Ask questions 16-19; obtain a verdict on both the quality scenarios and the architecture's response, and record any missing requirement or unresolved trade-off.
9. **Candidate scope and next delivery (2 / 3 min).**
   Show: the [MUP candidate](../week-02/README.md#minimum-usable-product-candidate), [project plan](../../docs/project-plan.md), and current [story and task issues](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues).
   Ask questions 20-21; distinguish accepted stories, rejected stories with rework, and additional scope.
   Agree at least two concrete action points, each with a GitHub username as owner and a deadline inside Week 5.
10. **Read back decisions and action points (2 / 3 min).**
    Show: the note taker's list of story verdicts, failed criteria, quality and architecture decisions, unanswered questions, and actions with owners and dates.
    Ask question 22 and correct misunderstandings before closing.

## Questions

1. _(closed)_ May we record this meeting?
2. _(closed)_ May we publish a sanitized English transcript in the public project repository?
3. _(closed)_ If publication is refused, may we share the sanitized transcript privately with the course instructors through Moodle?
4. _(open; not answered in the transcript)_ Have you received the project-group invitation and can you access the group for follow-up questions?
5. _(open)_ After reviewing the evidence for each Week 3 action and open question, which outcomes can we close and what evidence is still missing for the others?
6. _(partly answered; explicit Customer verdict not recorded)_ Do you accept US-01 against AC-01 through AC-03 as demonstrated, or reject it with the failed or unproven criteria identified?
7. _(open; explicit Customer verdict not recorded)_ Do you accept US-02 against AC-01 through AC-03 as demonstrated, or reject it with the failed or unproven criteria identified?
8. _(open, priority; explicit Customer verdict not recorded)_ Do you accept US-03 against AC-01 through AC-04 with real LLM generation as demonstrated, or reject it with the failed or unproven criteria identified?
9. _(open)_ When a learner uses several languages and decks, which defaults, deck overrides, placement-test support, and interface-language controls are needed to get appropriately difficult sentences?
10. _(open)_ When choosing a provider, model, and personal or service key, what information is needed to understand the choice, its cost, and the generation statistics, and what funding policy belongs in the current release?
11. _(open)_ When you leave and resume a session across several decks, what remaining work do you expect the counters, colors, progress indicator, and deck order to show, including on a phone?
12. _(open; Customer verdict not recorded)_ Do you accept the demonstrated audio story against each of its current acceptance criteria, or reject it with the failed or unproven criteria identified?
13. _(open)_ When a learner asks for review, which cards should a teacher see first, how should a request without a note appear, and should a deck allow one teacher or several?
14. _(open)_ While correcting a shared card, what should happen to the student's note, review status, and learner-visible content before saving, after saving, and if the teacher needs to undo the status change?
15. _(open)_ Starting from a text with selected words, what meaning, capitalization, generation preview, and deck-location information is needed to distinguish word senses, avoid duplicate cards, and find the cards again?
16. _(open)_ Which proposed quality scenarios or priorities would fail the learner's or teacher's real task, and what response measures should change to make them acceptable?
17. _(open, priority)_ For each driver we have shown, where does the proposed allocation of responsibilities leave an unacceptable risk in key isolation, persistence, LLM failure, pronunciation consistency, mobile operation, or deployment, and what must change before you accept the architecture?
18. _(open, priority)_ During one generation batch, after how many unsuccessful attempts or what proportion of problematic cards should the system stop or warn the learner, and which failures require an immediate message?
19. _(open; no recorded verdict on the quality requirements and architecture)_ With the changes and unresolved risks we have listed, do you accept the reviewed quality requirements and architecture as the direction for the next increment?
20. _(open; exact MUP-candidate confirmation not recorded)_ Do you accept US-01, US-02, and US-03 as the sufficient MUP candidate, with a separate scope decision for any removed story and any resulting change to the core task?
21. _(open)_ Which rework or next stories should take priority in Week 5, and which two or more concrete follow-ups should we commit to with owners and deadlines?
22. _(open; read-back response not recorded)_ Does our read-back correctly capture each story's verdict, the quality and architecture decisions, remaining questions, and the owners and Week 5 deadlines of the agreed action points?

## Roles

The whole team attends.

- **Moderator and product presenter:** KaramKhaddour; run the application, ask the questions, present the architecture's response to the drivers, and manage the agenda.
- **Note taker:** Horokk1; record the three permission answers, story verdicts and failed criteria, decisions and their reasons, unresolved questions, and action owners and deadlines.
- **Observer:** Byakko-san; record skipped questions and criteria, unclear controls, unexpected behavior, and differences between the Customer's expectations and the demonstrated workflow.
- **Technical support:** saleemasekrea000; prepare the demonstration accounts and texts, assist with the phone view and controlled provider-failure check, and help trace requests without displaying secrets.

## Key improvements

- **Before:** "Is the quality of the generated cards good enough?"
- **After:** question 18, "During one generation batch, after how many unsuccessful attempts or what proportion of problematic cards should the system stop or warn the learner, and which failures require an immediate message?"
- **Principle:** use a concrete failure scenario and ask for an observable response and measure, so the answer can change a quality requirement and its verification instead of producing a general opinion.
