import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';

dotenv.config();
await connectDB();

const app = express();
// allow to accept JSON data in the body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use(`/uploads`, express.static(path.join(__dirname, '/uploads')));

// middleware #1: not found error, nonvalid object ID
app.use(notFound);

// middleware #2: a server error, default fallback
app.use(errorHandler);

const PORT = process.env.PORT || 5005;
const { NODE_ENV } = process.env;

app.listen(
  5005,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
