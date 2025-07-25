import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import productRoutes from './routes/productRoutes.js';
import errorHandler, { notFound } from './middleware/errorMiddleware.js';
import { protect, adminOnly } from './middleware/authMiddleware.js';
import User from './models/User.js';

dotenv.config();
await connectDB();

const app = express();

// ————— Security & Rate-Limit —————
app.use(helmet());
app.use(rateLimit({ windowMs:15*60*1000, max:100 }));

// ————— CORS —————
const allowed = process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
app.use(cors({ origin: allowed, credentials: true }));

app.use(express.json());
app.use(cookieParser());

// ————— Seed single admin —————
const seedAdmin = async () => {
  const exists = await User.findOne({ role: 'admin' });
  if (!exists) {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hash,
      role: 'admin',
    });
    console.log('✅ Admin user seeded');
  }
};
await seedAdmin();

// ————— Routes —————
app.use('/api/auth',     authRoutes);
// from here on, all shop/product writes require admin

app.use('/api/shops',   shopRoutes);
app.use('/api/products',  productRoutes);

app.get('/', (req, res) => res.send('API is running…'));

// ————— Error Handling —————
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
