// Custom error class that carries an HTTP status code.
// Thrown by routes to signal client-facing errors.
// Caught by the errorHandler middleware in app.js.

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
