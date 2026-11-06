#!/usr/bin/env bash
# Usage: scripts/post-release-check.sh https://mtpapasadvisory.com
# Fails (exit 1) if a required security header is missing from the live site.
set -u
URL="${1:-https://mtpapasadvisory.com}"
HEADERS="$(curl -sSIL --max-time 20 "$URL")" || { echo "FAIL: could not reach $URL"; exit 1; }
fail=0
check() {
  if printf '%s' "$HEADERS" | grep -qi "^$1:"; then
    echo "ok    $1"
  else
    echo "MISSING $1"; fail=1
  fi
}
for h in "content-security-policy" "strict-transport-security" "x-content-type-options" \
         "referrer-policy" "permissions-policy" "cross-origin-opener-policy" "x-frame-options"; do
  check "$h"
done
# CSP should not allow unsafe inline script
if printf '%s' "$HEADERS" | grep -i "^content-security-policy:" | grep -qi "unsafe-inline"; then
  echo "WARN  CSP contains unsafe-inline"; fail=1
fi
exit $fail
