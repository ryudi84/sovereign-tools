// village-view.js — Village center, building grid
const VillageView = {
  render(game) {
    const fData = State.getFactionData(game.faction);
    const buildings = game.buildings;

    let gridHTML = '<div class="village-grid">';
    for (let i = 1; i <= CONFIG.BUILDING_SLOTS; i++) {
      const buildingEntry = Object.entries(fData.buildings).find(([k, b]) => b.slot === i);
      if (!buildingEntry) {
        gridHTML += `<div class="village-slot empty"><span class="slot-num">${i}</span><span>Empty</span></div>`;
        continue;
      }
      const [key, bData] = buildingEntry;
      const built = buildings[key];
      const level = built ? built.level : 0;
      const isBuilding = game.buildQueue.some(q => q.buildingKey === key);

      if (level > 0) {
        const buildingSvg = SPRITES.toDataURL(SPRITES.building(game.faction, key, level));
        gridHTML += `
          <div class="village-slot built ${isBuilding ? 'constructing' : ''}" onclick="Sidebar.currentTab='buildings'; Game.render()" title="${bData.name} Lv${level}">
            <img src="${buildingSvg}" alt="${bData.name}" class="building-sprite"/>
            <span class="slot-label">${bData.icon} Lv${level}</span>
          </div>`;
      } else {
        gridHTML += `
          <div class="village-slot empty" onclick="Sidebar.currentTab='buildings'; Game.render()" title="${bData.name} (not built)">
            <span class="slot-num">${bData.icon}</span>
            <span class="slot-name">${bData.name}</span>
          </div>`;
      }
    }
    gridHTML += '</div>';

    return `
      <div class="village-view">
        <h2>${fData.emoji} ${game.playerName}'s Village</h2>
        ${gridHTML}
      </div>
    `;
  }
};
