// morale.js — Morale calculation, effects, faction drivers
const Morale = {
  update(game) {
    // Natural decay
    game.morale -= CONFIG.MORALE_DECAY_PER_TICK;

    // Faction building bonuses
    const fData = State.getFactionData(game.faction);
    const moraleBuildings = { capybara: 'hotSpring', cat: 'scratchingPost', dog: 'goodBoyShrine' };
    const moraleKey = moraleBuildings[game.faction];
    const moraleBuilding = game.buildings[moraleKey];
    if (moraleBuilding && moraleBuilding.level > 0) {
      game.morale += fData.buildings[moraleKey].value * moraleBuilding.level * 0.5;
    }

    // Sunset deck (capybara) — passive morale even during attacks
    if (game.faction === 'capybara' && game.buildings.sunsetDeck && game.buildings.sunsetDeck.level > 0) {
      game.morale += game.buildings.sunsetDeck.level;
    }

    // Howl tower (dog) — bonus during attacks
    if (game.faction === 'dog' && game.buildings.howlTower && game.buildings.howlTower.level > 0) {
      game.morale += game.buildings.howlTower.level * 0.5;
    }

    // Clamp
    game.morale = Math.max(CONFIG.MORALE_MIN, Math.min(CONFIG.MORALE_MAX, game.morale));

    // Desert check at 0 morale
    if (game.morale <= 0) {
      for (const [key, count] of Object.entries(game.army)) {
        if (count > 0 && Math.random() < CONFIG.MORALE_DESERT_CHANCE) {
          game.army[key]--;
          if (game.army[key] <= 0) delete game.army[key];
          State.addEvent(`💔 A ${State.getFactionData(game.faction).troops[key]?.name || 'troop'} deserted due to 0 Morale!`);
          break;
        }
      }
    }
  },

  getProductionBonus(morale) {
    return (morale - 50) / 50 * 0.1; // -10% to +10%
  },

  getAtkBonus(morale) {
    return (morale - 50) / 50 * CONFIG.MORALE_HIGH_BONUS; // -20% to +20%
  },

  getBuildSpeedBonus(morale) {
    return (morale - 50) / 50 * 0.15; // -15% to +15%
  }
};
