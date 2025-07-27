import axios from "axios";
import { useState, useEffect } from "react";
import PieChart from "../charts/pieChart";
import BarChart from "../charts/barChart"
import DonutChart from "../charts/donutChart"
import  LineChart  from "../charts/LineChart";
import { useFilter } from "../context/FilterContext";

const chartDescriptions = {
  pie: "Shows the percentage of expenses for each category.",
  donut: "Shows the total expense for each category.",
  bar: "Shows expense and income for each month of the past year.",
  line: "Shows the monthly balance (income minus expense) for the past year."
};

const Statistics = () => {
  const { chart, setChart } = useFilter();
  return (
    <div className="h-full">
      {/* Chart Type Selector */}
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* <h3 className="text-lg font-semibold text-gray-800 mb-3">Chart Type</h3> */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setChart('pie')}
              className={`p-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                chart === 'pie'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔴 Category-wise Expense Percentage

            </button>
            <button
              onClick={() => setChart('donut')}
              className={`p-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                chart === 'donut'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⭕ Total Expense by Category

            </button>
            <button
              onClick={() => setChart('bar')}
              className={`p-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                chart === 'bar'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📊 Monthly Income vs Expense

            </button>
            <button
              onClick={() => setChart('line')}
              className={`p-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                chart === 'line'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📈 Monthly Balance Trend

            </button>
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center min-h-[400px]">
          {chart === 'pie' && <PieChart />}
          {chart === 'donut' && <DonutChart />}
          {chart === 'bar' && <BarChart />}
          {chart === 'line' && <LineChart />}
        </div>
        <div className="mt-1 text-center">
          <span className="text-sm text-gray-600">{chartDescriptions[chart]}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
