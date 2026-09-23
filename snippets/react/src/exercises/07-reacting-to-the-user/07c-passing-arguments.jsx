import { useState } from 'react';

const startingCart = [
  { id: 1, name: 'Wireless Mouse' },
  { id: 2, name: 'Desk Lamp' },
  { id: 3, name: 'Ceramic Mug' },
];

const columnStyle = {
  flex: 1,
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem 1rem',
};

function PassAFunction() {
  const [cart, setCart] = useState(startingCart);

  function handleRemove(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  return (
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
          {item.name}{' '}
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

function CallTheFunction() {
  const [cart, setCart] = useState(startingCart);

  function handleRemove(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  return (
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
          {item.name}{' '}
          <button onClick={handleRemove(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

function PassingArguments() {
  const [resets, setResets] = useState(0);

  return (
    <div>
      <p><button onClick={() => setResets(resets + 1)}>Reset both lists</button></p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={columnStyle}>
          <p><strong>onClick=&#123;() =&gt; handleRemove(item.id)&#125;</strong></p>
          <PassAFunction key={resets} />
        </div>
        <div style={columnStyle}>
          <p><strong>onClick=&#123;handleRemove(item.id)&#125;</strong></p>
          <CallTheFunction key={resets} />
        </div>
      </div>
    </div>
  );
}

export default PassingArguments;
