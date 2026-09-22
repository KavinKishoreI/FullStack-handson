// Logs every HTTP request with method, URL, status, and duration.
// Uses the 'finish' event on the response to capture the final status code.
// Registered first in app.js so it wraps all routes.

function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });
  next();
}

export default requestLogger;
