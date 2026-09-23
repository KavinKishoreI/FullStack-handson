import { useState } from 'react';

const products = [
  'Wireless Mouse',
  'Mechanical Keyboard',
  'Desk Lamp',
  'Ceramic Mug',
  'Clean Code',
  'Notebook Pack',
];

function ControlledInput() {
  const [searchText, setSearchText] = useState('');

  const visibleProducts = products.filter((name) =>
    name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />{' '}
      <button onClick={() => setSearchText('')}>Clear</button>

      <p style={{ fontFamily: 'monospace', color: '#555' }}>
        searchText = "{searchText}"
      </p>

      <ul>
        {visibleProducts.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ControlledInput;
