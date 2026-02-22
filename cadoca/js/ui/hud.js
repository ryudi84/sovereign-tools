// hud.js — Top bar, resources, wave counter, morale
const HUD = {
  render(game) {
    const fData = State.getFactionData(game.faction);
    const icons = CONFIG.RESOURCE_ICONS[game.faction];
    const names = CONFIG.RESOURCE_NAMES[game.faction];
    const cap = Resources.getStorageCapacity(game);
    const prod = Resources.getProduction(game);
    const upkeep = Resources.getUpkeep(game);

    const moraleColor = game.morale > 70 ? '#4CAF50' : game.morale > 30 ? '#FF9800' : '#F44336';
    const shieldIcon = game.shieldActive ? '🛡️' : '';

    let timerHTML = '';
    if (game.faction === 'cat' && game.soloTimer !== null) {
      const mins = Math.floor(game.soloTimer / 60);
      const secs = game.soloTimer % 60;
      timerHTML = `<div class="hud-timer ${game.soloTimer < 300 ? 'timer-urgent' : ''}">⏰ ${mins}:${String(secs).padStart(2, '0')}</div>`;
    }

    return `
      <div class="hud faction-hud-${game.faction}">
        <div class="hud-resources">
          <div class="hud-res" title="${names.r1}: ${Math.floor(game.resources.r1)}/${cap.r1} (+${prod.r1.toFixed(1)}/tick)">
            ${icons.r1} <span>${Math.floor(game.resources.r1)}</span>
          </div>
          <div class="hud-res" title="${names.r2}: ${Math.floor(game.resources.r2)}/${cap.r2} (+${prod.r2.toFixed(1)}/tick)">
            ${icons.r2} <span>${Math.floor(game.resources.r2)}</span>
          </div>
          <div class="hud-res" title="${names.r3}: ${Math.floor(game.resources.r3)}/${cap.r3} (+${prod.r3.toFixed(1)}/tick)">
            ${icons.r3} <span>${Math.floor(game.resources.r3)}</span>
          </div>
          <div class="hud-res" title="${names.r4}: ${Math.floor(game.resources.r4)}/${cap.r4} (upkeep: -${upkeep})">
            ${icons.r4} <span>${Math.floor(game.resources.r4)}</span>
          </div>
          <div class="hud-morale" title="Morale: ${Math.floor(game.morale)}/100" style="color: ${moraleColor}">
            ${icons.morale} <span>${Math.floor(game.morale)}</span>
            <div class="morale-bar"><div class="morale-fill" style="width: ${game.morale}%; background: ${moraleColor}"></div></div>
          </div>
        </div>
        <div class="hud-info">
          ${shieldIcon}
          <span class="hud-wave">🌊 Wave ${game.wave}</span>
          ${timerHTML}
          ${game.faction === 'cat' ? `<span class="hud-loot">📦 Loot: ${game.totalLoot}/${CONFIG.CAT_LOOT_TARGET}</span>` : ''}
        </div>
        <div class="hud-actions">
          <button class="btn btn-small btn-icon" onclick="Game.togglePause()" title="${game.paused ? 'Resume' : 'Pause'}">${game.paused ? '▶️' : '⏸️'}</button>
          <button class="btn btn-small btn-icon" onclick="Dialogs.showSave()" title="Save">💾</button>
          <button class="btn btn-small btn-icon" onclick="Audio.toggle()" title="Toggle Sound">🔊</button>
          <button class="btn btn-small btn-icon" onclick="Game.showSettings()" title="Settings">⚙️</button>
        </div>
      </div>
    `;
  }
};
