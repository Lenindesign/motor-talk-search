
import { useState, useEffect } from 'react';
import * as mockDataModule from "../services/mockData";
import { carMakes } from "../services/carData";

// Type for rich search suggestions in the mega dropdown
export type Suggestion = {
  id: string;
  text: string; // Typically the title
  type: 'article' | 'newCar' | 'usedCar' | 'photo' | 'video' | 'popular' | 'carMake' | 'carModel';
  imageUrl?: string; // Optional, as makes/models might not have one
  category?: string; // For articles, photos, videos, cars
  price?: string; // For cars
  date?: string; // For articles, photos
  duration?: string; // For videos
  // Add any other relevant fields from mockData types
  makeId?: string; 
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
        const allContent = mockDataModule.getAllContent();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Create suggestions from mock data
        const newSuggestions: Suggestion[] = [];
        
        // Track count for each content type to limit to 3 results per type
        const contentTypeCounts: Record<Suggestion["type"], number> = {
          newCar: 0,
          usedCar: 0,
          article: 0,
          video: 0,
          photo: 0,
          carMake: 0,
          carModel: 0,
          popular: 0
        };
        
        // Add car makes and models suggestions
        const lowerCaseQuery = query.toLowerCase();
        
        // Add car make suggestions - limited to 3
        for (const make of carMakes) {
          if (contentTypeCounts.carMake >= 3) break;
          
          if (make.name.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `make-${make.id}`,
              text: make.name,
              type: 'carMake',
              imageUrl: make.imageUrl
            });
            contentTypeCounts.carMake++;
          }
          
          // Add car model suggestions - limited to 3
          for (const model of make.models) {
            if (contentTypeCounts.carModel >= 3) break;
            
            const modelText = `${model.year} ${make.name} ${model.name}`;
            if (modelText.toLowerCase().includes(lowerCaseQuery) || 
                model.name.toLowerCase().includes(lowerCaseQuery)) {
              newSuggestions.push({
                id: `model-${model.id}`,
                text: modelText,
                type: 'carModel',
                imageUrl: model.imageUrl,
                makeId: make.id
              });
              contentTypeCounts.carModel++;
            }
          }
        }
        
        // Add new car-based suggestions from mock data - limited to 3
        for (const car of allContent.newCars) {
          if (contentTypeCounts.newCar >= 3) break;
          
          if (car.title && car.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `newcar-${car.id}`,
              text: car.title,
              type: 'newCar',
              imageUrl: car.imageUrl,
              category: car.category,
              price: car.price
            });
            contentTypeCounts.newCar++;
          }
        };
        
        // Add used car-based suggestions - limited to 3
        for (const car of allContent.usedCars) {
          if (contentTypeCounts.usedCar >= 3) break;
          
          if (car.title && car.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `usedcar-${car.id}`,
              text: car.title,
              type: 'usedCar',
              imageUrl: car.imageUrl,
              category: car.category,
              price: car.price
              // Add other used car specific fields if needed, e.g., mileage, year
            });
            contentTypeCounts.usedCar++;
          }
        };

        // Add article-based suggestions - limited to 3
        for (const article of allContent.articles) {
          if (contentTypeCounts.article >= 3) break;
          
          if (article.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `article-${article.id}`,
              text: article.title,
              type: 'article',
              imageUrl: article.imageUrl,
              category: article.category,
              date: article.date
            });
            contentTypeCounts.article++;
          }
        };

        // Add video-based suggestions - limited to 3
        for (const video of allContent.videos) {
          if (contentTypeCounts.video >= 3) break;
          
          if (video.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `video-${video.id}`,
              text: video.title,
              type: 'video',
              imageUrl: video.imageUrl,
              duration: video.duration,
              date: video.publishDate
            });
            contentTypeCounts.video++;
          }
        };

        // Add photo-based suggestions - limited to 3
        for (const photo of allContent.photos) {
          if (contentTypeCounts.photo >= 3) break;
          
          if (photo.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `photo-${photo.id}`,
              text: photo.title,
              type: 'photo',
              imageUrl: photo.imageUrl,
              date: photo.year
            });
            contentTypeCounts.photo++;
          }
        };

        // Limit to first 10 suggestions for better UX, prioritizing car makes and models
        // TODO: Consider a more sophisticated limiting strategy for mega dropdown (e.g., N per category)
        setSuggestions(newSuggestions.slice(0, 15)); // Increased limit slightly for more variety
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
