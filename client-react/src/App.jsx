import ProductGrid from './components/ProductGrid.jsx';

const PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', description: 'Compact 2.4GHz mouse with silent clicks.', price: 79900, category: 'electronics', imageUrl: 'https://placehold.co/400x300?text=Mouse', stock: 25 },
  { id: 2, name: 'Mechanical Keyboard', description: 'Tenkeyless keyboard with brown switches.', price: 349900, category: 'electronics', imageUrl: 'https://placehold.co/400x300?text=Keyboard', stock: 10 },
  { id: 3, name: 'Desk Lamp', description: 'LED lamp with three brightness levels.', price: 129900, category: 'home', imageUrl: 'https://placehold.co/400x300?text=Lamp', stock: 15 },
  { id: 4, name: 'Ceramic Mug', description: '350ml mug, dishwasher safe.', price: 29900, category: 'home', imageUrl: 'https://placehold.co/400x300?text=Mug', stock: 40 },
  { id: 5, name: 'Clean Code', description: 'A handbook of agile software craftsmanship.', price: 59900, category: 'books', imageUrl: 'https://placehold.co/400x300?text=Book', stock: 12 },
  { id: 6, name: 'Notebook Pack', description: 'Set of three ruled A5 notebooks.', price: 24900, category: 'stationery', imageUrl: 'https://placehold.co/400x300?text=Notebooks', stock: 30 },
  { id: 7, name: 'Limited Edition Hoodie', description: 'Club hoodie, one left.', price: 149900, category: 'apparel', imageUrl: 'https://placehold.co/400x300?text=Hoodie', stock: 1 },
  { id: 8, name: 'USB-C Hub', description: '6-in-1 hub with HDMI and card reader.', price: 199900, category: 'electronics', imageUrl: 'https://placehold.co/400x300?text=Hub', stock: 0 },
];

function App() {
  return (
    <>
      <header className="site-header">
        <h1>Shop</h1>
        <div className="cart-indicator">
          Cart: <span id="cart-badge">0</span>
        </div>
      </header>

      <main className="layout">
        <section className="products-column">
          <div className="filters">
            <input type="text" id="search-input" placeholder="Search products..." />
            <select id="category-select">
              <option value="">All categories</option>
            </select>
          </div>

          <p id="status-line" className="status-line"></p>

          <ProductGrid products={PRODUCTS} />
        </section>

        <aside className="cart-column">
          <h2>Your Cart</h2>

          <div id="cart-items" className="cart-items"></div>
          <p id="cart-empty" className="cart-empty">Your cart is empty</p>

          <div className="cart-summary">
            <p className="cart-total-line">
              <span>Total</span>
              <span id="cart-total">₹0.00</span>
            </p>
            <p id="shipping-note" className="shipping-note"></p>
            <button id="checkout-btn" disabled>Checkout</button>
          </div>
        </aside>
      </main>
    </>
  );
}

export default App;
