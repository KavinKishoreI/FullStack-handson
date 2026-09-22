import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import StatusLine from './components/StatusLine.jsx';
import Filters from './components/Filters.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartPanel from './components/CartPanel.jsx';
import Summary from './components/Summary.jsx';
import { formatPrice } from './format.js';
import { fetchProducts } from './api.js';

const FREE_SHIPPING_THRESHOLD = 200000;

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState('');
  const [statusIsError, setStatusIsError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    async function loadProducts() {
      setStatus('Loading products…');
      setStatusIsError(false);
      try {
        const data = await fetchProducts();
        setProducts(data);
        setStatus('');
      } catch (err) {
        setStatus('Could not load products. Is the server running?');
        setStatusIsError(true);
      }
    }

    loadProducts();
  }, []);

  function findProduct(productId) {
    return products.find((product) => product.id === productId);
  }

  function handleAddToCart(product, quantity) {
    const existing = cart.find((item) => item.productId === product.id);
    const currentQuantity = existing ? existing.quantity : 0;
    const desiredQuantity = currentQuantity + quantity;
    const newQuantity = Math.min(desiredQuantity, product.stock);

    if (newQuantity < desiredQuantity) {
      setStatus(`Only ${product.stock} left in stock for ${product.name}.`);
      setStatusIsError(false);
    }

    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      setCart([...cart, { productId: product.id, quantity: newQuantity }]);
    }
  }

  function handleIncrement(productId) {
    const item = cart.find((cartItem) => cartItem.productId === productId);
    const product = findProduct(productId);

    if (item.quantity >= product.stock) {
      setStatus(`Only ${product.stock} left in stock for ${product.name}.`);
      setStatusIsError(false);
      return;
    }

    setCart(
      cart.map((cartItem) =>
        cartItem.productId === productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  }

  function handleDecrement(productId) {
    setCart(
      cart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemove(productId) {
    setCart(cart.filter((item) => item.productId !== productId));
  }

  function handleCheckout() {
    setCart([]);
    setStatus('Order placed (pretend).');
    setStatusIsError(false);
  }

  const cartLines = cart.map((item) => {
    const product = findProduct(item.productId);
    return {
      productId: item.productId,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    };
  });

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartLines.reduce((sum, line) => sum + line.lineTotal, 0);
  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD;
  const shippingNote = isFreeShipping
    ? 'You have free shipping'
    : `Add ${formatPrice(FREE_SHIPPING_THRESHOLD - total)} more for free shipping`;

  const categories = [...new Set(products.map((product) => product.category))];

  const visibleProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category === '' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header itemCount={itemCount} />

      <main className="layout">
        <section className="products-column">
          <Filters
            searchText={searchText}
            category={category}
            categories={categories}
            onSearchChange={setSearchText}
            onCategoryChange={setCategory}
          />

          <StatusLine message={status} isError={statusIsError} />

          <ProductGrid products={visibleProducts} onAddToCart={handleAddToCart} />

          {products.length > 0 && visibleProducts.length === 0 && (
            <p>No products match your search.</p>
          )}
        </section>

        <aside className="cart-column">
          <h2>Your Cart</h2>

          <CartPanel
            items={cartLines}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
          />

          <Summary
            total={total}
            shippingNote={shippingNote}
            isFreeShipping={isFreeShipping}
            disabled={cart.length === 0}
            onCheckout={handleCheckout}
          />
        </aside>
      </main>
    </>
  );
}

export default App;
