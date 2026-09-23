import { useState } from 'react';

function OnClickSurvivesRerender() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Wireless Mouse', quantity: 1 },
    { id: 2, name: 'Desk Lamp', quantity: 1 },
  ]);
  const [lastClick, setLastClick] = useState('');

  function increment(id) {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);

    const clicked = updated.find((item) => item.id === id);
    setLastClick(clicked.name + ' is now ' + clicked.quantity);
  }

  return (
    <div>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity}{' '}
            <button onClick={() => increment(item.id)}>+</button>
          </li>
        ))}
      </ul>
      <p style={{ fontFamily: 'monospace', color: '#555' }}>
        {lastClick && 'Click handled: ' + lastClick}
      </p>
    </div>
  );
}

export default OnClickSurvivesRerender;
