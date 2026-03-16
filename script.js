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

// living city game
let cityGame = {
  mode: 'builder',
  day: 0,
  age: 18,
  cityName: '',
  location: 'Unknown',
  money: 0,
  loan: 0,
  transport: 0,
  water: 0,
  population: 0,
  log: []
};

function randomCityName() {
  const a = ['North', 'New', 'Lake', 'Iron', 'Green', 'River'];
  const b = ['Haven', 'Point', 'View', 'City', 'Heights', 'Cross'];
  return `${a[Math.floor(Math.random() * a.length)]} ${b[Math.floor(Math.random() * b.length)]}`;
}

function pushCityLog(entry) {
  cityGame.log.unshift(`Day ${cityGame.day}: ${entry}`);
  cityGame.log = cityGame.log.slice(0, 20);
}

function renderCityGame() {
  document.getElementById('cityStatus').textContent =
    cityGame.day === 0 ? 'Start a mode to begin.' : `Running: ${cityGame.mode} mode.`;
  document.getElementById('economySummary').textContent =
    `Money: $${cityGame.money.toLocaleString()} | Loan: $${cityGame.loan.toLocaleString()} | Tax/Fares Quality: ${Math.min(100, 30 + cityGame.transport * 8 + cityGame.water * 6)}%`;
  document.getElementById('citySummary').textContent =
    `${cityGame.cityName} | Age: ${cityGame.age} | Start: ${cityGame.location} | Population: ${cityGame.population.toLocaleString()} | Transport Lines: ${cityGame.transport} | Water Grid Zones: ${cityGame.water}`;
  document.getElementById('cityLog').innerHTML = cityGame.log.length
    ? cityGame.log.map((item) => `<div>• ${item}</div>`).join('')
    : 'No activity yet.';
}

function startCityMode() {
  const mode = document.getElementById('cityMode').value;
  const startAge = Number(document.getElementById('startAge').value || 18);
  const realCity = document.getElementById('realCity').value;
  const startLocation = document.getElementById('startLocation').value.trim() || 'City Center';
  const randomCity = randomCityName();

  cityGame = {
    mode,
    day: 1,
    age: startAge,
    cityName: mode === 'real' ? realCity : randomCity,
    location: startLocation,
    money: mode === 'builder' ? 100000000 : 7500,
    loan: 0,
    transport: 0,
    water: 0,
    population: mode === 'builder' ? 5000 : Math.floor(Math.random() * 300000) + 40000,
    log: []
  };

  if (mode === 'builder') {
    pushCityLog('You received an empty plot of land and a $100,000,000 budget.');
  } else if (mode === 'life') {
    pushCityLog(`You started life in randomly generated ${cityGame.cityName} at age ${cityGame.age}.`);
  } else {
    pushCityLog(`You started in ${cityGame.cityName} at age ${cityGame.age}. No rules, live how you want.`);
  }

  renderCityGame();
}

function advanceDay() {
  if (cityGame.day === 0) {
    document.getElementById('cityStatus').textContent = 'Start a mode first.';
    return;
  }

  cityGame.day += 1;
  if (cityGame.mode === 'builder') {
    const dailyTax = Math.floor(cityGame.population * (2 + cityGame.water * 0.25));
    const fareRevenue = cityGame.transport * 35000;
    const loanCost = Math.floor(cityGame.loan * 0.0005);
    cityGame.money += dailyTax + fareRevenue - loanCost;
    cityGame.population += Math.floor(Math.random() * 1200);
    pushCityLog(`Collected $${(dailyTax + fareRevenue).toLocaleString()} from tax/fares and paid $${loanCost.toLocaleString()} loan interest.`);
  } else {
    const eventPool = [
      'You explored a new neighborhood.',
      'You took a casual job and earned $120.',
      'You met new friends at a local event.',
      'You spent the day learning city transport routes.',
      'You rented a better apartment for comfort.'
    ];
    const event = eventPool[Math.floor(Math.random() * eventPool.length)];
    cityGame.money += Math.floor(Math.random() * 300) - 50;
    cityGame.age += cityGame.day % 365 === 0 ? 1 : 0;
    pushCityLog(event);
  }

  renderCityGame();
}

document.getElementById('startModeBtn').addEventListener('click', startCityMode);
document.getElementById('tickDayBtn').addEventListener('click', advanceDay);

document.getElementById('buildTransitBtn').addEventListener('click', () => {
  if (cityGame.mode !== 'builder' || cityGame.day === 0) {
    document.getElementById('cityStatus').textContent = 'Public transport can only be built in City Builder mode.';
    return;
  }
  if (cityGame.money < 12000000) {
    document.getElementById('cityStatus').textContent = 'Not enough funds for transport build.';
    return;
  }
  cityGame.money -= 12000000;
  cityGame.transport += 1;
  pushCityLog('Built a new public transport line for $12,000,000.');
  renderCityGame();
});

document.getElementById('buildWaterBtn').addEventListener('click', () => {
  if (cityGame.mode !== 'builder' || cityGame.day === 0) {
    document.getElementById('cityStatus').textContent = 'Water grid upgrades can only be built in City Builder mode.';
    return;
  }
  if (cityGame.money < 8000000) {
    document.getElementById('cityStatus').textContent = 'Not enough funds for water grid build.';
    return;
  }
  cityGame.money -= 8000000;
  cityGame.water += 1;
  pushCityLog('Expanded water grid for $8,000,000.');
  renderCityGame();
});

document.getElementById('takeLoanBtn').addEventListener('click', () => {
  if (cityGame.day === 0) {
    document.getElementById('cityStatus').textContent = 'Start a mode before taking a loan.';
    return;
  }
  cityGame.money += 25000000;
  cityGame.loan += 25000000;
  pushCityLog('Bank approved a $25,000,000 loan.');
  renderCityGame();
});

// post game
document.getElementById('postGameBtn').addEventListener('click', () => {
  if (!userState.signedIn) {
    document.getElementById('gamePostStatus').textContent = 'Please sign in to post games.';
    return;
  }
  document.getElementById('gamePostStatus').textContent = 'Game posted. Posting games does not generate seller payouts.';
});

renderProducts();
renderInventory();
updateCartUI();
renderCityGame();
