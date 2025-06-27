import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useFilter } from "../context/FilterContext";

const History = () => {

  const {type,setType,category,setCategory,table} = useFilter();

  const formatDate = (txn) => {
    return new Date(txn.date).toLocaleDateString();
  };
  
  const reset = () => {    
    setType('');
    setCategory('');
  }

  return (

    <div className="h-[100%]">
      <div className="flex gap-4" id="filters">
        <div>
          <label id="typeFilter">type: </label>
          <select
            name="type"
            id="typeFilter"
            onChange={(e) => setType(e.target.value)}
            value={type}
            className="p-2 border rounded-md bg-gray-200"
            >
            <option value="">All</option>
            <option value="credit">Credit</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label id="categoryFilter">Category: </label>
          <select
            name="category"
            id="categoryFilter"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="p-2 border rounded-md bg-gray-200"
            >
            <option value="">All</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          onClick={() => reset()}
          className="p-2 border rounded-md bg-gray-200 hover:bg-gray-400 hover: cursor-pointer"
        >
          reset
        </button>
      </div>


      <div className="mt-6 ">
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full table-fixed border-collapse">
              <thead className="sticky top-0 bg-gray-300 z-10">
                <tr>
                  <th className="p-2 w-1/5 text-left">Date</th>
                  <th className="p-2 w-1/5 text-left">Type</th>
                  <th className="p-2 w-1/5 text-left">Category</th>
                  <th className="p-2 w-1/5 text-left">Amount</th>
                  <th className="p-2 w-1/5 text-left">Note</th>
                </tr>
              </thead>
              <tbody>
                {table.map((txn) => (
                  <tr
                    key={txn._id}
                    className={`border-t ${txn.type === 'expense' ? 'bg-red-300' : 'bg-green-300'}`}
                  >
                    <td className="p-2 w-1/5 text-left">{formatDate(txn)}</td>
                    <td className="p-2 w-1/5 text-left capitalize">{txn.type}</td>
                    <td className="p-2 w-1/5 text-left capitalize">{txn.category}</td>
                    <td className="p-2 w-1/5 text-left font-semibold">₹{txn.amount}</td>
                    <td className="p-2 w-1/5 text-left truncate max-w-[180px]">{txn.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* {message && <p className="mt-2 text-red-500">{message}</p>} */}
    </div>
  );
};

export default History;
