import { useState, useEffect } from 'react';

function DependencyArray() {
  const [searchText, setSearchText] = useState('');
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    console.log('[]           → runs once, after the first render');
  }, []);

  useEffect(() => {
    console.log('[searchText] → searchText is now "' + searchText + '"');
  }, [searchText]);

  useEffect(() => {
    console.log('no array     → runs after every render');
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Type to change searchText"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />{' '}
      <button onClick={() => setClicks(clicks + 1)}>Re-render without changing searchText ({clicks})</button>
      <p style={{ color: '#555' }}>Open the browser console (F12) to see which effects run.</p>
    </div>
  );
}

export default DependencyArray;
