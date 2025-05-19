
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import SearchBar from './SearchBar';

interface GlobalHeaderProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onSearch, isLoading = false }) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (onSearch) {
      // Pass the query to parent component for real-time search
      onSearch(query);
    } else {
      // Only navigate on explicit submission or for longer queries
      if (query.trim().length > 2) {
        navigate(`/?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-motortrend-dark px-4 py-3 shadow-md">
      <div className="flex items-center max-w-[980px] mx-auto w-full gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img 
              src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" 
              alt="MotorTrend Logo" 
              className="h-7 w-auto"
            />
          </Link>
        </div>
        {/* Search bar always visible, full width on mobile */}
        <div className="flex-1 min-w-0 ml-2">
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            variant="header" 
          />
        </div>
        {/* Hamburger menu always visible on mobile, right aligned */}
        <div className="flex sm:hidden ml-2 order-last">
          <MainNavigation />
        </div>
        {/* Main navigation visible on desktop */}
        <div className="hidden sm:flex ml-4">
          <MainNavigation />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader; 
