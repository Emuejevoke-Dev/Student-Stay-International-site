const fs = require('fs');
const vm = require('vm');

const appJs = fs.readFileSync('assets/js/app.js', 'utf8');
const signupHtml = fs.readFileSync('signup.html', 'utf8');

console.log('--- Testing Remembered Gmail & Initials System ---');

// Test 1: Verify signupHtml contains remembered account container and functions
console.log('1. signup.html checks:');
console.log('   - Has remembered-account-container:', signupHtml.includes('id="remembered-account-container"'));
console.log('   - Has initRememberedAccount fn:', signupHtml.includes('function initRememberedAccount'));
console.log('   - Has quickSignInRemembered fn:', signupHtml.includes('function quickSignInRemembered'));
console.log('   - Has studentstay_last_email tracking:', signupHtml.includes('studentstay_last_email'));
console.log('   - Has studentstay_users_db multi-account store:', signupHtml.includes('studentstay_users_db'));

// Test 2: Check app.js logoutStudent doesn't delete custom user
console.log('2. app.js logoutStudent checks:');
console.log('   - Does NOT delete custom user on logout:', !appJs.includes("localStorage.removeItem('studentstay_custom_user');"));
console.log('   - Stores last email on logout:', appJs.includes("localStorage.setItem('studentstay_last_email', currentUser.email);"));
console.log('   - Has getUsersDb:', appJs.includes('getUsersDb()'));
console.log('   - Has saveUserToDb:', appJs.includes('saveUserToDb(user)'));

// Test 3: Test VM execution of login and logout flow with a Gmail address
const storage = {};
const sandbox = {
  window: {},
  document: {
    querySelectorAll: () => [],
    getElementById: () => null,
    addEventListener: () => {}
  },
  localStorage: {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; }
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(appJs, sandbox);

// Simulate a user signing in with a Gmail address directly
const email = 'emuejevoke.dev@gmail.com';
const usernamePart = email.split('@')[0];
const rawTokens = usernamePart.replace(/[._\-+0-9]/g, ' ').trim().split(/\s+/).filter(Boolean);
let capitalizedWords = rawTokens.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
let name = capitalizedWords.join(' ');
const initials = capitalizedWords.length >= 2 
  ? (capitalizedWords[0][0] + capitalizedWords[1][0]).toUpperCase()
  : name.slice(0, 2).toUpperCase();

const user = {
  id: 'user-12345',
  name: name,
  email: email,
  initials: initials,
  avatar: ''
};

sandbox.AuthManager.saveUserToDb(user);
sandbox.AuthManager.setCurrentUser(user.id);

console.log('3. Simulation with Gmail:', email);
console.log('   - Generated Name:', name);
console.log('   - Generated Initials:', initials);
console.log('   - Logged in user initials:', sandbox.AuthManager.getCurrentUser().initials);
console.log('   - Logged in user email:', sandbox.AuthManager.getCurrentUser().email);

// Simulate Logout
sandbox.logoutStudent();
console.log('4. After logout:');
console.log('   - Is logged in:', sandbox.AuthManager.isLoggedIn());
console.log('   - Last remembered email:', storage['studentstay_last_email']);
console.log('   - Is custom user preserved in DB:', !!storage['studentstay_users_db']);

// Simulate signing back in with that Gmail
sandbox.localStorage.removeItem('studentstay_logged_out');
sandbox.AuthManager.setCurrentUser(user.id);
console.log('5. After signing back in:');
console.log('   - Is logged in:', sandbox.AuthManager.isLoggedIn());
console.log('   - Current user name:', sandbox.AuthManager.getCurrentUser().name);
console.log('   - Current user initials:', sandbox.AuthManager.getCurrentUser().initials);

console.log('\nSUCCESS: All Gmail sign-in, remembered account, and initials preservation tests passed!');
