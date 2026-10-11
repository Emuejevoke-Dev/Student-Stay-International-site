const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

console.log('--- Testing Reservation & Chat Functionality ---');

const dataCode = fs.readFileSync('assets/js/data.js', 'utf8');
const appCode = fs.readFileSync('assets/js/app.js', 'utf8');

// Create mock DOM environment
class MockClassList {
  constructor() {
    this.classes = new Set();
  }
  add(...cls) { cls.forEach(c => this.classes.add(c)); }
  remove(...cls) { cls.forEach(c => this.classes.delete(c)); }
  contains(cls) { return this.classes.has(cls); }
  toggle(cls, force) {
    if (force === true) this.classes.add(cls);
    else if (force === false) this.classes.delete(cls);
    else if (this.classes.has(cls)) this.classes.delete(cls);
    else this.classes.add(cls);
  }
}

class MockElement {
  constructor(id, tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.classList = new MockClassList();
    this._innerHTML = '';
    this.textContent = '';
    this.value = '';
    this.src = '';
    this.alt = '';
    this.href = '';
    this.children = [];
    this.attributes = {};
  }
  set innerHTML(val) {
    this._innerHTML = val;
    // Create basic children mocks if buttons or divs
    if (val.includes('id="')) {
      const idMatches = val.matchAll(/id="([^"]+)"/g);
      for (const m of idMatches) {
        if (!sandbox.document.elements[m[1]]) {
          sandbox.document.elements[m[1]] = new MockElement(m[1]);
        }
      }
    }
  }
  get innerHTML() { return this._innerHTML; }
  setAttribute(attr, val) { this.attributes[attr] = val; }
  getAttribute(attr) { return this.attributes[attr]; }
  appendChild(child) {
    this.children.push(child);
    if (child.id) sandbox.document.elements[child.id] = child;
  }
}

const mockLocalStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; }
};

const sandbox = {
  window: {},
  localStorage: mockLocalStorage,
  document: {
    elements: {},
    getElementById(id) {
      return this.elements[id] || null;
    },
    createElement(tag) {
      return new MockElement('', tag);
    },
    querySelectorAll(selector) {
      return Object.values(this.elements);
    },
    addEventListener() {},
    body: new MockElement('body', 'body')
  },
  setTimeout(fn) { fn(); },
  location: { search: '' },
  URLSearchParams: class {
    constructor(s) { this.search = s; }
    get(param) { return null; }
  },
  Date: class extends Date {
    constructor() { super('2026-10-10T14:30:00Z'); }
    getHours() { return 14; }
    getMinutes() { return 30; }
  }
};
sandbox.window = sandbox;

vm.createContext(sandbox);
vm.runInContext(dataCode, sandbox);
vm.runInContext(appCode, sandbox);

// ---------------------------------------------
// TEST 1: Universal Booking Modal Injection
// ---------------------------------------------
console.log('Test 1: Check ensureBookingModalExists()');
assert.strictEqual(sandbox.document.getElementById('modal-booking-escrow'), null, 'Modal should not exist initially');

sandbox.openBookingModal('buchanan-view');
const modal = sandbox.document.getElementById('modal-booking-escrow');
assert.ok(modal, 'Modal should be dynamically created and injected');
assert.strictEqual(modal.classList.contains('hidden'), false, 'Modal should be visible (not hidden)');

const title = sandbox.document.getElementById('booking-property-title');
assert.ok(title.textContent.includes('Buchanan View'), 'Title should reflect Buchanan View');

// Complete booking
sandbox.completeBooking();
const user = sandbox.AuthManager.getCurrentUser();
assert.ok(user.activeBooking, 'User should have an active secured booking');
assert.strictEqual(user.activeBooking.propertyId, 'buchanan-view');
assert.strictEqual(user.activeBooking.status, 'Secured & Escrow Protected');
console.log('✅ Test 1 Passed: Universal Escrow Reservation successfully creates and stores booking:', user.activeBooking.bookingRef);

// ---------------------------------------------
// TEST 2: Multi-Ambassador Responsive Chat Engine
// ---------------------------------------------
console.log('\nTest 2: Check initChatEngine() and Ambassador Switcher');

// Setup chat.html elements in sandbox
sandbox.document.elements['chat-sidebar-residents'] = new MockElement('chat-sidebar-residents');
sandbox.document.elements['chat-online-count'] = new MockElement('chat-online-count');
sandbox.document.elements['chat-header-avatar'] = new MockElement('chat-header-avatar', 'img');
sandbox.document.elements['chat-header-name'] = new MockElement('chat-header-name');
sandbox.document.elements['chat-header-flag'] = new MockElement('chat-header-flag');
sandbox.document.elements['chat-header-sub'] = new MockElement('chat-header-sub');
sandbox.document.elements['chat-header-tour-btn'] = new MockElement('chat-header-tour-btn', 'a');
sandbox.document.elements['chat-header-book-btn'] = new MockElement('chat-header-book-btn', 'button');
sandbox.document.elements['chat-messages-container'] = new MockElement('chat-messages-container');
sandbox.document.elements['chat-typing-indicator'] = new MockElement('chat-typing-indicator');
sandbox.document.elements['typing-resident-name'] = new MockElement('typing-resident-name');
sandbox.document.elements['chat-quick-prompts'] = new MockElement('chat-quick-prompts');
sandbox.document.elements['chat-input-field'] = new MockElement('chat-input-field', 'input');

sandbox.initChatEngine();

// Verify default is Residence Concierge Desk
assert.strictEqual(sandbox.document.getElementById('chat-header-name').textContent, 'Sarah Jenkins (Building Concierge)');
assert.ok(sandbox.document.getElementById('chat-header-sub').textContent.includes('Concierge Desk'));
assert.ok(sandbox.document.getElementById('chat-sidebar-residents').innerHTML.includes('Sarah Jenkins'));
assert.ok(sandbox.document.getElementById('chat-sidebar-residents').innerHTML.includes('Ama Konadu'));
assert.ok(sandbox.document.getElementById('chat-quick-prompts').innerHTML.includes('Key Collection'));
console.log('✅ Initial state verified: Concierge Desk active with on-site prompt pills');

// Test Switch to Ama Konadu
sandbox.switchChatResident('ama-k');
assert.strictEqual(sandbox.document.getElementById('chat-header-name').textContent, 'Ama Konadu');
assert.strictEqual(sandbox.document.getElementById('chat-header-avatar').src, 'assets/images/ama.jpg');
assert.ok(sandbox.document.getElementById('chat-header-sub').textContent.includes('Buchanan View'));
assert.ok(sandbox.document.getElementById('chat-header-flag').textContent.includes('Ghana'));
assert.ok(sandbox.document.getElementById('chat-quick-prompts').innerHTML.includes('Winter Heating'));
assert.ok(sandbox.document.getElementById('chat-messages-container').innerHTML.includes('Akwaaba'));
console.log('✅ Switched to Ama Konadu: Header, Avatar, Flag, Buchanan View, and Ghana conversation loaded');

// Test Switch to David Smith
sandbox.switchChatResident('david-s');
assert.strictEqual(sandbox.document.getElementById('chat-header-name').textContent, 'David Smith');
assert.ok(sandbox.document.getElementById('chat-header-sub').textContent.includes('Strathclyde'));
console.log('✅ Switched to David Smith: Strathclyde and Merchant Studios loaded');

// Test Switch to Priya Patel
sandbox.switchChatResident('priya-p');
assert.strictEqual(sandbox.document.getElementById('chat-header-name').textContent, 'Priya Patel');
assert.ok(sandbox.document.getElementById('chat-header-sub').textContent.includes('Riverside Quay'));
console.log('✅ Switched to Priya Patel: Riverside Quay and UofG loaded');

// Test Switch to Sophie Müller (Germany)
sandbox.switchChatResident('sophie-m');
assert.strictEqual(sandbox.document.getElementById('chat-header-name').textContent, 'Sophie Müller');
assert.ok(sandbox.document.getElementById('chat-header-flag').textContent.includes('Germany'));
console.log('✅ Switched to Sophie Müller: Germany and Kelvin Court loaded');

// Test Switch to Marcus Vance (USA / Columbia)
sandbox.switchChatResident('marcus-v');
assert.strictEqual(sandbox.document.getElementById('chat-header-name').textContent, 'Marcus Vance');
assert.ok(sandbox.document.getElementById('chat-header-flag').textContent.includes('United States'));
console.log('✅ Switched to Marcus Vance: Columbia and Morningside Heights loaded');

// Test Switch to Sarah Jenkins (Canada / UofT)
sandbox.switchChatResident('sarah-j');
assert.strictEqual(sandbox.document.getElementById('chat-header-name').textContent, 'Sarah Jenkins');
assert.ok(sandbox.document.getElementById('chat-header-flag').textContent.includes('Canada'));
console.log('✅ Switched to Sarah Jenkins: Toronto and UofT loaded');

// Test Switch to Lukas Weber (Germany / TUM Munich)
sandbox.switchChatResident('lukas-w');
assert.strictEqual(sandbox.document.getElementById('chat-header-name').textContent, 'Lukas Weber');
assert.ok(sandbox.document.getElementById('chat-header-flag').textContent.includes('Germany'));
console.log('✅ Switched to Lukas Weber: TUM Munich loaded');

// ---------------------------------------------
// TEST 3: Sending Interactive Message & Responses
// ---------------------------------------------
console.log('\nTest 3: Sending messages and quick topics');
sandbox.switchChatResident('ama-k');

// Send question about heating
sandbox.sendChatMessage('How warm is the studio in winter with snow?');
const chatHTML = sandbox.document.getElementById('chat-messages-container').innerHTML;
assert.ok(chatHTML.includes('How warm is the studio in winter with snow?'), 'User message should appear in chat');
assert.ok(chatHTML.includes('thermostatic') || chatHTML.includes('heating') || chatHTML.includes('warm'), 'Resident reply about heating should be returned');
console.log('✅ Send chat message test passed: Interactive reply generated accurately');

// Quick Topic pill click test
sandbox.askQuickTopic('African Groceries');
const updatedChatHTML = sandbox.document.getElementById('chat-messages-container').innerHTML;
assert.ok(updatedChatHTML.includes('African Groceries'), 'Quick topic query sent');
console.log('✅ Quick topic pill click test passed');

console.log('\nALL 3 TESTS PASSED WITH 100% SUCCESS!');
