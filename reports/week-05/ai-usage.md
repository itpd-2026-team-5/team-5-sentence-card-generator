# AI usage — Week 05

One section per team member. Each section names the tools the member's commits and pull requests record, what they were used for, and what was accepted, changed, or rejected.

## KaramKhaddour

I used Codex for all Git operations associated with my Week 5 work, as well as for implementation, testing, documentation, and issue and pull request preparation.
The table below follows the detailed output-handling format used in [my Week 4 disclosure](../week-04/ai-usage.md#ai-usage--week-04).

### Tools, purpose, and what I did with the output

| Tool | Used for | What I did with the output (accepted, changed, or rejected) |
| --- | --- | --- |
| Claude (Claude Code) | Adding reproducible demo data: a learner and two teachers with texts, decks, and handwritten cards, through the seed command ([#139](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/139)) | Accepted for demonstrations and preparation: the data lets someone try the product without an LLM key or email setup. I kept this separate from evidence of real-provider generation; seeded sentences do not prove that a deployed model generates usable cards. |
| Codex | Inspecting the existing backend tests, adding the frontend client regression suite and its npm command, updating setup instructions, and writing [testing evidence](testing.md) ([#159](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/159)) | Changed, then accepted after checks: the original frontend draft depended on the uncommitted interface-language feature, so it was separated into a standalone 23-test suite against the available main branch. The tests cover API requests, authentication and verification errors, provider failures, preferences, and keeping the learner's key out of application API requests. The backend stall was reproduced with a minimal FastAPI app; the temporary event-loop workaround stayed outside the repository, and its limitations were disclosed instead of claiming an ordinary local test run passed. |
| Codex | Integrating the frontend suite into Product checks and adding job timeouts ([#161](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/161)) | Changed: I followed the repository's requirement to submit workflow changes in a separate task and PR after the test suite merged. Codex retained the existing lint, formatting, type, build, and backend test checks, added npm test, and bounded both jobs with ten-minute timeouts. Local YAML checks were kept distinct from hosted CI verification. |
| Codex | Writing [feature documentation](../../docs/features.md), connecting it to the existing stories, functional requirements, ADRs, and glossary, and adding navigation and report links ([#163](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/163)) | Accepted after checking: eight capabilities were documented in user language, covering all 11 functional requirements. The story mappings were checked against those requirements, and 96 local file links and heading anchors were checked. Detailed behavior and acceptance criteria were left in their existing records instead of being copied into the feature page. |
| Codex | Reworking the teacher's card overview and editor: explicit saving and discarding, unsaved-edit warnings, and access to review, rewrite, confirmation, reopening, archiving, and deletion ([#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165)) | Changed through the interface revisions: I asked for a clearer teacher workflow and explicit control over when edits are saved. The changes were checked with frontend interaction checks and the backend suite, with a follow-up fix for the language types in API responses. The merged work, rather than a screenshot or generated explanation alone, is the implementation evidence. |
| Codex | Adding English, German, and Russian interface translations, a compact language menu, and a remembered interface-language preference independent of learning languages ([#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165)) | Changed: the interface language was separated from the learner's language pair and levels, following the Customer's feedback. I requested the interface revisions rather than treating the first generated layout as final. The preference stays in the browser and does not overwrite the learning profile. |
| Codex | Adding each text's learning language, matching destination decks, language-specific vocabulary for generation and rewriting, and a migration for existing texts ([#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165)) | Accepted with regression checks: known and ignored words are filtered by the destination deck's learning language, so one language does not consume another's vocabulary limit. Tests cover the generation paths, text-language defaults and corrections, incompatible decks, and migration behavior. Existing text data is migrated rather than discarded. |
| Codex | Improving the card panel on narrow screens, placing pronunciation controls beside the text they read, and making dropdowns and model selection more consistent ([#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165)) | Changed through the requested UI revisions: the teacher panel wraps long fields and badges, audio controls are associated with the corresponding word or sentence, and model selection supports searching and a typed model name. The resulting UI was checked with the type check, build, and interaction checks; these checks do not independently establish real-learner mobile acceptance or pronunciation quality. |
| Codex | Diagnosing and fixing the Texts-page crash caused by a missing language label ([#175](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/175)) | Changed, then accepted after reproduction: I supplied the failing URL and browser stack trace. Codex reproduced the same error with a legacy response, added translated “Language not set” labels to the list and reader, and added regression coverage. Missing or unsupported languages are shown explicitly rather than silently guessed. All 24 frontend tests and the production build passed; a temporary DOM check verified both affected pages. |
| Codex | Preparing my own Customer-interview questions, demo order, acceptance prompts, and explanations of existing behavior | Changed: I used the draft to prepare what to show and ask, including the contextual Bank examples and explicit story verdicts. We clarified that duplicate handling uses the word and source sentence, not an automatic comparison of meanings. This was my preparation draft, not evidence that the Customer had accepted anything; the final meeting script, transcript, and report are recorded under Horokk1's contribution below. |
| Codex | All Git operations for my Week 5 work: inspecting history and diffs, creating isolated worktrees and branches, staging and committing, amending messages, renaming branches for issue numbers, rebasing onto main, preserving pending work in stashes, preparing push commands, and checking merge commits | Changed under my direction: I supplied the GitHub issue numbers and used Codex to prepare the corresponding branches and commits. I asked for commit messages without a Codex co-author trailer and for unrelated changes to remain separate. Codex kept workflow changes in their own branch and preserved pending app edits and interview drafts in named stashes. I used its push and PR instructions in the GitHub workflow; the absence of a co-author trailer does not mean AI was not used. |
| Codex | Drafting task titles, descriptions, acceptance criteria, requirement and story references, and PR descriptions for issues [#158](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/158), [#160](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/160), [#162](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/162), and [#174](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/issues/174), and checking what Assignment 5 still required | Changed: I created the issues from the prepared text and returned their actual numbers for branch naming, then used PR descriptions matching the repository's template. Checks that had not been run were left unconfirmed. When the newer assignment was found in local Git history, the earlier syllabus-only completion assessment was corrected to include quality-requirement tests, the testing plan, and the remaining deliverables. |

### Checking the output and limits

The initial test-only branch passed 60 backend tests with the documented temporary environment workaround, and 23 frontend tests; [testing.md](testing.md) records that particular branch's results and local dependency limitations.
The later teacher and multilingual changes in [#165](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/165) passed 69 backend tests, 23 frontend regression tests, and the type check and build; that PR merged with approvals from Byakko-san and Horokk1, as already recorded on this AI-usage branch.
The crash fix in [#175](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/175) increased the frontend suite to 24 passing tests.
These counts describe the checks recorded at those stages, not a new claim that every final release check was rerun while editing this disclosure.

No real API keys or provider calls were needed by the automated client tests.
A local render or passing unit test was not treated as proof of production deployment, live model quality, Customer acceptance, or a completed release.
The deployment, formal quality-requirement tests and testing plan, release work, and final meeting artifacts are attributed to the teammates whose sections describe them.

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

### Tools and purpose

GPT Whisper transcribed the Week 5 Customer meeting, and ChatGPT / Codex helped prepare the [meeting transcript](meeting-transcript.md), the [meeting script](meeting-script.md), and the [meeting report](meeting-report.md) ([#177](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/177)).

### Accepted, changed, or rejected

Changed: the transcript was sanitized and its speaker labels replaced with GitHub usernames or `Customer`, and the report's decisions were checked against the transcript; [#177](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/pull/177) merged with an approval from saleemasekrea000.
