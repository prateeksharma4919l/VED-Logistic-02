#!/bin/sh
set -eu

export API_INTERNAL_PORT="${API_INTERNAL_PORT:-4000}"
export PORT="${PORT:-5000}"
export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-/api}"

node /app/backend/dist/index.js &
BACKEND_PID=$!

cleanup() {
  kill "$BACKEND_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT

cd /app/frontend
node /app/node_modules/next/dist/bin/next start -p "$PORT" -H 0.0.0.0
