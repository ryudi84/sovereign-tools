// dog.js — Dog faction data and solo AI
const DOG = {
  id: 'dog',
  name: 'The Loyal Legion',
  emoji: '🐕',
  motto: 'HOLD. THE. LINE. Also, fetch?',
  oath: "I solemnly swear to be the goodest boy, to hold every line, to chase every ball, and to never, EVER, let my pack down. WHO'S A GOOD BOY? I AM.",

  resources: {
    r1: { name: 'Bones', icon: '🦴', building: 'boneYard' },
    r2: { name: 'Sticks', icon: '🪵', building: 'stickDepot' },
    r3: { name: 'Belly Rubs', icon: '🫱', building: 'rubSpa' },
    r4: { name: 'Tennis Balls', icon: '🎾', building: 'ballLauncher' }
  },

  buildings: {
    mainKennel:     { name: 'Main Kennel',       maxLv: 10, prereqs: {},                            slot: 1,  icon: '🏠', desc: 'Reduces build time', effect: 'buildSpeed', value: 0.05 },
    boneLocker:     { name: 'Bone Locker',       maxLv: 10, prereqs: {},                            slot: 2,  icon: '🏪', desc: 'Resource storage (+800/lv)', effect: 'storage', value: 800 },
    ballPit:        { name: 'Ball Pit',          maxLv: 10, prereqs: {},                            slot: 3,  icon: '🎾', desc: 'Tennis Ball storage (+600/lv)', effect: 'granary', value: 600 },
    barkBarracks:   { name: 'Bark Barracks',     maxLv: 10, prereqs: { mainKennel: 3, rallyYard: 1 }, slot: 4, icon: '⚔️', desc: 'Train infantry', effect: 'barracks' },
    rallyYard:      { name: 'Rally Yard',        maxLv: 10, prereqs: {},                            slot: 5,  icon: '🏴', desc: 'Army management', effect: 'rally' },
    bigFence:       { name: 'Big Fence',         maxLv: 10, prereqs: {},                            slot: 6,  icon: '🧱', desc: 'Base DEF (+5%/lv — BEST WALL)', effect: 'wall', value: 0.05 },
    howlAcademy:    { name: 'Howl Academy',      maxLv: 10, prereqs: { barkBarracks: 3 },           slot: 7,  icon: '🎓', desc: 'Research upgrades', effect: 'academy' },
    goodBoyShrine:  { name: 'Good Boy Shrine',   maxLv: 5,  prereqs: { mainKennel: 5 },            slot: 8,  icon: '🐕', desc: '+Morale', effect: 'morale', value: 4 },
    barterPost:     { name: 'Barter Post',       maxLv: 10, prereqs: { mainKennel: 3, boneLocker: 3 }, slot: 9, icon: '🏪', desc: 'Trade (big capacity)', effect: 'market' },
    watchPost:      { name: 'Watch Post',        maxLv: 10, prereqs: { mainKennel: 5 },            slot: 10, icon: '🔭', desc: 'Scouting', effect: 'scout' },
    packHall:       { name: 'Pack Hall',         maxLv: 5,  prereqs: { mainKennel: 5 },            slot: 11, icon: '🐺', desc: '+20% DEF for all troops/lv', effect: 'defBonus', value: 0.2 },
    dogEmbassy:     { name: 'Dog Embassy',       maxLv: 10, prereqs: { mainKennel: 5 },            slot: 12, icon: '🏛️', desc: 'Alliance features', effect: 'embassy' },
    digWorkshop:    { name: 'Dig Workshop',      maxLv: 10, prereqs: { howlAcademy: 5 },           slot: 13, icon: '🔧', desc: 'Siege units', effect: 'workshop' },
    heavyKennel:    { name: 'Heavy Kennel',      maxLv: 10, prereqs: { barkBarracks: 5 },          slot: 14, icon: '🏋️', desc: 'Train heavy infantry (TANKIEST)', effect: 'stable' },
    monumentOfLoyalty: { name: 'Monument of Loyalty', maxLv: 100, prereqs: { _allLevel5: true },   slot: 15, icon: '🏆', desc: 'Wonder equivalent', effect: 'wonder', isWonder: true },
    residence:      { name: 'Residence',         maxLv: 10, prereqs: { mainKennel: 5 },            slot: 16, icon: '🏘️', desc: 'Settlers', effect: 'residence' },
    bunker:         { name: 'Bunker',            maxLv: 10, prereqs: { bigFence: 5 },              slot: 17, icon: '🏗️', desc: 'Hides resources from raiders', effect: 'cranny', value: 200 },
    howlTower:      { name: 'Howl Tower',        maxLv: 5,  prereqs: { packHall: 3 },              slot: 18, icon: '🗼', desc: 'Alert allies, +DEF during attacks', effect: 'alertDef' }
  },

  troops: {
    loyalGuard:      { name: 'Loyal Guard',       atk: 30, defInf: 60, defCav: 55, speed: 4,  carry: 30, upkeep: 1, trainTime: 25,  type: 'infantry', prereq: { barkBarracks: 1 } },
    fetchRunner:     { name: 'Fetch Runner',      atk: 55, defInf: 35, defCav: 25, speed: 7,  carry: 45, upkeep: 1, trainTime: 20,  type: 'infantry', prereq: { barkBarracks: 3 } },
    barkCannon:      { name: 'Bark Cannon',       atk: 45, defInf: 25, defCav: 40, speed: 4,  carry: 20, upkeep: 1, trainTime: 30,  type: 'ranged', prereq: { barkBarracks: 5 } },
    noseScout:       { name: 'Nose Scout',        atk: 0,  defInf: 20, defCav: 15, speed: 8,  carry: 0,  upkeep: 1, trainTime: 15,  type: 'scout', prereq: { barkBarracks: 1 } },
    packLeader:      { name: 'Pack Leader',       atk: 40, defInf: 45, defCav: 45, speed: 5,  carry: 25, upkeep: 2, trainTime: 50,  type: 'support', prereq: { howlAcademy: 5 } },
    armoredRetriever:{ name: 'Armored Retriever', atk: 90, defInf: 70, defCav: 50, speed: 3,  carry: 60, upkeep: 3, trainTime: 60,  type: 'cavalry', prereq: { heavyKennel: 1 } },
    digTunneler:     { name: 'Dig Tunneler',      atk: 55, defInf: 25, defCav: 80, speed: 2,  carry: 0,  upkeep: 3, trainTime: 90,  type: 'siege', prereq: { digWorkshop: 1 } },
    alphaDog:        { name: 'Alpha Dog',         atk: 35, defInf: 55, defCav: 55, speed: 4,  carry: 0,  upkeep: 4, trainTime: 180, type: 'admin', prereq: { howlAcademy: 10 } }
  },

  hero: {
    name: 'The Goodest Boy',
    desc: 'A golden retriever in a tin can helmet with a stick sword. Everyone loves him.',
    baseAtk: 40, baseDef: 70,
    abilities: {
      5: { name: 'Rally Cry', desc: '+10% army ATK for 1 battle' },
      10: { name: 'Inspire', desc: '+20% Morale for 10 min' },
      15: { name: 'Iron Wall', desc: 'Double DEF for 3 min' },
      20: { name: 'Good Boy Protocol', desc: 'Double DEF for 5 min' }
    }
  },

  soloMode: {
    type: 'survival',
    winCondition: 'None (endless survival)',
    loseCondition: 'Village falls',
    waves: [
      { minWave: 1, maxWave: 5, faction: 'cat', units: { shadowPouncer: [3, 6] }, interval: 90 },
      { minWave: 6, maxWave: 10, faction: 'cat', units: { shadowPouncer: [6, 10], whiskerSpy: [2, 3] }, interval: 80 },
      { minWave: 11, maxWave: 20, faction: 'mixed', units: { shadowPouncer: [10, 18], midnightRider: [3, 6], splashWarrior: [2, 5] }, interval: 70 },
      { minWave: 21, maxWave: 40, faction: 'mixed', units: { shadowPouncer: [18, 30], midnightRider: [6, 12], mudGolem: [2, 5], hairballCatapult: [1, 3] }, interval: 55 },
      { minWave: 41, maxWave: 999, faction: 'mixed', units: { shadowPouncer: [25, 50], midnightRider: [10, 20], armoredRetriever: [3, 8], fatCatLord: [1, 2] }, interval: 45 }
    ]
  },

  tacticWeights: { charge: 0.1, flank: 0.3, defend: 0.6 }
};
