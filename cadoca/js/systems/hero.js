// hero.js — Hero XP, levels, abilities, equipment
const Hero = {
  gainXP(hero, xp) {
    if (!hero.alive) return;
    hero.xp += xp;
    while (hero.xp >= hero.xpToNext) {
      hero.xp -= hero.xpToNext;
      hero.level++;
      hero.xpToNext = Math.floor(hero.xpToNext * 1.5);
      hero.atk += 5;
      hero.def += 5;

      // Unlock abilities
      if (CONFIG.HERO_ABILITIES[hero.level]) {
        hero.abilities.push(CONFIG.HERO_ABILITIES[hero.level]);
      }

      State.addEvent(`⭐ Hero leveled up to Lv ${hero.level}!`);
    }
  },

  die(hero, game) {
    hero.alive = false;
    hero.respawnAt = game.gameTick + Math.floor(CONFIG.HERO_RESPAWN_TIME / game.gameSpeed);
    State.addEvent(`💀 Hero has fallen! Respawns in 30 minutes.`);
  },

  checkRespawn(hero, game) {
    if (!hero.alive && hero.respawnAt && game.gameTick >= hero.respawnAt) {
      hero.alive = true;
      hero.respawnAt = null;
      State.addEvent(`✨ Hero has respawned!`);
    }
  },

  equipItem(hero, slot, item) {
    hero.equipment[slot] = item;
  },

  getItems() {
    return [
      { name: 'Slightly Used Rubber Duck Shield', slot: 'armor', def: 5, desc: 'Squeaks when hit.' },
      { name: 'Flip Flop of Doom', slot: 'weapon', atk: 12, desc: 'The most feared weapon.' },
      { name: 'Sunglasses of Wisdom', slot: 'accessory', atk: 3, def: 3, desc: 'Too cool for school.' },
      { name: 'Towel of Power', slot: 'armor', def: 8, desc: 'Don\'t panic.' },
      { name: 'Fork Trident', slot: 'weapon', atk: 15, desc: 'Dinner is served.' },
      { name: 'Newspaper Greatsword', slot: 'weapon', atk: 18, desc: 'Extra! Extra! You\'re dead!' },
      { name: 'Bottle Cap Amulet', slot: 'accessory', atk: 5, def: 5, desc: 'Shiny and protective.' },
      { name: 'Cardboard Plate Mail', slot: 'armor', def: 12, desc: 'Recycled protection.' },
      { name: 'Rubber Duck Mace', slot: 'weapon', atk: 20, desc: 'Squeak. Squeak. SQUEAK.' },
      { name: 'Duct Tape Gauntlets', slot: 'accessory', atk: 8, def: 2, desc: 'Fixes everything.' }
    ];
  },

  getRandomItem() {
    const items = this.getItems();
    return items[Math.floor(Math.random() * items.length)];
  }
};
