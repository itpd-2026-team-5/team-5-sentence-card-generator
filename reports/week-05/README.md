# Week 05 report

## Project

Sentence Cards Generator, Team 5.

## Summary

The testing work adds frontend client regression tests to the existing backend suite and prepares their integration into product CI in a separate workflow change.
The local checks, results, and environment limitations are recorded in [testing.md](testing.md).
This report currently covers testing and feature documentation; the production instance, REL-05, customer review, sprint retrospective, and team contribution evidence still need to be completed for Submission 5.

## Coverage

| Deliverable | Artifact |
| --- | --- |
| Test suite and automated checks | [reports/week-05/testing.md](testing.md) |
| Feature documentation | [docs/features.md](../../docs/features.md) |
| AI usage | [reports/week-05/ai-usage.md](ai-usage.md) |

## Deviations

Backend tests required a temporary event-loop workaround in this execution environment, and local frontend lint could not run because its native dependency was missing.
See [the test results and limitations](testing.md#results); a green hosted run is still required.

## Privacy

No private-only material was committed as part of this testing work.
