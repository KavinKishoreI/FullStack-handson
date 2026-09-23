import { useState } from 'react';

const columnStyle = {
  flex: 1,
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem 1rem',
};

function HooksAtTheTop() {
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState('');

  return (
    <div>
      <button onClick={() => setShowNote(!showNote)}>
        {showNote ? 'Hide gift note' : 'Show gift note'}
      </button>
      {showNote && (
        <p>
          <input
            type="text"
            placeholder="Gift note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </p>
      )}
    </div>
  );
}

function HookInsideAnIf() {
  const [showNote, setShowNote] = useState(false);

  let noteBox = null;
  if (showNote) {
    const [note, setNote] = useState('');
    noteBox = (
      <p>
        <input
          type="text"
          placeholder="Gift note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </p>
    );
  }

  return (
    <div>
      <button onClick={() => setShowNote(!showNote)}>
        {showNote ? 'Hide gift note' : 'Show gift note'}
      </button>
      {noteBox}
    </div>
  );
}

function RulesOfHooks() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={columnStyle}>
        <p><strong>Hooks at the top</strong></p>
        <HooksAtTheTop />
      </div>
      <div style={columnStyle}>
        <p><strong>A hook inside an if</strong></p>
        <HookInsideAnIf />
      </div>
    </div>
  );
}

export default RulesOfHooks;
