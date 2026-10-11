// scratch/analyze_contrast.js
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
  'signup.html'
];

console.log('=== DETAILED CONTRAST ANALYSIS ===\n');

files.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  
  // Find instances of text opacity classes like text-slate-700/80 or text-slate-900/90
  const opacityText = content.match(/text-slate-\d+\/\d+/g) || [];
  
  // Find text-black or text-slate-950
  const blackText = content.match(/text-(black|slate-950)/g) || [];

  // Find elements with text-slate-900, text-slate-800, text-slate-700 that DO NOT have dark:text
  // We can look at class attributes
  const classMatches = content.match(/class=["'][^"']*["']/g) || [];
  let darkMissing = 0;
  let examples = [];
  
  classMatches.forEach(cm => {
    const cls = cm.slice(7, -1);
    const hasDarkText = cls.includes('dark:text-') || cls.includes('dark:hover:text-');
    const hasDarkBg = cls.includes('bg-slate-900') || cls.includes('bg-slate-950') || cls.includes('bg-[#') || cls.includes('dark:bg-');
    
    // Check if it specifies dark text without dark counterpart
    if ((cls.includes('text-slate-900') || cls.includes('text-slate-800') || cls.includes('text-slate-700') || cls.includes('text-slate-600')) && !hasDarkText) {
      darkMissing++;
      if (examples.length < 3) examples.push(cls);
    }
  });

  console.log(`[${file}]`);
  console.log(`  Classes with text-slate-600..900 lacking dark:text: ${darkMissing}`);
  if (examples.length > 0) console.log(`  Sample: "${examples[0]}"`);
  if (opacityText.length > 0) console.log(`  Opacity text classes (e.g. text-slate-700/80): ${opacityText.length}`);
  if (blackText.length > 0) console.log(`  Black / slate-950 text classes: ${blackText.length}`);
});
