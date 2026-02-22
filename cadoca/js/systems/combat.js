// combat.js — Battle resolution, tactics RPS, damage calc
const Combat = {
  tactics: ['charge', 'flank', 'defend'],

  // RPS: charge > flank, flank > defend, defend > charge
  getTacticResult(attacker, defender) {
    if (attacker === defender) return 'draw';
    if ((attacker === 'charge' && defender === 'flank') ||
        (attacker === 'flank' && defender === 'defend') ||
        (attacker === 'defend' && defender === 'charge')) return 'win';
    return 'lose';
  },

  // AI picks tactic based on faction weights
  aiPickTactic(faction) {
    const weights = State.getFactionData(faction).tacticWeights;
    const r = Math.random();
    if (r < weights.charge) return 'charge';
    if (r < weights.charge + weights.flank) return 'flank';
    return 'defend';
  },

  // Resolve a full battle
  resolve(game, { attackerArmy, attackerFaction, defenderArmy, defenderFaction, attackerTactic, defenderTactic, isPlayerAttacking }) {
    const tacticResult = this.getTacticResult(attackerTactic, defenderTactic);
    const tacticBonus = tacticResult === 'win' ? CONFIG.TACTIC_BONUS : tacticResult === 'lose' ? -CONFIG.TACTIC_BONUS * 0.5 : 0;

    // Calculate total ATK and DEF
    const totalAtk = Units.getArmyPower(attackerArmy, attackerFaction, 'atk') * (1 + tacticBonus);
    const moraleAtkBonus = Morale.getAtkBonus(game.morale);
    const adjustedAtk = totalAtk * (1 + (isPlayerAttacking ? moraleAtkBonus : 0));

    const totalDefInf = Units.getArmyPower(defenderArmy, defenderFaction, 'defInf');
    const totalDefCav = Units.getArmyPower(defenderArmy, defenderFaction, 'defCav');
    const totalDef = (totalDefInf + totalDefCav) / 2;

    // Wall bonus for defender
    const wallBonus = isPlayerAttacking ? 0 : this.getWallBonus(game);
    const adjustedDef = totalDef * (1 + wallBonus + (!isPlayerAttacking ? moraleAtkBonus : 0));

    // Battle resolution
    const atkRatio = adjustedAtk / Math.max(1, adjustedAtk + adjustedDef);
    const defRatio = adjustedDef / Math.max(1, adjustedAtk + adjustedDef);

    // Losses proportional to enemy strength
    const attackerLossRatio = Math.min(0.95, defRatio * (0.5 + Math.random() * 0.3));
    const defenderLossRatio = Math.min(0.95, atkRatio * (0.5 + Math.random() * 0.3));

    const attackerLosses = {};
    const defenderLosses = {};
    let attackerTotalLost = 0;
    let defenderTotalLost = 0;

    for (const [key, count] of Object.entries(attackerArmy)) {
      const lost = Math.floor(count * attackerLossRatio);
      attackerLosses[key] = lost;
      attackerTotalLost += lost;
    }

    for (const [key, count] of Object.entries(defenderArmy)) {
      const lost = Math.floor(count * defenderLossRatio);
      defenderLosses[key] = lost;
      defenderTotalLost += lost;
    }

    const attackerWins = adjustedAtk > adjustedDef;

    // Apply losses to player army
    if (isPlayerAttacking) {
      for (const [key, lost] of Object.entries(attackerLosses)) {
        game.army[key] = Math.max(0, (game.army[key] || 0) - lost);
        if (game.army[key] <= 0) delete game.army[key];
      }
      game.stats.unitsLost += attackerTotalLost;
      game.stats.unitsKilled += defenderTotalLost;
    } else {
      for (const [key, lost] of Object.entries(defenderLosses)) {
        game.army[key] = Math.max(0, (game.army[key] || 0) - lost);
        if (game.army[key] <= 0) delete game.army[key];
      }
      game.stats.unitsLost += defenderTotalLost;
      game.stats.unitsKilled += attackerTotalLost;
    }

    // Loot calculation
    let loot = 0;
    if (attackerWins && isPlayerAttacking) {
      const carryCapacity = Units.getCarryCapacity(attackerArmy, attackerFaction);
      loot = Math.min(carryCapacity, Math.floor(Math.random() * 200 + 100));
      game.totalLoot += loot;
      game.resources.r1 += Math.floor(loot * 0.3);
      game.resources.r2 += Math.floor(loot * 0.3);
      game.resources.r3 += Math.floor(loot * 0.2);
      game.resources.r4 += Math.floor(loot * 0.2);
    }

    // Update stats
    if ((isPlayerAttacking && attackerWins) || (!isPlayerAttacking && !attackerWins)) {
      game.stats.battlesWon++;
      game.morale = Math.min(CONFIG.MORALE_MAX, game.morale + 8);
    } else {
      game.stats.battlesLost++;
      game.morale = Math.max(CONFIG.MORALE_MIN, game.morale - 5);
    }

    // Hero XP
    if (game.hero.alive) {
      Hero.gainXP(game.hero, 20 + defenderTotalLost * 2);
    }

    // Check shield trigger
    if (!isPlayerAttacking) {
      const totalTroops = Units.getTotalArmy(game);
      const preBattleTroops = totalTroops + defenderTotalLost;
      if (preBattleTroops > 0 && defenderTotalLost / preBattleTroops > CONFIG.SHIELD_LOSS_THRESHOLD) {
        Shield.activate(game);
      }
    }

    // Check if village destroyed (no troops + no buildings)
    if (!isPlayerAttacking && !attackerWins === false) {
      const remaining = Units.getTotalArmy(game);
      if (remaining <= 0 && Object.keys(game.buildings).length <= 1) {
        State.dispatch('setGameOver', { victory: false });
      }
    }

    // Generate battle report
    const quips = FLAVOR.battleQuips;
    let quip;
    if (isPlayerAttacking) {
      quip = attackerWins ? quips.attackerWins : quips.attackerLoses;
    } else {
      quip = attackerWins ? quips.attackerLoses : quips.defenderWins;
    }
    const quipText = quip[Math.floor(Math.random() * quip.length)];

    const report = {
      tacticResult,
      attackerWins,
      attackerLosses,
      defenderLosses,
      attackerTotalLost,
      defenderTotalLost,
      loot,
      quip: quipText
    };

    State.addEvent(`⚔️ Battle! ${quipText} (Lost: ${isPlayerAttacking ? attackerTotalLost : defenderTotalLost}, Killed: ${isPlayerAttacking ? defenderTotalLost : attackerTotalLost}${loot > 0 ? `, Loot: ${loot}` : ''})`);

    return report;
  },

  getWallBonus(game) {
    const fData = State.getFactionData(game.faction);
    const wallKeys = { capybara: 'mudWall', cat: 'hairballWall', dog: 'bigFence' };
    const wallKey = wallKeys[game.faction];
    const wallLevel = (game.buildings[wallKey] || { level: 0 }).level;
    return wallLevel * (CONFIG.WALL_DEF_PER_LEVEL[game.faction] || 0.03);
  }
};
