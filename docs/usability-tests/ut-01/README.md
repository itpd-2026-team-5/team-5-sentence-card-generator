# UT-01: Create A Sentence Card From A Chosen Text

- **Status:** Planned
- **Design sprint:** [SPRINT-07](../../project-plan.md#sprint-07)
- **Run sprint:** [SPRINT-08](../../project-plan.md#sprint-08)

Assess whether a representative language learner can turn a word they chose from their own text into a sentence card they keep for study without help.

## Research questions

1. Can a representative learner add a text, choose words from it, and get sentence cards for those words in a deck without facilitator help?
2. Where do learners hesitate, take a detour, or ask for help while choosing words, generating cards, studying, and replacing a sentence they do not like?
3. How easy do learners rate the main and the two secondary usability test tasks, and how usable do they rate the product overall?

## The Requirement

The test serves [QR-11](../../quality-requirements/qr/QR-11.md), whose [manual QRT-01](../../quality-requirements/qr/QR-11.md#qrt-01) reads the main task's unaided-completion proportion against the pre-session 60% bar.

## Participant Profile

- **Role:** an adult who is learning Russian as a foreign language and studies vocabulary from texts they read.
- **Familiarity:** has used at least one flashcard or vocabulary app, such as Anki or Quizlet, but has not used this product.
- **Device:** the team's laptop with a mouse, in a desktop browser, so every session runs on the same device.
- **Relation to the target user:** a learner of the kind the [product vision](../../product-vision.md) names, at about A1 to B1 in Russian, who reads English, the language the interface and the cards' translations use.
- **Excluded:** anyone under 18, a teammate, the Customer, the instructor, and the course staff.
  A classmate who is not on the team may take part when they match the profile.

A session with someone outside the profile is exploratory: it is not counted, and its note says so.

### Recruitment target

- **Target:** five representative participants, the design target, and at least three completed counted sessions.
- **How the team finds them:** the team asks international students and staff at the university who study Russian, through the team's own contacts and the university's student chats, and checks each volunteer against the profile with the pre-test's screening questions before arranging a session.
- **Codes:** `P-01`, `P-02`, and so on, assigned in the order the sessions are arranged.
  A participant who withdraws, refuses the recording, or does not consent to the sanitized public results is not counted, the code is retired, and a replacement is recruited under the next free code.
- **Public status:** only the count of arranged and completed sessions is public; names and contact details stay in the private usability-data repository.

## The Tasks

Every participant does the same three usability test tasks in this fixed order, with the main task first.
The facilitator reads each scenario verbatim from [the session sheet](sessions/README.md#scenario-cards) and hands the participant the printed card.

### Main task: turn words from a text into cards

> You are reading a short Russian text about a weekend at home, and there are words in it you want to remember.
> Keep this text in the app, choose two words from it that you would like to learn, and get study cards for them in your Russian deck.

- **Start point:** signed in as the session's learner account, on the first screen after sign-in, with the printed text beside the laptop.
- **End state:** the Russian deck holds at least two new cards whose words the participant chose from the provided text.
- **Time limit:** 10 minutes.

### Secondary task 1: study a chosen deck

> You have a few minutes before class and want to practise only your Russian words.
> Practise them until you have answered at least three cards.

- **Start point:** where the main task ended.
- **End state:** at least three study answers are saved for cards of the Russian deck, and no other deck was studied.
- **Time limit:** 5 minutes.

### Secondary task 2: replace a sentence you do not like

> One of the cards you just made has a sentence you do not find useful.
> Get a different sentence for that word and keep the new card.

- **Start point:** where the first secondary task ended.
- **End state:** one card the participant made in the main task has a new sentence, and the participant has kept it.
- **Time limit:** 5 minutes.

### Success criteria

Each task's outcome is one of these, decided by the observer against the task's end state:

- `Unaided`: the participant reaches the end state within the time limit without help.
- `Assisted`: the participant reaches the end state within the time limit after help, and the help is recorded.
- `Failed`: the end state is not reached within the time limit, or the participant gives up.

### Help rule

Help is any action or words from a team member that point the participant towards the end state: naming or pointing at a control, a screen, or a step; confirming a choice before it is made; or doing a step for them.
Re-reading the scenario on request and answering a question about the scenario itself, such as which deck is the Russian one, are not help.
The facilitator gives help only when the participant asks for it or has been stuck for two minutes with no progress, and the observer records the time and the words of every help.

## Protocol

Every session runs in this order, from the facilitation script in [the session sheet](sessions/README.md):

1. **Welcome:** what the test is for, that the product is being tested and not the participant, and how long it takes, about 40 minutes.
2. **Consent and recording check:** the signed [consent](consent.md) is in place, covering the recording and the sanitized public results, and the recording starts only after it.
3. **Pre-test:** the questions in [the surveys](surveys.md#pre-test), including the 18-or-older declaration.
4. **Think-aloud instruction:** the participant is asked to say what they are looking for, what they expect, and what surprises them.
5. **Scenario reading and observation:** for each task in order, the facilitator reads the scenario verbatim, starts the timer when the participant starts, and stops it at the end state, the time limit, or the participant giving up; the observer fills in the observation sheet.
6. **SEQ after each task:** the single ease question in [the surveys](surveys.md#seq-after-each-task), before the next scenario is read.
7. **SUS and open-ended post-test after all the tasks:** [the SUS](surveys.md#sus-after-all-the-tasks), then [the post-test](surveys.md#open-ended-post-test).
8. **Debrief:** the facilitator answers the participant's questions about the product, thanks them, and repeats how to withdraw.

The facilitator answers only questions about the scenario, never about the interface, and does not solve a task for the participant; help follows the [help rule](#help-rule).
At least two team members run every session, and the same facilitator runs every counted session.

**Stop rule:** the facilitator stops the session when the participant asks to stop, or when the team sees a critical or security-sensitive problem, such as another account's data on screen; the stop and its reason are recorded in the session note and in the results, and a session stopped before its data is complete is not counted as completed.

## Measures

Every counted session records:

- **Completion and assistance:** each task's `Unaided`, `Assisted`, or `Failed` outcome, and the time and words of each help.
- **Time on task:** seconds from the end of the scenario reading to the end state, the time limit, or giving up, timed by the observer.
- **SEQ:** the single ease question after each task, 1 very difficult to 7 very easy.
- **SUS:** the ten standard items after all the tasks, and the score computed by the formula in [the surveys](surveys.md#scoring).
- **Qualitative evidence:** the think-aloud remarks, the friction points, the quotes, and the post-test answers.
- **Instrumentation:** the events in [Instrumentation](#instrumentation) where they cover the task.

`QR-11` reads one of these measures with a statistic from the [Analysis Plan](#analysis-plan); the others are reported as results.

## Instrumentation

### What the test observes

- For the main task: that a text was saved, which words were marked, and whether generation saved cards or failed, in order, with their times, so the funnel from text to cards can be compared with the observer's timings.
- For the first secondary task: that study answers were saved and how many.
- For the second secondary task: that a rewrite was requested for a card and whether the replacement was saved or failed.

### The events it reuses

The test reuses these Week 6 events from [the event table](../../analytics.md#the-events), emitted by the backend:

| Task | Events |
| --- | --- |
| Main | `text_added`, `word_marked`, `generation_completed`, `generation_failed` |
| Secondary 1 | `study_review_completed` |
| Secondary 2 | `card_rewrite_requested`, `card_regeneration_completed`, `card_regeneration_failed` |

### What it adds

The test adds no new event.
During a session the reused events carry `source=usability-test` instead of `source=web`, and an added field, `participant_code` (string, optional, staging test only), holding the session's `P-nn` code.
The field is added to the reused events' rows in [the event table](../../analytics.md#the-events) in the same pull request as the code that emits it, under [#253](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/253).

### Environment and store

- **Environment:** the staging deployment only; production never receives a test event.
- **Emitted by:** the staging backend, as for every Week 6 event.
- **Store:** the staging OpenPanel project.
  After the sessions, a filtered text export of the test's events, with the event name, the time, `source`, `participant_code`, and the event's own fields, and no IP address, location, user agent, referrer, or free text, is kept in the private usability-data repository.
- **Metrics:** every dashboard and metric query excludes `source=usability-test`, as it already excludes `source=smoke`.

### How one session's records are told apart

Each session uses the staging learner account reset from the seed before it, and the facilitator sets the session's `P-nn` code on staging before the participant sits down; the backend then tags that account's events with `source=usability-test` and that `participant_code`.
The observer also writes each task's start and end time on the observation sheet, so a session's events can be cut into tasks by time window.
The `P-nn` code is the exception to the opaque-identifier rule; the mapping from code to person stays in the private repository.

### What it cannot cover

- Whether the participant chose the words they wanted, read the generated sentences, or understood them: read from the think-aloud and the post-test.
- Hesitation, detours between screens, and help: the product records no page views, so these come from the observation sheet.
- Which deck a study answer belonged to: `study_review_completed` carries no deck, so the first secondary task's "no other deck" condition is read from the observation.
- The SEQ, the SUS, and the post-test, which are survey answers.

### Verification before the first counted session

Under [#254](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/254), a teammate runs the main task on staging with a test code, and the team confirms that the events reach the staging OpenPanel project with `source=usability-test`, that filtering by `participant_code` returns that run and nothing else, and that the production project received none.
The date and the result are recorded here before the first counted session.
Not yet verified.

## Analysis Plan

This plan is written before the first session, and no measure is added to it after the data.

- **Per-participant table:** one row per counted participant with each task's outcome, the help given, the time on task, each task's SEQ, and the SUS score.
- **Main-task completion:** the count and proportion of participants who reached the end state, and the count and proportion who reached it `Unaided`.
- **Main-task time:** the median time on the main task, with the minimum and maximum.
- **SEQ:** the median SEQ for each task, the main task and the two secondary tasks.
- **SUS:** the mean and the median, reported with `n=<count>`, because a small sample supports no claim about a population.
- **`QR-11`'s measure:** the count of `Unaided` main-task outcomes divided by the number of counted participants, with at least three participants. Compare that proportion with the [pre-session bar of 60%](../../quality-requirements/qr/QR-11.md#response-measure); the verdict goes in the testing plan, not in the results.
- **Thematic analysis:** the observations, the think-aloud remarks, and the post-test answers grouped into a small set of themes, each with the sessions it came from; a single participant's remark is not reported as a theme.
- **Severity:** each finding rated `Critical`, `Major`, or `Minor` with its reason:
  - `Critical`: it stops a participant from reaching a task's end state, or it exposes another person's data or key;
  - `Major`: it causes an `Assisted` or `Failed` outcome, or a delay of more than a minute, for two or more participants;
  - `Minor`: friction that is observed or reported but does not change an outcome.
- **Instrumentation comparison:** each session's events, filtered by its `participant_code` and `source=usability-test`, set against the observer's task times and outcomes; it reports where the two disagree, repeats [what the instrumentation cannot cover](#what-it-cannot-cover), and presents no test event as a product metric.
- **Limitations:** the sample size, the participants' relation to the target user, the staging environment with the team observing, and what the team could not measure.

### Triage plan

Every finding is triaged in `SPRINT-08`: the team records its severity, whether it opens a task issue, and when the work is scheduled, in the finding's `**Task issue:**` field.
When a significant finding exists, at least one becomes a task issue scheduled in [SPRINT-08](../../project-plan.md#sprint-08); no finding is forced when the test finds nothing significant.
A finding that changes product behaviour or reports a defect is carried by a task issue that links the story and the `AC-nn` it serves and names the `FR-nnn` or `ADR-nnn` in `### Requirements`; any other task says `None: repository upkeep`.
The task issue cites the finding by its path and anchor, such as `docs/usability-tests/ut-01/results.md#finding-1`.
A fix that lands in `SPRINT-08` ships in `REL-08`; a later fix moves to `SPRINT-09`, and the weekly report says so.

## Schedule

The counted sessions are planned for [SPRINT-08](../../project-plan.md#sprint-08), from 16 to 20 November 2026, after the instrumentation is verified and the dry run is done.
The team arranges each date with the participant as they are recruited, in person on the university campus and on the university network, and records the dates here; no date is fixed yet.
A session may run in `SPRINT-07` once this design is merged; when the sessions straddle the two sprints, this section says which ran in which.
The results are due with Submission 8 on 21 November 2026.

## Roles

- **Facilitator:** `saleemasekrea000`, who runs every counted session.
- **Observer:** `Byakko-san`, who times the tasks and records the help, the friction, and the quotes.
- **Keeper of the recordings and the raw notes:** `saleemasekrea000`, who moves them to the recordings folder and the private repository after each session.

## Environment

- **Deployment:** the staging deployment on the university VM, reached from the university network on the team's laptop.
- **Seed:** before each session the demo data is reset with `python -m app.seed --reset`, so the learner account starts with the seeded decks, including the Russian deck, and nothing from an earlier session.
- **Generation:** the staging deployment's configured model provider writes the sentences; the participant never enters an API key.
  The dry run confirms that generation works on staging before the first counted session, and a session does not start when it does not.
- **Payment:** no real payment is made; the product takes no payment.
- **Addresses and credentials:** the staging address and the session account's sign-in are shared in person for the session and are never committed.

## Consent And Data

- **Before each session:** the participant signs the consent from the [consent template](consent.md); the recording and the sanitized public results are required, and an anonymized quote is optional.
- **Private:** the signed consent records, the identity mapping from `P-nn` to person, the raw notes, the test's filtered telemetry export, and the working analysis are kept in the private repository `itpd-2026-team-5/team-5-sentence-card-generator-usability-data`, set up under [#248](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/248), with the team and the instructors as readers.
- **Recordings:** kept in a team-owned cloud folder shared with the instructors; its link and access are in the private repository and the Moodle submission only.
- **Public:** this record, the surveys, the consent template, the session sheet, the sanitized session notes, the results, and sanitized images.
- **Retention:** after the course is graded the team deletes the private repository, its history, and the recordings; the sanitized public record stays.

## Evidence Map

| Evidence | Where it goes | Visibility |
| --- | --- | --- |
| This record, the surveys, the consent template, and the session sheet | `docs/usability-tests/ut-01/` | Public |
| The sanitized session notes | `docs/usability-tests/ut-01/sessions/P-nn.md` | Public, sanitized |
| The results and the findings | `docs/usability-tests/ut-01/results.md` | Public, sanitized |
| Sanitized screenshots | `docs/usability-tests/ut-01/images/` | Public, sanitized |
| The signed consent records and the identity mapping | The private usability-data repository | Private |
| The raw notes, the test's filtered telemetry export, and the working analysis | The private usability-data repository | Private |
| The recordings | The team's cloud recordings folder | Private |
| The private repository's access and the recordings folder's link and access | The private repository and the Moodle submission | Private |
| The results summary and the `QR-11` verdict | The Week 8 report and the [testing plan](../../project-plan.md#quality-requirement-testing-plan) | Public |

Each item has one place, and no raw participant data is in the product repository.

The results are in [results.md](results.md).
