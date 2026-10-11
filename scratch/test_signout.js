const fs = require('fs');
const vm = require('vm');

const appJs = fs.readFileSync('assets/js/app.js', 'utf8');

let renderedHTML = '';
const sandbox = {
  window: {},
  document: {
    querySelectorAll: (sel) => {
      if (sel === '.auth-container') {
        return [{
          set innerHTML(html) {
            renderedHTML = html;
          }
        }];
      }
      return [];
    },
    getElementById: () => null,
    addEventListener: () => {}
  },
  localStorage: {
    getItem: (k) => {
      if (k === 'studentstay_current_user') return 'user-ama';
      return null;
    },
    setItem: () => {},
    removeItem: () => {}
  }
};
sandbox.window = sandbox;

vm.createContext(sandbox);
vm.runInContext(appJs, sandbox);

sandbox.AuthManager.renderAuthContainers();

console.log('1. Rendered Auth Container HTML contains:');
console.log('   - Sign Out button text:', renderedHTML.includes('Sign Out'));
console.log('   - AuthManager.logout() call:', renderedHTML.includes('AuthManager.logout()'));
console.log('   - fa-arrow-right-from-bracket icon:', renderedHTML.includes('fa-arrow-right-from-bracket'));
console.log('   - sign-out-global-btn class:', renderedHTML.includes('sign-out-global-btn'));

const profileHtml = fs.readFileSync('profile.html', 'utf8');
console.log('2. profile.html directly contains:');
console.log('   - Sign Out button in identity box:', profileHtml.includes('AuthManager.logout()'));

const agentHtml = fs.readFileSync('agent.html', 'utf8');
console.log('3. agent.html directly contains:');
console.log('   - Sign Out button in header:', agentHtml.includes('AuthManager.logout()'));

if (renderedHTML.includes('sign-out-global-btn') && renderedHTML.includes('Sign Out') && profileHtml.includes('AuthManager.logout()')) {
  console.log('\nSUCCESS: Sign Out button is visibly rendered on the page so students never have to search for it!');
  process.exit(0);
} else {
  console.error('\nFAILURE: Missing sign out button');
  process.exit(1);
}
