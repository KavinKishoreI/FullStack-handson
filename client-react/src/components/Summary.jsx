import { formatPrice } from '../format.js';

function Summary({ total, shippingNote, isFreeShipping, disabled, onCheckout }) {
  const shippingClass = isFreeShipping ? 'shipping-note met' : 'shipping-note';

  return (
    <div className="cart-summary">
      <p className="cart-total-line">
        <span>Total</span>
        <span id="cart-total">{formatPrice(total)}</span>
      </p>
      <p id="shipping-note" className={shippingClass}>{shippingNote}</p>
      <button id="checkout-btn" disabled={disabled} onClick={onCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default Summary;
