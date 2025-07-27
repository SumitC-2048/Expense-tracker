// MonthlyBarChart.jsx
import { useState,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useFilter } from '../context/FilterContext';

export default function MonthlyBarChart() {
  const {barData} = useFilter();
  return (
    <div className="w-[60%] h-[250px]">
      <ResponsiveContainer>
        <BarChart
          data={barData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" />
          <Bar dataKey="expense" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

