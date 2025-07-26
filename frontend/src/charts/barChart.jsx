// MonthlyBarChart.jsx
import { useState,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useFilter } from '../context/FilterContext';
// const data = [
//   { month: 'Jan', income: 5000, expense: 3000 },
//   { month: 'Feb', income: 4500, expense: 3500 },
//   { month: 'Mar', income: 6000, expense: 4000 },
//   { month: 'Mar', income: 6000, expense: 4000 },
//   { month: 'Mar', income: 6000, expense: 4000 },
// ];

/*
barData: 
"data": [
        {
            "income": 77777,
            "expense": 0,
            "monthNumber": 9,
            "year": 2024
        },
        {
            "income": 0,
            "expense": 233333,
            "monthNumber": 12,
            "year": 2024
        },
        {
            "income": 2011,
            "expense": 0,
            "monthNumber": 1,
            "year": 2025
        },
        {
            "income": 500,
            "expense": 210869,
            "monthNumber": 6,
            "year": 2025
        }
    ]
*/


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

