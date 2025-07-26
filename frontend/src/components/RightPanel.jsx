import React from 'react';
import History from './History.jsx';
import Statistics from './statistics.jsx';
import {useEffect,useState} from 'react'
import axios from 'axios';



const RightPanel = () => {
    const [display,setDisplay] = useState('history');
    return (
        <div className="flex flex-col h-[95vh] w-full lg:w-2/3 p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">

          {/* Tab Navigation */}
          <div className='mb-4 sm:mb-6 flex w-full'>
            <button 
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold rounded-l-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                display === 'history' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setDisplay('history')}
            >
              <span className="hidden sm:inline">📊</span> History
            </button>
            <button 
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold rounded-r-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                display === 'statistics' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setDisplay('statistics')}
            >
              <span className="hidden sm:inline">📈</span> Statistics
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {display === 'history' ? <History /> : <Statistics />}
          </div>

        </div>
    )
}

export default RightPanel;