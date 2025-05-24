
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Index from "./pages/Index";
import NavRoutes from "./pages/NavRoutes"; 
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Garage from "./pages/Garage";
import CarDatabase from "./pages/CarDatabase";
import CarResearch from "./pages/CarResearch";
import BuyersGuide from "./pages/BuyersGuide";
import News from "./pages/News";
import Videos from "./pages/Videos";
import ArticleDetail from "./pages/ArticleDetail";
import NewCarDetail from "./pages/NewCarDetail";
import UsedCarDetail from "./pages/UsedCarDetail";
import PhotoDetail from "./pages/PhotoDetail";
import VideoDetail from "./pages/VideoDetail";
import { SavedItemsProvider } from "./contexts/SavedItemsContext";
import { PersonalizationProvider } from "./contexts/PersonalizationContext";

function App() {
  return (
    <BrowserRouter>
      <PersonalizationProvider>
        <SavedItemsProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Navigate to="/garage" replace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/cars" element={<CarDatabase />} />
            <Route path="/research/:id" element={<CarResearch />} />
            <Route path="/buyers-guide" element={<BuyersGuide />} />
            <Route path="/news" element={<News />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/new-car/:id" element={<NewCarDetail />} />
            <Route path="/used-car/:id" element={<UsedCarDetail />} />
            <Route path="/photo/:id" element={<PhotoDetail />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SavedItemsProvider>
      </PersonalizationProvider>
    </BrowserRouter>
  );
}

export default App;
