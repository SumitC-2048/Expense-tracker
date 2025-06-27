// BalanceLineChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '01 Jan', balance: 0 },
  { date: '05 Jan', balance: -32000 },
  { date: '10 Jan', balance: 28000 },
  { date: '15 Jan', balance: 4000 },
];

export default function BalanceLineChart() {
  return (
    <div className="w-[60%] h-[250px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#34d399" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
