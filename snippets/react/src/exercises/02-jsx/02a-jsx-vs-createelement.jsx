import { createElement } from 'react';

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem 1rem',
  minWidth: 200,
};

function WithJsx() {
  return (
    <div style={cardStyle}>
      <h3>Wireless Mouse</h3>
      <p>₹799</p>
    </div>
  );
}

function WithoutJsx() {
  return createElement(
    'div',
    { style: cardStyle },
    createElement('h3', null, 'Wireless Mouse'),
    createElement('p', null, '₹799')
  );
}

function JsxVsCreateElement() {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <p><strong>Written with JSX</strong></p>
        <WithJsx />
      </div>
      <div>
        <p><strong>Written with createElement</strong></p>
        <WithoutJsx />
      </div>
    </div>
  );
}

export default JsxVsCreateElement;
