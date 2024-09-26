#!/usr/bin/env bash

windows=$(aerospace list-windows --workspace $FOCUSED_WORKSPACE | wc -l | tr -d '[:space:]')

if [ "$1" = "$FOCUSED_WORKSPACE" ]; then
    sketchybar --set $NAME background.drawing=on label.shadow.drawing=on label.color=0xffffffff label.shadow.color=0x80ffffff
    if [ "$windows" = "1" ]; then
        borders active_color=0x000000000
    else
        borders active_color='glow(0xffd7005f)'
    fi
else
    sketchybar --set $NAME background.drawing=off label.shadow.drawing=off label.color=0x60ffffff
fi
