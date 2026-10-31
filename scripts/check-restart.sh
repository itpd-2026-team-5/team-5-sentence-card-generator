#!/usr/bin/env bash
# QR-07 QRT-01: committed data survives restarts of the staging deployment.
# Run on the university VM from the repository checkout, after the demo data is seeded on staging.
# It never touches production. See docs/quality-requirements/qr/QR-07.md#qrt-01.
set -euo pipefail

PROJECT=${PROJECT:-cards-staging}
ENV_FILE=${ENV_FILE:-$HOME/cards/staging.env}
STAGING_URL=${STAGING_URL:-http://localhost:8081}
CYCLES=${CYCLES:-3}

compose() { docker compose -p "$PROJECT" --env-file "$ENV_FILE" -f compose.deploy.yml "$@"; }
# The variables expand inside the db container, from its own environment.
# shellcheck disable=SC2016
psql_db() { compose exec -T db sh -c 'psql -v ON_ERROR_STOP=1 -At -U "$POSTGRES_USER" "$POSTGRES_DB" "$@"' sh "$@"; }

# One line per table: its name, its row count, and a hash of every row's values.
# Sessions are left out: signing in writes one, and they are not the learner's data.
snapshot() {
  psql_db <<'SQL'
SELECT format('SELECT %L, count(*), md5(coalesce(string_agg(t::text, %L ORDER BY t::text), %L)) FROM %I t',
              table_name, '|', '', table_name)
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type = 'BASE TABLE' AND table_name <> 'sessions'
ORDER BY table_name
\gexec
SQL
}

wait_healthy() {
  for _ in $(seq 1 60); do
    curl -sf "$STAGING_URL/api/health" >/dev/null && return 0
    sleep 2
  done
  echo "FAIL: staging did not answer /api/health within 120 seconds" >&2
  exit 1
}

# The learner's next scheduled card, through the API, as the learner sees it.
next_review() {
  local jar decks
  jar=$(mktemp)
  curl -sf -c "$jar" -H 'content-type: application/json' \
    -d '{"email":"learner@example.com","password":"learner-demo"}' "$STAGING_URL/api/auth/login" >/dev/null
  decks=$(curl -sf -b "$jar" "$STAGING_URL/api/decks" | python3 -c 'import json,sys; print(",".join(str(d["id"]) for d in json.load(sys.stdin)))')
  curl -sf -b "$jar" "$STAGING_URL/api/study?decks=$decks" | python3 -c 'import json,sys; c=json.load(sys.stdin)["card"]; print(c["id"] if c else "none")'
  rm -f "$jar"
}

index_check() {
  psql_db <<'SQL' >/dev/null
SET client_min_messages = warning;
CREATE EXTENSION IF NOT EXISTS amcheck;
SELECT bt_index_check(c.oid)
FROM pg_index i JOIN pg_class c ON c.oid = i.indexrelid JOIN pg_am a ON a.oid = c.relam
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE a.amname = 'btree' AND n.nspname = 'public';
SQL
}

cd "$(dirname "$0")/.."
wait_healthy
if [ "$(psql_db -c 'SELECT count(*) FROM cards')" = "0" ]; then
  echo "FAIL: staging has no cards; seed it first with: python -m app.seed" >&2
  exit 1
fi
echo "commit: $(git rev-parse HEAD)"
echo "target: $PROJECT at \$STAGING_URL"

failures=0
check() { # name, before, after
  if [ "$2" = "$3" ]; then echo "  $1: same"; else echo "  $1: CHANGED"; failures=$((failures + 1)); fi
}

for cycle in $(seq 1 "$CYCLES"); do
  before=$(snapshot)
  review_before=$(next_review)
  compose stop backend db >/dev/null 2>&1
  compose start db backend >/dev/null 2>&1
  wait_healthy
  after=$(snapshot)
  review_after=$(next_review)
  echo "cycle $cycle: stop and start of backend and db ($(echo "$after" | wc -l) tables, $(echo "$after" | awk -F'|' '{s += $2} END {print s}') rows)"
  check "records" "$before" "$after"
  check "next scheduled review (card $review_after)" "$review_before" "$review_after"
done

# A write interrupted by killing the database must leave the previous committed state.
before=$(snapshot)
# shellcheck disable=SC2016
compose exec -T db sh -c 'psql -U "$POSTGRES_USER" "$POSTGRES_DB" -c "BEGIN; UPDATE decks SET name = name || '"'"' (interrupted)'"'"'; SELECT pg_sleep(60); COMMIT;"' >/dev/null 2>&1 &
sleep 3
compose kill db >/dev/null 2>&1
wait || true
compose start db backend >/dev/null 2>&1
wait_healthy
after=$(snapshot)
echo "interrupted write: database killed during an uncommitted update of every deck"
check "records" "$before" "$after"

if index_check; then echo "integrity: every btree index passes amcheck"; else echo "integrity: amcheck FAILED"; failures=$((failures + 1)); fi

if [ "$failures" -eq 0 ]; then echo "PASS"; else echo "FAIL: $failures check(s) failed"; exit 1; fi
