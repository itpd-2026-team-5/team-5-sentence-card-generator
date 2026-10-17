# Contributing

How ITPD Team 5 works on the Sentence Cards Generator: where work is planned, how a change gets into `main`, and what a reviewer checks.
What "done" means for a story, a task, and a pull request is in [the Definition of Done](docs/definition-of-done.md); this page does not repeat it.
To run the product and its checks, see [the setup page](docs/setup.md).

## Where the work is

- **Stories** are issues opened from the *User Story* form, labelled `user-story` and one `moscow:*` priority. A story says what a user needs; it is never closed by a pull request, only by the Customer's acceptance.
- **Tasks** are issues opened from the *Task* form, labelled `task`, each with its acceptance criteria as a checklist (`- [ ] AC-01: …`) and, when it works on a story, the story issues it serves.
- **Sprints** are GitHub milestones, `SPRINT-03` to `SPRINT-09`, one per week. An issue is scheduled by putting it in its sprint's milestone and, at the same time, setting its `Responsible` (who does it) and `Accountable` (who checks it) fields to two different members, who are also its two assignees.
- **The GitHub project** shows all of this in one place. We use its **table view**, with the `Responsible`, `Accountable`, `Assignees`, and `Milestone` columns, grouped by milestone, at the weekly review: it answers "is everything in this sprint owned, and by whom" without opening each issue. The project is linked from here once it exists, and is the only view we keep.

## How a change gets in

Every change, code or documentation, goes through a pull request; `main` is protected.

1. **Open or pick a task issue.** One task is one change a reviewer can check in one sitting.
2. **Branch from `main`**, named after the task: `<issue number>-<short-description>`, for example `56-add-the-backend`.
3. **Commit** in the format below.
4. **Open a pull request** into `main` and fill in the template:
   - *What changed and why*, starting with `Closes #<issue number>`;
   - whether the change is user-visible, and if so the entry you added under `[Unreleased]` in [`CHANGELOG.md`](CHANGELOG.md);
   - *What I checked, and how*: the commands you ran and what you looked at;
   - *For the reviewer*: where to start, and what you want challenged.
5. **Get one approval** from a member other than you; then the author merges.
   If the base moved on, use *Update branch*, and let the checks run again.

### What the reviewer checks

- The pull request does what its task asks: tick each of the task's acceptance criteria yourself, on the branch, before approving.
- It is one change, and nothing in it is unrelated to the task.
- The checks are green, and the description says how the author checked it.
- Code changes: the tests cover the new behaviour, and the app still completes the core task by following [the setup page](docs/setup.md).
- Nothing private is committed: no `.env`, no API key, no real names, emails, or recordings.

Dependabot's pull requests go through the same review: approve and merge a minor or patch update when its checks pass; close a major update and plan it as a task instead.

## Commit messages

- A subject line in the imperative mood, capitalised, without a full stop, at most 72 characters: `Add the setup page and link it from the README`.
- A blank line, then a body that says why, wrapped at 72 characters, when the subject is not enough.
- One logical change per commit.
- When an AI assistant wrote part of the change with you, add a `Co-Authored-By:` trailer naming it, and report the use in the week's AI usage report.

## Before you push

From `backend/`: `uv run ruff check .`, `uv run ruff format --check .`, and `uv run pytest`.
From `frontend/`: `npm run lint` and `npm run build`.
For Markdown: `npx markdownlint-cli2 "**/*.md"`.
These are the same checks CI runs, so a green run locally is a green run on the pull request.
