const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  background: '#1f2933',
  color: '#fff',
  padding: '0.75rem 1rem',
  borderRadius: 6,
  marginBottom: '1rem',
};

function Header({ itemCount }) {
  return (
    <header style={headerStyle}>
      <strong>Mini Shop</strong>
      <span>Cart: {itemCount}</span>
    </header>
  );
}

export default Header;
