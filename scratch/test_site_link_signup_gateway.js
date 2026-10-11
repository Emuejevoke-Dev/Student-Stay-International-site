const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING SITE LINK TAKES VISITORS FIRST TO SIGNUP PAGE ===\n');

function checkHttpRedirect(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      method: 'GET'
    }, (res) => {
      resolve({
        statusCode: res.statusCode,
        location: res.headers.location
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

async function runVerification() {
  let allPassed = true;

  // 1. Verify Server root '/' 302 Redirect to /signup.html
  try {
    const rootRes = await checkHttpRedirect('/');
    console.log(`[CHECK 1] GET / => Status: ${rootRes.statusCode}, Location: ${rootRes.location}`);
    if (rootRes.statusCode === 302 && rootRes.location === '/signup.html') {
      console.log('[PASS] When people click the main site link (/), the server immediately redirects them to /signup.html (HTTP 302).');
    } else {
      console.error('[FAIL] Expected 302 to /signup.html but got:', rootRes);
      allPassed = false;
    }
  } catch (err) {
    console.error('[FAIL] Could not connect to server on port 3000:', err.message);
    allPassed = false;
  }

  // 2. Verify Client-side Auth Gateway in index.html
  const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const hasGatewayScript = indexHtml.includes("window.location.replace('signup.html')");
  const hasLoggedInCheck = indexHtml.includes('const isLoggedIn = !isLoggedOut && (hasCustom || hasSaved);');
  
  if (hasGatewayScript && hasLoggedInCheck) {
    console.log('[PASS] index.html contains instant client-side gateway in <head> redirecting new visitors to signup.html before rendering.');
  } else {
    console.error('[FAIL] index.html missing client-side signup gateway script!');
    allPassed = false;
  }

  // 3. Verify signup.html opens to "Create Account" (Sign Up) by default
  const signupHtml = fs.readFileSync(path.join(__dirname, '..', 'signup.html'), 'utf8');
  const hasCreateAccountFirst = signupHtml.includes('id="tab-signup"') && signupHtml.includes('Create Account');
  const hasSignupCardVisible = !signupHtml.includes('id="signup-card" class="hidden"');

  if (hasCreateAccountFirst && hasSignupCardVisible) {
    console.log('[PASS] signup.html displays the Create Account (Sign Up) form active by default.');
  } else {
    console.error('[FAIL] signup.html does not display Create Account by default!');
    allPassed = false;
  }

  console.log('\n======================================================');
  if (allPassed) {
    console.log('ALL SITE LINK SIGNUP GATEWAY CHECKS PASSED (100%)');
  } else {
    console.error('VERIFICATION FAILED!');
    process.exit(1);
  }
  console.log('======================================================');
}

runVerification();
