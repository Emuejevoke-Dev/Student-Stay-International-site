// scratch/scan_all_html_contrast.js
const fs = require('fs');
const path = require('path');

const htmlFiles = [
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
  'signup.html'
];

console.log('=== COMPREHENSIVE HTML CONTRAST SCAN ===\n');

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const lines = content.split('\n');

  console.log(`Checking ${file}...`);
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    
    // Check 1: text-white on non-dark background
    // If line has text-white, verify it has a dark bg or gradient or button
    if (line.includes('text-white')) {
      const hasBg = line.includes('bg-sky-600') || line.includes('bg-sky-700') ||
                    line.includes('bg-emerald-600') || line.includes('bg-indigo-600') ||
                    line.includes('bg-amber-600') || line.includes('bg-rose-600') ||
                    line.includes('bg-teal-600') || line.includes('bg-purple-600') ||
                    line.includes('bg-slate-900') || line.includes('bg-slate-950') ||
                    line.includes('bg-slate-800') || line.includes('bg-gradient-') ||
                    line.includes('dark:text-white') || line.includes('selection:') ||
                    line.includes('hover:text-white') || line.includes('bg-white/20') ||
                    line.includes('bg-amber-500');
      if (!hasBg && (line.includes('<h') || line.includes('<p') || line.includes('<span') || line.includes('<div') || line.includes('<a'))) {
        console.log(`  [L${lineNum}] text-white without dark bg:`, line.trim().slice(0, 100));
      }
    }

    // Check 2: text-slate-900 or text-slate-800 without dark:text on headings/paragraphs
    if ((line.includes('text-slate-900') || line.includes('text-slate-800')) && !line.includes('dark:text-') && !line.includes('dark:hover:text-')) {
      if (line.includes('<h1') || line.includes('<h2') || line.includes('<h3') || line.includes('<h4') || line.includes('<p')) {
        console.log(`  [L${lineNum}] Heading/p has dark text without dark:text:`, line.trim().slice(0, 100));
      }
    }

    // Check 3: text-black or text-slate-950
    if (line.includes('text-black') || line.includes('text-slate-950')) {
      if (!line.includes('dark:text-')) {
        console.log(`  [L${lineNum}] text-black/slate-950 without dark:text:`, line.trim().slice(0, 100));
      }
    }
  });
});
