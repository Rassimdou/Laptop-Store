import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import clientRoutes from './routes/clientRoute.js';
import analyticsRoutes from './routes/analyticsRoute.js';   

dotenv.config();

const app = express();

// CORS Configuration - Simplified
app.use(cors({
    origin: [
        'https://laptop-store-w475.vercel.app',
        'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));


// Body parsing
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    connectDB();
});

export default app;