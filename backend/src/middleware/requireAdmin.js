// Checks that the authenticated user has the 'admin' role.
// Must run after requireAuth so req.user is already set.
// Used by admin-only product routes (POST, PATCH).

import { HttpError } from '../utils/HttpError.js';

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    throw new HttpError(403, 'Admin access required');
  }
  next();
}

export default requireAdmin;
