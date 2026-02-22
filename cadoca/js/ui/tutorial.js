// tutorial.js — First-time player guide
const Tutorial = {
  steps: [
    { text: "Welcome to CADOCA! 🎮 Let's get you started. Click anywhere to continue.", target: null },
    { text: "👆 The top bar shows your resources. Keep them flowing!", target: '.hud' },
    { text: "🏗️ Click the Buildings tab to construct your empire. Start with the basics!", target: '.sidebar-tabs' },
    { text: "⚔️ Train troops in the Troops tab. You'll need them for defense!", target: '.sidebar-tabs' },
    { text: "🌊 Waves of enemies will attack! Choose tactics wisely: Charge > Flank > Defend > Charge", target: null },
    { text: "💾 Don't forget to save! Auto-save runs every 5 minutes.", target: '.hud-actions' },
    { text: "You're ready! Build, defend, conquer. Good luck, Commander! 🎖️", target: null }
  ],

  currentStep: 0,
  active: false,

  start() {
    this.currentStep = 0;
    this.active = true;
    this.showStep();
  },

  showStep() {
    if (this.currentStep >= this.steps.length) {
      this.active = false;
      this.hide();
      return;
    }
    const step = this.steps[this.currentStep];
    let tooltip = document.getElementById('tutorial-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'tutorial-tooltip';
      document.body.appendChild(tooltip);
    }
    tooltip.innerHTML = `
      <div class="tutorial-content">
        <p>${step.text}</p>
        <div class="tutorial-nav">
          <span>${this.currentStep + 1}/${this.steps.length}</span>
          <button class="btn btn-small btn-primary" onclick="Tutorial.next()">Next →</button>
          <button class="btn btn-small btn-ghost" onclick="Tutorial.skip()">Skip</button>
        </div>
      </div>
    `;
    tooltip.style.display = 'block';
  },

  next() {
    this.currentStep++;
    this.showStep();
  },

  skip() {
    this.active = false;
    this.hide();
  },

  hide() {
    const tooltip = document.getElementById('tutorial-tooltip');
    if (tooltip) tooltip.style.display = 'none';
  }
};
