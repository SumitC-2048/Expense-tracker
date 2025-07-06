import axios from "axios";
import { useState, useEffect } from "react";
import PieChart from "../charts/pieChart";
import BarChart from "../charts/barChart"
import DonutChart from "../charts/donutChart"
import  LineChart  from "../charts/LineChart";
import { useFilter } from "../context/FilterContext";

const Statistics = () => {
  const { chart, setChart } = useFilter();
  return (
    <div>
      <div>
          <label id="typeFilter">type: </label>
          <select
            name="type"
            id="typeFilter"
            onChange={(e) => setChart(e.target.value)}
            value={chart}
            className="p-2 border rounded-md bg-gray-200"
            >
            {/* <option value="">All</option> */}
            <option value="pie">Pie</option>
            <option value="donut">donut</option>
            <option value="bar">bar</option>
            <option value="line">line</option>
          </select>
        </div>


      <div className="flex flex-col">
        <div className="flex justify-center items-center">
          {chart === 'pie' && <PieChart />}
          {chart === 'donut' && <DonutChart />}
          {chart === 'bar' && <BarChart />}
          {chart === 'line' && <LineChart />}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
