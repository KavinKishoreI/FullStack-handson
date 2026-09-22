// Entry point for the backend server.
// Imports the Express app and starts listening on the configured port.
// Run with: npm start or npm run dev.

import app from './app.js';
import config from './config.js';

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
