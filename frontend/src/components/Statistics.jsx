import axios from "axios";
import { useState, useEffect } from "react";
import PieChart from "../charts/pieChart";
import BarChart from "../charts/barChart"
import DonutChart from "../charts/donutChart"
import  LineChart  from "../charts/LineChart";

const Statistics = () => {

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-around">
          <PieChart />
          <BarChart />
        </div>
        <div className="flex flex-row">
          <DonutChart />
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
