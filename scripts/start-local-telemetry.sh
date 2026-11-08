#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
telemetry_override="${ITPD_TELEMETRY_OVERRIDE:-/tmp/itpd-telemetry.override.yml}"

if [[ ! -f "$telemetry_override" ]]; then
  echo "Local telemetry override not found: $telemetry_override" >&2
  exit 1
fi

cd "$project_dir"
docker compose -f docker-compose.yml -f "$telemetry_override" up -d --build backend frontend
