import React from "react";
import { MegaSuggestion } from "../hooks/use-autocomplete"; 
import { Search, Newspaper, Car, CarFront, Factory, Image as ImageIcon, Video as VideoIcon } from "lucide-react"; 

interface MegaSearchDropdownProps { 
  suggestions: MegaSuggestion[]; 
  selectedIndex: number;
  isLoading: boolean;
  onSelect: (suggestion: MegaSuggestion) => void; 
  onMouseEnter: (index: number) => void;
  direction?: 'up' | 'down'; 
}

const MegaSearchDropdown: React.FC<MegaSearchDropdownProps> = ({ 
  suggestions,
  selectedIndex,
  isLoading,
  onSelect,
  onMouseEnter,
  direction = 'down' 
}) => {
  const positionClasses = direction === 'up' ? 'bottom-full mb-1' : 'top-full mt-1';

  if (isLoading) {
    return (
      <div className={`absolute left-0 right-0 ${positionClasses} w-[calc(100vw-40px)] max-w-2xl max-h-96 overflow-y-auto rounded-md bg-white shadow-lg z-50 p-2 dark:bg-gray-800 border dark:border-gray-700`}>
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin h-5 w-5 border-2 border-motortrend-red border-t-transparent rounded-full"></div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Loading suggestions...</span>
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const getIconForSuggestionType = (type: MegaSuggestion["type"]) => {
    switch (type) {
      case 'article':
        return <Newspaper size={18} className="text-gray-500 dark:text-gray-400" />;
      case 'newCar':
      case 'usedCar':
        return <Car size={18} className="text-gray-500 dark:text-gray-400" />;
      case 'carMake':
        return <Factory size={18} className="text-gray-500 dark:text-gray-400" />;
      case 'carModel':
        return <CarFront size={18} className="text-gray-500 dark:text-gray-400" />;
      case 'photo':
        return <ImageIcon size={18} className="text-gray-500 dark:text-gray-400" />;
      case 'video':
        return <VideoIcon size={18} className="text-gray-500 dark:text-gray-400" />;
      case 'popular':
      default:
        return <Search size={18} className="text-gray-500 dark:text-gray-400" />;
    }
  };

  const groupedSuggestions = suggestions.reduce((groups, suggestion) => {
    const groupKey = suggestion.type;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(suggestion);
    return groups;
  }, {} as Record<MegaSuggestion["type"], MegaSuggestion[]>);

  const typeOrder: MegaSuggestion["type"][] = ['carMake', 'carModel', 'newCar', 'usedCar', 'article', 'video', 'photo', 'popular']; 
  
  let globalSuggestionIndex = -1; 

  return (
    <div className={`absolute left-0 right-0 ${positionClasses} w-[calc(100vw-40px)] max-w-2xl max-h-[70vh] overflow-y-auto rounded-md bg-white shadow-2xl z-50 dark:bg-gray-800 border dark:border-gray-700`}>
      <ul className="py-1">
        {typeOrder.map(type => {
          const typeSuggestions = groupedSuggestions[type];
          if (!typeSuggestions || typeSuggestions.length === 0) return null;
          
          const typeLabel = (() => {
            switch (type) {
              case 'carMake': return 'Car Makes';
              case 'carModel': return 'Car Models';
              case 'newCar': return 'New Cars';
              case 'usedCar': return 'Used Cars';
              case 'article': return 'Articles';
              case 'video': return 'Videos'; 
              case 'photo': return 'Photos'; 
              case 'popular': return 'Popular Searches';
              default: return '';
            }
          })();
          
          return (
            <li key={type} className="pt-1 mb-2">
              {typeLabel && (
                <div className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10">
                  {typeLabel}
                </div>
              )}
              
              <ul className="px-2 pt-1">
                {typeSuggestions.map(suggestion => {
                  globalSuggestionIndex++;
                  const currentGlobalIndex = globalSuggestionIndex; 

                  let secondaryText = '';
                  if (suggestion.type === 'newCar' || suggestion.type === 'usedCar') {
                    secondaryText = suggestion.price || '';
                  } else if (suggestion.type === 'article') {
                    secondaryText = suggestion.category || suggestion.date || '';
                  } else if (suggestion.type === 'video') {
                    secondaryText = suggestion.duration ? `${suggestion.duration} | ${suggestion.date}` : suggestion.date || '';
                  } else if (suggestion.type === 'photo') {
                    secondaryText = suggestion.date || ''; 
                  }

                  return (
                    <li 
                      key={suggestion.id}
                      className={`rounded-md flex items-center gap-3 p-2 text-sm cursor-pointer dark:text-gray-100 ${ 
                        selectedIndex === currentGlobalIndex
                          ? "bg-motortrend-red bg-opacity-10 text-motortrend-red dark:bg-motortrend-red/20 dark:text-motortrend-red-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => onSelect(suggestion)}
                      onMouseEnter={() => onMouseEnter(currentGlobalIndex)}
                      role="option"
                      aria-selected={selectedIndex === currentGlobalIndex}
                    >
                      {suggestion.imageUrl ? (
                        <img src={suggestion.imageUrl} alt={suggestion.text} className="w-16 h-10 object-cover rounded-sm flex-shrink-0" /> 
                      ) : (
                        <div className="w-16 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-sm">
                          {getIconForSuggestionType(suggestion.type)} 
                        </div>
                      )}
                      <div className="flex-grow overflow-hidden">
                        <span className="font-medium truncate block">{suggestion.text}</span>
                        {secondaryText && <span className="text-xs text-gray-500 dark:text-gray-400 truncate block">{secondaryText}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MegaSearchDropdown; 
