const fs = require('fs');
const vm = require('vm');

console.log('=== VERIFYING AUTH TAB ORDER & EMAIL REJECTION LOGIC ===');

const signupHtml = fs.readFileSync('signup.html', 'utf8');
const appJs = fs.readFileSync('assets/js/app.js', 'utf8');

// 1. Static HTML Checks
console.log('\n--- 1. Static Layout & Ordering Checks ---');
const signupCardIndex = signupHtml.indexOf('id="signup-card"');
const signinCardIndex = signupHtml.indexOf('id="signin-card"');
console.log('Signup card index in DOM:', signupCardIndex);
console.log('Signin card index in DOM:', signinCardIndex);
if (signupCardIndex < signinCardIndex) {
  console.log('PASS: Create Account card appears before Sign In card in HTML.');
} else {
  console.error('FAIL: Sign In card appears before Create Account card.');
  process.exit(1);
}

const tabBtnSignupIndex = signupHtml.indexOf('id="tab-btn-signup"');
const tabBtnSigninIndex = signupHtml.indexOf('id="tab-btn-signin"');
console.log('Tab button Signup index:', tabBtnSignupIndex);
console.log('Tab button Signin index:', tabBtnSigninIndex);
if (tabBtnSignupIndex < tabBtnSigninIndex) {
  console.log('PASS: "Create Account" tab button is on the left (first), "Student Sign In" is on the right.');
} else {
  console.error('FAIL: Tab button order incorrect.');
  process.exit(1);
}

// 2. Default tab check in DOMContentLoaded
console.log('\n--- 2. Default Behavior on Page Load ---');
const hasDefaultSignup = signupHtml.includes("switchAuthTab('signup')");
console.log('Has switchAuthTab("signup") default:', hasDefaultSignup);

// 3. Navigation Bar Ordering in app.js
console.log('\n--- 3. Guest Navigation Bar Button Order ---');
const regNavIndex = appJs.indexOf('<span>Create Account</span>');
const signinNavIndex = appJs.indexOf('<span>Sign In</span>');
if (regNavIndex !== -1 && signinNavIndex !== -1 && regNavIndex < signinNavIndex) {
  console.log('PASS: In app.js guest navbar, "Create Account" is placed before "Sign In".');
} else {
  console.error('FAIL: In app.js guest navbar, "Sign In" is placed before "Create Account".');
  process.exit(1);
}

// 4. Functional Execution of Rejection & Registration in VM
console.log('\n--- 4. Functional VM Simulation ---');

const storage = {};
function makeMockElement() {
  const classes = new Set();
  return {
    value: '',
    innerHTML: '',
    textContent: '',
    className: '',
    classList: {
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
      contains: (c) => classes.has(c),
      has: (c) => classes.has(c)
    },
    focus: () => {}
  };
}

const elements = {
  'signin-card': makeMockElement(),
  'signup-card': makeMockElement(),
  'tab-btn-signin': makeMockElement(),
  'tab-btn-signup': makeMockElement(),
  'auth-header-badge': makeMockElement(),
  'auth-header-title': makeMockElement(),
  'auth-header-subtitle': makeMockElement(),
  'signin-error-alert': makeMockElement(),
  'signin-error-message': makeMockElement(),
  'login-email': makeMockElement(),
  'reg-name': makeMockElement(),
  'reg-email': makeMockElement(),
  'reg-country': makeMockElement(),
  'reg-university': makeMockElement(),
  'reg-nationality': makeMockElement(),
  'reg-intake': makeMockElement(),
  'remembered-account-container': makeMockElement()
};
elements['signin-card'].classList.add('hidden');
elements['signin-error-alert'].classList.add('hidden');
elements['remembered-account-container'].classList.add('hidden');
elements['reg-country'].value = 'uk';
elements['reg-university'].value = 'University of Glasgow';
elements['reg-nationality'].value = 'Ghana';
elements['reg-intake'].value = 'Sept 2026';

const sandbox = {
  window: {
    location: { href: '' }
  },
  document: {
    getElementById: (id) => elements[id] || null,
    addEventListener: () => {}
  },
  localStorage: {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; }
  },
  console: console
};
sandbox.location = sandbox.window.location;
vm.createContext(sandbox);

// Extract the inline script tag content from signup.html
const lastScriptStart = signupHtml.lastIndexOf('<script>') + 8;
const lastScriptEnd = signupHtml.lastIndexOf('</script>');
const scriptCode = signupHtml.substring(lastScriptStart, lastScriptEnd);

// Mock destinationData for script execution
sandbox.destinationData = {
  uk: { name: 'United Kingdom', states: [{ id: 'scotland', unis: [{ name: 'University of Glasgow' }] }] }
};

vm.runInContext(scriptCode, sandbox);

// Scenario A: Strange Gmail tries to sign in without creating an account
console.log('\nScenario A: Strange Gmail (strange.user@gmail.com) tries to sign in directly...');
elements['login-email'].value = 'strange.user@gmail.com';
sandbox.handleStudentSignIn({ preventDefault: () => {} });

if (storage['studentstay_current_user']) {
  console.error('FAIL: Strange email was NOT rejected! It was logged in as:', storage['studentstay_current_user']);
  process.exit(1);
} else {
  console.log('PASS: Strange email was NOT allowed to log in.');
}

if (!elements['signin-error-alert'].classList.has('hidden')) {
  console.log('PASS: Rejection alert displayed:', elements['signin-error-message'].innerHTML);
} else {
  console.error('FAIL: signin-error-alert was not displayed.');
  process.exit(1);
}

// Scenario B: User clicks "Create Account Now with This Email"
console.log('\nScenario B: User clicks redirectToSignupFromError...');
sandbox.redirectToSignupFromError();
if (elements['reg-email'].value === 'strange.user@gmail.com') {
  console.log('PASS: Email was transferred to reg-email for account creation.');
} else {
  console.error('FAIL: Email not transferred to reg-email.');
  process.exit(1);
}
if (!elements['signup-card'].classList.has('hidden') && elements['signin-card'].classList.has('hidden')) {
  console.log('PASS: Successfully transitioned to Create Account card.');
} else {
  console.error('FAIL: Did not transition to signup card.');
  process.exit(1);
}

// Scenario C: User creates an account
console.log('\nScenario C: User fills registration and creates account...');
elements['reg-name'].value = 'Strange User';
elements['reg-email'].value = 'strange.user@gmail.com';
sandbox.handleStudentSignup({ preventDefault: () => {} });

const createdUser = JSON.parse(storage['studentstay_custom_user']);
console.log('Created user:', createdUser.name, 'Initials:', createdUser.initials);
if (createdUser.email === 'strange.user@gmail.com' && createdUser.initials === 'SU') {
  console.log('PASS: Account successfully created with initials "SU".');
} else {
  console.error('FAIL: Account creation failed or initials incorrect.');
  process.exit(1);
}

// Scenario D: Sign out and sign back in with the created account
console.log('\nScenario D: Sign out and sign in with the registered email...');
delete storage['studentstay_current_user'];
storage['studentstay_logged_out'] = 'true';

// Try signing in now
elements['login-email'].value = 'strange.user@gmail.com';
sandbox.handleStudentSignIn({ preventDefault: () => {} });

if (storage['studentstay_current_user'] === createdUser.id) {
  console.log('PASS: Previously registered account signed in successfully!');
  console.log('Logged out flag cleared:', !storage['studentstay_logged_out']);
} else {
  console.error('FAIL: Registered user was not able to sign in.');
  process.exit(1);
}

console.log('\nALL AUTH TESTS PASSED PERFECTLY!');
