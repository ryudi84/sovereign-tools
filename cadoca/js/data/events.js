// events.js — Random event database
const RANDOM_EVENTS = {
  capybara: [
    { text: "A capybara fell asleep in the mud pit. Production halted for a moment.", effects: { morale: 5, r2: -10 }, icon: '😴' },
    { text: "Beautiful sunset spotted! Everyone stopped to watch.", effects: { morale: 3 }, icon: '🌅' },
    { text: "A group bath session broke out spontaneously.", effects: { morale: 8, r3: 20 }, icon: '🛁' },
    { text: "An orange rolled downhill into town. Free snack!", effects: { r4: 30 }, icon: '🍊' },
    { text: "A butterfly landed on the Elder's nose. Profound silence ensued.", effects: { morale: 5 }, icon: '🦋' },
    { text: "The mud pit achieved perfect consistency today.", effects: { r2: 50 }, icon: '✨' },
    { text: "Someone found a rubber duck in the hot spring. Morale through the roof.", effects: { morale: 10 }, icon: '🦆' },
    { text: "A gentle rain made the grass extra lush.", effects: { r1: 40 }, icon: '🌧️' },
    { text: "Two capybaras had a staring contest. Both won.", effects: { morale: 3 }, icon: '👀' },
    { text: "A bird sat on a capybara. Neither cared.", effects: { morale: 2 }, icon: '🐦' }
  ],
  cat: [
    { text: "A cat stared at your wall for 6 hours. Nothing happened. Or did it?", effects: { morale: -3 }, icon: '👁️' },
    { text: "Someone knocked a vase off a table. Glorious.", effects: { morale: 5 }, icon: '💥' },
    { text: "A mysterious cardboard box appeared. Everyone wants to sit in it.", effects: { r4: 30, morale: 5 }, icon: '📦' },
    { text: "Successful midnight yarn heist!", effects: { r2: 50 }, icon: '🧶' },
    { text: "A cat brought you a dead fish. How... thoughtful.", effects: { r1: 30, morale: 2 }, icon: '🐟' },
    { text: "The 3 AM zoomies struck. Everyone ran around for no reason.", effects: { morale: 8, r3: -20 }, icon: '💨' },
    { text: "A laser pointer was spotted. All military operations suspended.", effects: { morale: 10 }, icon: '🔴' },
    { text: "A cat fit into a container half its size. Physics is crying.", effects: { r4: 20, morale: 3 }, icon: '🫠' },
    { text: "The Void was stared into. It blinked first.", effects: { morale: 5 }, icon: '🌑' },
    { text: "A cucumber appeared behind a cat. Mass panic, then pride.", effects: { morale: -2, r3: 10 }, icon: '🥒' }
  ],
  dog: [
    { text: "A dog dug up something in the yard. It's a boot.", effects: { r2: 3, morale: -2 }, icon: '👢' },
    { text: "TENNIS BALL SPOTTED! All dogs abandon posts momentarily.", effects: { morale: 8, r4: -10 }, icon: '🎾' },
    { text: "Someone said 'Who's a good boy?' Productivity doubled briefly.", effects: { morale: 10 }, icon: '🥰' },
    { text: "A stick of LEGENDARY quality was found.", effects: { r2: 60, morale: 5 }, icon: '🪵' },
    { text: "The mailman approached. DEFENSES ACTIVATED. False alarm.", effects: { morale: 3 }, icon: '📮' },
    { text: "Group howling session at sunset. Beautiful.", effects: { morale: 8 }, icon: '🌙' },
    { text: "A belly rub chain reaction started. Nobody worked for 5 minutes.", effects: { r3: 30, morale: 5 }, icon: '🐾' },
    { text: "Someone dropped a bone. Three dogs claimed it simultaneously.", effects: { r1: 20, morale: -1 }, icon: '🦴' },
    { text: "The squirrel was spotted again. Full alert status.", effects: { morale: 5 }, icon: '🐿️' },
    { text: "A treat was found behind the couch. Ancient treasure.", effects: { r1: 30, r4: 10 }, icon: '🦴' }
  ]
};
