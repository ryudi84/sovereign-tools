// game.js — Main game loop, tick system, state machine
const Game = {
  intervals: [],
  currentView: 'village', // village, map
  autoSaveTimer: null,

  start() {
    this.stopAll();
    const app = document.getElementById('app');
    app.innerHTML = '';

    // Initial render
    this.render();

    // Start tutorial for new games
    if (State.game.gameTick === 0) {
      Tutorial.start();
    }

    // Game tick (every 1s real = 1 game tick with speed multiplier)
    this.intervals.push(setInterval(() => this.gameTick(), CONFIG.FAST_TICK));

    // Resource tick (every 10s real, but accelerated)
    this.intervals.push(setInterval(() => this.resourceTick(), CONFIG.RESOURCE_TICK / State.game.gameSpeed));

    // Auto-save
    this.autoSaveTimer = setInterval(() => {
      State.save(1);
      State.addEvent('💾 Auto-saved.');
    }, CONFIG.AUTOSAVE_INTERVAL);
  },

  stopAll() {
    this.intervals.forEach(i => clearInterval(i));
    this.intervals = [];
    if (this.autoSaveTimer) clearInterval(this.autoSaveTimer);
  },

  gameTick() {
    const game = State.game;
    if (!game || game.paused || game.gameOver) return;

    game.gameTick++;

    // Process build queue
    for (let i = game.buildQueue.length - 1; i >= 0; i--) {
      if (game.gameTick >= game.buildQueue[i].endTime) {
        const item = game.buildQueue.splice(i, 1)[0];
        State.dispatch('completeBuild', { buildingKey: item.buildingKey, level: item.targetLevel });
        Audio.play('build');
      }
    }

    // Process training queue
    for (let i = game.trainingQueue.length - 1; i >= 0; i--) {
      if (game.gameTick >= game.trainingQueue[i].endTime) {
        const item = game.trainingQueue.splice(i, 1)[0];
        State.dispatch('completeTraining', { unitKey: item.unitKey, count: item.count });
        Audio.play('train');
      }
    }

    // Morale update (every 10 ticks)
    if (game.gameTick % 10 === 0) {
      State.dispatch('updateMorale', {});
    }

    // Random events
    Events.update(game);

    // Shield update
    Shield.update(game);

    // Hero respawn check
    Hero.checkRespawn(game.hero, game);

    // Wave system (capybara & dog)
    if (game.faction !== 'cat') {
      game.waveTimer++;
      const interval = Waves.getWaveInterval(game);
      if (game.waveTimer >= interval && !BattleView.activeBattle) {
        const waveData = Waves.spawnWave(game);
        if (!Shield.isActive(game)) {
          BattleView.startDefenseBattle(waveData.army, waveData.faction);
        } else {
          State.addEvent(`🛡️ Wave ${game.wave} blocked by shield!`);
        }
      }
    }

    // Cat timer
    if (game.faction === 'cat' && game.soloTimer !== null) {
      game.soloTimer--;
      if (game.soloTimer <= 0) {
        if (game.totalLoot < CONFIG.CAT_LOOT_TARGET) {
          State.dispatch('setGameOver', { victory: false });
          Screens.showDefeat();
          return;
        }
      }
    }

    // Render
    this.render();
  },

  resourceTick() {
    if (!State.game || State.game.paused || State.game.gameOver) return;
    State.dispatch('updateResources', {});
  },

  render() {
    const game = State.game;
    if (!game) return;

    const app = document.getElementById('app');

    // Build main layout
    const battleOverlay = BattleView.render(game);

    let mainContent;
    if (this.currentView === 'map') {
      mainContent = MapRenderer.render(game);
    } else {
      mainContent = VillageView.render(game);
    }

    app.innerHTML = `
      ${HUD.render(game)}
      <div class="game-layout">
        <div class="panel-left">
          ${Sidebar.render(game)}
        </div>
        <div class="panel-center">
          <div class="view-tabs">
            <button class="btn btn-small ${this.currentView === 'village' ? 'active' : ''}" onclick="Game.setView('village')">🏘️ Village</button>
            <button class="btn btn-small ${this.currentView === 'map' ? 'active' : ''}" onclick="Game.setView('map')">🗺️ Map</button>
          </div>
          ${mainContent}
        </div>
        <div class="panel-right">
          ${BattleLog.render(game)}
        </div>
      </div>
      ${battleOverlay}
      ${game.paused ? '<div class="pause-overlay"><h1>⏸️ PAUSED</h1><p>Click resume to continue</p></div>' : ''}
    `;

    // Draw map canvas if visible
    if (this.currentView === 'map') {
      setTimeout(() => MapRenderer.draw(game), 50);
    }
  },

  setView(view) {
    this.currentView = view;
    this.render();
  },

  togglePause() {
    if (State.game.paused) {
      State.dispatch('unpause', {});
    } else {
      State.dispatch('pause', {});
    }
    this.render();
  },

  showSettings() {
    Dialogs.show(`
      <h2>⚙️ Settings</h2>
      <div class="settings-list">
        <label><span>Game Speed:</span>
          <select onchange="State.game.gameSpeed = parseInt(this.value)">
            <option value="5" ${State.game.gameSpeed === 5 ? 'selected' : ''}>Normal (5x)</option>
            <option value="10" ${State.game.gameSpeed === 10 ? 'selected' : ''}>Fast (10x)</option>
            <option value="20" ${State.game.gameSpeed === 20 ? 'selected' : ''}>Turbo (20x)</option>
          </select>
        </label>
        <label><span>Sound:</span>
          <button class="btn btn-small" onclick="Audio.toggle()">${Audio.enabled ? '🔊 On' : '🔇 Off'}</button>
        </label>
      </div>
      <hr/>
      <button class="btn btn-danger" onclick="if(confirm('Return to title?')){Game.stopAll();Screens.showTitle();Dialogs.close()}">🏠 Return to Title</button>
    `);
  }
};
