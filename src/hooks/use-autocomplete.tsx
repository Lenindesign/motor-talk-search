
import { useState, useEffect } from 'react';
import { getAllContent } from "../services/mockData";

// Type for search suggestions
export type Suggestion = {
  id: string;
  text: string;
  type: 'article' | 'newCar' | 'usedCar' | 'photo' | 'video' | 'popular';
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
    
    if (!query.trim()) {
      setSuggestions(popularSearches);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For now, we'll use the mock data
        const allContent = getAllContent();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Create suggestions from mock data
        const newSuggestions: Suggestion[] = [];
        
        // Add article-based suggestions
        allContent.articles.forEach(article => {
          if (article.title.toLowerCase().includes(query.toLowerCase())) {
            newSuggestions.push({
              id: `article-${article.id}`,
              text: article.title,
              type: 'article'
            });
          }
        });
        
        // Add car-based suggestions
        allContent.newCars.forEach(car => {
          if (car.make.toLowerCase().includes(query.toLowerCase()) || 
              car.model.toLowerCase().includes(query.toLowerCase())) {
            newSuggestions.push({
              id: `newcar-${car.id}`,
              text: `${car.year} ${car.make} ${car.model}`,
              type: 'newCar'
            });
          }
        });
        
        allContent.usedCars.forEach(car => {
          if (car.make.toLowerCase().includes(query.toLowerCase()) || 
              car.model.toLowerCase().includes(query.toLowerCase())) {
            newSuggestions.push({
              id: `usedcar-${car.id}`,
              text: `Used ${car.year} ${car.make} ${car.model}`,
              type: 'usedCar'
            });
          }
        });

        // Limit to first 8 suggestions for better UX
        setSuggestions(newSuggestions.slice(0, 8));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the fetch operation to avoid excessive API calls
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

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
