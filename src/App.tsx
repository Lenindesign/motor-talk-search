
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Index from "./pages/Index";
import Search from "./pages/Search";
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
import DesignSystem from "./pages/DesignSystem";
import { SavedItemsProvider } from "./contexts/SavedItemsContext";
import { PersonalizationProvider } from "./contexts/PersonalizationContext";
import GlobalHeader from "./components/GlobalHeader";
import SubNavBar from "./components/SubNavBar";
import GlobalFooter from "./components/GlobalFooter";
import { useNavigate } from 'react-router-dom';

function AppContent() {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="w-full min-h-screen bg-motortrend-gray">
      <PersonalizationProvider>
        <SavedItemsProvider>
          <div className="flex flex-col min-h-screen">
            {/* Global Header */}
            <GlobalHeader onSearch={handleSearch} />
            
            {/* Sub Navigation */}
            <SubNavBar />
            
            {/* Main Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
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
                <Route path="/design-system" element={<DesignSystem />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            <GlobalFooter />
          </div>
        </SavedItemsProvider>
      </PersonalizationProvider>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
