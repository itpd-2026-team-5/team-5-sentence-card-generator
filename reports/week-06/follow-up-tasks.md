# Week 6 Decision Follow-up Preparation

This document prepares the specification, story, and task changes arising from the [Customer review](meeting-report.md).
It is a preparation record, not a second story registry or a list of completed implementation tasks.
GitHub issues remain the source of truth for stories and scheduled work.

## Current state and publication order

- [PR #203](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/203) merged the meeting records, DEC-104–DEC-124, the linked functional-requirement updates, and QR-06 into `main`.
- [PR #206](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/206) merged product changes and telemetry. [Product checks on main](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/42501364765) pass, but do not replace live-provider, deployed, phone-layout, or Customer-acceptance evidence. The issue-link publication prerequisite is now satisfied.
- [The course issue-link rule](https://github.com/inno-itpd/itpd/blob/main/requirements/issue-tracking-requirements.md#linking-a-file-from-an-issue-or-a-pull-request) requires files in issues and comments to be linked on `main`; do not publish branch links as substitutes.
- Before applying the drafts, reread each live issue and use the next free AC number if another member has added criteria. Preserve existing criteria, verdict comments, and edit history.
- For each changed story, add a change comment describing the new criteria and links to the decisions. Reopen a closed story when a new related implementation task is linked; do not infer new acceptance from this meeting.
- Create implementation issues through the Task form, one unit of work per future pull request. Leave them unscheduled until planning assigns the milestone, Responsible, Accountable, and matching assignees.
- The task drafts below are prospective work. A passing test or completed checkbox requires actual evidence.

## Implementation evidence used to scope follow-up tasks

This 2026-11-08 follow-up separates merged implementation from remaining verification.
The drafts below are retained as acceptance-check preparation; do not create duplicate implementation issues for behavior already delivered in PR #206.
The published tasks below were scoped as bounded verification or remaining-change work against the live stories and existing implementation.
No draft checkbox or story criterion is marked complete by this audit.

| Draft | Existing repository evidence | Remaining evidence or decision |
| --- | --- | --- |
| Text language and reader controls | [TextForm](../../frontend/src/components/TextForm.tsx), [Reader](../../frontend/src/pages/Reader.tsx), and [language tests](../../backend/tests/test_text_languages.py). | Check the complete input/count/grouping/destination flow; exact panel placement and direct-removal shortcuts remain open. |
| Teacher summaries and source context | [Teaching](../../frontend/src/pages/Teaching.tsx) and [CardEditor](../../frontend/src/components/CardEditor.tsx). | Run long-content phone-width checks and verify field ordering and control reachability. |
| Teacher lexical corrections | [Account tests](../../backend/tests/test_accounts.py) cover corrected card identity, source context, memberships, and the continued review counter. | Verify unchanged due dates and history contents, explicit-save browser behavior, and the actual shared-account workflow; the existing test does not assert every field in the proposed criterion. |
| Regeneration and archive guidance | [CardEditor](../../frontend/src/components/CardEditor.tsx) contains regeneration help and result display; [account tests](../../backend/tests/test_accounts.py) refuse teacher instruction replacement and permanent deletion. | Verify the browser preview/save behavior and guidance against every FR-011 criterion; retain the unresolved instruction-permission question. |
| Teacher list states | [Teaching](../../frontend/src/pages/Teaching.tsx) contains state explanations and request-first filtering. | Check scrolling, fixed instructions/actions, and comprehension; retaining or removing the Open button still needs its own answer. |
| Study labels and group order | [Today](../../frontend/src/pages/Home.tsx) uses Study one deck; [frontend tests](../../frontend/tests/client.test.mjs) cover the group-move function. | Verify persisted selection/order and unchanged card data through the complete browser/backend workflow. |
| Deck summaries and memberships | [Decks](../../frontend/src/pages/Decks.tsx), [DeckPage](../../frontend/src/pages/DeckPage.tsx), and [membership tests](../../backend/tests/test_decks.py). | Verify visible language pairs, editing guidance, preserved history, and the final-membership behavior in the UI. |
| Daily study limits | [Decks](../../frontend/src/pages/Decks.tsx) exposes both limits; [study tests](../../backend/tests/test_study.py) cover the daily new-card cap. | Verify separate deck persistence, due-review admission, same-day relearning, and preservation of the existing schedule. |
| External-user checks | [QR-06](../../docs/quality-requirements/qr/QR-06.md) supplies phone cases and [DEC-124](../../docs/decisions.md#dec-124) records the Customer's usability direction. | Prepare and conduct the outside-user work with observations and assistance; no participant outcome exists in the reviewed evidence. |

## Decision mapping

| Decisions | Specification | Related stories | Follow-up |
| --- | --- | --- | --- |
| DEC-104 | [FR-014](../../docs/functional-requirements/fr/FR-014.md), [ADR-007](../../docs/architecture/adr/ADR-007.md) | [US-17 #191](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) | Extend existing dashboard tasks #196 and #197 with the label/window checks; both specifications are on main. |
| DEC-105 | Feasibility investigation; no cost-reporting behavior is committed. | An implementation story is needed only if the team decides to build the cost view. | Investigate provider data; retain the conditional scope. |
| DEC-106–DEC-114 | [FR-011](../../docs/functional-requirements/fr/FR-011.md); [QR-06](../../docs/quality-requirements/qr/QR-06.md) | [US-12 #34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34) | Teacher summary/editor, lexical-edit safety, regeneration flow, and review-list tasks below. |
| DEC-115 | [FR-001](../../docs/functional-requirements/fr/FR-001.md) | [US-01 #30](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30) | Reader/input task below; reopen the closed story when its new task is linked. |
| DEC-116–DEC-117 | [FR-002](../../docs/functional-requirements/fr/FR-002.md); [FR-003](../../docs/functional-requirements/fr/FR-003.md) | [US-02 #31](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31), [US-03 #32](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32) | Reader/input task below; preserve past verdicts when reopening for new work. |
| DEC-118–DEC-119 | [FR-008](../../docs/functional-requirements/fr/FR-008.md) | [US-09 #42](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/42) | Today study-action and group-order task below. |
| DEC-120, DEC-122–DEC-123 | [FR-006](../../docs/functional-requirements/fr/FR-006.md) | [US-04 #37](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/37) | Deck summary, editor guidance, and card-membership task below. |
| DEC-121 | [FR-009](../../docs/functional-requirements/fr/FR-009.md) | [US-10 #36](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36) | Learner-controlled daily-limit task below. |
| DEC-124 | [QR-06](../../docs/quality-requirements/qr/QR-06.md), plus the reader, study, and teacher workflow requirements. | [US-15 #142](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/142) and the stories exercised by each usability task. | External-user usability preparation below; no passing test or story acceptance is claimed. |

## Story body publication record

On 2026-11-08, the eight story bodies below were updated on GitHub and read back for verification.
The update added 18 unchecked criteria and the prepared decision traces, preserving every existing criterion and checkbox.
FR-014 and ADR-007 now have main-file links in US-17's Specified by section.
The bodies were initially updated without changing issue states; the subsequent publication below links the new tasks, reopens US-01–US-03, and records the change comments.
The detailed deltas below retain the preparation text as the record of what was applied; GitHub remains the source of truth.

| Story | Criteria added | Decision traces added |
| --- | --- | --- |
| [US-01 #30](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30) | AC-04 | DEC-115 |
| [US-02 #31](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31) | AC-04, AC-05 | DEC-116, DEC-117 |
| [US-03 #32](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32) | AC-05 | DEC-117 |
| [US-12 #34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34) | AC-04, AC-05, AC-06, AC-07, AC-08 | DEC-106, DEC-107, DEC-108, DEC-109, DEC-110, DEC-111, DEC-112, DEC-113, DEC-114 |
| [US-04 #37](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/37) | AC-04, AC-05, AC-06 | DEC-120, DEC-122, DEC-123 |
| [US-09 #42](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/42) | AC-03, AC-04, AC-05 | DEC-118, DEC-119 |
| [US-10 #36](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36) | AC-04, AC-05 | DEC-121 |
| [US-17 #191](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) | AC-03 | DEC-104 |

## Task and comment publication record

On 2026-11-08, the nine follow-up issues below were created and linked in both directions with their stories.
The work is scoped to remaining verification or confirmed corrections of the merged implementation; no repeated feature implementation or completed check is claimed.
The new tasks have no sprint milestone or assignees pending planning.
US-01 #30, US-02 #31, and US-03 #32 were reopened when the new related task was linked; their earlier verdicts and checked criteria are retained.

| Task | Scope | Stories |
| --- | --- | --- |
| [#213](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/213) | Verify text language and reader selection controls | [#30](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30), [#31](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31), [#32](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32) |
| [#214](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/214) | Verify teacher summaries and source context on phones | [#34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34) |
| [#215](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/215) | Verify card identity and progress after teacher word corrections | [#34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34) |
| [#216](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/216) | Verify teacher regeneration saving and archive guidance | [#34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34) |
| [#217](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/217) | Verify teacher review states and fixed list controls | [#34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34) |
| [#218](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/218) | Verify study labels and persisted group deck ordering | [#42](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/42) |
| [#219](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/219) | Verify deck summaries and card membership preservation | [#37](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/37) |
| [#220](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/220) | Verify per-deck daily study limits and schedule preservation | [#36](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36) |
| [#221](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/221) | Prepare external-user checks for reader, study, and teacher flows | [#31](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31), [#42](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/42), [#34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34), [#142](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/142) |

Change comments: [#30](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30#issuecomment-6725541686), [#31](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31#issuecomment-6725571083), [#32](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32#issuecomment-6725571889), [#34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34#issuecomment-6725572291), [#36](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36#issuecomment-6725572790), [#37](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/37#issuecomment-6725573244), [#42](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/42#issuecomment-6725573768), [#191](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191#issuecomment-6725574171).
Existing dashboard tasks [#196](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/196) and [#197](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/197) now carry AC-04 for actual route/outcome values, the SLI/window, and the documented query, with main-file FR-014 and ADR-007 links.

The available connector did not expose issue-type assignment or clearing an existing milestone, and local noninteractive GitHub authorization was unavailable.
The new issues currently carry the existing Task form's task label; applying the Task issue type to #213–#221 remains a metadata follow-up.
The old milestone on reopened #31 and #32 must also be cleared before these stories are treated as unscheduled refinement; no new sprint assignment or velocity is inferred here.

## Applied story deltas

### US-01: issue #30

Live story: [#30](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/30).

Add to `Traces to` after the decisions reach `main`:

- [DEC-115](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-115)

Append these unchecked acceptance criteria without renumbering the existing ones:

- [ ] AC-04: Given German is selected for a nonempty text containing English words, when the learner saves it, then the text is retained with German as its language and is not rejected solely for that mismatch.

Change comment to post with the body update:

> Added AC-04 and decision trace links following the Week 6 Customer review. Record the decision to trust the selected text language; keep the earlier acceptance record and reopen only when a new implementation task is linked. The cited functional requirements define the detailed checks. Existing criteria and previous acceptance records are preserved; this update is not a new acceptance verdict. Decisions: [DEC-115](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-115).

### US-02: issue #31

Live story: [#31](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/31).

Add to `Traces to` after the decisions reach `main`:

- [DEC-116](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-116)
- [DEC-117](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-117)

Append these unchecked acceptance criteria without renumbering the existing ones:

- [ ] AC-04: Given two words are selected to learn, when the reader displays its count, then the label identifies selected words and changes from 2 to 1 when one selection is cleared.
- [ ] AC-05: Given selected words and generation settings, when the reader is displayed, then To learn and Ignore form a separate group from the learning language, translation language, and destination deck.

Change comment to post with the body update:

> Added AC-04, AC-05 and decision trace links following the Week 6 Customer review. Clarify the existing selection workflow without deciding the selected-word list's final position or a direct-removal shortcut. The cited functional requirements define the detailed checks. Existing criteria and previous acceptance records are preserved; this update is not a new acceptance verdict. Decisions: [DEC-116](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-116), [DEC-117](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-117).

### US-03: issue #32

Live story: [#32](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/32).

Add to `Traces to` after the decisions reach `main`:

- [DEC-117](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-117)

Append these unchecked acceptance criteria without renumbering the existing ones:

- [ ] AC-05: Given words are selected in the reader, when generation settings are shown, then the language pair and destination deck are grouped separately from To learn and Ignore, and changing the destination preserves the selected words.

Change comment to post with the body update:

> Added AC-05 and decision trace links following the Week 6 Customer review. Carry the agreed separation of generation settings into the existing generation story; no new generation-success verdict was given. The cited functional requirements define the detailed checks. Existing criteria and previous acceptance records are preserved; this update is not a new acceptance verdict. Decisions: [DEC-117](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-117).

### US-12: issue #34

Live story: [#34](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/34).

Add to `Traces to` after the decisions reach `main`:

- [DEC-106](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-106)
- [DEC-107](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-107)
- [DEC-108](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-108)
- [DEC-109](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-109)
- [DEC-110](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-110)
- [DEC-111](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-111)
- [DEC-112](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-112)
- [DEC-113](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-113)
- [DEC-114](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-114)

Append these unchecked acceptance criteria without renumbering the existing ones:

- [ ] AC-04: Given a shared card on a phone, when the teacher opens its summary and editor, then the sentence translation is visible, long text does not overlap review controls, and the read-only original sentence with its selected word highlighted precedes the generated sentence; the word-editing fields follow the generated sentence and translation.
- [ ] AC-05: Given a shared card with saved reviews and deck memberships, when the teacher corrects its word or meaning and explicitly saves, then the same card retains its identifier, original source context, memberships, review history, and due date.
- [ ] AC-06: Given the teacher opens regeneration controls, when they enter feedback and regenerate, then the help explains the inputs and both language versions, and the latest result appears below the action in the same editor; changes reach the learner only after explicit saving.
- [ ] AC-07: Given cards in Checked, To check, and Asked to check states, when the teacher uses a list longer than the viewport, then the labels and request-first ordering are explained and the instructions and list actions remain visible while cards scroll.
- [ ] AC-08: Given the teacher editor offers Archive without Delete, when its help is shown, then archiving is explained without unavailable permanent-deletion guidance; learner-authored generation instructions remain read-only and teacher permanent deletion is refused.

Change comment to post with the body update:

> Added AC-04, AC-05, AC-06, AC-07, AC-08 and decision trace links following the Week 6 Customer review. Extend the existing teacher-correction story with the agreed review and editing behavior while retaining source-context and generation-instruction protections. The cited functional requirements define the detailed checks. Existing criteria and previous acceptance records are preserved; this update is not a new acceptance verdict. Decisions: [DEC-106](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-106), [DEC-107](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-107), [DEC-108](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-108), [DEC-109](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-109), [DEC-110](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-110), [DEC-111](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-111), [DEC-112](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-112), [DEC-113](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-113), [DEC-114](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-114).

### US-04: issue #37

Live story: [#37](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/37).

Add to `Traces to` after the decisions reach `main`:

- [DEC-120](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-120)
- [DEC-122](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-122)
- [DEC-123](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-123)

Append these unchecked acceptance criteria without renumbering the existing ones:

- [ ] AC-04: Given a deck summary, when the learner views it, then both learning and translation languages are shown.
- [ ] AC-05: Given cards open their editor on selection without a separate Edit button, when the learner opens the deck, then an instruction explains that action.
- [ ] AC-06: Given a reviewed card in decks A and B, when its membership in A is removed, then the same card remains in B with its history; removing its final membership does not leave it without a deck or permanently delete it.

Change comment to post with the body update:

> Added AC-04, AC-05, AC-06 and decision trace links following the Week 6 Customer review. Specify deck/card context and the confirmed membership invariant without changing the learner's separate permanent-delete action. The cited functional requirements define the detailed checks. Existing criteria and previous acceptance records are preserved; this update is not a new acceptance verdict. Decisions: [DEC-120](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-120), [DEC-122](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-122), [DEC-123](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-123).

### US-09: issue #42

Live story: [#42](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/42).

Add to `Traces to` after the decisions reach `main`:

- [DEC-118](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-118)
- [DEC-119](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-119)

Append these unchecked acceptance criteria without renumbering the existing ones:

- [ ] AC-03: Given one selected deck with a long title, when Today is shown in English, then the study action reads Study one deck without the title.
- [ ] AC-04: Given decks A, B, C, D with B and C selected, when B and C are dragged together before A and Today is reloaded, then the order is B, C, A, D, their selection persists, and new cards follow that order.
- [ ] AC-05: Given cards with existing reviews, when their decks are reordered, then card identifiers, review histories, and due dates are unchanged.

Change comment to post with the body update:

> Added AC-03, AC-04, AC-05 and decision trace links following the Week 6 Customer review. Add the agreed deck-order controls while keeping the existing text-order criteria and the individual-card reordering deferral. The cited functional requirements define the detailed checks. Existing criteria and previous acceptance records are preserved; this update is not a new acceptance verdict. Decisions: [DEC-118](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-118), [DEC-119](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-119).

### US-10: issue #36

Live story: [#36](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36).

Add to `Traces to` after the decisions reach `main`:

- [DEC-121](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-121)

Append these unchecked acceptance criteria without renumbering the existing ones:

- [ ] AC-04: Given a learner owns two decks, when they edit one deck's daily new-card and review limits and reload, then its limits persist, the other deck is unchanged, and study uses the saved limits while retaining the existing same-day relearning rule.
- [ ] AC-05: Given cards with saved FSRS histories and due dates, when the deck limits change, then those histories and due dates remain unchanged.

Change comment to post with the body update:

> Added AC-04, AC-05 and decision trace links following the Week 6 Customer review. Expose the existing per-deck admission limits to the learner without replacing FSRS scheduling. The cited functional requirements define the detailed checks. Existing criteria and previous acceptance records are preserved; this update is not a new acceptance verdict. Decisions: [DEC-121](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-121).

### US-17: issue #191

Live story: [#191](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191).

Add to `Traces to` after the decisions reach `main`:

- [DEC-104](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-104)

Append these unchecked acceptance criteria without renumbering the existing ones:

- [ ] AC-03: Given the observability dashboard shows P95 series for multiple routes and outcomes, when the operator inspects the staging or production chart, then its legend identifies each actual route and outcome value rather than unresolved label placeholders.

Change comment to post with the body update:

> Added AC-03 and decision trace links following the Week 6 Customer review. Make the existing operational quality charts identifiable; FR-014 and ADR-007 are available on main for the specification links. The cited functional requirements define the detailed checks. Existing criteria and previous acceptance records are preserved; this update is not a new acceptance verdict. Decisions: [DEC-104](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/decisions.md#dec-104).

## Published task acceptance snapshots

The snapshots below record the acceptance checks used to publish the nine issues above; GitHub owns their current scope and state.
The story changes and main-file publication prerequisite are satisfied.
The issue titles and descriptions were narrowed to remaining verification or correction after reconciling the merged implementation.

### 1. Clarify text language and reader selection controls

**Description**

Carry the Week 6 language-selection and reader-grouping decisions into the existing import, selection, and generation flows. Keep exact panel placement and any direct-removal shortcut as open design questions.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-115](../../docs/decisions.md#dec-115), [DEC-116](../../docs/decisions.md#dec-116), [DEC-117](../../docs/decisions.md#dec-117).

**Story**

- #30 (AC-04)
- #31 (AC-04, AC-05)
- #32 (AC-05)

**Requirements**

- [FR-001](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-001.md)
- [FR-002](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-002.md)
- [FR-003](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-003.md)

**Acceptance criteria**

- [ ] AC-01: A nonempty text is accepted with the user-selected language even when it includes words from another language, per FR-001 AC-05.
- [ ] AC-02: The selected-word count identifies its meaning and updates after clearing a selection, per FR-002 AC-06.
- [ ] AC-03: To learn and Ignore are separate from language-pair and destination settings, per FR-002 AC-07 and FR-003 AC-08; changing destination preserves selection.
- [ ] AC-04: Checks cover mixed-language input, changing the selection count, and changing the destination without losing selected words.

### 2. Make teacher card summaries and source context readable

**Description**

Show mobile sentence translations and arrange the teacher editor around read-only source context, generated text, and lexical fields. Respect QR-06's phone widths and control sizes.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-106](../../docs/decisions.md#dec-106), [DEC-107](../../docs/decisions.md#dec-107), [DEC-108](../../docs/decisions.md#dec-108).

**Story**

- #34 (AC-04)

**Requirements**

- [FR-011](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-011.md)

**Acceptance criteria**

- [ ] AC-01: At 360 and 390 CSS pixels, summaries show sentence translations and long content does not overlap review controls.
- [ ] AC-02: The original source sentence is read-only above the generated sentence with the selected word highlighted, per FR-011 AC-11.
- [ ] AC-03: Generated sentence and translation precede word-editing fields; desktop direct approval remains available.
- [ ] AC-04: The phone-layout procedure covers these conditions without recording a pass until the checks actually run.

### 3. Preserve card identity and progress during teacher word corrections

**Description**

Allow an authorized teacher to correct a shared card's word and meaning through explicit saving, with the regression checks raised by the Customer.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-112](../../docs/decisions.md#dec-112).

**Story**

- #34 (AC-05)

**Requirements**

- [FR-011](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-011.md)

**Acceptance criteria**

- [ ] AC-01: Correcting a missing article or word meaning and saving updates the same card seen by the learner.
- [ ] AC-02: Identifier, original source context, deck memberships, review history, and due date remain unchanged, per FR-011 AC-12.
- [ ] AC-03: Unsaved changes do not reach the learner; unshared-card access is refused.
- [ ] AC-04: Learner-authored generation instructions remain protected under FR-011 AC-06; the unresolved permission question is not treated as an agreed reversal.

### 4. Clarify teacher regeneration and archive guidance

**Description**

Explain card regeneration and place its result after the action; remove permanent-deletion instructions from a teacher view that offers only Archive.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-109](../../docs/decisions.md#dec-109), [DEC-110](../../docs/decisions.md#dec-110), [DEC-111](../../docs/decisions.md#dec-111).

**Story**

- #34 (AC-06, AC-08)

**Requirements**

- [FR-011](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-011.md)

**Acceptance criteria**

- [ ] AC-01: The heading and help explain card regeneration, corrective feedback, existing instructions, and sentence/translation outputs, per FR-011 AC-13.
- [ ] AC-02: The latest result follows the regeneration action in the same editor, per FR-011 AC-08, with existing explicit-save behavior preserved.
- [ ] AC-03: Teacher help explains Archive and omits an unavailable Delete action, per FR-011 AC-16.
- [ ] AC-04: Teacher attempts at permanent deletion and instruction editing remain refused under FR-011 AC-06 and AC-07.

### 5. Explain teacher review states and keep list instructions visible

**Description**

Make requested and unchecked review states understandable and keep the list instructions and actions visible while cards scroll.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-113](../../docs/decisions.md#dec-113), [DEC-114](../../docs/decisions.md#dec-114).

**Story**

- #34 (AC-07)

**Requirements**

- [FR-011](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-011.md)

**Acceptance criteria**

- [ ] AC-01: Checked, To check, and Asked to check are explained together with request-first ordering, per FR-011 AC-14.
- [ ] AC-02: A list longer than the viewport scrolls its cards while the instructions and list actions stay visible, per FR-011 AC-15.
- [ ] AC-03: The existing open-card paths remain usable; removal of the separate Open button is not assumed to be approved.

### 6. Use count-based study labels and move selected decks together

**Description**

Apply the Today action-label and group deck-order decisions without changing individual-card scheduling or the earlier card-reordering deferral.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-118](../../docs/decisions.md#dec-118), [DEC-119](../../docs/decisions.md#dec-119).

**Story**

- #42 (AC-03, AC-04, AC-05)

**Requirements**

- [FR-008](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-008.md)

**Acceptance criteria**

- [ ] AC-01: One selected deck uses Study one deck in English even when its title is long, per FR-008 AC-05.
- [ ] AC-02: Dragging selected B and C before A in A, B, C, D persists B, C, A, D with the same selected decks, per FR-008 AC-06.
- [ ] AC-03: New cards follow the saved deck order; card identifiers, histories, and due dates stay unchanged, per FR-008 AC-07.

### 7. Clarify deck summaries and preserve card memberships

**Description**

Show both deck languages, explain clickable-card editing, and check moving a card between decks without orphaning or deleting it.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-120](../../docs/decisions.md#dec-120), [DEC-122](../../docs/decisions.md#dec-122), [DEC-123](../../docs/decisions.md#dec-123).

**Story**

- #37 (AC-04, AC-05, AC-06)

**Requirements**

- [FR-006](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-006.md)

**Acceptance criteria**

- [ ] AC-01: Deck summaries show both learning and translation languages, per FR-006 AC-05.
- [ ] AC-02: Where no Edit button exists, the deck explains that selecting a card opens its editor, per FR-006 AC-06.
- [ ] AC-03: Removing one of two memberships preserves the same card and history; removing the final membership is refused or leaves a membership, per FR-006 AC-07.
- [ ] AC-04: The learner's explicit permanent-delete action remains distinct from changing memberships.

### 8. Let learners set per-deck daily study limits

**Description**

Make daily new-card and review limits editable by the learner on each deck, keeping the existing FSRS algorithm and same-day relearning behavior.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-121](../../docs/decisions.md#dec-121).

**Story**

- #36 (AC-04, AC-05)

**Requirements**

- [FR-009](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-009.md)

**Acceptance criteria**

- [ ] AC-01: A learner's changes to one deck's new-card and review limits survive reload and do not change another deck, per FR-009 AC-04.
- [ ] AC-02: The saved limits constrain new cards and due reviews admitted to study; same-day relearning retains its existing exemption.
- [ ] AC-03: Changing limits preserves card histories and due dates, per FR-009 AC-05.

### 9. Prepare external-user checks for the revised reader, study, and teacher flows

**Description**

Prepare the Week 7 usability work using the workflows and comprehension questions raised in the Customer review; distinguish usability findings from scripted QR-06 results.
Carry forward the corresponding [Week 6 action point](meeting-report.md#action-points), per [DEC-124](../../docs/decisions.md#dec-124).

**Story**

- #31 (AC-04, AC-05)
- #42 (AC-03, AC-04)
- #34 (AC-04, AC-06, AC-07)
- #142 (AC-01, AC-02, AC-03)

**Requirements**

- [FR-002](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-002.md)
- [FR-008](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-008.md)
- [FR-011](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/docs/functional-requirements/fr/FR-011.md)

**Acceptance criteria**

- [ ] AC-01: Tasks cover word selection and generation settings, studying selected decks, and reviewing a shared card, with observations and assistance recorded.
- [ ] AC-02: The protocol checks selection-count wording, review-state labels, open-card discoverability, and the fixed instructions without requiring the participant to confirm a preferred design.
- [ ] AC-03: Participant identity, consent, and raw test evidence remain in the private submission; public reporting is sanitized.
- [ ] AC-04: Preparation is not recorded as a completed user test, passing QRT, or Customer story acceptance.

## Existing telemetry tasks and conditional investigation

- [DEC-104](../../docs/decisions.md#dec-104) belongs to [US-17 #191](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/191) and the existing [staging dashboard task #196](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/196) and [production dashboard task #197](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/197). AC-04 was added to each task: the P95 series legend identifies actual route and outcome values, the chart states its SLI and window, and its query matches the observability plan. Keep each task's existing environment isolation checks. FR-014 and ADR-007 now exist on `main`; use their main-file links and retain the existing tasks' scope and environment checks.
- The analytics task [#200](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/200) and [US-16 #190](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/190) already cover the metric plan and event capability. The meeting did not select a focus metric, so no new metric definition or Customer threshold approval is inserted here.
- [DEC-105](../../docs/decisions.md#dec-105) authorizes checking whether provider responses expose usable usage and cost information. Prepare a bounded investigation that lists available fields, limits, and whether cross-provider aggregation is justified; do not commit to a cost feature, a provider change, or average-price billing. If implementation is chosen, first express the operator's need as a story and supply its specification.
- Keep exact selected-word panel placement, direct-removal shortcuts, the separate Open button, and any change to learner-authored generation-instruction permissions as open questions from the [meeting report](meeting-report.md#open-questions).
