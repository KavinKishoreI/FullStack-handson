import { useState } from 'react';

function UseStateBasics() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <p>Quantity: <strong>{quantity}</strong></p>
      <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>−</button>{' '}
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
  );
}

export default UseStateBasics;
