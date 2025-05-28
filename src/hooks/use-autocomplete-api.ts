
import { useState, useEffect, useCallback } from 'react';
import { useCarSearchApi } from './use-cars-api';

export interface ApiSuggestion {
  id: string;
  text: string;
  type: 'carMake' | 'carModel' | 'carYear';
  make?: string;
  model?: string;
  year?: number;
  details?: any;
}

export const useAutocompleteApi = (query: string) => {
  const [suggestions, setSuggestions] = useState<ApiSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const { data: searchResults, isLoading } = useCarSearchApi(query);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      const apiSuggestions: ApiSuggestion[] = [];
      
      // Group by make first
      const makeGroups = new Map<string, any[]>();
      searchResults.forEach(car => {
        if (!makeGroups.has(car.make)) {
          makeGroups.set(car.make, []);
        }
        makeGroups.get(car.make)?.push(car);
      });

      // Add make suggestions
      makeGroups.forEach((cars, make) => {
        apiSuggestions.push({
          id: `make-${make}`,
          text: `${make} (${cars.length} models)`,
          type: 'carMake',
          make,
          details: cars
        });

        // Add model suggestions for this make
        const uniqueModels = [...new Set(cars.map(car => car.model))];
        uniqueModels.slice(0, 3).forEach(model => {
          const modelCars = cars.filter(car => car.model === model);
          apiSuggestions.push({
            id: `model-${make}-${model}`,
            text: `${make} ${model}`,
            type: 'carModel',
            make,
            model,
            details: modelCars
          });
        });
      });

      setSuggestions(apiSuggestions.slice(0, 8));
    } else {
      setSuggestions([]);
    }
    
    setSelectedIndex(-1);
  }, [searchResults]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Escape':
        setSelectedIndex(-1);
        break;
    }
  }, [suggestions.length]);

  return {
    suggestions,
    isLoading,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  };
};
