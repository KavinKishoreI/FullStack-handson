// Initializes the SQLite database connection and runs the schema.
// Creates the data directory, enables foreign keys, and seeds if empty.
// Imported by app.js to ensure the DB is ready before handling requests.

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config.js';
import { seed } from './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbDir = path.dirname(config.dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(config.dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

const count = db.prepare('SELECT COUNT(*) AS cnt FROM products').get();
if (count.cnt === 0) {
  seed(db);
}

export default db;
