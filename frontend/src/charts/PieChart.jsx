// ExpensePieChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect,useState } from 'react';
import axios from 'axios';

// const data = [
//   { name: 'Food', value: 1200 },
//   { name: 'Transport', value: 800 },
//   { name: 'Entertainment', value: 500 },
// ]; 

const COLORS = ['#60a5fa', '#34d399', '#f87171'];

export default function ExpensePieChart() {
  const [data,setData] = useState([]);
  useEffect(()=>{
    try{
      const fetchData = async () => {
        const email = localStorage.getItem('email');
        const response = await axios.get('http://localhost:3000/stats/pie',{
          params: {email}
        });
        if(response.data.success){
          setData(response.data.data);
          console.log(data);
        }else{
          console.log('Error fetching response');
        }
      }
      fetchData();
    }catch(error){
      console.log(error);
    }
  },[]);

  return (

    <div className="w-[35%] h-[250px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="totalExpense"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
