import ProductCard from './ProductCard.jsx';

function ProductGrid({ products, onAddToCart }) {
  return (
    <div id="product-grid" className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductGrid;
