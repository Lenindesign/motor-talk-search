import React from "react";
import { Suggestion } from "../hooks/use-autocomplete"; 
import { Search, Newspaper, Car, CarFront, Factory, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface MegaSearchDropdownProps { 
  suggestions: Suggestion[]; 
  selectedIndex: number;
  isLoading: boolean;
  onSelect: (suggestion: Suggestion) => void; 
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
      <div className={`absolute left-0 right-0 ${positionClasses} w-[calc(100vw-40px)] max-w-2xl max-h-96 overflow-y-auto rounded-md bg-white shadow-lg z-50 p-4 dark:bg-gray-800 border dark:border-gray-700 transition-standard`}>
        <div className="space-y-3">
          {/* Loading state for popular searches */}
          <div className="mb-4">
            <Skeleton variant="text" width="30%" className="mb-2 typography-title" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton variant="circular" width={18} height={18} />
                  <Skeleton variant="text" width={`${Math.floor(Math.random() * 30) + 50}%`} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Loading state for articles */}
          <div className="mb-4">
            <Skeleton variant="text" width="25%" className="mb-2 typography-title" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton variant="rectangular" width={48} height={48} className="rounded-md" />
                  <div className="flex-1 space-y-1">
                    <Skeleton variant="text" width={`${Math.floor(Math.random() * 20) + 70}%`} />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
      case 'aiSuggestion':
        return (
          <img 
            src="https://d2kde5ohu8qb21.cloudfront.net/files/684770b189dde90008189d23/aiicon.svg" 
            alt="AI"
            className="w-5 h-5 text-primary dark:text-primary-400" 
          />
        );
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
  }, {} as Record<Suggestion["type"], Suggestion[]>);

  // Order of content types in dropdown - AI suggestions first, then cars
  const getTypeOrder = (): Suggestion["type"][] => {
    return [
      'aiSuggestion', 
      'newCar', 
      'usedCar', 
      'carMake', 
      'carModel', 
      'article', 
      'video', 
      'photo', 
      'popular'
    ] as Suggestion["type"][];
  };
  const typeOrder = getTypeOrder();
  
  let globalSuggestionIndex = -1; 

  return (
    <div className={`absolute left-0 right-0 ${positionClasses} w-[calc(100vw-40px)] max-w-2xl max-h-[70vh] overflow-y-auto rounded-md bg-white shadow-2xl z-50 dark:bg-gray-800 border dark:border-gray-700 transition-standard`}>
      <ul className="py-1">
        {typeOrder.map(type => {
          const typeSuggestions = groupedSuggestions[type];
          if (!typeSuggestions || typeSuggestions.length === 0) return null;
          
          const typeLabel = (() => {
            switch (type) {
              case 'aiSuggestion': return 'AI Suggestions';
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
                <div className={`px-4 py-2 typography-caption sticky top-0 z-10 text-neutral-4 dark:text-neutral-3 bg-neutral-7 dark:bg-neutral-2/50`}>
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
                  } else if (suggestion.type === 'aiSuggestion') {
                    secondaryText = 'Ask our AI assistant';
                  }

                  return (
                    <li 
                      key={suggestion.id}
                      className={`rounded-md flex items-center gap-3 p-2 typography-caption cursor-pointer dark:text-white ${
                        selectedIndex === currentGlobalIndex
                          ? suggestion.type === 'aiSuggestion' 
                            ? "bg-motortrend-red bg-opacity-10 text-motortrend-red dark:bg-motortrend-red/20 dark:text-motortrend-red-300"
                            : "bg-motortrend-red bg-opacity-10 text-motortrend-red dark:bg-motortrend-red/20 dark:text-motortrend-red-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => onSelect(suggestion)}
                      onMouseEnter={() => onMouseEnter(currentGlobalIndex)}
                      role="option"
                      aria-selected={selectedIndex === currentGlobalIndex}
                    >
                      {suggestion.type === 'aiSuggestion' ? (
                        <div className="w-16 h-10 flex-shrink-0 flex items-center justify-center">
                          <img 
                            src="https://d2kde5ohu8qb21.cloudfront.net/files/684770b189dde90008189d23/aiicon.svg" 
                            alt="AI"
                            className="w-8 h-8" 
                          />
                        </div>
                      ) : suggestion.imageUrl ? (
                        <img src={suggestion.imageUrl} alt={suggestion.text} className="w-16 h-10 object-cover rounded-sm flex-shrink-0" /> 
                      ) : (
                        <div className="w-16 h-10 flex-shrink-0 flex items-center justify-center bg-neutral-7 dark:bg-neutral-2 rounded-sm">
                          {getIconForSuggestionType(suggestion.type)} 
                        </div>
                      )}
                      <div className="flex-grow overflow-hidden">
                        <span className={`${suggestion.type === 'aiSuggestion' ? 'typography-body-small font-medium' : 'typography-body-small'} truncate block`}>
                          {suggestion.text}
                        </span>
                        {secondaryText && (
                          <span className={`typography-caption truncate block ${
                            suggestion.type === 'aiSuggestion' 
                              ? 'text-motortrend-red dark:text-motortrend-red-300' 
                              : 'text-neutral-4 dark:text-neutral-3'
                          }`}>
                            {secondaryText}
                          </span>
                        )}
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
