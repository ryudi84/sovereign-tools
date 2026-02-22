// audio.js — Web Audio API sound effects
const Audio = {
  ctx: null,
  enabled: true,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.enabled = false;
    }
  },

  play(type) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      gain.gain.value = 0.1;

      switch (type) {
        case 'build':
          osc.frequency.value = 440;
          osc.type = 'triangle';
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
          osc.start(); osc.stop(this.ctx.currentTime + 0.3);
          break;
        case 'train':
          osc.frequency.value = 523;
          osc.type = 'sine';
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
          osc.start(); osc.stop(this.ctx.currentTime + 0.2);
          break;
        case 'battle':
          osc.frequency.value = 220;
          osc.type = 'sawtooth';
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
          osc.start(); osc.stop(this.ctx.currentTime + 0.5);
          break;
        case 'wave':
          osc.frequency.value = 330;
          osc.type = 'square';
          gain.gain.value = 0.15;
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
          osc.start(); osc.stop(this.ctx.currentTime + 0.8);
          break;
        case 'victory':
          osc.frequency.value = 660;
          osc.type = 'sine';
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1);
          osc.start(); osc.stop(this.ctx.currentTime + 1);
          break;
        case 'click':
          osc.frequency.value = 800;
          osc.type = 'sine';
          gain.gain.value = 0.05;
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
          osc.start(); osc.stop(this.ctx.currentTime + 0.05);
          break;
      }
    } catch (e) {}
  },

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
};
