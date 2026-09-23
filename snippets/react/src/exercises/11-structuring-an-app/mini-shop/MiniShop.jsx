import { useState } from 'react';
import Header from './Header.jsx';
import ProductList from './ProductList.jsx';
import Cart from './Cart.jsx';
import { products } from './products.js';

function MiniShop() {
  const [cart, setCart] = useState([]);

  function handleAdd(productId) {
    const existing = cart.find((item) => item.productId === productId);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { productId, quantity: 1 }]);
    }
  }

  function handleRemove(productId) {
    setCart(cart.filter((item) => item.productId !== productId));
  }

  const lines = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      productId: item.productId,
      name: product.name,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    };
  });

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  return (
    <div>
      <Header itemCount={itemCount} />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3>Products</h3>
          <ProductList products={products} onAdd={handleAdd} />
        </div>
        <div style={{ flex: 1 }}>
          <h3>Cart</h3>
          <Cart lines={lines} total={total} onRemove={handleRemove} />
        </div>
      </div>
    </div>
  );
}

export default MiniShop;
