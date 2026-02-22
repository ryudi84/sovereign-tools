// identity.js — Faction oath, name generator, identity card
const Identity = {
  renderCard(faction, name) {
    const fData = State.getFactionData(faction);
    const heroUrl = SPRITES.toDataURL(SPRITES.hero(faction, 80));
    return `
      <div class="identity-card faction-card-${faction}">
        <div class="id-header">
          <span class="id-faction">${fData.emoji} ${fData.name}</span>
        </div>
        <div class="id-body">
          <img class="id-avatar" src="${heroUrl}" alt="avatar"/>
          <div class="id-info">
            <h3 class="id-name">${name}</h3>
            <p class="id-title">Commander</p>
            <p class="id-oath">"${fData.oath.substring(0, 60)}..."</p>
          </div>
        </div>
        <div class="id-footer">
          <span>CADOCA — The Great Pet War</span>
        </div>
      </div>
    `;
  }
};
