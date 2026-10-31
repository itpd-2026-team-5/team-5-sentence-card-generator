# Deployment

This is the runbook for deploying Sentence Cards to the university VM, where staging and production run side by side.
How to build, configure, and run the product on your own machine is in [Set up and run](setup.md); this page covers only what the deployment adds.

## The four environments

| Environment | What runs there                                                      | Who reaches it                                       | Configuration and secrets                       |
| ----------- | -------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| Development | The product on a team member's machine, with `docker-compose.yml`    | That team member                                     | Their own `.env`, from `.env.example`           |
| Integration | The `Product checks` and `Workflow lint` workflows on GitHub Actions | The team, through pull requests and `main`           | None: the tests need no API key and no database |
| Staging     | `compose.deploy.yml` as the `cards-staging` project on the VM        | The team, from the university network, port 8081     | `~/cards/staging.env` on the VM                 |
| Production  | `compose.deploy.yml` as the `cards-prod` project on the VM           | The customer, from the university network, port 8080 | `~/cards/prod.env` on the VM                    |

What each environment cannot do:

- Integration runs outside the university network, so the CI cannot reach the VM and has no deployment job; every deploy is done by hand from a campus machine.
- Development runs on the team member's own data, so a local run proves the code, not the deployment.
- Staging is not the customer's, so a test passing there is confidence, not acceptance.
- Production is where the core task is verified after a deploy, not where a quality requirement is tested.

## The VM

- The university gives the team one VM, which hosts both staging and production.
  It comes from the StudentsCoursesCloud portal, in the ITPD subscription: Ubuntu Linux 24.04 (64-bit), 4 vCPU, 4.5 GB of memory, and a 58 GB disk.
  Get it from the portal, recreate it from the portal's Ubuntu image, and set its password yourself.
  The first deploy, on 2026-10-31, used the VM as the portal provisioned it, unused, because the portal gave our account no recreate action and no console.
- The VM is reachable only from the university network: connect from a lab machine or from the campus network.
- You log in as `root`, so the `sudo` in the commands below is not needed.
- The VM's address and its password are not in this repository.
  The address is in the team's Moodle submission, and the password is in the team's password manager.
  Every command below reads the address from a variable you set in your own shell:

```sh
export VM_HOST=<university-vm-ipv4>
ssh "root@$VM_HOST"
```

### Prepare the VM once

On the VM, install Docker and Git, and clone the repository into `~/cards/app`:

```sh
sudo apt update && sudo apt install -y docker.io docker-compose-v2 git
sudo usermod -aG docker "$USER"   # then log out and in again
mkdir -p ~/cards
git clone https://github.com/itpd-2026-team-5/team-5-sentence-card-generator.git ~/cards/app
```

If the VM runs a firewall, open the four ports:

```sh
sudo ufw allow 8080/tcp && sudo ufw allow 8081/tcp && sudo ufw allow 8025/tcp && sudo ufw allow 8026/tcp
```

## The two deployments

Staging and production are two runs of the same `compose.deploy.yml` in the repository root, as two compose projects.
Each project has its own containers, its own database volume, its own email inbox, and its own env file, so a command aimed at one never touches the other's data.

| Deployment | Compose project | Env file              | App port | Email inbox port |
| ---------- | --------------- | --------------------- | -------- | ---------------- |
| Staging    | `cards-staging` | `~/cards/staging.env` | 8081     | 8026             |
| Production | `cards-prod`    | `~/cards/prod.env`    | 8080     | 8025             |

Each deployment runs four containers: PostgreSQL, the backend, the frontend served by nginx (which passes `/api` to the backend), and a Mailpit inbox that receives the account verification emails.
Open the inbox at the deployment's email port to click a verification link.

## Configuration

The variables are listed in [`.env.example`](https://github.com/itpd-2026-team-5/team-5-sentence-card-generator/blob/main/.env.example).
On the VM, create the two env files once, with different values, and keep them readable only by you:

```sh
cd ~/cards
cat > staging.env <<'EOF'
POSTGRES_USER=cards
POSTGRES_PASSWORD=<a staging database password>
POSTGRES_DB=cards
APP_PORT=8081
MAIL_PORT=8026
APP_URL=http://<university-vm-ipv4>:8081
ANTHROPIC_API_KEY=<the staging API key, or empty>
EOF
cat > prod.env <<'EOF'
POSTGRES_USER=cards
POSTGRES_PASSWORD=<a different production database password>
POSTGRES_DB=cards
APP_PORT=8080
MAIL_PORT=8025
APP_URL=http://<university-vm-ipv4>:8080
ANTHROPIC_API_KEY=<the production API key, or empty>
EOF
chmod 600 staging.env prod.env
```

The env files stay on the VM and are never committed.
Without an API key the server cannot write sentences, but a learner can still use their own key from the browser, per [ADR-002](architecture/adr/ADR-002.md).

## Deploy

Every deploy is the same commit going to staging first and then to production.
Run the steps on the VM, from a campus machine.

1. Check out the commit to deploy, the release candidate on `main`, and note its hash for the record:

   ```sh
   cd ~/cards/app
   git fetch --tags origin
   git checkout <commit-or-tag>
   git rev-parse HEAD
   ```

2. Deploy it to staging:

   ```sh
   docker compose -p cards-staging --env-file ~/cards/staging.env -f compose.deploy.yml up -d --build
   ```

3. Check staging: `curl http://localhost:8081/api/health` prints `{"status":"ok"}`, and the core task below works at `http://<university-vm-ipv4>:8081`.
   The backend runs the database migrations before it starts, so for about 30 seconds after a deploy the health check answers `502 Bad Gateway`; wait and try again.
   Run the week's `deployed` quality requirement tests against staging now.
   If staging fails, stop here: production keeps running the previous release.
4. Back up the production database before changing it:

   ```sh
   docker compose -p cards-prod --env-file ~/cards/prod.env -f compose.deploy.yml exec -T db \
     pg_dump -U cards cards > ~/cards/prod-$(date +%F-%H%M).sql
   ```

   Skip this on the very first production deploy, when there is no database yet.

5. Deploy the same checkout to production, without checking out anything in between:

   ```sh
   docker compose -p cards-prod --env-file ~/cards/prod.env -f compose.deploy.yml up -d --build
   ```

6. Verify production, below.

The containers restart on their own after a VM reboot.
To restart one deployment by hand, run the same command with `restart` in place of `up -d --build`, and see its logs with `logs -f backend`.

## Verify

After each production deploy, do the [core task](setup.md#complete-the-core-task) on `http://<university-vm-ipv4>:8080` from a campus machine, as a user would:

1. Create an account, and confirm it from the email in the inbox at `http://<university-vm-ipv4>:8025`.
2. Set the languages and the level, add a text, mark two words to learn, and generate into a deck.
3. Open the deck: there is one card for each marked word, with a new sentence and its translation.
4. Play the card's word, meaning, sentence, and translation from the same client and network; check that the expected pronunciation is heard, per [DEC-101](decisions.md#dec-101).

Record in the week's report the commit, the date, who checked, and what was seen, with a screenshot of the deck.
Use the placeholder, not the real address, in the report.
Keep live-generation and playback results separate from health checks or opening seeded cards; use [QR-08](quality-requirements/qr/QR-08.md) for the full deployment outcome.

## Roll back

When the production verification fails, put production back on the previous release, then fix the problem on `main` and deploy again through staging.

1. Check out the previous release's tag and redeploy production:

   ```sh
   cd ~/cards/app
   git checkout <previous-tag>
   docker compose -p cards-prod --env-file ~/cards/prod.env -f compose.deploy.yml up -d --build
   ```

2. If the failed release changed the database, restore the backup taken in step 4 of the deploy:

   ```sh
   docker compose -p cards-prod --env-file ~/cards/prod.env -f compose.deploy.yml exec -T db \
     psql -U cards -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;' cards
   docker compose -p cards-prod --env-file ~/cards/prod.env -f compose.deploy.yml exec -T db \
     psql -U cards cards < ~/cards/prod-<date>.sql
   ```

3. Verify the core task again, and record the failed deploy and the rollback below.

## Failed deploys

Each deploy that failed its check is recorded here: the date, the check that showed it, how it was recovered, and what to try first next time.

### 2026-10-31: Card generation cannot reach an LLM from the VM

- **What showed it:** on production, **Generate** answered "Could not reach the Claude API." with the server's key, and "Could not reach this base URL from the browser." with a learner's own key from a campus machine.
  On the VM, `curl https://api.anthropic.com/v1/messages` timed out and `curl https://openrouter.ai/api/v1/models` returned `403`, so the LLM providers are unreachable or refuse requests from the university network, while the rest of the internet, such as `apt` and GitHub, works.
- **How it was recovered:** no rollback, because the deployment itself works: sign-in, the texts, marking words, the decks, and studying run on production.
  Only writing new sentences is unavailable there.
- **What to try first next time:** an LLM gateway reachable from the university network, set as `ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN` in both env files, then `up -d` for each deployment; or, in the browser, **Settings → My own key** with that gateway's base URL.
  Check it from the VM first with `curl` against the gateway's address.
- **Customer submission decision:** [DEC-102](decisions.md#dec-102) accepts the demonstrated deployed version for the Week 5 submission despite blocked generation, and [DEC-103](decisions.md#dec-103) carries alternative-provider trials into the next sprint.
  This limited submission decision leaves the generation check outstanding; the runbook's verification steps and quality targets still apply.
  Check any proposed replacement provider from the VM and from the client path that will actually use it; an external VM or a particular provider has not been selected.
