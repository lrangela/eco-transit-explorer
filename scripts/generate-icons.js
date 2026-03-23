const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/assets/icons/weather');

const WEATHER_ICONS = {
  '01d': {
    svg: `<circle cx="12" cy="12" r="5" fill="currentColor"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '01n': {
    svg: `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>`,
    viewBox: '0 0 24 24'
  },
  '02d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor" opacity="0.9"/>
          <circle cx="18" cy="4" r="3" fill="currentColor" opacity="0.6"/>`,
    viewBox: '0 0 24 24'
  },
  '02n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor" opacity="0.9"/>
          <path d="M16 5.79A4 4 0 1 1 12.21 2 3 3 0 0 0 16 5.79z" fill="currentColor" opacity="0.6"/>`,
    viewBox: '0 0 24 24'
  },
  '03d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>`,
    viewBox: '0 0 24 24'
  },
  '03n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>`,
    viewBox: '0 0 24 24'
  },
  '04d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <path d="M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="currentColor" opacity="0.7"/>`,
    viewBox: '0 0 24 24'
  },
  '04n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <path d="M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="currentColor" opacity="0.7"/>`,
    viewBox: '0 0 24 24'
  },
  '09d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="8" y1="19" x2="8" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="19" x2="12" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '09n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="8" y1="19" x2="8" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="19" x2="12" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '10d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="8" y1="19" x2="8" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '10n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="8" y1="19" x2="8" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '11d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <polygon points="13,13 10,20 11,15 9,20 12,13" fill="#FFD700" stroke="currentColor" stroke-width="1"/>`,
    viewBox: '0 0 24 24'
  },
  '11n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <polygon points="13,13 10,20 11,15 9,20 12,13" fill="#FFD700" stroke="currentColor" stroke-width="1"/>`,
    viewBox: '0 0 24 24'
  },
  '13d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="12" y1="17" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" stroke-width="2"/>
          <line x1="10.5" y1="18.5" x2="13.5" y2="21.5" stroke="currentColor" stroke-width="2"/>
          <line x1="13.5" y1="18.5" x2="10.5" y2="21.5" stroke="currentColor" stroke-width="2"/>`,
    viewBox: '0 0 24 24'
  },
  '13n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="12" y1="17" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" stroke-width="2"/>
          <line x1="10.5" y1="18.5" x2="13.5" y2="21.5" stroke="currentColor" stroke-width="2"/>
          <line x1="13.5" y1="18.5" x2="10.5" y2="21.5" stroke="currentColor" stroke-width="2"/>`,
    viewBox: '0 0 24 24'
  },
  '50d': {
    svg: `<line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
          <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`,
    viewBox: '0 0 24 24'
  },
  '50n': {
    svg: `<line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
          <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`,
    viewBox: '0 0 24 24'
  }
};

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate fallback using 03d
const fallbackData = WEATHER_ICONS['03d'];
const fallbackSvg = fallbackData.svg.replace(/currentColor/g, '#ffffff');
const fallbackContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${fallbackData.viewBox}" fill="none" role="img">${fallbackSvg}</svg>`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'fallback.svg'), fallbackContent);
console.log('Created fallback.svg');

// Generate all others
Object.entries(WEATHER_ICONS).forEach(([code, data]) => {
  const fileName = `${code}.svg`;
  // Replace currentColor with #ffffff for external IMG usage
  const svgContent = data.svg.replace(/currentColor/g, '#ffffff');
  const content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${data.viewBox}" fill="none" role="img">${svgContent}</svg>`;
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), content);
  console.log(`Created ${fileName}`);
});
