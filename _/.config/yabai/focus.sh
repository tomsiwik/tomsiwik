#!/usr/bin/env bash

direction=$1

display=$(yabai -m query --displays --display $direction | jq .index)
space=$(yabai -m query --spaces --space $direction | jq '.spaces | .[0]')

yabai -m display --focus $display
yabai -m space --focus $space
yabai -m window --focus first
