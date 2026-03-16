const pages = [...document.querySelectorAll('.page')];
const navButtons = [...document.querySelectorAll('[data-page]')];

let userState = { mode: 'guest', signedIn: false };
let cart = [];
let products = [
  { id: 1, name: 'Discount Bulk Rice Pack', price: 12, stock: 35, source: 'AI Sourcing' },
  { id: 2, name: 'Home Office Lamp', price: 29, stock: 18, source: 'Seller' },
  { id: 3, name: 'Wireless Earbuds', price: 49, stock: 40, source: 'AI Sourcing' }
];

const inventoryList = document.getElementById('inventoryList');

function showPage(id) {
  pages.forEach((p) => p.classList.toggle('active', p.id === id));
}

navButtons.forEach((btn) => btn.addEventListener('click', () => showPage(btn.dataset.page)));

function updateCartUI() {
  document.getElementById('cartCounter').textContent = `Cart: ${cart.length}`;
  document.getElementById('cartItems').textContent =
    cart.length === 0 ? 'No items yet.' : cart.map((i) => `${i.name} ($${i.price})`).join(', ');
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  products.forEach((p) => {
    const item = document.createElement('article');
    item.className = 'product';
    item.innerHTML = `
      <h4>${p.name}</h4>
      <p>$${p.price} · Stock ${p.stock} · ${p.source}</p>
      <div class="add-to-cart" data-id="${p.id}">Add to cart</div>
    `;
    grid.appendChild(item);
  });
  grid.querySelectorAll('.add-to-cart').forEach((el) => {
    el.addEventListener('click', () => {
      const product = products.find((p) => p.id === Number(el.dataset.id));
      if (!product || product.stock <= 0) return;
      cart.push(product);
      product.stock -= 1;
      updateCartUI();
      renderProducts();
      renderInventory();
    });
  });
}

function renderInventory() {
  inventoryList.innerHTML = '';
  products.forEach((p) => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<strong>${p.name}</strong><br/>Stock: ${p.stock}<br/>Price: $${p.price}`;
    inventoryList.appendChild(el);
  });
  document.getElementById('inventoryUpdated').textContent = `Updated: ${new Date().toLocaleTimeString()}`;
}

function aiInventoryUpdate() {
  products = products.map((p) => {
    const stockShift = Math.floor(Math.random() * 5) - 2;
    const priceShift = Math.floor(Math.random() * 3) - 1;
    return {
      ...p,
      stock: Math.max(0, p.stock + stockShift),
      price: Math.max(1, p.price + priceShift)
    };
  });
  renderProducts();
  renderInventory();
}

setInterval(aiInventoryUpdate, 15 * 60 * 1000);
document.getElementById('refreshInventory').addEventListener('click', aiInventoryUpdate);

// auth
document.getElementById('signInBtn').addEventListener('click', () => {
  userState = { signedIn: true, mode: 'account' };
  document.getElementById('authStatus').textContent = 'Signed in. Account features unlocked.';
});

document.getElementById('guestBtn').addEventListener('click', () => {
  userState = { signedIn: false, mode: 'guest' };
  document.getElementById('authStatus').textContent = 'Guest mode active. One-time checkout only.';
});

// seller upload
document.getElementById('addListingBtn').addEventListener('click', () => {
  const name = document.getElementById('listingName').value.trim();
  const price = Number(document.getElementById('listingPrice').value);
  if (!name || !price) return;
  products.push({ id: Date.now(), name, price, stock: 1, source: 'Seller' });
  renderProducts();
  renderInventory();
});

// payment flow
document.getElementById('goPaymentBtn').addEventListener('click', () => {
  document.getElementById('paymentBox').classList.remove('hidden');
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  const premiumPack = document.getElementById('premiumPack').checked;
  const premiumSpeed = document.getElementById('premiumSpeed').checked;
  const donation = Number(document.getElementById('donation').value || 0);
  const total = cart.reduce((a, c) => a + c.price, 0) + donation + (premiumPack ? 8 : 0) + (premiumSpeed ? 15 : 0);
  document.getElementById('checkoutStatus').textContent =
    `Payment received ($${total.toFixed(2)}). AI sent customer + warehouse emails and dispatch initiated.`;
  cart = [];
  updateCartUI();
});

// help bot
document.getElementById('helpSend').addEventListener('click', () => {
  const q = document.getElementById('helpInput').value;
  const response = `AI Help: Logged your query "${q}" to owner feedback doc. We'll respond within Australian/NSW consumer law and optimise toward $2000/day responsibly.`;
  document.getElementById('helpOutput').textContent = response;
});

// account details
function saveAccount() {
  const payload = {
    firstName: document.getElementById('firstName').value,
    fullName: document.getElementById('fullName').value,
    gender: document.getElementById('gender').value,
    address: document.getElementById('address').value,
    card: document.getElementById('cardSaved').value
  };
  const save = document.getElementById('saveDetails').checked;
  if (!save) {
    document.getElementById('accountStatus').textContent = 'Details used for this session only (not saved).';
    return;
  }
  localStorage.setItem('blakestersAccount', JSON.stringify(payload));
  document.getElementById('accountStatus').textContent = 'Details saved.';
}

document.getElementById('saveAccountBtn').addEventListener('click', saveAccount);

document.getElementById('clearAccountBtn').addEventListener('click', () => {
  localStorage.removeItem('blakestersAccount');
  document.getElementById('accountStatus').textContent = 'Saved details deleted.';
});

document.getElementById('signOutBtn').addEventListener('click', () => {
  userState = { signedIn: false, mode: 'guest' };
  document.getElementById('accountStatus').textContent = 'Signed out.';
});

document.getElementById('deleteAccountBtn').addEventListener('click', () => {
  localStorage.removeItem('blakestersAccount');
  userState = { signedIn: false, mode: 'guest' };
  document.getElementById('accountStatus').textContent = 'Account deleted.';
});

const saved = localStorage.getItem('blakestersAccount');
if (saved) {
  const data = JSON.parse(saved);
  document.getElementById('firstName').value = data.firstName || '';
  document.getElementById('fullName').value = data.fullName || '';
  document.getElementById('gender').value = data.gender || '';
  document.getElementById('address').value = data.address || '';
  document.getElementById('cardSaved').value = data.card || '';
  document.getElementById('saveDetails').checked = true;
}

// 5000 game
let stack5000 = [];
function render5000() {
  document.getElementById('game5000State').textContent = stack5000.length
    ? `Numbers: ${stack5000.join(', ')} | Total: ${stack5000.reduce((a, n) => a + n, 0)}`
    : 'No numbers yet.';
}

function reset5000(reason = 'Reset.') {
  stack5000 = [];
  document.getElementById('game5000State').textContent = reason;
}

document.getElementById('addNumberBtn').addEventListener('click', () => {
  const n = Math.floor(Math.random() * 150) + 1;
  if ([13, 67, 3333].includes(n)) {
    reset5000(`Bad number ${n}. Progress reset.`);
    return;
  }
  stack5000.push(n);
  render5000();
});

document.getElementById('combineBtn').addEventListener('click', () => {
  if (stack5000.length < 2) return;
  const a = stack5000.pop();
  const b = stack5000.pop();
  const c = a + b;
  if ([13, 67, 3333].includes(c)) {
    reset5000(`Combined into ${c}. Progress reset.`);
    return;
  }
  stack5000.push(c);
  render5000();
});

document.getElementById('reset5000').addEventListener('click', () => reset5000('Game reset.'));

// post game
document.getElementById('postGameBtn').addEventListener('click', () => {
  if (!userState.signedIn) {
    document.getElementById('gamePostStatus').textContent = 'Please sign in to post games.';
    return;
  }
  document.getElementById('gamePostStatus').textContent = 'Game posted. Posting games does not generate seller payouts.';
});

// city life simulator
let cityRun = null;

function randomCityName() {
  const names = ['Riverstone', 'Glasshaven', 'Eastford', 'Nova Ridge', 'Bluepoint', 'North Quay'];
  return names[Math.floor(Math.random() * names.length)];
}

function renderCityRun() {
  const summary = document.getElementById('cityRunSummary');
  const log = document.getElementById('cityRunLog');

  if (!cityRun) {
    summary.textContent = 'Start a run to begin your city story.';
    log.textContent = '';
    return;
  }

  summary.textContent = `Mode: ${cityRun.modeLabel} | City: ${cityRun.city} | Year: ${cityRun.year} | Age: ${cityRun.age} | Balance: $${cityRun.balance.toFixed(1)}M | Daily income: $${cityRun.dailyIncome.toFixed(1)}M`;
  log.textContent = cityRun.lastEvent;
}

function startCityRun() {
  const mode = document.getElementById('cityMode').value;
  const startYear = Number(document.getElementById('cityStartYear').value) || 2026;
  const startAge = Number(document.getElementById('cityStartAge').value) || 18;
  const selectedLocation = document.getElementById('cityStartLocation').value;

  const modeLabel =
    mode === 'builder'
      ? 'City Builder'
      : mode === 'citizen'
        ? 'Citizen Life'
        : 'Real-World Start';

  const city =
    mode === 'citizen' || selectedLocation === 'random' ? randomCityName() : selectedLocation;

  cityRun = {
    mode,
    modeLabel,
    year: startYear,
    age: startAge,
    city,
    balance: mode === 'builder' ? 100 : 1,
    dailyIncome: mode === 'builder' ? 0.5 : 0.1,
    infrastructure: { transport: 0, water: 0 },
    lastEvent:
      mode === 'builder'
        ? 'You received $100M and an empty plot of land. Build roads, utilities, and public transport to grow.'
        : 'You spawned in a city with zero rules. Choose how you live and what you do next.'
  };

  renderCityRun();
}

function requiresRun() {
  if (cityRun) return true;
  document.getElementById('cityRunLog').textContent = 'Start a run first.';
  return false;
}

document.getElementById('startCityRunBtn').addEventListener('click', startCityRun);

document.getElementById('buildRoadBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  if (cityRun.balance < 8) {
    cityRun.lastEvent = 'Not enough money to build transport. Try taxes/fares or a bank loan.';
    renderCityRun();
    return;
  }
  cityRun.balance -= 8;
  cityRun.dailyIncome += 2;
  cityRun.infrastructure.transport += 1;
  cityRun.lastEvent = `Transport network level ${cityRun.infrastructure.transport} built. Revenue potential increased.`;
  renderCityRun();
});

document.getElementById('buildWaterBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  if (cityRun.balance < 5) {
    cityRun.lastEvent = 'Not enough money to build water grid. Generate more cash first.';
    renderCityRun();
    return;
  }
  cityRun.balance -= 5;
  cityRun.dailyIncome += 1.5;
  cityRun.infrastructure.water += 1;
  cityRun.lastEvent = `Water grid level ${cityRun.infrastructure.water} online. City health and growth improved.`;
  renderCityRun();
});

document.getElementById('collectTaxBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  const collected = Math.max(0.1, cityRun.dailyIncome * (0.7 + Math.random() * 0.8));
  cityRun.balance += collected;
  cityRun.lastEvent = `Collected $${collected.toFixed(1)}M from taxes/fares and city services.`;
  renderCityRun();
});

document.getElementById('takeLoanBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  cityRun.balance += 20;
  cityRun.dailyIncome = Math.max(0.1, cityRun.dailyIncome - 0.4);
  cityRun.lastEvent = 'Bank loan approved for $20M. Debt repayments reduced passive income slightly.';
  renderCityRun();
});

document.getElementById('liveDayBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  const shift = (Math.random() * 2 - 1) * 0.8;
  cityRun.balance = Math.max(0, cityRun.balance + cityRun.dailyIncome + shift);
  cityRun.age += 1 / 365;
  if (Math.random() > 0.9) cityRun.year += 1;
  cityRun.lastEvent =
    cityRun.mode === 'builder'
      ? 'A day passed: contracts, maintenance, and service demand changed your city economy.'
      : 'A day passed: you explored the city, met people, and made your own choices.';
  renderCityRun();
});

renderProducts();
renderInventory();
updateCartUI();
render5000();
renderCityRun();
