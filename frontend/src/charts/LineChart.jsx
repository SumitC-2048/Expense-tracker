// BalanceLineChart.jsx
import { useState,useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useFilter } from '../context/FilterContext';

export default function BalanceLineChart() {
  const {LineData} = useFilter();

  return (
    <div className="w-[75%] h-[400px] rounded-lg p-6 mx-auto">
      <ResponsiveContainer>
        <LineChart data={LineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
