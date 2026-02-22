# CADOCA — The Great Pet War 🐹🐱🐕

A Travian-style browser strategy game where capybaras, dogs, and cats wage war in trash armor.

## Play Now
**[https://ryudi84.github.io/sovereign-tools/cadoca/](https://ryudi84.github.io/sovereign-tools/cadoca/)**

## Factions
- **🐹 Capybaras** — Economy builders. Solo: City builder + tower defense. Build the Grand Hot Spring to win.
- **🐱 Cats** — Speed raiders. Solo: Hit 10,000 loot in 30 minutes.
- **🐕 Dogs** — Loyal defenders. Solo: Survive endless waves.

## Features
- 3 asymmetric factions with unique buildings, troops, and playstyles
- Rock-Paper-Scissors tactical combat (Charge > Flank > Defend)
- SVG-drawn art — no external images
- Save system with 3 slots + JSON export/import
- Hero system with XP, levels, and silly equipment
- Random events with funny flavor text
- Morale system affecting all aspects of gameplay

## Tech
- Pure HTML/CSS/JS — no frameworks, no dependencies
- All art generated via SVG strings
- Multiplayer-ready architecture (command pattern, serializable state)
- Web Audio API for sound effects

## Architecture
All game state lives in a single serializable object. All mutations go through `State.dispatch()` command system. Player ID on all entities. Ready for WebSocket multiplayer.

Built with vibes ✨
