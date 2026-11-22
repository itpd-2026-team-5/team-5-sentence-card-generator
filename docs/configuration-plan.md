# Configuration plan

**Reviewed:** 2026-11-22

The configuration the Sentence Cards Generator is built, checked, delivered, and understood by.
Each item is one `CFG-nn`, grouped by what it is for, and each connection names what breaks when the edge does.
The plan documents the configuration as it is; what the team would change is in the [Week 8 configuration evaluation](../reports/week-08/cm-evaluation.md).
Private settings are named in words: no address, credential, or secret value appears here.

## Source Control And Release

### CFG-01

The `main` branch protection and the pull request flow it enforces.

- **Status:** Active
- **Type:** setting
- **Purpose:** every change reaches `main` through a pull request that another member approved, so a broken check or an unrelated edit is seen before it lands and the history keeps the reason for each change.
  Without it, one member can push to `main` a change nobody read, and the release the Customer sees contains it.
- **Owner:** `KaramKhaddour`
- **Where:** the repository's branch protection settings for `main`, and the process in [`CONTRIBUTING.md`](../CONTRIBUTING.md#how-a-change-gets-in).
- **Connections:**
  - `enforces` [`CFG-06`](#cfg-06), the link check, which is the only required status check: a renamed `lychee` job leaves `main` waiting for a check that never reports, and nothing merges until someone edits the setting.
  - `reads` [`CFG-03`](#cfg-03), the pull request template and the task form: a pull request opened without `Closes #<issue>` merges without closing its task.
  - `cites` [`CFG-19`](#cfg-19), whose review checklist says what the approving member checks: a change to the review rule is a change in both places.
- **What good looks like:** a pull request is required before merging, it needs one approval from another member, and the author cannot approve their own, per [Branch Protection](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#branch-protection).

### CFG-02

`CHANGELOG.md`, the release tags, and the release process that fills them.

- **Status:** Active
- **Type:** process
- **Purpose:** whoever deploys a release, and the Customer reading it, learns what changed and what to do about it.
  Without it, a tag is a commit with no reason, and the deploy in the runbook has no version to roll back to.
- **Owner:** `KaramKhaddour`
- **Where:** `CHANGELOG.md`, the `vX.Y.Z` tags and the GitHub releases, and each `#### REL-nn` block in `docs/project-plan.md`.
- **Connections:**
  - `produces` the release tags that [`CFG-09`](#cfg-09) checks out to deploy and to roll back: a release that is planned but never tagged, as `REL-04` was, leaves the runbook's `<previous-tag>` pointing at an older release than the one that ran.
  - `reads` [`CFG-22`](#cfg-22), the plan's `REL-nn` block: a released section dated differently from the block makes two release dates for one release.
  - `cites` every pull request's `[Unreleased]` entry, which [`CFG-01`](#cfg-01) asks the author to add: a user-visible change merged without its entry is missing from the next released section.
- **What good looks like:** each release has a dated section linked to its release, an empty `[Unreleased]` is reopened in the same pull request, and the tag is on the release commit, per [The Changelog](https://github.com/inno-itpd/itpd/blob/main/requirements/releases-requirements.md#the-changelog) and [Versioning And Tags](https://github.com/inno-itpd/itpd/blob/main/requirements/releases-requirements.md#versioning-and-tags).

### CFG-03

The issue forms, the pull request template, the sprint milestones, and the GitHub Project table view.

- **Status:** Active
- **Type:** process
- **Purpose:** each story and task is an issue with its criteria, its sprint, and its `Responsible` and `Accountable` members, and each pull request says what it closes and how it was checked.
  Without them, the sprint backlog is whatever a member remembers, and a reviewer cannot tick a criterion that was never written.
- **Owner:** `Byakko-san`
- **Where:** `.github/ISSUE_TEMPLATE/` (the `task.yml` and `user-story.yml` forms), `.github/pull_request_template.md`, the repository's milestones `SPRINT-03` to `SPRINT-09`, and the organization's GitHub Project, whose table view is described in [`CONTRIBUTING.md`](../CONTRIBUTING.md#where-the-work-is).
- **Connections:**
  - `produces` the sprint backlogs that [`CFG-22`](#cfg-22) links as each sprint's `**Sprint Backlog:**`: a milestone renamed without the plan's link leaves the plan pointing at an empty sprint.
  - `reads` the `Responsible` and `Accountable` project fields: an issue scheduled without them is a task nobody owns at the weekly review.
- **What good looks like:** every task issue carries its requirements, its criteria, its `Responsible`, `Accountable`, and two assignees, and every pull request closes one task, per [Task Issue Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/task-issues-requirements.md) and [Pull Request Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/pull-requests-requirements.md).

## Checks

### CFG-04

The product's continuous integration, the "Product checks" workflow.

- **Status:** Active
- **Type:** CI pipeline
- **Purpose:** the backend's lint, format, type check, and tests and the frontend's lint, format, type check, build, and tests run on every pull request and on `main`, so a change that breaks the product is red before it is merged.
  Without it, a broken build is found on the VM during a deploy.
- **Owner:** `KaramKhaddour`
- **Where:** `.github/workflows/product.yml`.
- **Connections:**
  - `reads` [`CFG-15`](#cfg-15) and [`CFG-16`](#cfg-16), the lockfiles, through `uv sync --locked` and `npm ci`: a manifest changed without its lockfile fails the install step rather than the tests.
  - `cites` the check commands copied into [`CFG-18`](#cfg-18), [`CFG-19`](#cfg-19), and the setup page: a step added here and not there makes a local green run that CI turns red, as the backend type check and the frontend format check already are.
  - `cites` [`CFG-01`](#cfg-01), whose required checks do not include it: a red run does not by itself block a merge, so a reviewer who misses it merges a broken build.
- **What good looks like:** it runs on pull requests and on `main`, the latest `main` run is green before a submission, and every third-party action is pinned to a commit, per [Continuous Integration](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#continuous-integration).

### CFG-05

The Markdown check, the "Markdown check" workflow and its rules.

- **Status:** Active
- **Type:** workflow
- **Purpose:** malformed Markdown fails before it is merged, so a broken table or list does not reach a weekly report or the documentation site.
  Without it, a reader finds the broken table in the submission.
- **Owner:** `saleemasekrea000`
- **Where:** `.github/workflows/markdown.yml` and `.markdownlint-cli2.jsonc`.
- **Connections:**
  - `reads` `.markdownlint-cli2.jsonc`, whose disabled rules and ignored paths each carry their reason: a rule turned off without its reason is turned off for every file nobody meant it for.
  - `reads` [`CFG-20`](#cfg-20) only to skip it: the course skill is ignored because the course repository checks it.
- **What good looks like:** it runs on pull requests and on `main`, and the latest `main` run is green before a submission, per [Continuous Integration](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#continuous-integration).

### CFG-06

The link check, the "Link check" workflow and its configuration.

- **Status:** Active
- **Type:** workflow
- **Purpose:** every link in the Markdown, internal and external, is checked before a reader follows it, so a moved file or a renamed anchor in a report is found by the team rather than by the instructor.
  Without it, a submission's coverage table points at files that moved.
- **Owner:** `Byakko-san`
- **Where:** `.github/workflows/lychee.yml`, `lychee.toml`, and `.lycheeignore`.
- **Connections:**
  - `reads` `.lycheeignore`, whose two exclusions, the Figma research board and the private usability-data repository, each carry a reason and a verification date: an exclusion without one hides the broken link it was added for.
  - `reads` `lychee.toml`, which excludes [`CFG-20`](#cfg-20).
  - `cites` [`CFG-01`](#cfg-01), whose one required status check it is: an external site that fails once turns `main` red, as the 21 November 2026 run on `main` did, while every link checked green on 22 November.
- **What good looks like:** it runs on pull requests and on `main`, every exclusion states why in the file, and the latest `main` run is green before a submission, per [Link Checking](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#link-checking).

### CFG-07

The workflow lint, the "Workflow lint" workflow running `actionlint`.

- **Status:** Active
- **Type:** workflow
- **Purpose:** a workflow with a syntax or expression error is caught on its own pull request, before it silently stops a check from running.
  Without it, a broken `on:` block makes a check that never runs look like a check that never fails.
- **Owner:** `KaramKhaddour`
- **Where:** `.github/workflows/actionlint.yml`.
- **Connections:**
  - `enforces` the syntax of every workflow in [`CFG-04`](#cfg-04), [`CFG-05`](#cfg-05), [`CFG-06`](#cfg-06), and [`CFG-08`](#cfg-08): it is not a required check, so a red run is advisory unless the reviewer reads it.
  - `reads` the `actionlint` version pinned in the workflow, `1.7.9`: a version moved without a review changes which errors are reported.
- **What good looks like:** it runs on pull requests and on `main`, its action is pinned to a commit, and the latest `main` run is green before a submission, per [Pinning Third-Party Actions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#pinning-third-party-actions) and [Continuous Integration](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#continuous-integration).

### CFG-08

The documentation site, the "Docs site" workflow, `book.toml`, and `docs/SUMMARY.md`.

- **Status:** Active
- **Type:** CI pipeline
- **Purpose:** `docs/` is built with mdBook on every pull request and published on GitHub Pages from `main`, so the Customer and the instructor read the maintained documentation without cloning the repository.
  Without it, the documentation exists only as files in the repository.
- **Owner:** `Horokk1`
- **Where:** `.github/workflows/docs.yml`, `book.toml`, and `docs/SUMMARY.md`.
- **Connections:**
  - `reads` `docs/SUMMARY.md`: a new page that is not listed there is not on the site, and a listed page that does not exist fails the build.
  - `reads` the mdBook release pinned by version and checksum in the workflow: a version moved without its checksum fails the install step.
  - `produces` the published site that [`CFG-21`](#cfg-21) and the root `README.md` link.
- **What good looks like:** the site builds on every pull request, publishes from `main`, and lists every maintained page, per [Documentation Site](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#documentation-site).

## Environments And Secrets

### CFG-09

The deployment runbook, `docs/deployment.md`.

- **Status:** Active
- **Type:** document
- **Purpose:** a member on campus can reach the university VM and deploy, verify, and roll back staging and production without the member who deployed last.
  Without it, the deployment exists in one person's shell history, and the Customer's production is unrecoverable when that person is away.
- **Owner:** `saleemasekrea000`
- **Where:** `docs/deployment.md`.
- **Connections:**
  - `reads` [`CFG-10`](#cfg-10), the configuration shape: the runbook's env-file template repeats some of its variables, so a variable added to `.env.example` and not to the template is missing on the VM until a deploy fails.
  - `reads` [`CFG-02`](#cfg-02), the release tags it deploys and rolls back to.
  - `reads` [`CFG-17`](#cfg-17), `compose.deploy.yml`, which it runs as the `cards-staging` and `cards-prod` projects: a service added to the compose file without its port or volume in the runbook is a service nobody verifies.
  - `produces` the staging and production deployments on the university VM, and their env files, which live only on the VM.
- **What good looks like:** the four environments, the manual deploy from the university network, the verification, the rollback, and the failed-deploy log are stated, and the real addresses and values are in the Moodle submission and nowhere else, per [Environments And Deployment](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#environments-and-deployment).

### CFG-10

The configuration shape, `.env.example`, with `.env` ignored.

- **Status:** Active
- **Type:** setting
- **Purpose:** a new member and the deployment learn which variables the product needs, which of them are secret, and which are optional.
  Without it, a variable is discovered by a crash on staging, or a secret is guessed into a committed file.
- **Owner:** `KaramKhaddour`
- **Where:** `.env.example` in the repository root; `.env` is listed in `.gitignore`; the staging and production env files are on the VM and named in words in [`CFG-09`](#cfg-09).
- **Connections:**
  - `produces` the local `.env` that `docker-compose.yml` in [`CFG-17`](#cfg-17) reads, and the shape the VM's env files follow.
  - `cites` the incident response in [Sensitive-Data Incident Response](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#sensitive-data-incident-response): a real value committed here makes the file a credential to revoke.
- **What good looks like:** the example lists every variable with an empty or placeholder value, the secrets are marked, and no real value is committed, per [Configuration And Sensitive Information](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#configuration-and-sensitive-information).

### CFG-11

The direct Claude API connection as the deployed server's generation route.

- **Status:** Dropped
- **Type:** setting
- **Purpose:** the server wrote card sentences through the Claude API with the key in each deployment's env file.
- **Owner:** `KaramKhaddour`
- **Where:** the `ANTHROPIC_API_KEY` line of each env file on the VM, as the runbook's env-file template still shows it.
- **Connections:**
  - `produces` the key line of [`CFG-09`](#cfg-09)'s env-file template, which was not updated when the route was dropped.
- **What good looks like:** the generation route works from the university network, per [Environments And Deployment](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#environments-and-deployment).
- **Dropped:** 2026-11-15, per [`DEC-160`](decisions.md#dec-160): the Claude API was unreachable from the university network since the [2026-10-31 failed deploy](deployment.md#2026-10-31-card-generation-cannot-reach-an-llm-from-the-vm), and the team uses the DeepSeek API for the production generation path.

### CFG-12

The telemetry configuration: the staging and production analytics and observability backends and the script that provisions their dashboards.

- **Status:** Active
- **Type:** setting
- **Purpose:** the product's events and request signals reach separate staging and production stores, and the operator dashboards can be rebuilt by a script rather than by hand.
  Without it, a usability-test event or a smoke test counts as a product metric, or the dashboards are lost with the instance.
- **Owner:** `KaramKhaddour`
- **Where:** the telemetry variables in `.env.example`, `scripts/provision-telemetry-dashboards.py`, the [analytics plan](analytics.md) and the [observability plan](observability.md); the instances' addresses and credentials are in the Moodle submission only.
- **Connections:**
  - `reads` [`CFG-10`](#cfg-10) for the telemetry variables: a deployment without them runs with telemetry off and reports nothing.
  - `produces` the dashboards the analytics plan defines, filtering out `source=usability-test` and `source=smoke`: a dashboard rebuilt by hand without the filter mixes the `UT-01` sessions into the product metrics.
- **What good looks like:** staging and production are separate, the dashboards are reproducible, and no address or credential is committed, per [Analytics Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/analytics-requirements.md) and [Observability Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/observability-requirements.md).

### CFG-13

The private usability-data repository and the recordings folder.

- **Status:** Active
- **Type:** setting
- **Purpose:** the raw `UT-01` data that identifies a participant, the consent records, the identity mapping, the raw notes, and the telemetry export, stays out of this public repository while the instructors can still inspect it.
  Without it, the raw evidence is either published or missing.
- **Owner:** `KaramKhaddour`
- **Where:** the team's private usability-data repository on GitHub, and a restricted cloud folder for the recordings; both addresses and access instructions are in the Moodle submission only.
- **Connections:**
  - `produces` the raw evidence that `docs/usability-tests/ut-01/` sanitizes: a participant name copied into a public session note is a privacy incident.
  - `reads` `.lycheeignore` in [`CFG-06`](#cfg-06), which excludes the private repository because the link check cannot authenticate.
- **What good looks like:** the raw data is private, the recordings are in a team-owned folder shared with the instructors, and the public record links the private repository without copying from it, per [The Usability Data Repository](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#the-usability-data-repository) and [The Private Data Repository](https://github.com/inno-itpd/itpd/blob/main/requirements/usability-testing-requirements.md#the-private-data-repository).

## Dependencies And Builds

### CFG-14

The pinned third-party actions and tools, and the Dependabot configuration that moves them.

- **Status:** Active
- **Type:** dependency
- **Purpose:** a third-party action runs with the repository's token, so it runs at a commit the team chose, and every dependency moves only through a reviewed pull request.
  Without it, a retagged action runs code the team never read, and the lockfiles age until one update is too large to review.
- **Owner:** `KaramKhaddour`
- **Where:** `.github/dependabot.yml`, the `uses:` lines of every workflow, the mdBook version and checksum in the docs workflow, and the `actionlint` version in the workflow lint.
- **Connections:**
  - `produces` the update pull requests for the `github-actions`, `uv`, `npm`, and `docker-compose` ecosystems, against [`CFG-04`](#cfg-04) to [`CFG-08`](#cfg-08), [`CFG-15`](#cfg-15), [`CFG-16`](#cfg-16), and [`CFG-17`](#cfg-17): an update nobody merges, such as the pending Node.js 26 image update for the compose file, leaves that dependency behind while the others move.
  - `reads` [`CFG-01`](#cfg-01): an update merged without a review is a silent upgrade.
- **What good looks like:** every third-party action is pinned to a full commit with its version in a comment, and each ecosystem the repository uses is updated weekly through reviewed pull requests, per [Pinning Third-Party Actions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#pinning-third-party-actions).

### CFG-15

The backend's dependencies: `backend/pyproject.toml`, `backend/uv.lock`, and `backend/.python-version`.

- **Status:** Active
- **Type:** dependency
- **Purpose:** every machine, CI, and the VM install the same Python packages at the same versions, on the same Python.
  Without the lockfile, a new release of a package changes the backend between two installs of the same commit.
- **Owner:** `KaramKhaddour`
- **Where:** `backend/pyproject.toml`, `backend/uv.lock`, and `backend/.python-version`.
- **Connections:**
  - `produces` the environment [`CFG-04`](#cfg-04) installs with `uv sync --locked`: a `pyproject.toml` changed without `uv lock` fails CI.
  - `produces` the packages of the backend image in [`CFG-17`](#cfg-17), which the VM builds at deploy time.
  - `reads` the `uv` ecosystem of [`CFG-14`](#cfg-14), which moves it: an update pull request left unmerged leaves the lockfile behind.
- **What good looks like:** one committed lockfile that CI installs from without changing it, updated through reviewed pull requests, per [Setup And Run Instructions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#setup-and-run-instructions).

### CFG-16

The frontend's dependencies: `frontend/package.json` and `frontend/package-lock.json`.

- **Status:** Active
- **Type:** dependency
- **Purpose:** every machine, CI, and the VM install the same JavaScript packages, so a build that passed CI is the build that is deployed.
  Without the lockfile, `npm install` on the VM resolves different versions from the ones the tests ran against.
- **Owner:** `KaramKhaddour`
- **Where:** `frontend/package.json` and `frontend/package-lock.json`.
- **Connections:**
  - `produces` the environment [`CFG-04`](#cfg-04) installs with `npm ci`: a `package.json` changed without its lockfile fails CI.
  - `produces` the packages of the frontend image in [`CFG-17`](#cfg-17).
  - `reads` the `npm` ecosystem of [`CFG-14`](#cfg-14), which moves it: an update pull request left unmerged leaves the lockfile behind.
- **What good looks like:** one committed lockfile, installed with `npm ci`, and updated through reviewed pull requests, per [Setup And Run Instructions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#setup-and-run-instructions).

### CFG-17

The container build and the setup page: `docker-compose.yml`, `compose.deploy.yml`, `piper/Dockerfile`, and `docs/setup.md`.

- **Status:** Active
- **Type:** process
- **Purpose:** a member goes from a clean checkout to a running product with one command, and the VM builds staging and production from the same files.
  Without it, the product runs only on the machine of the member who set it up.
- **Owner:** `KaramKhaddour`
- **Where:** `docker-compose.yml` for development, `compose.deploy.yml` for the VM, `piper/Dockerfile` for the local voice service, and [`docs/setup.md`](setup.md) for the steps.
- **Connections:**
  - `reads` [`CFG-10`](#cfg-10) for the variables, [`CFG-15`](#cfg-15) and [`CFG-16`](#cfg-16) for the packages.
  - `produces` the two compose projects [`CFG-09`](#cfg-09) runs on the VM: a service added to `compose.deploy.yml` without its port in the runbook is a service nobody verifies.
  - `cites` the check commands of [`CFG-04`](#cfg-04), which the setup page copies and says CI runs: on the baseline the page omits `uv run mypy app` and `npm run format:check`, so a member who follows it pushes a change CI fails.
  - `reads` the voice-model host while the Piper image builds: a VM that cannot reach it fails the deploy at the build step.
- **What good looks like:** a member can build and run the product and its checks from the setup page alone, and the deployment builds from the committed files, per [Setup And Run Instructions](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#setup-and-run-instructions).

## Agent Context And Artifacts

### CFG-18

The team's `AGENTS.md`.

- **Status:** Active
- **Type:** document
- **Purpose:** an agent, or a member who has just cloned the repository, learns the layout, the checks, the conventions, and the files not to edit without reading the code to infer them.
  Without it, every agent session rediscovers the repository, and two sessions follow two different conventions.
- **Owner:** `KaramKhaddour`
- **Where:** `AGENTS.md`, in the repository root.
- **Connections:**
  - `cites` the course's [`SKILL.md`](https://github.com/inno-itpd/itpd/blob/main/SKILL.md), the router into the requirements, which [`CFG-20`](#cfg-20) also installs.
  - `cites` this plan, so an agent starting from the root finds the inventory.
  - `cites` the commands of [`CFG-04`](#cfg-04), which its checks section repeats as [`CFG-19`](#cfg-19) and the setup page do: a check added to CI is three edits, and on the baseline all three copies omit `uv run mypy app` and `npm run format:check`, and its link-check command passes `--include-fragments`, which the workflow does not.
- **What good looks like:** it states the layout, the checks, the conventions, and the off-limits files, each in its own section, and links the course's `SKILL.md`, per [What It States](https://github.com/inno-itpd/itpd/blob/main/requirements/agent-instructions-requirements.md#what-it-states).

### CFG-19

The team's `CONTRIBUTING.md` and the Definition of Done it points to.

- **Status:** Active
- **Type:** document
- **Purpose:** a member learns where the work is planned, how a change gets into `main`, what a reviewer checks, and what "done" means, in one read.
  Without it, each reviewer applies their own bar, and an approval means different things on different pull requests.
- **Owner:** `KaramKhaddour`
- **Where:** `CONTRIBUTING.md`, and [`docs/definition-of-done.md`](definition-of-done.md).
- **Connections:**
  - `cites` [`CFG-01`](#cfg-01) and [`CFG-03`](#cfg-03) for the review rule and the forms it describes.
  - `cites` [`CFG-04`](#cfg-04): its "Before you push" section says its commands are "the same checks CI runs", but CI runs two steps the section omits, the backend type check and the frontend format check.
- **What good looks like:** it states how to contribute and what a reviewer checks, without repeating the Definition of Done, per [Contributing](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#contributing).

### CFG-20

The course materials, installed as an agent skill.

- **Status:** Active
- **Type:** skill
- **Purpose:** an agent and a member read the course's requirements and guides from inside the repository, at a commit the team chose, without editing them.
  Without it, an agent works from its memory of the course rather than from the rule.
- **Owner:** `KaramKhaddour`
- **Where:** the `.agents/skills/itpd` submodule, declared in `.gitmodules` and pinned to a commit of the course repository.
- **Connections:**
  - `produces` the rules [`CFG-18`](#cfg-18) sends an agent to, but its link to `SKILL.md` points at the course's `main` rather than at the pinned commit: an agent reading the pin and a member following the link can read two different weeks' rules.
  - `reads` the course repository at the pinned commit, moved only by a pull request and not by [`CFG-14`](#cfg-14): on the baseline the pin is 29 commits behind the course's `main`, which carries the Week 8 rules, so an agent reading the skill reads the Week 7 materials.
  - `cites` [`CFG-05`](#cfg-05) and [`CFG-06`](#cfg-06), which skip it because the course repository checks it: a team edit inside the submodule would be checked by nobody.
- **What good looks like:** the skill is installed and wired in, the team does not edit it, and the pin is moved when a new week's materials are needed, per [The Course Materials As An Agent Skill](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#the-course-materials-as-an-agent-skill).

### CFG-21

The entry points: the root `README.md` and the documentation index `docs/README.md`.

- **Status:** Active
- **Type:** document
- **Purpose:** a reader who opens the repository or the documentation site finds the current report, the maintained documents, the setup, the runbook, and the way the team works from one page.
  Without it, a reader starts from a file list and finds a past week's report first.
- **Owner:** `Horokk1`
- **Where:** `README.md` in the repository root and [`docs/README.md`](README.md).
- **Connections:**
  - `cites` the current week's report under `reports/`: on the baseline the root `README.md` names `reports/week-02/README.md` and links `reports/week-06/README.md`, so the "current week's report" is two different stale weeks at once.
  - `cites` the maintained documents, which [`CFG-08`](#cfg-08) publishes; a page added to `docs/SUMMARY.md` and not to the index is on the site but not on the start page.
- **What good looks like:** the root `README.md` states the product, the team, the current report, and how to run it, per [Root README](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#root-readme), and the maintained documents are where the course says, per [Where Artifacts Live In The Repository](https://github.com/inno-itpd/itpd/blob/main/requirements/general-requirements.md#where-artifacts-live-in-the-repository).

### CFG-22

The project plan, `docs/project-plan.md`: the milestones, the sprints, the releases, and the quality requirement testing plan.

- **Status:** Active
- **Type:** document
- **Purpose:** a reader sees what each sprint is for, what it delivered, which release it cut, and when each quality requirement is checked.
  Without it, the milestones on GitHub say what was scheduled but not why, and a quality requirement can be postponed every week without anyone noticing.
- **Owner:** `Byakko-san`
- **Where:** [`docs/project-plan.md`](project-plan.md).
- **Connections:**
  - `cites` the sprint milestones of [`CFG-03`](#cfg-03) as each sprint's backlog.
  - `cites` the tags and the changelog of [`CFG-02`](#cfg-02) in each `REL-nn` block.
  - `cites` the quality requirements under `docs/quality-requirements/qr/`: a testing-plan row moved to the next sprint without a reason hides a test that never runs, as three rows have moved twice.
- **What good looks like:** each sprint has its goal, its due date, its backlog link, and its velocities, each release its block, and each testing-plan row its status and sprint, per [Planning Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/planning-requirements.md).

### CFG-23

The decisions log, `docs/decisions.md`.

- **Status:** Active
- **Type:** document
- **Purpose:** every decision that changed what the team builds has a `DEC-nnn` entry with who made it, when, and from which meeting, so a requirement or a story can cite why it is the way it is.
  Without it, a requirement changed in Week 7 cannot be told apart from one changed by mistake.
- **Owner:** `KaramKhaddour`
- **Where:** [`docs/decisions.md`](decisions.md).
- **Connections:**
  - `reads` each week's meeting report and transcript under `reports/`, which it cites as its source: a decision recorded without its source cannot be checked.
  - `produces` the reasons cited by the functional requirements, the quality requirements, the glossary, and this plan's dropped item, [`CFG-11`](#cfg-11).
- **What good looks like:** each decision has its identifier, status, date, maker, source, and reason, and a reversal is a new entry rather than an edit, per [Decisions Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/decisions-requirements.md).

### CFG-24

The weekly report process: `reports/week-NN/` and the files each week produces.

- **Status:** Active
- **Type:** process
- **Purpose:** each week's evidence, the report, the meeting script, report, and transcript, the retrospective, and the AI usage report, is in one folder that the Moodle permalink points at.
  Without it, a submission is a PDF of claims with no repository behind it.
- **Owner:** `KaramKhaddour`
- **Where:** `reports/week-NN/`, one folder per week; a past week's folder is not rewritten, per [`CFG-18`](#cfg-18).
- **Connections:**
  - `reads` every other item: the coverage table links the plan, the decisions, the releases, and the checks' latest runs.
  - `produces` the folder [`CFG-21`](#cfg-21) points at as the current week's report: the pointer is moved by hand every week, and on the baseline it was not.
  - `produces` the Markdown [`CFG-06`](#cfg-06) checks: a report whose coverage table links a file that moved fails the link check.
- **What good looks like:** each week's report carries its summary, its coverage table, its deviations, and its privacy line, and the permalink is taken from `main`, per [Weekly Report Requirements](https://github.com/inno-itpd/itpd/blob/main/requirements/weekly-report-requirements.md).
