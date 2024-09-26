#!/bin/sh

# The $NAME variable is passed from sketchybar and holds the name of
# the item invoking this script:
# https://felixkratz.github.io/SketchyBar/config/events#events-and-scripting

format="$1"

# Get the current time in 24-hour format
current_time=$(date +"%${format}")

# Define the translation
translate_chars='0123456789🯰🯱🯲🯳🯴🯵🯶🯷🯸🯹'

# Translate and print the time
time=$(echo "$current_time" | tr "${translate_chars:0:10}" "${translate_chars:10:20}")

sketchybar --set "$NAME" label="$time"