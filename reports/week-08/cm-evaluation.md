# CM Evaluation

- **Baseline:** [`1a9bae1`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/tree/1a9bae1da180d39011270cc7e7089878a12fcb9d), the head of `main` on 22 November 2026, one pull request after [v0.7.0](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/releases/tag/v0.7.0).
- **Reviewed:** 2026-11-22.

## Method

`KaramKhaddour` reviewed the repository on 22 November 2026 against `1a9bae1`, with a coding agent reading the files, as the Week 8 AI usage report states, in four passes: the configuration was inventoried from the repository's own top level, `.github/`, `docs/`, `reports/`, the root files, the package manifests, and the branch protection settings, into the [configuration plan](../../docs/configuration-plan.md); the team wrote a local goal for each artifact family and grouped the artifacts by the goal they serve; each group was read for what it costs to keep true, with the latest `main` CI runs and a local link-check run on a clean checkout as evidence; and the changes were proposed and traded off in the goal that would make them.
The product's behaviour, the `UT-01` sessions and their data, the content of the private usability-data repository, and the live state of the university VM were out of scope.

## Getting A Change Safely Into `main`

The goal is that nothing reaches `main`, and so the next release, without another member's review and a green set of checks.

- **Today:** [`CFG-01`](../../docs/configuration-plan.md#cfg-01), the branch protection and pull request flow; [`CFG-03`](../../docs/configuration-plan.md#cfg-03), the forms and the pull request template; and the five checks, [`CFG-04`](../../docs/configuration-plan.md#cfg-04) to [`CFG-08`](../../docs/configuration-plan.md#cfg-08).
  Only the link check is a required status check; the product checks, the Markdown check, the workflow lint, and the docs build report on every pull request but do not block a merge, per the `**Connections:**` of [`CFG-01`](../../docs/configuration-plan.md#cfg-01) and [`CFG-04`](../../docs/configuration-plan.md#cfg-04).
- **A more convenient way:** `Add` the "Product checks" `backend` and `frontend` jobs, the Markdown check, and the workflow lint to the required status checks of `main`, and `Keep` the link check required.
- **Why:** today a red product check is caught only if the reviewer opens the checks tab, so the gate is a manual step that depends on attention; making the checks required moves it into the setting, and the goal is still achieved because the review stays.
  The evidence is the protection setting itself, whose only required context is `lychee`, and the [21 November 2026 `main` run](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/actions/runs/44946213069), where the one check that blocks merges failed while the four that do not were green: the gate is on the check that fails for reasons outside the team's code, and off on the checks that fail for reasons inside it.
- **Tradeoffs:** a required check that is flaky or slow blocks every merge, including documentation-only pull requests, which still wait for the backend and frontend jobs to finish, and a renamed job leaves `main` waiting for a check that never reports until someone edits the setting.
  The team accepts this, because the product checks finish in a few minutes and were green on each of their last 50 runs on `main`, while a broken product on `main` costs a failed deploy on the VM, which can only be fixed from campus.

## Running The Same Checks Locally As In CI

The goal is that a member, or an agent, who runs the checks before pushing gets the same answer CI will give.

- **Today:** [`CFG-04`](../../docs/configuration-plan.md#cfg-04), the "Product checks" workflow, which is the source of truth; and three hand-written copies of its commands, in [`CFG-17`](../../docs/configuration-plan.md#cfg-17)'s setup page, [`CFG-18`](../../docs/configuration-plan.md#cfg-18)'s `AGENTS.md`, and [`CFG-19`](../../docs/configuration-plan.md#cfg-19)'s `CONTRIBUTING.md`.
- **A more convenient way:** `Cut` the command lists from `AGENTS.md` and `CONTRIBUTING.md`, replacing each with one sentence that links the setup page's "Run the checks and the tests" section, and `Keep` that one list, corrected to match `.github/workflows/product.yml` step for step.
- **Why:** the goal is still achieved by one list, and the change removes a duplication that has already gone stale in every copy.
  On the baseline the workflow runs `uv run mypy app` and `npm run format:check`, and none of the three copies lists either, while `CONTRIBUTING.md` says its commands are "the same checks CI runs"; `AGENTS.md` also gives the link check as `lychee --include-fragments .`, a flag the workflow does not pass, so a local run and the CI run check different things.
  A member who follows any copy can push a change that fails the type check or the format check, and an agent that reads `AGENTS.md` first is told the wrong set of checks before it writes any code.
- **Tradeoffs:** an agent and a new member must follow one link before they can run the checks, and if the setup page's section heading is renamed, the two links break.
  The team accepts it, because a link that breaks fails the link check in [`CFG-06`](../../docs/configuration-plan.md#cfg-06), while a command list that goes stale fails nothing and is believed; it also shortens `AGENTS.md`, which an agent reads into its context at the start of every session.

## Delivering The Same Build To Staging And Production

The goal is that the commit that passed on staging is the commit production runs, with the configuration each needs, and that any member on campus can do it.

- **Today:** [`CFG-09`](../../docs/configuration-plan.md#cfg-09), the runbook; [`CFG-10`](../../docs/configuration-plan.md#cfg-10), the configuration shape; [`CFG-17`](../../docs/configuration-plan.md#cfg-17), the compose files; [`CFG-12`](../../docs/configuration-plan.md#cfg-12), the telemetry configuration; and the tags of [`CFG-02`](../../docs/configuration-plan.md#cfg-02), which the runbook deploys and rolls back to.
  The team has no scheduled backup of the production database: the only backup is the manual dump in the runbook's deploy step, taken when a member deploys.
- **A more convenient way:** `Replace` the two hand-written env-file templates in the runbook with one instruction to copy `.env.example` on the VM and a table of only the values that differ between staging and production, the ports, the app address, and the passwords, named in words; `Keep` the manual deploy, because CI cannot reach the VM.
- **Why:** the goal is still achieved, and the change removes a second copy of the configuration shape that has gone stale.
  The runbook's templates set a database, the ports, the app address, and `ANTHROPIC_API_KEY`, while `.env.example` also carries the provider, model, and gateway variables and nine telemetry variables, which the runbook mentions only in its failed-deploy log and its telemetry section; the direct Claude route the template configures was dropped on 2026-11-15, per [`CFG-11`](../../docs/configuration-plan.md#cfg-11) and [`DEC-160`](../../docs/decisions.md#dec-160), so a member who rebuilds an env file from the runbook gets a production whose server cannot generate a card.
- **Tradeoffs:** the runbook is no longer a page a member can copy from top to bottom; they open `.env.example` and edit it on the VM, and the table must still be kept in step with the compose file's ports.
  The team accepts it, because the shape is already maintained in `.env.example` by every pull request that adds a variable, and the runbook's copy is maintained by nobody.
  The team would not add a database backup schedule this week: it needs a cron job on a VM the team reaches only from campus, and it has no `CFG-nn` until it exists.

## Releasing What Was Built

The goal is that each sprint's increment has a version the Customer can name, a note of what changed, and a tag the runbook can roll back to.

- **Today:** [`CFG-02`](../../docs/configuration-plan.md#cfg-02), `CHANGELOG.md` and the tags; and each `REL-nn` block in [`CFG-22`](../../docs/configuration-plan.md#cfg-22), the project plan.
- **A more convenient way:** `Keep` the changelog, the tags, and the plan's release blocks as they are.
- **Why:** each of the three is read by someone different, the changelog by whoever deploys, the tag by the runbook's rollback, and the plan's block by the instructor following the sprint, and the course requires all three, so none can be cut.
  The gaps on the baseline are conformance defects rather than too much configuration: `REL-04` was never tagged, so the tags jump from `v0.3.0` to `v0.6.0`, and the `0.6.0` section is not linked to its release; both are fixed under the existing rules, not by changing the set.
- **Tradeoffs:** keeping all three means a release is three edits in one pull request, and a forgotten one is a contradiction between them.
  The team keeps them, because the alternative, a release note only in GitHub's release page, is not in the repository snapshot the course grades.

## Planning And Tracking The Sprint

The goal is that every member, at the weekly review, can see what is in the sprint, who owns it, and which quality requirements are due.

- **Today:** [`CFG-03`](../../docs/configuration-plan.md#cfg-03), the forms, the milestones, and the project table view; [`CFG-22`](../../docs/configuration-plan.md#cfg-22), the project plan and its testing plan; and [`CFG-23`](../../docs/configuration-plan.md#cfg-23), the decisions log the stories cite.
- **A more convenient way:** `Keep` the set.
- **Why:** the schedule lives once, in the milestones, and the plan links them rather than copying them; the project table view is the only view the team keeps, per `CONTRIBUTING.md`.
  The three testing-plan rows that have moved twice, `QR-01`, `QR-03`, and `QR-06`, are work that was not done rather than a plan that was hard to keep: each move carries its reason, which is the plan doing its job.
- **Tradeoffs:** the decisions log is long, 161 entries, and a reader looking for one decision searches rather than reads, but each requirement and story cites its decision by anchor, so the length is the cost of the trail the Customer review relies on.

## Keeping The Context Trustworthy For A Reader Or An Agent

The goal is that a reader or an agent who starts from the repository's front door reaches the current rules, the current report, and the current state, and nothing older.

- **Today:** [`CFG-21`](../../docs/configuration-plan.md#cfg-21), the root `README.md` and the documentation index; [`CFG-18`](../../docs/configuration-plan.md#cfg-18), `AGENTS.md`; [`CFG-20`](../../docs/configuration-plan.md#cfg-20), the course skill; and [`CFG-24`](../../docs/configuration-plan.md#cfg-24), the weekly report folders.
- **A more convenient way:** `Merge` the root `README.md`'s "current week's report" line into the weekly report process: the pull request that adds `reports/week-NN/README.md` also moves that line and the course-skill pin, as one checkbox in the pull request template.
- **Why:** both pointers are moved by hand at the start of a week, and both were behind on the baseline: the root `README.md` names `reports/week-02/README.md` and links `reports/week-06/README.md` in Week 8, and the skill is pinned 29 commits behind the course's `main`, before the Week 8 materials, so an agent reading the pinned skill does not see this week's rules.
  Tying both to the one pull request that every week already has removes a manual step nobody owns, and the goal is still achieved because the line and the pin stay where the course requires them.
- **Tradeoffs:** the pull request template gains a checkbox that most pull requests, which are not weekly reports, must skip, and a checkbox can be ticked without being done.
  The team accepts it, because the alternative is a reminder in someone's memory, which has already failed twice on the baseline.

## What We Could Not Judge

The live state of the university VM: the staging and production env files, the running containers, and the telemetry instances' settings.
The VM is reachable only from the university network and the review was held off campus, so the team could not compare the env files with `.env.example` or confirm which generation route production is configured for.
The risk is environment drift, a production that differs from the runbook in a way the next member to deploy cannot see, which is why the risk register carries it.

The approval settings of the `main` branch protection, beyond its required status checks.
The review read the required checks from the repository's branch data; the approval count and the rule that the author cannot approve their own pull request are on the settings page, which was not opened in this review.
The risk is a protection weaker than [Branch Protection](https://github.com/inno-itpd/itpd/blob/main/requirements/repository-requirements.md#branch-protection) requires, which a member with admin access checks before the next submission.

## The First Change

The team would cut the check-command lists from `AGENTS.md` and `CONTRIBUTING.md` and keep one corrected list on the setup page first: it keeps every check and the one place a member and an agent learn how to run them, it removes two stale copies that already disagree with CI and with each other, and it is the smallest change that stops a member from pushing a change CI will fail.
Its main tradeoff is that an agent must follow one link before it can run a check, which the team accepts because a broken link fails the link check and a stale command list fails nothing.
