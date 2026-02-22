// buildings.js — Construction, upgrades, prerequisites, queue
const Buildings = {
  getCost(buildingKey, level, faction) {
    // Cost scales exponentially
    const base = 50;
    const mult = Math.pow(1.6, level - 1);
    // Wonder costs much more
    const fData = State.getFactionData(faction);
    const bData = fData.buildings[buildingKey];
    const wonderMult = bData && bData.isWonder ? 5 : 1;
    return {
      r1: Math.floor(base * mult * wonderMult),
      r2: Math.floor(base * 0.8 * mult * wonderMult),
      r3: Math.floor(base * 0.6 * mult * wonderMult),
      r4: Math.floor(base * 0.3 * mult * wonderMult)
    };
  },

  getBuildTime(buildingKey, level, game) {
    const fData = State.getFactionData(game.faction);
    const bData = fData.buildings[buildingKey];
    const base = CONFIG.BUILD_TIME_BASE;
    const mainBuildingKey = game.faction === 'capybara' ? 'mainLodge' : game.faction === 'cat' ? 'mainDen' : 'mainKennel';
    const mainLevel = (game.buildings[mainBuildingKey] || { level: 0 }).level;
    const mainBonus = 1 - (mainLevel * CONFIG.MAIN_BUILDING_BONUS);
    const moraleBonus = 1 - (Morale.getBuildSpeedBonus(game.morale));
    const wonderMult = bData && bData.isWonder ? 3 : 1;
    return Math.max(1, Math.floor(base * Math.pow(CONFIG.BUILD_TIME_MULT, level - 1) * mainBonus * moraleBonus * wonderMult / game.gameSpeed));
  },

  checkPrereqs(buildingKey, game) {
    const fData = State.getFactionData(game.faction);
    const bData = fData.buildings[buildingKey];
    if (!bData || !bData.prereqs) return true;

    // Special: all buildings level 5+
    if (bData.prereqs._allLevel5) {
      for (const [key, data] of Object.entries(fData.buildings)) {
        if (data.isWonder) continue;
        const level = (game.buildings[key] || { level: 0 }).level;
        if (level < 5) return false;
      }
      return true;
    }

    for (const [prereqKey, prereqLevel] of Object.entries(bData.prereqs)) {
      const level = (game.buildings[prereqKey] || { level: 0 }).level;
      if (level < prereqLevel) return false;
    }
    return true;
  },

  applyEffect(buildingKey, level, game) {
    const fData = State.getFactionData(game.faction);
    const bData = fData.buildings[buildingKey];
    if (!bData) return;

    switch (bData.effect) {
      case 'storage':
        game.maxStorage.r1 = 800 + bData.value * level;
        game.maxStorage.r2 = 800 + bData.value * level;
        game.maxStorage.r3 = 800 + bData.value * level;
        break;
      case 'granary':
        game.maxGranary = 600 + bData.value * level;
        break;
      case 'wonder':
        game.stats.wonderLevel = level;
        if (level >= 100 && game.faction === 'capybara') {
          State.dispatch('setGameOver', { victory: true });
        }
        break;
    }
  },

  getAvailable(game) {
    const fData = State.getFactionData(game.faction);
    const available = [];
    for (const [key, bData] of Object.entries(fData.buildings)) {
      const currentLevel = (game.buildings[key] || { level: 0 }).level;
      if (currentLevel >= bData.maxLv) continue;
      const canBuild = this.checkPrereqs(key, game);
      const cost = this.getCost(key, currentLevel + 1, game.faction);
      const canAfford = State.canAfford(cost);
      available.push({
        key,
        ...bData,
        currentLevel,
        nextLevel: currentLevel + 1,
        cost,
        canBuild,
        canAfford,
        buildTime: this.getBuildTime(key, currentLevel + 1, game)
      });
    }
    return available;
  }
};
