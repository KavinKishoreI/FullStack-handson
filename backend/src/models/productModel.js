// Handles product database operations: list, find, create, update.
// Converts snake_case DB fields to camelCase for the API layer.
// Imported by the products route and order/cart models for stock/price lookups.

import db from '../db/index.js';

function toApi(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    category: row.category,
    imageUrl: row.image_url,
    stock: row.stock
  };
}

export function list({ search, category } = {}) {
  let sql = 'SELECT id, name, description, price, category, image_url, stock FROM products WHERE 1=1';
  const params = [];

  if (search) {
    sql += ' AND name LIKE ?';
    params.push(`%${search}%`);
  }

  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }

  sql += ' ORDER BY id ASC';

  const rows = db.prepare(sql).all(...params);
  return rows.map(toApi);
}

export function findById(id) {
  const row = db.prepare(
    'SELECT id, name, description, price, category, image_url, stock FROM products WHERE id = ?'
  ).get(id);
  return row ? toApi(row) : null;
}

export function create(fields) {
  const result = db.prepare(
    `INSERT INTO products (name, description, price, category, image_url, stock)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    fields.name,
    fields.description,
    fields.price,
    fields.category,
    fields.imageUrl,
    fields.stock
  );

  return findById(result.lastInsertRowid);
}

export function update(id, fields) {
  const allowed = ['name', 'description', 'price', 'category', 'imageUrl', 'stock'];
  const dbFieldMap = { imageUrl: 'image_url' };

  const setClauses = [];
  const values = [];

  for (const key of Object.keys(fields)) {
    const dbCol = dbFieldMap[key] || key;
    setClauses.push(`${dbCol} = ?`);
    values.push(fields[key]);
  }

  values.push(id);
  db.prepare(`UPDATE products SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);

  return findById(id);
}
