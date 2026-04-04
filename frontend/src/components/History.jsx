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

    switch (value) {
      case "lastWeek": {
        const start = new Date(today);
        start.setDate(today.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        setStartDate(start.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
        break;
      }
      case "lastMonth": {
        const firstThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastPrev = new Date(firstThisMonth);
        lastPrev.setDate(0);
        const firstPrev = new Date(lastPrev.getFullYear(), lastPrev.getMonth(), 1);
        setStartDate(firstPrev.toISOString().split("T")[0]);
        setEndDate(lastPrev.toISOString().split("T")[0]);
        break;
      }
      case "custom":
        setStartDate("");
        setEndDate("");
        break;
      default:
        setStartDate("");
        setEndDate("");
    }
  };

  return (

    <div className="flex min-h-0 flex-1 flex-col gap-3 sm:gap-4">
      {/* Filters stay pinned; table area below takes remaining height and scrolls */}
      <div className="flex-shrink-0 rounded-lg border border-gray-100 bg-white p-3 shadow-md sm:p-4 lg:p-5">
        <h2 className="mb-3 text-base font-semibold text-gray-800 sm:mb-4 sm:text-lg lg:text-xl">
          Filter transactions
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4">
          {/* Type Filter */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">Transaction Type</label>
            <select
              name="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
              className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
              className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="flex-shrink-0 border-b border-gray-200 p-3 sm:p-4">
          <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Transaction history</h3>
          <p className="mt-1 text-xs text-gray-600 sm:text-sm">
            Showing {table.length} transaction{table.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
          <div className="min-w-full">
            <table className="min-w-[34rem] w-full">
              <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 shadow-sm">
                <tr>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">Date</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">Type</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">Category</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">Amount</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sm:p-2.5 sm:text-sm">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {table.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-sm text-gray-500 sm:p-8">
                      No transactions found. Try adjusting your filters.
                    </td>
                  </tr>
                ) : (
                  table.map((txn) => (
                    <tr
                      key={txn._id}
                      className={`transition-colors duration-150 hover:bg-gray-50 ${
                        txn.type === "expense" ? "bg-red-50" : "bg-green-50"
                      }`}
                    >
                      <td className="p-2 text-xs text-gray-900 sm:text-sm whitespace-nowrap">
                        {formatDate(txn)}
                      </td>
                      <td className="p-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${
                            txn.type === "expense"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {txn.type}
                        </span>
                      </td>
                      <td className="p-2 text-xs capitalize text-gray-900 sm:text-sm whitespace-nowrap">
                        {txn.category}
                      </td>
                      <td className="p-2 text-xs font-semibold text-gray-900 sm:text-sm whitespace-nowrap">
                        ₹{txn.amount}
                      </td>
                      <td
                        className="max-w-[6rem] truncate p-2 text-xs text-gray-600 sm:max-w-[10rem] md:max-w-[14rem]"
                        title={txn.note}
                      >
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
