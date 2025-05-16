
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Index from "./pages/Index";
import NavRoutes from "./pages/NavRoutes"; 
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Garage from "./pages/Garage";
import CarDatabase from "./pages/CarDatabase";
import CarDetails from "./pages/CarDetails";
import { SavedItemsProvider } from "./contexts/SavedItemsContext";
import { PersonalizationProvider } from "./contexts/PersonalizationContext";

function App() {
  return (
    <BrowserRouter>
      <PersonalizationProvider>
        <SavedItemsProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/cars" element={<CarDatabase />} />
            <Route path="/cars/:carId" element={<CarDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SavedItemsProvider>
      </PersonalizationProvider>
    </BrowserRouter>
  );
}

export default App;
