// config.js — Single source of truth for all balance numbers
const CONFIG = {
  // Tick rates (ms)
  FAST_TICK: 1000,
  RESOURCE_TICK: 10000,
  GAME_TICK: 60000,
  SOLO_SPEED_MULT: 10, // solo runs 10x faster

  // Resources
  RESOURCE_BASE_OUTPUT: 10, // per level per resource tick
  WAREHOUSE_BASE: 800, // per level
  GRANARY_BASE: 600, // per level (crop equivalent)

  // Buildings
  BUILD_TIME_BASE: 30, // seconds at level 1
  BUILD_TIME_MULT: 1.5, // exponential per level
  MAIN_BUILDING_BONUS: 0.05, // -5% per level
  MAX_BUILDING_LEVEL: 10,
  WONDER_MAX_LEVEL: 100,
  BUILDING_SLOTS: 18,
  RUBBLE_REBUILD_DISCOUNT: 0.5,
  DESTROY_REFUND: 0.25,

  // Combat
  TACTIC_BONUS: 0.25, // +25% for winning RPS
  WALL_DEF_PER_LEVEL: { capybara: 0.03, cat: 0.03, dog: 0.05 },

  // Morale
  MORALE_MAX: 100,
  MORALE_MIN: 0,
  MORALE_DECAY_PER_TICK: 1,
  MORALE_DESERT_CHANCE: 0.05, // at 0 morale
  MORALE_HIGH_BONUS: 0.2, // at 100
  MORALE_LOW_PENALTY: 0.2, // at 0

  // Shield
  SHIELD_DURATION: 7200, // 2 hours in seconds
  SHIELD_COOLDOWN: 21600, // 6 hours
  SHIELD_LOSS_THRESHOLD: 0.5, // lose 50%+ army

  // Diminishing raid returns
  RAID_DIMINISH_1H: 0.5,
  RAID_DIMINISH_30M: 0.25,

  // Map
  MAP_SIZE: 20,

  // Hero
  HERO_RESPAWN_TIME: 1800, // 30 min in seconds
  HERO_ABILITIES: {
    5: 'rallyCry',
    10: 'inspire',
    15: 'factionSpecial',
    20: 'ultimate'
  },

  // Wave system
  WAVE_BASE_INTERVAL: 120, // seconds between waves (game ticks)
  WAVE_INTERVAL_DECAY: 0.95, // each wave comes faster

  // Cat solo
  CAT_TIMER: 1800, // 30 min in seconds
  CAT_LOOT_TARGET: 10000,
  CAT_VILLAGES: 10,

  // Save
  AUTOSAVE_INTERVAL: 300000, // 5 min ms
  SAVE_SLOTS: 3,

  // Resource field layout per faction: 4 of each basic + 2 crop = 18
  RESOURCE_FIELDS: {
    capybara: { grass: 5, mud: 5, vibes: 5, peels: 3 },
    cat: { fish: 5, yarn: 5, naps: 5, cardboard: 3 },
    dog: { bones: 5, sticks: 5, bellyRubs: 5, tennisBalls: 3 }
  },

  // Resource icons
  RESOURCE_ICONS: {
    capybara: { r1: '🌿', r2: '🟤', r3: '✨', r4: '🍊', morale: '😊' },
    cat: { r1: '🐟', r2: '🧶', r3: '😴', r4: '📦', morale: '😈' },
    dog: { r1: '🦴', r2: '🪵', r3: '🫱', r4: '🎾', morale: '🥰' }
  },

  RESOURCE_NAMES: {
    capybara: { r1: 'Grass', r2: 'Mud', r3: 'Vibes', r4: 'Orange Peels', morale: 'Morale' },
    cat: { r1: 'Fish', r2: 'Yarn', r3: 'Naps', r4: 'Cardboard', morale: 'Morale' },
    dog: { r1: 'Bones', r2: 'Sticks', r3: 'Belly Rubs', r4: 'Tennis Balls', morale: 'Morale' }
  }
};
