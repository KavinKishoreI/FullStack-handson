import { useState } from 'react';
import Header from './components/Header.jsx';
import StatusLine from './components/StatusLine.jsx';
import Filters from './components/Filters.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartPanel from './components/CartPanel.jsx';
import Summary from './components/Summary.jsx';

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
  const [cart, setCart] = useState([]);

  function findProduct(productId) {
    return PRODUCTS.find((product) => product.id === productId);
  }

  function handleAddToCart(product, quantity) {
    const existing = cart.find((item) => item.productId === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { productId: product.id, quantity }]);
    }
  }

  function handleIncrement(productId) {
    setCart(
      cart.map((item) =>
        item.productId === productId && item.quantity < 99
          ? { ...item, quantity: item.quantity + 1 }
          : item
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

  return (
    <>
      <Header itemCount={itemCount} />

      <main className="layout">
        <section className="products-column">
          <Filters
            searchText=""
            category=""
            categories={[]}
            onSearchChange={() => {}}
            onCategoryChange={() => {}}
          />

          <StatusLine message="" />

          <ProductGrid products={PRODUCTS} onAddToCart={handleAddToCart} />
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
            shippingNote=""
            isFreeShipping={false}
            disabled={cart.length === 0}
            onCheckout={() => {}}
          />
        </aside>
      </main>
    </>
  );
}

export default App;
