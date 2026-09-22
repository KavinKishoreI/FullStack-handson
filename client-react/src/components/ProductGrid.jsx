import ProductCard from './ProductCard.jsx';

function ProductGrid({ products }) {
  return (
    <div id="product-grid" className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
