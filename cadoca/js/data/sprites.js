// sprites.js — All SVG art drawn programmatically. NO external images.
const SPRITES = {
  // Color palettes
  palette: {
    capybara: {
      primary: '#8B6914', secondary: '#A0522D', accent: '#FF8C00',
      light: '#DEB887', bg: '#F5E6D3', outline: '#4A3728',
      grass: '#7CB342', mud: '#795548', vibe: '#FFD54F', peel: '#FF9800'
    },
    cat: {
      primary: '#4A148C', secondary: '#1A237E', accent: '#F44336',
      light: '#9575CD', bg: '#2C2C3A', outline: '#1A1A2E',
      fish: '#42A5F5', yarn: '#E91E63', nap: '#7E57C2', cardboard: '#8D6E63'
    },
    dog: {
      primary: '#F9A825', secondary: '#795548', accent: '#D32F2F',
      light: '#FFE082', bg: '#FFF8E1', outline: '#4E342E',
      bone: '#EFEBE9', stick: '#6D4C41', rub: '#FFAB91', ball: '#66BB6A'
    }
  },

  // Generate SVG string for a unit
  unit(faction, type, size = 64) {
    const p = this.palette[faction];
    const s = size;
    const h = s / 2;
    const q = s / 4;

    const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">`;
    const svgEnd = `</svg>`;

    // Common body shapes
    const roundBody = (cx, cy, rx, ry, fill) =>
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${p.outline}" stroke-width="2.5"/>`;
    const eyes = (cx, cy, r, angry = false) => {
      const eyeW = r * 0.3;
      return `<circle cx="${cx - eyeW}" cy="${cy}" r="${r * 0.15}" fill="${p.outline}"/>` +
             `<circle cx="${cx + eyeW}" cy="${cy}" r="${r * 0.15}" fill="${p.outline}"/>` +
             (angry ? `<line x1="${cx - eyeW - 3}" y1="${cy - 4}" x2="${cx - eyeW + 3}" y2="${cy - 2}" stroke="${p.outline}" stroke-width="1.5"/>
                       <line x1="${cx + eyeW - 3}" y1="${cy - 2}" x2="${cx + eyeW + 3}" y2="${cy - 4}" stroke="${p.outline}" stroke-width="1.5"/>` : '');
    };
    const blush = (cx, cy) =>
      `<ellipse cx="${cx - 8}" cy="${cy + 3}" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.6"/>` +
      `<ellipse cx="${cx + 8}" cy="${cy + 3}" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.6"/>`;
    const stubbyLegs = (cx, cy, w) =>
      `<rect x="${cx - w * 0.35}" y="${cy}" width="${w * 0.2}" height="${w * 0.2}" rx="3" fill="${p.primary}" stroke="${p.outline}" stroke-width="1.5"/>` +
      `<rect x="${cx + w * 0.15}" y="${cy}" width="${w * 0.2}" height="${w * 0.2}" rx="3" fill="${p.primary}" stroke="${p.outline}" stroke-width="1.5"/>`;

    if (faction === 'capybara') {
      const bodyColor = '#C4A265';
      const noseColor = '#8B6914';
      switch (type) {
        case 'chillGuard':
          return svgStart +
            // Tin can helmet
            `<rect x="${h-10}" y="6" width="20" height="14" rx="3" fill="#B0BEC5" stroke="${p.outline}" stroke-width="2"/>` +
            `<rect x="${h-12}" y="16" width="24" height="4" fill="#90A4AE" stroke="${p.outline}" stroke-width="1.5"/>` +
            roundBody(h, h + 2, 18, 16, bodyColor) +
            eyes(h, h - 2, 18) + blush(h, h) +
            // Shield (bottle cap)
            `<circle cx="${h - 18}" cy="${h + 5}" r="8" fill="#FFD54F" stroke="${p.outline}" stroke-width="2"/>` +
            `<text x="${h - 18}" y="${h + 8}" text-anchor="middle" font-size="7" fill="${p.outline}">★</text>` +
            stubbyLegs(h, h + 16, s) +
            // Tiny smile
            `<path d="M${h-4} ${h+4} Q${h} ${h+8} ${h+4} ${h+4}" fill="none" stroke="${p.outline}" stroke-width="1.5"/>` +
            svgEnd;
        case 'splashWarrior':
          return svgStart +
            // Cardboard armor
            `<rect x="${h-14}" y="${h-12}" width="28" height="22" rx="2" fill="#D7CCC8" stroke="${p.outline}" stroke-width="2"/>` +
            `<text x="${h}" y="${h+3}" text-anchor="middle" font-size="6" fill="${p.outline}">ARMOR</text>` +
            roundBody(h, h + 2, 16, 14, bodyColor) +
            eyes(h, h - 4, 16) + blush(h, h - 2) +
            stubbyLegs(h, h + 14, s) +
            `<path d="M${h-3} ${h+2} Q${h} ${h+5} ${h+3} ${h+2}" fill="none" stroke="${p.outline}" stroke-width="1.5"/>` +
            svgEnd;
        case 'snootArcher':
          return svgStart +
            roundBody(h, h, 16, 14, bodyColor) +
            eyes(h, h - 4, 16) + blush(h, h - 2) +
            // Bow (bent stick)
            `<path d="M${h+16} ${h-14} Q${h+24} ${h} ${h+16} ${h+14}" fill="none" stroke="#6D4C41" stroke-width="3"/>` +
            `<line x1="${h+16}" y1="${h-12}" x2="${h+16}" y2="${h+12}" stroke="#A1887F" stroke-width="1"/>` +
            stubbyLegs(h, h + 12, s) +
            `<path d="M${h-3} ${h+2} Q${h} ${h+5} ${h+3} ${h+2}" fill="none" stroke="${p.outline}" stroke-width="1.5"/>` +
            // Snoot (long nose)
            `<ellipse cx="${h+8}" cy="${h}" rx="6" ry="3" fill="${noseColor}" stroke="${p.outline}" stroke-width="1.5"/>` +
            svgEnd;
        case 'zenMaster':
          return svgStart +
            // Halo
            `<ellipse cx="${h}" cy="${h-16}" rx="12" ry="4" fill="none" stroke="#FFD54F" stroke-width="2" opacity="0.7"/>` +
            roundBody(h, h + 2, 18, 16, bodyColor) +
            // Closed eyes (meditating)
            `<path d="M${h-6} ${h-2} Q${h-4} ${h-4} ${h-2} ${h-2}" fill="none" stroke="${p.outline}" stroke-width="2"/>` +
            `<path d="M${h+2} ${h-2} Q${h+4} ${h-4} ${h+6} ${h-2}" fill="none" stroke="${p.outline}" stroke-width="2"/>` +
            blush(h, h) +
            stubbyLegs(h, h + 16, s) +
            `<path d="M${h-4} ${h+4} Q${h} ${h+7} ${h+4} ${h+4}" fill="none" stroke="${p.outline}" stroke-width="1.5"/>` +
            svgEnd;
        case 'spaScout':
          return svgStart +
            roundBody(h, h, 14, 12, bodyColor) +
            eyes(h, h - 3, 14) + blush(h, h - 1) +
            // Towel on head
            `<path d="M${h-12} ${h-10} Q${h} ${h-20} ${h+12} ${h-10}" fill="#E8F5E9" stroke="${p.outline}" stroke-width="1.5"/>` +
            stubbyLegs(h, h + 10, s) +
            `<path d="M${h-3} ${h+1} Q${h} ${h+4} ${h+3} ${h+1}" fill="none" stroke="${p.outline}" stroke-width="1.5"/>` +
            svgEnd;
        case 'mudGolem':
          return svgStart +
            // Big chunky body
            roundBody(h, h + 4, 22, 20, '#795548') +
            // Mud drips
            `<path d="M${h-10} ${h-14} Q${h-12} ${h-8} ${h-8} ${h-6}" fill="#5D4037" stroke="none"/>` +
            `<path d="M${h+8} ${h-14} Q${h+12} ${h-8} ${h+10} ${h-6}" fill="#5D4037" stroke="none"/>` +
            // Glowing eyes
            `<circle cx="${h-6}" cy="${h-2}" r="3" fill="#FFD54F"/>` +
            `<circle cx="${h+6}" cy="${h-2}" r="3" fill="#FFD54F"/>` +
            `<circle cx="${h-6}" cy="${h-2}" r="1.5" fill="#FF8F00"/>` +
            `<circle cx="${h+6}" cy="${h-2}" r="1.5" fill="#FF8F00"/>` +
            stubbyLegs(h, h + 22, s * 1.1) +
            svgEnd;
        case 'hotSpringRam':
          return svgStart +
            // Bathtub shape
            `<rect x="${h-20}" y="${h-6}" width="40" height="20" rx="8" fill="#E0E0E0" stroke="${p.outline}" stroke-width="2.5"/>` +
            // Water inside
            `<rect x="${h-16}" y="${h-2}" width="32" height="12" rx="5" fill="#81D4FA" opacity="0.7"/>` +
            // Capybara peeking out
            `<ellipse cx="${h}" cy="${h-4}" rx="10" ry="8" fill="${bodyColor}" stroke="${p.outline}" stroke-width="2"/>` +
            eyes(h, h - 6, 10) +
            `<path d="M${h-2} ${h} Q${h} ${h+2} ${h+2} ${h}" fill="none" stroke="${p.outline}" stroke-width="1"/>` +
            // Wheels
            `<circle cx="${h-14}" cy="${h+16}" r="4" fill="#616161" stroke="${p.outline}" stroke-width="1.5"/>` +
            `<circle cx="${h+14}" cy="${h+16}" r="4" fill="#616161" stroke="${p.outline}" stroke-width="1.5"/>` +
            // Ram horn at front
            `<polygon points="${h+22},${h} ${h+30},${h+4} ${h+22},${h+8}" fill="#8D6E63" stroke="${p.outline}" stroke-width="2"/>` +
            svgEnd;
        default: // elderCapybara or fallback
          return svgStart +
            // Crown
            `<polygon points="${h-8},${h-16} ${h-4},${h-22} ${h},${h-16} ${h+4},${h-22} ${h+8},${h-16}" fill="#FF9800" stroke="${p.outline}" stroke-width="1.5"/>` +
            roundBody(h, h, 18, 16, bodyColor) +
            eyes(h, h - 4, 18) + blush(h, h - 2) +
            stubbyLegs(h, h + 14, s) +
            // Wise smile
            `<path d="M${h-5} ${h+3} Q${h} ${h+8} ${h+5} ${h+3}" fill="none" stroke="${p.outline}" stroke-width="1.5"/>` +
            // Staff
            `<line x1="${h+20}" y1="${h-18}" x2="${h+20}" y2="${h+20}" stroke="#6D4C41" stroke-width="3"/>` +
            `<circle cx="${h+20}" cy="${h-18}" r="4" fill="#FFD54F" stroke="${p.outline}" stroke-width="1.5"/>` +
            svgEnd;
      }
    }

    if (faction === 'cat') {
      const bodyColor = '#7E57C2';
      const darkBody = '#4A148C';
      switch (type) {
        case 'shadowPouncer':
          return svgStart +
            // Cat body
            roundBody(h, h + 2, 14, 13, bodyColor) +
            // Ears
            `<polygon points="${h-10},${h-10} ${h-6},${h-20} ${h-2},${h-10}" fill="${bodyColor}" stroke="${p.outline}" stroke-width="2"/>` +
            `<polygon points="${h+2},${h-10} ${h+6},${h-20} ${h+10},${h-10}" fill="${bodyColor}" stroke="${p.outline}" stroke-width="2"/>` +
            // Red eyes
            `<circle cx="${h-5}" cy="${h-2}" r="2.5" fill="#F44336"/>` +
            `<circle cx="${h+5}" cy="${h-2}" r="2.5" fill="#F44336"/>` +
            `<circle cx="${h-5}" cy="${h-2}" r="1" fill="#FFEB3B"/>` +
            `<circle cx="${h+5}" cy="${h-2}" r="1" fill="#FFEB3B"/>` +
            // Claws
            `<path d="M${h-14} ${h+6} L${h-20} ${h+2} M${h-14} ${h+8} L${h-20} ${h+6} M${h-14} ${h+10} L${h-20} ${h+10}" stroke="#E0E0E0" stroke-width="1.5" fill="none"/>` +
            stubbyLegs(h, h + 13, s) +
            // Tail
            `<path d="M${h+14} ${h+5} Q${h+24} ${h-8} ${h+20} ${h-16}" fill="none" stroke="${bodyColor}" stroke-width="4"/>` +
            svgEnd;
        case 'yarnTangler':
          return svgStart +
            roundBody(h, h + 2, 14, 13, bodyColor) +
            `<polygon points="${h-10},${h-10} ${h-6},${h-20} ${h-2},${h-10}" fill="${bodyColor}" stroke="${p.outline}" stroke-width="2"/>` +
            `<polygon points="${h+2},${h-10} ${h+6},${h-20} ${h+10},${h-10}" fill="${bodyColor}" stroke="${p.outline}" stroke-width="2"/>` +
            `<circle cx="${h-5}" cy="${h-2}" r="2" fill="#F44336"/>` +
            `<circle cx="${h+5}" cy="${h-2}" r="2" fill="#F44336"/>` +
            // Yarn ball weapon
            `<circle cx="${h+18}" cy="${h}" r="8" fill="#E91E63" stroke="${p.outline}" stroke-width="2"/>` +
            `<path d="M${h+12} ${h-2} Q${h+18} ${h-6} ${h+24} ${h-2}" fill="none" stroke="#F48FB1" stroke-width="1.5"/>` +
            `<path d="M${h+12} ${h+2} Q${h+18} ${h+6} ${h+24} ${h+2}" fill="none" stroke="#F48FB1" stroke-width="1.5"/>` +
            stubbyLegs(h, h + 13, s) +
            svgEnd;
        case 'whiskerSpy':
          return svgStart +
            roundBody(h, h + 2, 12, 11, '#212121') +
            `<polygon points="${h-8},${h-8} ${h-4},${h-18} ${h},${h-8}" fill="#212121" stroke="${p.outline}" stroke-width="2"/>` +
            `<polygon points="${h},${h-8} ${h+4},${h-18} ${h+8},${h-8}" fill="#212121" stroke="${p.outline}" stroke-width="2"/>` +
            // Glowing eyes only
            `<circle cx="${h-4}" cy="${h-2}" r="2" fill="#76FF03"/>` +
            `<circle cx="${h+4}" cy="${h-2}" r="2" fill="#76FF03"/>` +
            // Whiskers
            `<line x1="${h-12}" y1="${h}" x2="${h-4}" y2="${h+2}" stroke="#757575" stroke-width="0.8"/>` +
            `<line x1="${h-12}" y1="${h+3}" x2="${h-4}" y2="${h+3}" stroke="#757575" stroke-width="0.8"/>` +
            `<line x1="${h+4}" y1="${h+2}" x2="${h+12}" y2="${h}" stroke="#757575" stroke-width="0.8"/>` +
            `<line x1="${h+4}" y1="${h+3}" x2="${h+12}" y2="${h+3}" stroke="#757575" stroke-width="0.8"/>` +
            stubbyLegs(h, h + 11, s * 0.8) +
            svgEnd;
        case 'midnightRider':
          return svgStart +
            // Horse-like shape (another cat)
            roundBody(h, h + 6, 20, 14, '#311B92') +
            // Rider cat on top
            roundBody(h, h - 8, 10, 9, bodyColor) +
            `<polygon points="${h-6},${h-14} ${h-3},${h-22} ${h},${h-14}" fill="${bodyColor}" stroke="${p.outline}" stroke-width="1.5"/>` +
            `<polygon points="${h},${h-14} ${h+3},${h-22} ${h+6},${h-14}" fill="${bodyColor}" stroke="${p.outline}" stroke-width="1.5"/>` +
            `<circle cx="${h-3}" cy="${h-10}" r="1.5" fill="#F44336"/>` +
            `<circle cx="${h+3}" cy="${h-10}" r="1.5" fill="#F44336"/>` +
            // Sword
            `<line x1="${h+12}" y1="${h-20}" x2="${h+12}" y2="${h}" stroke="#B0BEC5" stroke-width="2.5"/>` +
            `<line x1="${h+8}" y1="${h-2}" x2="${h+16}" y2="${h-2}" stroke="#6D4C41" stroke-width="3"/>` +
            stubbyLegs(h, h + 18, s * 1.2) +
            svgEnd;
        default: // hairballCatapult, aloofGeneral, tableFlipper, fatCatLord
          return svgStart +
            roundBody(h, h, 16, 14, bodyColor) +
            `<polygon points="${h-10},${h-12} ${h-6},${h-22} ${h-2},${h-12}" fill="${bodyColor}" stroke="${p.outline}" stroke-width="2"/>` +
            `<polygon points="${h+2},${h-12} ${h+6},${h-22} ${h+10},${h-12}" fill="${bodyColor}" stroke="${p.outline}" stroke-width="2"/>` +
            `<circle cx="${h-5}" cy="${h-3}" r="2" fill="#F44336"/>` +
            `<circle cx="${h+5}" cy="${h-3}" r="2" fill="#F44336"/>` +
            stubbyLegs(h, h + 12, s) +
            `<path d="M${h+14} ${h+2} Q${h+24} ${h-10} ${h+20} ${h-18}" fill="none" stroke="${bodyColor}" stroke-width="4"/>` +
            svgEnd;
      }
    }

    if (faction === 'dog') {
      const bodyColor = '#FFB74D';
      const noseColor = '#5D4037';
      switch (type) {
        case 'loyalGuard':
          return svgStart +
            // Tin can helmet
            `<rect x="${h-10}" y="4" width="20" height="16" rx="4" fill="#B0BEC5" stroke="${p.outline}" stroke-width="2"/>` +
            roundBody(h, h + 2, 16, 15, bodyColor) +
            // Floppy ears
            `<ellipse cx="${h-14}" cy="${h-2}" rx="6" ry="10" fill="#E09550" stroke="${p.outline}" stroke-width="2"/>` +
            `<ellipse cx="${h+14}" cy="${h-2}" rx="6" ry="10" fill="#E09550" stroke="${p.outline}" stroke-width="2"/>` +
            eyes(h, h - 2, 16) + blush(h, h) +
            // Nose
            `<ellipse cx="${h}" cy="${h+3}" rx="4" ry="3" fill="${noseColor}"/>` +
            // Shield
            `<rect x="${h-22}" y="${h-4}" width="10" height="14" rx="2" fill="#D32F2F" stroke="${p.outline}" stroke-width="2"/>` +
            `<text x="${h-17}" y="${h+6}" text-anchor="middle" font-size="8" fill="#FFD54F">★</text>` +
            // Red bandana
            `<polygon points="${h-8},${h+8} ${h},${h+12} ${h+8},${h+8}" fill="#D32F2F" stroke="${p.outline}" stroke-width="1"/>` +
            stubbyLegs(h, h + 15, s) +
            // Tongue
            `<ellipse cx="${h+3}" cy="${h+8}" rx="3" ry="4" fill="#FF8A80"/>` +
            svgEnd;
        case 'fetchRunner':
          return svgStart +
            roundBody(h, h, 14, 13, bodyColor) +
            `<ellipse cx="${h-12}" cy="${h-2}" rx="5" ry="9" fill="#E09550" stroke="${p.outline}" stroke-width="2"/>` +
            `<ellipse cx="${h+12}" cy="${h-2}" rx="5" ry="9" fill="#E09550" stroke="${p.outline}" stroke-width="2"/>` +
            // Excited eyes (big!)
            `<circle cx="${h-5}" cy="${h-3}" r="3" fill="${p.outline}"/>` +
            `<circle cx="${h+5}" cy="${h-3}" r="3" fill="${p.outline}"/>` +
            `<circle cx="${h-4}" cy="${h-4}" r="1" fill="white"/>` +
            `<circle cx="${h+6}" cy="${h-4}" r="1" fill="white"/>` +
            // Tennis ball in mouth
            `<circle cx="${h}" cy="${h+4}" r="6" fill="#C0CA33" stroke="${p.outline}" stroke-width="1.5"/>` +
            `<path d="M${h-4} ${h+1} Q${h} ${h+6} ${h+4} ${h+1}" fill="none" stroke="white" stroke-width="1"/>` +
            // Red bandana
            `<polygon points="${h-8},${h+6} ${h},${h+10} ${h+8},${h+6}" fill="#D32F2F" stroke="${p.outline}" stroke-width="1"/>` +
            stubbyLegs(h, h + 11, s) +
            // Wagging tail
            `<path d="M${h+14} ${h} Q${h+22} ${h-12} ${h+18} ${h-18}" fill="none" stroke="${bodyColor}" stroke-width="4"/>` +
            svgEnd;
        case 'barkCannon':
          return svgStart +
            roundBody(h, h, 16, 14, bodyColor) +
            `<ellipse cx="${h-14}" cy="${h-2}" rx="5" ry="8" fill="#E09550" stroke="${p.outline}" stroke-width="2"/>` +
            `<ellipse cx="${h+14}" cy="${h-2}" rx="5" ry="8" fill="#E09550" stroke="${p.outline}" stroke-width="2"/>` +
            eyes(h, h - 3, 16) +
            // WIDE OPEN MOUTH (barking!)
            `<ellipse cx="${h}" cy="${h+5}" rx="10" ry="7" fill="#D32F2F" stroke="${p.outline}" stroke-width="2"/>` +
            `<ellipse cx="${h}" cy="${h+3}" rx="8" ry="3" fill="#FF8A80"/>` +
            // Sound waves
            `<path d="M${h+18} ${h-4} Q${h+24} ${h} ${h+18} ${h+4}" fill="none" stroke="#FFD54F" stroke-width="2" opacity="0.7"/>` +
            `<path d="M${h+22} ${h-6} Q${h+28} ${h} ${h+22} ${h+6}" fill="none" stroke="#FFD54F" stroke-width="1.5" opacity="0.5"/>` +
            stubbyLegs(h, h + 12, s) +
            svgEnd;
        case 'armoredRetriever':
          return svgStart +
            // Big armored body
            roundBody(h, h + 4, 22, 18, bodyColor) +
            // Tin can armor
            `<rect x="${h-18}" y="${h-8}" width="36" height="22" rx="4" fill="#B0BEC5" stroke="${p.outline}" stroke-width="2" opacity="0.8"/>` +
            `<text x="${h}" y="${h+6}" text-anchor="middle" font-size="6" fill="${p.outline}">ARMOR</text>` +
            // Head poking out
            `<ellipse cx="${h}" cy="${h-12}" rx="12" ry="10" fill="${bodyColor}" stroke="${p.outline}" stroke-width="2"/>` +
            `<ellipse cx="${h-10}" cy="${h-14}" rx="5" ry="8" fill="#E09550" stroke="${p.outline}" stroke-width="1.5"/>` +
            `<ellipse cx="${h+10}" cy="${h-14}" rx="5" ry="8" fill="#E09550" stroke="${p.outline}" stroke-width="1.5"/>` +
            eyes(h, h - 14, 12) +
            `<ellipse cx="${h}" cy="${h-10}" rx="3" ry="2" fill="${noseColor}"/>` +
            // Tongue out
            `<ellipse cx="${h+3}" cy="${h-6}" rx="2" ry="3" fill="#FF8A80"/>` +
            stubbyLegs(h, h + 20, s * 1.2) +
            svgEnd;
        default: // noseScout, packLeader, digTunneler, alphaDog
          return svgStart +
            roundBody(h, h, 15, 14, bodyColor) +
            `<ellipse cx="${h-13}" cy="${h-2}" rx="5" ry="9" fill="#E09550" stroke="${p.outline}" stroke-width="2"/>` +
            `<ellipse cx="${h+13}" cy="${h-2}" rx="5" ry="9" fill="#E09550" stroke="${p.outline}" stroke-width="2"/>` +
            eyes(h, h - 3, 15) + blush(h, h - 1) +
            `<ellipse cx="${h}" cy="${h+3}" rx="3" ry="2" fill="${noseColor}"/>` +
            `<polygon points="${h-6},${h+6} ${h},${h+10} ${h+6},${h+6}" fill="#D32F2F" stroke="${p.outline}" stroke-width="1"/>` +
            stubbyLegs(h, h + 12, s) +
            `<ellipse cx="${h+2}" cy="${h+6}" rx="2" ry="3" fill="#FF8A80"/>` +
            svgEnd;
      }
    }

    // Fallback
    return svgStart + roundBody(h, h, 16, 14, '#999') + eyes(h, h - 3, 16) + stubbyLegs(h, h + 12, s) + svgEnd;
  },

  // Building sprites
  building(faction, type, level = 1) {
    const p = this.palette[faction];
    const s = 80;
    const h = s / 2;
    const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">`;
    const svgEnd = `</svg>`;

    // Visual tier: 1-4 = basic, 5-9 = upgraded, 10 = max
    const tier = level >= 10 ? 3 : level >= 5 ? 2 : 1;
    const roofColor = faction === 'capybara' ? '#8D6E63' : faction === 'cat' ? '#311B92' : '#D32F2F';
    const wallColor = faction === 'capybara' ? '#EFEBE9' : faction === 'cat' ? '#37474F' : '#FFF8E1';
    const accentColor = p.accent;

    // Base building shape
    const baseBuilding = (extra = '') => {
      const wallH = tier === 3 ? 35 : tier === 2 ? 30 : 25;
      const wallW = tier === 3 ? 50 : tier === 2 ? 44 : 38;
      const roofH = tier === 3 ? 20 : tier === 2 ? 16 : 12;
      const cx = h;
      const baseY = s - 10;
      return svgStart +
        // Shadow
        `<ellipse cx="${cx}" cy="${baseY}" rx="${wallW/2 + 4}" ry="4" fill="rgba(0,0,0,0.1)"/>` +
        // Walls
        `<rect x="${cx - wallW/2}" y="${baseY - wallH}" width="${wallW}" height="${wallH}" rx="2" fill="${wallColor}" stroke="${p.outline}" stroke-width="2.5"/>` +
        // Roof
        `<polygon points="${cx - wallW/2 - 5},${baseY - wallH} ${cx},${baseY - wallH - roofH} ${cx + wallW/2 + 5},${baseY - wallH}" fill="${roofColor}" stroke="${p.outline}" stroke-width="2.5"/>` +
        // Door
        `<rect x="${cx - 5}" y="${baseY - 14}" width="10" height="14" rx="5 5 0 0" fill="${accentColor}" stroke="${p.outline}" stroke-width="1.5"/>` +
        // Window(s)
        (tier >= 2 ? `<rect x="${cx - 16}" y="${baseY - wallH + 8}" width="8" height="8" rx="1" fill="#81D4FA" stroke="${p.outline}" stroke-width="1"/>` +
                     `<rect x="${cx + 8}" y="${baseY - wallH + 8}" width="8" height="8" rx="1" fill="#81D4FA" stroke="${p.outline}" stroke-width="1"/>` : '') +
        // Level indicator
        `<text x="${cx}" y="${baseY - wallH - roofH - 2}" text-anchor="middle" font-size="10" fill="${p.outline}" font-weight="bold">Lv${level}</text>` +
        // Smoke for tier 3
        (tier === 3 ? `<circle cx="${cx + 8}" cy="${baseY - wallH - roofH - 8}" r="3" fill="#BDBDBD" opacity="0.5"><animate attributeName="cy" values="${baseY - wallH - roofH - 8};${baseY - wallH - roofH - 20}" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite"/></circle>` : '') +
        extra +
        svgEnd;
    };

    // Special buildings
    if (type === 'hotSpring' || type === 'scratchingPost' || type === 'goodBoyShrine') {
      return svgStart +
        // Special faction building
        `<ellipse cx="${h}" cy="${s - 12}" rx="30" ry="8" fill="rgba(0,0,0,0.1)"/>` +
        (faction === 'capybara' ?
          // Hot spring: pool of water with steam
          `<ellipse cx="${h}" cy="${s - 20}" rx="28" ry="14" fill="#81D4FA" stroke="${p.outline}" stroke-width="2.5"/>` +
          `<ellipse cx="${h}" cy="${s - 22}" rx="24" ry="10" fill="#B3E5FC" opacity="0.7"/>` +
          `<circle cx="${h - 8}" cy="${s - 34}" r="3" fill="white" opacity="0.4"><animate attributeName="cy" values="${s-34};${s-50}" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0" dur="3s" repeatCount="indefinite"/></circle>` +
          `<circle cx="${h + 5}" cy="${s - 32}" r="2.5" fill="white" opacity="0.3"><animate attributeName="cy" values="${s-32};${s-48}" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0" dur="2.5s" repeatCount="indefinite"/></circle>` +
          `<circle cx="${h}" cy="${s - 30}" r="2" fill="white" opacity="0.35"><animate attributeName="cy" values="${s-30};${s-46}" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.35;0" dur="2.8s" repeatCount="indefinite"/></circle>` +
          `<text x="${h}" y="12" text-anchor="middle" font-size="10" fill="${p.outline}" font-weight="bold">Lv${level}</text>`
        : faction === 'cat' ?
          // Scratching post
          `<rect x="${h - 6}" y="${s - 50}" width="12" height="40" rx="3" fill="#8D6E63" stroke="${p.outline}" stroke-width="2"/>` +
          `<line x1="${h - 4}" y1="${s - 45}" x2="${h + 4}" y2="${s - 40}" stroke="#A1887F" stroke-width="1"/>` +
          `<line x1="${h - 4}" y1="${s - 38}" x2="${h + 4}" y2="${s - 33}" stroke="#A1887F" stroke-width="1"/>` +
          `<line x1="${h - 4}" y1="${s - 31}" x2="${h + 4}" y2="${s - 26}" stroke="#A1887F" stroke-width="1"/>` +
          `<ellipse cx="${h}" cy="${s - 52}" rx="14" ry="6" fill="${p.primary}" stroke="${p.outline}" stroke-width="2"/>` +
          `<rect x="${h - 16}" y="${s - 14}" width="32" height="6" rx="2" fill="#6D4C41" stroke="${p.outline}" stroke-width="2"/>` +
          `<text x="${h}" y="12" text-anchor="middle" font-size="10" fill="${p.outline}" font-weight="bold">Lv${level}</text>`
        :
          // Good Boy Shrine
          `<rect x="${h - 16}" y="${s - 40}" width="32" height="30" rx="3" fill="#FFF8E1" stroke="${p.outline}" stroke-width="2.5"/>` +
          `<polygon points="${h - 20},${s - 40} ${h},${s - 55} ${h + 20},${s - 40}" fill="${p.accent}" stroke="${p.outline}" stroke-width="2.5"/>` +
          `<text x="${h}" y="${s - 22}" text-anchor="middle" font-size="16">🐕</text>` +
          `<text x="${h}" y="${s - 10}" text-anchor="middle" font-size="6" fill="${p.outline}">GOOD BOY</text>` +
          `<text x="${h}" y="10" text-anchor="middle" font-size="10" fill="${p.outline}" font-weight="bold">Lv${level}</text>`
        ) +
        svgEnd;
    }

    if (type === 'wall' || type === 'mudWall' || type === 'hairballWall' || type === 'bigFence') {
      const wallH = 10 + level * 3;
      return svgStart +
        `<rect x="5" y="${s - 10 - wallH}" width="${s - 10}" height="${wallH}" rx="2" fill="${wallColor}" stroke="${p.outline}" stroke-width="2.5"/>` +
        // Battlements
        `${Array.from({length: 5}, (_, i) => `<rect x="${10 + i * 14}" y="${s - 14 - wallH}" width="8" height="6" fill="${roofColor}" stroke="${p.outline}" stroke-width="1.5"/>`).join('')}` +
        `<text x="${h}" y="12" text-anchor="middle" font-size="10" fill="${p.outline}" font-weight="bold">Lv${level}</text>` +
        svgEnd;
    }

    return baseBuilding();
  },

  // Map tile sprites
  tile(type, revealed = true) {
    const s = 32;
    const h = s / 2;
    const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">`;
    const svgEnd = `</svg>`;

    if (!revealed) {
      // Sumi-e fog
      return svgStart +
        `<rect width="${s}" height="${s}" fill="#2C2C2C"/>` +
        `<circle cx="${h - 4}" cy="${h + 2}" r="8" fill="#3E3E3E" opacity="0.6"/>` +
        `<circle cx="${h + 6}" cy="${h - 3}" r="6" fill="#383838" opacity="0.5"/>` +
        `<circle cx="${h}" cy="${h}" r="4" fill="#444" opacity="0.4"/>` +
        svgEnd;
    }

    switch (type) {
      case 'plains':
        return svgStart + `<rect width="${s}" height="${s}" fill="#C5E1A5"/>` +
          `<circle cx="6" cy="20" r="2" fill="#A5D6A7" opacity="0.5"/>` +
          `<circle cx="22" cy="8" r="1.5" fill="#A5D6A7" opacity="0.5"/>` +
          `<circle cx="14" cy="26" r="1" fill="#81C784" opacity="0.4"/>` + svgEnd;
      case 'forest':
        return svgStart + `<rect width="${s}" height="${s}" fill="#81C784"/>` +
          `<polygon points="8,24 12,10 16,24" fill="#4CAF50"/>` +
          `<polygon points="18,26 22,14 26,26" fill="#388E3C"/>` +
          `<polygon points="12,28 16,16 20,28" fill="#43A047"/>` + svgEnd;
      case 'swamp':
        return svgStart + `<rect width="${s}" height="${s}" fill="#8D6E63"/>` +
          `<ellipse cx="${h}" cy="${h}" rx="12" ry="8" fill="#6D4C41" opacity="0.6"/>` +
          `<circle cx="10" cy="14" r="2" fill="#81D4FA" opacity="0.3"/>` +
          `<circle cx="22" cy="20" r="1.5" fill="#81D4FA" opacity="0.3"/>` + svgEnd;
      case 'mountain':
        return svgStart + `<rect width="${s}" height="${s}" fill="#BCAAA4"/>` +
          `<polygon points="4,28 16,6 28,28" fill="#8D6E63"/>` +
          `<polygon points="10,28 16,6 16,28" fill="#A1887F"/>` +
          `<polygon points="14,10 16,6 18,10" fill="white"/>` + svgEnd;
      case 'water':
        return svgStart + `<rect width="${s}" height="${s}" fill="#81D4FA"/>` +
          `<path d="M0 ${h} Q8 ${h-4} 16 ${h} Q24 ${h+4} 32 ${h}" fill="none" stroke="#4FC3F7" stroke-width="1.5" opacity="0.6"/>` +
          `<path d="M0 ${h+6} Q8 ${h+2} 16 ${h+6} Q24 ${h+10} 32 ${h+6}" fill="none" stroke="#4FC3F7" stroke-width="1" opacity="0.4"/>` + svgEnd;
      case 'village':
        return svgStart + `<rect width="${s}" height="${s}" fill="#FFF8E1"/>` +
          `<rect x="10" y="12" width="12" height="12" fill="#EFEBE9" stroke="#5D4037" stroke-width="1.5"/>` +
          `<polygon points="8,12 16,4 24,12" fill="#8D6E63" stroke="#5D4037" stroke-width="1.5"/>` +
          `<rect x="14" y="18" width="4" height="6" fill="#FF9800"/>` + svgEnd;
      case 'oasis':
        return svgStart + `<rect width="${s}" height="${s}" fill="#A5D6A7"/>` +
          `<ellipse cx="${h}" cy="${h+4}" rx="10" ry="6" fill="#4FC3F7" opacity="0.7"/>` +
          `<line x1="${h-4}" y1="${h-2}" x2="${h-6}" y2="${h-12}" stroke="#66BB6A" stroke-width="2"/>` +
          `<line x1="${h+4}" y1="${h-2}" x2="${h+6}" y2="${h-12}" stroke="#66BB6A" stroke-width="2"/>` +
          `<ellipse cx="${h-6}" cy="${h-13}" rx="4" ry="3" fill="#43A047"/>` +
          `<ellipse cx="${h+6}" cy="${h-13}" rx="4" ry="3" fill="#43A047"/>` + svgEnd;
      case 'ruins':
        return svgStart + `<rect width="${s}" height="${s}" fill="#D7CCC8"/>` +
          `<rect x="6" y="16" width="8" height="12" fill="#BCAAA4" stroke="#5D4037" stroke-width="1"/>` +
          `<rect x="18" y="20" width="8" height="8" fill="#BCAAA4" stroke="#5D4037" stroke-width="1"/>` +
          `<polygon points="6,16 10,10 14,16" fill="#8D6E63"/>` + svgEnd;
      default:
        return svgStart + `<rect width="${s}" height="${s}" fill="#E0E0E0"/>` + svgEnd;
    }
  },

  // Hero sprites
  hero(faction, size = 80) {
    const p = this.palette[faction];
    const s = size;
    const h = s / 2;
    const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">`;
    const svgEnd = `</svg>`;

    if (faction === 'capybara') {
      // The Absolute Unit — giant capybara with orange peel crown
      return svgStart +
        // Glow
        `<circle cx="${h}" cy="${h}" r="35" fill="#FFD54F" opacity="0.15"/>` +
        // Big body
        `<ellipse cx="${h}" cy="${h + 6}" rx="28" ry="22" fill="#C4A265" stroke="${p.outline}" stroke-width="3"/>` +
        // Crown of orange peels
        `<polygon points="${h-12},${h-16} ${h-8},${h-26} ${h-4},${h-16}" fill="#FF9800" stroke="${p.outline}" stroke-width="2"/>` +
        `<polygon points="${h-4},${h-16} ${h},${h-28} ${h+4},${h-16}" fill="#FFB74D" stroke="${p.outline}" stroke-width="2"/>` +
        `<polygon points="${h+4},${h-16} ${h+8},${h-26} ${h+12},${h-16}" fill="#FF9800" stroke="${p.outline}" stroke-width="2"/>` +
        // Eyes
        `<circle cx="${h-8}" cy="${h-4}" r="3" fill="${p.outline}"/>` +
        `<circle cx="${h+8}" cy="${h-4}" r="3" fill="${p.outline}"/>` +
        `<circle cx="${h-7}" cy="${h-5}" r="1" fill="white"/>` +
        `<circle cx="${h+9}" cy="${h-5}" r="1" fill="white"/>` +
        // Blush
        `<ellipse cx="${h-12}" cy="${h+2}" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>` +
        `<ellipse cx="${h+12}" cy="${h+2}" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>` +
        // Serene smile
        `<path d="M${h-6} ${h+6} Q${h} ${h+12} ${h+6} ${h+6}" fill="none" stroke="${p.outline}" stroke-width="2"/>` +
        // Stubby legs
        `<rect x="${h-20}" y="${h+24}" width="12" height="10" rx="4" fill="#C4A265" stroke="${p.outline}" stroke-width="2"/>` +
        `<rect x="${h+8}" y="${h+24}" width="12" height="10" rx="4" fill="#C4A265" stroke="${p.outline}" stroke-width="2"/>` +
        svgEnd;
    }
    if (faction === 'cat') {
      // The Void Starer
      return svgStart +
        `<circle cx="${h}" cy="${h}" r="35" fill="#7E57C2" opacity="0.1"/>` +
        `<ellipse cx="${h}" cy="${h + 4}" rx="22" ry="20" fill="#212121" stroke="${p.outline}" stroke-width="3"/>` +
        `<polygon points="${h-14},${h-14} ${h-8},${h-30} ${h-2},${h-14}" fill="#212121" stroke="${p.outline}" stroke-width="2.5"/>` +
        `<polygon points="${h+2},${h-14} ${h+8},${h-30} ${h+14},${h-14}" fill="#212121" stroke="${p.outline}" stroke-width="2.5"/>` +
        // Huge hypnotic eyes
        `<circle cx="${h-8}" cy="${h-4}" r="6" fill="#F44336"/>` +
        `<circle cx="${h+8}" cy="${h-4}" r="6" fill="#F44336"/>` +
        `<circle cx="${h-8}" cy="${h-4}" r="3" fill="#FFEB3B"/>` +
        `<circle cx="${h+8}" cy="${h-4}" r="3" fill="#FFEB3B"/>` +
        `<circle cx="${h-8}" cy="${h-4}" r="1.5" fill="#212121"/>` +
        `<circle cx="${h+8}" cy="${h-4}" r="1.5" fill="#212121"/>` +
        `<rect x="${h-18}" y="${h+22}" width="10" height="8" rx="3" fill="#212121" stroke="${p.outline}" stroke-width="2"/>` +
        `<rect x="${h+8}" y="${h+22}" width="10" height="8" rx="3" fill="#212121" stroke="${p.outline}" stroke-width="2"/>` +
        `<path d="M${h+20} ${h+6} Q${h+34} ${h-12} ${h+28} ${h-24}" fill="none" stroke="#212121" stroke-width="5"/>` +
        svgEnd;
    }
    // Dog — The Goodest Boy
    return svgStart +
      `<circle cx="${h}" cy="${h}" r="35" fill="#FFD54F" opacity="0.15"/>` +
      `<ellipse cx="${h}" cy="${h + 4}" rx="24" ry="20" fill="#FFB74D" stroke="${p.outline}" stroke-width="3"/>` +
      `<ellipse cx="${h-18}" cy="${h-4}" rx="8" ry="14" fill="#E09550" stroke="${p.outline}" stroke-width="2.5"/>` +
      `<ellipse cx="${h+18}" cy="${h-4}" rx="8" ry="14" fill="#E09550" stroke="${p.outline}" stroke-width="2.5"/>` +
      // Tin can helmet
      `<rect x="${h-14}" y="${h-24}" width="28" height="16" rx="5" fill="#B0BEC5" stroke="${p.outline}" stroke-width="2.5"/>` +
      // Happy eyes
      `<circle cx="${h-8}" cy="${h-4}" r="3" fill="${p.outline}"/>` +
      `<circle cx="${h+8}" cy="${h-4}" r="3" fill="${p.outline}"/>` +
      `<circle cx="${h-7}" cy="${h-5}" r="1.2" fill="white"/>` +
      `<circle cx="${h+9}" cy="${h-5}" r="1.2" fill="white"/>` +
      `<ellipse cx="${h}" cy="${h+4}" rx="5" ry="3" fill="#5D4037"/>` +
      // Big smile + tongue
      `<path d="M${h-8} ${h+6} Q${h} ${h+16} ${h+8} ${h+6}" fill="none" stroke="${p.outline}" stroke-width="2"/>` +
      `<ellipse cx="${h}" cy="${h+12}" rx="4" ry="5" fill="#FF8A80"/>` +
      // Red bandana
      `<polygon points="${h-14},${h+10} ${h},${h+18} ${h+14},${h+10}" fill="#D32F2F" stroke="${p.outline}" stroke-width="1.5"/>` +
      // Stick sword
      `<line x1="${h+26}" y1="${h-20}" x2="${h+26}" y2="${h+14}" stroke="#6D4C41" stroke-width="4"/>` +
      `<line x1="${h+20}" y1="${h-2}" x2="${h+32}" y2="${h-2}" stroke="#5D4037" stroke-width="4"/>` +
      // Legs
      `<rect x="${h-18}" y="${h+22}" width="12" height="10" rx="4" fill="#FFB74D" stroke="${p.outline}" stroke-width="2"/>` +
      `<rect x="${h+6}" y="${h+22}" width="12" height="10" rx="4" fill="#FFB74D" stroke="${p.outline}" stroke-width="2"/>` +
      // Wagging tail
      `<path d="M${h+22} ${h+10} Q${h+36} ${h-4} ${h+30} ${h-16}" fill="none" stroke="#FFB74D" stroke-width="5"/>` +
      svgEnd;
  },

  // Convert SVG string to data URL
  toDataURL(svgString) {
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  },

  // Get as Image element
  toImage(svgString) {
    const img = new Image();
    img.src = this.toDataURL(svgString);
    return img;
  }
};
