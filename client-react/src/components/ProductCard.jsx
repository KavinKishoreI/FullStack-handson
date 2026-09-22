import { useState } from 'react';
import { formatPrice } from '../format.js';

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock === 0;

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function increment() {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  }

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
      <div className="stepper">
        <button type="button" onClick={decrement}>−</button>
        <span className="qty-value">{quantity}</span>
        <button type="button" onClick={increment}>+</button>
      </div>
      <button
        type="button"
        className="add-to-cart-btn"
        disabled={isOutOfStock}
        onClick={() => onAddToCart(product, quantity)}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
