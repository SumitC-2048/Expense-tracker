import Transaction from "../models/transactions.js";

export const PieController =  async (req,res) => {
    const {email} = req.query;
    console.log('email', email)
    if(!email){
        return res.json({
            succuss: false,
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
            succuss: true,
            message: 'category-wise sum',
            data
        });
    }catch(error){
        res.json({
            succuss: false,
            message: error.message
        })
    }
};