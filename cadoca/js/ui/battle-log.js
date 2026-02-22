// battle-log.js — Scrolling event/combat log
const BattleLog = {
  render(game) {
    const events = game.eventLog.slice(0, 20);
    return `
      <div class="battle-log">
        <h3>📜 Event Log</h3>
        <div class="log-entries">
          ${events.length === 0 ? '<p class="empty-text">Nothing happened yet. How peaceful.</p>' :
            events.map(e => `<div class="log-entry"><span class="log-text">${e.text}</span></div>`).join('')}
        </div>
      </div>
    `;
  }
};
