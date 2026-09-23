import { useState } from 'react';

const products = ['Wireless Mouse', 'Desk Lamp', 'Ceramic Mug'];

const badgeStyle = {
  display: 'inline-block',
  minWidth: '1.6rem',
  padding: '0.1rem 0.5rem',
  borderRadius: 999,
  background: '#e63946',
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
};

function OneSourceOfTruth() {
  const [cart, setCart] = useState([]);

  function addToCart(name) {
    setCart([...cart, name]);
  }

  function removeFromCart(index) {
    setCart(cart.filter((item, i) => i !== index));
  }

  return (
    <div>
      <p>Cart: <span style={badgeStyle}>{cart.length}</span></p>

      <p>
        {products.map((name) => (
          <button key={name} onClick={() => addToCart(name)} style={{ marginRight: 8 }}>
            Add {name}
          </button>
        ))}
      </p>

      <ul>
        {cart.map((name, index) => (
          <li key={index}>
            {name} <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OneSourceOfTruth;
