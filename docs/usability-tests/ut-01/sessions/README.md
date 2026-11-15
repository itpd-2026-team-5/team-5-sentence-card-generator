# UT-01 Sessions

This is the session sheet for [UT-01](../README.md): the checklist before a session, the facilitation script, the scenario cards, the provided text, the observation sheet, and the template for the sanitized note of each counted session.
The record's [protocol](../README.md#protocol), [tasks](../README.md#the-tasks), and [help rule](../README.md#help-rule) govern; this sheet is what the team holds during the session.

No counted session has run, and this directory carries no session note yet.

## Before each session

- [ ] The team's 80% QR-11 threshold and sample rule are recorded, and the remaining [pre-session design checks](../README.md#pre-session-design-confirmations) are complete.
- [ ] The participant's signed consent is in the private usability-data repository, covering the recording and the sanitized public results.
- [ ] The instrumentation was verified before the first counted session, per [Instrumentation](../README.md#verification-before-the-first-counted-session).
- [ ] The staging demo data is reset with `python -m app.seed --reset`, and the [language and data setup](#language-and-data-setup) matches this participant's screened learning language.
- [ ] In the private staging browser window, set `localStorage.setItem("ut-01-code", "P-01")` in the console, using this session's code; a test action shows an event with `source=usability-test` and that code. Clear it and close the window after the session.
- [ ] Card generation works on staging: a teammate generated one card after the reset and deleted it.
- [ ] The team's laptop is on the university network, the browser shows the sign-in page in a private window, and the session account's sign-in is ready.
- [ ] The recorder captures the screen and the voice, and the printed text and scenario cards are on the desk.
- [ ] The facilitator and the observer are both present.

## Language and data setup

The same three tasks are used for all participants; the only scenario substitution is the screened learning language, Russian or German, following [DEC-143](../../../decisions.md#dec-143).

1. Before the participant sits down, reset the synthetic account. Set the interface and card-translation language to English in every session.
2. For Russian use the seeded Russian deck; for German use the seeded German deck named Travel by train. Record the chosen language on the observation sheet. These are setup choices, not task instructions given to the participant.
3. Set the chosen deck to the participant's screened level and make at least three existing cards answerable for the study task, with sufficient daily study limits. Do not practise the task for the participant. Check both language setups in the teammate dry run; reset again afterwards.
4. Print the matching weekend text below, and print the scenario cards with only `[learning language]` replaced by `Russian` or `German`. Do not preload that weekend text or generate its cards for the participant. Use a fresh copy of the same language text for every participant assigned that language.
5. Keep the same device, interface, translation language, task order, outcomes, time limits, and help rule across sessions. The two supplied texts use the same everyday theme; record language as a limitation rather than assuming equal reading difficulty.
6. Confirm that any Russian interview can be conducted by a Russian-speaking teammate, as [the survey-language rules](../surveys.md#survey-language) require. Record who conducts it. Prior flashcard-app experience is optional under [DEC-144](../../../decisions.md#dec-144); do not explain cards or decks before measuring first use.

If either language setup, standard questionnaire comprehension, generation, or the session prerequisites cannot be verified, do not start a counted session.

## Facilitation script

The facilitator reads the quoted parts verbatim. The [survey-language rules](../surveys.md#survey-language) govern the optional Russian pre-test and post-test; timed tasks use the printed English scenarios, and no one translates interface controls or adds navigation hints. The same facilitator remains responsible for all counted sessions.

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

Print each card on its own sheet after the single learning-language substitution defined in [Language and data setup](#language-and-data-setup). End states, timing, and help classification are those in [The Tasks](../README.md#the-tasks).

### Card 1: main task (10 minutes)

> You are reading a short text in [learning language] about a weekend at home, and there are words in it you want to remember.
> Keep this text in the app, choose two words from it that you would like to learn, and get study cards for them in your [learning language] deck.

### Card 2: secondary task 1 (5 minutes)

> You have a few minutes before class and want to practise only your [learning language] words.
> Practise them until you have answered at least three cards.

### Card 3: secondary task 2 (5 minutes)

> One of the cards you just made has a sentence you do not find useful.
> Get a different sentence for that word and keep the new card.

## The provided text

Print only the version matching the screened learning language beside the laptop for the main task, to be copied by the participant however they choose. Freeze these texts before counted sessions; neither is a completed participant result.

### Russian

```text
Выходные дома

В субботу я долго спала. Потом я приготовила завтрак: яичницу и крепкий чай.
Днём я убирала квартиру и поливала цветы на подоконнике. Вечером пришла
соседка, и мы смотрели старый фильм. В воскресенье шёл дождь, поэтому я
читала книгу и писала письмо бабушке.
```

### German

```text
Das Wochenende zu Hause

Am Samstag habe ich lange geschlafen. Danach habe ich Frühstück gemacht:
Eier und starken Tee. Am Nachmittag habe ich die Wohnung geputzt und die
Blumen auf der Fensterbank gegossen. Am Abend kam meine Nachbarin, und wir
haben einen alten Film gesehen. Am Sonntag hat es geregnet. Deshalb habe
ich ein Buch gelesen und einen Brief an meine Großmutter geschrieben.
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

Also recorded: the participant code, the date, the learning language, screened level, prior flashcard experience (including None), interview language and interviewer's GitHub username, whether the session is counted or exploratory, any stop and its reason, the SUS answers and score, and the post-test answers. Do not add names or contact details to this sheet; the identity mapping is separate and private.

## Sanitized session note template

After each counted session, the keeper writes `sessions/P-nn.md` from this template, with no name, email address, phone number, postal address, or other identifying detail, and with a quote only when the consent covers it.

```markdown
# P-nn

- **Relation to the target user:** <an adult learning Russian or German, with their approximate level>
- **Familiarity:** <the flashcard or vocabulary apps used before, or None>
- **Learning language:** <Russian or German>
- **Interview language:** <English or Russian>
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

The dry run under [#252](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/252) follows this sheet with a teammate as the participant, checking both language setups, the printed wording, the time limits, generation on staging, and the instrumentation. Verify that optional Russian pre-test/post-test wording changes no task guidance and that SEQ/SUS wording and scales remain unchanged.
It is readiness evidence, not a usability result or a counted participant session, and it gets no `P-nn` participant code. Reserve `P-998` solely as a synthetic dry-run telemetry code; never assign it to a real participant. In the private staging browser window, set `localStorage.setItem("ut-01-code", "P-998")` before rehearsal actions, then run `localStorage.removeItem("ut-01-code")` and close the window afterward. This marks rehearsal events `source=usability-test` so they do not enter product metrics.
Because the first counted session is planned for SPRINT-08, this rehearsal does not replace the separate [instrumentation verification](../README.md#verification-before-the-first-counted-session) before that session.

**Dry-run status:** Run on 2026-11-15, in person. Not counted, and not a usability result.

| Check | Observed result and evidence |
| --- | --- |
| Date, staging commit, facilitator, observer, and teammate playing the participant | 2026-11-15, evening, in person. Facilitator `saleemasekrea000`, who also took the observer's notes; teammate `KaramKhaddour` played the participant. The staging commit was not recorded. |
| Consent and recording explanation, private storage, and cleanup of working copies | The rehearsal was not recorded, so no recording or working copy needs storing or deleting. |
| Main and secondary scenario wording, start and end states, and time limits | Run with the Russian setup only; the German setup was not rehearsed. Main task: wording clear, about 5 minutes, most of it spent looking for the text, ended with three Russian cards, done without help. Secondary task 1: about 3 minutes, studied the Russian deck, rated cards by difficulty, and played the sound, done without help. Secondary task 2: replaced a formal sentence with a more casual one, done without help; generation took about 30 seconds, and the total task time was not recorded. All three finished inside their time limits. |
| Think-aloud, help rule, observation sheet, SEQ after each task, SUS, and post-test flow | No help was given. The pre-test asked about flashcard apps (answer: has used Anki or a similar app). The SEQ after each task and the SUS were not recorded. The post-test used two 1-to-10 ratings that are not in [the surveys](../surveys.md) (helpfulness 8, UX 9) and one open question, whose answer asked for clearer navigation between pages, clearer links, and hints on hover. |
| Staging generation and telemetry capture, without counting the run as participant data | Generation worked on staging. The rehearsal's events reached the staging OpenPanel project under `P-998` with `source=usability-test`, and the production project received none. |
| Defects found, changes required, and retest results | Protocol: the SEQ and the SUS were skipped and two non-standard ratings were used; counted sessions must use [the surveys](../surveys.md) exactly as written. Product: the participant asked for clearer page-to-page navigation and hover hints, and recommended replacing the browser's speech with a better sound source. No retest has run. |
| Readiness decision before the first counted session, with owner for each remaining blocker | Not yet ready. Before the first counted session: run the surveys as written, rehearse the German setup, and run the separate [instrumentation verification](../README.md#verification-before-the-first-counted-session) under [#254](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/254). The participant also named a better sound source as a condition before real sessions; the team decides whether that blocks the sessions. |
