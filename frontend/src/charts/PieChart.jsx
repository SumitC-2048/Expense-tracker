// return a pie chart component 
// such that it can handle data from backnend with following format

/*
[
  { _id: 'education', totalExpense: 3500 },
  { _id: 'other', totalExpense: 203748 },
  { _id: 'transport', totalExpense: 222 },
  { _id: 'entertainment', totalExpense: 11111 },
  { _id: 'utilities', totalExpense: 4815 },
  { _id: 'food', totalExpense: 13962 }
]

label should be _id and value should be totalExpense

*/

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useFilter } from '../context/FilterContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#6A5ACD'];
const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const email = localStorage.getItem('email');
  const { pieData, setPieData } = useFilter();

  // const fetchPieData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/stats/pie', { params: { email } });
  //     if (response.data.success) {
  //       setData(response.data.data);
  //     } else {
  //       console.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching pie chart data:', error);
  //   }
  // };
  // useEffect(() => {

  //   fetchPieData();
  // }, [email]);

  return (
      <div className=' rounded-lg p-6 w-full max-w-md mx-auto'>
        <div className="text-center text-xl font-bold mb-4">Category-wise Expense Distribution</div>
    <PieChart width={400} height={400} className=''>

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
