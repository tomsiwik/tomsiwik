#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
fixture_dir="$(mktemp -d)"
trap 'rm -rf "$fixture_dir"' EXIT

mkdir -p "$fixture_dir/bin"
cat > "$fixture_dir/bin/gh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

if [[ "${@: -1}" == "orgs/dojofoo/repos" ]]; then
  printf '%s\n' '[{"name":"dojofoo","homepage":"","description":"Practices & courses","topics":["active"],"stargazers_count":1}]'
else
  printf '%s\n' '[]'
fi
EOF
chmod +x "$fixture_dir/bin/gh"

PATH="$fixture_dir/bin:$PATH" bash "$repo_root/gen-projects-grid.sh" > "$fixture_dir/projects.svg"

grep -Fq 'Practices &amp; courses' "$fixture_dir/projects.svg"
