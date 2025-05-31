
import React from "react";
import { Suggestion } from "../hooks/use-autocomplete";
import { Search, Newspaper, Car, CarFront, Factory } from "lucide-react";

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
      case 'carMake':
        return <Factory size={16} className="text-gray-400" />;
      case 'carModel':
        return <CarFront size={16} className="text-gray-400" />;
      case 'popular':
      default:
        return <Search size={16} className="text-gray-400" />;
    }
  };

  // Group suggestions by type for better organization
  const groupedSuggestions = suggestions.reduce((groups: Record<Suggestion["type"], Suggestion[]>, suggestion) => {
    const groupKey = suggestion.type;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(suggestion);
    return groups;
  }, {} as Record<Suggestion["type"], Suggestion[]>);

  // Order of types to display
  const typeOrder: Suggestion["type"][] = ['carMake', 'carModel', 'newCar', 'usedCar', 'article', 'popular'];
  
  // Calculate index offset for flattened suggestions
  let currentIndex = -1;
  
  return (
    <div className="absolute left-0 right-0 top-full mt-1 max-h-60 overflow-y-auto rounded-md bg-white shadow-lg z-50 max-w-[632px] w-full">
      <ul className="py-1">
        {typeOrder.map(type => {
          const typeSuggestions = groupedSuggestions[type] || [];
          
          // Only show headers if there are suggestions of this type
          if (typeSuggestions.length === 0) return null;
          
          const typeLabel = (() => {
            switch (type) {
              case 'carMake': return 'Car Makes';
              case 'carModel': return 'Car Models';
              case 'newCar': return 'New Cars';
              case 'usedCar': return 'Used Cars';
              case 'article': return 'Articles';
              case 'popular': return 'Popular Searches';
              default: return '';
            }
          })();
          
          return (
            <li key={type} className="pt-1">
              {typeLabel && (
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
                  {typeLabel}
                </div>
              )}
              
              {typeSuggestions.map(suggestion => {
                currentIndex++;
                return (
                  <div
                    key={suggestion.id}
                    className={`px-4 py-2 flex items-center gap-2 text-sm cursor-pointer ${
                      selectedIndex === currentIndex
                        ? "bg-motortrend-red bg-opacity-10 text-motortrend-red"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => onSelect(suggestion)}
                    onMouseEnter={() => onMouseEnter(currentIndex)}
                  >
                    {suggestion.imageUrl ? (
                      <img
                        src={suggestion.imageUrl}
                        alt={suggestion.text}
                        className="w-8 h-8 rounded object-cover border border-gray-200 bg-gray-50"
                        style={{ minWidth: 32, minHeight: 32 }}
                        onError={e => { e.currentTarget.src = '/fallback-car.png'; }}
                      />
                    ) : (
                      getIconForSuggestionType(suggestion.type)
                    )}
                    <span>{suggestion.text}</span>
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AutocompleteSuggestions;
