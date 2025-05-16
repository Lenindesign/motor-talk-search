
import React from "react";
import MainNavigation from "../MainNavigation";
import SearchBar from "../SearchBar";
import { useIsMobile } from "../../hooks/use-mobile";

interface SearchLayoutProps {
  children: React.ReactNode;
  onSearch: (query: string) => void;
  isSearching: boolean;
  searchBarRef: React.RefObject<HTMLInputElement>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const SearchLayout: React.FC<SearchLayoutProps> = ({
  children,
  onSearch,
  isSearching,
  searchBarRef,
  chatContainerRef
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col bg-motortrend-gray">
      <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-[980px] mx-auto w-full">
          <div className="flex items-center">
            {isMobile && <MainNavigation />}
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" 
                alt="MotorTrend Logo" 
                className="h-7 w-auto"
              />
            </div>
            <div className="hidden sm:flex ml-6">
              <MainNavigation />
            </div>
          </div>
          <div className="hidden sm:block ml-4">
            <SearchBar 
              onSearch={onSearch} 
              isLoading={isSearching}
              variant="header" 
            />
          </div>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col">
        <div className="relative flex flex-col h-full">
          <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
            <div className="max-w-[980px] mx-auto w-full px-4 py-4 pb-32">
              {children}
            </div>
          </div>
          
          <div className="sticky bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-motortrend-gray to-transparent p-4 pb-6">
            <div className="max-w-[980px] mx-auto w-full">
              <SearchBar 
                onSearch={onSearch} 
                isLoading={isSearching}
                inputRef={searchBarRef} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchLayout;
