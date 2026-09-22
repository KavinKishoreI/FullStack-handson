// Configures the Express application with middleware and route mounts.
// Initializes the database by importing the DB module.
// Imported by server.js to start listening.

import express from 'express';
import cors from 'cors';
import config from './config.js';
import './db/index.js';

import requestLogger from './middleware/requestLogger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import ordersRouter from './routes/orders.js';

const app = express();

app.use(express.json());
app.use(cors({ origin: config.clientOrigin }));
app.use(requestLogger);

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
