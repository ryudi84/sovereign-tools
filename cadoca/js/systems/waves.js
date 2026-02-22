// waves.js — AI wave spawning, escalation, boss waves
const Waves = {
  getWaveConfig(game) {
    const fData = State.getFactionData(game.faction);
    if (!fData.soloMode.waves) return null;
    const wave = game.wave;
    for (const wc of fData.soloMode.waves) {
      if (wave >= wc.minWave && wave <= wc.maxWave) return wc;
    }
    return fData.soloMode.waves[fData.soloMode.waves.length - 1];
  },

  generateWaveArmy(game) {
    const wc = this.getWaveConfig(game);
    if (!wc) return {};
    const army = {};
    const scaleFactor = 1 + (game.wave - 1) * 0.1; // +10% per wave
    for (const [unitKey, [min, max]] of Object.entries(wc.units)) {
      const count = Math.floor((min + Math.random() * (max - min + 1)) * scaleFactor);
      if (count > 0) army[unitKey] = count;
    }
    return army;
  },

  getWaveInterval(game) {
    const wc = this.getWaveConfig(game);
    if (!wc) return 120;
    return Math.max(20, Math.floor(wc.interval * Math.pow(CONFIG.WAVE_INTERVAL_DECAY, game.wave - 1) / game.gameSpeed));
  },

  getWaveFaction(game) {
    const wc = this.getWaveConfig(game);
    if (!wc) return 'cat';
    if (wc.faction === 'mixed') {
      return Math.random() < 0.5 ? 'cat' : (game.faction === 'cat' ? 'capybara' : 'dog');
    }
    return wc.faction;
  },

  spawnWave(game) {
    game.wave++;
    game.waveTimer = 0;
    game.stats.highestWave = Math.max(game.stats.highestWave, game.wave);

    const army = this.generateWaveArmy(game);
    const faction = this.getWaveFaction(game);
    const tactic = Combat.aiPickTactic(faction);

    State.addEvent(`🚨 Wave ${game.wave} approaching! ${Object.entries(army).map(([k, v]) => `${v}x ${k}`).join(', ')}`);

    return { army, faction, tactic };
  },

  // Cat solo: generate village defenses
  getVillageDefenses(village) {
    const army = {};
    const comp = village.troops.composition;
    const total = village.troops.total;

    if (village.faction === 'capybara') {
      if (comp === 'light') {
        army.chillGuard = Math.floor(total * 0.6);
        army.splashWarrior = Math.floor(total * 0.4);
      } else if (comp === 'medium') {
        army.chillGuard = Math.floor(total * 0.3);
        army.splashWarrior = Math.floor(total * 0.3);
        army.zenMaster = Math.floor(total * 0.2);
        army.mudGolem = Math.floor(total * 0.2);
      } else {
        army.chillGuard = Math.floor(total * 0.2);
        army.zenMaster = Math.floor(total * 0.3);
        army.mudGolem = Math.floor(total * 0.3);
        army.elderCapybara = Math.floor(total * 0.2);
      }
    } else {
      if (comp === 'light') {
        army.loyalGuard = Math.floor(total * 0.6);
        army.fetchRunner = Math.floor(total * 0.4);
      } else if (comp === 'medium') {
        army.loyalGuard = Math.floor(total * 0.3);
        army.fetchRunner = Math.floor(total * 0.2);
        army.barkCannon = Math.floor(total * 0.3);
        army.packLeader = Math.floor(total * 0.2);
      } else {
        army.loyalGuard = Math.floor(total * 0.2);
        army.barkCannon = Math.floor(total * 0.2);
        army.armoredRetriever = Math.floor(total * 0.3);
        army.alphaDog = Math.floor(total * 0.3);
      }
    }

    return army;
  }
};
