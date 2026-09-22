// Verifies the JWT from the Authorization header and loads the user.
// Sets req.user = { id, name, email, role } for downstream handlers.
// Used by cart, order, and auth/me routes.

import jwt from 'jsonwebtoken';
import config from '../config.js';
import * as userModel from '../models/userModel.js';
import { HttpError } from '../utils/HttpError.js';

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    throw new HttpError(401, 'Authentication required');
  }

  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new HttpError(401, 'Authentication required');
  }

  try {
    const payload = jwt.verify(parts[1], config.jwtSecret);
    const user = userModel.findById(payload.sub);
    if (!user) {
      throw new HttpError(401, 'Invalid or expired token');
    }
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof HttpError) throw err;
    throw new HttpError(401, 'Invalid or expired token');
  }
}

export default requireAuth;
