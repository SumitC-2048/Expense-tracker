import express from 'express';
import Transaction from '../models/transactions.js';
import {createTransaction,getAllTransaction,editTransaction,deleteTransaction} from '../controllers/TransactionController.js';
const router = express.Router();

router.post('/create',createTransaction);
router.get('/all',getAllTransaction);
router.put('/edit/:id',editTransaction);
router.delete('/delete/:id',deleteTransaction);


export {router as transactionRouter};