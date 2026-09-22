// Central error handler for the Express app.
// Converts HttpError to the appropriate status; catches malformed JSON and unknown errors.
// Registered last in app.js so it catches errors from all routes and middleware.

import { HttpError } from '../utils/HttpError.js';

function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: { message: err.message } });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { message: 'Malformed JSON body' } });
  }

  console.error(err.stack);
  res.status(500).json({ error: { message: 'Internal server error' } });
}

export default errorHandler;
