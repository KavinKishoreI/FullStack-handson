import { useState } from 'react';

function MutationVsReplacement() {
  const [cart, setCart] = useState(['Wireless Mouse']);

  function addByMutating() {
    cart.push('Desk Lamp');
    setCart(cart);
  }

  function addByReplacing() {
    setCart([...cart, 'Ceramic Mug']);
  }

  return (
    <div>
      <p>
        <button onClick={addByMutating}>Add Desk Lamp (mutate)</button>{' '}
        <button onClick={addByReplacing}>Add Ceramic Mug (replace)</button>
      </p>
      <p>Items in cart: <strong>{cart.length}</strong></p>
      <ul>
        {cart.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MutationVsReplacement;
