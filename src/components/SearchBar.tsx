
import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Search, Loader, Mic, X } from "lucide-react";
import { useAutocomplete, Suggestion } from "../hooks/use-autocomplete";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [isFocused, setIsFocused] = useState(false); // Track focus state for enhanced visuals
  const [voiceSearch, setVoiceSearch] = useState(false); // For simulating voice search
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

  const clearSearch = () => {
    setQuery("");
    if (currentInputRef?.current) {
      currentInputRef.current.focus();
    }
  };

  const handleVoiceSearch = () => {
    // In a real implementation, this would use the Web Speech API
    setVoiceSearch(true);
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceSearch(false);
      setQuery("electric SUVs under $50,000");
    }, 1500);
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
      <div className="w-full relative" ref={wrapperRef}>
        <form 
          onSubmit={handleSubmit}
          className="w-full"
          role="search"
          aria-label="Header search"
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
              onFocus={() => {
                setShowSuggestions(true);
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search makes, models..."
              disabled={isLoading}
              className={`w-full rounded-full bg-motortrend-dark py-2 pl-9 pr-9 text-sm text-white placeholder-gray-400 focus:outline-none transition-all ${isFocused ? 'ring-2 ring-motortrend-red' : 'ring-1 ring-gray-700'} shadow-md`}
              aria-expanded={showSuggestions}
              aria-controls="search-suggestions"
              aria-autocomplete="list"
              aria-haspopup="listbox"
            />
            {query && !isLoading && (
              <button 
                type="button"
                onClick={clearSearch}
                className="absolute right-10 text-gray-400 hover:text-white"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
            <button 
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 text-white disabled:text-gray-400"
              aria-label="Submit search"
            >
              {isLoading ? (
                <Loader size={16} className="animate-spinner" />
              ) : (
                query.trim() && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-motortrend-red">
                    <Search size={12} />
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

  // Main search bar (larger)
  return (
    <div className="mx-auto w-full relative" ref={wrapperRef}>
      <form 
        onSubmit={handleSubmit}
        className="w-full"
        role="search"
        aria-label="Main search"
      >
        <div className="relative flex items-center">
          <div className={`absolute left-4 text-white transition-opacity ${voiceSearch ? 'opacity-0' : 'opacity-100'}`}>
            <Search size={20} />
          </div>
          {voiceSearch && (
            <div className="absolute left-4 flex items-center gap-2">
              <span className="animate-pulse">
                <Mic size={20} className="text-motortrend-red" />
              </span>
              <span className="text-sm text-white">Listening...</span>
            </div>
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setShowSuggestions(true);
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search car makes, models or ask a question..."
            disabled={isLoading || voiceSearch}
            ref={currentInputRef}
            className={`w-full rounded-full bg-motortrend-dark py-3 pl-12 pr-24 text-white placeholder-gray-400 focus:outline-none transition-all ${isFocused ? 'ring-2 ring-motortrend-red shadow-lg' : 'focus:ring-2 focus:ring-motortrend-red shadow-md'}`}
            autoFocus
            aria-expanded={showSuggestions}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            aria-haspopup="listbox"
          />
          
          <div className="absolute right-4 flex items-center gap-2">
            {query && !isLoading && (
              <button 
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-white mr-2"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={handleVoiceSearch}
                    disabled={isLoading}
                    className="h-8 w-8 rounded-full p-0 text-gray-400 hover:text-white hover:bg-white/10"
                    aria-label="Voice search"
                  >
                    <Mic size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search with voice</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <button 
              type="submit"
              disabled={isLoading || !query.trim()}
              className="text-white disabled:text-gray-400"
              aria-label="Submit search"
            >
              {isLoading ? (
                <Loader size={20} className="animate-spinner" />
              ) : (
                query.trim() && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-motortrend-red">
                    <Search size={14} />
                  </div>
                )
              )}
            </button>
          </div>
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
