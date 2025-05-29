
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SavedItemsProvider } from "./contexts/SavedItemsContext";
import { AuthProvider } from "./contexts/AuthContext";
import { PersonalizationProvider } from "./contexts/PersonalizationContext";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Search from "./pages/Search";
import ArticleDetail from "./pages/ArticleDetail";
import VideoDetail from "./pages/VideoDetail";
import PhotoDetail from "./pages/PhotoDetail";
import NewCarDetail from "./pages/NewCarDetail";
import UsedCarDetail from "./pages/UsedCarDetail";
import BuyersGuide from "./pages/BuyersGuide";
import News from "./pages/News";
import Videos from "./pages/Videos";
import Profile from "./pages/Profile";
import Garage from "./pages/Garage";
import CarResearch from "./pages/CarResearch";
import CarDatabase from "./pages/CarDatabase";
import Dashboard from "./pages/Dashboard";
import DesignSystem from "./pages/DesignSystem";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <SavedItemsProvider>
              <PersonalizationProvider>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Index />} />
                    <Route path="search" element={<Search />} />
                    <Route path="news" element={<News />} />
                    <Route path="videos" element={<Videos />} />
                    <Route path="buyers-guide" element={<BuyersGuide />} />
                    <Route path="car-database" element={<CarDatabase />} />
                    <Route path="design-system" element={<DesignSystem />} />
                    <Route path="articles/:id" element={<ArticleDetail />} />
                    <Route path="videos/:id" element={<VideoDetail />} />
                    <Route path="photos/:id" element={<PhotoDetail />} />
                    <Route path="cars/new/:id" element={<NewCarDetail />} />
                    <Route path="cars/used/:id" element={<UsedCarDetail />} />
                    <Route path="cars/research/:id" element={<CarResearch />} />
                    
                    {/* Protected Routes */}
                    <Route 
                      path="profile" 
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="garage" 
                      element={
                        <ProtectedRoute>
                          <Garage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </PersonalizationProvider>
            </SavedItemsProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
