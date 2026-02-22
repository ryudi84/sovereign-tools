// map.js — Grid, fog of war, tile management
const GameMap = {
  init(game) {
    // Reveal tiles around starting position
    const { x, y } = game.playerPosition;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < CONFIG.MAP_SIZE && ny >= 0 && ny < CONFIG.MAP_SIZE) {
          game.revealedTiles[`${nx},${ny}`] = true;
        }
      }
    }
  },

  isRevealed(game, x, y) {
    return !!game.revealedTiles[`${x},${y}`];
  },

  revealRadius(game, x, y, radius) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy <= radius * radius) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < CONFIG.MAP_SIZE && ny >= 0 && ny < CONFIG.MAP_SIZE) {
            game.revealedTiles[`${nx},${ny}`] = true;
          }
        }
      }
    }
  },

  getTile(game, x, y) {
    if (y >= 0 && y < CONFIG.MAP_SIZE && x >= 0 && x < CONFIG.MAP_SIZE) {
      return game.map[y][x];
    }
    return null;
  },

  getDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
};
