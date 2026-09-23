const products = [
  { id: 1, name: 'Wireless Mouse', price: 799, stock: 25 },
  { id: 2, name: 'Desk Lamp', price: 1299, stock: 15 },
  { id: 3, name: 'USB-C Hub', price: 1999, stock: 0 },
];

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem 1rem',
  minWidth: 160,
};

function ProductCard({ product }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: 0 }}>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>{product.stock === 0 ? 'Out of stock' : 'In stock'}</p>
      <button disabled={product.stock === 0}>Add to cart</button>
    </div>
  );
}

function ProductGrid() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ComposingComponents() {
  return (
    <div>
      <h2>Our products</h2>
      <ProductGrid />
    </div>
  );
}

export default ComposingComponents;
