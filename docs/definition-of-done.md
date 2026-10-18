# Definition of done

What "done" means here, for a story, a task, and a pull request.
Each item is a check someone other than its author can run and get the same answer.
The lists do not repeat each other: an item sits under the smallest unit it applies to.
When the way we work changes, we change this page in the same pull request.

## Story

- Every acceptance criterion passes on `main`.
- Every task issue that works on the story has closed with its pull request merged, so each also met the Task and Pull Request lists below.
- The story issue links the evidence for each criterion: the pull request, a screenshot, or the test that shows it.
- The accountable member has checked that each criterion is runnable from a clean checkout by following [the setup page](setup.md), and that every link on the issue resolves.

A story closes only when the Customer accepts it at a meeting, criterion by criterion; until then it stays open, with a task issue for any rework.

## Task

- Every acceptance criterion the task carries is ticked by the reviewer.
- The task closes as completed, which happens when the pull request that closes it merges into `main`.
- A task whose pull request is closed without merging is closed as not planned, with a comment giving the reason.

## Pull Request

- A pull request closes exactly one task issue, with `Closes #<number>` in its description, and its branch is named `<issue number>-<short-description>`.
- The accountable reviewer ticks every acceptance criterion of that task before approving.
- The approval comes from a member other than the author.
- The repository checks are green: the link check, the Markdown check, and product-code CI (`Product checks`); for changes to `backend/` or `frontend/`, its lint, format, test, and build jobs pass.
- A user-visible change adds an entry to the `[Unreleased]` section of [`CHANGELOG.md`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/CHANGELOG.md); the description says which, as the pull request template asks.
- The acceptance criteria this pull request claims pass on its branch, and on `main` after it merges.
- No secret, recording, or private-only material is committed: no API keys, no `.env`, no real names or emails, no recording links.
- The description records the decisions made and how the change was checked, under "What changed and why" and "What I checked, and how".
