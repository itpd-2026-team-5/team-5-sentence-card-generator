# AI usage — Week 05

One section per team member. Each section names the tools the member's commits and pull requests record, what they were used for, and what was accepted, changed, or rejected.

## KaramKhaddour

### Tools and purpose

Codex inspected the existing tests and workflows, investigated the stalled backend test run, wrote frontend client regression tests, added their CI command, and drafted testing documentation.
Codex also drafted `docs/features.md` from the existing functional requirements, story references, architectural decisions, and glossary, and linked it from the documentation navigation and weekly report.

Codex reproduced and fixed a Texts-page crash caused by missing language labels in older API responses, added translated fallback labels to the library and reader, and added regression coverage.

Codex co-authored the teacher-review rework, the interface languages, the per-text languages, and the vocabulary isolation in [#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165), as the commits' `Co-authored-by: Codex` trailers record.

### Checking the output

The new frontend tests were executed against the working tree.
The backend suite was executed with a temporary environment workaround, and lint, formatting, and build results are distinguished from checks that remain blocked or unverified in [testing.md](testing.md).
No live provider calls or real API keys were used by the tests.
The feature descriptions and story links were checked against the repository's functional requirements, and local file links and glossary anchors were checked against their targets.

The language-label fix passed all 24 frontend client tests and the TypeScript/production build; a temporary DOM check reproduced the original crash and then verified that the library and reader render legacy responses without crashing.

[#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165) passed 69 backend tests, 23 frontend regression tests, and the type check and build, and merged with approvals from Byakko-san and Horokk1.

## saleemasekrea000

### Tools and purpose

Claude Code, with the Claude Opus 5.5 model, read Assignment 5 and the course guides and requirements it links, and drafted and checked the work for Parts 2 to 5 and Part 7:

- The `actionlint` workflow, the backend type check with mypy and the fixes for its 44 findings, Prettier for the frontend, and the split type-check and build steps in `Product checks`.
- The deployment files: `compose.deploy.yml`, the frontend's `Dockerfile` and `nginx.conf`, and the deployment runbook `docs/deployment.md`.
- The `QRT-01` sections of QR-01, QR-02, QR-03, QR-06, and QR-07, the QR-07 restart check `scripts/check-restart.sh`, and the quality requirement testing plan.
- The deployment record and the QR-07 evidence in this week's report, and the Week 4 follow-up tables in the meeting report.
- Step-by-step guidance while deploying to the university VM from campus.

### Accepted, changed, or rejected

- Accepted after checking: the CI changes, after the backend tests, mypy, the frontend checks, and `actionlint` passed locally and in CI; the deployment, after staging and production ran side by side locally and then on the VM; and the restart check, after it passed against a local staging copy, reported `FAIL` when a change was made to commit, and passed on the VM's staging.
- Changed: commit messages shortened to one line without an AI co-author trailer; a broken link to a file not yet on `main` replaced in the runbook; a bug in the restart script's database helper fixed after a review of its code; the VM's real address, ID, and passwords kept out of every committed file; and a screenshot showing the address bar replaced with a cropped one.
- Rejected: using the seeded demo cards as proof that production generates cards; the report records card generation on production as not verified, because no LLM provider is reachable from the university network.

## Byakko-san

### Tools and purpose

GitHub Copilot co-authored the SPRINT-05 plan and its milestones ([#151](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/151)) and the installation of the course materials as a skill ([#153](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/153)), as the commits' `Co-authored-by: Copilot` trailers record.

### Accepted, changed, or rejected

Accepted after review: the plan was aligned with Assignment 5 in a second commit before the merge, and both pull requests merged with approvals from Horokk1 and KaramKhaddour.

## Horokk1

> Draft from Horokk1's Week 4 disclosure, because this sprint's commits name no tool; Horokk1 confirms or corrects it and removes this line before the merge.

### Tools and purpose

GPT Whisper transcribed the Week 5 Customer meeting, and ChatGPT / Codex helped prepare the [meeting transcript](meeting-transcript.md), the [meeting script](meeting-script.md), and the [meeting report](meeting-report.md) ([#177](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/177)).

### Accepted, changed, or rejected

Changed: the transcript was sanitized and its speaker labels replaced with GitHub usernames or `Customer`, and the report's decisions were checked against the transcript; [#177](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/177) merged with an approval from saleemasekrea000.
