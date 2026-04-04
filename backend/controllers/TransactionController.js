import mongoose from "mongoose";
import Transaction from "../models/transactions.js";

const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

/** Shared filter logic for list + bulk delete (query params match GET /all). */
const buildTransactionQuery = (email, q) => {
    let query = { email };
    const type = q.type;
    const category = q.category;
    const startDate = q.startDate;
    const endDate = q.endDate;
    const minAmount = q.minAmount;
    const maxAmount = q.maxAmount;

    if (type != null && String(type).trim() !== "") {
        query.type = type;
    }
    if (category != null && String(category).trim() !== "") {
        query.category = category;
    }

    if (startDate || endDate) {
        query.date = {};
        if (startDate) {
            const d = new Date(startDate);
            d.setHours(0, 0, 0, 0);
            query.date.$gte = d;
        }
        if (endDate) {
            const d = new Date(endDate);
            d.setHours(23, 59, 59, 999);
            query.date.$lte = d;
        }
    }

    const minAmt =
        minAmount !== undefined && minAmount !== "" ? parseFloat(minAmount) : null;
    const maxAmt =
        maxAmount !== undefined && maxAmount !== "" ? parseFloat(maxAmount) : null;
    const hasMin = minAmt != null && !Number.isNaN(minAmt);
    const hasMax = maxAmt != null && !Number.isNaN(maxAmt);
    if (hasMin || hasMax) {
        query.amount = {};
        if (hasMin) query.amount.$gte = minAmt;
        if (hasMax) query.amount.$lte = maxAmt;
    }

    return query;
};

const createTransaction = async (req,res)=>{
    try{
        console.log("Create Transaction");
        
        const { amount, type, category, note } = req.body;
        const {email} = req.user;
        let {date} = req.body;
        if(!date){
            date=new Date();
        }
        const inputDate = new Date(date);
        const today = new Date();

        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (inputDate > today) {
            return res.json({
                message: 'Date cannot be in future',
                success: false
            });
        }
        if(!email){
            return res.json({
                message: 'Login required!!',
                success: false
            });
        }
        if(Number(amount)<=0){
            return res.json({
                message: 'amount must be greater than 0',
                success: false
            });
        }
        if(!type || !category){
            return res.json({
                message: 'Enter required fields',
                success: false
            });
        }
        
        await Transaction.create({
            email: email,
            type: type,
            amount: Number(amount),
            category: category,
            note: note,
            date: date
        });

        console.log('Transaction created successfully');

        return res.json({
            success: true,
            message: 'Transaction has been created!!'
        })
    }catch(err){
        console.log(`Getting error while fetching `)
        return res.json({
            success: false,
            message: err.message
        });
    }

};

const getAllTransaction = async (req,res) => {
    try{
        console.log('Get all Transactions');

        const {email} = req.user;
        if(!email){
            return res.json({
                success: false,
                message: 'login required!!'
            });
        }
        const query = buildTransactionQuery(email, req.query);
        
        const allTransactions = await Transaction.find(query).sort({date:1});
        return res.json({
            success: true,
            message: "Transactions retrieved successfully",
            transactions: allTransactions
        });

    }catch(err){
        console.log('inside catch: ',err.message);
        return res.json({
            success: false,
            message: err.message
        });
    }
}

const deleteFilteredTransactions = async (req, res) => {
    try {
        const { email } = req.user;
        if (!email) {
            return res.json({
                success: false,
                message: "login required!!",
            });
        }
        const query = buildTransactionQuery(email, req.query);
        const result = await Transaction.deleteMany(query);
        return res.json({
            success: true,
            message: "Matching transactions deleted",
            deletedCount: result.deletedCount,
        });
    } catch (err) {
        return res.json({
            success: false,
            message: err.message,
        });
    }
};


const editTransaction = async (req,res) => {
    try{
        console.log("Edit Transaction with id: ",req.params.id);
        let { date, amount, type, category, note } = req.body;
        const {email} = req.user;
        if(date==null || date === ''){
            date=getCurrentDate();
        }
        if(!email){
            return res.json({
                message: 'Login required!!',
                success: false
            });
        }
        amount = Number(amount);
        if(!amount || amount <= 0){
            return res.json({
                message: 'amount must be greater than 0',
                success: false
            });
        }
        if(!type || !category){
            return res.json({
                message: 'required fields are missing',
                success: false
            });
        }

        const inputDate = new Date(date);
        const today = new Date();
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (inputDate > today) {
            return res.json({
                message: 'Date cannot be in future',
                success: false
            });
        }

        const result = await Transaction.replaceOne(
            { _id: req.params.id, email },
            {
            email: email,
            type: type,
            amount: amount,
            category: category,
            note: note || '',
            date: date
        });

        if (result.matchedCount === 0) {
            return res.json({
                success: false,
                message: 'Transaction not found or access denied',
            });
        }

        console.log('Transaction updated successfully');

        return res.json({
            success: true,
            message: 'Transaction has been updated!!'
        })
    }catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
};

const deleteTransactionsByIds = async (req, res) => {
    try {
        const { email } = req.user;
        if (!email) {
            return res.json({
                success: false,
                message: "Login required!!",
            });
        }
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.json({
                success: false,
                message: "Provide a non-empty ids array",
            });
        }
        const objectIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
        if (objectIds.length === 0) {
            return res.json({
                success: false,
                message: "No valid transaction ids",
            });
        }
        const result = await Transaction.deleteMany({
            _id: { $in: objectIds },
            email,
        });
        return res.json({
            success: true,
            message: "Transactions deleted",
            deletedCount: result.deletedCount,
        });
    } catch (err) {
        return res.json({
            success: false,
            message: err.message,
        });
    }
};

const deleteTransaction = async (req,res) => {
    try{
        console.log("Delete Transaction with id: ",req.params.id);
        const {email} = req.user;
        if(!email){
            return res.json({
                message: 'Login required!!',
                success: false
            });
        }

        const result = await Transaction.deleteOne({ _id: req.params.id, email });

        if (result.deletedCount === 0) {
            return res.json({
                success: false,
                message: 'Transaction not found or access denied',
            });
        }

        console.log('Transaction with id:',req.params.id,'is deleted');

        return res.json({
            success: true,
            message: 'Transaction has been deleted!!'
        })
    }catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
};

export {
    createTransaction,
    getAllTransaction,
    editTransaction,
    deleteTransaction,
    deleteFilteredTransactions,
    deleteTransactionsByIds,
};
