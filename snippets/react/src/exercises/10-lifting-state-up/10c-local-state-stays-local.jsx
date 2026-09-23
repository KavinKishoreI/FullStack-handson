import { useState } from 'react';

const products = [
  { id: 1, name: 'Wireless Mouse' },
  { id: 2, name: 'Desk Lamp' },
];

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem 1rem',
  minWidth: 180,
};

function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: 0 }}>{product.name}</h3>
      <p>
        <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>−</button>{' '}
        <strong>{quantity}</strong>{' '}
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </p>
      <button onClick={() => onAdd(product, quantity)}>Add to cart</button>
    </div>
  );
}

function LocalStateStaysLocal() {
  const [cart, setCart] = useState([]);

  function handleAdd(product, quantity) {
    setCart([...cart, { name: product.name, quantity }]);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAdd} />
        ))}
      </div>

      <p><strong>Cart (owned by the parent)</strong></p>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} × {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default LocalStateStaysLocal;
