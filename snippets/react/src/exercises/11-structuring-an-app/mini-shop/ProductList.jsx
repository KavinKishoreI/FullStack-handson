function ProductList({ products, onAdd }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id} style={{ marginBottom: 6 }}>
          {product.name} — ₹{product.price}{' '}
          <button onClick={() => onAdd(product.id)}>Add</button>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
