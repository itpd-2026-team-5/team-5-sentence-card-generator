# Week 05 report

## Project

Sentence Cards Generator, Team 5.

## Summary

The testing work adds frontend client regression tests to the existing backend suite and prepares their integration into product CI in a separate workflow change.
The local checks, results, and environment limitations are recorded in [testing.md](testing.md).
The product is deployed to staging and production on the university VM, as described in [the deployment runbook](../../docs/deployment.md) and [the deployment below](#deployment); it is reached from the university network, at the address given in the Moodle submission.
Every active High business-importance quality requirement now has a test; their results, including the ones not yet verified, are in the [quality requirement testing plan](../../docs/project-plan.md#quality-requirement-testing-plan).
The product CI names a step for each applicable check; the backend build is recorded as not applicable, because the backend runs from source with no compile or bundle step.
After the [Sprint Review](meeting-report.md), the release commit `b904ab3` was redeployed and retested, and REL-05 was released as [v0.3.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.3.0); its record is in the [plan](../../docs/project-plan.md#rel-05).
The plan carries two milestones: [MLS-05](../../docs/project-plan.md#mls-05), due with this sprint, delivers the core text-to-card-and-study flow on staging and production on the university VM, and [MLS-07](../../docs/project-plan.md#mls-07), due in SPRINT-07, delivers studying on a phone and teacher review of an explicitly shared deck.
SPRINT-05's Actual Velocity is 0 of the planned 21, because the Sprint Review took no story verdicts: US-10, US-08, and US-14 moved to SPRINT-06, and the rework the review asked for is planned there.

## Customer Meeting Outcome

The Customer accepted the demonstrated deployed version as sufficient for the Week 5 submission, despite the blocked live generation, per [DEC-102](../../docs/decisions.md#dec-102).
No story was accepted or rejected against its `AC-nn` at the meeting, as the [meeting report](meeting-report.md#decisions) records: [US-10](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/36), [US-08](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/41), shown for its playback buttons, and [US-14](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/141) stay open and moved to SPRINT-06, where the [meeting's action points](meeting-report.md#action-points) take a verdict per criterion.

The two implemented quality requirement tests passed at their levels:

- [QR-02 QRT-01](../../docs/quality-requirements/qr/QR-02.md#qrt-01), `CI`: `Passes` in the [`Product checks` run on `b904ab3`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/41224928507).
- [QR-07 QRT-01](../../docs/quality-requirements/qr/QR-07.md#qrt-01), `deployed`: `Passes` on staging, on [the first deployment](#qr-07-qrt-01-on-staging) and on [the release commit](#qr-07-qrt-01-on-the-release-commit).

## Coverage

| Deliverable | Artifact |
| --- | --- |
| Sprint plan and milestones | [docs/project-plan.md#sprint-05](../../docs/project-plan.md#sprint-05) and [#milestones](../../docs/project-plan.md#milestones) |
| New stories | [the `User Story` issues](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues?q=is%3Aissue%20type%3A%22User%20Story%22), with [US-14](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/141) scheduled in SPRINT-05 and [US-15](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/142) refined for SPRINT-06 |
| Quality requirement tests | [docs/quality-requirements/qr/](../../docs/quality-requirements/README.md), with a `QRT-01` in QR-01, QR-02, QR-03, QR-06, and QR-07 |
| Testing plan | [docs/project-plan.md#quality-requirement-testing-plan](../../docs/project-plan.md#quality-requirement-testing-plan) |
| Automated tests and CI | [`.github/workflows/`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/tree/main/.github/workflows), with `actionlint` and the product-code checks; the local results are in [testing.md](testing.md) |
| Deployment | [docs/deployment.md](../../docs/deployment.md), and [the staging and production deployment with its core-task verification](#deployment) |
| Feature documentation | [docs/features.md](../../docs/features.md) |
| Week 4 action points | [`## Previous action points`](meeting-report.md#previous-action-points) |
| Week 4 open questions | [`## Previous open questions`](meeting-report.md#previous-open-questions) |
| Meeting script | [reports/week-05/meeting-script.md](meeting-script.md) |
| Meeting transcript | [reports/week-05/meeting-transcript.md](meeting-transcript.md) |
| Customer validation | [reports/week-05/meeting-report.md](meeting-report.md), and [each story's verdict](#customer-meeting-outcome) |
| `REL-05` | the tag and its [release body](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.3.0), the changelog's [0.3.0 section](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/CHANGELOG.md#030---2026-10-31), and the [plan's REL-05 block](../../docs/project-plan.md#rel-05) |
| Sprint retrospective | [reports/week-05/sprint-retrospective.md](sprint-retrospective.md) |
| AI usage | [reports/week-05/ai-usage.md](ai-usage.md) |

## Contribution

| Member | Work |
| --- | --- |
| Byakko-san | Planned SPRINT-05 and its milestones ([#151](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/151)), installed the course materials as a skill ([#153](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/153)), and reviewed [#159](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/159), [#161](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/161), [#163](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/163), [#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165), [#167](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/167), [#169](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/169), [#171](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/171), and [#175](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/175). |
| Horokk1 | Wrote the Sprint Review's script, transcript, and report ([#177](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/177)), and reviewed [#151](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/151), [#153](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/153), [#159](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/159), [#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165), [#171](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/171), and [#180](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/180). |
| KaramKhaddour | Added the frontend regression tests and ran them in CI ([#159](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/159), [#161](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/161)), documented the features ([#163](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/163)), reworked teacher review and multilingual generation ([#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165)), fixed texts without a language ([#175](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/175)), and reviewed [#151](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/151), [#153](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/153), [#155](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/155), and [#157](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/157). |
| saleemasekrea000 | Added `actionlint` and completed the product checks ([#155](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/155)), deployed to the university VM and wrote the runbook ([#157](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/157), [#167](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/167)), wrote the quality requirement tests and the testing plan ([#169](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/169), [#171](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/171)), cut REL-05 and closed the sprint ([#180](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/180)), and reviewed [#177](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/177). |

## Repository Evidence

- A merged pull request that closed its task issue: [#180](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/180), which closed [#179](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/179).
- The latest runs on `main`: [link check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/workflows/lychee.yml?query=branch%3Amain), [Markdown check](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/workflows/markdown.yml?query=branch%3Amain), [`actionlint`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/workflows/actionlint.yml?query=branch%3Amain), and [product-code checks](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/workflows/product.yml?query=branch%3Amain).

## Deployment

On 2026-10-31, `saleemasekrea000` deployed commit [`248b766`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/commit/248b766bb91a9e5dd4f4f73118c0506e0b84fd89) by hand from a campus machine, following [the deployment runbook](../../docs/deployment.md): first to staging, then the same checkout to production, on the university VM at `<university-vm-ipv4>`.

- Staging, port 8081: `curl http://localhost:8081/api/health` on the VM returned `{"status":"ok"}`, after the backend had run every database migration.
- Production, port 8080: `curl http://localhost:8080/api/health` returned `{"status":"ok"}`.
- Production was loaded with the demo data (`python -m app.seed`), and from a campus browser the demo learner signed in and opened the "Travel by train" deck and its cards:

![The demo learner's deck on production](production-deck.png)

What the production check verified of the [core task](../../docs/setup.md#complete-the-core-task): signing in, adding a text, marking words to learn, and reading a deck's cards.
What it did not verify: generating new cards, because the LLM providers cannot be reached from the university network; see [Deviations](#deviations) and the [failed deploy record](../../docs/deployment.md#2026-10-31-card-generation-cannot-reach-an-llm-from-the-vm).

### QR-07 QRT-01 on staging

The `deployed` check of [QR-07 QRT-01](../../docs/quality-requirements/qr/QR-07.md#qrt-01), run on 2026-10-31 by `saleemasekrea000` on the university VM.

- **Environment:** the staging deployment (`cards-staging`) with the demo data, reached at `$STAGING_URL`.
- **Commit:** [`130b5a3`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/commit/130b5a3fcf32b38f025d7f0f3aeb8c9d4de78b03), deployed to staging before the run.
- **Command:** `scripts/check-restart.sh`, from `~/cards/app` on the VM.
- **Measured value:** 11 tables and 72 rows unchanged after each of three stop-and-start cycles and after the interrupted write; the next scheduled review unchanged; every index passes `amcheck`.

```text
commit: 130b5a3fcf32b38f025d7f0f3aeb8c9d4de78b03
target: cards-staging at $STAGING_URL
cycle 1: stop and start of backend and db (11 tables, 72 rows)
  records: same
  next scheduled review (card 1): same
cycle 2: stop and start of backend and db (11 tables, 72 rows)
  records: same
  next scheduled review (card 1): same
cycle 3: stop and start of backend and db (11 tables, 72 rows)
  records: same
  next scheduled review (card 1): same
interrupted write: database killed during an uncommitted update of every deck
  records: same
integrity: every btree index passes amcheck
PASS
```

### QR-07 QRT-01 on the release commit

After the Sprint Review, on 2026-10-31, `saleemasekrea000` redeployed `main` at [`b904ab3`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/commit/b904ab3b668c52754f1050406c3d65dcdc17dce5), which adds the fix for texts without a language, to staging and then production, and reran the `deployed` check of [QR-07 QRT-01](../../docs/quality-requirements/qr/QR-07.md#qrt-01) on staging.

- **Environment:** the staging deployment (`cards-staging`) with the demo data, reached at `$STAGING_URL`; `curl http://localhost:8081/api/health` returned `{"status":"ok"}` before the run.
- **Commit:** `b904ab3`, the commit tagged `v0.3.0`.
- **Command:** `scripts/check-restart.sh`, from `~/cards/app` on the VM.
- **Measured value:** 11 tables and 72 rows unchanged after each of three stop-and-start cycles and after the interrupted write; the next scheduled review unchanged; every index passes `amcheck`.

```text
commit: b904ab3b668c52754f1050406c3d65dcdc17dce5
target: cards-staging at $STAGING_URL
cycle 1: stop and start of backend and db (11 tables, 72 rows)
  records: same
  next scheduled review (card 1): same
cycle 2: stop and start of backend and db (11 tables, 72 rows)
  records: same
  next scheduled review (card 1): same
cycle 3: stop and start of backend and db (11 tables, 72 rows)
  records: same
  next scheduled review (card 1): same
interrupted write: database killed during an uncommitted update of every deck
  records: same
integrity: every btree index passes amcheck
PASS
```

The same commit then went to production, after a backup of its database, and was checked from a campus browser: the demo learner signed in, opened a text, marked a word, and opened a deck.
Generating cards remains unverified there, as recorded in the deviations.

## Deviations

Backend tests required a temporary event-loop workaround in this execution environment, and local frontend lint could not run because its native dependency was missing.
See [the test results and limitations](testing.md#results); a green hosted run is still required.

On production, the last step of the core task, generating cards for the marked words, could not be verified.
The VM cannot reach the Claude API (the connection times out) and OpenRouter refuses it (`403`), and a learner's own key in the browser fails the same way from the campus network.
The deployment is otherwise working; generation needs an LLM gateway reachable from the university network, as the [runbook](../../docs/deployment.md#2026-10-31-card-generation-cannot-reach-an-llm-from-the-vm) describes.

[QR-03 QRT-01](../../docs/quality-requirements/qr/QR-03.md#qrt-01) is a `manual` test: whether a generated card can be kept is the reviewer's and the learner's judgement, which no command can assert.
Its run also needs the service's LLM, which the university VM cannot reach, as recorded above.

The rework the Sprint Review asked for, from [DEC-084](../../docs/decisions.md#dec-084) onward, is deferred to SPRINT-06 in the [meeting's action points](meeting-report.md#action-points), so REL-05 is the reviewed and tested commit `b904ab3` without it.

## Privacy

No private-only material was committed to the repository.
