const http = require('http');

http.get('http://localhost:3000/signup.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Contains "Select a Verified Student Account":', data.includes('Select a Verified Student Account'));
    console.log('Contains "quick-login-profiles":', data.includes('quick-login-profiles'));
    console.log('Contains "signin-form":', data.includes('signin-form'));
    console.log('Contains "signup-form":', data.includes('signup-form'));
    
    if (!data.includes('Select a Verified Student Account') && !data.includes('quick-login-profiles')) {
      console.log('\nSUCCESS: "Select a Verified Student Account" has been completely removed!');
      process.exit(0);
    } else {
      console.error('\nFAILURE: Still found demo student account selector');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Request error:', err);
  process.exit(1);
});
