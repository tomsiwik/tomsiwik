#!/usr/bin/env bash

direction=$1

display=$(yabai -m query --displays --display $direction | jq .index)

yabai -m window --display $display
yabai -m display --focus $display
