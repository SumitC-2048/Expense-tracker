import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/Database.js';
import bodyParser from 'body-parser';
import {authRouter} from './routes/authRoutes.js';
import { transactionRouter } from './routes/transationRouter.js';
import { statsRouter } from './routes/statsRouter.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = ['http://localhost:5173', 'http://localhost:4000', 'http://localhost:4102'];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
    credentials: true, // Allow credentials if needed
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

app.use('/auth',authRouter);
app.use('/transaction',transactionRouter);
app.use('/stats',statsRouter);

app.listen(PORT,() => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});