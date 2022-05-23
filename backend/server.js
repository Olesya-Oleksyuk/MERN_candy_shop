import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
await connectDB();

const app = express();
// allow to accept JSON data in the body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// middleware #1: not found error, nonvalid object ID
app.use(notFound);

// middleware #2: a server error, default fallback
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.listen(
  5000,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
