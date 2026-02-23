#!/usr/bin/env bash
set -euo pipefail

# ── Project data: name|description|tag ──
projects=(
  "dojocho.ai|shadcn of coding dojos for coding agent senseis|"
  "epicat.com|agentic workflow builder and hosting platform|alpha"
  "nerdbooks.net|librarian agent chat to find your favourite books|beta"
  "papercat.app|small apps to help your work environment|"
)

# ── Grid ──
cols=2
gap=16
row_h=56
row_gap=28
w=814
col_w=$(( (w - gap * (cols - 1)) / cols ))
n=${#projects[@]}
rows=$(( (n + cols - 1) / cols ))
h=$(( rows * row_h + (rows - 1) * row_gap ))

# ── SVG open ──
printf '<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d">\n' "$w" "$h" "$w" "$h"

cat <<'STYLE'
  <style>
    .base{font-family:-apple-system,"system-ui","Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";font-size:14px;font-weight:400}
    .bold{font-weight:600}
    .smaller{font-size:12px}
    .fg{fill:#1f2328}
    .muted{fill:#656d76}
    .dimmed{fill:#9ca3af}
    .dot{fill:rgba(0,0,0,.06)}
    .rule{stroke:rgba(0,0,0,.08);stroke-width:1}
    @media(prefers-color-scheme:dark){
      .fg{fill:#e6edf3}
      .muted{fill:#8b949e}
      .dimmed{fill:#6b7280}
      .dot{fill:rgba(255,255,255,.08)}
      .rule{stroke:rgba(255,255,255,.08)}
    }
  </style>
STYLE

echo '  <g class="base">'
for i in "${!projects[@]}"; do
  IFS='|' read -r name desc tag <<< "${projects[$i]}"

  col=$((i % cols))
  row=$((i / cols))
  x=$((col * (col_w + gap)))
  y=$((row * (row_h + row_gap)))

  initial=$(printf '%s' "${name:0:1}" | tr '[:lower:]' '[:upper:]')
  desc="$(printf '%s' "${desc:0:1}" | tr '[:lower:]' '[:upper:]')${desc:1}"

  if [[ $col -eq 0 && $row -gt 0 ]]; then
    rule_y=$((y - row_gap / 2))
    printf '  <line class="rule" x1="16" y1="%d" x2="%d" y2="%d"/>\n' "$rule_y" "$((w - 16))" "$rule_y"
  fi

  cat <<EOF
  <g transform="translate($x,$y)">
    <circle class="dot" cx="16" cy="22" r="16"/>
    <text class="smaller bold muted" x="16" y="26" text-anchor="middle">$initial</text>
    <text class="fg" x="44" y="22"><tspan class="bold">$name </tspan>$(
      [[ -n "$tag" ]] && printf '<tspan class="dimmed" font-size="10">%s</tspan>' "$tag"
    )</text>
    <text class="smaller muted" x="44" y="42">$desc</text>
  </g>
EOF
done

echo '  </g>'
echo '</svg>'
