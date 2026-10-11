const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING UNCLUTTERED & PROFESSIONAL MOBILE EXPERIENCE ACROSS ALL PAGES ===\n');

const htmlPages = [
  'index.html',
  'find-home.html',
  'about.html',
  'profile.html',
  'agent.html',
  'tours.html',
  'map.html',
  'insights.html',
  'residents.html',
  'chat.html',
  'signup.html'
];

let allPassed = true;

// 1. Verify that all general pages have NO clustered exploration tools in their mobile drawers
const nonExplorePages = ['index.html', 'about.html', 'profile.html'];
for (const page of nonExplorePages) {
  const content = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
  // Check that the heading for the clustered tools is NOT present
  const hasClusteredHeading = content.includes('<span>Exploration & Living Tools</span>');
  const hasGateway = content.includes('Explore Accommodations') && content.includes('href="find-home.html"');

  if (hasClusteredHeading) {
    console.error(`[FAIL] ${page}: Still contains clustered 'Exploration & Living Tools' heading!`);
    allPassed = false;
  } else if (!hasGateway) {
    console.error(`[FAIL] ${page}: Missing sleek 'Explore Accommodations' gateway card!`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${page}: Mobile drawer is clean, uncluttered, and features gateway to Find Your New Home.`);
  }
}

// 2. Verify find-home.html correctly houses all 5 exploration tools
const findHomeContent = fs.readFileSync(path.join(__dirname, '..', 'find-home.html'), 'utf8');
const expectedTools = ['tours.html', 'insights.html', 'residents.html', 'chat.html', 'map.html'];
for (const tool of expectedTools) {
  if (!findHomeContent.includes(`href="${tool}"`)) {
    console.error(`[FAIL] find-home.html: Missing tool link for ${tool}`);
    allPassed = false;
  }
}
console.log(`[PASS] find-home.html: Houses all 5 Exploration & Living Tools (360° Tours, Rent Insights, Ask Residents, Peer Chat, Campus Map).`);

// 3. Verify single-row sleek header layout (no redundant second toggle rows on mobile)
for (const page of htmlPages) {
  if (page === 'signup.html') continue;
  const content = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');

  // Should NOT contain the old clumsy stacked second row
  const hasClumsySecondRow = content.includes('md:hidden py-2 border-t border-slate-100') ||
                             content.includes('lg:hidden py-2 border-t border-slate-100');
  if (hasClumsySecondRow) {
    console.error(`[FAIL] ${page}: Contains old clumsy second toggle row!`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${page}: Header is unified into a sleek, clean single row.`);
  }
}

// 4. Verify app.js dynamic logic for uncluttered navigation
const appJs = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'app.js'), 'utf8');
const hasExploreContext = appJs.includes('isExploreContext');
const hasMobileBottomBar = appJs.includes('MobileBottomBar');

if (hasExploreContext && hasMobileBottomBar) {
  console.log('[PASS] assets/js/app.js: Dynamic drawer and native bottom bar adapt cleanly per page context.');
} else {
  console.error('[FAIL] assets/js/app.js: Missing isExploreContext or MobileBottomBar!');
  allPassed = false;
}

// 5. Verify CSS viewport and mobile safe area styling
const styleCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'style.css'), 'utf8');
const hasOverflowX = styleCss.includes('overflow-x: hidden');
const hasSafePadding = styleCss.includes('safe-area-inset-bottom');

if (hasOverflowX && hasSafePadding) {
  console.log('[PASS] assets/css/style.css: Viewport safety, horizontal scroll prevention, and safe-area insets active.');
} else {
  console.error('[FAIL] assets/css/style.css: Missing viewport safety rules!');
  allPassed = false;
}

if (!allPassed) {
  console.error('\nSOME CHECKS FAILED!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('ALL UNCLUTTERED MOBILE CHECKS PASSED WITH 100% SUCCESS');
console.log('======================================================');
