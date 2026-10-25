# Agent Instructions

How this repository works, for a coding agent or a member who has just cloned it.
The course requirements are routed from [`SKILL.md`](https://github.com/inno-itpd/itpd/blob/main/SKILL.md); read the rule there before you change an artifact it governs.

## Layout

- `backend/` is the FastAPI backend: `app/` holds the code, `tests/` the pytest suite, and `migrations/versions/` the Alembic migrations, one new file per schema change.
  The LLM providers are in `app/llm.py`, card generation and its checks in `app/generation.py`, the review scheduler in `app/study.py`, and the demo data in `app/seed.py`.
- `frontend/` is the React and TypeScript frontend: `src/pages/` holds one file per screen, `src/components/` the shared parts, `src/api.ts` the calls to the backend, and `src/llm.ts` the learner's own key.
- `docs/` holds the maintained documentation, which mdBook publishes as the documentation site; a new page is listed in `docs/SUMMARY.md` or the site does not show it.
  The functional requirements are under `docs/functional-requirements/fr/` and the quality requirements under `docs/quality-requirements/qr/`, each folder with its index in its `README.md`; the architecture is `docs/architecture/README.md`, with its records in `docs/architecture/adr/`, started from `TEMPLATE.md`; the decisions are in `docs/decisions.md`, the assumptions in `docs/assumptions.md`, and the words the project uses in `docs/glossary.md`.
- `reports/week-NN/` holds each week's evidence: the report, the meeting script, report, and transcript, and the AI usage report.
- `.github/` holds the workflows, the issue forms, the pull request template, and the Dependabot settings.
- `docker-compose.yml` starts the database, the backend, the frontend, and a local mail inbox; `docs/setup.md` says how.

## Checks

- Backend, from `backend/`: `uv run ruff check .`, `uv run ruff format --check .`, and `uv run pytest`; the tests use SQLite and a fake LLM, so they need no key and no network.
- Frontend, from `frontend/`: `npm run lint` and `npm run build`, which type-checks.
- The "Product checks" workflow runs both sets on every pull request.
- Markdown: `npx markdownlint-cli2 "**/*.md"`, run in CI by the "Markdown check" workflow with the rules in `.markdownlint-cli2.jsonc`.
- Links: `lychee --include-fragments .`, run in CI by the "Link check" workflow; it fetches external links, so it needs the network, and a link that cannot be checked goes in `.lycheeignore` with a reason and a date.
- Documentation site: `mdbook build`, run by the "Docs site" workflow, which fails on a page listed in `docs/SUMMARY.md` that does not exist.

## Conventions

- Every change goes through a pull request that closes one task issue, from a branch named `<issue number>-<short-description>`, such as `56-add-the-backend`.
- Commit subjects are in the imperative, capitalised, without a full stop, at most 72 characters; a commit an agent helped write ends with a `Co-Authored-By:` trailer naming it.
- A user-visible change adds its line under `[Unreleased]` in `CHANGELOG.md` in the same pull request.
- Python is formatted and linted by ruff, and TypeScript is strict and linted by oxlint; match the style of the file you edit.
- In every artifact the person the team answers to is called `Customer`, never by name, and no personal data is committed.
- The full process for members, with the review checklist, is in `CONTRIBUTING.md`, and what "done" means is in `docs/definition-of-done.md`.

## Do Not Edit

- `.env` is never created in a commit or printed: it holds the LLM key; `.env.example` lists the variables without values.
- `backend/migrations/versions/` files that are already on `main` are never changed, because a database that ran them would not run them again; add a new migration instead.
- `reports/week-NN/` of a past week is not rewritten, because it is the record of that week; a correction goes in the current week's report.
- `CHANGELOG.md`'s released sections and the release tags are changed only when a release is cut, by the member cutting it.
- `docs/decisions.md` entries record what the Customer or the team decided; an agent adds an entry only when asked, and never changes an existing one, which is reversed by a new entry.
- `.github/workflows/` is changed only in a pull request of its own, so a broken check cannot hide inside another change.
