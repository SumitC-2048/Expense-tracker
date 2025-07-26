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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#6A5ACD'];
const DonutChartComponent = () => {
  const [data, setData] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/stats/donut', { params: { email } });
        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching donut chart data:', error);
      }
    };

    fetchData();
  }, [email]);

  return (
          <div className=' rounded-lg p-6 w-full max-w-md mx-auto'>
        <div className="text-center text-xl font-bold mb-4">Category-wise Expense Distribution</div>

    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="totalExpense"
        nameKey="_id"
        cx="50%"
        cy="50%"
        outerRadius={150}
        innerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </div>
  );
}

export default DonutChartComponent;
