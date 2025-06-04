
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
const CarConnect = lazy(() => import("./pages/CarConnect"));
const Chat = lazy(() => import("./pages/Chat"));
import { SavedItemsProvider } from "./contexts/SavedItemsContext";
import { PersonalizationProvider } from "./contexts/PersonalizationContext";
import { CarProvider } from "./contexts/CarContext";
import MainLayout from "./components/MainLayout";
import GlobalFooter from "./components/GlobalFooter";

function App() {
  return <div className="w-full min-h-screen bg-motortrend-gray">
      <BrowserRouter>
        <PersonalizationProvider>
          <CarProvider>
            <SavedItemsProvider>
             <MainLayout>
                {/* Loading fallback for lazy-loaded components */}
                <Suspense fallback={
                  <div className="flex items-center justify-center w-full h-screen bg-background">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-10 h-10 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                      <p className="text-sm text-muted-foreground">Loading...</p>
                    </div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/dashboard" element={<Navigate to="/garage" replace />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/garage" element={<Garage />} />
                    <Route path="/cars" element={<CarDatabase />} />
                    <Route path="/research/:id" element={<CarResearch />} />
                    <Route path="/buyers-guide" element={<BuyersGuide />} />
                    <Route path="/best-suvs" element={<BestSUVs />} />
                    <Route path="/find-best-price/:carId" element={<CarConnect />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                    <Route path="/new-car/:id" element={<NewCarDetail />} />
                    <Route path="/used-car/:id" element={<UsedCarDetail />} />
                    <Route path="/photo/:id" element={<PhotoDetail />} />
                    <Route path="/video/:id" element={<VideoDetail />} />
                    <Route path="/shorts/:id" element={<Shorts />} />
                    <Route path="/design-system" element={<DesignSystem />} />
                    <Route path="/test-car-card" element={<TestCarCard />} />
                    <Route path="/car-connect" element={<CarConnect />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </MainLayout>
              <GlobalFooter />
            </SavedItemsProvider>
          </CarProvider>
        </PersonalizationProvider>
      </BrowserRouter>
    </div>;
}

export default App;
