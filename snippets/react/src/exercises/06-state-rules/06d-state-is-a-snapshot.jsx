import { useState } from 'react';

function StateIsASnapshot() {
  const [quantity, setQuantity] = useState(0);

  function addThreeWithValue() {
    setQuantity(quantity + 1);
    setQuantity(quantity + 1);
    setQuantity(quantity + 1);
  }

  function addThreeWithUpdater() {
    setQuantity((current) => current + 1);
    setQuantity((current) => current + 1);
    setQuantity((current) => current + 1);
  }

  return (
    <div>
      <p>Quantity: <strong>{quantity}</strong></p>
      <button onClick={addThreeWithValue}>+3 using quantity + 1</button>{' '}
      <button onClick={addThreeWithUpdater}>+3 using an updater function</button>{' '}
      <button onClick={() => setQuantity(0)}>Reset</button>
    </div>
  );
}

export default StateIsASnapshot;
