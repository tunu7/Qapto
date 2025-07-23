import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import productRoutes from './routes/productRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import { notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// Security & rate‑limit
app.use(helmet());
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));

// CORS: read origins from ENV
const allowed = process.env.ALLOWED_ORIGINS
  .split(',')
  .map(origin => origin.trim());
app.use(cors({ origin: allowed, credentials: true }));

app.use(express.json());
app.use(cookieParser());

// your routes…
app.use('/api/auth',     authRoutes);
app.use('/api/shops',    shopRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('API is running...'));

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
