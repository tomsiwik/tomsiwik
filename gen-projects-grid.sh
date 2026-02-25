#!/usr/bin/env bash
set -euo pipefail

# ── Fetch repos with "active" topic from GitHub ──
json=""
for src in "user/repos?affiliation=owner&per_page=100" orgs/wild-js/repos orgs/mvp-guru/repos; do
  json+="$(gh api --paginate "$src" 2>/dev/null)"
done

projects=()
while IFS= read -r line; do
  projects+=("$line")
done < <(
  printf '%s' "$json" | jq -r '
    [.[] | select(.topics | index("active"))]
    | sort_by(-.stargazers_count)
    | .[]
    | (if (.homepage // "") != "" then (.homepage | sub("https?://"; "") | sub("/+$"; "")) else .name end) as $name
    | ((.topics - ["active"]) | [.[] | select(. == "alpha" or . == "beta" or . == "preview" or . == "deprecated")] | first // "") as $tag
    | "\($name)|\(.description // "")|\($tag)"
  '
)

if [[ ${#projects[@]} -eq 0 ]]; then
  echo "No repos with 'active' topic found." >&2
  exit 1
fi

# ── Fetch favicons ──
favicons=()
for entry in "${projects[@]}"; do
  IFS='|' read -r name _ _ <<< "$entry"
  if [[ "$name" == *.* ]]; then
    favicons+=("$(curl -sfL "https://www.google.com/s2/favicons?domain=${name}&sz=64" | base64 || true)")
  else
    favicons+=("")
  fi
done

# ── Grid ──
cols=2
gap=16
row_h=56
row_gap=28
icon_size=32
w=814
col_w=$(( (w - gap * (cols - 1)) / cols ))
n=${#projects[@]}
rows=$(( (n + cols - 1) / cols ))
h=$(( rows * row_h + (rows - 1) * row_gap ))

# ── SVG open ──
printf '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="%d" height="%d" viewBox="0 0 %d %d">\n' "$w" "$h" "$w" "$h"

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

cat <<'DEFS'
  <defs>
    <clipPath id="circle-clip">
      <circle cx="16" cy="16" r="16"/>
    </clipPath>
  </defs>
DEFS

echo '  <g class="base">'
for i in "${!projects[@]}"; do
  IFS='|' read -r name desc tag <<< "${projects[$i]}"

  col=$((i % cols))
  row=$((i / cols))
  x=$((col * (col_w + gap)))
  y=$((row * (row_h + row_gap)))

  desc="$(printf '%s' "${desc:0:1}" | tr '[:lower:]' '[:upper:]')${desc:1}"

  # Truncate description to fit column width
  max_chars=$(( (col_w - icon_size - 12) / 7 ))  # ~7px per char at 12px font
  if [[ ${#desc} -gt $max_chars ]]; then
    desc="${desc:0:$((max_chars - 1))}…"
  fi

  if [[ $col -eq 0 && $row -gt 0 ]]; then
    rule_y=$((y - row_gap / 2))
    printf '  <line class="rule" x1="16" y1="%d" x2="%d" y2="%d"/>\n' "$rule_y" "$((w - 16))" "$rule_y"
  fi

  # Icon: 32x32 displayed (64px fetched for retina), vertically centered in row_h
  icon_y=$(( (row_h - icon_size) / 2 ))
  if [[ -n "${favicons[$i]}" ]]; then
    icon="<g transform=\"translate(0,$icon_y)\" clip-path=\"url(#circle-clip)\"><image width=\"$icon_size\" height=\"$icon_size\" href=\"data:image/png;base64,${favicons[$i]}\"/></g>"
  else
    initial=$(printf '%s' "${name:0:1}" | tr '[:lower:]' '[:upper:]')
    icon="<circle class=\"dot\" cx=\"16\" cy=\"$((row_h / 2))\" r=\"16\"/><text class=\"smaller bold muted\" x=\"16\" y=\"$((row_h / 2 + 4))\" text-anchor=\"middle\">$initial</text>"
  fi

  # Text: two lines vertically centered as a block
  text_x=$((icon_size + 12))
  line1_y=$((row_h / 2 - 4))
  line2_y=$((row_h / 2 + 12))

  cat <<EOF
  <g transform="translate($x,$y)">
    $icon
    <text class="fg" x="$text_x" y="$line1_y"><tspan class="bold">$name </tspan>$(
      [[ -n "$tag" ]] && printf '<tspan class="dimmed" font-size="10">%s</tspan>' "$tag"
    )</text>
    <text class="smaller muted" x="$text_x" y="$line2_y">$desc</text>
  </g>
EOF
done

echo '  </g>'
echo '</svg>'
