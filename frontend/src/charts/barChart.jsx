import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFilter } from "../context/FilterContext";

export default function MonthlyBarChart() {
  const { barData } = useFilter();

  return (
    <div className="h-full w-full min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barData}
          margin={{ top: 8, right: 12, left: 4, bottom: 48 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" interval={0} angle={-35} textAnchor="end" height={60} tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} width={40} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="income" fill="#82ca9d" name="Income" />
          <Bar dataKey="expense" fill="#8884d8" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
