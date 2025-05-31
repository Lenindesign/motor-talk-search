
import React from "react";

interface SearchSuggestionProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  "What is the best EV?",
  "Show me photos",
  "Used cars",
  "Videos",
  "New cars",
];

const SearchSuggestions: React.FC<SearchSuggestionProps> = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 animate-fade-in transition-standard">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSuggestionClick(suggestion)}
          className="rounded-full border border-gray-400 bg-transparent px-4 py-2 typography-body-sm font-medium text-gray-800 hover:bg-motortrend-dark hover:text-white transition-standard focus-ring"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SearchSuggestions;
