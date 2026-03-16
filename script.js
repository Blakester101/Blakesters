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
const CITY_SAVE_KEY = 'blakestersCityRunV2';
let cityRun = null;

function randomCityName() {
  const names = ['Riverstone', 'Glasshaven', 'Eastford', 'Nova Ridge', 'Bluepoint', 'North Quay'];
  return names[Math.floor(Math.random() * names.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getModeLabel(mode) {
  if (mode === 'builder') return 'City Builder';
  if (mode === 'citizen') return 'Citizen Life';
  return 'Real-World Start';
}

function generateObjectives(mode) {
  const common = [
    { id: 'obj-money', text: 'Reach $150M city balance', done: false },
    { id: 'obj-pop', text: 'Reach 500,000 population', done: false },
    { id: 'obj-happy', text: 'Maintain 70+ happiness', done: false },
    { id: 'obj-mobility', text: 'Build 12+ roads and 5+ transport level', done: false }
  ];
  if (mode === 'citizen') {
    common.push({ id: 'obj-cash', text: 'Earn $250,000 personal cash', done: false });
  }
  return common;
}

function createRun() {
  const mode = document.getElementById('cityMode').value;
  const startYear = Number(document.getElementById('cityStartYear').value) || 2026;
  const startAge = Number(document.getElementById('cityStartAge').value) || 18;
  const selectedLocation = document.getElementById('cityStartLocation').value;
  const city = mode === 'citizen' || selectedLocation === 'random' ? randomCityName() : selectedLocation;

  const builderStart = mode === 'builder';

  return {
    mode,
    modeLabel: getModeLabel(mode),
    city,
    year: startYear,
    day: 1,
    age: startAge,
    balance: builderStart ? 100 : 10,
    debt: 0,
    taxRate: 12,
    population: builderStart ? 5000 : 15000,
    happiness: builderStart ? 60 : 55,
    roads: builderStart ? 2 : 6,
    tunnels: 0,
    bridges: 0,
    stopSigns: builderStart ? 6 : 20,
    trafficLights: builderStart ? 2 : 10,
    cars: builderStart ? 1200 : 7000,
    transport: builderStart ? 1 : 2,
    water: builderStart ? 1 : 2,
    power: builderStart ? 1 : 2,
    housing: builderStart ? 1 : 3,
    highRises: 0,
    offices: builderStart ? 0 : 1,
    commercialLow: builderStart ? 1 : 2,
    commercialHigh: 0,
    stadiums: 0,
    parks: 0,
    playgrounds: 0,
    amusementParks: 0,
    jobs: builderStart ? 2000 : 6000,
    dailyIncome: builderStart ? 0.8 : 0.3,
    personalCash: mode === 'citizen' ? 0.02 : 0,
    lastEvent: builderStart
      ? 'You started with a plot of land and $100M. Build your city systems and grow revenue.'
      : 'You spawned in a free-life mode city. Choose your path with no rules.',
    objectives: generateObjectives(mode)
  };
}

function refreshObjectives() {
  if (!cityRun) return;
  cityRun.objectives = cityRun.objectives.map((o) => {
    if (o.id === 'obj-money') o.done = cityRun.balance >= 150;
    if (o.id === 'obj-pop') o.done = cityRun.population >= 500000;
    if (o.id === 'obj-happy') o.done = cityRun.happiness >= 70;
    if (o.id === 'obj-mobility') o.done = cityRun.roads >= 12 && cityRun.transport >= 5;
    if (o.id === 'obj-cash') o.done = cityRun.personalCash >= 0.25;
    return o;
  });
}

function renderObjectives() {
  const el = document.getElementById('cityObjectives');
  if (!cityRun) {
    el.innerHTML = '<li>Start a new run to unlock objectives.</li>';
    return;
  }
  el.innerHTML = cityRun.objectives
    .map((o) => `<li>${o.done ? '✅' : '⬜'} ${o.text}</li>`)
    .join('');
}

function renderCityRun() {
  const summary = document.getElementById('cityRunSummary');
  const log = document.getElementById('cityRunLog');
  const stats = document.getElementById('cityStats');

  if (!cityRun) {
    summary.textContent = 'Start a run to begin your city story.';
    log.textContent = '';
    stats.innerHTML = '';
    renderObjectives();
    return;
  }

  refreshObjectives();

  const statsMap = [
    ['Mode', cityRun.modeLabel],
    ['City', cityRun.city],
    ['Year/Day', `${cityRun.year} / ${cityRun.day}`],
    ['Age', cityRun.age.toFixed(1)],
    ['Balance', `$${cityRun.balance.toFixed(1)}M`],
    ['Debt', `$${cityRun.debt.toFixed(1)}M`],
    ['Daily Income', `$${cityRun.dailyIncome.toFixed(2)}M`],
    ['Population', cityRun.population.toLocaleString()],
    ['Happiness', `${cityRun.happiness.toFixed(0)}%`],
    ['Tax Rate', `${cityRun.taxRate}%`],
    ['Cars', cityRun.cars.toLocaleString()],
    ['Roads', cityRun.roads],
    ['Tunnels', cityRun.tunnels],
    ['Bridges', cityRun.bridges],
    ['Stop Signs', cityRun.stopSigns],
    ['Traffic Lights', cityRun.trafficLights],
    ['Transport', cityRun.transport],
    ['Water', cityRun.water],
    ['Power', cityRun.power],
    ['Housing', cityRun.housing],
    ['High-Rises', cityRun.highRises],
    ['Offices', cityRun.offices],
    ['Commercial Low', cityRun.commercialLow],
    ['Commercial High', cityRun.commercialHigh],
    ['Stadiums', cityRun.stadiums],
    ['Parks', cityRun.parks],
    ['Playgrounds', cityRun.playgrounds],
    ['Amusement Parks', cityRun.amusementParks],
    ['Jobs', cityRun.jobs.toLocaleString()],
    ['Personal Cash', `$${(cityRun.personalCash * 1000000).toFixed(0)}`]
  ];

  stats.innerHTML = statsMap
    .map(([k, v]) => `<div class="stat-tile"><small>${k}</small><strong>${v}</strong></div>`)
    .join('');

  const doneCount = cityRun.objectives.filter((o) => o.done).length;
  summary.textContent = `Objectives complete: ${doneCount}/${cityRun.objectives.length}. Build, manage and live however you want.`;
  log.textContent = cityRun.lastEvent;
  renderObjectives();
}

function requiresRun() {
  if (cityRun) return true;
  document.getElementById('cityRunLog').textContent = 'Start a run first.';
  return false;
}

function spend(amount, message) {
  if (!requiresRun()) return false;
  if (cityRun.balance < amount) {
    cityRun.lastEvent = message;
    renderCityRun();
    return false;
  }
  cityRun.balance -= amount;
  return true;
}

function macroUpdate(days = 1) {
  if (!cityRun) return;

  for (let i = 0; i < days; i += 1) {
    const serviceScore = (cityRun.transport + cityRun.water + cityRun.power + cityRun.housing + cityRun.parks + cityRun.playgrounds + cityRun.offices + cityRun.commercialLow + cityRun.commercialHigh) / 9;
    const taxPressure = (cityRun.taxRate - 10) * 0.6;
    const trafficCapacity = cityRun.roads * 2200 + cityRun.trafficLights * 350 + cityRun.stopSigns * 120 + cityRun.tunnels * 2800 + cityRun.bridges * 2400 + cityRun.transport * 3000;
    const congestion = clamp((cityRun.cars - trafficCapacity) / 12000, -1, 2.5);
    const growth = serviceScore * 120 - taxPressure * 20 - congestion * 90 + (Math.random() * 140 - 70);

    cityRun.population = Math.max(1000, Math.floor(cityRun.population + growth));
    cityRun.jobs = Math.max(500, Math.floor(cityRun.jobs + serviceScore * 80 - 30 + Math.random() * 60));

    const employmentRate = clamp(cityRun.jobs / cityRun.population, 0.3, 1);
    cityRun.happiness = clamp(
      cityRun.happiness + (employmentRate - 0.7) * 4 + serviceScore * 0.8 - (cityRun.taxRate - 12) * 0.3 - congestion * 2.5 + (Math.random() * 2 - 1),
      5,
      95
    );

    const cityRevenue = cityRun.population * (cityRun.taxRate / 100) * 0.00006 + serviceScore * 0.3 + cityRun.offices * 0.15 + cityRun.commercialLow * 0.1 + cityRun.commercialHigh * 0.22 + cityRun.stadiums * 0.05 + cityRun.amusementParks * 0.08;
    const upkeep = (cityRun.transport + cityRun.water + cityRun.power + cityRun.housing + cityRun.parks + cityRun.playgrounds + cityRun.roads + cityRun.bridges + cityRun.tunnels + cityRun.stadiums + cityRun.amusementParks) * 0.11;
    const debtCost = cityRun.debt * 0.004;

    cityRun.dailyIncome = Math.max(-4, cityRevenue - upkeep - debtCost);
    cityRun.balance = Math.max(0, cityRun.balance + cityRun.dailyIncome);

    if (cityRun.mode !== 'builder') {
      const wage = employmentRate * 0.0012;
      cityRun.personalCash = Math.max(0, cityRun.personalCash + wage + (Math.random() * 0.0006 - 0.0002));
    }

    cityRun.day += 1;
    if (cityRun.day > 365) {
      cityRun.day = 1;
      cityRun.year += 1;
      cityRun.age += 1;
    }
  }
}

function maybeTriggerEvent() {
  if (!cityRun) return;
  const roll = Math.random();
  if (roll < 0.08) {
    cityRun.happiness = clamp(cityRun.happiness - 6, 5, 95);
    cityRun.balance = Math.max(0, cityRun.balance - 2);
    cityRun.lastEvent = 'Storm damage: emergency repairs cost $2M and reduced happiness.';
  } else if (roll < 0.16) {
    cityRun.population += 3500;
    cityRun.balance += 3;
    cityRun.lastEvent = 'Investment boom: new residents moved in and business taxes increased.';
  } else if (roll < 0.24) {
    cityRun.happiness = clamp(cityRun.happiness + 4, 5, 95);
    cityRun.lastEvent = 'City festival success: happiness increased across districts.';
  }
}

document.getElementById('startCityRunBtn').addEventListener('click', () => {
  cityRun = createRun();
  renderCityRun();
});

document.getElementById('saveCityBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  localStorage.setItem(CITY_SAVE_KEY, JSON.stringify(cityRun));
  cityRun.lastEvent = 'Run saved to this browser.';
  renderCityRun();
});

document.getElementById('loadCityBtn').addEventListener('click', () => {
  const saved = localStorage.getItem(CITY_SAVE_KEY);
  if (!saved) {
    document.getElementById('cityRunLog').textContent = 'No saved run found in this browser.';
    return;
  }
  cityRun = JSON.parse(saved);
  cityRun.lastEvent = 'Saved run loaded successfully.';
  renderCityRun();
});

document.getElementById('resetCityBtn').addEventListener('click', () => {
  cityRun = null;
  localStorage.removeItem(CITY_SAVE_KEY);
  renderCityRun();
  document.getElementById('cityRunLog').textContent = 'Run reset and save deleted.';
});

document.getElementById('buildRoadBtn').addEventListener('click', () => {
  if (!spend(3, 'Not enough city funds to build roads.')) return;
  cityRun.roads += 1;
  cityRun.lastEvent = 'Road network expanded. Cars and freight can move more efficiently.';
  renderCityRun();
});

document.getElementById('buildTunnelBtn').addEventListener('click', () => {
  if (!spend(9, 'Not enough city funds to build a tunnel.')) return;
  cityRun.tunnels += 1;
  cityRun.jobs += 700;
  cityRun.lastEvent = 'New tunnel completed under a major corridor, reducing congestion.';
  renderCityRun();
});

document.getElementById('buildBridgeBtn').addEventListener('click', () => {
  if (!spend(10, 'Not enough city funds to build a bridge.')) return;
  cityRun.bridges += 1;
  cityRun.jobs += 850;
  cityRun.lastEvent = 'Bridge opened and unlocked faster movement between districts.';
  renderCityRun();
});

document.getElementById('addStopSignBtn').addEventListener('click', () => {
  if (!spend(1, 'Not enough city funds for stop signs.')) return;
  cityRun.stopSigns += 8;
  cityRun.happiness = clamp(cityRun.happiness + 0.6, 5, 95);
  cityRun.lastEvent = 'Stop signs installed across neighbourhood intersections.';
  renderCityRun();
});

document.getElementById('addTrafficLightBtn').addEventListener('click', () => {
  if (!spend(2, 'Not enough city funds for traffic lights.')) return;
  cityRun.trafficLights += 4;
  cityRun.happiness = clamp(cityRun.happiness + 0.8, 5, 95);
  cityRun.lastEvent = 'Traffic lights installed on busy junctions to improve flow and safety.';
  renderCityRun();
});

document.getElementById('buildTransportBtn').addEventListener('click', () => {
  if (!spend(8, 'Not enough city funds for public transport expansion.')) return;
  cityRun.transport += 1;
  cityRun.jobs += 1200;
  cityRun.lastEvent = 'Public transport expanded with new routes and higher frequency.';
  renderCityRun();
});

document.getElementById('buyCarsBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  cityRun.cars += Math.floor(cityRun.population * 0.03 + 500);
  cityRun.lastEvent = 'Car ownership increased as households and businesses purchased vehicles.';
  renderCityRun();
});

document.getElementById('buildWaterBtn').addEventListener('click', () => {
  if (!spend(6, 'Not enough city funds for water expansion.')) return;
  cityRun.water += 1;
  cityRun.happiness = clamp(cityRun.happiness + 2, 5, 95);
  cityRun.lastEvent = 'Water grid upgraded: health and liveability improved.';
  renderCityRun();
});

document.getElementById('buildPowerBtn').addEventListener('click', () => {
  if (!spend(7, 'Not enough city funds for power upgrade.')) return;
  cityRun.power += 1;
  cityRun.jobs += 800;
  cityRun.lastEvent = 'Power network expanded: outages reduced and businesses scaled up.';
  renderCityRun();
});

document.getElementById('buildHousingBtn').addEventListener('click', () => {
  if (!spend(6, 'Not enough city funds for low-density housing project.')) return;
  cityRun.housing += 1;
  cityRun.population += 4500;
  cityRun.lastEvent = 'Low-density housing expanded with detached homes and local streets.';
  renderCityRun();
});

document.getElementById('buildHighRiseBtn').addEventListener('click', () => {
  if (!spend(12, 'Not enough city funds for high-rise development.')) return;
  cityRun.highRises += 1;
  cityRun.housing += 1;
  cityRun.population += 11000;
  cityRun.jobs += 2200;
  cityRun.lastEvent = 'High-rise towers completed, adding major urban density.';
  renderCityRun();
});

document.getElementById('buildOfficeBtn').addEventListener('click', () => {
  if (!spend(9, 'Not enough city funds for office district expansion.')) return;
  cityRun.offices += 1;
  cityRun.jobs += 2600;
  cityRun.lastEvent = 'Office towers added and white-collar employment rose.';
  renderCityRun();
});

document.getElementById('zoneCommercialLowBtn').addEventListener('click', () => {
  if (!spend(5, 'Not enough city funds to zone low-density commercial.')) return;
  cityRun.commercialLow += 1;
  cityRun.jobs += 950;
  cityRun.lastEvent = 'Low-density commercial zone approved for strip retail and local services.';
  renderCityRun();
});

document.getElementById('zoneCommercialHighBtn').addEventListener('click', () => {
  if (!spend(8, 'Not enough city funds to zone high-density commercial.')) return;
  cityRun.commercialHigh += 1;
  cityRun.jobs += 1800;
  cityRun.lastEvent = 'High-density commercial district approved for malls and mixed-use blocks.';
  renderCityRun();
});

document.getElementById('buildParksBtn').addEventListener('click', () => {
  if (!spend(4, 'Not enough city funds for parks investment.')) return;
  cityRun.parks += 1;
  cityRun.happiness = clamp(cityRun.happiness + 5, 5, 95);
  cityRun.lastEvent = 'Parkland expanded and quality of life improved.';
  renderCityRun();
});

document.getElementById('buildPlaygroundBtn').addEventListener('click', () => {
  if (!spend(3, 'Not enough city funds for playgrounds.')) return;
  cityRun.playgrounds += 1;
  cityRun.happiness = clamp(cityRun.happiness + 3, 5, 95);
  cityRun.lastEvent = 'New playgrounds opened for families in residential suburbs.';
  renderCityRun();
});

document.getElementById('buildAmusementBtn').addEventListener('click', () => {
  if (!spend(11, 'Not enough city funds for an amusement park.')) return;
  cityRun.amusementParks += 1;
  cityRun.happiness = clamp(cityRun.happiness + 6, 5, 95);
  cityRun.lastEvent = 'Amusement park opened and tourism traffic increased.';
  renderCityRun();
});

document.getElementById('buildStadiumBtn').addEventListener('click', () => {
  if (!spend(16, 'Not enough city funds for a football stadium.')) return;
  cityRun.stadiums += 1;
  cityRun.jobs += 1400;
  cityRun.happiness = clamp(cityRun.happiness + 4, 5, 95);
  cityRun.lastEvent = 'Football stadium completed; event economy and fan culture grew.';
  renderCityRun();
});

document.getElementById('raiseTaxBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  cityRun.taxRate = clamp(cityRun.taxRate + 1, 5, 35);
  cityRun.happiness = clamp(cityRun.happiness - 1.5, 5, 95);
  cityRun.lastEvent = `Tax rate raised to ${cityRun.taxRate}%.`;
  renderCityRun();
});

document.getElementById('lowerTaxBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  cityRun.taxRate = clamp(cityRun.taxRate - 1, 5, 35);
  cityRun.happiness = clamp(cityRun.happiness + 1.5, 5, 95);
  cityRun.lastEvent = `Tax rate lowered to ${cityRun.taxRate}%.`;
  renderCityRun();
});

document.getElementById('takeLoanBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  cityRun.balance += 20;
  cityRun.debt += 20;
  cityRun.lastEvent = 'Bank loan approved: +$20M liquidity added to your budget.';
  renderCityRun();
});

document.getElementById('repayLoanBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  if (cityRun.debt <= 0) {
    cityRun.lastEvent = 'No outstanding debt to repay.';
    renderCityRun();
    return;
  }
  if (!spend(10, 'Need at least $10M balance to make repayment.')) return;
  cityRun.debt = Math.max(0, cityRun.debt - 10);
  cityRun.lastEvent = 'Debt repayment processed (-$10M).';
  renderCityRun();
});

document.getElementById('collectTaxBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  const bonus = Math.max(0.2, cityRun.dailyIncome * (0.9 + Math.random() * 0.6));
  cityRun.balance += bonus;
  cityRun.lastEvent = `Collection cycle complete: +$${bonus.toFixed(2)}M taxes/fares.`;
  renderCityRun();
});

document.getElementById('workJobBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  if (cityRun.mode === 'builder') {
    cityRun.lastEvent = 'Work shift is for Citizen/Real-World modes.';
    renderCityRun();
    return;
  }
  const pay = 0.004 + Math.random() * 0.003;
  cityRun.personalCash += pay;
  cityRun.happiness = clamp(cityRun.happiness - 0.8, 5, 95);
  cityRun.lastEvent = `You worked a shift and earned $${(pay * 1000000).toFixed(0)} personal cash.`;
  renderCityRun();
});

document.getElementById('socializeBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  if (cityRun.mode === 'builder') {
    cityRun.lastEvent = 'Socialize is for Citizen/Real-World modes.';
    renderCityRun();
    return;
  }
  const cost = 0.0015;
  cityRun.personalCash = Math.max(0, cityRun.personalCash - cost);
  cityRun.happiness = clamp(cityRun.happiness + 2.5, 5, 95);
  cityRun.lastEvent = `You socialized in ${cityRun.city}, spent $${(cost * 1000000).toFixed(0)}, and boosted morale.`;
  renderCityRun();
});

document.getElementById('liveDayBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  macroUpdate(1);
  maybeTriggerEvent();
  if (!cityRun.lastEvent.includes(':')) {
    cityRun.lastEvent = 'A day passed. Economy, population, and life metrics were updated.';
  }
  renderCityRun();
});

document.getElementById('liveWeekBtn').addEventListener('click', () => {
  if (!requiresRun()) return;
  macroUpdate(7);
  maybeTriggerEvent();
  cityRun.lastEvent = 'One full week passed with dynamic simulation updates.';
  renderCityRun();
});

renderProducts();
renderInventory();
updateCartUI();
render5000();
renderCityRun();
