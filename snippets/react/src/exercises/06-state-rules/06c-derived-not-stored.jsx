import { useState } from 'react';

const products = [
  { name: 'Wireless Mouse', price: 799 },
  { name: 'Desk Lamp', price: 1299 },
  { name: 'Ceramic Mug', price: 299 },
];

const panelStyle = {
  flex: 1,
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem 1rem',
};

function DerivedNotStored() {
  const [cart, setCart] = useState([]);
  const [storedTotal, setStoredTotal] = useState(0);

  const derivedTotal = cart.reduce((sum, item) => sum + item.price, 0);

  function addToCart(product) {
    setCart([...cart, product]);
    setStoredTotal(storedTotal + product.price);
  }

  function removeFromCart(index) {
    setCart(cart.filter((item, i) => i !== index));
  }

  return (
    <div>
      <p>
        {products.map((product) => (
          <button key={product.name} onClick={() => addToCart(product)} style={{ marginRight: 8 }}>
            Add {product.name}
          </button>
        ))}
      </p>

      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} — ₹{item.price}{' '}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={panelStyle}>
          <p><strong>Stored in its own useState</strong></p>
          <p style={{ fontSize: '1.4rem' }}>₹{storedTotal}</p>
        </div>
        <div style={panelStyle}>
          <p><strong>Computed during render</strong></p>
          <p style={{ fontSize: '1.4rem' }}>₹{derivedTotal}</p>
        </div>
      </div>
    </div>
  );
}

export default DerivedNotStored;
