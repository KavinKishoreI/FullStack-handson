const API_BASE = 'http://localhost:4000/api';

function formatPrice(paise) {
  return '₹' + (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

let allProducts = [];

const statusLine = document.getElementById('status-line');
const productGrid = document.getElementById('product-grid');

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
    card.appendChild(addBtn);

    productGrid.appendChild(card);
  });
}

async function loadProducts() {
  setStatus('Loading products…');
  try {
    const res = await fetch(API_BASE + '/products');
    allProducts = await res.json();
    renderProductGrid(allProducts);
    clearStatus();
  } catch (err) {
    setStatus('Could not load products. Is the server running?', true);
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
