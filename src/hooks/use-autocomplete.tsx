
import { useState, useEffect } from 'react';
import { getAllContent } from "../services/mockData";
import { carMakes } from "../services/carData";

// Type for search suggestions
export type Suggestion = {
  id: string;
  text: string;
  type: 'article' | 'newCar' | 'usedCar' | 'photo' | 'video' | 'popular' | 'carMake' | 'carModel';
  makeId?: string; // Optional for car models to reference their make
};

export function useAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  // Popular searches that always appear when the input is empty
  const popularSearches: Suggestion[] = [
    { id: 'pop-1', text: 'New SUVs', type: 'popular' },
    { id: 'pop-2', text: 'Electric cars', type: 'popular' },
    { id: 'pop-3', text: 'Best sedans', type: 'popular' },
    { id: 'pop-4', text: 'Car buying tips', type: 'popular' }
  ];

  useEffect(() => {
    // Reset selection when query changes
    setSelectedIndex(-1);
    
    // If query is empty, show popular searches immediately
    if (!query.trim()) {
      setSuggestions(popularSearches);
      return;
    }

    // If query is just 1 character, only show direct matches to improve performance
    if (query.trim().length === 1) {
      const quickSuggestions = carMakes
        .filter(make => make.name.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5)
        .map(make => ({
          id: `make-${make.id}`,
          text: make.name,
          type: 'carMake' as 'carMake'
        }));
      
      setSuggestions(quickSuggestions);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For now, we'll use the mock data
        const allContent = getAllContent();
        
        // For a faster response, we won't simulate network delay for 2+ characters
        // which makes the interface feel more responsive
        if (query.length > 2) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Create suggestions from mock data
        const newSuggestions: Suggestion[] = [];
        
        // Add car makes and models suggestions
        const lowerCaseQuery = query.toLowerCase();
        
        // Add car make suggestions - prioritize starts with matches
        carMakes.forEach(make => {
          const makeName = make.name.toLowerCase();
          // Prioritize "starts with" matches
          if (makeName.startsWith(lowerCaseQuery)) {
            newSuggestions.push({
              id: `make-${make.id}`,
              text: make.name,
              type: 'carMake'
            });
          } else if (makeName.includes(lowerCaseQuery)) {
            // Then include "contains" matches
            newSuggestions.push({
              id: `make-${make.id}`,
              text: make.name,
              type: 'carMake'
            });
          }
          
          // Add car model suggestions - only if query is 2+ characters for performance
          if (query.length >= 2) {
            make.models.forEach(model => {
              const modelText = `${model.year} ${make.name} ${model.name}`;
              if (modelText.toLowerCase().includes(lowerCaseQuery) || 
                  model.name.toLowerCase().includes(lowerCaseQuery)) {
                newSuggestions.push({
                  id: `model-${model.id}`,
                  text: modelText,
                  type: 'carModel',
                  makeId: make.id
                });
              }
            });
          }
        });
        
        // Add article-based suggestions
        allContent.articles.forEach(article => {
          if (article.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `article-${article.id}`,
              text: article.title,
              type: 'article'
            });
          }
        });
        
        // Add car-based suggestions from mock data
        allContent.newCars.forEach(car => {
          if (car.title && car.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `newcar-${car.id}`,
              text: car.title,
              type: 'newCar'
            });
          }
        });
        
        allContent.usedCars.forEach(car => {
          if (car.title && car.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `usedcar-${car.id}`,
              text: car.title,
              type: 'usedCar'
            });
          }
        });

        // Limit to first 10 suggestions for better UX, prioritizing car makes and models
        setSuggestions(newSuggestions.slice(0, 10));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Reduce debounce time for more immediate feedback
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 150); // Reduced from 300ms to 150ms for faster response

    return () => clearTimeout(timer);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent cursor from moving
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent cursor from moving
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
  };

  return {
    suggestions,
    isLoading,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  };
}
