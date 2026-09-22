import { formatPrice } from '../format.js';

function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;

  let stockNote = 'In stock';
  let stockClass = 'stock-note';
  if (product.stock === 0) {
    stockNote = 'Out of stock';
    stockClass = 'stock-note out';
  } else if (product.stock <= 3) {
    stockNote = 'Only ' + product.stock + ' left';
    stockClass = 'stock-note low';
  }

  return (
    <div className="product-card" data-product-id={product.id}>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <span className="product-category">{product.category}</span>
      <p className="product-price">{formatPrice(product.price)}</p>
      <p className={stockClass}>{stockNote}</p>
      <button type="button" className="add-to-cart-btn" disabled={isOutOfStock}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
