// Handles shopping cart HTTP requests: view, add, update, remove, clear.
// Validates input and calls cartModel for database operations.
// Imported by app.js and mounted at /api/cart.

import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import * as cartModel from '../models/cartModel.js';
import * as productModel from '../models/productModel.js';
import { HttpError } from '../utils/HttpError.js';
import { requirePositiveInt, requireIntRange } from '../utils/validate.js';

const router = Router();

router.use(requireAuth);

router.get('/', (req, res) => {
  const cart = cartModel.getCart(req.user.id);
  res.json(cart);
});

router.post('/items', (req, res) => {
  const productId = requirePositiveInt(req.body.productId, 'productId');
  const quantity = requireIntRange(req.body.quantity, 'quantity', 1, 99);

  const product = productModel.findById(productId);
  if (!product) {
    throw new HttpError(404, 'Product not found');
  }

  const existing = cartModel.getItem(req.user.id, productId);
  const currentQty = existing ? existing.quantity : 0;
  const newQty = currentQty + quantity;

  if (newQty > product.stock) {
    throw new HttpError(409, `Only ${product.stock} left in stock for ${product.name}`);
  }

  cartModel.upsertItem(req.user.id, productId, newQty);

  const cart = cartModel.getCart(req.user.id);
  res.status(201).json(cart);
});

router.put('/items/:productId', (req, res) => {
  const productId = requirePositiveInt(req.params.productId, 'productId');
  const quantity = requireIntRange(req.body.quantity, 'quantity', 1, 99);

  const existing = cartModel.getItem(req.user.id, productId);
  if (!existing) {
    throw new HttpError(404, 'Item not in cart');
  }

  const product = productModel.findById(productId);
  if (quantity > product.stock) {
    throw new HttpError(409, `Only ${product.stock} left in stock for ${product.name}`);
  }

  cartModel.upsertItem(req.user.id, productId, quantity);

  const cart = cartModel.getCart(req.user.id);
  res.json(cart);
});

router.delete('/items/:productId', (req, res) => {
  const productId = requirePositiveInt(req.params.productId, 'productId');

  const existing = cartModel.getItem(req.user.id, productId);
  if (!existing) {
    throw new HttpError(404, 'Item not in cart');
  }

  cartModel.removeItem(req.user.id, productId);
  res.status(204).end();
});

router.delete('/', (req, res) => {
  cartModel.clear(req.user.id);
  res.status(204).end();
});

export default router;
