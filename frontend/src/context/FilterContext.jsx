import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const FilterContext = createContext({});

export const FilterProvider = ({children}) => {
    const [type, setType] = useState('');
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [category,setCategory] = useState('');

    const [table, setTable] = useState([]);
    const [message, setMessage] = useState('');
    const email = localStorage.getItem('email');

    const fetchTransactions = async () => {
      console.log('Inside fetch Transaction');
      
      try {
        const response = await axios.get(`http://localhost:3000/transaction/all`, {
          params: {
            type,
            category,
            email
          }
        });

        if (response.data.success) {
          setTable(response.data.transactions);
        }

        setMessage(response.data.message);
      } catch (err) {
        console.error('Internal error', err);
        setMessage('Internal server error');
      }
    };

    useEffect(() => {
      fetchTransactions();
    }, [type, category, email]); // Whenever type or email changes

    
    return (
        <FilterContext.Provider 
            value={
                {
                    email,
                    type,
                    setType,
                    category,
                    setCategory,
                    startDate,
                    setStartDate,
                    endDate,
                    setEndDate,
                    table,
                    message,
                    fetchTransactions,
                }
            }
        >
            {children}
        </FilterContext.Provider>
    )
}


export const useFilter = () => useContext(FilterContext);