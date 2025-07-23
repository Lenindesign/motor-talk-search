import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import the Index page eagerly as it's the landing page
import Index from "./pages/Index";

// Lazy load all other pages to improve initial load time
const Search = lazy(() => import("./pages/Search"));
const NavRoutes = lazy(() => import("./pages/NavRoutes"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));
const Garage = lazy(() => import("./pages/Garage"));
const CarDatabase = lazy(() => import("./pages/CarDatabase"));
const CarResearch = lazy(() => import("./pages/CarResearch"));
const BuyersGuide = lazy(() => import("./pages/BuyersGuide"));
const News = lazy(() => import("./pages/News"));
const Videos = lazy(() => import("./pages/Videos"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const NewCarDetail = lazy(() => import("./pages/NewCarDetail"));
const UsedCarDetail = lazy(() => import("./pages/UsedCarDetail"));
const PhotoDetail = lazy(() => import('./pages/PhotoDetail'));
const VideoDetail = lazy(() => import('./pages/VideoDetail'));
const Shorts = lazy(() => import('./pages/Shorts'));
const DesignSystem = lazy(() => import('./pages/DesignSystem'));
const TestCarCard = lazy(() => import("./components/TestCarCard"));
const TestCard = lazy(() => import("./pages/TestCard"));
const BestSUVs = lazy(() => import("./pages/BestSUVs"));
const CarConnect = lazy(() => import("./pages/CarConnect/index"));
const Chat = lazy(() => import("./pages/Chat"));
import { SavedItemsProvider } from "./contexts/SavedItemsContext";
import { SimplePersonalizationProvider } from "./contexts/SimplePersonalizationContext";
import { CarProvider } from "./contexts/CarContext";
import MainLayout from "./components/MainLayout";
import GlobalFooter from "./components/GlobalFooter";
import { Toaster } from "@/components/ui/toaster";
function App() {
  return (
    <SimplePersonalizationProvider>
      <div>
        <h1>Motor Talk Search</h1>
        <p>Testing simple context provider...</p>
      </div>
    </SimplePersonalizationProvider>
  );
}

export default App;