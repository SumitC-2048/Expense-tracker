import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const FilterContext = createContext({});
const BACKEND_URL = "http://localhost:3000";

export const FilterProvider = ({ children }) => {
  const email = localStorage.getItem("email");

  // States for filter criteria
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  
  const [table, setTable] = useState([]);
  const [message, setMessage] = useState("");
  
  
  // Flag to indicate if a new transaction has been added
  // This will be used to re-fetch data when a new transaction is added
  // This is useful for components that need to update when a new transaction is added
  const [newTransactionFlag, setNewTransactionFlag] = useState(false);

  const fetchTransactions = async () => {
    console.log("Inside fetch Transaction");

    try {
      const response = await axios.get(
        `${BACKEND_URL}/transaction/all`,
        {
          params: {
            type,
            category,
            email,
            startDate,
            endDate,
            minAmount,
            maxAmount,
          },
        }
      );

      if (response.data.success) {
        setTable(response.data.transactions);
      }

      setMessage(response.data.message);
    } catch (err) {
      console.error("Internal error", err);
      setMessage("Internal server error");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [type, category, startDate, endDate, minAmount, maxAmount, email, newTransactionFlag]); // Whenever filters or email changes

  // State to hold data for statistics charts
  const [chart,setChart] = useState('pie');
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [DonutData, setDonutData] = useState([]);
  const [LineData, setLineData] = useState([]);
  // Fetch pie chart data
  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/stats/pie`, {
          params: { email },
        });
        if (response.data.success) {
          setPieData(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };
    fetchPieData();
  }, [email, newTransactionFlag]);

  // Fetch donut chart data
  useEffect(() => {
    const fetchDonutData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/stats/donut`, { params: { email } });
        if (response.data.success) {
          setDonutData(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching donut chart data:', error);
      }
    };

    fetchDonutData();
  }, [email, newTransactionFlag]);

  // Fetch bar chart data
  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/stats/bar`, {
          params: { email },
        });
        if (response.data.success) {
          setBarData(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarData();
  }, [email, newTransactionFlag]);


  // Fetch line chart data
  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/stats/line`, {
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
    fetchLineData();
  }, [email, newTransactionFlag]);


  return (
    <FilterContext.Provider
      value={{
        email,
        type,
        setType,
        category,
        setCategory,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        minAmount,
        setMinAmount,
        maxAmount,
        setMaxAmount,
        frequency,
        setFrequency,
        table,
        message,
        chart,
        setChart,
        pieData,
        DonutData,
        barData,
        LineData,
        newTransactionFlag,
        setNewTransactionFlag,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
