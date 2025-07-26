// backend/routes/authRoutes.js
import express from 'express';
import { SigninController,SignupController } from '../controllers/authController.js'; 
import Transaction from '../models/transactions.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log("main DashBoard");
    res.send('<h1>Dashboard</h1>'); 
});

router.post('/signin', SigninController);
router.post('/signup', SignupController);


export {router as authRouter};
