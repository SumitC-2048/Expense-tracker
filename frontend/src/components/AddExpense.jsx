import axios from "axios";
import { useState } from "react";
import { useFilter } from "../context/FilterContext";

const AddExpense = ({onAdd}) => {
  const {fetchTransactions} = useFilter();

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
      
      fetchTransactions();

      resetForm();
    } catch (err) {
      console.error("Error while adding transaction:", err);
      setError(err.message || "Server error");
    }
  };

  return (
    <div className="md:w-1/3 p-4 bg-green-100 rounded-lg shadow-md" style={{minWidth:'30%' }}>
      <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">
        Add Expense
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleAdd}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} 
          className="p-2 border rounded-md bg-green-200 text-green-900"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded-md bg-green-200 text-green-900"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded-md bg-green-200 text-green-900"
        >
          <option value="expense">Expense</option>
          <option value="credit">Credit</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md bg-green-200 text-green-900"
        >
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="p-2 border rounded-md bg-green-200 text-green-900"
        />

        <div className="flex gap-3 justify-center">
          <button
            type="reset"
            onClick={resetForm}
            className="px-4 py-2 bg-green-300 hover:bg-green-400 text-green-900 font-semibold rounded-md transition"
          >
            Reset
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
          >
            Add
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 text-red-600 font-medium text-sm">{error}</div>
      )}
      {success && (
        <div className="mt-4 text-green-700 font-medium text-sm">{success}</div>
      )}
    </div>
  );
};

export default AddExpense;
