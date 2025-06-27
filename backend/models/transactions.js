import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true
    },
    // transactionId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
        MessageChannel: 'Amount is required'
    },
    type: {
        type: String,
        enum: ['credit', 'expense'],
        required: true,
        MessageChannel: 'Transaction type is required'
    },
    category:{
        type: String,
        enum: ['food', 'transport', 'entertainment', 'utilities', 'healthcare', 'education', 'other'],
        required: true,
        trim: true,
        default: 'other',
        MessageChannel: 'Category is required'
    },
    note: {
        type: String,
        trim: true,
        default: '',
        maxlength: 50,
        MessageChannel: 'Note should not exceed 50 characters'
    }
});

const Transaction = mongoose.model('Transactions', transactionSchema);

export default Transaction;