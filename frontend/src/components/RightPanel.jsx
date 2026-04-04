import React, { useState } from 'react';
import History from './History.jsx';
import Statistics from './Statistics.jsx';

const RightPanel = () => {
    const [display, setDisplay] = useState('history');
    return (
        <div className="flex flex-col w-full lg:w-2/3 min-h-0 flex-1 lg:flex-none lg:h-[min(95dvh,calc(100dvh-5.5rem))] max-lg:min-h-[calc(100dvh-13rem)] p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">

          {/* Tab Navigation */}
          <div className="mb-3 sm:mb-4 flex w-full flex-shrink-0 gap-0">
            <button 
              className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 text-xs sm:text-base font-semibold rounded-l-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                display === 'history' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setDisplay('history')}
            >
              <span className="hidden sm:inline" aria-hidden>📊 </span>History
            </button>
            <button 
              className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 text-xs sm:text-base font-semibold rounded-r-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                display === 'statistics' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => setDisplay('statistics')}
            >
              <span className="hidden sm:inline" aria-hidden>📈 </span>Statistics
            </button>
          </div>

          {/* min-h-0 + flex-1 children so inner overflow-y-auto gets a real height and can scroll all rows */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {display === "history" ? (
              <History />
            ) : (
              <Statistics />
            )}
          </div>

        </div>
    )
}

export default RightPanel;