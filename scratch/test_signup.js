const fs = require('fs');

const html = fs.readFileSync('signup.html', 'utf8');

console.log('1. Checking for <nav> tags in signup.html:');
const navMatch = html.match(/<nav[\s\S]*?<\/nav>/gi);
console.log('   Nav elements found:', navMatch ? navMatch.length : 0);

console.log('2. Checking for auth header:');
const hasLogo = html.includes('Student<span class="text-sky-600 dark:text-sky-400">Stay</span>');
const hasBackBtn = html.includes('Back to Website');
console.log('   Has Logo:', hasLogo, '| Has Back Button:', hasBackBtn);

console.log('3. Checking for Tab Switcher:');
const hasSignInTab = html.includes('id="tab-btn-signin"');
const hasSignUpTab = html.includes('id="tab-btn-signup"');
const hasSignInCard = html.includes('id="signin-card"');
const hasSignUpCard = html.includes('id="signup-card"');
console.log('   SignIn Tab:', hasSignInTab, '| SignUp Tab:', hasSignUpTab, '| Cards:', hasSignInCard && hasSignUpCard);

console.log('4. Checking for demo quick-login profiles:');
const hasQuickProfiles = html.includes('id="quick-login-profiles"');
console.log('   Has quick profiles container:', hasQuickProfiles);

console.log('5. Checking JavaScript functions:');
const hasSwitchTabFn = html.includes('function switchAuthTab');
const hasDemoUserFn = html.includes('function loginAsDemoUser');
const hasSignInFn = html.includes('function handleStudentSignIn');
console.log('   Has switchAuthTab:', hasSwitchTabFn, '| Has loginAsDemoUser:', hasDemoUserFn, '| Has handleStudentSignIn:', hasSignInFn);

if (!navMatch && hasLogo && hasBackBtn && hasSignInTab && hasSignUpTab && hasSignInCard && hasSignUpCard && hasSwitchTabFn) {
  console.log('\nSUCCESS: signup.html is completely free of navigation bar and fully configured with sign in / sign up!');
  process.exit(0);
} else {
  console.error('\nFAILURE: Checks failed');
  process.exit(1);
}
