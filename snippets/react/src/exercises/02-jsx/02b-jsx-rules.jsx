const products = [
  { id: 1, name: 'Wireless Mouse', price: 79900, stock: 25 },
  { id: 2, name: 'Limited Edition Hoodie', price: 149900, stock: 1 },
  { id: 3, name: 'USB-C Hub', price: 199900, stock: 0 },
];

const stockColors = {
  'stock-ok': '#2a7a2a',
  'stock-low': '#b06a00',
  'stock-out': '#b3261e',
};

function StockNote({ stock }) {
  let label = 'In stock';
  let className = 'stock-ok';

  if (stock === 0) {
    label = 'Out of stock';
    className = 'stock-out';
  } else if (stock <= 3) {
    label = 'Only ' + stock + ' left';
    className = 'stock-low';
  }

  return (
    <p className={className} style={{ color: stockColors[className] }}>
      {label}
    </p>
  );
}

function JsxRules() {
  const shopName = 'Shop';

  return (
    <>
      <h2>{shopName.toUpperCase()} has {products.length} products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <strong>{product.name}</strong> — ₹{(product.price / 100).toFixed(2)}
          <StockNote stock={product.stock} />
        </div>
      ))}
    </>
  );
}

export default JsxRules;
