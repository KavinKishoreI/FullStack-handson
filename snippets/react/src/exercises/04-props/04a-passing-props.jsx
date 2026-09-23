const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#1f2933',
  color: '#fff',
  padding: '0.75rem 1rem',
  borderRadius: 6,
  marginBottom: '0.75rem',
};

function Header({ shopName, itemCount }) {
  return (
    <header style={headerStyle}>
      <strong>{shopName}</strong>
      <span>Cart: {itemCount}</span>
    </header>
  );
}

function PassingProps() {
  return (
    <div>
      <Header shopName="Shop" itemCount={0} />
      <Header shopName="Shop" itemCount={3} />
      <Header shopName="Book Store" itemCount={12} />
    </div>
  );
}

export default PassingProps;
