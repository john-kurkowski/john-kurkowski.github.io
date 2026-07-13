#!/usr/bin/env bash

# Builds a deterministic synthetic Jujutsu repository and records three
# authentic `jj log` fixtures. Fixed identities, seeds, and timestamps keep the
# rendered graph stable across regenerations.

set -euo pipefail

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
project_root=$(cd "$script_dir/../../.." && pwd)
fixture_root=${1:-$(mktemp -d "${TMPDIR:-/tmp}/jj-stacked-diff.XXXXXX")}
fixture_dir=${2:-"$project_root/src/components/posts/jujutsu-for-ai-assisted-coding/fixtures"}

if [[ -e "$fixture_root/.jj" || -e "$fixture_root/.git" ]]; then
  echo "Refusing to overwrite an existing repository: $fixture_root" >&2
  exit 1
fi

mkdir -p "$fixture_root" "$fixture_dir"

seed=1000
timestamp_seconds=0

run_jj() {
  local name=$1
  local email=$2
  shift 2

  seed=$((seed + 1))
  timestamp_seconds=$((timestamp_seconds + 1))
  local timestamp
  printf -v timestamp '2026-07-13T09:00:%02d-07:00' "$timestamp_seconds"

  jj \
    --no-pager \
    --config "user.name=$name" \
    --config "user.email=$email" \
    --config "debug.randomness-seed=$seed" \
    --config "debug.commit-timestamp=$timestamp" \
    --config "debug.operation-timestamp=$timestamp" \
    "$@"
}

alice_jj() {
  run_jj "Alice Example" "alice@example.com" "$@"
}

bob_jj() {
  run_jj "Bob Example" "bob@example.com" "$@"
}

commit_file() {
  local author=$1
  local description=$2
  local path=$3
  local contents=$4

  mkdir -p "$(dirname "$path")"
  printf '%s\n' "$contents" >"$path"
  "${author}_jj" commit -m "$description"
}

capture_log() {
  local destination=$1

  alice_jj \
    --color=never \
    --config 'revsets.log=all()' \
    --config 'ui.graph.style=curved' \
    log >"$destination"
}

cd "$fixture_root"
alice_jj git init .

commit_file alice "Set up project" changes/setup.txt "project setup"
fork_revision=$(alice_jj log -r @- --no-graph -T 'change_id.shortest(8)')

alice_jj new "$fork_revision"
commit_file bob "Update dependencies" changes/dependencies.txt "dependencies updated"
commit_file alice "Harden CI" changes/ci.txt "CI hardened"
alice_jj bookmark set main -r @-

alice_jj new "$fork_revision"
commit_file alice "Add parser" changes/parser.txt "parser added"
alice_jj bookmark set parser -r @-
commit_file bob "Expose parser API" changes/api.txt "parser API exposed"
bob_jj bookmark set parser-api -r @-

alice_jj new parser-api
commit_file alice "Prototype streaming parser" changes/streaming.txt "streaming parser prototype"
commit_file bob "Benchmark streaming parser" changes/benchmark.txt "streaming parser benchmark"

bob_jj new parser-api
commit_file bob "Handle invalid input" changes/invalid-input.txt "invalid input handled"
commit_file alice "Add validation tests" changes/validation-tests.txt "validation tests added"
alice_jj bookmark set parser-validation -r @-
commit_file alice "Document parser errors" changes/parser-errors.txt "parser errors documented"
alice_jj bookmark set parser-errors -r @-

bob_jj new parser-errors
commit_file bob "Try structured errors" changes/structured-errors.txt "structured errors explored"

bob_jj new parser-errors
commit_file bob "Integrate parser" changes/integration.txt "parser integrated"
bob_jj bookmark set parser-integration -r @-

alice_jj new main
capture_log "$fixture_dir/01-before.txt"

alice_jj squash --from 'main..parser' --onto main -m "Add parser"
alice_jj bookmark set main -r 'heads(main::) & ~@'
alice_jj new main
capture_log "$fixture_dir/02-squash-merged.txt"

alice_jj rebase --branch parser-api --onto main
capture_log "$fixture_dir/03-restacked.txt"

printf 'Fixture repository: %s\n' "$fixture_root"
printf 'Captured fixtures: %s\n' "$fixture_dir"
