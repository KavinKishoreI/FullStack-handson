const API_BASE = 'http://localhost:4000/api';
const FREE_SHIPPING_THRESHOLD = 200000;

function formatPrice(paise) {
  return '₹' + (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

let allProducts = [];
let cart = [];

const statusLine = document.getElementById('status-line');
const productGrid = document.getElementById('product-grid');
const cartBadge = document.getElementById('cart-badge');
const cartItemsContainer = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartTotalEl = document.getElementById('cart-total');
const shippingNoteEl = document.getElementById('shipping-note');
const checkoutBtn = document.getElementById('checkout-btn');

function findProduct(productId) {
  return allProducts.find(function (product) {
    return product.id === productId;
  });
}

function setStatus(message, isError) {
  statusLine.textContent = message;
  statusLine.classList.toggle('error', Boolean(isError));
}

function clearStatus() {
  statusLine.textContent = '';
  statusLine.classList.remove('error');
}

function renderProductGrid(products) {
  productGrid.innerHTML = '';

  products.forEach(function (product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.name;
    card.appendChild(img);

    const name = document.createElement('h3');
    name.textContent = product.name;
    card.appendChild(name);

    const category = document.createElement('span');
    category.className = 'product-category';
    category.textContent = product.category;
    card.appendChild(category);

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = formatPrice(product.price);
    card.appendChild(price);

    const stockNote = document.createElement('p');
    stockNote.className = 'stock-note';
    if (product.stock === 0) {
      stockNote.textContent = 'Out of stock';
      stockNote.classList.add('out');
    } else if (product.stock <= 3) {
      stockNote.textContent = 'Only ' + product.stock + ' left';
      stockNote.classList.add('low');
    } else {
      stockNote.textContent = 'In stock';
    }
    card.appendChild(stockNote);

    const stepper = document.createElement('div');
    stepper.className = 'stepper';

    const minusBtn = document.createElement('button');
    minusBtn.type = 'button';
    minusBtn.textContent = '−';

    const qtyValue = document.createElement('span');
    qtyValue.className = 'qty-value';
    qtyValue.textContent = '1';

    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.textContent = '+';

    minusBtn.addEventListener('click', function () {
      const current = parseInt(qtyValue.textContent, 10);
      if (current > 1) {
        qtyValue.textContent = String(current - 1);
      }
    });

    plusBtn.addEventListener('click', function () {
      const current = parseInt(qtyValue.textContent, 10);
      if (current < 99) {
        qtyValue.textContent = String(current + 1);
      }
    });

    stepper.appendChild(minusBtn);
    stepper.appendChild(qtyValue);
    stepper.appendChild(plusBtn);
    card.appendChild(stepper);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-to-cart-btn';
    addBtn.textContent = 'Add to cart';
    if (product.stock === 0) {
      addBtn.disabled = true;
    }
    addBtn.addEventListener('click', function () {
      const quantity = parseInt(qtyValue.textContent, 10);
      addToCart(product.id, quantity);
    });
    card.appendChild(addBtn);

    productGrid.appendChild(card);
  });
}

const categorySelect = document.getElementById('category-select');

function populateCategoryFilter(products) {
  const categories = [];
  products.forEach(function (product) {
    if (categories.indexOf(product.category) === -1) {
      categories.push(product.category);
    }
  });

  categories.forEach(function (category) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function addToCart(productId, quantity) {
  const existing = cart.find(function (item) {
    return item.productId === productId;
  });

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId: productId, quantity: quantity });
  }

  renderCartPanel();
  updateBadge();
  updateTotal();
  updateShippingNote();
  updateCheckoutButton();
}

function renderCartPanel() {
  cartItemsContainer.innerHTML = cart.map(function (item) {
    const product = findProduct(item.productId);
    return (
      '<div class="cart-item" data-product-id="' + item.productId + '">' +
        '<div class="cart-item-info">' +
          '<span class="cart-item-name">' + product.name + '</span>' +
          '<span class="cart-item-price">' + formatPrice(product.price) + ' each</span>' +
        '</div>' +
        '<div class="cart-item-controls">' +
          '<span class="qty-value">Qty: ' + item.quantity + '</span>' +
          '<span class="cart-item-total">' + formatPrice(product.price * item.quantity) + '</span>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  cartEmpty.classList.toggle('hidden', cart.length > 0);
  cartItemsContainer.classList.toggle('hidden', cart.length === 0);
}

function updateBadge() {
  const itemCount = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
  cartBadge.textContent = String(itemCount);
}

function getCartTotal() {
  return cart.reduce(function (sum, item) {
    const product = findProduct(item.productId);
    return sum + product.price * item.quantity;
  }, 0);
}

function updateTotal() {
  cartTotalEl.textContent = formatPrice(getCartTotal());
}

function updateShippingNote() {
  const total = getCartTotal();
  if (total >= FREE_SHIPPING_THRESHOLD) {
    shippingNoteEl.textContent = 'You have free shipping';
    shippingNoteEl.classList.add('met');
  } else {
    const remaining = FREE_SHIPPING_THRESHOLD - total;
    shippingNoteEl.textContent = 'Add ' + formatPrice(remaining) + ' more for free shipping';
    shippingNoteEl.classList.remove('met');
  }
}

function updateCheckoutButton() {
  checkoutBtn.disabled = cart.length === 0;
}

async function loadProducts() {
  setStatus('Loading products…');
  try {
    const res = await fetch(API_BASE + '/products');
    allProducts = await res.json();
    renderProductGrid(allProducts);
    populateCategoryFilter(allProducts);
    renderCartPanel();
    updateBadge();
    updateTotal();
    updateShippingNote();
    updateCheckoutButton();
    clearStatus();
  } catch (err) {
    setStatus('Could not load products. Is the server running?', true);
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
