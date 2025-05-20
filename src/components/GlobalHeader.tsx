
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import SearchBar from './SearchBar';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetTrigger
} from './ui/sheet';

interface GlobalHeaderProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onSearch, isLoading = false }) => {
  const navigate = useNavigate();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    } else {
      // Navigate to home page with search query
      navigate(`/?q=${encodeURIComponent(query)}`);
    }
    setShowMobileSearch(false);
  };

  return (
    <header className="sticky top-0 z-20 bg-motortrend-dark px-4 py-3 shadow-md">
      <div className="flex items-center max-w-[1200px] mx-auto w-full gap-2 sm:gap-4">
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
        
        {/* Desktop Search bar */}
        <div className="hidden md:flex flex-1 min-w-0 ml-2">
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            variant="header" 
          />
        </div>
        
        {/* Mobile search trigger */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white hover:bg-white/20" 
          onClick={() => setShowMobileSearch(true)}
        >
          <Search size={20} />
        </Button>
        
        {/* Main navigation visible on desktop */}
        <div className="hidden md:flex ml-4">
          <MainNavigation />
        </div>
        
        {/* Hamburger menu always visible on mobile, right aligned */}
        <div className="flex md:hidden ml-auto">
          <MainNavigation />
        </div>
      </div>
      
      {/* Mobile search sheet */}
      <Sheet open={showMobileSearch} onOpenChange={setShowMobileSearch}>
        <SheetContent side="top" className="pt-16 pb-4 px-4">
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            variant="fullWidth" 
            autoFocus
          />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default GlobalHeader;
