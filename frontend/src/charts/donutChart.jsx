// ExpenseDoughnutChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Utilities', value: 700 },
  { name: 'Healthcare', value: 300 },
  { name: 'Education', value: 600 },
];

const COLORS = ['#facc15', '#38bdf8', '#a78bfa'];

export default function ExpenseDoughnutChart() {
  return (
    <div className="w-[35%] h-[250px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
