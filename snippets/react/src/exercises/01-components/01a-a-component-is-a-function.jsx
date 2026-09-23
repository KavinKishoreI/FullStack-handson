function Greeting() {
  return <h2>Hello from a component</h2>;
}

function AComponentIsAFunction() {
  return (
    <div>
      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  );
}

export default AComponentIsAFunction;
