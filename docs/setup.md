# Set up and run

This page takes you from a clean checkout to the product's core task: bring in a text, mark the words to learn, and get a card with a new sentence for each word.
It covers running everything with Docker, which is the quickest way, and running the parts on their own for development.

## Prerequisites

To run the product:

- Git.
- Docker Engine with the Compose plugin (`docker compose version` prints 2.x or newer), or Docker Desktop.
- Free ports 5173 (the app), 8000 (the API), 8025 (the local mail inbox), and 5433 (the database).

To write real sentences you also need an Anthropic API key, either for the whole server or one per learner; see [Configure](#configure).
Without one, the product runs with placeholder sentences.

To develop or run the checks outside Docker:

- Python 3.12 and [uv](https://docs.astral.sh/uv/).
- Node.js 22.12 or newer, with npm.

## Install

```sh
git clone https://github.com/itpd-2026-team-5/team-5-sentence-card-generator.git
cd team-5-sentence-card-generator
```

Docker installs everything else when it builds the images.

## Configure

Copy the example settings and edit the copy:

```sh
cp .env.example .env
```

[`.env.example`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/.env.example) lists every setting.
Never commit `.env`; Git ignores it.

If you have no Anthropic API key and want to try the product, open `.env` and change `LLM_PROVIDER=anthropic` to `LLM_PROVIDER=fake`, so cards get placeholder sentences instead of failing.

Choose how sentences are written:

| Setting in `.env` | What happens |
| --- | --- |
| `LLM_PROVIDER=anthropic` and `ANTHROPIC_API_KEY=<your key>` | The server writes sentences with Claude (`LLM_MODEL`, by default `claude-opus-5-5`). |
| `LLM_PROVIDER=anthropic`, `ANTHROPIC_BASE_URL=<gateway address>`, `ANTHROPIC_AUTH_TOKEN=<token>`, and `LLM_MODEL=<a model it offers>` | The server writes sentences through a gateway that speaks the Anthropic API. For a model older than the Claude 5 family, the request leaves out effort and the refusal fallback. |
| `LLM_PROVIDER=fake` | No key needed: every card gets a placeholder sentence, "This is a short practice sentence that uses … today." Use it to try the product or to run it offline. |
| Leave `ANTHROPIC_API_KEY` empty | Each learner chooses *My own key* under Settings → Who writes the sentences, with Anthropic, a gateway that speaks its API, or an OpenAI-compatible provider such as OpenRouter. The key stays in their browser and goes straight to the provider; the server never sees it. |

Email: the sign-up confirmation goes to Mailpit, a local inbox that docker compose starts, so nothing leaves your computer.
To send real email, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `MAIL_FROM`, and set `APP_URL` to the address learners open, since the link in the email points there.

## Run

```sh
docker compose up --build
```

The first start takes a few minutes while the images build; the backend applies the database migrations itself.
When the frontend logs `Local: http://localhost:5173/`, open:

| What | Address |
| --- | --- |
| The app | `http://localhost:5173` |
| The mail inbox (Mailpit) | `http://localhost:8025` |
| The API and its documentation | `http://localhost:8000/docs` |

Stop with `Ctrl+C`, or `docker compose down` from another terminal.
`docker compose down -v` also deletes the database, for a fresh start.

## Complete the core task

1. Open `http://localhost:5173`, choose **Create an account**, and enter your full name, an email address, and a password of at least 8 characters.
2. Open the inbox at `http://localhost:8025`, open the email "Confirm your email for Sentence Cards", and click its link.
   The app opens on Settings.
3. Choose the language you speak, the language you are learning, and your level, then **Save changes**.
4. Open **Texts**, choose **Add text**, give it a title, paste a text in the language you are learning, and choose **Add and pick words**.
5. Click a word and choose **Learn**; do this for each word you want to learn.
   Or type a word in the search box to see the sentences that contain it, and choose the one with the meaning you want.
6. Under **Generate into**, pick a deck (every account starts with "My first deck"), and choose **Generate**.
7. Open **Decks** and the deck: there is one card for each word you marked, with a new sentence, its translation, and the word's meaning.

From there, **Today** lists your decks to study.

## Try it with demo data

To see the product with a learner, two teachers, decks, texts, and cards already in it, run this once while the app is running:

```sh
docker compose exec backend uv run --no-dev python -m app.seed
```

It needs no API key and no email, because the cards' sentences are written in advance. Sign in at `http://localhost:5173` with any of these accounts:

| Email | Password | Who |
| --- | --- | --- |
| `learner@example.com` | `learner-demo` | Lena Lerner, a learner of German and Russian, with four decks |
| `teacher@example.com` | `teacher-demo` | Tamara Lehrer, who teaches Lena's "Travel by train" and "Shopping" decks |
| `ivan.teacher@example.com` | `teacher-demo` | Ivan Petrov, who teaches Lena's Russian deck |

The learner's data shows each part of the product: both meanings of "Bank" learned from one text, a question for the teacher and one the teacher answered, a card marked to rewrite, an archived card, and cards due for review.
The demo accounts are only on your computer.
Running the command again changes nothing; add `--reset` to delete the demo accounts and create them again, which also deletes anything you did with them.

## Run the checks and the tests

The same commands run in CI, in the "Product checks" workflow, on every pull request and on `main`.

Backend, from `backend/`:

```sh
uv sync --locked          # install the exact versions in uv.lock
uv run ruff check .       # lint
uv run ruff format --check .
uv run pytest             # tests; they use SQLite and a fake LLM, so they need no database or key
```

Frontend, from `frontend/`:

```sh
npm ci
npm run lint
npm test                  # frontend client regression tests; no API key or provider calls
npm run build             # type-checks, then builds
```

Documentation, from the repository root, the checks the "Markdown check" and "Link check" workflows run:

```sh
npx markdownlint-cli2 "**/*.md"
docker run --rm -v "$PWD":/input -w /input lycheeverse/lychee --no-progress './**/*.md'
```

## Run the parts without Docker

For development, start only the database and the inbox in Docker, and run the backend and the frontend on your machine:

```sh
docker compose up -d db mailpit
```

Backend, from `backend/`, pointing at the database on port 5433 and at Mailpit's mail port:

```sh
export DATABASE_URL=postgresql+psycopg://cards:cards@localhost:5433/cards
export LLM_PROVIDER=fake SMTP_HOST=localhost SMTP_PORT=1025 SMTP_STARTTLS=false
uv sync
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```

Mailpit's mail port is not published by default; add `- "1025:1025"` under its `ports` in a `docker-compose.override.yml`, or leave `SMTP_HOST` empty and copy the link from the backend's log instead.

Frontend, from `frontend/`, in a second terminal:

```sh
npm install
npm run dev               # http://localhost:5173; /api goes to the backend on port 8000
```

To change the database schema, edit `backend/app/models.py`, then generate a migration and review it before you commit it:

```sh
uv run alembic revision --autogenerate -m "what changed"
```

## When something goes wrong

- **A port is already in use.** Stop what uses it, or change the host port: `DB_HOST_PORT` in `.env` moves the database, and `MAILPIT_HOST_PORT` the inbox.
- **No email arrives.** With the default settings it is in Mailpit at `http://localhost:8025`, not in your real inbox. A new link can be requested once a minute from the "Check your inbox" page.
- **Generating fails with "The Claude API key is missing or invalid".** Set `ANTHROPIC_API_KEY` in `.env` and restart with `docker compose up`, enter your own key under Settings, or set `LLM_PROVIDER=fake`.
- **The app shows old data after a schema change.** `docker compose down -v` deletes the database; the next start migrates a fresh one.

## Text languages after upgrading

The backend runs database migrations on startup.
Existing texts get their language from their generated cards' decks when those decks agree on one language; otherwise, they use the owner's current learning language.
After upgrading a multilingual account, open **Texts → Edit text** and check each text's **Text language** before generating more cards.
New texts have their own language selector, and generation offers matching decks.

Use the globe icon in the top-right corner of the sign-in screen, or **Interface language** in Settings, to choose English, German, or Russian.
This preference is saved in the current browser independently of learning languages and playback voices.
In Teaching, open a card, edit its fields, and choose **Save changes** to save and confirm it, or **Discard edits** to restore its saved fields.
