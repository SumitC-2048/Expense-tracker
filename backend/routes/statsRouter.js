// backend/routes/authRoutes.js
import express from 'express';
import Transaction from '../models/transactions.js';
import { PieController } from '../controllers/statsController.js';

const router = express.Router();

router.get('/pie',async (req,res) => {
    const {email} = req.query;
    console.log('email', email)
    if(!email){
        return res.json({
            success: false,
            message: 'login required' 
        });
    }
    try{
         const data = await Transaction.aggregate([
                        { $match: { type: 'expense', email: email } },
                        {
                            $group: {
                            _id: "$category",
                            totalExpense: { $sum: "$amount" }
                            }
                        }
                    ]);
        return res.json({
            success: true,
            message: 'category-wise sum',
            data
        });
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
});


router.get('/bar',async (req,res) => {
    const {email} = req.query;
    console.log('email', email)
    if(!email){
        return res.json({
            success: false,
            message: 'login required'
        });
    }
    try{
        const end = new Date(); // today
        const start = new Date(); 
        start.setFullYear(end.getFullYear() - 1);

        const data = await Transaction.aggregate([
                        {
                            $match: {
                            date: {
                                $gte: start,
                                $lte: end // today
                            }
                            }
                        },
                        {
                            $group: {
                            _id: {
                                month: { $month: "$date" },
                                year: { $year: "$date" }
                            },
                            income: {
                                $sum: {
                                $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0]
                                }
                            },
                            expense: {
                                $sum: {
                                $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                                }
                            }
                            }
                        },
                        {
                            $project: {
                            _id: 0,
                            monthNumber: "$_id.month",
                            year: "$_id.year",
                            income: 1,
                            expense: 1
                            }
                        },
                        {
                            $sort: {
                            year: 1,
                            monthNumber: 1
                            }
                        }
                    ]);
        res.json({
            success: true,
            message: 'Bar-char information: month-year wise income and expence',
            data
        });
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
});


router.get('/donut',async (req,res) => {
    const {email} = req.query;
    console.log('email', email)
    if(!email){
        return res.json({
            success: false,
            message: 'login required'
        });
    }
    try{
        const data = await Transaction.aggregate([
                        { $match: { type: 'expense', email: email } },
                        {
                            $group: {
                            _id: "$category",
                            totalExpense: { $sum: "$amount" }
                            }
                        }
                    ]);
        return res.json({
            success: true,
            message: 'category-wise sum', 
            data
        });
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
});
router.get('/line',async (req,res) => {
    const {email} = req.query;
    console.log('email', email)
    if(!email){
        return res.json({
            success: false,
            message: 'login required'
        });
    }
    try{
        const data = await Transaction.aggregate([
                                {
                                    $match: {
                                    date: {
                                        $gte: new Date(new Date().setDate(new Date().getDate() - 30))
                                    }
                                    }
                                },
                                {
                                    $project: {
                                    amount: {
                                        $cond: [
                                        { $eq: ["$type", "credit"] },
                                        "$amount",
                                        { $multiply: ["$amount", -1] }
                                        ]
                                    },
                                    day: {
                                        $dateToString: { format: "%d %b", date: "$date" } // e.g. 01 Jan
                                    }
                                    }
                                },
                                {
                                    $group: {
                                    _id: "$day",
                                    balance: { $sum: "$amount" }
                                    }
                                },
                                {
                                    $sort: { _id: 1 }
                                },
                                {
                                    $project: {
                                    _id: 0,
                                    date: "$_id",
                                    balance: 1
                                    }
                                }
                                ]);

        return res.json({
            success: true,
            message: 'line-chart: date and total balance', 
            data
        });
    }catch(error){
        res.json({
            success: false,
            message: error.message
        })
    }
});





export {router as statsRouter};
