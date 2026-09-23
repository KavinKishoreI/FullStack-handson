import { formatPrice } from '../format.js';

function CartRow({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="cart-item" data-product-id={item.productId}>
      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        <span className="cart-item-price">{formatPrice(item.price)} each</span>
      </div>
      <div className="cart-item-controls">
        <div className="stepper">
          <button type="button" onClick={() => onDecrement(item.productId)}>−</button>
          <span className="qty-value">{item.quantity}</span>
          <button type="button" onClick={() => onIncrement(item.productId)}>+</button>
        </div>
        <span className="cart-item-total">{formatPrice(item.lineTotal)}</span>
        <button type="button" className="remove-btn" onClick={() => onRemove(item.productId)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartRow;
