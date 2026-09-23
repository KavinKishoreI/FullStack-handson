import { useState } from 'react';

const startingProducts = [
  { id: 1, name: 'Wireless Mouse', price: 799 },
  { id: 2, name: 'Desk Lamp', price: 1299 },
  { id: 3, name: 'Ceramic Mug', price: 299 },
];

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem 1rem',
  minWidth: 180,
};

function RerenderKeepsInput() {
  const [products, setProducts] = useState(startingProducts);

  function refreshPrices() {
    setProducts(
      products.map((product) => ({ ...product, price: product.price + 10 }))
    );
  }

  return (
    <div>
      <p><button onClick={refreshPrices}>Refresh prices</button></p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <h3 style={{ margin: 0 }}>{product.name}</h3>
            <p>₹{product.price}</p>
            <input type="text" placeholder="Gift note" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RerenderKeepsInput;
