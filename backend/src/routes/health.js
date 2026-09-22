// Handles the health-check endpoint.
// Returns a simple JSON status to confirm the server is running.
// Imported by app.js and mounted at /api/health.

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
