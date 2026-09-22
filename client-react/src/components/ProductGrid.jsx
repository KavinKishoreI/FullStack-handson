import ProductCard from './ProductCard.jsx';

function ProductGrid({ products, onAddToCart }) {
  return (
    <div id="product-grid" className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductGrid;
