# Risks

The team reads this register during every Friday 15:00 weekly review. When evidence settles a risk, the team updates its status and records its outcome or the reason it was dropped.

| ID | Status | Impact | Likelihood | Risk |
| -- | ------ | ------ | ---------- | ---- |
| [RISK-01](#risk-01) | Open | High | High | The Customer has not yet accepted the exact MUP candidate, so the team may build to an unconfirmed scope, which would leave the Week 3 increment without an agreed outcome. |
| [RISK-02](#risk-02) | Open | High | Medium | The prototype used mocked generation and generation quality and cost remain untested, so the chosen LLM may fail to produce usable sentences within the available budget, which would block the core card-generation flow. |
| [RISK-03](#risk-03) | Open | High | Medium | The team has one semester and several cross-cutting product flows to build, so integration may take longer than planned, which would leave the MUP incomplete at its deadline. |
| [RISK-05](#risk-05) | Open | High | Medium | The revised sample must include adult Russian and German learners and flashcard-app newcomers, so recruitment may miss the minimum of three counted participants or omit a required group by the end of SPRINT-08, which would leave `UT-01` without sufficient representative evidence for `QR-11`. |
| [RISK-08](#risk-08) | Open | High | Medium | The sessions depend on staging card generation, verified instrumentation, and participants' dates in a one-week run sprint, so `UT-01` may not finish by 2026-11-21, which would leave its results and the `QR-11` verdict missing from Submission 8. |
| [RISK-12](#risk-12) | Open | High | Medium | Staging and production run on a VM the team reaches only from campus and configures by hand, so the VM's env files and containers may drift from the runbook and from each other, which would make a deploy or a rollback behave differently from what was tested on staging. |
| [RISK-09](#risk-09) | Open | High | Low | The LLM key, the database passwords, and the telemetry credentials are typed into env files and shells by hand, so one may be committed, pasted into a report, or shown in a screenshot, which would let anyone spend the team's LLM budget or read the deployments' data. |
| [RISK-10](#risk-10) | Open | Medium | High | The configuration plan is edited by hand while the workflows, lockfiles, and documents it describes change every week, so it may describe an older repository than the one on `main`, which would send a member or an agent to a check, a file, or a rule that is no longer there. |
| [RISK-04](#risk-04) | Open | Medium | Medium | Personal API-key handling and teacher regeneration are unresolved, so a learner's key may be exposed or unusable by the teacher, which would block safe shared-deck review. |
| [RISK-07](#risk-07) | Open | Medium | Medium | The private usability-data repository has been created, but instructor access to it and the recordings folder is not yet confirmed, so instructors may be unable to inspect the raw usability evidence, which would make the public results unverifiable. |
| [RISK-11](#risk-11) | Open | Medium | Medium | The backend, the frontend, the actions, and the container images update through Dependabot pull requests that the team reviews alongside sprint work, so one update may break the build or need a code change the team has no time for, which would leave that dependency pinned at an old version while the others move. |
| [RISK-06](#risk-06) | Open | Medium | Low | A participant may withdraw or refuse the recording or the sanitized public results, so their session cannot be counted, which would reduce the counted sample and force its data to be removed. |

## RISK-01

The Customer has not yet accepted the exact MUP candidate, so the team may build to an unconfirmed scope, which would leave the Week 3 increment without an agreed outcome.

- **Status:** Open
- **Impact:** High
  - Without an accepted minimum scope, the team cannot tell whether the increment satisfies the Customer or which stories must be completed first.
- **Likelihood:** High
  - The Week 2 report says the Customer did not explicitly accept or reject the candidate of `US-01`, `US-02`, and `US-03`.
- **Trigger:** No customer verdict and corresponding decision are recorded before the team commits the Week 3 backlog.
- **Window:** SPRINT-03.
- **Mitigation:** Present the candidate stories to the Customer together, record the verdict as a decision, and update the plan and affected stories before scheduling the work.
- **Contingency:** Replan the remaining Week 3 work around the smallest scope the Customer explicitly accepts, moving excluded stories to SPRINT-04.

## RISK-02

The prototype used mocked generation and generation quality and cost remain untested, so the chosen LLM may fail to produce usable sentences within the available budget, which would block the core card-generation flow.

- **Status:** Open
- **Impact:** High
  - A generator that returns inaccurate, unsuitable, or unaffordable sentences would undermine the MUP's central outcome.
- **Likelihood:** Medium
  - The Week 2 validation report confirms that the prototype did not test a real provider; quality and cost checks remain action points.
- **Trigger:** Representative test outputs contain incorrect word meanings or exceed the team's agreed cost limit.
- **Window:** SPRINT-03 and SPRINT-04.
- **Mitigation:** Test candidate models early on words with known contextual meanings in Russian, English, and German, and record output quality and cost per card before integrating one.
- **Contingency:** Keep generation behind a provider boundary and ship only the tested model and languages that meet the agreed checks, rescheduling the remaining generation work to the next sprint.

## RISK-03

The team has one semester and several cross-cutting product flows to build, so integration may take longer than planned, which would leave the MUP incomplete at its deadline.

- **Status:** Open
- **Impact:** High
  - An incomplete end-to-end flow would prevent a learner from completing the MUP's core task even if individual components work.
- **Likelihood:** Medium
  - The product spans a React frontend, a FastAPI backend, persistent data, authentication, and LLM generation, while the Week 2 prototype was not a complete product implementation.
- **Trigger:** A pull request needed for the learner's text-to-card flow remains blocked across a weekly review, or the flow cannot be completed on a clean checkout.
- **Window:** SPRINT-03 through SPRINT-04.
- **Mitigation:** Integrate the smallest end-to-end learner flow first, keep the main branch buildable, and verify the documented setup from a clean checkout during each sprint.
- **Contingency:** Defer teacher and other non-MUP flows, keeping the sprint focused on the accepted learner text-to-card outcome.

## RISK-04

Personal API-key handling and teacher regeneration are unresolved, so a learner's key may be exposed or unusable by the teacher, which would block safe shared-deck review.

- **Status:** Open
- **Impact:** Medium
  - Exposing a learner's key would violate the agreed privacy boundary, while an unusable key would prevent the teacher from regenerating a card.
- **Likelihood:** Medium
  - The Week 2 report records personal-key handling as an open technical question; the Customer requires learners and teachers to use their own keys.
- **Trigger:** The proposed teacher flow sends a learner's key to the backend, stores it where the teacher can access it, or cannot regenerate a card with the teacher's own key.
- **Window:** SPRINT-04 through SPRINT-06, before shared-deck review is released.
- **Mitigation:** Prototype and review the key flow before implementing teacher regeneration; keep learner and teacher credentials separate and out of shared-deck data.
- **Contingency:** Disable teacher regeneration until the teacher can use a separate personal key without access to the learner's key.

## RISK-05

The revised sample must include adult Russian and German learners and flashcard-app newcomers, so recruitment may miss the minimum of three counted participants or omit a required group by the end of SPRINT-08, which would leave `UT-01` without sufficient representative evidence for `QR-11`.

- **Status:** Open
- **Impact:** High
  - Fewer than three counted sessions leave the QR-11 test unverified; a sample missing German learners or flashcard-app newcomers would not answer the Customer's questions about the revised target users.
- **Likelihood:** Medium
  - The Customer expanded recruitment to German learners and learners without Anki experience in [DEC-143](decisions.md#dec-143) and [DEC-144](decisions.md#dec-144). The revised [UT-01 profile](usability-tests/ut-01/README.md#participant-profile) and language-specific task materials now cover those groups; the team set a minimum of one Russian learner, one German learner, and one flashcard-app newcomer. Both setups still need a dry run, and no recruitment outcome is inferred from the document update.
- **Trigger:** By 2026-11-17 fewer than three eligible adults have agreed to session dates, the arranged sample omits Russian learners, German learners, or flashcard-app newcomers, or a session date falls through without a replacement booked.
- **Window:** SPRINT-07 and SPRINT-08, until the last counted session.
- **Mitigation:** Recruit towards five counted adults aged 18 or older, with at least three required, through both Russian-learning and German-learning university contacts. Include newcomers as well as experienced flashcard users; use screening to record familiarity rather than reject applicants without it. Apply the team's sample rule, validate both sets of task materials in the dry run, keep the profile and screening consistent with DEC-143 and DEC-144, and arrange sessions early.
- **Contingency:** Recruit replacements from the missing language or experience group under the next free code; if a representative sample of at least three counted adults still cannot finish in SPRINT-08, move the QR-11 testing-plan row to SPRINT-09 with the reason and declare the shortfall in the weekly report without claiming a completed usability result.
- **Owner:** Byakko-san, following the [Week 7 recruitment action](../reports/week-07/meeting-report.md#action-points).

## RISK-06

A participant may withdraw or refuse the recording or the sanitized public results, so their session cannot be counted, which would reduce the counted sample and force its data to be removed.

- **Status:** Open
- **Impact:** Medium
  - An uncounted session costs the team a participant slot and its data cannot be used or published.
- **Likelihood:** Low
  - The [consent](usability-tests/ut-01/README.md#consent-and-data) requires the recording and the sanitized public results, and participants may withdraw at any time.
- **Trigger:** A participant declines a required consent clause, asks to stop, or asks for their data to be removed.
- **Window:** From the first counted session until the course is graded.
- **Mitigation:** Send the consent template before the session so the participant reads it in advance, and confirm the signed consent before the recording starts.
- **Contingency:** Do not count the session, remove the participant's raw text from the private repository and the recording from the folder, retire the code, and recruit a replacement under the next free code.

## RISK-07

The private usability-data repository exists and instructor access to it and the recordings folder was reported, but neither opening check was independently observed. The recordings folder is in a personal My Drive because Shared drives are unavailable in that account, leaving the team-owned storage requirement unmet and future access dependent on one person's account.

- **Status:** Open
- **Impact:** Medium
  - Instructors could not check the consent records, raw notes, or recordings behind the public results, even though the repository itself exists.
- **Likelihood:** Medium
  - The private repository is linked from [UT-01's consent and data section](usability-tests/ut-01/README.md#consent-and-data), and KaramKhaddour reported instructor access to both locations on 2026-11-15. The access reports were not independently tested here; the personal-My-Drive ownership deviation remains under [#248](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/248).
- **Trigger:** An instructor reports that they cannot open the repository or the recordings folder, the personal account loses access, or either access check remains unconfirmed before the first counted session or at submission.
- **Window:** SPRINT-07 and SPRINT-08, before the first counted session and before each submission.
- **Mitigation:** Confirm that the existing repository is private, the My Drive folder is restricted, and each instructor can open both locations. Record the verification outcome and date; keep the folder link and access instructions in the private repository and Moodle wrapper, not in this register. Look for a team-owned alternative before the Week 8 real participant sessions. If one is available, move the recordings there, update the private links, and recheck access. Otherwise, retain the restricted My Drive folder and the declared ownership deviation.
- **Contingency:** Resolve failed invitations directly with the affected instructor before submission; if GitHub access is unavailable, provide the private text through a Moodle-only archive and declare that deviation, while retaining the recordings in an instructor-accessible private cloud folder.
- **Owner:** saleemasekrea000, following the [Week 7 access action](../reports/week-07/meeting-report.md#action-points).

## RISK-08

The sessions depend on staging card generation, verified instrumentation, and participants' dates in a one-week run sprint, so `UT-01` may not finish by 2026-11-21, which would leave its results and the `QR-11` verdict missing from Submission 8.

- **Status:** Open
- **Impact:** High
  - The run week's submission would carry no usability result, and the `QR-11` row would stay unsettled.
- **Likelihood:** Medium
  - Card generation has failed to reach a model provider from the university VM before, per [the deployment log](deployment.md). The instrumentation implementation is merged, but its behavior is not yet verified on staging.
- **Trigger:** The instrumentation is not verified, or staging generation does not work, by 2026-11-17, or fewer than three sessions are complete by 2026-11-20.
- **Window:** SPRINT-08.
- **Mitigation:** Verify the deployed instrumentation and complete the dry run before counted sessions, check staging generation before each session, and arrange the sessions early in SPRINT-08.
- **Contingency:** Move the `QR-11` testing-plan row to SPRINT-09 with a reason, declare the open window in the weekly report, and claim no result.

## RISK-09

The LLM key, the database passwords, and the telemetry credentials are typed into env files and shells by hand, so one may be committed, pasted into a report, or shown in a screenshot, which would let anyone spend the team's LLM budget or read the deployments' data.

- **Status:** Open
- **Impact:** High
  - A leaked LLM key is spent by strangers until it is revoked, and a leaked database or telemetry credential exposes learners' texts and events.
- **Likelihood:** Low
  - `.env` is ignored by Git and [`.env.example`](../.env.example) carries no values, per [`CFG-10`](configuration-plan.md#cfg-10), but the runbook's commands put passwords into the VM's shell, and every week's evidence includes screenshots of the deployments.
- **Trigger:** a secret value appears in a commit, a pull request, an issue, a report, a screenshot, or an AI tool's shared transcript.
- **Window:** until the course is graded and the deployments are shut down.
- **Mitigation:** keep secrets only in the VM's env files and the Moodle submission, crop or blur every screenshot before committing it, and read the diff of every pull request for values before approving it.
- **Contingency:** revoke or rotate the leaked secret, tell the instructor, clean it from the files and the Git history, and write the account of the incident privately, per [Sensitive-Data Incident Response](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#sensitive-data-incident-response).

## RISK-10

The configuration plan is edited by hand while the workflows, lockfiles, and documents it describes change every week, so it may describe an older repository than the one on `main`, which would send a member or an agent to a check, a file, or a rule that is no longer there.

- **Status:** Open
- **Impact:** Medium
  - A stale plan is believed: an agent that trusts it changes the wrong file or skips a check, and the next review starts from a wrong inventory.
- **Likelihood:** High
  - The 22 November 2026 review found copies of the configuration already stale on `main`: three check-command lists that omit two CI steps, a root `README.md` pointing at a past week's report, and a runbook env template for a dropped route, per the [Week 8 configuration evaluation](../reports/week-08/cm-evaluation.md).
- **Trigger:** a pull request changes a workflow, a lockfile, a compose file, `.env.example`, `AGENTS.md`, or a maintained index without updating [the configuration plan](configuration-plan.md).
- **Window:** until the course ends.
- **Mitigation:** the reviewer checks, on every pull request that touches one of those files, that the plan still describes it, as [`AGENTS.md`](../AGENTS.md) asks.
- **Contingency:** update the plan in the pull request that records the change, and treat a plan that describes an older repository as a defect with its own task issue.

## RISK-11

The backend, the frontend, the actions, and the container images update through Dependabot pull requests that the team reviews alongside sprint work, so one update may break the build or need a code change the team has no time for, which would leave that dependency pinned at an old version while the others move.

- **Status:** Open
- **Impact:** Medium
  - A dependency left behind collects security fixes it does not get, and the longer it waits the larger the eventual update.
- **Likelihood:** Medium
  - Four ecosystems update weekly, per [`CFG-14`](configuration-plan.md#cfg-14), and a Node.js 26 image update for the compose file is pending while CI runs Node.js 22.
- **Trigger:** a Dependabot pull request fails the product checks, or stays unmerged for more than one sprint.
- **Window:** until the course ends.
- **Mitigation:** review the Dependabot pull requests at the weekly review, merge the green ones in the same week, and keep CI's Node.js and Python versions in step with the images.
- **Contingency:** pin the working version, record why in the pull request that closes the update, and open the task issue that removes the need for the pin.

## RISK-12

Staging and production run on a VM the team reaches only from campus and configures by hand, so the VM's env files and containers may drift from the runbook and from each other, which would make a deploy or a rollback behave differently from what was tested on staging.

- **Status:** Open
- **Impact:** High
  - A production that differs from staging fails in front of the Customer, and a member who follows the runbook cannot tell why.
- **Likelihood:** Medium
  - The runbook's env-file template still configures the dropped direct Claude route, per [`CFG-11`](configuration-plan.md#cfg-11), while production runs another provider per [`DEC-160`](decisions.md#dec-160); the 2026-10-31 failed deploy was diagnosed on the VM by hand, per [the deployment log](deployment.md#failed-deploys).
- **Trigger:** a deploy or a verification on production behaves differently from the same commit on staging, or a member changes an env file or a container on the VM outside the runbook.
- **Window:** until the course is graded and the deployments are shut down.
- **Mitigation:** deploy only the commit staging passed, keep the runbook current in the pull request that changes the deployment, and record every manual VM change in the runbook's failed-deploy log.
- **Contingency:** deploy the commit staging passed, keep the runbook current, and redeploy from the repository rather than patching the VM by hand.
