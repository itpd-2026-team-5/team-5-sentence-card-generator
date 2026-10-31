# Week 05 testing evidence

Checked on 2026-10-31 against the testing branch based on locally available `origin/main` (`3083240`).
Installed dependencies were reused from the original workspace; a fresh dependency installation could not be verified without registry access.
This evidence covers the testing work; it does not establish a production deployment or a completed release.

## Test suites

The [backend suite](../../backend/tests/) covers registration, verification and sign-in, access isolation, teacher sharing, text parsing, card generation and checks, per-deck study scheduling and limits, demo seeding.
It uses SQLite and the fake LLM, without a real API key or an external database.

The [frontend suite](../../frontend/tests/client.test.mjs) runs the actual TypeScript client modules with Node's built-in test runner after compiling them with pinned esbuild.
It checks preferences when storage is blocked, API request serialization and filters, session expiry and verification, empty and non-JSON responses, model output parsing, provider errors, and browser-key generation.
The generation test verifies that the key goes only to the provider and is absent from both requests to the application API.
Fetch is replaced with queued responses; an unexpected call fails the test, so no provider is contacted.
These are client logic tests, not browser interaction or visual tests.

## Results

| Check | Result |
| --- | --- |
| Backend pytest suite | 60 passed in 54.31 seconds, with the execution-environment workaround described below |
| Backend `ruff check .` | Passed |
| Backend `ruff format --check .` | Passed, 33 files already formatted |
| Frontend `npm test` | 23 passed, no failures or skips |
| Test runner failure propagation | An intentionally failing assertion in a temporary test copy produced exit code 1 |
| Frontend `npm run build` | Passed, including TypeScript checking; Vite reported a bundle-size warning |
| Frontend `npm run lint` | Blocked locally: the installed oxlint package lacks its Linux native binding |
| Workflow validation | The dependent workflow change requires hosted validation; actionlint is unavailable locally |
| Hosted GitHub Actions | Not verified in this session |

### Backend execution environment

An ordinary `pytest` run stalled on the first synchronous TestClient request.
A separate minimal FastAPI app with one endpoint reproduced the same stall.
Polling the asyncio selector at 10 ms intervals allowed that minimal request and the project tests to finish.
The workaround was loaded as a temporary pytest plugin from `/tmp/itpd_asyncio_poll.py`; it is not part of the repository or its CI configuration.
It wraps `asyncio.SelectorEventLoop._run_once`, schedules a no-op timer before the original method, and cancels that timer afterward.

The verification command was:

```sh
# From backend/, with the temporary plugin available in /tmp:
PYTHONPATH=/tmp timeout 80s .venv/bin/pytest -p itpd_asyncio_poll -q
```

The standard reproducible command for a normal development machine and CI remains `uv run pytest`.
A normal run in hosted CI still needs verification; the result above is not evidence of a green hosted run.

### Local frontend lint dependency

`npm run lint` failed to load `@oxlint/binding-linux-x64-gnu`.
The local Node version is 22.6.0, below oxlint's supported Node 22 minimum of 22.12.0.
Installing additional dependencies was also blocked by DNS resolution for the npm registry.
Use a supported Node 22 release and `npm ci` on a machine with registry access, then rerun the checks.
The lint check remains required in CI.

## Automation and reproduction

The [Product checks workflow](../../.github/workflows/product.yml) runs on pull requests and pushes to `main`.
A separate dependent workflow branch adds the new frontend tests while retaining the existing lint, formatting, type, build, and backend test checks.
The workflow branch also gives both jobs a 10-minute timeout so a stalled command fails the run.
Merge the test-suite pull request before the separate workflow pull request, per the repository's instructions.

Follow the [setup commands](../../docs/setup.md#run-the-checks-and-the-tests) from a clean checkout.
No test or lint failure is suppressed by the workflow.
App deployment automation is outside this testing change and is still outstanding.
