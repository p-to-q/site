#!/usr/bin/env bash
# git push with automatic retries for flaky networks.
# Usage: npm run push:retry -- origin main
set -u

sleep_seconds="${PUSH_RETRY_SLEEP_SECONDS:-5}"
max_attempts="${PUSH_MAX_ATTEMPTS:-20}"   # 0 = retry forever
low_speed_limit="${PUSH_LOW_SPEED_LIMIT:-1}"
low_speed_time="${PUSH_LOW_SPEED_TIME:-30}"

attempt=1

echo "Starting git push with auto-retry."
echo "Retry delay: ${sleep_seconds}s | max attempts: ${max_attempts} | lowSpeedLimit=${low_speed_limit} | lowSpeedTime=${low_speed_time}s"
echo "Stop anytime with Ctrl+C."

while true; do
  echo ""
  echo "[push-with-retry] Attempt #${attempt}"

  # Capture the status directly: `$?` after an if/fi block is the block's own
  # status (0), not git's.
  git -c http.lowSpeedLimit="${low_speed_limit}" -c http.lowSpeedTime="${low_speed_time}" push "$@"
  exit_code=$?

  if [ "${exit_code}" -eq 0 ]; then
    echo "[push-with-retry] Push succeeded on attempt #${attempt}."
    exit 0
  fi

  if [ "${max_attempts}" -gt 0 ] && [ "${attempt}" -ge "${max_attempts}" ]; then
    echo "[push-with-retry] Giving up after ${attempt} attempts (last exit code ${exit_code})."
    exit "${exit_code}"
  fi

  echo "[push-with-retry] Push failed with exit code ${exit_code}. Retrying in ${sleep_seconds}s..."
  sleep "${sleep_seconds}"
  attempt=$((attempt + 1))
done
