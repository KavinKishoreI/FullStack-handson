// Seeds the database with products from products.json and demo users.
// Inserts demo@shop.test (customer) and admin@shop.test (admin) with bcrypt hashes.
// Called by db/index.js when the products table is empty.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function seed(db) {
  const productsPath = path.join(__dirname, '..', '..', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

  const insertProduct = db.prepare(
    `INSERT INTO products (id, name, description, price, category, image_url, stock)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  const insertUser = db.prepare(
    `INSERT INTO users (id, name, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`
  );

  const transaction = db.transaction(() => {
    for (const p of products) {
      insertProduct.run(p.id, p.name, p.description, p.price, p.category, p.imageUrl, p.stock);
    }

    insertUser.run(1, 'Demo User', 'demo@shop.test', bcrypt.hashSync('demo123', 10), 'customer');
    insertUser.run(2, 'Admin', 'admin@shop.test', bcrypt.hashSync('admin123', 10), 'admin');
  });

  transaction();
  console.log('Database seeded with products and users.');
}
