# CADOCA — Game Design Document v1.0
## Ca.pybaras, Do.gs, Ca.ts — The Great Pet War

---

## 1. TRAVIAN REFERENCE — What We're Copying & What We're Changing

### Travian Core Loop (proven over 20 years, 5M+ players)
1. **Resources** → 4 types produced by upgradable fields (Wood, Clay, Iron, Crop)
2. **Buildings** → 22 building slots in village center, each with prerequisites & levels 1-20
3. **Troops** → Trained in barracks/stable/workshop. Each has ATK, DEF-infantry, DEF-cavalry, speed, carry capacity, upkeep
4. **Expansion** → Found/conquer new villages via settlers or administrators
5. **Combat** → Send troops to attack/raid/reinforce. Battle resolves via formulas
6. **Alliances** → Player cooperation for territory control
7. **Endgame** → Build Wonder of the World to level 100 (alliance effort)
8. **Server rounds** → Games have fixed duration (weeks/months), then reset

### What CADOCA Keeps (proven mechanics)
- 4 resources per faction + 1 universal (Morale = Travian's Crop equivalent — consumed by everything)
- Village center with building slots (18 slots instead of 22 — simpler)
- Building prerequisites & upgrade levels (1-10 instead of 1-20 — faster progression)
- Troop training with ATK/DEF stats, speed, carry capacity, upkeep
- Build queues (one building at a time unless you have specific buildings)
- Research/academy system to unlock advanced troops
- Rally point for army management
- Warehouses to increase storage capacity
- Walls for base defense
- Hero unit that gains XP

### What CADOCA Changes (our twist)
- **3 asymmetric factions** instead of 3 similar ones → each faction plays a DIFFERENT game genre in solo
- **Morale as 5th resource** instead of Crop → faction-specific ways to generate it, affects everything
- **Sumi-e fog of war** → map starts as ink-wash painting, scouting reveals in brushstroke style
- **Shield hours** → can't be attacked for X time after big loss (anti-grief)
- **Rubble-not-ruin** → destroyed buildings become rubble (rebuild at 50% cost) instead of vanishing
- **Diminishing raid returns** → raiding same target repeatedly gives less each time
- **4-week seasons** instead of months-long server rounds
- **Shin-Chan art style** → deliberately bad, comically charming animal characters
- **Solo mode** → playable offline against AI (Travian is multiplayer-only)

---

## 2. FACTIONS — Asymmetric Design

### Travian Reference:
| Travian | Romans | Gauls | Teutons |
|---------|--------|-------|---------|
| Style | Balanced/expensive | Defensive/fast | Aggressive/cheap |
| Unique | Build 2 things at once | Trapper building | Brewery (ATK boost) |
| Troops | Expensive, strong | Fast, good DEF | Cheap, high ATK |
| Merchants | Slow, low capacity | Fast, medium | Slow, high capacity |

### CADOCA Factions:

#### 🐹 CAPYBARAS — "The Chill Empire" (≈ Romans)
**Philosophy:** "Why fight when you can vibe?"
**Playstyle:** Economy-focused builders. Strongest production, weakest military. Win by building the Grand Hot Spring (Wonder).
**Solo Mode:** City builder + tower defense. Build your Wonder while surviving escalating raids.

**Resources:**
| Resource | Travian Equivalent | Production Building | Description |
|----------|-------------------|---------------------|-------------|
| 🌿 Grass | Wood | Grass Meadow (Lv 1-10) | "It's grass. You eat it. Simple pleasures." |
| 🟤 Mud | Clay | Mud Pit (Lv 1-10) | "Premium artisanal mud. Spa-grade." |
| ✨ Vibes | Iron | Vibe Garden (Lv 1-10) | "Nobody knows how vibes are harvested. Don't ask." |
| 🍊 Orange Peels | Crop (consumed) | Peel Grove (Lv 1-10) | "The only currency that smells nice." |
| 😊 Morale | - | Hot Spring (special) | Boosted by: communal bathing, being left alone, sunsets |

**Buildings (18 slots):**
| # | Building | Max Lv | Prereqs | Function | Travian Equivalent |
|---|----------|--------|---------|----------|-------------------|
| 1 | Main Lodge | 10 | - | Reduces build time (-5%/lv) | Main Building |
| 2 | Grass Barn | 10 | - | Stores 🌿🟤✨ (+800/lv) | Warehouse |
| 3 | Peel Cellar | 10 | - | Stores 🍊 (+600/lv) | Granary |
| 4 | Nap Barracks | 10 | Main Lodge 3, Rally Pond 1 | Train infantry | Barracks |
| 5 | Rally Pond | 10 | - | Army management, send troops | Rally Point |
| 6 | Mud Wall | 10 | - | Base DEF bonus (+3%/lv) | Wall |
| 7 | Chill Academy | 10 | Nap Barracks 3 | Research troop upgrades | Academy |
| 8 | Hot Spring | 5 | Main Lodge 5 | +Morale generation. FACTION UNIQUE | (unique) |
| 9 | Marketplace | 10 | Main Lodge 3, Grass Barn 3 | Trade resources | Marketplace |
| 10 | Snoot Tower | 10 | Main Lodge 5 | Scout enemy, reveal fog tiles | (Scouting) |
| 11 | Vibe Shrine | 5 | Vibe Garden 5, Main Lodge 5 | +15% all production/lv | (unique) |
| 12 | Capybara Embassy | 10 | Main Lodge 5 | Alliance features (multiplayer) | Embassy |
| 13 | Workshop | 10 | Chill Academy 5, Nap Barracks 5 | Build siege units | Workshop |
| 14 | Hammock Station | 5 | Nap Barracks 5 | Train 2nd queue simultaneously | Great Barracks |
| 15 | Grand Hot Spring | 100 | ALL buildings Lv 5+ | WIN CONDITION. 100 levels. | Wonder of World |
| 16 | Residence | 10 | Main Lodge 5 | Train settlers, culture points | Residence |
| 17 | Herbalist Hut | 10 | Main Lodge 3 | Heal wounded troops (+10%/lv return rate) | (unique) |
| 18 | Sunset Deck | 5 | Hot Spring 3 | Passive Morale regen even during attacks | (unique) |

**Troops (8 types):**
| Unit | ATK | DEF-Inf | DEF-Cav | Speed | Carry | Upkeep | Train Time | Special |
|------|-----|---------|---------|-------|-------|--------|------------|---------|
| Chill Guard | 20 | 50 | 40 | 4 | 20 | 1🍊 | 0:20 | Tank. "Doesn't even flinch." |
| Splash Warrior | 40 | 30 | 25 | 5 | 35 | 1🍊 | 0:25 | Melee DPS. Belly flop attack. |
| Snoot Archer | 35 | 20 | 35 | 6 | 25 | 1🍊 | 0:30 | Ranged. Shoots orange seeds. |
| Zen Master | 15 | 60 | 55 | 3 | 10 | 2🍊 | 0:45 | Healer/support. +10% DEF aura. |
| Spa Scout | 0 | 10 | 5 | 9 | 0 | 1🍊 | 0:15 | Scout. "Just vibing... and spying." |
| Mud Golem | 80 | 40 | 30 | 3 | 50 | 3🍊 | 1:00 | Cavalry equivalent. Heavy hitter. |
| Hot Spring Ram | 50 | 30 | 70 | 2 | 0 | 3🍊 | 1:30 | Siege. Destroys buildings. |
| Elder Capybara | 30 | 40 | 40 | 4 | 0 | 4🍊 | 3:00 | Administrator. Reduces loyalty. |

**Hero:** The Absolute Unit — A giant capybara wearing a crown made of orange peels. Gains XP, can equip items (Towel of Power, Sunglasses of Wisdom, etc.)

---

#### 🐱 CATS — "The Shadow Syndicate" (≈ Gauls + Teutons hybrid)
**Philosophy:** "If it exists, it can be knocked off a table."
**Playstyle:** Raid-focused. Fast, deadly, fragile. Best scouts, best cavalry, worst defense.
**Solo Mode:** Speedrun raider. Hit loot threshold before timer expires against fortified AI villages.

**Resources:**
| Resource | Travian Equivalent | Production Building | Description |
|----------|-------------------|---------------------|-------------|
| 🐟 Fish | Wood | Fish Pond (Lv 1-10) | "Stolen from someone's plate, probably." |
| 🧶 Yarn | Clay | Yarn Mill (Lv 1-10) | "Unraveled from a perfectly good sweater." |
| 😴 Naps | Iron | Nap Chamber (Lv 1-10) | "Energy stored as potential chaos." |
| 📦 Cardboard | Crop (consumed) | Box Factory (Lv 1-10) | "If it fits, I sits. If it doesn't fit, I sits harder." |
| 😈 Morale | - | Scratching Post (special) | Boosted by: knocking things over, successful raids, ignoring owners |

**Buildings (18 slots):**
| # | Building | Max Lv | Prereqs | Function |
|---|----------|--------|---------|----------|
| 1 | Main Den | 10 | - | Reduces build time |
| 2 | Fish Vault | 10 | - | Resource storage |
| 3 | Box Warehouse | 10 | - | 📦 storage |
| 4 | Shadow Barracks | 10 | Main Den 3, Rally Alley 1 | Train infantry |
| 5 | Rally Alley | 10 | - | Army management |
| 6 | Hairball Wall | 10 | - | Base DEF (+3%/lv) |
| 7 | Chaos Academy | 10 | Shadow Barracks 3 | Research upgrades |
| 8 | Scratching Post | 5 | Main Den 5 | +Morale. FACTION UNIQUE |
| 9 | Black Market | 10 | Main Den 3, Fish Vault 3 | Trade (better rates than others) |
| 10 | Night Watch Tower | 10 | Main Den 5 | Scouting + counter-espionage |
| 11 | Throne of Ego | 5 | Nap Chamber 5, Main Den 5 | +20% raid loot capacity/lv |
| 12 | Cat Embassy | 10 | Main Den 5 | Alliance features |
| 13 | Siege Workshop | 10 | Chaos Academy 5 | Build siege units |
| 14 | Midnight Stable | 10 | Shadow Barracks 5 | Train cavalry (FASTER than other factions) |
| 15 | Litter Throne | 100 | ALL buildings Lv 5+ | Wonder equivalent (for multiplayer) |
| 16 | Residence | 10 | Main Den 5 | Settlers, culture points |
| 17 | Trap Room | 10 | Hairball Wall 3 | Traps that catch attackers (like Gaul Trapper) |
| 18 | Catnip Lab | 5 | Chaos Academy 3 | +15% troop ATK but -10% DEF |

**Troops (8 types):**
| Unit | ATK | DEF-Inf | DEF-Cav | Speed | Carry | Upkeep | Train Time | Special |
|------|-----|---------|---------|-------|-------|--------|------------|---------|
| Shadow Pouncer | 60 | 15 | 10 | 7 | 50 | 1📦 | 0:15 | Fast infantry. Glass cannon. |
| Yarn Tangler | 25 | 40 | 35 | 5 | 20 | 1📦 | 0:20 | Crowd control. Slows enemies. |
| Whisker Spy | 0 | 15 | 10 | 12 | 0 | 1📦 | 0:10 | FASTEST scout in game. |
| Hairball Catapult | 45 | 10 | 5 | 3 | 0 | 3📦 | 1:30 | Siege. "Aim for the curtains." |
| Midnight Rider | 100 | 25 | 20 | 10 | 80 | 2📦 | 0:40 | Cavalry. Best raider in game. |
| Aloof General | 35 | 30 | 30 | 6 | 30 | 2📦 | 0:50 | Commander. +15% ATK to army. |
| Table Flipper | 70 | 20 | 60 | 2 | 0 | 3📦 | 1:20 | Siege ram. "EVERYTHING MUST GO." |
| Fat Cat Lord | 25 | 50 | 50 | 3 | 0 | 4📦 | 3:00 | Administrator. Charm reduces loyalty. |

**Hero:** The Void Starer — A black cat that stares at nothing and destroys morale. Equippable: Laser Pointer of Destiny, Cardboard Armor of Invincibility, etc.

---

#### 🐕 DOGS — "The Loyal Legion" (≈ Romans defense focus)
**Philosophy:** "HOLD. THE. LINE. Also, fetch?"
**Playstyle:** Territory control. Best defense, best walls, slowest but strongest troops.
**Solo Mode:** Survival horde mode. Defend against endless waves. How long can you hold?

**Resources:**
| Resource | Travian Equivalent | Production Building | Description |
|----------|-------------------|---------------------|-------------|
| 🦴 Bones | Wood | Bone Yard (Lv 1-10) | "Dug up from the yard. Don't ask whose." |
| 🪵 Sticks | Clay | Stick Depot (Lv 1-10) | "THE BEST STICK. Every stick is the best stick." |
| 🫱 Belly Rubs | Iron | Rub Spa (Lv 1-10) | "Currency of the realm. Non-transferable (just kidding)." |
| 🎾 Tennis Balls | Crop (consumed) | Ball Launcher (Lv 1-10) | "Chewed but functional. Mostly." |
| 🥰 Morale | - | Good Boy Shrine (special) | Boosted by: being told good boy, fetch, successful defenses |

**Buildings (18 slots):**
| # | Building | Max Lv | Prereqs | Function |
|---|----------|--------|---------|----------|
| 1 | Main Kennel | 10 | - | Reduces build time |
| 2 | Bone Locker | 10 | - | Resource storage |
| 3 | Ball Pit | 10 | - | 🎾 storage |
| 4 | Bark Barracks | 10 | Main Kennel 3, Rally Yard 1 | Train infantry |
| 5 | Rally Yard | 10 | - | Army management |
| 6 | Big Fence | 10 | - | Base DEF (+5%/lv — BEST WALL) |
| 7 | Howl Academy | 10 | Bark Barracks 3 | Research upgrades |
| 8 | Good Boy Shrine | 5 | Main Kennel 5 | +Morale. FACTION UNIQUE |
| 9 | Barter Post | 10 | Main Kennel 3, Bone Locker 3 | Trade (slow merchants, BIG capacity) |
| 10 | Watch Post | 10 | Main Kennel 5 | Scouting |
| 11 | Pack Hall | 5 | Rub Spa 5, Main Kennel 5 | +20% DEF for all troops in village/lv |
| 12 | Dog Embassy | 10 | Main Kennel 5 | Alliance |
| 13 | Dig Workshop | 10 | Howl Academy 5 | Siege units |
| 14 | Heavy Kennel | 10 | Bark Barracks 5 | Train heavy infantry (TANKIEST units) |
| 15 | Monument of Loyalty | 100 | ALL buildings Lv 5+ | Wonder equivalent |
| 16 | Residence | 10 | Main Kennel 5 | Settlers, culture points |
| 17 | Bunker | 10 | Big Fence 5 | Hides resources from raiders (like Cranny) |
| 18 | Howl Tower | 5 | Pack Hall 3 | Alerts nearby allies, +DEF during attacks |

**Troops (8 types):**
| Unit | ATK | DEF-Inf | DEF-Cav | Speed | Carry | Upkeep | Train Time | Special |
|------|-----|---------|---------|-------|-------|--------|------------|---------|
| Loyal Guard | 30 | 60 | 55 | 4 | 30 | 1🎾 | 0:25 | Tank. +10% DEF near own buildings. |
| Fetch Runner | 55 | 35 | 25 | 7 | 45 | 1🎾 | 0:20 | Fast melee. "Ball? BALL!" |
| Bark Cannon | 45 | 25 | 40 | 4 | 20 | 1🎾 | 0:30 | Ranged AoE. Literally barks so loud it hurts. |
| Nose Scout | 0 | 20 | 15 | 8 | 0 | 1🎾 | 0:15 | Scout. "I SMELL EVERYTHING." |
| Pack Leader | 40 | 45 | 45 | 5 | 25 | 2🎾 | 0:50 | Commander. Rallies nearby troops +10% all stats. |
| Armored Retriever | 90 | 70 | 50 | 3 | 60 | 3🎾 | 1:00 | Heavy cavalry. TANKIEST unit in game. |
| Dig Tunneler | 55 | 25 | 80 | 2 | 0 | 3🎾 | 1:30 | Siege. Digs under walls. |
| Alpha Dog | 35 | 55 | 55 | 4 | 0 | 4🎾 | 3:00 | Administrator. Intimidation reduces loyalty. |

**Hero:** The Goodest Boy — A golden retriever in a tin can helmet with a stick sword. Everyone loves him. +Morale just by existing.

---

## 3. CORE SYSTEMS

### 3.1 Resource System (from Travian)
- Each village has 18 resource fields surrounding it (like Travian's layout)
  - CADOCA: 5 of each basic resource + 3 of the "crop" equivalent = 18 fields
  - But we simplify: 4 resource types × 4 fields + 2 bonus fields = 18
- Fields upgrade from Lv 1-10. Each level increases output.
- Production formula: `base_output × level × (1 + bonus_modifiers)`
- Resources stored in warehouses/granaries. Overflow is lost.
- Troops consume the 4th resource (🍊/📦/🎾) as upkeep — if net goes negative, troops start dying (like Travian crop starvation)

### 3.2 Building System
- 18 building slots in village center
- Only 1 building can be constructed/upgraded at a time (unless special building)
- Build time formula: `base_time × 1.5^(level-1) / (1 + main_building_bonus)`
- Prerequisites must be met before building
- Destroying a building: instant, gives back 25% resources, leaves rubble
- Rubble: can be rebuilt at 50% cost (CADOCA unique — Travian buildings just disappear)

### 3.3 Combat System
Travian uses a mathematical formula. CADOCA adds a tactical layer:

**Pre-battle choice (Rock-Paper-Scissors):**
- ⚔️ **CHARGE** → Beats FLANK (overwhelm), Loses to DEFEND (run into wall)
- 🏹 **FLANK** → Beats DEFEND (hit from sides), Loses to CHARGE (overrun)
- 🛡️ **DEFEND** → Beats CHARGE (hold the line), Loses to FLANK (outmaneuvered)

**Resolution:**
1. Both sides pick a tactic
2. Winner gets +25% ATK bonus for the battle
3. Battle resolves using Travian-style formula:
   - `damage_dealt = attacker_ATK_total × (1 + tactic_bonus) / defender_DEF_total`
   - Losses calculated proportionally
4. Surviving attackers carry loot up to carry capacity
5. Battle report generated with funny flavor text

**Solo mode:** AI picks tactics based on faction personality:
- Cat AI: 60% Charge, 30% Flank, 10% Defend
- Dog AI: 10% Charge, 30% Flank, 60% Defend
- Capybara AI: 33% each (balanced/unpredictable)

### 3.4 Map System
- 20×20 grid (expandable for multiplayer)
- Each tile: terrain type (plains, forest, swamp, mountain, water)
- Fog of war: all tiles start hidden (ink-wash aesthetic)
- Scouting: send scouts to reveal tiles (stays revealed)
- Tiles can contain: empty land, your village, AI village, resource oasis, ruins
- Oases: capture for +25% resource bonus (like Travian)
- Movement: troops travel at speed of slowest unit. 1 tile per speed point per tick.

### 3.5 Wave System (Solo Mode)
Waves escalate based on game time and faction:

**Capybara Solo (Tower Defense + City Builder):**
- Wave 1-5: Small cat raiding parties (3-5 Shadow Pouncers)
- Wave 6-10: Cat raids + dog scout probes
- Wave 11-20: Mixed assaults, siege units appear
- Wave 21-30: Full faction armies, multiple attacks per wave
- Wave 31+: Boss waves (Fat Cat Lord + army, Alpha Dog + army)
- **Win:** Build Grand Hot Spring to Lv 100
- **Lose:** Village destroyed

**Cat Solo (Speedrun Raider):**
- Map has 10 AI villages of increasing difficulty
- Timer: 30 minutes real-time
- Must accumulate 10,000 total loot
- Villages get harder: more troops, better walls, traps
- **Win:** Hit loot target before timer
- **Lose:** Timer expires

**Dog Solo (Survival Horde):**
- Endless waves of cats and capybaras
- Each wave: +10% more troops, +5% stronger
- Between waves: 60 seconds to build/repair/train
- Score = wave number reached
- **Win:** There is no win. Only endurance. Leaderboard.
- **Lose:** Village falls

### 3.6 Morale System (5th Resource — CADOCA unique)
- Range: 0-100
- Affects: troop ATK (+/- 20% at extremes), build speed (+/- 15%), production (+/- 10%)
- At 0 Morale: troops may desert (5% chance per tick), production halved
- At 100 Morale: everything runs at 120% efficiency
- Natural decay: -1 per tick (always draining)
- Faction-specific boosts:
  - Capybara: Hot Spring (+5/tick when built), winning defense (+10), sunset event (+3)
  - Cat: Successful raid (+8), knocking things event (+5), Scratching Post (+3/tick)
  - Dog: Defense win (+10), Good Boy Shrine (+4/tick), fetch event (+5)

### 3.7 Shield System (Anti-Grief)
- Triggered when losing >50% of army in a single battle
- Duration: 2 hours (can't be attacked)
- Cooldown: 6 hours between shields
- During shield: can build, train, heal — but can't attack
- Diminishing raid returns: raiding same target within 1 hour = 50% less loot, within 30 min = 75% less

### 3.8 Hero System
- One hero per player
- Gains XP from battles (win or lose)
- Level up: choose +ATK, +DEF, or +special ability
- Equippable items (found in adventures or crafted):
  - Weapon slot, Armor slot, Accessory slot
  - Items are funny: "Slightly Used Rubber Duck Shield (+5 DEF)", "Flip Flop of Doom (+12 ATK)"
- Hero death: respawns after 30 min, loses no XP
- Hero abilities (unlock at levels):
  - Lv 5: Rally Cry (+10% army ATK for 1 battle)
  - Lv 10: Inspire (+20% Morale for 10 min)
  - Lv 15: Faction Special (Capybara: Mass Heal, Cat: Shadow Strike, Dog: Iron Wall)
  - Lv 20: Ultimate (Capybara: Zen Mode — invulnerable 5 min, Cat: Nine Lives — survive lethal, Dog: Good Boy Protocol — double DEF 5 min)

---

## 4. UI LAYOUT

```
┌─────────────────────────────────────────────────────────┐
│  🌿 1,245  🟤 890  ✨ 567  🍊 2,100  😊 78/100  ⏰ Wave 12 │  ← Resource Bar
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  BUILD MENU  │          MAIN VIEW                       │
│              │    (Village / Map / Battle)               │
│  [Buildings] │                                          │
│  [Troops]    │    Switches between:                     │
│  [Research]  │    - Village view (buildings grid)        │
│  [Hero]      │    - Map view (20×20 canvas)             │
│              │    - Battle view (when combat active)     │
│              │                                          │
├──────────────┼──────────────────────────────────────────┤
│              │  BATTLE LOG / EVENT LOG                   │
│  ARMY PANEL  │  "A cat tried to knock over your wall.   │
│  [Units]     │   The wall didn't care. +5 Morale"       │
│  [Deploy]    │  "Wave 12 approaching from the north!"   │
│  [Recall]    │  "Your Mud Golem sat on 3 dogs. Oops."   │
└──────────────┴──────────────────────────────────────────┘
```

---

## 5. TECH ARCHITECTURE

```
cadoca/
├── index.html                 # Entry point
├── css/
│   ├── main.css              # Layout, panels, grid
│   ├── factions.css          # Faction-specific themes & colors
│   ├── animations.css        # Transitions, effects, combat
│   └── identity-card.css     # Shareable identity card styles
├── js/
│   ├── main.js               # Bootstrap, game init
│   ├── game.js               # Main game loop, tick system, state machine
│   ├── config.js             # ALL balance numbers (single source of truth)
│   ├── state.js              # Game state management, save/load
│   ├── factions/
│   │   ├── capybara.js       # Faction data, buildings, troops, solo AI
│   │   ├── cat.js            # Faction data, buildings, troops, solo AI
│   │   └── dog.js            # Faction data, buildings, troops, solo AI
│   ├── systems/
│   │   ├── resources.js      # Production, storage, overflow, upkeep
│   │   ├── buildings.js      # Construction, upgrades, prerequisites, queue
│   │   ├── units.js          # Training, army composition, deployment
│   │   ├── combat.js         # Battle resolution, tactics RPS, damage calc
│   │   ├── map.js            # Grid, fog of war, tile management, movement
│   │   ├── waves.js          # AI wave spawning, escalation curves, boss waves
│   │   ├── morale.js         # Morale calculation, effects, faction drivers
│   │   ├── hero.js           # Hero XP, levels, abilities, equipment
│   │   ├── events.js         # Random events, funny popups, triggers
│   │   ├── shield.js         # Shield hours, diminishing returns
│   │   └── audio.js          # Web Audio API, sound effects
│   ├── ui/
│   │   ├── hud.js            # Top bar, resources, wave counter, morale
│   │   ├── sidebar.js        # Build menu, troop training, research
│   │   ├── village-view.js   # Village center, building grid, click-to-build
│   │   ├── map-renderer.js   # Canvas, fog of war, sumi-e style, movement
│   │   ├── battle-view.js    # Battle animation, tactic selection, results
│   │   ├── battle-log.js     # Scrolling event/combat log
│   │   ├── dialogs.js        # Popups, confirmations, event notifications
│   │   ├── identity.js       # Faction oath, name generator, identity card
│   │   ├── tutorial.js       # First-time player guide, step by step
│   │   └── screens.js        # Title screen, faction select, victory/defeat
│   └── data/
│       ├── names.js          # Silly name generator data
│       ├── events.js         # Random event text database
│       ├── flavor.js         # Building/troop descriptions, battle quips
│       └── sprites.js        # SVG/Canvas drawing functions for all art
├── save/                      # localStorage key structure docs
└── README.md
```

---

## 6. GAME TICK SYSTEM

Like Travian, the game runs on ticks:
- **Fast tick:** Every 1 second (UI updates, animations)
- **Resource tick:** Every 10 seconds (resource production, upkeep deduction)
- **Game tick:** Every 60 seconds (building progress, troop training, wave timer, morale decay)
- **Wave tick:** Variable (time between waves decreases as game progresses)

Solo mode runs at accelerated speed compared to multiplayer (10x faster for satisfying solo sessions).

---

## 7. BALANCE PRINCIPLES

1. **Rock-Paper-Scissors at faction level:** Cats beat Capybaras (raiding economy), Dogs beat Cats (defensive wall), Capybaras outlast Dogs (superior economy)
2. **No unit should be strictly better** — every unit has a role
3. **Economy scales exponentially, military scales linearly** — late game favors builders
4. **Solo mode should take 30-60 min for a full session** — not Travian's weeks
5. **Difficulty curves:** Easy start, hard middle, desperate end (for Capybara/Dog), ticking clock pressure (for Cat)

---

## 8. FUNNY WRITING SAMPLES

**Building descriptions:**
- Mud Pit Lv 1: "It's a hole with mud in it. Revolutionary."
- Mud Pit Lv 5: "The mud has achieved consciousness. It's still mud though."
- Mud Pit Lv 10: "This is THE mud pit. Other mud pits aspire to be this mud pit."

**Battle log:**
- "Your Splash Warrior belly-flopped on 3 cats. They are VERY upset. (-45 HP)"
- "A Shadow Pouncer knocked your watchtower off the table. Wait, that's not how— oh, it is."
- "The Bark Cannon barked so loud the enemy dropped their swords. Then picked them up. Then dropped them again."
- "Your Loyal Guard refused to move. Not because of strategy. He saw a squirrel."

**Random events:**
- "A capybara fell asleep in the mud pit. Production halted. Morale +5 (he looks so peaceful)."
- "A dog dug up something in the yard. It's a boot. +3 Sticks, -2 Morale (it's YOUR boot)."
- "A cat stared at your wall for 6 hours. Nothing happened. Or did it? -3 Morale."
- "BREAKING: Tennis ball spotted. All dogs abandon posts. -30% DEF for 2 minutes."

---

## 9. SIGNUP FLOW

1. **Title Screen** → "CADOCA: The Great Pet War" with animated animals in trash armor
2. **Faction Selection** → Three panels with animated characters, faction description, playstyle preview
3. **Faction Oath** → Funny pledge (e.g., Capybara: "I solemnly swear to chill above all else, to bathe in hot springs even when under siege, and to never, EVER, rush.")
4. **Name Generation** → Random silly name with reroll button
   - Capybara names: "Lord Splashington", "Vibemaster General", "Sir Chills-a-Lot"
   - Cat names: "Shadow Fluffkins III", "The Void Starer", "Baron von Hairball"
   - Dog names: "Captain Borks", "Sir Fetch-a-Lot", "General Good Boy"
5. **Identity Card** → Shareable card with: faction crest, name, title, oath snippet, generated avatar
6. **Tutorial Start** → Guided first 5 minutes

---

## 10. VICTORY CONDITIONS

**Solo Mode:**
| Faction | Win Condition | Lose Condition | Score |
|---------|--------------|----------------|-------|
| Capybara | Grand Hot Spring Lv 100 | Village destroyed | Wonder level reached |
| Cat | 10,000 total loot in 30 min | Timer expires | Total loot collected |
| Dog | N/A (endless) | Village falls | Wave number reached |

**Multiplayer (future):**
- First alliance to build Wonder to Lv 100 wins the season
- 4-week seasons, then server resets
- Leaderboards per faction + overall

---

*This document is the source of truth. All implementation follows this blueprint.*
