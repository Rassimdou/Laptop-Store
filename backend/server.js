import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';
import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


const PORT = process.env.PORT;
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();

});
export default app;

