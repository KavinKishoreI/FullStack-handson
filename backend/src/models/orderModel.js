// Handles order database operations: transactional checkout, listing, and lookup.
// Performs stock checks, price snapshots, and cart clearing inside a transaction.
// Imported by order routes.

import db from '../db/index.js';
import { HttpError } from '../utils/HttpError.js';

export function createFromCart(userId) {
  const checkout = db.transaction(() => {
    const cartRows = db.prepare(
      `SELECT ci.product_id, ci.quantity, p.name, p.price, p.stock
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?
       ORDER BY ci.id ASC`
    ).all(userId);

    if (cartRows.length === 0) {
      throw new HttpError(400, 'Cart is empty');
    }

    for (const item of cartRows) {
      if (item.quantity > item.stock) {
        throw new HttpError(409, `Only ${item.stock} left in stock for ${item.name}`);
      }
    }

    const total = cartRows.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderResult = db.prepare(
      'INSERT INTO orders (user_id, total) VALUES (?, ?)'
    ).run(userId, total);

    const orderId = orderResult.lastInsertRowid;

    const insertItem = db.prepare(
      'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)'
    );

    const updateStock = db.prepare(
      'UPDATE products SET stock = stock - ? WHERE id = ?'
    );

    for (const item of cartRows) {
      insertItem.run(orderId, item.product_id, item.quantity, item.price);
      updateStock.run(item.quantity, item.product_id);
    }

    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId);

    return findById(orderId);
  });

  return checkout();
}

export function listForUser(userId) {
  const orders = db.prepare(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC'
  ).all(userId);

  return orders.map(order => {
    const items = getOrderItems(order.id);
    return {
      id: order.id,
      total: order.total,
      status: order.status,
      createdAt: order.created_at,
      items
    };
  });
}

export function findById(id) {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  if (!order) return null;

  const items = getOrderItems(order.id);
  return {
    id: order.id,
    userId: order.user_id,
    total: order.total,
    status: order.status,
    createdAt: order.created_at,
    items
  };
}

function getOrderItems(orderId) {
  const rows = db.prepare(
    `SELECT oi.product_id, p.name, oi.quantity, oi.unit_price
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`
  ).all(orderId);

  return rows.map(row => ({
    productId: row.product_id,
    name: row.name,
    quantity: row.quantity,
    unitPrice: row.unit_price,
    lineTotal: row.unit_price * row.quantity
  }));
}
