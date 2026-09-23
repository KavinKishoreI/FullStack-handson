function Header(props) {
  let result;

  try {
    props.itemCount = 99;
    result = 'The assignment worked.';
  } catch (error) {
    result = error.message;
  }

  return (
    <div>
      <p>Cart: <strong>{props.itemCount}</strong></p>
      <p>Tried <code>props.itemCount = 99</code> inside the child:</p>
      <p style={{ color: '#b3261e' }}>{result}</p>
    </div>
  );
}

function PropsAreReadOnly() {
  return <Header itemCount={3} />;
}

export default PropsAreReadOnly;
