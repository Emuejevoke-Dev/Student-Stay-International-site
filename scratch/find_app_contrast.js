// scratch/find_app_contrast.js
const fs = require('fs');
const app = fs.readFileSync('assets/js/app.js', 'utf8');

const regex = /innerHTML\s*=\s*`([^`]+)`/g;
let match;
let count = 0;

while ((match = regex.exec(app)) !== null) {
  count++;
  const html = match[1];
  const hasTextWhite = html.includes('text-white');
  const hasSlate200 = html.includes('text-slate-200');
  const hasSlate900 = html.includes('text-slate-900');
  const hasDarkModifier = html.includes('dark:');
  
  if ((hasTextWhite || hasSlate200) && !hasDarkModifier) {
    console.log(`\n[Block ${count}] has text-white or slate-200 without dark: modifier:`);
    console.log(html.slice(0, 300).trim());
  }
}
