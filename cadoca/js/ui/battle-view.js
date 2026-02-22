// battle-view.js — Battle animation, tactic selection, results
const BattleView = {
  activeBattle: null,

  startDefenseBattle(enemyArmy, enemyFaction) {
    this.activeBattle = { enemyArmy, enemyFaction, phase: 'tactic', isPlayerAttacking: false };
    Audio.play('wave');
    Game.render();
  },

  startCatRaid(villageId) {
    const game = State.game;
    const village = game.catVillages[villageId];
    if (!village || village.raided) return;
    const defenses = Waves.getVillageDefenses(village);
    this.activeBattle = {
      enemyArmy: defenses,
      enemyFaction: village.faction,
      phase: 'tactic',
      isPlayerAttacking: true,
      villageId
    };
    Audio.play('wave');
    Game.render();
  },

  render(game) {
    if (!this.activeBattle) return '';

    const battle = this.activeBattle;

    if (battle.phase === 'tactic') {
      return `
        <div class="battle-overlay">
          <div class="battle-panel">
            <h2>⚔️ ${battle.isPlayerAttacking ? 'RAID!' : 'INCOMING ATTACK!'}</h2>
            <div class="battle-armies">
              <div class="battle-side">
                <h3>${battle.isPlayerAttacking ? 'Your Army' : 'Enemy Army'}</h3>
                <div class="battle-units">
                  ${Object.entries(battle.isPlayerAttacking ? game.army : battle.enemyArmy).map(([k, v]) =>
                    `<div class="battle-unit"><img src="${SPRITES.toDataURL(SPRITES.unit(battle.isPlayerAttacking ? game.faction : battle.enemyFaction, k, 32))}" width="32" height="32"/> ${k}: ${v}</div>`
                  ).join('')}
                </div>
              </div>
              <div class="battle-vs">VS</div>
              <div class="battle-side">
                <h3>${battle.isPlayerAttacking ? 'Defenders' : 'Your Army'}</h3>
                <div class="battle-units">
                  ${Object.entries(battle.isPlayerAttacking ? battle.enemyArmy : game.army).map(([k, v]) =>
                    `<div class="battle-unit"><img src="${SPRITES.toDataURL(SPRITES.unit(battle.isPlayerAttacking ? battle.enemyFaction : game.faction, k, 32))}" width="32" height="32"/> ${k}: ${v}</div>`
                  ).join('')}
                </div>
              </div>
            </div>
            <h3>Choose Your Tactic!</h3>
            <div class="tactic-buttons">
              <button class="btn btn-tactic btn-charge" onclick="BattleView.chooseTactic('charge')">
                ⚔️ CHARGE<br><small>Beats Flank</small>
              </button>
              <button class="btn btn-tactic btn-flank" onclick="BattleView.chooseTactic('flank')">
                🏹 FLANK<br><small>Beats Defend</small>
              </button>
              <button class="btn btn-tactic btn-defend" onclick="BattleView.chooseTactic('defend')">
                🛡️ DEFEND<br><small>Beats Charge</small>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (battle.phase === 'result') {
      const r = battle.result;
      const playerWon = (battle.isPlayerAttacking && r.attackerWins) || (!battle.isPlayerAttacking && !r.attackerWins);
      return `
        <div class="battle-overlay">
          <div class="battle-panel ${playerWon ? 'battle-victory' : 'battle-defeat'}">
            <h2>${playerWon ? '🎉 VICTORY!' : '💔 DEFEAT!'}</h2>
            <div class="battle-result-info">
              <p class="tactic-result">Your tactic: <strong>${battle.playerTactic.toUpperCase()}</strong> vs Enemy: <strong>${battle.enemyTactic.toUpperCase()}</strong> → ${r.tacticResult.toUpperCase()}</p>
              <p class="battle-quip">"${r.quip}"</p>
              <div class="battle-losses">
                <p>Your losses: ${battle.isPlayerAttacking ? r.attackerTotalLost : r.defenderTotalLost} troops</p>
                <p>Enemy losses: ${battle.isPlayerAttacking ? r.defenderTotalLost : r.attackerTotalLost} troops</p>
                ${r.loot > 0 ? `<p>📦 Loot captured: ${r.loot}</p>` : ''}
              </div>
            </div>
            <button class="btn btn-primary" onclick="BattleView.closeBattle()">Continue</button>
          </div>
        </div>
      `;
    }

    return '';
  },

  chooseTactic(tactic) {
    const game = State.game;
    const battle = this.activeBattle;
    battle.playerTactic = tactic;
    battle.enemyTactic = Combat.aiPickTactic(battle.enemyFaction);

    Audio.play('battle');

    const result = Combat.resolve(game, {
      attackerArmy: battle.isPlayerAttacking ? { ...game.army } : battle.enemyArmy,
      attackerFaction: battle.isPlayerAttacking ? game.faction : battle.enemyFaction,
      defenderArmy: battle.isPlayerAttacking ? battle.enemyArmy : { ...game.army },
      defenderFaction: battle.isPlayerAttacking ? battle.enemyFaction : game.faction,
      attackerTactic: battle.isPlayerAttacking ? tactic : battle.enemyTactic,
      defenderTactic: battle.isPlayerAttacking ? battle.enemyTactic : tactic,
      isPlayerAttacking: battle.isPlayerAttacking
    });

    battle.result = result;
    battle.phase = 'result';

    // Cat raid: mark village
    if (battle.isPlayerAttacking && battle.villageId !== undefined) {
      const village = game.catVillages[battle.villageId];
      if (village) {
        village.raided = true;
        village.raidCount++;
      }
      // Check cat win
      if (game.totalLoot >= CONFIG.CAT_LOOT_TARGET) {
        State.dispatch('setGameOver', { victory: true });
      }
    }

    Game.render();
  },

  closeBattle() {
    this.activeBattle = null;
    if (State.game.gameOver) {
      if (State.game.victory) Screens.showVictory();
      else Screens.showDefeat();
    } else {
      Game.render();
    }
  }
};
