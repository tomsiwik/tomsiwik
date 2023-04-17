#!/usr/bin/env bash

yabai -m query --spaces | \
  jq -r 'map(select(."has-focus"==false and ."windows" == []).index) | .[]' | \
  xargs -I % yabai -m space % --destroy

yabai -m window --focus first
