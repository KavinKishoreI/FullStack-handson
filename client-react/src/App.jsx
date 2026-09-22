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

          <div id="product-grid" className="product-grid"></div>
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
