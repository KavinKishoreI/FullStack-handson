// Handles user database operations: find, create, and email checks.
// Converts snake_case DB fields to camelCase for the API layer.
// Imported by auth routes and requireAuth middleware.

import db from '../db/index.js';

export function findById(id) {
  const row = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(id);
  return row || null;
}

export function findByEmailWithPassword(email) {
  const row = db.prepare(
    'SELECT id, name, email, password_hash, role FROM users WHERE email = ?'
  ).get(email);
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role
  };
}

export function emailExists(email) {
  const row = db.prepare('SELECT 1 FROM users WHERE email = ?').get(email);
  return !!row;
}

export function create({ name, email, passwordHash }) {
  const result = db.prepare(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
  ).run(name, email, passwordHash);

  return findById(result.lastInsertRowid);
}
