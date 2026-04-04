import PieChart from "../charts/PieChart";
import BarChart from "../charts/barChart";
import DonutChart from "../charts/donutChart";
import LineChart from "../charts/LineChart";
import { useFilter } from "../context/FilterContext";

const chartDescriptions = {
  pie: "Shows the percentage of expenses for each category.",
  donut: "Shows the total expense for each category.",
  bar: "Shows expense and income for each month of the year.",
  line: "Shows the monthly balance trend",
};

const Statistics = () => {
  const { chart, setChart } = useFilter();
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 sm:gap-4">
      {/* Chart type selector — fixed; does not scroll */}
      <div className="flex-shrink-0">
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-md sm:p-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
            <button
              type="button"
              onClick={() => setChart("pie")}
              className={`rounded-lg px-3 py-2.5 text-left text-xs font-medium leading-snug transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-3 sm:py-3 sm:text-sm ${
                chart === "pie"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Category-wise expense %
            </button>
            <button
              type="button"
              onClick={() => setChart("donut")}
              className={`rounded-lg px-3 py-2.5 text-left text-xs font-medium leading-snug transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-3 sm:py-3 sm:text-sm ${
                chart === "donut"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Total expense by category
            </button>
            <button
              type="button"
              onClick={() => setChart("bar")}
              className={`rounded-lg px-3 py-2.5 text-left text-xs font-medium leading-snug transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-3 sm:py-3 sm:text-sm ${
                chart === "bar"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly income vs expense
            </button>
            <button
              type="button"
              onClick={() => setChart("line")}
              className={`rounded-lg px-3 py-2.5 text-left text-xs font-medium leading-snug transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-3 sm:py-3 sm:text-sm ${
                chart === "line"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly balance trend
            </button>
          </div>
        </div>
      </div>

      {/* Chart + caption scroll independently */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain rounded-lg border border-gray-100 bg-white shadow-md">
        <div className="flex min-h-[min(280px,calc(100dvh-20rem))] flex-col p-3 sm:min-h-[320px] sm:p-5 lg:min-h-[360px]">
          <div className="flex w-full flex-1 items-center justify-center">
            <div className="h-[min(300px,calc(100vw-2.5rem))] w-full max-w-4xl sm:h-[380px] lg:h-[420px]">
              {chart === "pie" && <PieChart />}
              {chart === "donut" && <DonutChart />}
              {chart === "bar" && <BarChart />}
              {chart === "line" && <LineChart />}
            </div>
          </div>
          <p className="mt-3 flex-shrink-0 px-1 text-center text-xs text-gray-600 sm:text-sm">
            {chartDescriptions[chart]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
