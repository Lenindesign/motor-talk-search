
import React, { useState, FormEvent, useEffect } from "react";
import { Search, Loader } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  isInHeader?: boolean; // New prop to determine if in header
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  isLoading, 
  inputRef, 
  isInHeader = false 
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
      setQuery("");
      
      // Return focus to input after submission
      setTimeout(() => {
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }, 50);
    }
  };

  // Ensure focus is maintained whenever component updates
  useEffect(() => {
    if (inputRef?.current && !isLoading && !isInHeader) {
      inputRef.current.focus();
    }
  }, [isLoading, inputRef, isInHeader]);

  // Adjust styles based on placement
  const containerClasses = isInHeader 
    ? "w-full" 
    : "mx-auto w-full";

  const inputClasses = isInHeader
    ? "w-full rounded-full bg-motortrend-dark py-2 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-motortrend-red shadow-md text-sm"
    : "w-full rounded-full bg-motortrend-dark py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-motortrend-red shadow-lg";

  const iconSize = isInHeader ? 16 : 20;
  const iconPosition = isInHeader ? "left-3" : "left-4";
  const buttonPosition = isInHeader ? "right-3" : "right-4";
  const buttonIconSize = isInHeader ? 6 : 12;
  const buttonSize = isInHeader ? "h-6 w-6" : "h-8 w-8";

  return (
    <form 
      onSubmit={handleSubmit}
      className={containerClasses}
    >
      <div className="relative flex items-center">
        <div className={`absolute ${iconPosition} text-white`}>
          <Search size={iconSize} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything about cars"
          disabled={isLoading}
          ref={inputRef}
          className={inputClasses}
          autoFocus={!isInHeader}
        />
        <button 
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`absolute ${buttonPosition} text-white disabled:text-gray-400`}
        >
          {isLoading ? (
            <Loader size={iconSize} className="animate-spinner" />
          ) : (
            <div className={`flex ${buttonSize} items-center justify-center rounded-full bg-motortrend-red`}>
              <svg width={buttonIconSize} height={buttonIconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
