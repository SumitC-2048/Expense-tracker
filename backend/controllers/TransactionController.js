import Transaction from "../models/transactions.js";

const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // format: "YYYY-MM-DD"
}
const createTransaction = async (req,res)=>{
    try{
        console.log("Create Transaction");
        const { email, date, amount, type, category, note } = req.body;
        let curDate = getCurrentDate();
        if(date==null){
            date=new Date();
        }
        const inputDate = new Date(date); // `date` is from your form state
        const today = new Date();

        // Zero out the time part so only the date is compared
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
        if(amount<=0){
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
        
        const newTransaction = await Transaction.create({
            email: email,
            // transactionId: (Math.random()),
            type: type,
            amount: amount,
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
        return res.json({
            success: false,
            message: err.message
        });
    }

};

const getAllTransaction = async (req,res) => {
    try{
        console.log('Get all Transactions');

        const email = req.query.email;
        if(!email){
            return res.json({
                success: false,
                message: 'login required!!'
            });
        }
        let query = {email:email}
        let type = req.query.type;
        let category = req.query.category;
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;
        let minAmount = req.query.minAmount;
        let maxAmount = req.query.maxAmount;
        
        if(type!=''){
            query.type=type;
        }
        if(category!=''){
            query.category=category;
        }
        
        // Date range filter
         if(startDate){
            query.date = {
                $gte: new Date(startDate)
            };
        }
        if(endDate){
            query.date = {
                $lte: new Date(endDate)
            };
        }
        
        // Amount filter
        if(minAmount || maxAmount){
            query.amount = {};
            if(minAmount){
                query.amount.$gte = parseFloat(minAmount);
            }
            if(maxAmount){
                query.amount.$lte = parseFloat(maxAmount);
            }
        }
        
        const allTransactions = await Transaction.find(query).sort({date:1});
        return res.json({
            success: true,
            message: `All ${req.query.type} Transactinos retrived successfully`,
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


const editTransaction = async (req,res) => {
    try{
        console.log("Edit Transaction with id: ",req.params.id);
        const { email, date, amount, type, category, note } = req.body;
        if(date==null){
            date=getCurrentDate();
        }
        if(!email){
            return res.json({
                message: 'Login required!!',
                success: false
            });
        }
        if(amount<=0){
            return res.json({
                message: 'amount must be greater than 0',
                success: false
            });
        }
        if(!amount || !type || !category){
            return res.json({
                message: 'required fields are missing',
                success: false
            });
        }

        const newTransaction = await Transaction.replaceOne({_id:req.params.id},{
            email: email,
            // transactionId: (Math.random()),
            type: type,
            amount: amount,
            category: category,
            note: note,
            date: date
        });

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
const deleteTransaction = async (req,res) => {
    try{
        console.log("Delete Transaction with id: ",req.params.id);
        const {email} = req.body;
        if(!email){
            return res.json({
                message: 'Login required!!',
                success: false
            });
        }

        const newTransaction = await Transaction.delete({_id:req.params.id});

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

export {createTransaction,getAllTransaction,editTransaction,deleteTransaction};