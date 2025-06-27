import React from 'react';
import History from './History.jsx';
import Statistics from './statistics.jsx';
import {useEffect,useState} from 'react'
import axios from 'axios';



const RightPanel = () => {
    const [display,setDisplay] = useState('history');
    return (
        <div className="flex flex-col h-[85vh] md:w-1/3 min-w-[65%] p-4 pt-0 bg-green-100 rounded-lg shadow-md">

          <div className='mb-5 flex h-[7%] w-[100%] m-0 p-0'>
            <button 
              className={`w-1/2 py-2 font-semibold rounded-t-md transition-colors duration-200 ${
                display === 'history' ? 'bg-green-500 text-white' : 'bg-green-300 text-black'
              }`}
              onClick={() => setDisplay('history')}
            >
              History
            </button>
            <button 
              className={`w-1/2 py-2 font-semibold rounded-t-md ${
                display === 'statistics' ? 'bg-green-500 text-white' : 'bg-green-300 text-black'
              }`}
              onClick={() => setDisplay('statistics')}
            >
              Statistics
            </button>
          </div>


            {display === 'history' ? <History /> : <Statistics />}

        </div>
    )
}

export default RightPanel;