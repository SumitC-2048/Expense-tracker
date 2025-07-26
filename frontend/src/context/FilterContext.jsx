import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
  const email = localStorage.getItem("email");

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  
  const [table, setTable] = useState([]);
  const [message, setMessage] = useState("");
  
  const [chart,setChart] = useState('pie');

  // State to hold data for statistics charts
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  // Flag to indicate if a new transaction has been added
  // This will be used to re-fetch data when a new transaction is added
  // This is useful for components that need to update when a new transaction is added
  const [newTransactionFlag, setNewTransactionFlag] = useState(false);

  const fetchTransactions = async () => {
    console.log("Inside fetch Transaction");

    try {
      const response = await axios.get(
        `http://localhost:3000/transaction/all`,
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

  const fetchPieData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/stats/pie", {
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

  useEffect(() => {
    fetchPieData();
  }, [email, newTransactionFlag]);

  const fetchBarData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/stats/bar", {
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

  useEffect(() => {
    fetchBarData();
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
        barData,
        newTransactionFlag,
        setNewTransactionFlag,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
