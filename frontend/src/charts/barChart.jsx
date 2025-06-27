// MonthlyBarChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', income: 5000, expense: 3000 },
  { month: 'Feb', income: 4500, expense: 3500 },
  { month: 'Mar', income: 6000, expense: 4000 },
  { month: 'Mar', income: 6000, expense: 4000 },
  { month: 'Mar', income: 6000, expense: 4000 },
];

export default function MonthlyBarChart() {
  return (
    <div className="w-[60%] h-[250px]">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4ade80" />
          <Bar dataKey="expense" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

