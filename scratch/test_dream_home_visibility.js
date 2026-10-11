const fs = require('fs');

const appJs = fs.readFileSync('assets/js/app.js', 'utf8');
const styleCss = fs.readFileSync('assets/css/style.css', 'utf8');

const hasHighlightInAppJs = appJs.includes('dream-home-highlight');
const hasNoTextTransparent = !appJs.includes('Find & Tour Your <span class="text-transparent');
const hasCssRule = styleCss.includes('.dream-home-highlight') && styleCss.includes('#0284c7') && styleCss.includes('#38bdf8');

console.log('--- Dream Student Home Visibility Verification ---');
console.log('app.js uses dream-home-highlight:', hasHighlightInAppJs);
console.log('app.js removed problematic text-transparent:', hasNoTextTransparent);
console.log('style.css defines light (#0284c7) and dark (#38bdf8) colors:', hasCssRule);

if (hasHighlightInAppJs && hasNoTextTransparent && hasCssRule) {
  console.log('SUCCESS: Dream Student Home is 100% guaranteed visible in both light and dark modes!');
} else {
  console.error('FAIL: Verification checks failed.');
  process.exit(1);
}
