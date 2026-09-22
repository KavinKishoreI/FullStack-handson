// Catches requests that did not match any route.
// Returns a 404 JSON error response.
// Registered after all route mounts in app.js.

import { HttpError } from '../utils/HttpError.js';

function notFound(req, res, next) {
  throw new HttpError(404, 'Route not found');
}

export default notFound;
