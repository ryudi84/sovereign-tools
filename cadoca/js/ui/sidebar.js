// sidebar.js — Build menu, troop training, research, hero
const Sidebar = {
  currentTab: 'buildings',

  render(game) {
    return `
      <div class="sidebar">
        <div class="sidebar-tabs">
          <button class="tab ${this.currentTab === 'buildings' ? 'active' : ''}" onclick="Sidebar.setTab('buildings')">🏗️</button>
          <button class="tab ${this.currentTab === 'troops' ? 'active' : ''}" onclick="Sidebar.setTab('troops')">⚔️</button>
          <button class="tab ${this.currentTab === 'army' ? 'active' : ''}" onclick="Sidebar.setTab('army')">🪖</button>
          <button class="tab ${this.currentTab === 'hero' ? 'active' : ''}" onclick="Sidebar.setTab('hero')">⭐</button>
        </div>
        <div class="sidebar-content">
          ${this.renderTab(game)}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.currentTab = tab;
    Game.render();
  },

  renderTab(game) {
    switch (this.currentTab) {
      case 'buildings': return this.renderBuildings(game);
      case 'troops': return this.renderTroops(game);
      case 'army': return this.renderArmy(game);
      case 'hero': return this.renderHero(game);
    }
  },

  renderBuildings(game) {
    const available = Buildings.getAvailable(game);
    const queue = game.buildQueue;
    const icons = CONFIG.RESOURCE_ICONS[game.faction];

    let queueHTML = '';
    if (queue.length > 0) {
      queueHTML = '<div class="build-queue"><h4>🔨 Building Queue</h4>';
      for (const item of queue) {
        const fData = State.getFactionData(game.faction);
        const bData = fData.buildings[item.buildingKey];
        const remaining = Math.max(0, item.endTime - game.gameTick);
        queueHTML += `<div class="queue-item"><span>${bData.icon} ${bData.name} Lv${item.targetLevel}</span><span>${remaining} ticks</span></div>`;
      }
      queueHTML += '</div>';
    }

    let buildingsHTML = '<div class="building-list">';
    for (const b of available) {
      const affordable = b.canBuild && b.canAfford;
      buildingsHTML += `
        <div class="building-item ${!b.canBuild ? 'locked' : ''} ${!b.canAfford ? 'expensive' : ''}">
          <div class="building-header" ${affordable ? `onclick="State.dispatch('startBuild', {buildingKey:'${b.key}'}); Audio.play('build'); Game.render()"` : ''}>
            <span class="building-icon">${b.icon}</span>
            <div class="building-info">
              <span class="building-name">${b.name} ${b.currentLevel > 0 ? `(Lv${b.currentLevel})` : ''}</span>
              <span class="building-desc">${b.desc}</span>
            </div>
            <span class="building-level">→ Lv${b.nextLevel}</span>
          </div>
          <div class="building-cost">
            <span>${icons.r1}${b.cost.r1}</span>
            <span>${icons.r2}${b.cost.r2}</span>
            <span>${icons.r3}${b.cost.r3}</span>
            <span>${icons.r4}${b.cost.r4}</span>
            <span>⏱️${b.buildTime}t</span>
          </div>
          ${!b.canBuild ? '<div class="building-prereq">Prerequisites not met</div>' : ''}
        </div>`;
    }
    buildingsHTML += '</div>';

    return queueHTML + buildingsHTML;
  },

  renderTroops(game) {
    const available = Units.getAvailable(game);
    const icons = CONFIG.RESOURCE_ICONS[game.faction];
    const queue = game.trainingQueue;

    let queueHTML = '';
    if (queue.length > 0) {
      queueHTML = '<div class="build-queue"><h4>⚔️ Training Queue</h4>';
      for (const item of queue) {
        const fData = State.getFactionData(game.faction);
        const uData = fData.troops[item.unitKey];
        const remaining = Math.max(0, item.endTime - game.gameTick);
        queueHTML += `<div class="queue-item"><span>${uData.name} ×${item.count}</span><span>${remaining} ticks</span></div>`;
      }
      queueHTML += '</div>';
    }

    let troopsHTML = '<div class="troop-list">';
    for (const u of available) {
      const canTrain = u.canTrain && u.canAfford;
      const unitSvg = SPRITES.toDataURL(SPRITES.unit(game.faction, u.key, 40));
      troopsHTML += `
        <div class="troop-item ${!u.canTrain ? 'locked' : ''} ${!u.canAfford ? 'expensive' : ''}">
          <div class="troop-header">
            <img class="troop-icon" src="${unitSvg}" alt="${u.name}" width="40" height="40"/>
            <div class="troop-info">
              <span class="troop-name">${u.name}</span>
              <span class="troop-stats">⚔${u.atk} 🛡${u.defInf}/${u.defCav} 💨${u.speed} 🎒${u.carry}</span>
              <span class="troop-count">Owned: ${u.currentCount}</span>
            </div>
          </div>
          <div class="troop-actions">
            <div class="building-cost">
              <span>${icons.r1}${u.cost.r1}</span>
              <span>${icons.r2}${u.cost.r2}</span>
              <span>${icons.r3}${u.cost.r3}</span>
              <span>${icons.r4}${u.cost.r4}</span>
            </div>
            ${canTrain ? `
              <div class="train-buttons">
                <button class="btn btn-small" onclick="State.dispatch('trainUnit',{unitKey:'${u.key}',count:1}); Audio.play('train'); Game.render()">+1</button>
                <button class="btn btn-small" onclick="State.dispatch('trainUnit',{unitKey:'${u.key}',count:5}); Audio.play('train'); Game.render()">+5</button>
                <button class="btn btn-small" onclick="State.dispatch('trainUnit',{unitKey:'${u.key}',count:10}); Audio.play('train'); Game.render()">+10</button>
              </div>
            ` : `<span class="troop-locked">${!u.canTrain ? '🔒 Locked' : '💰 Need resources'}</span>`}
          </div>
        </div>`;
    }
    troopsHTML += '</div>';
    return queueHTML + troopsHTML;
  },

  renderArmy(game) {
    const fData = State.getFactionData(game.faction);
    let total = 0;
    let html = '<div class="army-panel"><h3>🪖 Your Army</h3>';

    if (Object.keys(game.army).length === 0) {
      html += '<p class="empty-text">No troops yet. Train some!</p>';
    } else {
      html += '<div class="army-list">';
      for (const [key, count] of Object.entries(game.army)) {
        const uData = fData.troops[key] || Resources.getAnyTroopData(key);
        if (!uData || count <= 0) continue;
        total += count;
        const unitSvg = SPRITES.toDataURL(SPRITES.unit(game.faction, key, 32));
        html += `
          <div class="army-unit">
            <img src="${unitSvg}" width="32" height="32" alt="${uData.name}"/>
            <span>${uData.name}</span>
            <span class="army-count">×${count}</span>
          </div>`;
      }
      html += '</div>';
    }

    html += `<div class="army-total">Total: ${total} troops</div>`;
    html += `<div class="army-power">ATK: ${Units.getArmyPower(game.army, game.faction, 'atk')} | DEF: ${Units.getArmyPower(game.army, game.faction, 'defInf')}</div>`;

    // Cat solo: raid buttons
    if (game.faction === 'cat' && game.catVillages) {
      html += '<h3>🏘️ Raid Targets</h3><div class="raid-targets">';
      for (const v of game.catVillages) {
        html += `
          <div class="raid-target ${v.raided ? 'raided' : ''}">
            <span>${State.getFactionData(v.faction).emoji} ${v.name} (Diff: ${v.difficulty})</span>
            <span>Loot: ~${Object.values(v.loot).reduce((a, b) => a + b, 0)}</span>
            ${!v.raided && total > 0 ? `<button class="btn btn-small btn-danger" onclick="BattleView.startCatRaid(${v.id})">⚔️ Raid!</button>` : ''}
          </div>`;
      }
      html += '</div>';
    }

    html += '</div>';
    return html;
  },

  renderHero(game) {
    const hero = game.hero;
    const fData = State.getFactionData(game.faction);
    const heroUrl = SPRITES.toDataURL(SPRITES.hero(game.faction, 80));

    let equipHTML = '';
    for (const [slot, item] of Object.entries(hero.equipment)) {
      equipHTML += `<div class="equip-slot">
        <span class="equip-label">${slot}:</span>
        <span class="equip-item">${item ? `${item.name} (+${item.atk || 0} ATK, +${item.def || 0} DEF)` : 'Empty'}</span>
      </div>`;
    }

    return `
      <div class="hero-panel">
        <div class="hero-avatar"><img src="${heroUrl}" alt="Hero"/></div>
        <h3>${fData.hero.name}</h3>
        <p class="hero-desc">${fData.hero.desc}</p>
        <div class="hero-stats">
          <div class="hero-stat">Level: ${hero.level}</div>
          <div class="hero-stat">XP: ${hero.xp}/${hero.xpToNext}</div>
          <div class="xp-bar"><div class="xp-fill" style="width: ${(hero.xp / hero.xpToNext) * 100}%"></div></div>
          <div class="hero-stat">ATK: ${hero.atk}</div>
          <div class="hero-stat">DEF: ${hero.def}</div>
          <div class="hero-stat">Status: ${hero.alive ? '✅ Active' : '💀 Respawning...'}</div>
        </div>
        <div class="hero-equipment">
          <h4>Equipment</h4>
          ${equipHTML}
          <button class="btn btn-small" onclick="Sidebar.findLoot()">🎲 Adventure (find loot)</button>
        </div>
        <div class="hero-abilities">
          <h4>Abilities</h4>
          ${Object.entries(fData.hero.abilities).map(([lv, ab]) =>
            `<div class="ability ${hero.level >= parseInt(lv) ? 'unlocked' : 'locked'}">
              <span>Lv${lv}: ${ab.name}</span>
              <span>${ab.desc}</span>
            </div>`
          ).join('')}
        </div>
      </div>
    `;
  },

  findLoot() {
    if (!State.game.hero.alive) return;
    const item = Hero.getRandomItem();
    Hero.equipItem(State.game.hero, item.slot, item);
    State.addEvent(`🎁 Hero found: ${item.name}! (${item.desc})`);
    State.game.hero.atk += (item.atk || 0);
    State.game.hero.def += (item.def || 0);
    Audio.play('victory');
    Game.render();
  }
};
