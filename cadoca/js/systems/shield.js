// shield.js — Shield hours, diminishing returns
const Shield = {
  activate(game) {
    if (game.shieldCooldownEnd > game.gameTick) return;
    game.shieldActive = true;
    game.shieldEnd = game.gameTick + Math.floor(CONFIG.SHIELD_DURATION / game.gameSpeed);
    game.shieldCooldownEnd = game.gameTick + Math.floor(CONFIG.SHIELD_COOLDOWN / game.gameSpeed);
    State.addEvent(`🛡️ Shield activated! You're protected for 2 hours.`);
  },

  update(game) {
    if (game.shieldActive && game.gameTick >= game.shieldEnd) {
      game.shieldActive = false;
      State.addEvent(`🛡️ Shield has expired.`);
    }
  },

  isActive(game) {
    return game.shieldActive;
  },

  getRaidDiminish(game, targetId) {
    const lastRaid = game.lastRaidTargets[targetId];
    if (!lastRaid) return 1;
    const elapsed = game.gameTick - lastRaid;
    if (elapsed < 30) return CONFIG.RAID_DIMINISH_30M;
    if (elapsed < 60) return CONFIG.RAID_DIMINISH_1H;
    return 1;
  }
};
