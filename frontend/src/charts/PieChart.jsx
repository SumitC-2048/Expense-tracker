import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useFilter } from '../context/FilterContext';

const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Teal
  '#FFBB28', // Yellow-Orange
  '#FF8042', // Orange
  '#FF6347', // Tomato
  '#6A5ACD', // Slate Blue
  '#8A2BE2'  // BlueViolet (new)
];

const PieChartComponent = () => {
  const { pieData } = useFilter();

  return (
      <div className=' rounded-lg p-6 w-full max-w-md mx-auto'>
        {/* <div className="text-center text-xl font-bold mb-4">Category-wise Expense Distribution</div> */}
    <PieChart width={400} height={400}>

      <Pie
        data={pieData}
        dataKey="percentage"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
        >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
      </div>
  );
}
export default PieChartComponent;
