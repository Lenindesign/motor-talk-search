import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Index from "./pages/Index";
import NavRoutes from "./pages/NavRoutes"; 
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Garage from "./pages/Garage";
import CarDatabase from "./pages/CarDatabase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/cars" element={<CarDatabase />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
