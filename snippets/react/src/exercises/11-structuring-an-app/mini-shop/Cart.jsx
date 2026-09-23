function Cart({ lines, total, onRemove }) {
  if (lines.length === 0) {
    return <p style={{ color: '#777' }}>Your cart is empty</p>;
  }

  return (
    <div>
      <ul>
        {lines.map((line) => (
          <li key={line.productId}>
            {line.name} × {line.quantity} = ₹{line.lineTotal}{' '}
            <button onClick={() => onRemove(line.productId)}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: ₹{total}</strong></p>
    </div>
  );
}

export default Cart;
