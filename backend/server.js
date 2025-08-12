import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { connect, mongo } from 'mongoose';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';


import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import clientRoutes from './routes/clientRoute.js';

dotenv.config();

const app = express();
//====security middlewares====


app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from the client URL
    credentials: true, // Allow cookies to be sent with requests
     allowedHeaders: ['Content-Type', 'Authorization']
}));

//rate limiting






//Body parsing
app.use(bodyParser.json());
app.use(cookieParser());

//===Routes===

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/clients' , clientRoutes);



const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Network: http://[YOUR_IP]:${PORT}`);
    connectDB();
});

export default app;

