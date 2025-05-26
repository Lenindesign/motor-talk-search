
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import SearchBar from './SearchBar';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface GlobalHeaderProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onSearch, isLoading = false }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    } else {
      // Navigate to search page with query
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-20 bg-motortrend-dark w-full px-3 sm:px-4 py-2.5 sm:py-3 shadow-md">
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
        
        {/* Navigation - mobile hamburger or desktop links */}
        <div className="flex items-center">
          <MainNavigation />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
