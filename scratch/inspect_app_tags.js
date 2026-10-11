// scratch/inspect_app_tags.js
const fs = require('fs');
const app = fs.readFileSync('assets/js/app.js', 'utf8');
const lines = app.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('text-white') && !line.includes('bg-sky-600') && !line.includes('bg-emerald-600') && !line.includes('dark:text-white') && !line.includes('hover:') && !line.includes('bg-slate-900') && !line.includes('gradient')) {
    console.log(`L${idx+1}: ${line.trim().slice(0, 100)}`);
  }
});
