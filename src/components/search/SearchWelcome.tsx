
import React from "react";
import SearchSuggestions from "../SearchSuggestions";

interface SearchWelcomeProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SearchWelcome: React.FC<SearchWelcomeProps> = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-6 py-20">
      <h1 className="text-3xl font-bold text-motortrend-dark">
        Welcome to MOTORTREND Search
      </h1>
      <p className="max-w-md text-center text-gray-500">
        Ask me anything about cars or search for automotive content
      </p>
      <SearchSuggestions onSuggestionClick={onSuggestionClick} />
    </div>
  );
};

export default SearchWelcome;
