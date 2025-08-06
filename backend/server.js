import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { connect, mongo } from 'mongoose';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';

//routes
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();

const app = express();
//====security middlewares====

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from the client URL
    credentials: true, // Allow cookies to be sent with requests
}));

//rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});
app.use('/api' , limiter);


//data sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());



//Body parsing
app.use(bodyParser.json());
app.use(cookieParser());

//===Routes===
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

//===Error handling===
app.use('*', (req, res) => {
res.status(404).json({ message: 'Route not found' });
})
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});




const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();

});
export default app;

