// map-renderer.js — Canvas map with fog of war
const MapRenderer = {
  tileSize: 32,

  render(game) {
    const size = CONFIG.MAP_SIZE;
    const ts = this.tileSize;
    const totalSize = size * ts;

    return `
      <div class="map-view">
        <h2>🗺️ World Map</h2>
        <div class="map-container" style="width:${totalSize}px; height:${totalSize}px;">
          <canvas id="mapCanvas" width="${totalSize}" height="${totalSize}" onclick="MapRenderer.onClick(event)"></canvas>
        </div>
        <div class="map-legend">
          <span>🟩 Plains</span> <span>🌲 Forest</span> <span>🟫 Swamp</span>
          <span>⛰️ Mountain</span> <span>🌊 Water</span> <span>🏘️ Village</span>
          <span>🌴 Oasis</span> <span>🏚️ Ruins</span> <span>⬛ Fog</span>
        </div>
      </div>
    `;
  },

  draw(game) {
    const canvas = document.getElementById('mapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = CONFIG.MAP_SIZE;
    const ts = this.tileSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const tile = game.map[y][x];
        const revealed = GameMap.isRevealed(game, x, y);
        const svgStr = SPRITES.tile(tile.type, revealed);
        const img = new Image();
        img.src = SPRITES.toDataURL(svgStr);
        // Draw synchronously using a closure
        ((px, py) => {
          img.onload = () => ctx.drawImage(img, px, py, ts, ts);
        })(x * ts, y * ts);

        // Player marker
        if (x === game.playerPosition.x && y === game.playerPosition.y) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(x * ts + ts / 2, y * ts + ts / 2, ts / 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }
  },

  onClick(event) {
    const canvas = document.getElementById('mapCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.tileSize);
    const y = Math.floor((event.clientY - rect.top) / this.tileSize);

    if (x >= 0 && x < CONFIG.MAP_SIZE && y >= 0 && y < CONFIG.MAP_SIZE) {
      const game = State.game;
      if (GameMap.isRevealed(game, x, y)) {
        const tile = game.map[y][x];
        Dialogs.showTileInfo(x, y, tile);
      } else {
        // Scout this tile
        State.dispatch('revealTile', { x, y });
        GameMap.revealRadius(game, x, y, 1);
        State.addEvent(`🔭 Scouted tile (${x}, ${y})`);
        Game.render();
      }
    }
  }
};
