import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';


const Header = () => {
    const navigate = useNavigate();
    const isLoggedin = !!localStorage.getItem('email');

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate('/signin');
    }
    const handleLogin = () => {
        navigate('/signin');
    }

  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
      {/* Left - App Title */}
        <h1 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
          💰 Expense Tracker
        </h1>

        {/* Right - Status + Auth Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500 shadow-sm"></span>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        {
          isLoggedin ? (
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
            Logout
          </button>
          ) : (
              <button 
                onClick={handleLogin} 
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
              Login
            </button>
          )
        }
        </div>
      </div>
    </header>
  );
};

export default Header;
