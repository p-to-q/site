#!/usr/bin/env bash
set -u

sleep_seconds="${PUSH_RETRY_SLEEP_SECONDS:-5}"
low_speed_limit="${PUSH_LOW_SPEED_LIMIT:-1}"
low_speed_time="${PUSH_LOW_SPEED_TIME:-30}"

attempt=1

echo "Starting git push with auto-retry."
echo "Retry delay: ${sleep_seconds}s | lowSpeedLimit=${low_speed_limit} | lowSpeedTime=${low_speed_time}s"
echo "Stop anytime with Ctrl+C."

while true; do
  echo ""
  echo "[push-with-retry] Attempt #${attempt}"

  if git -c http.lowSpeedLimit="${low_speed_limit}" -c http.lowSpeedTime="${low_speed_time}" push "$@"; then
    echo "[push-with-retry] Push succeeded on attempt #${attempt}."
    exit 0
  fi

  exit_code=$?
  echo "[push-with-retry] Push failed with exit code ${exit_code}. Retrying in ${sleep_seconds}s..."
  sleep "${sleep_seconds}"
  attempt=$((attempt + 1))
done
