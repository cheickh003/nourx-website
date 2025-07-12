const fs = require('fs');
const path = require('path');

const flagSvgs = {
  'ci': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="1" height="2" fill="#f77f00"/>
  <rect width="1" height="2" x="1" fill="#ffffff"/>
  <rect width="1" height="2" x="2" fill="#009e60"/>
</svg>`,
  'sn': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="1" height="2" fill="#00853f"/>
  <rect width="1" height="2" x="1" fill="#fdef42"/>
  <rect width="1" height="2" x="2" fill="#e31e24"/>
  <polygon points="1.5,0.5 1.6,0.8 1.9,0.8 1.65,1 1.75,1.3 1.5,1.1 1.25,1.3 1.35,1 1.1,0.8 1.4,0.8" fill="#00853f"/>
</svg>`,
  'ml': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="1" height="2" fill="#14b53a"/>
  <rect width="1" height="2" x="1" fill="#fcd116"/>
  <rect width="1" height="2" x="2" fill="#ce1126"/>
</svg>`,
  'bf': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="1" fill="#ef2b2d"/>
  <rect width="3" height="1" y="1" fill="#009e49"/>
  <polygon points="1.5,0.5 1.6,0.8 1.9,0.8 1.65,1 1.75,1.3 1.5,1.1 1.25,1.3 1.35,1 1.1,0.8 1.4,0.8" fill="#fcd116"/>
</svg>`,
  'bj': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="1" height="2" fill="#008751"/>
  <rect width="2" height="1" x="1" fill="#fcd116"/>
  <rect width="2" height="1" x="1" y="1" fill="#e8112d"/>
</svg>`,
  'tg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="0.4" fill="#006a4e"/>
  <rect width="3" height="0.4" y="0.4" fill="#ffce00"/>
  <rect width="3" height="0.4" y="0.8" fill="#006a4e"/>
  <rect width="3" height="0.4" y="1.2" fill="#ffce00"/>
  <rect width="3" height="0.4" y="1.6" fill="#006a4e"/>
  <rect width="1.2" height="1.2" fill="#d21034"/>
  <polygon points="0.6,0.3 0.7,0.5 0.9,0.5 0.75,0.65 0.8,0.85 0.6,0.7 0.4,0.85 0.45,0.65 0.3,0.5 0.5,0.5" fill="#ffffff"/>
</svg>`,
  'ne': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="0.67" fill="#e05206"/>
  <rect width="3" height="0.67" y="0.67" fill="#ffffff"/>
  <rect width="3" height="0.67" y="1.34" fill="#0db02b"/>
  <circle cx="1.5" cy="1" r="0.3" fill="#e05206"/>
</svg>`,
  'gn': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="1" height="2" fill="#ce1126"/>
  <rect width="1" height="2" x="1" fill="#fcd116"/>
  <rect width="1" height="2" x="2" fill="#009460"/>
</svg>`,
  'gh': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="0.67" fill="#ce1126"/>
  <rect width="3" height="0.67" y="0.67" fill="#fcd116"/>
  <rect width="3" height="0.67" y="1.34" fill="#006b3f"/>
  <polygon points="1.5,0.5 1.6,0.8 1.9,0.8 1.65,1 1.75,1.3 1.5,1.1 1.25,1.3 1.35,1 1.1,0.8 1.4,0.8" fill="#000000"/>
</svg>`,
  'ng': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="1" height="2" fill="#008751"/>
  <rect width="1" height="2" x="1" fill="#ffffff"/>
  <rect width="1" height="2" x="2" fill="#008751"/>
</svg>`,
  'lr': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="2" fill="#bf0a30"/>
  <rect width="3" height="0.182" fill="#002868"/>
  <rect width="3" height="0.182" y="0.364" fill="#ffffff"/>
  <rect width="3" height="0.182" y="0.546" fill="#bf0a30"/>
  <rect width="3" height="0.182" y="0.728" fill="#002868"/>
  <rect width="3" height="0.182" y="0.91" fill="#ffffff"/>
  <rect width="3" height="0.182" y="1.092" fill="#bf0a30"/>
  <rect width="3" height="0.182" y="1.274" fill="#002868"/>
  <rect width="3" height="0.182" y="1.456" fill="#ffffff"/>
  <rect width="3" height="0.182" y="1.638" fill="#bf0a30"/>
  <rect width="3" height="0.182" y="1.82" fill="#002868"/>
  <rect width="1.2" height="0.91" fill="#002868"/>
  <polygon points="0.6,0.2 0.65,0.35 0.8,0.35 0.675,0.45 0.72,0.6 0.6,0.5 0.48,0.6 0.525,0.45 0.4,0.35 0.55,0.35" fill="#ffffff"/>
</svg>`,
  'sl': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="0.67" fill="#1eb53a"/>
  <rect width="3" height="0.67" y="0.67" fill="#ffffff"/>
  <rect width="3" height="0.67" y="1.34" fill="#0072c6"/>
</svg>`,
  'gm': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="0.67" fill="#ce1126"/>
  <rect width="3" height="0.13" y="0.67" fill="#0c1c8c"/>
  <rect width="3" height="0.4" y="0.8" fill="#ffffff"/>
  <rect width="3" height="0.13" y="1.2" fill="#0c1c8c"/>
  <rect width="3" height="0.67" y="1.33" fill="#3a7728"/>
</svg>`,
  'mr': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="2" fill="#006233"/>
  <circle cx="1.5" cy="0.8" r="0.5" fill="#ffc400"/>
  <path d="M 1.5,0.3 A 0.5,0.5 0 0,0 1.5,1.3 A 0.4,0.4 0 0,1 1.5,0.3" fill="#006233"/>
  <polygon points="1.5,0.45 1.55,0.6 1.7,0.6 1.575,0.7 1.62,0.85 1.5,0.75 1.38,0.85 1.425,0.7 1.3,0.6 1.45,0.6" fill="#ffc400"/>
</svg>`,
  'cv': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="3" height="1" fill="#003893"/>
  <rect width="3" height="0.2" y="1" fill="#ffffff"/>
  <rect width="3" height="0.2" y="1.2" fill="#ce1126"/>
  <rect width="3" height="0.2" y="1.4" fill="#ffffff"/>
  <rect width="3" height="0.4" y="1.6" fill="#003893"/>
  <g transform="translate(0,1)">
    <circle cx="0.3" cy="0.2" r="0.08" fill="#f7d116"/>
    <circle cx="0.5" cy="0.4" r="0.08" fill="#f7d116"/>
    <circle cx="0.6" cy="0.6" r="0.08" fill="#f7d116"/>
    <circle cx="0.7" cy="0.8" r="0.08" fill="#f7d116"/>
    <circle cx="0.8" cy="0.9" r="0.08" fill="#f7d116"/>
    <circle cx="1.0" cy="0.95" r="0.08" fill="#f7d116"/>
    <circle cx="1.2" cy="0.9" r="0.08" fill="#f7d116"/>
    <circle cx="1.3" cy="0.8" r="0.08" fill="#f7d116"/>
    <circle cx="1.4" cy="0.6" r="0.08" fill="#f7d116"/>
    <circle cx="1.5" cy="0.4" r="0.08" fill="#f7d116"/>
  </g>
</svg>`,
  'gw': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
  <rect width="1" height="2" fill="#ce1126"/>
  <rect width="2" height="1" x="1" fill="#fcd116"/>
  <rect width="2" height="1" x="1" y="1" fill="#009e49"/>
  <polygon points="0.5,0.5 0.6,0.8 0.9,0.8 0.65,1 0.75,1.3 0.5,1.1 0.25,1.3 0.35,1 0.1,0.8 0.4,0.8" fill="#000000"/>
</svg>`
};

// Créer le répertoire s'il n'existe pas
const flagsDir = path.join(__dirname, '../public/flags');
if (!fs.existsSync(flagsDir)) {
  fs.mkdirSync(flagsDir, { recursive: true });
}

// Générer les fichiers SVG
Object.entries(flagSvgs).forEach(([code, svg]) => {
  const filePath = path.join(flagsDir, `${code}.svg`);
  fs.writeFileSync(filePath, svg.trim());
  console.log(`Created flag: ${filePath}`);
});

console.log('All flags generated successfully!');