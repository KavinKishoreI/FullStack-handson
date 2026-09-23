import { useState } from 'react';

const startingCart = [
  { id: 1, name: 'Wireless Mouse', quantity: 2 },
  { id: 2, name: 'Desk Lamp', quantity: 1 },
  { id: 3, name: 'Ceramic Mug', quantity: 4 },
];

function RenderingLists() {
  const [cart, setCart] = useState(startingCart);

  function handleRemove(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  return (
    <div>
      {cart.length === 0 ? (
        <p style={{ color: '#777' }}>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} × {item.quantity}{' '}
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      {cart.length < startingCart.length && (
        <button onClick={() => setCart(startingCart)}>Put everything back</button>
      )}
    </div>
  );
}

export default RenderingLists;
