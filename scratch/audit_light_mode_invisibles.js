// scratch/audit_light_mode_invisibles.js
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
  'assets/js/app.js',
  'assets/js/data.js'
];

console.log('=== AUDITING INVISIBLE WRITEUPS IN LIGHT & DARK MODES ===\n');

files.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  
  // Look for text-white outside of known dark containers:
  // dark containers: footer, bg-slate-900, bg-slate-950, bg-gradient-to-... (with dark colors), bg-sky-600 (button), etc.
  const regex = /<([^>]+class=["'][^"']*text-(?:white|slate-100|slate-200|slate-300)[^"']*["'][^>]*)>/g;
  let m;
  let found = [];
  while ((m = regex.exec(content)) !== null) {
    const tag = m[0];
    // check if it has a dark bg or button on the tag itself
    const hasSelfBg = tag.includes('bg-sky-600') || tag.includes('bg-sky-700') ||
                      tag.includes('bg-emerald-600') || tag.includes('bg-indigo-600') ||
                      tag.includes('bg-amber-600') || tag.includes('bg-rose-600') ||
                      tag.includes('bg-teal-600') || tag.includes('bg-purple-600') ||
                      tag.includes('bg-slate-900') || tag.includes('bg-slate-950') ||
                      tag.includes('bg-slate-800') || tag.includes('bg-gradient-') ||
                      tag.includes('dark:text-white') || tag.includes('hover:text-white') ||
                      tag.includes('bg-white/20') || tag.includes('bg-amber-500');
    if (!hasSelfBg) {
      found.push(tag);
    }
  }

  if (found.length > 0) {
    console.log(`[${file}] Found ${found.length} tags with text-white/slate-100-300 without self-bg:`);
    found.slice(0, 5).forEach(t => console.log('   ', t.slice(0, 100)));
  }
});
