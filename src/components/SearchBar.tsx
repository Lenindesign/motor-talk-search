import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Search, Loader, Mic, X, Camera } from "lucide-react";
import { useAutocomplete, MegaSuggestion } from "../hooks/use-autocomplete";
import MegaSearchDropdown from "./MegaSearchDropdown";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ImageSearchOverlay from './ImageSearchOverlay';
import { useNavigate } from 'react-router-dom';

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
  const [isFocused, setIsFocused] = useState(false); 
  const [voiceSearch, setVoiceSearch] = useState(false); 
  const [isImageSearchOverlayOpen, setIsImageSearchOverlayOpen] = useState(false);
  const localInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
      
      setTimeout(() => {
        if (currentInputRef?.current) {
          currentInputRef.current.focus();
        }
      }, 50);
    }
  };

  const handleSuggestionSelect = (suggestion: MegaSuggestion) => {
    let path = '';
    switch (suggestion.type) {
      case 'newCar':
        path = `/new-car/${suggestion.id.replace('newcar-', '')}`;
        break;
      case 'usedCar':
        path = `/used-car/${suggestion.id.replace('usedcar-', '')}`;
        break;
      case 'article':
        path = `/article/${suggestion.id.replace('article-', '')}`;
        break;
      case 'video':
        path = `/video/${suggestion.id.replace('video-', '')}`;
        break;
      case 'photo':
        path = `/photo/${suggestion.id.replace('photo-', '')}`;
        break;
      case 'carMake':
      case 'carModel':
      case 'popular':
      default:
        path = `/search?q=${encodeURIComponent(suggestion.text)}`;
        break;
    }
    navigate(path);
    setQuery(""); 
    setShowSuggestions(false);
    if (currentInputRef?.current) {
      currentInputRef.current.blur(); 
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (currentInputRef?.current) {
      currentInputRef.current.focus();
    }
  };

  const handleVoiceSearch = () => {
    setVoiceSearch(true);
    setTimeout(() => {
      setVoiceSearch(false);
      setQuery("electric SUVs under $50,000");
    }, 1500);
  };

  const handleImageSearch = () => {
    console.log("Image search initiated");
    setIsImageSearchOverlayOpen(true);
  };

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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e);
    
    if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < suggestions.length) {
      e.preventDefault();
      handleSuggestionSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'Tab' && showSuggestions) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (currentInputRef?.current && !isLoading && variant === "main") {
    }
  }, [isLoading, currentInputRef, variant]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {variant === "header" ? (
        <form onSubmit={handleSubmit} className="w-full" aria-label="Header search">
          <div className="relative flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className={`text-gray-400 dark:text-gray-500 ${isFocused ? 'text-primary dark:text-primary-400' : ''}`} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
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
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleInputKeyDown}
              className={`w-full rounded-md border bg-white py-2.5 pl-10 ${inputPaddingRightClass} text-sm shadow-sm transition-all duration-300 ease-in-out focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 ${isFocused ? 'ring-2 ring-primary-500/50 border-primary-500 dark:border-primary-500' : 'border-gray-300 dark:border-gray-600'}`}
              placeholder="Search..."
              disabled={isLoading || voiceSearch} 
              ref={currentInputRef}
              aria-autocomplete="list"
              aria-expanded={showSuggestions && suggestions.length > 0}
              aria-controls="autocomplete-suggestions"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mr-1 h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      onClick={handleVoiceSearch}
                      aria-label="Search by voice"
                      disabled={isLoading || voiceSearch}
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
                      className="mr-1 h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      onClick={handleImageSearch}
                      aria-label="Search by image"
                      disabled={isLoading || voiceSearch}
                    >
                      <Camera size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search by image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {query && !isLoading && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${variant === 'header' ? 'mr-1' : ''}`}
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
        <form onSubmit={handleSubmit} className="w-full" aria-label="Main search">
          <div className="relative flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {voiceSearch ? (
                <Loader size={20} className="animate-spin text-primary" />
              ) : (
                <Search size={20} className={`text-gray-400 dark:text-gray-500 ${isFocused ? 'text-primary dark:text-primary-400' : ''}`} />
              )}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
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
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleInputKeyDown}
              className={`w-full rounded-md border bg-white py-3 pl-12 ${inputPaddingRightClass} text-base shadow-sm transition-all duration-300 ease-in-out focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 ${isFocused ? 'ring-2 ring-primary-500/50 border-primary-500 dark:border-primary-500' : 'border-gray-300 dark:border-gray-600'}`}
              placeholder="Search for cars, news, reviews..."
              disabled={isLoading || voiceSearch}
              ref={currentInputRef}
              autoFocus
              aria-autocomplete="list"
              aria-expanded={showSuggestions && suggestions.length > 0}
              aria-controls="autocomplete-suggestions"
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
                      className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700 disabled:text-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:disabled:text-gray-500"
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
              <Button
                type="submit"
                variant={query.trim() ? "default" : "ghost"} 
                size="icon"
                className={`ml-1 h-8 w-8 rounded-full p-0 ${query.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'}`}
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
          onMouseEnter={(index) => setSelectedIndex(index)}
        />
      )}
      {isImageSearchOverlayOpen && (
        <ImageSearchOverlay 
          isOpen={isImageSearchOverlayOpen} 
          onClose={() => setIsImageSearchOverlayOpen(false)} 
          onImageSelected={(file: File) => {
            console.log("Image selected for search:", file.name);
            // Simulate processing and getting a search query from the file
            const simulatedQuery = `Image search: ${file.name.substring(0, 30)}${file.name.length > 30 ? '...' : ''}`;
            setQuery(simulatedQuery);
            setIsImageSearchOverlayOpen(false);
            onSearch(simulatedQuery); // Call the main onSearch prop of SearchBar
          }}
          onTakePhotoClicked={() => {
            console.log("Take photo initiated for search");
            // Simulate taking a photo and getting a search query
            const simulatedQuery = "Image search: Photo taken";
            setQuery(simulatedQuery);
            setIsImageSearchOverlayOpen(false);
            onSearch(simulatedQuery); // Call the main onSearch prop of SearchBar
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
