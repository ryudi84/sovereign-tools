// names.js — Silly name generator
const NAMES = {
  capybara: {
    prefixes: ['Lord', 'Sir', 'Baron', 'Duke', 'Vibemaster', 'Grand', 'Elder', 'The Honorable', 'Chief', 'Professor'],
    names: ['Splashington', 'Chills-a-Lot', 'Mudbottom', 'Serenity', 'Puddles', 'Floaty', 'Snooze', 'Blobsworth', 'Cozington', 'Plumpkin'],
    suffixes: ['the Chill', 'the Unbothered', 'of the Hot Spring', 'the Relaxed', 'Supreme', 'the Spherical', 'Esq.', 'PhD in Vibes', 'the Immovable', 'General']
  },
  cat: {
    prefixes: ['Shadow', 'Void', 'Baron von', 'Dark', 'The', 'Night', 'Lord', 'Empress', 'Phantom', 'Chaos'],
    names: ['Fluffkins', 'Whiskersworth', 'Hairball', 'Midnight', 'Pounce', 'Scratch', 'Hiss', 'Claws McGee', 'Silky', 'Mischief'],
    suffixes: ['III', 'the Indifferent', 'of the Void', 'the Destroyer', 'Supreme', 'the Fabulous', 'Who Knocks Things Over', 'the Aloof', 'of Darkness', 'Esq.']
  },
  dog: {
    prefixes: ['Captain', 'Sir', 'General', 'Commander', 'Sergeant', 'The Good', 'Big', 'Old', 'Brave', 'Loyal'],
    names: ['Borks', 'Fetch-a-Lot', 'Wagsworth', 'Sniffles', 'Biscuit', 'Rufus', 'Woofington', 'Chonk', 'Buddy', 'Rex'],
    suffixes: ['the Good Boy', 'the Brave', 'Who Sits', 'the Loyal', 'of the Yard', 'Supreme', 'the Golden', 'Who Fetches', 'the Bestest', 'DDS']
  },

  generate(faction) {
    const data = this[faction];
    const prefix = data.prefixes[Math.floor(Math.random() * data.prefixes.length)];
    const name = data.names[Math.floor(Math.random() * data.names.length)];
    const suffix = data.suffixes[Math.floor(Math.random() * data.suffixes.length)];
    return `${prefix} ${name} ${suffix}`;
  }
};
