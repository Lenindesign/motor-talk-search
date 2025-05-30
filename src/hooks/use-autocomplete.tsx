
import { useState, useEffect } from 'react';
import { getAllContent } from "../services/mockData";
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
        const allContent = getAllContent();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Create suggestions from mock data
        const newSuggestions: Suggestion[] = [];
        
        // Add car makes and models suggestions
        const lowerCaseQuery = query.toLowerCase();
        
        // Add car make suggestions
        carMakes.forEach(make => {
          if (make.name.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `make-${make.id}`,
              text: make.name,
              type: 'carMake',
              imageUrl: make.imageUrl
            });
          }
          
          // Add car model suggestions
          make.models.forEach(model => {
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
            }
          });
        });
        
        // Add article-based suggestions
        allContent.articles.forEach(article => {
          if (article.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `article-${article.id}`,
              text: article.title,
              type: 'article',
              imageUrl: article.imageUrl,
              category: article.category,
              date: article.date
            });
          }
        });
        
        // Add car-based suggestions from mock data
        allContent.newCars.forEach(car => {
          if (car.title && car.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `newcar-${car.id}`,
              text: car.title,
              type: 'newCar',
              imageUrl: car.imageUrl,
              category: car.category,
              price: car.price
            });
          }
        });
        
        allContent.usedCars.forEach(car => {
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
          }
        });

        // Add photo-based suggestions
        allContent.photos.forEach(photo => {
          if (photo.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `photo-${photo.id}`,
              text: photo.title,
              type: 'photo',
              imageUrl: photo.imageUrl,
              date: photo.year
            });
          }
        });

        // Add video-based suggestions
        allContent.videos.forEach(video => {
          if (video.title.toLowerCase().includes(lowerCaseQuery)) {
            newSuggestions.push({
              id: `video-${video.id}`,
              text: video.title,
              type: 'video',
              imageUrl: video.imageUrl,
              duration: video.duration,
              date: video.publishDate
            });
          }
        });

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
