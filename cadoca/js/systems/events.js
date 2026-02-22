// events.js — Random events, triggers
const Events = {
  lastEventTick: 0,
  EVENT_INTERVAL: 30, // game ticks between events

  update(game) {
    if (game.gameTick - this.lastEventTick >= this.EVENT_INTERVAL) {
      this.lastEventTick = game.gameTick;
      if (Math.random() < 0.4) {
        State.dispatch('triggerEvent', {});
      }
    }
  }
};
