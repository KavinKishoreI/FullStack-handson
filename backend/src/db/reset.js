// Deletes the existing database file and re-initializes from scratch.
// Provides a clean reset for development and testing.
// Run with: npm run db:reset

import fs from 'fs';
import config from '../config.js';

if (fs.existsSync(config.dbPath)) {
  fs.unlinkSync(config.dbPath);
}

await import('./index.js');

console.log('Database reset.');
