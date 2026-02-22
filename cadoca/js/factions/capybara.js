// capybara.js — Capybara faction data and solo AI
const CAPYBARA = {
  id: 'capybara',
  name: 'The Chill Empire',
  emoji: '🐹',
  motto: 'Why fight when you can vibe?',
  oath: "I solemnly swear to chill above all else, to bathe in hot springs even when under siege, and to never, EVER, rush.",

  resources: {
    r1: { name: 'Grass', icon: '🌿', building: 'grassMeadow' },
    r2: { name: 'Mud', icon: '🟤', building: 'mudPit' },
    r3: { name: 'Vibes', icon: '✨', building: 'vibeGarden' },
    r4: { name: 'Orange Peels', icon: '🍊', building: 'peelGrove' }
  },

  buildings: {
    mainLodge:     { name: 'Main Lodge',      maxLv: 10, prereqs: {},                          slot: 1,  icon: '🏠', desc: 'Reduces build time (-5%/lv)', effect: 'buildSpeed', value: 0.05 },
    grassBarn:     { name: 'Grass Barn',       maxLv: 10, prereqs: {},                          slot: 2,  icon: '🏪', desc: 'Stores Grass/Mud/Vibes (+800/lv)', effect: 'storage', value: 800 },
    peelCellar:    { name: 'Peel Cellar',      maxLv: 10, prereqs: {},                          slot: 3,  icon: '🍊', desc: 'Stores Orange Peels (+600/lv)', effect: 'granary', value: 600 },
    napBarracks:   { name: 'Nap Barracks',     maxLv: 10, prereqs: { mainLodge: 3, rallyPond: 1 }, slot: 4, icon: '⚔️', desc: 'Train infantry', effect: 'barracks' },
    rallyPond:     { name: 'Rally Pond',       maxLv: 10, prereqs: {},                          slot: 5,  icon: '🏊', desc: 'Army management', effect: 'rally' },
    mudWall:       { name: 'Mud Wall',         maxLv: 10, prereqs: {},                          slot: 6,  icon: '🧱', desc: 'Base DEF bonus (+3%/lv)', effect: 'wall', value: 0.03 },
    chillAcademy:  { name: 'Chill Academy',    maxLv: 10, prereqs: { napBarracks: 3 },          slot: 7,  icon: '🎓', desc: 'Research troop upgrades', effect: 'academy' },
    hotSpring:     { name: 'Hot Spring',       maxLv: 5,  prereqs: { mainLodge: 5 },            slot: 8,  icon: '♨️', desc: '+Morale generation', effect: 'morale', value: 5 },
    marketplace:   { name: 'Marketplace',      maxLv: 10, prereqs: { mainLodge: 3, grassBarn: 3 }, slot: 9, icon: '🏪', desc: 'Trade resources', effect: 'market' },
    snootTower:    { name: 'Snoot Tower',      maxLv: 10, prereqs: { mainLodge: 5 },            slot: 10, icon: '🔭', desc: 'Scout enemy, reveal fog', effect: 'scout' },
    vibeShrine:    { name: 'Vibe Shrine',      maxLv: 5,  prereqs: { mainLodge: 5 },            slot: 11, icon: '✨', desc: '+15% all production/lv', effect: 'production', value: 0.15 },
    embassy:       { name: 'Capybara Embassy', maxLv: 10, prereqs: { mainLodge: 5 },            slot: 12, icon: '🏛️', desc: 'Alliance features', effect: 'embassy' },
    workshop:      { name: 'Workshop',         maxLv: 10, prereqs: { chillAcademy: 5, napBarracks: 5 }, slot: 13, icon: '🔧', desc: 'Build siege units', effect: 'workshop' },
    hammockStation:{ name: 'Hammock Station',  maxLv: 5,  prereqs: { napBarracks: 5 },          slot: 14, icon: '🛏️', desc: 'Train 2nd queue', effect: 'dualQueue' },
    grandHotSpring:{ name: 'Grand Hot Spring', maxLv: 100,prereqs: { _allLevel5: true },        slot: 15, icon: '🏆', desc: 'WIN CONDITION (100 levels)', effect: 'wonder', isWonder: true },
    residence:     { name: 'Residence',        maxLv: 10, prereqs: { mainLodge: 5 },            slot: 16, icon: '🏘️', desc: 'Train settlers', effect: 'residence' },
    herbalistHut:  { name: 'Herbalist Hut',    maxLv: 10, prereqs: { mainLodge: 3 },            slot: 17, icon: '🌿', desc: 'Heal wounded troops', effect: 'heal', value: 0.1 },
    sunsetDeck:    { name: 'Sunset Deck',      maxLv: 5,  prereqs: { hotSpring: 3 },            slot: 18, icon: '🌅', desc: 'Passive morale regen during attacks', effect: 'passiveMorale' }
  },

  troops: {
    chillGuard:     { name: 'Chill Guard',      atk: 20, defInf: 50, defCav: 40, speed: 4, carry: 20, upkeep: 1, trainTime: 20,  type: 'infantry', prereq: { napBarracks: 1 } },
    splashWarrior:  { name: 'Splash Warrior',   atk: 40, defInf: 30, defCav: 25, speed: 5, carry: 35, upkeep: 1, trainTime: 25,  type: 'infantry', prereq: { napBarracks: 3 } },
    snootArcher:    { name: 'Snoot Archer',     atk: 35, defInf: 20, defCav: 35, speed: 6, carry: 25, upkeep: 1, trainTime: 30,  type: 'ranged', prereq: { napBarracks: 5 } },
    zenMaster:      { name: 'Zen Master',       atk: 15, defInf: 60, defCav: 55, speed: 3, carry: 10, upkeep: 2, trainTime: 45,  type: 'support', prereq: { chillAcademy: 3 } },
    spaScout:       { name: 'Spa Scout',        atk: 0,  defInf: 10, defCav: 5,  speed: 9, carry: 0,  upkeep: 1, trainTime: 15,  type: 'scout', prereq: { napBarracks: 1 } },
    mudGolem:       { name: 'Mud Golem',        atk: 80, defInf: 40, defCav: 30, speed: 3, carry: 50, upkeep: 3, trainTime: 60,  type: 'cavalry', prereq: { chillAcademy: 5 } },
    hotSpringRam:   { name: 'Hot Spring Ram',   atk: 50, defInf: 30, defCav: 70, speed: 2, carry: 0,  upkeep: 3, trainTime: 90,  type: 'siege', prereq: { workshop: 1 } },
    elderCapybara:  { name: 'Elder Capybara',   atk: 30, defInf: 40, defCav: 40, speed: 4, carry: 0,  upkeep: 4, trainTime: 180, type: 'admin', prereq: { chillAcademy: 10 } }
  },

  hero: {
    name: 'The Absolute Unit',
    desc: 'A giant capybara wearing a crown made of orange peels.',
    baseAtk: 50, baseDef: 60,
    abilities: {
      5: { name: 'Rally Cry', desc: '+10% army ATK for 1 battle' },
      10: { name: 'Inspire', desc: '+20% Morale for 10 min' },
      15: { name: 'Mass Heal', desc: 'Heal all troops 30% HP' },
      20: { name: 'Zen Mode', desc: 'Invulnerable for 5 min' }
    }
  },

  soloMode: {
    type: 'towerDefense',
    winCondition: 'Build Grand Hot Spring to Lv 100',
    loseCondition: 'Village destroyed',
    waves: [
      // Waves 1-5: small cat raids
      { minWave: 1, maxWave: 5, faction: 'cat', units: { shadowPouncer: [3, 5] }, interval: 120 },
      // Waves 6-10: cats + dog scouts
      { minWave: 6, maxWave: 10, faction: 'mixed', units: { shadowPouncer: [5, 8], noseScout: [1, 3] }, interval: 100 },
      // Waves 11-20: mixed with siege
      { minWave: 11, maxWave: 20, faction: 'mixed', units: { shadowPouncer: [8, 15], midnightRider: [2, 5], hairballCatapult: [1, 2] }, interval: 80 },
      // Waves 21-30: full armies
      { minWave: 21, maxWave: 30, faction: 'mixed', units: { shadowPouncer: [15, 25], midnightRider: [5, 10], loyalGuard: [5, 8], armoredRetriever: [2, 4] }, interval: 60 },
      // Waves 31+: boss waves
      { minWave: 31, maxWave: 999, faction: 'mixed', units: { shadowPouncer: [20, 40], midnightRider: [8, 15], armoredRetriever: [4, 8], fatCatLord: [1, 1] }, interval: 50 }
    ]
  },

  // AI tactic preference
  tacticWeights: { charge: 0.33, flank: 0.34, defend: 0.33 }
};
