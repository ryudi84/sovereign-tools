// flavor.js — Building/troop descriptions and battle quips
const FLAVOR = {
  buildings: {
    capybara: {
      mainLodge: ["A modest lodge. Smells like grass.", "The lodge has a waiting room now. Fancy.", "The Grand Lodge. Has a chandelier made of sticks."],
      grassBarn: ["A barn. For grass. Revolutionary.", "Grass as far as the eye can see (inside a barn).", "The Grass Singularity. It's mostly grass."],
      peelCellar: ["Smells citrusy down here.", "Orange peels, organized by vintage.", "The Peel Vault. Fort Knox wishes."],
      napBarracks: ["Soldiers train here. Slowly.", "Now with actual weapons (foam).", "Elite napping warriors. They fight in their sleep."],
      rallyPond: ["A pond where capybaras gather to discuss strategy. Mostly they just float.", "The war room. With lily pads.", "Strategic floating headquarters."],
      mudWall: ["A wall of mud. It's... something.", "Surprisingly effective mud fortification.", "This wall has scared off actual armies. It's still mud."],
      chillAcademy: ["Where knowledge happens. Sometimes.", "They study the ancient art of not caring.", "PhD programs in Advanced Relaxation."],
      hotSpring: ["Ahhhh. That's the whole description.", "Steam rises. Worries fall.", "The morale factory. Just add water."],
      marketplace: ["Trade grass for mud. The economy is weird here.", "Bustling market! (3 capybaras floating nearby)", "International trade hub. Still mostly grass."],
      snootTower: ["A tower for snooting. Don't ask.", "Upgraded snoot range.", "The All-Seeing Snoot."],
      vibeShrine: ["The vibes are immaculate.", "Vibes have been upgraded to PREMIUM.", "The vibes here could end wars."],
      embassy: ["For making friends. Capybaras are great at that.", "Alliance HQ. Everyone is welcome.", "The most welcoming embassy in history."],
      workshop: ["Siege weapons? That seems aggressive for capybaras.", "Fine, we'll build war machines. But CHILL ones.", "Weapons of mass relaxation."],
      hammockStation: ["Two queues! Twice the napping.", "Double the training, same vibes.", "The efficiency is almost stressful. Almost."],
      grandHotSpring: ["The dream begins...", "", ""],
      residence: ["Home sweet home.", "Upgraded living quarters.", "Luxury capybara condos."],
      herbalistHut: ["Healing with herbs and good vibes.", "The hospital smells like lavender.", "Troops emerge feeling REFRESHED."],
      sunsetDeck: ["Best seats for the sunset.", "Even during battles, the sunset is nice.", "Morale that nothing can touch."]
    }
  },

  battleQuips: {
    attackerWins: [
      "Victory! The enemy has been thoroughly vibed upon.",
      "They came. They saw. They got belly-flopped.",
      "The enemy retreats! Your troops celebrate with a group nap.",
      "Flawless victory! Well, mostly. Someone tripped.",
      "The battlefield is yours! It smells like victory (and wet fur)."
    ],
    defenderWins: [
      "The walls held! Mostly because nobody wanted to get up.",
      "Defense successful! The couch remains unflipped.",
      "They tried. They failed. We napped through it.",
      "Your forces stood firm! (Some were just too lazy to move.)",
      "Invaders repelled! Time for a celebratory bath."
    ],
    attackerLoses: [
      "Retreat! RETREAT! (Nobody runs very fast though.)",
      "That... didn't go as planned.",
      "The enemy was tougher than expected. Who knew walls worked?",
      "Your troops return home. Morale is... complicated.",
      "Tactical withdrawal! (That means we lost.)"
    ],
    draw: [
      "Both sides stared at each other and decided this wasn't worth it.",
      "A draw! Everyone goes home confused.",
      "Nobody won. But did anyone really lose? (Yes. Resources were lost.)"
    ]
  },

  unitQuips: {
    capybara: {
      chillGuard: "Doesn't even flinch. Literally. Ever.",
      splashWarrior: "Death from above! (Belly flop attack)",
      snootArcher: "Shoots orange seeds with surprising accuracy.",
      zenMaster: "Heals wounds with the power of not caring.",
      spaScout: "Just vibing... and spying.",
      mudGolem: "It's mud. It's angry. It's MUDDY.",
      hotSpringRam: "A bathtub on wheels. Devastating.",
      elderCapybara: "So wise it reduces enemy loyalty by existing."
    },
    cat: {
      shadowPouncer: "Fast, deadly, and will knock your stuff over.",
      yarnTangler: "Wraps enemies in yarn. It's effective and adorable.",
      whiskerSpy: "You can't see me. I'm a shadow. FASTEST SPY ALIVE.",
      hairballCatapult: "Aim for the curtains!",
      midnightRider: "Best raider in the game. Deal with it.",
      aloofGeneral: "Commands through sheer indifference.",
      tableFlipper: "EVERYTHING. MUST. GO.",
      fatCatLord: "Too majestic to fight. Charms enemies into submission."
    },
    dog: {
      loyalGuard: "WILL NOT MOVE. Seen a squirrel? Still won't move. Okay maybe for the squirrel.",
      fetchRunner: "Ball? BALL! BALL BALL BALL!",
      barkCannon: "Literally barks so loud it hurts. BORK.",
      noseScout: "I SMELL EVERYTHING. Everything. Please stop.",
      packLeader: "Rallies troops with the power of being a Very Good Boy.",
      armoredRetriever: "The tankiest unit in the game. Covered in tin cans and love.",
      digTunneler: "Goes UNDER the wall. Nobody expected that. (Everyone expected that.)",
      alphaDog: "The biggest, loyalest, most intimidating good boy."
    }
  }
};
