import CartRow from './CartRow.jsx';

function CartPanel({ items, onIncrement }) {
  const itemsClass = items.length === 0 ? 'cart-items hidden' : 'cart-items';
  const emptyClass = items.length > 0 ? 'cart-empty hidden' : 'cart-empty';

  return (
    <>
      <div id="cart-items" className={itemsClass}>
        {items.map((item) => (
          <CartRow key={item.productId} item={item} onIncrement={onIncrement} />
        ))}
      </div>
      <p id="cart-empty" className={emptyClass}>Your cart is empty</p>
    </>
  );
}

export default CartPanel;
