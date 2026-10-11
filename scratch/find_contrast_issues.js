// scratch/find_contrast_issues.js
const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'find-home.html',
  'profile.html',
  'agent.html',
  'tours.html',
  'map.html',
  'insights.html',
  'residents.html',
  'chat.html',
  'signup.html',
  'assets/js/app.js'
];

console.log('--- SCANNING FOR CONTRAST ISSUES ---');

// 1. Check for text-slate-800/900 without dark:text-* on dark or light containers
// 2. Check for text-white without dark/light differentiation
// 3. Check for specific badges and cards

files.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Check if line has text-white but also light background
    if (line.includes('text-white') && (line.includes('bg-white') || line.includes('bg-slate-50') || line.includes('bg-slate-100'))) {
      if (!line.includes('dark:bg-') && !line.includes('hover:') && !line.includes('btn') && !line.includes('gradient')) {
        console.log(`[${file}:${idx + 1}] Potential white-on-white:`, line.trim().slice(0, 100));
      }
    }
    // Check if line has dark text in dark mode or light text in light mode
    if (line.includes('text-slate-900') && !line.includes('dark:text-') && !line.includes('hover:')) {
      if (line.includes('<h') || line.includes('<p') || line.includes('<span') || line.includes('<div') || line.includes('<label')) {
        // Report sample lines
        // console.log(`[${file}:${idx+1}] text-slate-900 without dark:text:`, line.trim().slice(0, 80));
      }
    }
  });
});
