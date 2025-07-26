import axios from "axios";
import { useState } from "react";
import { useFilter } from "../context/FilterContext";

const AddExpense = ({onAdd}) => {
  const {newTransactionFlag,setNewTransactionFlag} = useFilter();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // format: "YYYY-MM-DD"
  }
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const resetForm = () => {
    setDate("");
    setAmount(0);
    setType("expense");
    setCategory("food");
    setNote("");
    setError("");
    setTimeout(go,4000);
    function go(){
        setSuccess("")
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const transaction = {
        email: localStorage.getItem("email"),
        date,
        amount,
        type,
        category,
        note,
      };
      console.log(transaction);
      const response = await axios.post(
        "http://localhost:3000/transaction/create",
        transaction
      );

      if (!response.data.success) {
        setError(response.data.message || "Failed to create transaction");
        return;
      }
      // socket emission
      setSuccess("Transaction successfully added!");
      
      setNewTransactionFlag(!newTransactionFlag);
      resetForm();
    } catch (err) {
      console.error("Error while adding transaction:", err);
      setError(err.message || "Server error");
    }
  };

  return (
    <div className="w-full lg:w-1/3 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Transaction</h2>
        <p className="text-sm text-gray-600">Enter your transaction details below</p>
      </div>

      <form className="space-y-4" onSubmit={handleAdd}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
        <input
          type="number"
            placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        >
          <option value="expense">Expense</option>
          <option value="credit">Credit</option>
        </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        >
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Note</label>
        <input
          type="text"
            placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="reset"
            onClick={resetForm}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset
          </button>

          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Transaction
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 text-sm font-medium">{success}</p>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
