# Week 05 report

## Project

Sentence Cards Generator, Team 5.

## Summary

The testing work adds frontend client regression tests to the existing backend suite and prepares their integration into product CI in a separate workflow change.
The local checks, results, and environment limitations are recorded in [testing.md](testing.md).
The product is deployed to staging and production on the university VM, as described in [the deployment runbook](../../docs/deployment.md) and [the deployment below](#deployment); it is reached from the university network, at the address given in the Moodle submission.
This report does not yet cover REL-05, the customer review, the sprint retrospective, and the team contribution evidence, which still need to be completed for Submission 5.

## Coverage

| Deliverable | Artifact |
| --- | --- |
| Test suite and automated checks | [reports/week-05/testing.md](testing.md) |
| Feature documentation | [docs/features.md](../../docs/features.md) |
| Deployment runbook | [docs/deployment.md](../../docs/deployment.md) |
| Staging and production deployment | [Deployment](#deployment) |
| AI usage | [reports/week-05/ai-usage.md](ai-usage.md) |

## Deployment

On 2026-10-31, `saleemasekrea000` deployed commit [`248b766`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/commit/248b766bb91a9e5dd4f4f73118c0506e0b84fd89) by hand from a campus machine, following [the deployment runbook](../../docs/deployment.md): first to staging, then the same checkout to production, on the university VM at `<university-vm-ipv4>`.

- Staging, port 8081: `curl http://localhost:8081/api/health` on the VM returned `{"status":"ok"}`, after the backend had run every database migration.
- Production, port 8080: `curl http://localhost:8080/api/health` returned `{"status":"ok"}`.
- Production was loaded with the demo data (`python -m app.seed`), and from a campus browser the demo learner signed in and opened the "Travel by train" deck and its cards:

![The demo learner's deck on production](production-deck.png)

What the production check verified of the [core task](../../docs/setup.md#complete-the-core-task): signing in, adding a text, marking words to learn, and reading a deck's cards.
What it did not verify: generating new cards, because the LLM providers cannot be reached from the university network; see [Deviations](#deviations) and the [failed deploy record](../../docs/deployment.md#2026-10-31-card-generation-cannot-reach-an-llm-from-the-vm).

## Deviations

Backend tests required a temporary event-loop workaround in this execution environment, and local frontend lint could not run because its native dependency was missing.
See [the test results and limitations](testing.md#results); a green hosted run is still required.

On production, the last step of the core task, generating cards for the marked words, could not be verified.
The VM cannot reach the Claude API (the connection times out) and OpenRouter refuses it (`403`), and a learner's own key in the browser fails the same way from the campus network.
The deployment is otherwise working; generation needs an LLM gateway reachable from the university network, as the [runbook](../../docs/deployment.md#2026-10-31-card-generation-cannot-reach-an-llm-from-the-vm) describes.

## Privacy

No private-only material was committed as part of this testing work.
