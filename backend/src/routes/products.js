// Handles product HTTP requests: list, detail, create, update.
// Validates input and calls productModel.
// Imported by app.js and mounted at /api/products.

import { Router } from 'express';
import * as productModel from '../models/productModel.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import { HttpError } from '../utils/HttpError.js';
import {
  requireString,
  optionalString,
  requirePositiveInt,
  requireNonNegativeInt
} from '../utils/validate.js';

const router = Router();

router.get('/', (req, res) => {
  const { search, category } = req.query;
  const products = productModel.list({ search, category });
  res.json(products);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, 'Invalid product id');
  }

  const product = productModel.findById(id);
  if (!product) {
    throw new HttpError(404, 'Product not found');
  }

  res.json(product);
});

router.post('/', requireAuth, requireAdmin, (req, res) => {
  const name = requireString(req.body.name, 'name', 100);
  const description = optionalString(req.body.description, 'description', 500);
  const price = requirePositiveInt(req.body.price, 'price');
  const category = requireString(req.body.category, 'category', 50);
  const imageUrl = optionalString(req.body.imageUrl, 'imageUrl');
  const stock = requireNonNegativeInt(req.body.stock, 'stock');

  const product = productModel.create({ name, description, price, category, imageUrl, stock });
  res.status(201).json(product);
});

router.patch('/:id', requireAuth, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, 'Invalid product id');
  }

  const existing = productModel.findById(id);
  if (!existing) {
    throw new HttpError(404, 'Product not found');
  }

  const allowed = ['name', 'description', 'price', 'category', 'imageUrl', 'stock'];
  const fields = {};

  for (const key of Object.keys(req.body)) {
    if (!allowed.includes(key)) {
      throw new HttpError(400, `Unknown field: ${key}`);
    }
  }

  if (req.body.name !== undefined) fields.name = requireString(req.body.name, 'name', 100);
  if (req.body.description !== undefined) fields.description = optionalString(req.body.description, 'description', 500);
  if (req.body.price !== undefined) fields.price = requirePositiveInt(req.body.price, 'price');
  if (req.body.category !== undefined) fields.category = requireString(req.body.category, 'category', 50);
  if (req.body.imageUrl !== undefined) fields.imageUrl = optionalString(req.body.imageUrl, 'imageUrl');
  if (req.body.stock !== undefined) fields.stock = requireNonNegativeInt(req.body.stock, 'stock');

  if (Object.keys(fields).length === 0) {
    throw new HttpError(400, 'No valid fields to update');
  }

  const product = productModel.update(id, fields);
  res.json(product);
});

export default router;
