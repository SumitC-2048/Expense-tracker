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
    <header className="bg-green-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Left - App Title */}
      <h1 onLoad={(e) => validate} className="text-xl font-bold hover:cursor-pointer">Expense-Tracker</h1>

      {/* Right - Status Dot + Logout */}
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 rounded-full bg-green-400 shadow-md"></span>
        {
          isLoggedin ? (
          <button onClick={handleLogout} className=" text-white font-medium hover:text-gray-200 transition duration-200 hover:cursor-pointer">
            Logout
          </button>
          ) : (
              <button onClick={handleLogin} className=" text-white font-medium hover:text-gray-200 transition duration-200 hover:cursor-pointer">
              Login
            </button>
          )
        }
      </div>
    </header>
  );
};

export default Header;
