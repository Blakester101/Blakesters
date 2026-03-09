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

renderProducts();
renderInventory();
updateCartUI();
render5000();
