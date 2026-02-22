// state.js — Game state management, save/load, command system
const State = {
  // Current game state — single serializable object
  game: null,

  // Create fresh game state
  createNew(faction, playerName) {
    const factionData = this.getFactionData(faction);
    return {
      version: 1,
      playerId: 'player_' + Date.now(),
      faction,
      playerName,
      createdAt: Date.now(),
      lastSaved: null,

      // Resources
      resources: { r1: 200, r2: 200, r3: 200, r4: 150 },
      morale: 50,
      maxStorage: { r1: 800, r2: 800, r3: 800 },
      maxGranary: 600,

      // Buildings: { buildingKey: { level, constructing, constructEnd } }
      buildings: {},
      buildQueue: [], // [{ buildingKey, targetLevel, startTime, endTime }]

      // Troops
      army: {}, // { unitKey: count }
      trainingQueue: [], // [{ unitKey, count, startTime, endTime }]
      woundedPool: {}, // troops being healed

      // Map
      map: this.generateMap(),
      revealedTiles: {},
      playerPosition: { x: 10, y: 10 },

      // Hero
      hero: {
        alive: true,
        level: 1,
        xp: 0,
        xpToNext: 100,
        atk: factionData.hero.baseAtk,
        def: factionData.hero.baseDef,
        equipment: { weapon: null, armor: null, accessory: null },
        abilities: [],
        respawnAt: null
      },

      // Wave/Solo state
      wave: 0,
      waveTimer: 0,
      totalKills: 0,
      totalLoot: 0,

      // Cat-specific
      soloTimer: faction === 'cat' ? CONFIG.CAT_TIMER : null,
      catVillages: faction === 'cat' ? this.generateCatVillages() : null,

      // Shield
      shieldActive: false,
      shieldEnd: 0,
      shieldCooldownEnd: 0,
      lastRaidTargets: {},

      // Event log
      eventLog: [],

      // Game time
      gameTick: 0,
      gameSpeed: CONFIG.SOLO_SPEED_MULT,
      paused: false,
      gameOver: false,
      victory: false,

      // Stats
      stats: {
        battlesWon: 0,
        battlesLost: 0,
        resourcesGathered: 0,
        unitsLost: 0,
        unitsKilled: 0,
        highestWave: 0,
        wonderLevel: 0
      }
    };
  },

  getFactionData(faction) {
    return faction === 'capybara' ? CAPYBARA : faction === 'cat' ? CAT : DOG;
  },

  generateMap() {
    const map = [];
    const types = ['plains', 'plains', 'plains', 'forest', 'forest', 'swamp', 'mountain', 'water'];
    for (let y = 0; y < CONFIG.MAP_SIZE; y++) {
      map[y] = [];
      for (let x = 0; x < CONFIG.MAP_SIZE; x++) {
        if (x === 10 && y === 10) {
          map[y][x] = { type: 'village', owner: 'player' };
        } else if (Math.random() < 0.05) {
          map[y][x] = { type: 'oasis', bonus: ['r1', 'r2', 'r3', 'r4'][Math.floor(Math.random() * 4)] };
        } else if (Math.random() < 0.03) {
          map[y][x] = { type: 'ruins' };
        } else {
          map[y][x] = { type: types[Math.floor(Math.random() * types.length)] };
        }
      }
    }
    return map;
  },

  generateCatVillages() {
    const villages = [];
    for (let i = 0; i < CONFIG.CAT_VILLAGES; i++) {
      const difficulty = i + 1;
      villages.push({
        id: i,
        name: `Village ${i + 1}`,
        faction: ['capybara', 'dog'][i % 2],
        difficulty,
        wallLevel: Math.min(difficulty, 10),
        troops: {
          total: 50 + difficulty * 30,
          composition: difficulty <= 3 ? 'light' : difficulty <= 7 ? 'medium' : 'heavy'
        },
        loot: { r1: 200 * difficulty, r2: 200 * difficulty, r3: 200 * difficulty, r4: 100 * difficulty },
        raided: false,
        raidCount: 0
      });
    }
    return villages;
  },

  // Command system — all mutations go through here
  dispatch(action, payload) {
    if (!this.game) return;
    if (this.game.paused && action !== 'unpause' && action !== 'save') return;

    switch (action) {
      case 'pause': this.game.paused = true; break;
      case 'unpause': this.game.paused = false; break;

      case 'startBuild': {
        const { buildingKey } = payload;
        const fData = this.getFactionData(this.game.faction);
        const bData = fData.buildings[buildingKey];
        if (!bData) return;
        const currentLevel = (this.game.buildings[buildingKey] || { level: 0 }).level;
        if (currentLevel >= bData.maxLv) return;
        const targetLevel = currentLevel + 1;
        const cost = Buildings.getCost(buildingKey, targetLevel, this.game.faction);
        if (!this.canAfford(cost)) return;
        if (!Buildings.checkPrereqs(buildingKey, this.game)) return;
        // Check build queue
        if (this.game.buildQueue.length > 0) {
          const hasDoubleQueue = this.game.buildings[this.getDoubleQueueBuilding()] && this.game.buildings[this.getDoubleQueueBuilding()].level > 0;
          if (!hasDoubleQueue || this.game.buildQueue.length >= 2) return;
        }
        this.deductResources(cost);
        const buildTime = Buildings.getBuildTime(buildingKey, targetLevel, this.game);
        const now = this.game.gameTick;
        this.game.buildQueue.push({ buildingKey, targetLevel, startTime: now, endTime: now + buildTime });
        break;
      }

      case 'completeBuild': {
        const { buildingKey, level } = payload;
        if (!this.game.buildings[buildingKey]) {
          this.game.buildings[buildingKey] = { level: 0 };
        }
        this.game.buildings[buildingKey].level = level;
        Buildings.applyEffect(buildingKey, level, this.game);
        this.addEvent(`🏗️ ${this.getFactionData(this.game.faction).buildings[buildingKey].name} upgraded to Lv ${level}!`);
        break;
      }

      case 'trainUnit': {
        const { unitKey, count } = payload;
        const fData = this.getFactionData(this.game.faction);
        const uData = fData.troops[unitKey];
        if (!uData) return;
        const cost = Units.getTrainCost(unitKey, count, this.game.faction);
        if (!this.canAfford(cost)) return;
        this.deductResources(cost);
        const trainTime = uData.trainTime * count;
        const now = this.game.gameTick;
        this.game.trainingQueue.push({ unitKey, count, startTime: now, endTime: now + trainTime });
        break;
      }

      case 'completeTraining': {
        const { unitKey, count } = payload;
        this.game.army[unitKey] = (this.game.army[unitKey] || 0) + count;
        this.addEvent(`⚔️ ${count}x ${this.getFactionData(this.game.faction).troops[unitKey].name} trained!`);
        break;
      }

      case 'updateResources': {
        const production = Resources.getProduction(this.game);
        const upkeep = Resources.getUpkeep(this.game);
        for (const key of ['r1', 'r2', 'r3', 'r4']) {
          this.game.resources[key] += (production[key] || 0) - (key === 'r4' ? upkeep : 0);
          const max = key === 'r4' ? this.game.maxGranary : this.game.maxStorage[key];
          this.game.resources[key] = Math.max(0, Math.min(this.game.resources[key], max));
        }
        // Check starvation
        if (this.game.resources.r4 <= 0) {
          const armyKeys = Object.keys(this.game.army);
          if (armyKeys.length > 0) {
            const key = armyKeys[Math.floor(Math.random() * armyKeys.length)];
            if (this.game.army[key] > 0) {
              this.game.army[key]--;
              if (this.game.army[key] <= 0) delete this.game.army[key];
              this.addEvent(`💀 A troop starved! (No ${CONFIG.RESOURCE_NAMES[this.game.faction].r4})`);
            }
          }
        }
        break;
      }

      case 'updateMorale': {
        Morale.update(this.game);
        break;
      }

      case 'triggerEvent': {
        const events = RANDOM_EVENTS[this.game.faction];
        const event = events[Math.floor(Math.random() * events.length)];
        this.addEvent(`${event.icon} ${event.text}`);
        if (event.effects) {
          for (const [key, val] of Object.entries(event.effects)) {
            if (key === 'morale') {
              this.game.morale = Math.max(CONFIG.MORALE_MIN, Math.min(CONFIG.MORALE_MAX, this.game.morale + val));
            } else if (this.game.resources[key] !== undefined) {
              this.game.resources[key] = Math.max(0, this.game.resources[key] + val);
            }
          }
        }
        break;
      }

      case 'resolveBattle': {
        Combat.resolve(this.game, payload);
        break;
      }

      case 'revealTile': {
        const { x, y } = payload;
        this.game.revealedTiles[`${x},${y}`] = true;
        break;
      }

      case 'heroGainXP': {
        Hero.gainXP(this.game.hero, payload.xp);
        break;
      }

      case 'setGameOver': {
        this.game.gameOver = true;
        this.game.victory = payload.victory;
        break;
      }
    }
  },

  getDoubleQueueBuilding() {
    const f = this.game.faction;
    return f === 'capybara' ? 'hammockStation' : f === 'cat' ? 'midnightStable' : 'heavyKennel';
  },

  canAfford(cost) {
    for (const [key, val] of Object.entries(cost)) {
      if ((this.game.resources[key] || 0) < val) return false;
    }
    return true;
  },

  deductResources(cost) {
    for (const [key, val] of Object.entries(cost)) {
      this.game.resources[key] = (this.game.resources[key] || 0) - val;
    }
  },

  addEvent(text) {
    this.game.eventLog.unshift({ text, tick: this.game.gameTick, time: Date.now() });
    if (this.game.eventLog.length > 100) this.game.eventLog.length = 100;
  },

  // Save/Load system
  save(slot) {
    if (!this.game) return false;
    this.game.lastSaved = Date.now();
    const key = `cadoca_save_${slot}`;
    try {
      localStorage.setItem(key, JSON.stringify(this.game));
      return true;
    } catch (e) {
      console.error('Save failed:', e);
      return false;
    }
  },

  load(slot) {
    const key = `cadoca_save_${slot}`;
    try {
      const data = localStorage.getItem(key);
      if (!data) return false;
      this.game = JSON.parse(data);
      return true;
    } catch (e) {
      console.error('Load failed:', e);
      return false;
    }
  },

  getSaveInfo(slot) {
    const key = `cadoca_save_${slot}`;
    try {
      const data = localStorage.getItem(key);
      if (!data) return null;
      const parsed = JSON.parse(data);
      return {
        faction: parsed.faction,
        playerName: parsed.playerName,
        wave: parsed.wave,
        gameTick: parsed.gameTick,
        lastSaved: parsed.lastSaved
      };
    } catch { return null; }
  },

  deleteSave(slot) {
    localStorage.removeItem(`cadoca_save_${slot}`);
  },

  exportSave() {
    if (!this.game) return null;
    return JSON.stringify(this.game, null, 2);
  },

  importSave(jsonString) {
    try {
      this.game = JSON.parse(jsonString);
      return true;
    } catch { return false; }
  }
};
