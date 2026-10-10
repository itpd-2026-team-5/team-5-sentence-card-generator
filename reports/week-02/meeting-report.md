# Week 2 Customer Validation Report

## Metadata

- **Date:** 2026-10-09.
- **Duration:** approximately 79 minutes, based on the available transcript.
- **Attended:** Customer, KaramKhaddour, saleemasekrea000, Horokk1, Byakko-san, as listed in the transcript.
- **Presented:** two prototype designs, followed by the mobile interface for study sessions, text input, word selection, card generation and editing, and learner settings; the teacher workflow and API-key model were discussed.
- **Recording:** permitted, as confirmed by the team; the permission exchange is not included in the available transcript.
- **Transcript publication:** permitted, as confirmed by the team.
- **Transcript shared privately:** permission was also given for private sharing with instructors if public publication were refused; this fallback is not needed while publication is permitted.
- **Transcript:** [sanitized English transcript](meeting-transcript.md).
- **Script:** [Week 2 meeting script](meeting-script.md).
- **Review status:** draft for team review; the customer's explicit verdict on the MUP candidate remains outstanding.

## Previous action points

| Action | Outcome | Decision |
| --- | --- | --- |
| ["Create a Telegram group for the project and send an invite link to the Customer"](../week-01/meeting-report.md#action-points) | Completion was not explicitly confirmed in the available transcript; it mentions sending a prototype link through Telegram but does not establish that the group and invitation were completed. Verification is carried forward below. | None. |

## Previous open questions

| Question | Answer | Decision |
| --- | --- | --- |
| ["How do we determine the user's language proficiency level?"](../week-01/meeting-report.md#open-questions) | Partly answered: the prototype lets the learner select a level, and the team plans to add optional links to external placement tests. The tests and the adequacy of the resulting level remain unresolved; [US-05](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/38) and [ASM-03](../../docs/assumptions.md#asm-03) still need follow-up. | [DEC-022](../../docs/decisions.md#dec-022). |
| ["Should we use a questionnaire to generate custom LLM prompts for non-technical users?"](../week-01/meeting-report.md#open-questions) | The Customer preferred optional instructions on each deck over a global personal-profile questionnaire. This reverses the questionnaire approach; the change still needs to reach [US-06](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/39), and [ASM-05](../../docs/assumptions.md#asm-05) has not been experimentally checked. | [DEC-013](../../docs/decisions.md#dec-013), reversing [DEC-004](../../docs/decisions.md#dec-004). |

## Summary

- The prototype exposed a mismatch between texts and decks: words are selected in source texts, while generated cards are independent objects that belong to at least one deck. A study session should start from the learner's chosen deck or decks.
- The Customer specified changes to card review: keep the original-language sentence in place when revealing its translation, play sentence audio automatically, show the target word's contextual translation, and keep separate review progress for separate cards teaching the same word.
- Generation instructions should be optional and specific to a deck, and sentence-length controls must support characters. The source sentence, with neighbouring sentences where necessary, supplies generation context without sending the whole text.
- Teachers should edit cards in explicitly shared decks through a compact table and regenerate individual cards while editing. Learners must be able to bring their own API keys, and teacher payments remain outside the service.
- The demonstration used mocked generation and no authentication, so it did not establish generation quality or secure teacher access. The Customer considered the three demonstrated user flows sufficient for a prototype, but did not explicitly accept the exact MUP candidate listed in the script.

## Decisions

- [DEC-007: Keep source texts separate from generated cards, generate cards into a selected deck, and allow each card to belong to one or more decks.](../../docs/decisions.md#dec-007)
- [DEC-008: Let the learner choose one or more decks before starting a study session.](../../docs/decisions.md#dec-008)
- [DEC-009: Keep the original-language sentence in the same position when revealing the translation below it.](../../docs/decisions.md#dec-009)
- [DEC-010: Play the sentence audio automatically when a study card is shown.](../../docs/decisions.md#dec-010)
- [DEC-011: Show the target word's translation in the meaning used by the card's sentence.](../../docs/decisions.md#dec-011)
- [DEC-012: Represent additional sentences for the same word as separate cards with independent review progress.](../../docs/decisions.md#dec-012)
- [DEC-013: Use optional generation instructions per deck instead of the global personal-profile questionnaire.](../../docs/decisions.md#dec-013)
- [DEC-014: Support sentence-length limits in characters, even if word-count limits are also available.](../../docs/decisions.md#dec-014)
- [DEC-015: Send the word's surrounding sentence context to the LLM instead of the whole source text.](../../docs/decisions.md#dec-015)
- [DEC-016: Let learners edit source texts and find context sentences by entering a word separately from the original text.](../../docs/decisions.md#dec-016)
- [DEC-017: Present cards from a shared deck in a compact teacher table with relevant information and editing controls immediately visible.](../../docs/decisions.md#dec-017)
- [DEC-018: Let the teacher regenerate individual cards while editing them rather than waiting until after submitting the review.](../../docs/decisions.md#dec-018)
- [DEC-019: Support personal API keys without requiring a service subscription or forcing a learner to share their key with a teacher.](../../docs/decisions.md#dec-019)
- [DEC-020: Keep payments between learners and teachers outside the service.](../../docs/decisions.md#dec-020)
- [DEC-021: Use the Needs check state to identify cards the learner wants a teacher to review.](../../docs/decisions.md#dec-021)
- [DEC-022: Let learners select their language level and offer optional links to external placement tests.](../../docs/decisions.md#dec-022)

No decision accepting or rejecting the exact MUP candidate was recorded.
The statement that three user flows were enough for a prototype does not establish acceptance of [US-01](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30), [US-02](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31), and [US-03](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32) as the complete candidate.
That verdict is carried into the open questions and requires a documented follow-up.

## Action points

The transcript identifies work to do but does not record agreed owners or exact deadlines.
The table below records the team's follow-up plan; all dates fall within Week 3, 9-15 October.
Repository changes must be tracked by task issues; [task #46](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/46) covers the validation documentation, and separate implementation tasks still need to be created.

| Action | Owner | Due |
| --- | --- | --- |
| Verify completion of the kickoff action to create the project group and invite the Customer; complete it if it is still outstanding. | KaramKhaddour | 2026-10-12, Week 3. |
| Obtain the Customer's explicit verdict on the MUP candidate and record it with the actual follow-up date and a new decision identifier. | KaramKhaddour | 2026-10-15, Week 3. |
| Carry the recorded decisions into the affected story bodies and change comments, product boundary, MUP record where applicable, prototype record, and Week 2 report; create task issues for implementation. | Horokk1, Byakko-san | 2026-10-15, Week 3. |
| Rework the prototype's text, card, and deck navigation, deck selection, card review layout, and per-deck generation settings. | KaramKhaddour | 2026-10-15, Week 3. |
| Define the shared-deck teacher table and immediate regeneration flow, and investigate personal-key handling that prevents teacher access to a learner's key. | saleemasekrea000 | 2026-10-15, Week 3. |
| Select and test an LLM integration, measure generation quality and token cost, and identify the external placement tests to offer. | KaramKhaddour, saleemasekrea000 | 2026-10-15, Week 3. |

## Open questions

| Question | What it would change | Follow-up |
| --- | --- | --- |
| Does the Customer accept the exact MUP candidate of US-01, US-02, and US-03, or must it include editing, study, or another story? | The candidate's core task, story membership, and recorded customer verdict. | KaramKhaddour: present the linked stories together and request a documented verdict in Week 3. |
| How do we determine the user's language proficiency level reliably, and which external placement tests should be linked? | Level-setting requirements and the check for ASM-03. | KaramKhaddour: identify tests and validate the level-setting approach in Week 3. |
| Has the project group been created and has the Customer received its invitation? | Whether the outstanding kickoff action can be closed. | KaramKhaddour: verify completion in Week 3. |
| Which LLM provider or local model meets the quality and cost requirements? | Integration work and the evidence needed for ASM-01 and ASM-02; mocked output did not test either assumption. | KaramKhaddour, saleemasekrea000: run generation and cost checks in Week 3. |
| Can personal-key requests be made directly from the browser, and how will teacher regeneration use a key without exposing a learner's key? | The implementation and security of DEC-019. | saleemasekrea000: investigate provider capabilities and document the key-handling design in Week 3. |
| Is one source sentence sufficient context, or when are neighbouring sentences needed? | The context-extraction rule implementing DEC-015. | KaramKhaddour: compare ambiguous-word examples in Week 3. |
| Will an optional service subscription be offered, and under what limits and billing rules? | Scope beyond the required personal-key option; the subscription mentioned in the meeting was a possibility, not an agreed commercial plan. | Team: defer until a concrete proposal is ready for customer validation. |

## Disagreements

The changes below are recorded requirements and follow-up work; they are not claims that the prototype or story issues have already been updated.

| Your position | Customer's position | What you changed |
| --- | --- | --- |
| The interface mixed text selection and deck contents, with a text effectively determining a deck. | Words are selected in texts; generated cards retain context but are independent and may belong to several decks. | Recorded DEC-007; navigation and story updates are action points. |
| Start studying gathered ready cards from every deck without first asking which deck to study. | The learner should first choose a deck or a subset of decks. | Recorded DEC-008 and included deck selection in the prototype rework. |
| Revealing a translation displaced the original-language sentence. | The original sentence should stay in place and the translation should appear beneath it. | Recorded DEC-009 for the card-layout update. |
| A global profession-and-interests questionnaire supplied generation context for all cards. | It could mix unrelated topics and make learners reluctant to provide personal information; instructions should belong to each deck. | Recorded DEC-013 and marked DEC-004 as reversed; US-06 still needs updating. |
| Sentence length was controlled only by word count. | Long German words make a character limit necessary. | Recorded DEC-014 for the generation-settings update. |
| Summarizing a long input text or sending the whole text was considered as a way to handle context. | A summary might omit the chosen word; the source sentence and, where needed, its neighbours provide the relevant context. | Recorded DEC-015 and DEC-016 for context extraction and source-text editing. |
| The card list required opening cards individually and used substantial vertical space. | A teacher needs to inspect and edit many cards in a compact table with relevant information immediately visible. | Recorded DEC-017 for the teacher editor. |
| Regeneration after submitting a teacher review and use of a learner's stored API key were considered. | The teacher should regenerate while editing, and a learner must not be forced to share their key or expose it to a teacher. | Recorded DEC-018 and DEC-019; the secure implementation remains an open question. |
