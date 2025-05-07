
import React from "react";
import { Suggestion } from "../hooks/use-autocomplete";
import { Search, Newspaper, Car } from "lucide-react";

interface AutocompleteSuggestionsProps {
  suggestions: Suggestion[];
  selectedIndex: number;
  isLoading: boolean;
  onSelect: (suggestion: Suggestion) => void;
  onMouseEnter: (index: number) => void;
}

const AutocompleteSuggestions: React.FC<AutocompleteSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  isLoading,
  onSelect,
  onMouseEnter
}) => {
  if (isLoading) {
    return (
      <div className="absolute left-0 right-0 top-full mt-1 max-h-60 overflow-y-auto rounded-md bg-white shadow-lg z-50 p-2">
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin h-5 w-5 border-2 border-motortrend-red border-t-transparent rounded-full"></div>
          <span className="ml-2 text-sm text-gray-500">Loading suggestions...</span>
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const getIconForSuggestionType = (type: Suggestion["type"]) => {
    switch (type) {
      case 'article':
        return <Newspaper size={16} className="text-gray-400" />;
      case 'newCar':
      case 'usedCar':
        return <Car size={16} className="text-gray-400" />;
      case 'popular':
      default:
        return <Search size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="absolute left-0 right-0 top-full mt-1 max-h-60 overflow-y-auto rounded-md bg-white shadow-lg z-50">
      <ul className="py-1">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.id}
            className={`px-4 py-2 flex items-center gap-2 text-sm cursor-pointer ${
              selectedIndex === index
                ? "bg-motortrend-red bg-opacity-10 text-motortrend-red"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(suggestion)}
            onMouseEnter={() => onMouseEnter(index)}
          >
            {getIconForSuggestionType(suggestion.type)}
            <span>{suggestion.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteSuggestions;
