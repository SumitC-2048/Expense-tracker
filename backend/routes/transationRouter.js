import express from 'express';
import Transaction from '../models/transactions.js';
import {
  createTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
  deleteFilteredTransactions,
  deleteTransactionsByIds,
} from '../controllers/TransactionController.js';
import protect from '../middlewares/jwt.js';

const router = express.Router();

router.post('/create',protect,createTransaction);
router.get('/all',protect,getAllTransaction);
router.delete('/filtered',protect,deleteFilteredTransactions);
router.post('/delete-bulk',protect,deleteTransactionsByIds);
router.put('/edit/:id',protect,editTransaction);
router.delete('/delete/:id',protect,deleteTransaction);


export {router as transactionRouter};