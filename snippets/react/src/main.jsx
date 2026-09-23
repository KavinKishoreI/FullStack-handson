import { createRoot } from 'react-dom/client';
import './shell.css';
import App from './App.jsx';

// No <StrictMode>: it runs effects and renders twice in development, which would
// double every console log and render count the snippets ask students to watch.
createRoot(document.getElementById('root')).render(<App />);
