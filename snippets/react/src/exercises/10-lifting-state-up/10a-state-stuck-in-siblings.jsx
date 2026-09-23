import { useState } from 'react';

const products = ['Wireless Mouse', 'Desk Lamp', 'Ceramic Mug'];

function CartBadge() {
  const [itemCount] = useState(0);
  return <p>Cart badge: <strong>{itemCount}</strong></p>;
}

function ProductList() {
  const [itemCount, setItemCount] = useState(0);

  return (
    <div>
      {products.map((name) => (
        <button key={name} onClick={() => setItemCount(itemCount + 1)} style={{ marginRight: 8 }}>
          Add {name}
        </button>
      ))}
      <p style={{ color: '#555' }}>ProductList's own count: {itemCount}</p>
    </div>
  );
}

function StateStuckInSiblings() {
  return (
    <div>
      <CartBadge />
      <ProductList />
    </div>
  );
}

export default StateStuckInSiblings;
