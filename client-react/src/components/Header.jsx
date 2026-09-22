function Header({ itemCount }) {
  return (
    <header className="site-header">
      <h1>Shop</h1>
      <div className="cart-indicator">
        Cart: <span id="cart-badge">{itemCount}</span>
      </div>
    </header>
  );
}

export default Header;
