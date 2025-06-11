import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Search, Loader, Mic, X, Camera } from "lucide-react";
import { useAutocomplete, Suggestion } from "../hooks/use-autocomplete";
import MegaSearchDropdown from "./MegaSearchDropdown";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ImageSearchOverlay from './ImageSearchOverlay';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  variant?: "header" | "main";
  initialQuery?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  dropdownDirection?: 'up' | 'down';
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  variant = "main",
  initialQuery = "",
  inputRef,
  dropdownDirection
}) => {
  const [query, setQuery] = useState(initialQuery || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [voiceSearch, setVoiceSearch] = useState(false);
  const [isImageSearchOverlayOpen, setIsImageSearchOverlayOpen] = useState(false);
  
  const localInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const {
    suggestions,
    isLoading: suggestionsLoading,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  } = useAutocomplete(query);
  
  const currentInputRef = inputRef || localInputRef;
  const inputPaddingRightClass = variant === "header" ? "pr-36" : "pr-32";
  const clearButtonRightClass = variant === "header" ? "right-10" : "right-16";
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
      setShowSuggestions(false);
      // On mobile, blur the input to hide the keyboard after search
      if (isMobile && currentInputRef?.current) {
        currentInputRef.current.blur();
      }
      setTimeout(() => {
        if (currentInputRef?.current && !isMobile) {
          currentInputRef.current.focus();
        }
      }, 50);
    }
  };
  
  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    
    // Handle different suggestion types
    switch (suggestion.type) {
      case 'article':
        navigate(`/article/${suggestion.id}`);
        break;
      case 'newCar':
      case 'usedCar':
        navigate(`/car/${suggestion.id}`);
        break;
      case 'video':
        navigate(`/video/${suggestion.id}`);
        break;
      case 'photo':
        navigate(`/photo/${suggestion.id}`);
        break;
      case 'aiSuggestion':
        // For AI suggestions, perform a search with the suggestion text
        onSearch(suggestion.text);
        break;
      case 'carMake':
      case 'carModel':
      case 'popular':
      default:
        // For other types, perform a search
        onSearch(suggestion.text);
        break;
    }
    
    // On mobile, blur the input to hide the keyboard
    if (isMobile && currentInputRef?.current) {
      currentInputRef.current.blur();
    }
  };
  
  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    if (currentInputRef?.current) {
      currentInputRef.current.focus();
    }
  };
  
  const handleVoiceSearch = () => {
    setVoiceSearch(true);
    // Simulate voice search - in real app, integrate with Web Speech API
    setTimeout(() => setVoiceSearch(false), 2000);
  };
  
  const handleImageSearch = () => {
    setIsImageSearchOverlayOpen(true);
  };
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < suggestions.length) {
      e.preventDefault();
      handleSuggestionSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'Tab' && showSuggestions) {
      setShowSuggestions(false);
    } else {
      // Call the original handleKeyDown for other functionality
      handleKeyDown(e);
    }
  };
  
  // Mobile-specific input attributes
  const getMobileInputProps = () => {
    if (!isMobile) return {};
    
    return {
      inputMode: "search" as const,
      enterKeyHint: "search" as const,
      autoCapitalize: "none" as const,
      autoCorrect: "off" as const,
      spellCheck: false,
      // Add mobile-specific attributes for better UX
      'data-mobile-search': true,
    };
  };
  
  return (
    <div ref={wrapperRef} className="relative w-full">
      {variant === "header" ? (
        <form onSubmit={handleSubmit} aria-label="Header search" className="w-full px-[16px]">
          <div className="relative flex items-center px-0">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className={`text-gray-400 dark:text-gray-500 ${isFocused ? 'text-primary dark:text-primary-400' : ''}`} />
            </div>
            <input
              type="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                if (e.target.value) {
                  setShowSuggestions(true);
                  setSelectedIndex(-1);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onFocus={() => {
                setIsFocused(true);
                if (query) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                setIsFocused(false);
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              onKeyDown={handleInputKeyDown}
              className={`w-full rounded-full border-2 border-motortrend-red bg-white py-2.5 pl-10 ${inputPaddingRightClass} typography-small shadow-sm transition-standard focus:ring-2 focus:ring-motortrend-red/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-motortrend-red`}
              placeholder="Search or ask a question…"
              disabled={isLoading || voiceSearch}
              ref={currentInputRef}
              aria-autocomplete="list"
              aria-expanded={showSuggestions && suggestions.length > 0}
              aria-controls="autocomplete-suggestions"
              {...getMobileInputProps()}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              {query && !isLoading && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-fast focus-ring ${variant === 'header' ? 'mr-1' : ''}`}
                        onClick={clearSearch}
                        aria-label="Clear search"
                      >
                        <X size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear search</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {/* Hide voice and camera buttons on mobile for header variant to save space */}
              {(!isMobile || variant !== "header") && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:text-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:disabled:text-gray-500 transition-fast focus-ring"
                          onClick={handleVoiceSearch}
                          aria-label="Search by voice"
                          disabled={isLoading}
                        >
                          {voiceSearch ? <Loader size={18} className="animate-spin" /> : <Mic size={18} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Search by voice</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:text-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:disabled:text-gray-500 transition-fast focus-ring"
                          onClick={handleImageSearch}
                          aria-label="Search by image"
                          disabled={isLoading}
                        >
                          <Camera size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Search by image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                aria-label="Search"
                disabled={isLoading || !query}
              >
                {isLoading ? <Loader size={18} className="animate-spin" /> : <Search size={18} />}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {voiceSearch ? (
                <Loader size={20} className="animate-spin text-primary" />
              ) : (
                <Search size={20} className={`text-gray-400 dark:text-gray-500 ${isFocused ? 'text-primary dark:text-primary-400' : ''}`} />
              )}
            </div>
            <input
              type="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                if (e.target.value) {
                  setShowSuggestions(true);
                  setSelectedIndex(-1);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onFocus={() => {
                setIsFocused(true);
                if (query) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                setIsFocused(false);
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              onKeyDown={handleInputKeyDown}
              className={`w-full rounded-full border-2 border-motortrend-red bg-white py-3 pl-10 ${inputPaddingRightClass} typography-body shadow-sm transition-standard focus:ring-2 focus:ring-motortrend-red/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-motortrend-red`}
              placeholder="Search or ask a question…"
              disabled={isLoading || voiceSearch}
              ref={currentInputRef}
              autoFocus={!isMobile} // Don't auto-focus on mobile to prevent keyboard popup
              aria-autocomplete="list"
              aria-expanded={showSuggestions && suggestions.length > 0}
              aria-controls="autocomplete-suggestions"
              {...getMobileInputProps()}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {query && !isLoading && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        onClick={clearSearch}
                        aria-label="Clear search"
                        type="button"
                      >
                        <X size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear search</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:text-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:disabled:text-gray-500 transition-fast focus-ring"
                      onClick={handleVoiceSearch}
                      aria-label="Search by voice"
                      disabled={isLoading}
                    >
                      {voiceSearch ? <Loader size={20} className="animate-spin" /> : <Mic size={20} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search by voice</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:text-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:disabled:text-gray-500 transition-fast focus-ring"
                      onClick={handleImageSearch}
                      aria-label="Search by image"
                      disabled={isLoading}
                    >
                      <Camera size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search by image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                type="submit"
                variant={query.trim() ? "default" : "ghost"}
                size="icon"
                className={`ml-1 h-8 w-8 rounded-full p-0 transition-fast focus-ring ${
                  query.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
                disabled={isLoading || !query.trim()}
                aria-label="Submit search"
              >
                {isLoading ? <Loader size={20} className="animate-spin" /> : <Search size={20} />}
              </Button>
            </div>
          </div>
        </form>
      )}
      
      {showSuggestions && suggestions.length > 0 && (
        <MegaSearchDropdown
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          isLoading={suggestionsLoading}
          onSelect={handleSuggestionSelect}
          onMouseEnter={index => setSelectedIndex(index)}
          direction={dropdownDirection}
        />
      )}
      
      <ImageSearchOverlay 
        isOpen={isImageSearchOverlayOpen}
        onClose={() => setIsImageSearchOverlayOpen(false)}
        onImageSelected={(file: File) => {
          console.log("Image selected for search:", file.name);
          // Simulate processing and getting a search query from the file
          const simulatedQuery = `Image search: ${file.name.substring(0, 30)}${file.name.length > 30 ? '...' : ''}`;
          setQuery(simulatedQuery);
          setIsImageSearchOverlayOpen(false);
          onSearch(simulatedQuery);
        }}
        onTakePhotoClicked={() => {
          console.log("Take photo initiated for search");
          // Simulate taking a photo and getting a search query
          const simulatedQuery = "Image search: Photo taken";
          setQuery(simulatedQuery);
          setIsImageSearchOverlayOpen(false);
          onSearch(simulatedQuery);
        }}
      />
    </div>
  );
};

export default SearchBar;
