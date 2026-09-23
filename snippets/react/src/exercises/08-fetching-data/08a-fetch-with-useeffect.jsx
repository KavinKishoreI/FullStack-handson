import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api/products';

function FetchWithUseEffect() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
        setStatus('ready');
      } catch (error) {
        setStatus('error');
      }
    }

    loadProducts();
  }, []);

  if (status === 'loading') {
    return <p>Loading products…</p>;
  }

  if (status === 'error') {
    return <p style={{ color: '#b3261e' }}>Could not load products. Is the server running?</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} — ₹{(product.price / 100).toFixed(2)}
        </li>
      ))}
    </ul>
  );
}

export default FetchWithUseEffect;
