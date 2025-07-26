import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useFilter } from "../context/FilterContext";

const History = () => {

  const {
    type, setType, 
    category, setCategory, 
    startDate, setStartDate,
    endDate, setEndDate,
    minAmount, setMinAmount,
    maxAmount, setMaxAmount,
    frequency, setFrequency,
    table
  } = useFilter();

  const formatDate = (txn) => {
    return new Date(txn.date).toLocaleDateString();
  };
  
  const reset = () => {
    setType('');
    setCategory('');
    setStartDate('');
    setEndDate('');
    setMinAmount('');
    setMaxAmount('');
    setFrequency('');
  }

  const handleFrequencyChange = (value) => {
    setFrequency(value);
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch(value) {
      case 'lastWeek':
        start.setDate(today.getDate() - 7);
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(today.toISOString().split('T')[0]);
        break;
      case 'lastMonth':
        start.setMonth(today.getMonth() - 1);
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(today.toISOString().split('T')[0]);
        break;
      case 'custom':
        setStartDate('');
        setEndDate('');
        break;
      default:
        setStartDate('');
        setEndDate('');
    }
  };

  return (

    <div className="flex flex-col h-full">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 flex-shrink-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Filter Transactions</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Type Filter */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">Transaction Type</label>
            <select
              name="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="credit">Credit</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="utilities">Utilities</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Frequency Filter */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">Time Period</label>
            <select
              name="frequency"
              onChange={(e) => handleFrequencyChange(e.target.value)}
              value={frequency}
              className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Time</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Custom Date Range */}
          {frequency === 'custom' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* Amount Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Min Amount (₹)</label>
            <input
              type="number"
              placeholder="0"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Max Amount (₹)</label>
            <input
              type="number"
              placeholder="∞"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={reset}
              className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Table - Takes remaining space */}
      <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
          <p className="text-sm text-gray-600 mt-1">
            Showing {table.length} transaction{table.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Simplified overflow structure for better mobile support */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Date</th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Type</th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Category</th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Amount</th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {table.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No transactions found. Try adjusting your filters.
                    </td>
                  </tr>
                ) : (
                  table.map((txn) => (
                    <tr
                      key={txn._id}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        txn.type === 'expense' ? 'bg-red-50' : 'bg-green-50'
                      }`}
                    >
                      <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-900 whitespace-nowrap">{formatDate(txn)}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                          txn.type === 'expense' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {txn.type}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-900 capitalize whitespace-nowrap">{txn.category}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">₹{txn.amount}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 truncate max-w-[100px] sm:max-w-[200px]" title={txn.note}>
                        {txn.note}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
