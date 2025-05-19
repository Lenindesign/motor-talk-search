
import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  variant?: 'header' | 'fullWidth' | 'default';
  autoFocus?: boolean;
  initialQuery?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
  placeholder = 'Search cars, reviews, news...',
  variant = 'default',
  autoFocus = false,
  initialQuery = '',
  inputRef
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  
  useEffect(() => {
    if (autoFocus && !inputRef) {
      const timer = setTimeout(() => {
        const inputElement = document.getElementById('search-input');
        if (inputElement) {
          inputElement.focus();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [autoFocus, inputRef]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim().length > 1) {
        onSearch(searchQuery);
      }
    }, 500),
    [onSearch]
  );
  
  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };
  
  let containerClasses = 'flex items-center relative';
  let inputClasses = 'w-full text-sm transition-colors focus-visible:outline-none';
  
  switch (variant) {
    case 'header':
      containerClasses += ' bg-white/10 hover:bg-white/15 rounded-md';
      inputClasses += ' bg-transparent text-white placeholder:text-white/60 pl-10 pr-3 py-1.5';
      break;
    case 'fullWidth':
      containerClasses += ' bg-white rounded-md w-full border shadow-sm';
      inputClasses += ' bg-transparent text-gray-800 pl-10 pr-3 py-2 rounded-md';
      break;
    default:
      containerClasses += ' bg-white rounded-md border shadow-sm';
      inputClasses += ' bg-transparent text-gray-800 pl-10 pr-3 py-2 rounded-md';
  }
  
  if (focused) {
    containerClasses += ' ring-2 ring-motortrend-red/30';
  }

  return (
    <form onSubmit={handleSubmit} className={containerClasses}>
      <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${variant === 'header' ? 'text-white' : 'text-gray-500'}`}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>
      <input
        id="search-input"
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        autoFocus={autoFocus}
      />
      {variant !== 'header' && query && (
        <Button 
          type="submit" 
          size="sm" 
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 bg-motortrend-red hover:bg-motortrend-red/90 text-white"
        >
          Search
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
