// units.js — Training, army composition, deployment
const Units = {
  getTrainCost(unitKey, count, faction) {
    const fData = State.getFactionData(faction);
    const uData = fData.troops[unitKey];
    if (!uData) return { r1: 999999 };
    const baseCost = (uData.atk + uData.defInf) * 0.5 + 10;
    return {
      r1: Math.floor(baseCost * count),
      r2: Math.floor(baseCost * 0.7 * count),
      r3: Math.floor(baseCost * 0.5 * count),
      r4: Math.floor(baseCost * 0.2 * count)
    };
  },

  getAvailable(game) {
    const fData = State.getFactionData(game.faction);
    const available = [];
    for (const [key, uData] of Object.entries(fData.troops)) {
      // Check prereqs
      let canTrain = true;
      if (uData.prereq) {
        for (const [bKey, bLv] of Object.entries(uData.prereq)) {
          if ((game.buildings[bKey] || { level: 0 }).level < bLv) {
            canTrain = false;
            break;
          }
        }
      }
      const cost = this.getTrainCost(key, 1, game.faction);
      available.push({
        key,
        ...uData,
        canTrain,
        cost,
        canAfford: State.canAfford(cost),
        currentCount: game.army[key] || 0
      });
    }
    return available;
  },

  getTotalArmy(game) {
    let total = 0;
    for (const count of Object.values(game.army)) total += count;
    return total;
  },

  getArmyPower(army, faction, type = 'atk') {
    const fData = State.getFactionData(faction);
    let total = 0;
    for (const [key, count] of Object.entries(army)) {
      const uData = fData.troops[key] || Resources.getAnyTroopData(key);
      if (!uData) continue;
      if (type === 'atk') total += uData.atk * count;
      else if (type === 'defInf') total += uData.defInf * count;
      else if (type === 'defCav') total += uData.defCav * count;
    }
    return total;
  },

  getCarryCapacity(army, faction) {
    const fData = State.getFactionData(faction);
    let total = 0;
    for (const [key, count] of Object.entries(army)) {
      const uData = fData.troops[key] || Resources.getAnyTroopData(key);
      if (uData) total += uData.carry * count;
    }
    return total;
  }
};
