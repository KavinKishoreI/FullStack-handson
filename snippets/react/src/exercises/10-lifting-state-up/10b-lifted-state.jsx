import { useState } from 'react';

const products = ['Wireless Mouse', 'Desk Lamp', 'Ceramic Mug'];

function CartBadge({ itemCount }) {
  return <p>Cart badge: <strong>{itemCount}</strong></p>;
}

function ProductList({ onAdd }) {
  return (
    <div>
      {products.map((name) => (
        <button key={name} onClick={() => onAdd(name)} style={{ marginRight: 8 }}>
          Add {name}
        </button>
      ))}
    </div>
  );
}

function LiftedState() {
  const [cart, setCart] = useState([]);

  function handleAdd(name) {
    setCart([...cart, name]);
  }

  return (
    <div>
      <CartBadge itemCount={cart.length} />
      <ProductList onAdd={handleAdd} />
    </div>
  );
}

export default LiftedState;
