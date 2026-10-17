# Week 3 Customer Validation Report

## Metadata

- **Date:** 2026-10-17.
- **Duration:** approximately 87 minutes, including the reconnection break.
- **Attended:** Customer, KaramKhaddour, Byakko-san, Horokk1.
- **Presented:** the desktop application, including account setup, language and generation settings, external placement tests, Today, deck selection, the deck and card editors, source texts and word selection, generation into a deck, study sessions, and teacher sharing.
- **Recording:** permitted.
- **Transcript publication:** permitted.
- **Private transcript sharing with instructors if publication is refused:** not confirmed; the transcript is published with permission, so this fallback is not in use.
- **Transcript:** [sanitized English transcript](meeting-transcript.md).
- **Script:** [Week 3 meeting script](meeting-script.md).
- **Demonstration conditions:** generation used the placeholder provider because a working paid API key was unavailable; this demonstration did not establish real sentence quality, contextual translation, or token cost.

## Previous action points

| Action | Outcome | Decision |
| --- | --- | --- |
| ["Verify completion of the kickoff action to create the project group and invite the Customer; complete it if it is still outstanding."](../week-02/meeting-report.md#action-points) | Confirmation of the group's creation and the Customer's access remains pending; KaramKhaddour will verify both in Week 4. | None. |
| ["Obtain the Customer's explicit verdict on the MUP candidate and record it with the actual follow-up date and a new decision identifier."](../week-02/meeting-report.md#action-points) | The core workflow was reviewed; explicit confirmation of the exact [US-01 to US-03 candidate](../week-02/README.md#minimum-usable-product-candidate) remains pending with KaramKhaddour. | None; clarification pending. |
| ["Carry the recorded decisions into the affected story bodies and change comments, product boundary, MUP record where applicable, prototype record, and Week 2 report; create task issues for implementation."](../week-02/meeting-report.md#action-points) | Implementation tasks [#56](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/56), [#57](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/57), and [#58](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/58) produced the [backend](../../backend/app/main.py), [frontend](../../frontend/src/App.tsx), and [run instructions](../../docs/setup.md); Horokk1 will complete the remaining story updates and decision references in Week 4. | New requirements are recorded in [DEC-024](../../docs/decisions.md#dec-024) through [DEC-049](../../docs/decisions.md#dec-049). |
| ["Rework the prototype's text, card, and deck navigation, deck selection, card review layout, and per-deck generation settings."](../week-02/meeting-report.md#action-points) | The [frontend task #57](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/57) delivered separate [Texts](../../frontend/src/pages/Library.tsx), [Decks](../../frontend/src/pages/Decks.tsx), and [Study](../../frontend/src/pages/Study.tsx) screens; the demonstration exposed further changes to persistent selection, compact lists, and correction actions, which are carried forward. | [DEC-030](../../docs/decisions.md#dec-030), [DEC-031](../../docs/decisions.md#dec-031), [DEC-032](../../docs/decisions.md#dec-032), [DEC-034](../../docs/decisions.md#dec-034), [DEC-035](../../docs/decisions.md#dec-035). |
| ["Define the shared-deck teacher table and immediate regeneration flow, and investigate personal-key handling that prevents teacher access to a learner's key."](../week-02/meeting-report.md#action-points) | The [backend task #56](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/56) and [frontend task #57](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/57) produced [Teaching](../../frontend/src/pages/Teaching.tsx), [card editing](../../frontend/src/components/CardEditor.tsx), and [browser-side LLM requests](../../frontend/src/llm.ts); teacher prioritization, the no-teacher request bug, and a real-key end-to-end check remain follow-up work. | [DEC-036](../../docs/decisions.md#dec-036), [DEC-044](../../docs/decisions.md#dec-044), [DEC-045](../../docs/decisions.md#dec-045). |
| ["Select and test an LLM integration, measure generation quality and token cost, and identify the external placement tests to offer."](../week-02/meeting-report.md#action-points) | An [Anthropic integration and placeholder provider](../../backend/app/llm.py) exist under [task #56](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/56), and the demonstrated [Settings screen](../../frontend/src/pages/Settings.tsx) links external placement tests; real generation quality and cost were not measured because the demonstration lacked a working paid key. | [DEC-027](../../docs/decisions.md#dec-027), [DEC-029](../../docs/decisions.md#dec-029), [DEC-049](../../docs/decisions.md#dec-049). |

## Previous open questions

| Question | Answer | Decision |
| --- | --- | --- |
| ["Does the Customer accept the exact MUP candidate of US-01, US-02, and US-03, or must it include editing, study, or another story?"](../week-02/meeting-report.md#open-questions) | The core workflow and additional screens were demonstrated; formal candidate confirmation and criterion-based story verdicts remain pending. | None; clarification is carried forward. |
| ["How do we determine the user's language proficiency level reliably, and which external placement tests should be linked?"](../week-02/meeting-report.md#open-questions) | The Customer reviewed the external placement-test links and kept an integrated test optional; levels should be stored per language with deck overrides, while the reliability of a learner's selected or tested level remains unverified in [ASM-03](../../docs/assumptions.md#asm-03). | [DEC-025](../../docs/decisions.md#dec-025), [DEC-049](../../docs/decisions.md#dec-049). |
| ["Has the project group been created and has the Customer received its invitation?"](../week-02/meeting-report.md#open-questions) | Confirmation remains pending; KaramKhaddour owns the verification action. | None. |
| ["Which LLM provider or local model meets the quality and cost requirements?"](../week-02/meeting-report.md#open-questions) | The code supports Anthropic, but the meeting used placeholder output; [ASM-01](../../docs/assumptions.md#asm-01) and [ASM-02](../../docs/assumptions.md#asm-02) remain open, and no model's real quality or cost was established. | [DEC-027](../../docs/decisions.md#dec-027), [DEC-029](../../docs/decisions.md#dec-029). |
| ["Can personal-key requests be made directly from the browser, and how will teacher regeneration use a key without exposing a learner's key?"](../week-02/meeting-report.md#open-questions) | KaramKhaddour explained that personal-key requests run in the browser and the server stores generated sentences; the [browser request implementation](../../frontend/src/llm.ts) and [provider handoff](../../backend/app/llm.py) exist, but successful real-key generation and teacher isolation still need an end-to-end check. | [DEC-028](../../docs/decisions.md#dec-028); the existing [DEC-019](../../docs/decisions.md#dec-019) remains active. |
| ["Is one source sentence sufficient context, or when are neighbouring sentences needed?"](../week-02/meeting-report.md#open-questions) | No comparative test settled the minimum sufficient context; the Customer clarified that context must distinguish different meanings when identifying existing cards, while [generation](../../backend/app/generation.py) still needs testing with ambiguous words. | [DEC-043](../../docs/decisions.md#dec-043). |
| ["Will an optional service subscription be offered, and under what limits and billing rules?"](../week-02/meeting-report.md#open-questions) | A switch between personal and service keys was requested, but no subscription, funding, price, or quota policy was agreed. | [DEC-028](../../docs/decisions.md#dec-028) covers key selection only; the commercial question remains open. |

## Summary

- The Customer reviewed the text-to-card workflow and the additional study and teacher screens; real generation checks and formal per-story verdicts remain follow-up work.
- Language pairs should belong to decks, proficiency should be stored per language with deck overrides, and sentence-length controls should include both character bounds; the provider and model controls should support more than one LLM provider.
- Study deck selection should persist between visits, deck lists should be compact, and study should expose useful queue counts, daily limits, keyboard control, and an application-level audio toggle.
- Card correction needs clear archive and delete actions, quick single-card and batch regeneration, preserved source context and generation instructions, and context-aware duplicate handling within the selected deck.
- Teacher review should cover all cards in an explicitly shared deck while prioritizing learner-marked cards; the Teaching view needs student and workload information, and asking for teacher review without an assigned teacher was identified as a bug.

## Decisions

- [DEC-024: Store the learning and translation language pair per deck.](../../docs/decisions.md#dec-024)
- [DEC-025: Store proficiency separately for each language and allow a deck to override its default level.](../../docs/decisions.md#dec-025)
- [DEC-026: Provide both minimum and maximum sentence lengths in characters.](../../docs/decisions.md#dec-026)
- [DEC-027: Make API-key and model selection support LLM providers generically rather than presenting Anthropic as the only provider.](../../docs/decisions.md#dec-027)
- [DEC-028: Let the learner explicitly switch between a saved personal API key and the service's key.](../../docs/decisions.md#dec-028)
- [DEC-029: Use the LLM provider's usage statistics for token spending and expose useful card-quality statistics in the application instead of relying on request counts.](../../docs/decisions.md#dec-029)
- [DEC-030: Persist the learner's selected study decks between visits to Today.](../../docs/decisions.md#dec-030)
- [DEC-031: Present the deck list compactly with readable per-deck statistics.](../../docs/decisions.md#dec-031)
- [DEC-032: Keep the deck's description separate from its generation instructions.](../../docs/decisions.md#dec-032)
- [DEC-033: Retain the generation instructions used for each card.](../../docs/decisions.md#dec-033)
- [DEC-034: Distinguish archiving a card from permanently deleting it and label the archive action accordingly.](../../docs/decisions.md#dec-034)
- [DEC-035: Provide quick actions to mark cards for batch regeneration and to regenerate an individual card from the deck list or study screen.](../../docs/decisions.md#dec-035)
- [DEC-036: Enable a request for teacher review only when the deck has a teacher assigned.](../../docs/decisions.md#dec-036)
- [DEC-037: Preserve a card's source context and text title, linking back to the text only while that text exists.](../../docs/decisions.md#dec-037)
- [DEC-038: Highlight the target word and its article where applicable in the original-language sentence without requiring a highlighted equivalent in the translation.](../../docs/decisions.md#dec-038)
- [DEC-039: Allow the learner to disable automatic sentence audio within the application.](../../docs/decisions.md#dec-039)
- [DEC-040: Provide a keyboard shortcut to reveal the answer during desktop study.](../../docs/decisions.md#dec-040)
- [DEC-041: Provide per-deck daily limits for new cards and scheduled reviews.](../../docs/decisions.md#dec-041)
- [DEC-042: Show separate study counts for new cards, reviews from earlier sessions, and cards that need to be reviewed again in the current session.](../../docs/decisions.md#dec-042)
- [DEC-043: Use the marked word and its source context within the destination deck to determine whether an equivalent card already exists.](../../docs/decisions.md#dec-043)
- [DEC-044: Let a teacher review all cards in an explicitly shared deck while prioritizing cards the learner marked for review.](../../docs/decisions.md#dec-044)
- [DEC-045: Show the student associated with each shared deck and the remaining review work on the Teaching page.](../../docs/decisions.md#dec-045)
- [DEC-046: Store the source URL and other text metadata separately from the text used for word selection.](../../docs/decisions.md#dec-046)
- [DEC-047: Allow learners to reorder their source texts.](../../docs/decisions.md#dec-047)
- [DEC-048: Regenerate sentences that fail automated checks before presenting them as cards ready for review.](../../docs/decisions.md#dec-048)
- [DEC-049: Keep an integrated placement test as a Could Have feature while retaining links to external tests.](../../docs/decisions.md#dec-049)

Formal story acceptance remains pending for the following checks:

- [US-01](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30): confirm AC-01 through AC-03 individually, including the 300-word text, Russian file upload, and empty-input rejection.
- [US-02](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31): confirm the five-word, ignored-word, and unmarking checks in AC-01 through AC-03.
- [US-03](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32): verify real-language generation and contextual translation in AC-01 and AC-02, sentence originality in AC-03, and generator-failure handling in AC-04.

KaramKhaddour owns the follow-up with the Customer; Horokk1 will record the confirmed verdicts and update the story issues.

## Action points

The following work is assigned for Week 4.
Track each implementation change in a task issue and link its outcome from the next meeting report.

| Action | Owner | Due |
| --- | --- | --- |
| Verify that the project group exists and the Customer received its invitation; confirm the private-transcript-sharing permission if that fallback is needed. | KaramKhaddour | 2026-10-19, Week 4. |
| Obtain explicit, documented verdicts for US-01, US-02, and US-03 against their AC-nn, and confirm the exact MUP candidate; record any scope change with its actual decision date. | KaramKhaddour | 2026-10-19, Week 4. |
| Carry the meeting decisions into the affected story bodies and change comments, record verdict comments once confirmed, and create linked rework task issues. | Horokk1 | 2026-10-20, Week 4. |
| Obtain a working API key and run the real text-to-card flow, including the contextual Bank example and provider-failure handling; measure quality and token cost and update the checks for ASM-01 and ASM-02 with evidence. | KaramKhaddour | 2026-10-21, Week 4. |
| Prepare the language-per-deck, per-language level, character-bound, and provider/key-selection changes, and agree which implementation tasks fit the next release. | KaramKhaddour | 2026-10-21, Week 4. |
| Prototype persistent deck selection, compact deck rows, and quick archive and regeneration actions in the list and study views; prepare alternative word and translation placements for user evaluation. | Byakko-san | 2026-10-22, Week 4. |
| Define the teacher view's student and workload information and marked-card priority, clarify how many teachers a deck may have, and verify the assigned-teacher guard and key isolation in implementation tasks. | KaramKhaddour | 2026-10-22, Week 4. |
| Specify and test context-aware duplicate generation within a destination deck, including a repeated word with a changed context and an existing card in another deck. | KaramKhaddour | 2026-10-22, Week 4. |
| Check the external placement-test options with learners and record what evidence supports their selected levels in ASM-03. | Byakko-san | 2026-10-22, Week 4. |
| Prepare the service-key funding and quota proposal for the next customer decision. | Horokk1 | 2026-10-22, Week 4. |

## Open questions

| Question | What it would change | Follow-up |
| --- | --- | --- |
| What are the explicit AC-based verdicts for US-01, US-02, and US-03, and is that exact set accepted as the sufficient MUP candidate? | Story closure, rework tasks, the candidate record, and any change to the active milestone's core task. | KaramKhaddour: obtain a documented clarification by 2026-10-19, Week 4. |
| Has the project group been created and has the Customer received its invitation? | Whether the remaining kickoff logistics can be closed. | KaramKhaddour: verify by 2026-10-19, Week 4. |
| Which available provider and model actually meet the quality and cost requirements? | The integration choice and evidence for ASM-01 and ASM-02; placeholder output cannot settle them. | KaramKhaddour: run a real generation and cost evaluation by 2026-10-21, Week 4. |
| How reliable are the external placement tests and the learner's resulting level choice? | Level-setting behavior and the evidence for ASM-03. | Byakko-san: check with learners by 2026-10-22, Week 4. |
| What context is sufficient to distinguish word meanings, and how should the card identifier represent it? | Context extraction and duplicate prevention across changed texts and destination decks. | KaramKhaddour: test ambiguous-word and changed-context examples by 2026-10-22, Week 4. |
| Does the personal-key path work end to end with a real key, including teacher regeneration without learner-key access? | Whether the implemented handoff and access isolation satisfy DEC-019 in practice. | KaramKhaddour: validate the real-key and shared-deck paths by 2026-10-22, Week 4. |
| Will service-funded generation have a subscription or quotas, and who pays for it? | The product's commercial scope and the limits behind the personal/service key switch. | Horokk1: prepare a concrete proposal by 2026-10-22, Week 4, for the next customer decision; the commercial policy remains open. |
| Should a deck allow only one teacher at a time or several? | Sharing constraints and the teacher-selection interface. | KaramKhaddour: confirm the allowed number of teachers by 2026-10-22, Week 4. |
| Should the word and its translation stay together above both sentences, or should the translation sit above the translated sentence? | Study-card layout and the usability checks needed to compare placements. | Byakko-san: prepare alternatives for user evaluation by 2026-10-22, Week 4. |
| What retry limit and failure message should apply when generated sentences repeatedly fail automated checks? | Provider cost, waiting time, and the failure behavior of generation. | KaramKhaddour: propose a bounded policy by 2026-10-22, Week 4; DEC-048 does not establish unlimited retries. |

## Disagreements

The table records the required changes and their implementation status.

| Your position | Customer's position | What you changed |
| --- | --- | --- |
| One global language pair and level served every deck. | A learner may study multiple languages, with per-language levels and deck-specific overrides. | Recorded DEC-024 and DEC-025; settings changes are planned for Week 4. |
| Sentence settings exposed word bounds and a maximum character count. | Very short sentences also need a minimum character bound. | Recorded DEC-026; the additional control remains implementation work. |
| The API-key interface was Anthropic-specific and displayed request and token counters. | Provider/model choice should be generic, and provider billing statistics are more reliable than ambiguous request counts. | Recorded DEC-027 through DEC-029; provider support and statistics changes are follow-up work. |
| Today automatically selected all decks with due cards on each visit. | The learner's selection should persist without repeated deselection. | Recorded DEC-030; persistent selection and its UI are follow-up work. |
| Large deck blocks and the current instructions represented each deck's contents. | Use compact rows and separate a deck description from instructions that may change between generation runs. | Recorded DEC-031 through DEC-033; the redesign is planned for Week 4. |
| A bad-card flag, deletion, and editor-only rewriting covered card correction. | Archiving, deletion, teacher requests, and regeneration need distinct meanings and quick actions, including batch work. | Recorded DEC-034 through DEC-036; the no-teacher request was identified as a bug. |
| Source information was available behind a disclosure, but its relation to text deletion and the editing workflow was unclear. | Preserve origin and title, and link to the source only while it exists. | Recorded DEC-037; the source-context disclosure was demonstrated, while conditional linking still needs verification. |
| Study showed two counters and relied on pointer actions and device-level audio control. | Show three review groups, daily limits, keyboard access, and an application-level audio toggle. | Recorded DEC-039 through DEC-042; controls and queue presentation remain implementation work. |
| Existing generation and text screens did not make duplicate scope, source metadata, and ordering clear. | Compare word and context within the destination deck, retain source metadata separately, and allow text reordering. | Recorded DEC-043, DEC-046, and DEC-047; the duplicate rule needs implementation and tests. |
| Learner-marked cards were the main entry point for teacher review. | Teachers should inspect all shared cards, prioritize flagged ones, and see the associated student and pending workload. | Recorded DEC-044 and DEC-045; the teacher view needs refinement. |
