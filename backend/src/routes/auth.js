// Handles authentication HTTP requests: signup, login, and current user.
// Validates input, hashes passwords, issues JWTs.
// Imported by app.js and mounted at /api/auth.

import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import * as userModel from '../models/userModel.js';
import requireAuth from '../middleware/requireAuth.js';
import { HttpError } from '../utils/HttpError.js';
import { requireString, requireEmail } from '../utils/validate.js';

const router = Router();

router.post('/signup', (req, res) => {
  const name = requireString(req.body.name, 'name', 50);
  const email = requireEmail(req.body.email);
  const password = req.body.password;

  if (typeof password !== 'string' || password.length < 6) {
    throw new HttpError(400, 'Password must be at least 6 characters');
  }

  if (userModel.emailExists(email)) {
    throw new HttpError(409, 'Email already registered');
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = userModel.create({ name, email, passwordHash });

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  res.status(201).json({ token, user });
});

router.post('/login', (req, res) => {
  const email = requireEmail(req.body.email);
  const password = req.body.password;

  if (typeof password !== 'string') {
    throw new HttpError(401, 'Invalid email or password');
  }

  const user = userModel.findByEmailWithPassword(email);
  if (!user) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const valid = bcrypt.compareSync(password, user.passwordHash);
  if (!valid) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

router.get('/me', requireAuth, (req, res) => {
  res.json(req.user);
});

export default router;
