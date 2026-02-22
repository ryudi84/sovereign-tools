// cat.js — Cat faction data and solo AI
const CAT = {
  id: 'cat',
  name: 'The Shadow Syndicate',
  emoji: '🐱',
  motto: 'If it exists, it can be knocked off a table.',
  oath: "I solemnly swear to knock things off tables, to ignore all authority, and to sit in any box regardless of size. The Void is my ally.",

  resources: {
    r1: { name: 'Fish', icon: '🐟', building: 'fishPond' },
    r2: { name: 'Yarn', icon: '🧶', building: 'yarnMill' },
    r3: { name: 'Naps', icon: '😴', building: 'napChamber' },
    r4: { name: 'Cardboard', icon: '📦', building: 'boxFactory' }
  },

  buildings: {
    mainDen:        { name: 'Main Den',         maxLv: 10, prereqs: {},                            slot: 1,  icon: '🏠', desc: 'Reduces build time', effect: 'buildSpeed', value: 0.05 },
    fishVault:      { name: 'Fish Vault',       maxLv: 10, prereqs: {},                            slot: 2,  icon: '🏪', desc: 'Resource storage (+800/lv)', effect: 'storage', value: 800 },
    boxWarehouse:   { name: 'Box Warehouse',    maxLv: 10, prereqs: {},                            slot: 3,  icon: '📦', desc: 'Cardboard storage (+600/lv)', effect: 'granary', value: 600 },
    shadowBarracks: { name: 'Shadow Barracks',  maxLv: 10, prereqs: { mainDen: 3, rallyAlley: 1 }, slot: 4,  icon: '⚔️', desc: 'Train infantry', effect: 'barracks' },
    rallyAlley:     { name: 'Rally Alley',      maxLv: 10, prereqs: {},                            slot: 5,  icon: '🏴', desc: 'Army management', effect: 'rally' },
    hairballWall:   { name: 'Hairball Wall',    maxLv: 10, prereqs: {},                            slot: 6,  icon: '🧱', desc: 'Base DEF (+3%/lv)', effect: 'wall', value: 0.03 },
    chaosAcademy:   { name: 'Chaos Academy',    maxLv: 10, prereqs: { shadowBarracks: 3 },         slot: 7,  icon: '🎓', desc: 'Research upgrades', effect: 'academy' },
    scratchingPost: { name: 'Scratching Post',  maxLv: 5,  prereqs: { mainDen: 5 },               slot: 8,  icon: '🐾', desc: '+Morale', effect: 'morale', value: 3 },
    blackMarket:    { name: 'Black Market',     maxLv: 10, prereqs: { mainDen: 3, fishVault: 3 },  slot: 9,  icon: '🏴‍☠️', desc: 'Trade (better rates)', effect: 'market' },
    nightWatchTower:{ name: 'Night Watch Tower',maxLv: 10, prereqs: { mainDen: 5 },               slot: 10, icon: '🔭', desc: 'Scout + counter-espionage', effect: 'scout' },
    throneOfEgo:    { name: 'Throne of Ego',    maxLv: 5,  prereqs: { mainDen: 5 },               slot: 11, icon: '👑', desc: '+20% raid loot capacity/lv', effect: 'lootBonus', value: 0.2 },
    catEmbassy:     { name: 'Cat Embassy',      maxLv: 10, prereqs: { mainDen: 5 },               slot: 12, icon: '🏛️', desc: 'Alliance features', effect: 'embassy' },
    siegeWorkshop:  { name: 'Siege Workshop',   maxLv: 10, prereqs: { chaosAcademy: 5 },           slot: 13, icon: '🔧', desc: 'Build siege units', effect: 'workshop' },
    midnightStable: { name: 'Midnight Stable',  maxLv: 10, prereqs: { shadowBarracks: 5 },        slot: 14, icon: '🐴', desc: 'Train cavalry (FAST)', effect: 'stable' },
    litterThrone:   { name: 'Litter Throne',    maxLv: 100,prereqs: { _allLevel5: true },          slot: 15, icon: '🏆', desc: 'Wonder equivalent', effect: 'wonder', isWonder: true },
    residence:      { name: 'Residence',        maxLv: 10, prereqs: { mainDen: 5 },               slot: 16, icon: '🏘️', desc: 'Settlers', effect: 'residence' },
    trapRoom:       { name: 'Trap Room',        maxLv: 10, prereqs: { hairballWall: 3 },           slot: 17, icon: '🪤', desc: 'Catch attackers', effect: 'trap', value: 5 },
    catnipLab:      { name: 'Catnip Lab',       maxLv: 5,  prereqs: { chaosAcademy: 3 },          slot: 18, icon: '🧪', desc: '+15% ATK, -10% DEF', effect: 'atkBoost', value: 0.15 }
  },

  troops: {
    shadowPouncer:   { name: 'Shadow Pouncer',   atk: 60, defInf: 15, defCav: 10, speed: 7,  carry: 50, upkeep: 1, trainTime: 15,  type: 'infantry', prereq: { shadowBarracks: 1 } },
    yarnTangler:     { name: 'Yarn Tangler',     atk: 25, defInf: 40, defCav: 35, speed: 5,  carry: 20, upkeep: 1, trainTime: 20,  type: 'infantry', prereq: { shadowBarracks: 3 } },
    whiskerSpy:      { name: 'Whisker Spy',      atk: 0,  defInf: 15, defCav: 10, speed: 12, carry: 0,  upkeep: 1, trainTime: 10,  type: 'scout', prereq: { shadowBarracks: 1 } },
    hairballCatapult:{ name: 'Hairball Catapult', atk: 45, defInf: 10, defCav: 5,  speed: 3,  carry: 0,  upkeep: 3, trainTime: 90,  type: 'siege', prereq: { siegeWorkshop: 1 } },
    midnightRider:   { name: 'Midnight Rider',   atk: 100,defInf: 25, defCav: 20, speed: 10, carry: 80, upkeep: 2, trainTime: 40,  type: 'cavalry', prereq: { midnightStable: 1 } },
    aloofGeneral:    { name: 'Aloof General',     atk: 35, defInf: 30, defCav: 30, speed: 6,  carry: 30, upkeep: 2, trainTime: 50,  type: 'support', prereq: { chaosAcademy: 5 } },
    tableFlipper:    { name: 'Table Flipper',     atk: 70, defInf: 20, defCav: 60, speed: 2,  carry: 0,  upkeep: 3, trainTime: 80,  type: 'siege', prereq: { siegeWorkshop: 3 } },
    fatCatLord:      { name: 'Fat Cat Lord',      atk: 25, defInf: 50, defCav: 50, speed: 3,  carry: 0,  upkeep: 4, trainTime: 180, type: 'admin', prereq: { chaosAcademy: 10 } }
  },

  hero: {
    name: 'The Void Starer',
    desc: 'A black cat that stares at nothing and destroys morale.',
    baseAtk: 60, baseDef: 40,
    abilities: {
      5: { name: 'Rally Cry', desc: '+10% army ATK for 1 battle' },
      10: { name: 'Inspire', desc: '+20% Morale for 10 min' },
      15: { name: 'Shadow Strike', desc: 'Double damage on next attack' },
      20: { name: 'Nine Lives', desc: 'Survive one lethal hit' }
    }
  },

  soloMode: {
    type: 'speedrun',
    winCondition: 'Accumulate 10,000 total loot in 30 minutes',
    loseCondition: 'Timer expires',
    timer: 1800,
    lootTarget: 10000,
    villages: 10 // AI villages to raid
  },

  tacticWeights: { charge: 0.6, flank: 0.3, defend: 0.1 }
};
