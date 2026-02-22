// screens.js — Title screen, faction select, victory/defeat
const Screens = {
  showTitle() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="screen title-screen">
        <div class="title-art">
          <div class="title-characters">
            <div class="title-char capybara-char" style="animation-delay: 0s">🐹</div>
            <div class="title-char dog-char" style="animation-delay: 0.3s">🐕</div>
            <div class="title-char cat-char" style="animation-delay: 0.6s">🐱</div>
          </div>
          <h1 class="game-title">CADOCA</h1>
          <h2 class="game-subtitle">The Great Pet War</h2>
          <p class="game-tagline">Ca.pybaras · Do.gs · Ca.ts</p>
        </div>
        <div class="title-buttons">
          <button class="btn btn-primary btn-large" onclick="Screens.showFactionSelect()">⚔️ New Game</button>
          <button class="btn btn-secondary btn-large" onclick="Screens.showLoadScreen()">💾 Load Game</button>
        </div>
        <div class="title-footer">
          <p>A Travian-style strategy game with animals in trash armor</p>
        </div>
      </div>
    `;
  },

  showFactionSelect() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="screen faction-screen">
        <h1>Choose Your Faction</h1>
        <div class="faction-cards">
          ${this.renderFactionCard('capybara', CAPYBARA)}
          ${this.renderFactionCard('cat', CAT)}
          ${this.renderFactionCard('dog', DOG)}
        </div>
        <button class="btn btn-ghost" onclick="Screens.showTitle()">← Back</button>
      </div>
    `;
  },

  renderFactionCard(id, data) {
    const heroSvg = SPRITES.hero(id, 100);
    const heroUrl = SPRITES.toDataURL(heroSvg);
    const soloDesc = {
      capybara: 'City Builder + Tower Defense',
      cat: 'Speedrun Raider (30 min timer)',
      dog: 'Survival Horde (Endless Waves)'
    };
    return `
      <div class="faction-card faction-${id}" onclick="Screens.selectFaction('${id}')">
        <div class="faction-hero"><img src="${heroUrl}" alt="${data.name}"/></div>
        <h2>${data.emoji} ${data.name}</h2>
        <p class="faction-motto">"${data.motto}"</p>
        <div class="faction-info">
          <p><strong>Solo Mode:</strong> ${soloDesc[id]}</p>
          <p><strong>Style:</strong> ${id === 'capybara' ? 'Economy-focused builders' : id === 'cat' ? 'Fast, deadly raiders' : 'Defensive territory control'}</p>
        </div>
        <div class="faction-resources">
          ${Object.values(data.resources).map(r => `<span>${r.icon} ${r.name}</span>`).join(' ')}
        </div>
      </div>
    `;
  },

  selectFaction(faction) {
    const app = document.getElementById('app');
    const fData = State.getFactionData(faction);
    const name = NAMES.generate(faction);
    app.innerHTML = `
      <div class="screen oath-screen faction-bg-${faction}">
        <h1>${fData.emoji} The ${fData.name}</h1>
        <div class="oath-box">
          <h2>The Sacred Oath</h2>
          <p class="oath-text">"${fData.oath}"</p>
        </div>
        <div class="name-section">
          <h3>Your Name, Commander:</h3>
          <div class="name-generator">
            <input type="text" id="playerName" value="${name}" class="name-input"/>
            <button class="btn btn-small" onclick="document.getElementById('playerName').value = NAMES.generate('${faction}')">🎲 Reroll</button>
          </div>
        </div>
        <div class="identity-preview">
          ${Identity.renderCard(faction, name)}
        </div>
        <div class="oath-buttons">
          <button class="btn btn-primary btn-large" onclick="Screens.startGame('${faction}')">📜 I Swear This Oath</button>
          <button class="btn btn-ghost" onclick="Screens.showFactionSelect()">← Different Faction</button>
        </div>
      </div>
    `;
  },

  startGame(faction) {
    const name = document.getElementById('playerName').value || NAMES.generate(faction);
    State.game = State.createNew(faction, name);
    GameMap.init(State.game);
    Audio.init();
    Game.start();
  },

  showLoadScreen() {
    const app = document.getElementById('app');
    let slotsHTML = '';
    for (let i = 1; i <= CONFIG.SAVE_SLOTS; i++) {
      const info = State.getSaveInfo(i);
      if (info) {
        const date = new Date(info.lastSaved).toLocaleString();
        slotsHTML += `
          <div class="save-slot filled" onclick="Screens.loadSlot(${i})">
            <h3>Slot ${i}</h3>
            <p>${State.getFactionData(info.faction).emoji} ${info.playerName}</p>
            <p>Wave ${info.wave} | Tick ${info.gameTick}</p>
            <p class="save-date">${date}</p>
            <button class="btn btn-danger btn-small" onclick="event.stopPropagation(); Screens.deleteSlot(${i})">🗑️</button>
          </div>`;
      } else {
        slotsHTML += `<div class="save-slot empty"><h3>Slot ${i}</h3><p>Empty</p></div>`;
      }
    }

    app.innerHTML = `
      <div class="screen load-screen">
        <h1>💾 Load Game</h1>
        <div class="save-slots">${slotsHTML}</div>
        <div class="import-section">
          <h3>Import Save</h3>
          <input type="file" id="importFile" accept=".json" onchange="Screens.importFile(event)"/>
        </div>
        <button class="btn btn-ghost" onclick="Screens.showTitle()">← Back</button>
      </div>
    `;
  },

  loadSlot(slot) {
    if (State.load(slot)) {
      Audio.init();
      Game.start();
    }
  },

  deleteSlot(slot) {
    if (confirm('Delete this save?')) {
      State.deleteSave(slot);
      this.showLoadScreen();
    }
  },

  importFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (State.importSave(e.target.result)) {
        Audio.init();
        Game.start();
      } else {
        alert('Invalid save file!');
      }
    };
    reader.readAsText(file);
  },

  showVictory() {
    const game = State.game;
    const fData = State.getFactionData(game.faction);
    const app = document.getElementById('app');
    Audio.play('victory');
    app.innerHTML = `
      <div class="screen victory-screen faction-bg-${game.faction}">
        <h1>🎉 VICTORY! 🎉</h1>
        <div class="victory-hero"><img src="${SPRITES.toDataURL(SPRITES.hero(game.faction, 120))}" alt="Hero"/></div>
        <h2>${fData.emoji} ${game.playerName}</h2>
        <p class="victory-text">${game.faction === 'capybara' ? 'The Grand Hot Spring is complete! Maximum vibes achieved.' :
          game.faction === 'cat' ? `Loot target reached! ${game.totalLoot} loot collected!` :
          `Survived ${game.wave} waves! The Loyal Legion stands firm.`}</p>
        <div class="stats-grid">
          <div class="stat">⚔️ Battles Won: ${game.stats.battlesWon}</div>
          <div class="stat">💀 Units Killed: ${game.stats.unitsKilled}</div>
          <div class="stat">📦 Total Loot: ${game.totalLoot}</div>
          <div class="stat">🏗️ Highest Wonder Lv: ${game.stats.wonderLevel}</div>
          <div class="stat">🌊 Highest Wave: ${game.stats.highestWave}</div>
        </div>
        <button class="btn btn-primary btn-large" onclick="Screens.showTitle()">🏠 Main Menu</button>
      </div>
    `;
  },

  showDefeat() {
    const game = State.game;
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="screen defeat-screen">
        <h1>💔 DEFEAT</h1>
        <h2>${State.getFactionData(game.faction).emoji} ${game.playerName}</h2>
        <p>${game.faction === 'cat' ? 'Time ran out! Not enough loot.' : 'Your village has fallen.'}</p>
        <div class="stats-grid">
          <div class="stat">🌊 Wave Reached: ${game.wave}</div>
          <div class="stat">⚔️ Battles Won: ${game.stats.battlesWon}</div>
          <div class="stat">📦 Total Loot: ${game.totalLoot}</div>
        </div>
        <button class="btn btn-primary btn-large" onclick="Screens.showTitle()">🏠 Try Again</button>
      </div>
    `;
  }
};
