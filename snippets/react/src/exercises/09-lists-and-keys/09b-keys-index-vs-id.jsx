import { useState } from 'react';

const products = [
  { id: 1, name: 'Wireless Mouse' },
  { id: 2, name: 'Mechanical Keyboard' },
  { id: 3, name: 'Desk Lamp' },
];

const columnStyle = {
  flex: 1,
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem 1rem',
};

function ProductRow({ name }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <li style={{ marginBottom: 6 }}>
      {name}{' '}
      <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>−</button>{' '}
      <strong>{quantity}</strong>{' '}
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
    </li>
  );
}

function KeysIndexVsId() {
  const [hideFirst, setHideFirst] = useState(false);

  const visibleProducts = hideFirst ? products.slice(1) : products;

  return (
    <div>
      <p>
        <button onClick={() => setHideFirst(!hideFirst)}>
          {hideFirst ? 'Show Wireless Mouse' : 'Hide Wireless Mouse'}
        </button>
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={columnStyle}>
          <p><strong>key=&#123;index&#125;</strong></p>
          <ul>
            {visibleProducts.map((product, index) => (
              <ProductRow key={index} name={product.name} />
            ))}
          </ul>
        </div>

        <div style={columnStyle}>
          <p><strong>key=&#123;product.id&#125;</strong></p>
          <ul>
            {visibleProducts.map((product) => (
              <ProductRow key={product.id} name={product.name} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default KeysIndexVsId;
