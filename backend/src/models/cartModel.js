// Handles shopping cart database operations: get, upsert, remove, clear.
// Joins with products to calculate line totals and cart totals.
// Imported by cart routes and orderModel for checkout.

import db from '../db/index.js';

export function getCart(userId) {
  const rows = db.prepare(
    `SELECT ci.product_id, p.name, p.price, p.image_url, ci.quantity
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?
     ORDER BY ci.id ASC`
  ).all(userId);

  const items = rows.map(row => ({
    productId: row.product_id,
    name: row.name,
    price: row.price,
    imageUrl: row.image_url,
    quantity: row.quantity,
    lineTotal: row.price * row.quantity
  }));

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.lineTotal, 0);

  return { items, itemCount, total };
}

export function getItem(userId, productId) {
  const row = db.prepare(
    'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?'
  ).get(userId, productId);
  return row || null;
}

export function upsertItem(userId, productId, quantity) {
  db.prepare(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = ?`
  ).run(userId, productId, quantity, quantity);
}

export function removeItem(userId, productId) {
  return db.prepare(
    'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?'
  ).run(userId, productId);
}

export function clear(userId) {
  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId);
}
