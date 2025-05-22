
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import SearchBar from './SearchBar';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Keyboard, Settings, Sun } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GlobalHeaderProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onSearch, isLoading = false }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [highContrastMode, setHighContrastMode] = useState(false);

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    } else {
      // Navigate to home page with search query
      navigate(`/?q=${encodeURIComponent(query)}`);
    }
  };
  
  const toggleHighContrast = () => {
    // In a real implementation, this would adjust the theme and save preference to localStorage
    setHighContrastMode(!highContrastMode);
    // Example: document.body.classList.toggle('high-contrast-mode');
  };

  return (
    <header className="sticky top-0 z-20 bg-motortrend-dark px-3 sm:px-4 py-2.5 sm:py-3 shadow-md">
      <div className="flex items-center max-w-[980px] mx-auto w-full gap-1.5 sm:gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" aria-label="MOTORTREND Home">
            <img 
              src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" 
              alt="MotorTrend Logo" 
              className="h-6 sm:h-7 w-auto"
            />
          </Link>
        </div>
        {/* Search bar always visible, full width on mobile */}
        <div className="flex-1 min-w-0">
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            variant="header" 
          />
        </div>
        {/* Accessibility controls */}
        {!isMobile && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleHighContrast}
                  className="text-white hover:bg-white/10 rounded-full h-8 w-8 p-0"
                  aria-label="Toggle high contrast mode"
                >
                  <Sun size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle high contrast mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {!isMobile && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white hover:bg-white/10 rounded-full h-8 w-8 p-0"
                  aria-label="Accessibility settings"
                >
                  <Keyboard size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Accessibility settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {/* Navigation - mobile hamburger or desktop links */}
        <div className="flex items-center">
          <MainNavigation />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
