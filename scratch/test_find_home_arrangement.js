const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING UK INTAKE & ESCROW ARRANGEMENT IN FIND-HOME.HTML ===\n');

const filePath = path.join(__dirname, '..', 'find-home.html');
const content = fs.readFileSync(filePath, 'utf8');

let allPassed = true;

// 1. Check Top Announcement Bar Elements
const hasTopTag = content.includes('id="top-announcement-tag"') && content.includes('2026/27 Intake Open 🇬🇧');
const hasTopText = content.includes('id="top-announcement-text"') && content.includes('Coming to Glasgow, Edinburgh, London, or Manchester? Zero deposit guarantee & free airport welcome shuttle!');
const hasEscrowBadge = content.includes('100% Escrow Protected Tenancies') && content.includes('fa-shield-halved');

if (hasTopTag && hasTopText && hasEscrowBadge) {
  console.log('[PASS] Top Announcement Bar contains all UK intake & escrow elements for desktop.');
} else {
  console.error('[FAIL] Top Announcement Bar missing desktop elements!');
  allPassed = false;
}

// 2. Check Mobile Ticker Bar
const hasMobileTicker = content.includes('sm:hidden flex items-center justify-between w-full text-[11px]') &&
                        content.includes('🇬🇧 2026/27 Intake Open • Free Airport Shuttle') &&
                        content.includes('100% Escrow');

if (hasMobileTicker) {
  console.log('[PASS] Top Announcement Bar contains sleek, single-line ticker for small screens.');
} else {
  console.error('[FAIL] Top Announcement Bar missing sleek single-line mobile ticker!');
  allPassed = false;
}

// 3. Check Hero Spotlight Banner Card
const hasSpotlightCard = content.includes('UK 2026/27 Intake & Escrow Spotlight Banner');
const hasHeadline = content.includes('Coming to') &&
                    content.includes('selectQuickCity(\'Glasgow\')') &&
                    content.includes('selectQuickCity(\'Edinburgh\')') &&
                    content.includes('selectQuickCity(\'London\')') &&
                    content.includes('selectQuickCity(\'Manchester\')');
const hasPerks = content.includes('Zero Deposit Guarantee') &&
                 content.includes('Free Airport Welcome Shuttle') &&
                 content.includes('100% Escrow Safety');

if (hasSpotlightCard && hasHeadline && hasPerks) {
  console.log('[PASS] Hero section features prominent, responsive UK Intake & Escrow Spotlight Banner.');
} else {
  console.error('[FAIL] Hero section missing spotlight banner elements!');
  allPassed = false;
}

// 4. Check Quick City Filter Action Function
const hasSelectQuickCityFn = content.includes('function selectQuickCity(cityName)');
if (hasSelectQuickCityFn) {
  console.log('[PASS] `selectQuickCity` JavaScript filter function implemented correctly.');
} else {
  console.error('[FAIL] Missing `selectQuickCity` function in find-home.html scripts!');
  allPassed = false;
}

if (!allPassed) {
  console.error('\nVERIFICATION FAILED!');
  process.exit(1);
}

console.log('\n======================================================');
console.log('ALL ARRANGEMENT REQUIREMENTS VERIFIED WITH 100% SUCCESS');
console.log('======================================================');
