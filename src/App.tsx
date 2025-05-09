
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SavedItemsProvider } from "./contexts/SavedItemsContext";
import { PersonalizationProvider } from "./contexts/PersonalizationContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NavRoutes from "./pages/NavRoutes";
import Profile from "./pages/Profile";
import Garage from "./pages/Garage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PersonalizationProvider>
      <SavedItemsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/news" element={<NavRoutes path="/news" title="News" />} />
              <Route path="/reviews" element={<NavRoutes path="/reviews" title="Reviews" />} />
              <Route path="/buyers-guide" element={<NavRoutes path="/buyers-guide" title="Buyer's Guide" />} />
              <Route path="/videos" element={<NavRoutes path="/videos" title="Videos" />} />
              <Route path="/magazines" element={<NavRoutes path="/magazines" title="Magazines" />} />
              <Route path="/the-future" element={<NavRoutes path="/the-future" title="The Future" />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/garage" element={<Garage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SavedItemsProvider>
    </PersonalizationProvider>
  </QueryClientProvider>
);

export default App;
