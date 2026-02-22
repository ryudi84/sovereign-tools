// dialogs.js — Popups, confirmations, save dialog
const Dialogs = {
  showSave() {
    let slotsHTML = '';
    for (let i = 1; i <= CONFIG.SAVE_SLOTS; i++) {
      const info = State.getSaveInfo(i);
      slotsHTML += `
        <div class="save-slot-dialog">
          <span>Slot ${i}: ${info ? `${State.getFactionData(info.faction).emoji} ${info.playerName} (Wave ${info.wave})` : 'Empty'}</span>
          <button class="btn btn-small btn-primary" onclick="State.save(${i}); Dialogs.close(); State.addEvent('💾 Game saved to slot ${i}'); Game.render()">Save</button>
        </div>`;
    }

    this.show(`
      <h2>💾 Save Game</h2>
      ${slotsHTML}
      <hr/>
      <button class="btn btn-secondary" onclick="Dialogs.exportSave()">📤 Export as JSON</button>
    `);
  },

  exportSave() {
    const data = State.exportSave();
    if (!data) return;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cadoca_${State.game.faction}_${State.game.playerName.replace(/\s/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.close();
  },

  showTileInfo(x, y, tile) {
    this.show(`
      <h2>🗺️ Tile (${x}, ${y})</h2>
      <p>Type: ${tile.type}</p>
      ${tile.owner === 'player' ? '<p>🏘️ Your Village</p>' : ''}
      ${tile.bonus ? `<p>🌴 Oasis: +25% ${tile.bonus}</p>` : ''}
      ${tile.type === 'ruins' ? '<p>🏚️ Ancient Ruins — might contain treasure</p>' : ''}
    `);
  },

  show(content) {
    let dialog = document.getElementById('dialog-overlay');
    if (!dialog) {
      dialog = document.createElement('div');
      dialog.id = 'dialog-overlay';
      document.body.appendChild(dialog);
    }
    dialog.innerHTML = `
      <div class="dialog-backdrop" onclick="Dialogs.close()"></div>
      <div class="dialog-box">
        ${content}
        <button class="btn btn-ghost dialog-close" onclick="Dialogs.close()">✕</button>
      </div>
    `;
    dialog.style.display = 'flex';
  },

  close() {
    const dialog = document.getElementById('dialog-overlay');
    if (dialog) dialog.style.display = 'none';
  }
};
