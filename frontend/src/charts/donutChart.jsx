import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useFilter } from "../context/FilterContext";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6347",
  "#6A5ACD",
  "#8A2BE2",
];

const DonutChartComponent = () => {
  const { DonutData } = useFilter();

  return (
    <div className="h-full w-full min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Pie
            data={DonutData}
            dataKey="totalExpense"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius="72%"
            innerRadius="42%"
            fill="#8884d8"
            label
          >
            {DonutData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChartComponent;
