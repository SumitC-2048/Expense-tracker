// BalanceLineChart.jsx
import { useState,useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

// const data = [
//   { date: '01 Jan', balance: 0 },
//   { date: '05 Jan', balance: -32000 },
//   { date: '10 Jan', balance: 28000 },
//   { date: '15 Jan', balance: 4000 },
// ];

/*
need to show this kind of data in line chart
"data": [
        {
            "balance": -202020,
            "date": "04 Jun"
        },
        {
            "balance": -4,
            "date": "10 Nov"
        },
        {
            "balance": -3704,
            "date": "22 Jun"
        },
        {
            "balance": -3645,
            "date": "23 Jun"
        },
        {
            "balance": -1000,
            "date": "28 Jun"
        }
    ]


*/

export default function BalanceLineChart() {
  const [lineData, setLineData] = useState([]);
  const email = localStorage.getItem("email");
  const fetchLineData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/stats/line", {
        params: { email }
      });
      if (response.data.success) {
        setLineData(response.data.data);
      } else {
        console.error("Failed to fetch line chart data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching line chart data:", error);
    }
  }
  useEffect(() => {
    fetchLineData();
  }, []);
  return (
    <div className="w-[60%] h-[250px]">
      <ResponsiveContainer>
        <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
