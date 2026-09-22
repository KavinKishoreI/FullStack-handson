// Loads environment variables and exports app-wide configuration.
// Provides defaults so the app works without a .env file in development.
// Imported by most modules that need port, DB path, JWT, or CORS settings.

import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 4000,
  dbPath: process.env.DB_PATH || './data/shop.db',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-change-me',
  jwtExpiresIn: '2h',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  failCheckoutAfterOrder: process.env.FAIL_CHECKOUT_AFTER_ORDER === 'true'
};

export default config;
