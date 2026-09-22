// Handles order HTTP requests: checkout, list, and detail.
// Validates input and calls orderModel for transactional checkout.
// Imported by app.js and mounted at /api/orders.

import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import * as orderModel from '../models/orderModel.js';
import { HttpError } from '../utils/HttpError.js';
import { parseIdParam } from '../utils/validate.js';

const router = Router();

router.use(requireAuth);

router.post('/', (req, res) => {
  const { userId, ...order } = orderModel.createFromCart(req.user.id);
  res.status(201).json(order);
});

router.get('/', (req, res) => {
  const orders = orderModel.listForUser(req.user.id);
  res.json(orders);
});

router.get('/:id', (req, res) => {
  const id = parseIdParam(req.params.id, 'order');

  const order = orderModel.findById(id);
  if (!order || order.userId !== req.user.id) {
    throw new HttpError(404, 'Order not found');
  }

  const { userId, ...orderResponse } = order;
  res.json(orderResponse);
});

export default router;
