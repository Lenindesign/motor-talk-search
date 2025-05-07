
import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Search, Loader } from "lucide-react";
import { useAutocomplete, Suggestion } from "../hooks/use-autocomplete";
import AutocompleteSuggestions from "./AutocompleteSuggestions";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  variant?: "header" | "main";
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  isLoading, 
  inputRef,
  variant = "main" 
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const localInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { 
    suggestions, 
    isLoading: suggestionsLoading, 
    selectedIndex, 
    setSelectedIndex,
    handleKeyDown
  } = useAutocomplete(query);

  const currentInputRef = inputRef || localInputRef;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
      setQuery("");
      setShowSuggestions(false);
      
      // Return focus to input after submission
      setTimeout(() => {
        if (currentInputRef?.current) {
          currentInputRef.current.focus();
        }
      }, 50);
    }
  };

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    onSearch(suggestion.text);
    setQuery("");
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard events for navigation and selection
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e);
    
    if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < suggestions.length) {
      e.preventDefault();
      handleSuggestionSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Ensure focus is maintained whenever component updates
  useEffect(() => {
    if (currentInputRef?.current && !isLoading && variant === "main") {
      currentInputRef.current.focus();
    }
  }, [isLoading, currentInputRef, variant]);

  if (variant === "header") {
    return (
      <div className="w-full max-w-xs relative" ref={wrapperRef}>
        <form 
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="relative flex items-center">
            <div className="absolute left-3 text-white">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search makes, models..."
              disabled={isLoading}
              className="w-full rounded-full bg-motortrend-dark py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-motortrend-red shadow-md"
            />
            <button 
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 text-white disabled:text-gray-400"
            >
              {isLoading ? (
                <Loader size={16} className="animate-spinner" />
              ) : (
                query.trim() && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-motortrend-red">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )
              )}
            </button>
          </div>
        </form>

        {showSuggestions && (
          <AutocompleteSuggestions
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            isLoading={suggestionsLoading}
            onSelect={handleSuggestionSelect}
            onMouseEnter={(index) => setSelectedIndex(index)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full relative" ref={wrapperRef}>
      <form 
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="relative flex items-center">
          <div className="absolute left-4 text-white">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search car makes, models or ask a question..."
            disabled={isLoading}
            ref={currentInputRef}
            className="w-full rounded-full bg-motortrend-dark py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-motortrend-red shadow-lg"
            autoFocus
          />
          <button 
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-4 text-white disabled:text-gray-400"
          >
            {isLoading ? (
              <Loader size={20} className="animate-spinner" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-motortrend-red">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </button>
        </div>
      </form>

      {showSuggestions && (
        <AutocompleteSuggestions
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          isLoading={suggestionsLoading}
          onSelect={handleSuggestionSelect}
          onMouseEnter={(index) => setSelectedIndex(index)}
        />
      )}
    </div>
  );
};

export default SearchBar;
