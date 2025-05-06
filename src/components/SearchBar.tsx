
import React, { useState, FormEvent } from "react";
import { Search, Loader } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, inputRef }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="mx-auto w-full"
    >
      <div className="relative flex items-center">
        <div className="absolute left-4 text-white">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything about cars"
          disabled={isLoading}
          ref={inputRef}
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
  );
};

export default SearchBar;
