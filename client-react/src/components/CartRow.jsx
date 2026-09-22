import { formatPrice } from '../format.js';

function CartRow({ item, onIncrement }) {
  return (
    <div className="cart-item" data-product-id={item.productId}>
      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        <span className="cart-item-price">{formatPrice(item.price)} each</span>
      </div>
      <div className="cart-item-controls">
        <div className="stepper">
          <span className="qty-value">{item.quantity}</span>
          <button type="button" onClick={() => onIncrement(item.productId)}>+</button>
        </div>
        <span className="cart-item-total">{formatPrice(item.lineTotal)}</span>
      </div>
    </div>
  );
}

export default CartRow;
