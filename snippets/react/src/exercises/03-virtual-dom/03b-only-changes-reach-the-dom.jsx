import { useState } from 'react';

let renderCount = 0;

function OnlyChangesReachTheDom() {
  const [count, setCount] = useState(0);
  renderCount = renderCount + 1;

  return (
    <div>
      <h2>A heading that never changes</h2>
      <p>A paragraph that never changes either.</p>
      <p>Button clicks: <strong>{count}</strong></p>
      <p>This function has run <strong>{renderCount}</strong> times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default OnlyChangesReachTheDom;
