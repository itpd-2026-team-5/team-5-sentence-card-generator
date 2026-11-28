# UT-01 Results

Five counted sessions ran remotely: `P-05`, `P-06`, and `P-07`, Russian learners, on 2026-11-27, and `P-04` and `P-02`, German learners, on 2026-11-28.
`P-04` ran before the [Customer review](../../../reports/week-08/meeting-report.md) and `P-02` after it, so the review saw four sessions and this record covers all five.
Every figure below is for `n=5` and supports no claim about learners in general.
The analysis follows the [analysis plan](README.md#analysis-plan); the sanitized notes are in [`sessions/`](sessions/README.md), and the raw notes, recordings, and telemetry export are private.

## The Results

### Per-participant table

| Code | Language | Prior flashcard apps | Interview | Main task | Secondary 1 | Secondary 2 | Help | SEQ (main, S1, S2) | SUS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [P-05](sessions/P-05.md) | Russian, A2 | RemNote, Anki | English | `Unaided`, 295 s | `Assisted`, 60 s | `Unaided`, 46 s | S1: explained the rating buttons | 5, 7, 7 | 92.5 |
| [P-06](sessions/P-06.md) | Russian, A2 | None | English | `Unaided`, 173 s | `Unaided`, 83 s | `Unaided`, 30 s | None | 7, 6, 5 | 85.0 |
| [P-07](sessions/P-07.md) | Russian, A1 | None | English | `Assisted`, 210 s | `Failed`, 248 s | `Assisted`, 109 s | Main: named **Texts**; S1: pointed to the deck; S2: said where cards are kept | 6, 1, 5 | 50.0 |
| [P-04](sessions/P-04.md) | German, A1 | Anki before | English | `Unaided`, 94 s | `Unaided`, 113 s | `Unaided`, 29 s | None | 6, 6, 7 | 90.0 |
| [P-02](sessions/P-02.md) | German, A1 | None | English | `Unaided`, 127 s | `Unaided`, 154 s | `Assisted`, 78 s | S2: said the cards were saved | 5, 6, 3 | 75.0 |

### Main task

- **Reached the end state:** 5 of 5.
- **Unaided:** 4 of 5 (80%).
- **Time on task:** median 173 seconds, minimum 94, maximum 295; every participant finished inside the 10-minute limit.

### Secondary tasks

- **Secondary task 1, study a chosen deck:** 3 `Unaided`, 1 `Assisted`, 1 `Failed`.
- **Secondary task 2, replace a sentence:** 3 `Unaided`, 2 `Assisted`; all five finished inside the 5-minute limit.

### SEQ and SUS

- **Median SEQ:** main task 6, secondary task 1 6, secondary task 2 5, on a scale of 1 (very difficult) to 7 (very easy).
- **SUS:** mean 78.5, median 85.0, `n=5`; the scores spread from 50.0 to 92.5, and four of five are above 68.

### Coverage

- **Learning language:** Russian 3 (`P-05`, `P-06`, `P-07`), German 2 (`P-04`, `P-02`).
- **Prior flashcard experience:** experienced 2 (`P-05`, `P-04`), newcomers 3 (`P-06`, `P-07`, `P-02`).
- **By group:** both German learners and both experienced users completed the main task `Unaided`; the one `Assisted` main task and the one `Failed` task are a Russian newcomer at A1, which supports no claim that level, language, or experience caused it.

### Thematic analysis

1. **Finding the generated cards and starting to study them** (`P-02`, `P-05`, `P-07`): after generation, `P-07` could not find the two new cards among the seeded decks and gave up on studying them; `P-02` thought the cards had not been saved and asked for a message saying where they are; `P-05` opened the seeded German deck first while looking for the Russian one.
2. **The rewrite controls** (`P-05`, `P-06`, `P-07`): the two icons on a card, **Mark to rewrite with others** and regenerate, were taken for each other by `P-05` and `P-06`, and `P-07` saw no progress while a sentence was regenerated and expected to press again.
3. **First-use guidance and the study ratings** (`P-02`, `P-04`, `P-05`, `P-06`, `P-07`): all five asked for a tutorial, a walk-through, an introduction, or a cue on the home page; `P-02`, `P-04`, and `P-05` did not know at first what **Again**, **Hard**, **Good**, and **Easy** do.
4. **Adding a text and choosing words is clear** (`P-02`, `P-04`, `P-05`, `P-06`): all four described the text and word-selection steps as intuitive once they had found **Texts**.

### Instrumentation comparison

Each session's events were read in the staging OpenPanel project, filtered by its `participant_code` and `source=usability-test`, and set against the observer's task times; the 2026-11-27 events show times to the minute, so an event within a minute of a task boundary is read as inside it.
The filtered exports are in the private repository.

| Code | Main task (text, words, generation) | Secondary 1 (study answers) | Secondary 2 (rewrite) | Agrees with the observation? |
| --- | --- | --- | --- | --- |
| P-05 | `text_added` and two `word_marked` at 00:27, then `generation_completed`, inside 00:26:44–00:31:39 | 8 `study_review_completed`, the last at 00:33 | `card_rewrite_requested`, then `card_regeneration_completed` at 00:36, inside 00:35:19–00:36:05 | Partly: the study answers began inside the main task's window, as observed; the answer at 00:33 falls between the two tasks or at the start of secondary task 1, where the observer saw "Session complete" |
| P-06 | `text_added` at 01:10, two `word_marked` and `generation_completed` (2 cards) at 01:11, inside 01:08:46–01:11:39 | 6 `study_review_completed`, one at 01:13, inside 01:12:38–01:14:01 | one `card_regeneration_completed` at 01:15, inside 01:14:54–01:15:24 | Yes |
| P-07 | `text_added` at 01:45 and `generation_completed`, inside 01:43:05–01:46:35 | no `study_review_completed`; about a dozen `word_marked` events, learn and none, at about 01:50 | three `card_regeneration_completed` at 01:53, inside 01:52:18–01:54:07 | Yes: no study answer was saved, and the participant was toggling words in the reader while looking for the cards; the three regenerations match the press-again behaviour of [Finding 2](#finding-2) |
| P-04 | `text_added` at 14:02:19, `word_marked` at 14:02:31 and 14:02:43, then `generation_completed`, inside 14:01:23–14:02:57 | 5 `study_review_completed`, one at 14:05:51, inside 14:04:26–14:06:19 | one `card_regeneration_completed`, after the study answers | Yes |
| P-02 | `text_added` at 17:36:30, `word_marked` at 17:36:42, then `generation_completed`, inside 17:35:03–17:37:10 | 3 `study_review_completed`, one at 17:39:37, inside 17:38:22–17:40:56 | two `card_regeneration_completed`, the second at 17:43:01, inside 17:42:02–17:43:20 | Yes; a second text, word, and generation were recorded during the post-test, outside every task window, and are not counted |

The events' `language` property read `ru` in the Russian sessions but `of` rather than `de` in both German sessions, so the learning language of a German session comes from the observation sheet, as the [instrumentation verification](README.md#verification-before-the-first-counted-session) already recorded.

The instrumentation cannot show hesitation, detours, help, or which deck a study answer belonged to, per [what it cannot cover](README.md#what-it-cannot-cover); those come from the observation, and no test event is presented as a product metric.

## Findings

### Finding 1

After generating cards, a first-time learner cannot find the new cards or start studying them.

- **Severity:** Critical: it stopped `P-07` from reaching the end state of secondary task 1, which they gave up after four minutes, and it caused `P-02`'s `Assisted` outcome in secondary task 2.
- **Tasks:** `UT-01 Task 2` and `UT-01 Task 3`, from `UT-01 P-07`, `UT-01 P-02`, and `UT-01 P-05`.
- **Evidence:** `P-07` looked through the study screen and the deck list without finding the two cards and gave up ([P-07](sessions/P-07.md)), and the telemetry shows no study answer and about a dozen word toggles in the reader during that task ([instrumentation comparison](#instrumentation-comparison)); `P-02` thought the cards had not been saved and began to redo them ([P-02](sessions/P-02.md)); `P-05` opened the seeded German deck first ([P-05](sessions/P-05.md)); in the Customer review the Customer also missed the destination link after generating ([review report](../../../reports/week-08/meeting-report.md#disagreements)).
- **Recommendation:** after generation, show which deck received the cards with a direct link to open that deck and to study the new cards; in the test account, keep only the decks the session needs.
- **Task issue:** [#308](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/308)

### Finding 2

The two rewrite icons on a card are mistaken for each other, and regeneration shows no progress.

- **Severity:** Minor: `P-05` and `P-06` hesitated and `P-07` expected to press again, but no outcome changed because of it.
- **Tasks:** `UT-01 Task 3`, from `UT-01 P-05`, `UT-01 P-06`, and `UT-01 P-07`.
- **Evidence:** `P-06` took **Mark to rewrite with others** for regeneration and needed the hover text ([P-06](sessions/P-06.md)); `P-05` passed over it unsure what it does ([P-05](sessions/P-05.md)); `P-07` saw the new sentence only after a delay with no indicator ([P-07](sessions/P-07.md)); the telemetry records `P-05`'s press of **Mark to rewrite with others** and three regenerations by `P-07` within one minute ([instrumentation comparison](#instrumentation-comparison)).
- **Recommendation:** label the two controls in words rather than icons alone, and show a progress state on the card while a sentence is regenerated.
- **Task issue:** [#310](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/310)

### Finding 3

A first-time learner does not know what the study ratings do and asks for first-use guidance.

- **Severity:** Major: it caused the `Assisted` outcome of `P-05`'s secondary task 1, three of five did not know what the ratings do at first, and all five asked for first-use guidance.
- **Tasks:** `UT-01 Task 2`, from `UT-01 P-05`, `UT-01 P-04`, and `UT-01 P-02`, with the post-test answers of all five.
- **Evidence:** `P-05` asked whether **Hard**, **Good**, and **Easy** rate the sentence and was told they set how often the card returns ([P-05](sessions/P-05.md)); `P-04` and `P-02` said the same buttons were unclear at first ([P-04](sessions/P-04.md), [P-02](sessions/P-02.md)); all five asked for a tutorial or introduction ([theme 3](#thematic-analysis)).
- **Recommendation:** explain the ratings on the study screen the first time a learner studies, such as a one-line hint under the buttons, and guide a first-time learner through the main task from text to study inside the flow, as the Customer preferred in [`DEC-162`](../../decisions.md#dec-162).
- **Task issue:** [#309](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/309)

## Limitations

- **Sample:** `n=5`: three Russian and two German learners, two experienced and three newcomers; the groups are too small for any comparison between them.
- **Remote sessions:** all five sessions ran remotely on the participants' own computers and browsers, not in person on the team's laptop as [the design](README.md#participant-profile) requires; the device, the screen size, and the network differed between sessions, and the facilitator could not see the participant's hands.
- **Late sessions:** the sessions ran on 27 and 28 November rather than in the planned 16–20 November window, and `P-02` ran after the Customer review, so the review judged four sessions.
- **Protocol:** the scenarios were paraphrased rather than read verbatim; in `P-05`'s session the facilitator moved on to studying inside the main task's time, so secondary task 1 was judged from that earlier study; each help followed a question or a misunderstanding by the participant, as the help rule allows, and still makes that outcome `Assisted`.
- **`P-07`'s familiarity:** the written pre-test recorded that `P-07` had used the product before; the participant confirmed this was an entry mistake, as they also said in the session, so the session is counted.
- **Roles:** `KaramKhaddour` facilitated all five sessions and `saleemasekrea000` observed, rather than `saleemasekrea000` facilitating and `Byakko-san` observing as [the roles](README.md#roles) planned; the same facilitator ran every counted session.
- **Environment:** the test account held seeded decks in both languages, which `P-05` and `P-07` mistook for their own; the team observed every session.
- **What could not be measured:** which deck a study answer belonged to comes from the observation only, and the German sessions' `language` property is wrong in the telemetry.

## Conclusion

1. **Can a representative learner turn chosen words into cards without help?** Yes for four of five: all five reached the main task's end state within half its time limit, and four did it unaided, exactly the 80% bar; the fifth, a Russian newcomer at A1, needed the **Texts** screen named.
2. **Where do learners hesitate?** After generation rather than before it: finding the new cards and starting to study them is where a newcomer failed and a second needed help, followed by the study ratings' meaning and the two look-alike rewrite icons; adding a text and choosing words caused no hesitation once **Texts** was found.
3. **How easy do learners rate it?** The main task's median SEQ is 6 of 7, and the median SUS is 85.0 (mean 78.5), with four of five above 68 and one newcomer at 50.0.

**Product response:** the team commits to [Finding 1](#finding-1), a direct link from the generation result to the new cards' deck and to studying them, as the first fix, and to [Finding 3](#finding-3), a first-use hint on the study ratings.
It commits to the labels and progress state of [Finding 2](#finding-2) when time allows in `SPRINT-09`.
The Customer preferred a tutorial inside the main flow, from a text to a study session, over a separate About page ([`DEC-162`](../../decisions.md#dec-162)); the team keeps that tutorial as the direction for first-use guidance in the product backlog after `SPRINT-09`, and declines the About page some participants suggested.
