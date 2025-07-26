import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import SignIn from './pages/Signin';
import Signup from './pages/signup';
import { FilterProvider } from './context/FilterContext';

const App = () => {
  return (
    <div id="App" className="antialiased">
      <BrowserRouter>
        <Routes>
          <Route
            path="/DashBoard"
            element={
              <FilterProvider>
                <DashBoard />
              </FilterProvider>
            }
          />

          <Route path="/" element={<Navigate to="/DashBoard" replace />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
