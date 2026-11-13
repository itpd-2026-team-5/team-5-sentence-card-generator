# UT-01 Sessions

This is the session sheet for [UT-01](../README.md): the checklist before a session, the facilitation script, the scenario cards, the provided text, the observation sheet, and the template for the sanitized note of each counted session.
The record's [protocol](../README.md#protocol), [tasks](../README.md#the-tasks), and [help rule](../README.md#help-rule) govern; this sheet is what the team holds during the session.

No counted session has run, and this directory carries no session note yet.

## Before each session

- [ ] The participant's signed consent is in the private usability-data repository, covering the recording and the sanitized public results.
- [ ] The instrumentation was verified before the first counted session, per [Instrumentation](../README.md#verification-before-the-first-counted-session).
- [ ] The staging demo data is reset with `python -m app.seed --reset`.
- [ ] The session's `P-nn` code is set on staging, and a test action shows an event with `source=usability-test` and that code.
- [ ] Card generation works on staging: a teammate generated one card after the reset and deleted it.
- [ ] The team's laptop is on the university network, the browser shows the sign-in page in a private window, and the session account's sign-in is ready.
- [ ] The recorder captures the screen and the voice, and the printed text and scenario cards are on the desk.
- [ ] The facilitator and the observer are both present.

## Facilitation script

The facilitator reads the quoted parts verbatim.

1. **Welcome.**
   "Thank you for coming. We are testing a web app that makes study cards for language learners. We are testing the app, not you: if something is hard, that is what we need to know. This takes about 40 minutes."
2. **Consent and recording check.**
   Confirm the signed consent, then: "We will now start the screen and voice recording. You can stop at any time." Start the recording.
3. **Pre-test.**
   Ask the [pre-test](../surveys.md#pre-test) questions and record the answers.
   Stop here when the participant is under 18, and mark the session exploratory when they are outside the profile.
4. **Think-aloud instruction.**
   "While you work, please say out loud what you are looking for, what you expect to happen, and anything that surprises you. I cannot help you with the app, but I can repeat the task."
5. **For each task in order:** read its scenario card, hand it over, say "Please start when you are ready", and start the timer when the participant starts.
   Stop the timer at the end state, at the time limit, or when the participant gives up, then ask the [SEQ](../surveys.md#seq-after-each-task).
6. **After the third task:** the [SUS](../surveys.md#sus-after-all-the-tasks), then the [open-ended post-test](../surveys.md#open-ended-post-test).
7. **Debrief.**
   Answer the participant's questions about the app, thank them, and say: "If you change your mind, tell us and we will delete your recording and notes."
   Stop the recording.

**No-help rule:** answer only questions about the scenario; never name or point at a control, a screen, or a step; never confirm a choice; never do a step for the participant.
When the participant asks for help or is stuck for two minutes with no progress, the facilitator may give the smallest hint that unblocks them, and the observer records it; the task is then at best `Assisted`.

**Stop rule:** stop the session when the participant asks to stop, or when the team sees a critical or security-sensitive problem, such as another account's data on screen.
Record the stop and its reason; a session stopped before its data is complete is not counted.

## Scenario cards

Print each card on its own sheet.

### Card 1: main task (10 minutes)

> You are reading a short Russian text about a weekend at home, and there are words in it you want to remember.
> Keep this text in the app, choose two words from it that you would like to learn, and get study cards for them in your Russian deck.

### Card 2: secondary task 1 (5 minutes)

> You have a few minutes before class and want to practise only your Russian words.
> Practise them until you have answered at least three cards.

### Card 3: secondary task 2 (5 minutes)

> One of the cards you just made has a sentence you do not find useful.
> Get a different sentence for that word and keep the new card.

## The provided text

Printed beside the laptop for the main task, and copied by the participant however they choose.

```text
Выходные дома

В субботу я долго спала. Потом я приготовила завтрак: яичницу и крепкий чай.
Днём я убирала квартиру и поливала цветы на подоконнике. Вечером пришла
соседка, и мы смотрели старый фильм. В воскресенье шёл дождь, поэтому я
читала книгу и писала письмо бабушке.
```

## Observation sheet

The observer fills one sheet per session, kept with the raw notes in the private repository.

| Field | Main task | Secondary 1 | Secondary 2 |
| --- | --- | --- | --- |
| Start time (clock) | | | |
| End time (clock) | | | |
| Time on task (seconds) | | | |
| Outcome (`Unaided`, `Assisted`, or `Failed`) | | | |
| Help given: time and words | | | |
| Friction points: where and what | | | |
| Quotes from the think-aloud | | | |
| SEQ (1 to 7) | | | |

Also recorded: the participant code, the date, whether the session is counted or exploratory, any stop and its reason, the SUS answers and score, and the post-test answers.

## Sanitized session note template

After each counted session, the keeper writes `sessions/P-nn.md` from this template, with no name, email address, phone number, postal address, or other identifying detail, and with a quote only when the consent covers it.

```markdown
# P-nn

- **Relation to the target user:** <for example, a student learning Russian at about A2>
- **Familiarity:** <the flashcard or vocabulary apps used before>
- **Device:** the team's laptop.
- **Counted:** Yes, or No with the reason.

<The main task's outcome, its time, and what happened, in two or three sentences.>
<Each secondary task's outcome, its time, and what happened.>

- **Help:** <each help given, with the task, or None>
- **SEQ:** main <n>, secondary 1 <n>, secondary 2 <n>.
- **SUS:** <score>.
- **Themes:** <the friction points that feed the thematic analysis>
- **Quote:** "<an anonymized quote>" (published with consent), or None.
```

## Dry run

The dry run under [#252](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/252) follows this sheet with a teammate as the participant, to check the wording, the time limits, generation on staging, and the instrumentation.
It is not evidence, it is not counted, and it gets no `P-nn` code; its date and the changes it caused are recorded here when it has run.
