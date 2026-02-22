// resources.js — Production, storage, overflow, upkeep
const Resources = {
  getProduction(game) {
    const fData = State.getFactionData(game.faction);
    const moraleBonus = Morale.getProductionBonus(game.morale);
    const vibeShrineBonus = this.getVibeShrineBonus(game);
    const production = { r1: 0, r2: 0, r3: 0, r4: 0 };

    // Base production from resource fields (simplified: per-level output)
    const fieldCount = CONFIG.RESOURCE_FIELDS[game.faction];
    const fieldKeys = Object.keys(fieldCount);
    const resKeys = ['r1', 'r2', 'r3', 'r4'];

    for (let i = 0; i < resKeys.length; i++) {
      // Each "field" produces at level 1 by default, can be boosted
      const count = Object.values(fieldCount)[i];
      production[resKeys[i]] = CONFIG.RESOURCE_BASE_OUTPUT * count * (1 + moraleBonus + vibeShrineBonus);
    }

    return production;
  },

  getVibeShrineBonus(game) {
    const shrineKeys = { capybara: 'vibeShrine', cat: 'throneOfEgo', dog: 'packHall' };
    const key = shrineKeys[game.faction];
    const building = game.buildings[key];
    if (!building || building.level <= 0) return 0;
    const fData = State.getFactionData(game.faction);
    return (fData.buildings[key].value || 0) * building.level;
  },

  getUpkeep(game) {
    const fData = State.getFactionData(game.faction);
    let total = 0;
    for (const [unitKey, count] of Object.entries(game.army)) {
      const uData = fData.troops[unitKey] || this.getAnyTroopData(unitKey);
      if (uData) total += uData.upkeep * count;
    }
    return total;
  },

  getAnyTroopData(unitKey) {
    return CAPYBARA.troops[unitKey] || CAT.troops[unitKey] || DOG.troops[unitKey];
  },

  getStorageCapacity(game) {
    return {
      r1: game.maxStorage.r1,
      r2: game.maxStorage.r2,
      r3: game.maxStorage.r3,
      r4: game.maxGranary
    };
  }
};
