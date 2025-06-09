import { useState, useEffect, useMemo, useCallback } from 'react';
import * as mockDataModule from "../services/mockData";
import { carMakes } from "../services/carData";

// Type for rich search suggestions in the mega dropdown
export type Suggestion = {
  id: string;
  text: string; // Typically the title
  type: 'article' | 'newCar' | 'usedCar' | 'photo' | 'video' | 'popular' | 'carMake' | 'carModel' | 'aiSuggestion';
  imageUrl?: string; // Optional, as makes/models might not have one
  category?: string; // For articles, photos, videos, cars
  price?: string; // For cars
  date?: string; // For articles, photos
  duration?: string; // For videos
  // Add any other relevant fields from mockData types
  makeId?: string; 
  aiResponse?: string; // For AI suggestions, the response to show when selected
};

export function useAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  // Popular searches that always appear when the input is empty - memoized to prevent recreation on each render
  const popularSearches = useMemo<Suggestion[]>(() => [
    { id: 'pop-1', text: 'New SUVs', type: 'popular' },
    { id: 'pop-2', text: 'Electric cars', type: 'popular' },
    { id: 'pop-3', text: 'Best sedans', type: 'popular' },
    { id: 'pop-4', text: 'Car buying tips', type: 'popular' }
  ], []);

  // Memoize the fetchSuggestions function to prevent recreation on each render
  const fetchSuggestions = useCallback(async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For now, we'll use the mock data
        const allContent = mockDataModule.getAllContent();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Create suggestions from mock data
        const newSuggestions: Suggestion[] = [];
        
        // Add AI suggestions first - these will always appear at the top
        if (query.trim().length > 0) {
          // Generate 2-3 AI suggestions based on the query
          const aiSuggestions = generateAiSuggestions(query);
          newSuggestions.push(...aiSuggestions);
        }
        
        // Track count for each content type to limit to 3 results per type
        const contentTypeCounts: Record<Suggestion["type"], number> = {
          newCar: 0,
          usedCar: 0,
          article: 0,
          video: 0,
          photo: 0,
          carMake: 0,
          carModel: 0,
          popular: 0,
          aiSuggestion: newSuggestions.filter(s => s.type === 'aiSuggestion').length
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

        // Limit to first 15 suggestions for better UX, but ensure AI suggestions are included
        setSuggestions(newSuggestions.slice(0, 15)); // Increased limit slightly for more variety
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, [query, popularSearches]);

  // Effect to handle search when query changes
  useEffect(() => {
    // Reset selection when query changes
    setSelectedIndex(-1);
    
    if (!query.trim()) {
      setSuggestions(popularSearches);
      return;
    }
    
    // Debounce the fetch operation to avoid excessive API calls
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions, popularSearches]);

  // Handle keyboard navigation - memoized to prevent recreation on each render
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent cursor from moving
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent cursor from moving
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
  }, [suggestions.length]);

  // Function to generate AI suggestions based on the query
  const generateAiSuggestions = (query: string): Suggestion[] => {
    const lowerQuery = query.toLowerCase();
    const suggestions: Suggestion[] = [];
    
    // Generate AI query suggestions based on keywords in the query
    if (lowerQuery.includes('car') || lowerQuery.includes('vehicle')) {
      suggestions.push({
        id: `ai-1-${Date.now()}`,
        text: `What are the best ${query} options for families?`,
        type: 'aiSuggestion',
        aiResponse: `Based on safety ratings, space, and reliability, the best family ${query} options include the Honda Odyssey, Toyota Sienna, and Subaru Outback. These vehicles offer excellent crash test ratings, spacious interiors, and advanced safety features like automatic emergency braking and lane-keeping assist.`
      });
      
      suggestions.push({
        id: `ai-2-${Date.now()}`,
        text: `How much should I budget for a ${query}?`,
        type: 'aiSuggestion',
        aiResponse: `For a new ${query}, budget between $25,000-$35,000 for a reliable midsize sedan, $35,000-$45,000 for a midsize SUV, and $45,000+ for luxury models. Used vehicles typically cost 20-30% less for models 2-3 years old. Remember to factor in insurance, maintenance, and fuel costs, which can add $3,000-$5,000 annually.`
      });
    } else if (lowerQuery.includes('electric') || lowerQuery.includes('ev')) {
      suggestions.push({
        id: `ai-1-${Date.now()}`,
        text: `What's the range of top ${query} models?`,
        type: 'aiSuggestion',
        aiResponse: `The top electric vehicles by range include the Lucid Air (516 miles), Tesla Model S (405 miles), Mercedes EQS (350 miles), and Tesla Model 3 Long Range (334 miles). Most modern EVs offer 250-300 miles of range, which is sufficient for daily commuting and occasional road trips when combined with the expanding fast-charging infrastructure.`
      });
      
      suggestions.push({
        id: `ai-2-${Date.now()}`,
        text: `Are there tax incentives for buying ${query}?`,
        type: 'aiSuggestion',
        aiResponse: `Yes, there are federal tax credits up to $7,500 for new electric vehicles, depending on the model and your income. Many states offer additional incentives ranging from $1,000-$5,000. Some utilities provide rebates for home charger installation. These incentives can significantly reduce the effective purchase price, making EVs more competitive with conventional vehicles.`
      });
    } else if (lowerQuery.includes('suv') || lowerQuery.includes('crossover')) {
      suggestions.push({
        id: `ai-1-${Date.now()}`,
        text: `What are the most fuel-efficient ${query}s?`,
        type: 'aiSuggestion',
        aiResponse: `The most fuel-efficient SUVs are hybrids like the Toyota RAV4 Hybrid (40 mpg combined), Honda CR-V Hybrid (38 mpg), and Ford Escape Hybrid (41 mpg). For plug-in hybrids, the Toyota RAV4 Prime offers 42 miles of electric range. Among pure electric SUVs, the Tesla Model Y, Hyundai Ioniq 5, and Ford Mustang Mach-E all offer excellent efficiency with 3-4 miles per kWh.`
      });
      
      suggestions.push({
        id: `ai-2-${Date.now()}`,
        text: `Which ${query}s have the most cargo space?`,
        type: 'aiSuggestion',
        aiResponse: `The SUVs with the most cargo space include the Chevrolet Suburban (144.7 cubic feet), Ford Expedition MAX (121.5 cubic feet), and Jeep Wagoneer (116.7 cubic feet). Among midsize SUVs, the Volkswagen Atlas (96.8 cubic feet), Honda Pilot (83.9 cubic feet), and Kia Telluride (87 cubic feet) lead the pack. Compact SUVs like the Honda CR-V (75.8 cubic feet) and Toyota RAV4 (69.8 cubic feet) offer impressive space for their size.`
      });
    } else if (lowerQuery.includes('honda') || lowerQuery.includes('accord')) {
      suggestions.push({
        id: `ai-1-${Date.now()}`,
        text: `Is the Honda Accord reliable?`,
        type: 'aiSuggestion',
        aiResponse: `The Honda Accord is consistently rated as one of the most reliable midsize sedans. Consumer Reports and J.D. Power regularly rank it above average for reliability. Many Accords reach 200,000-300,000 miles with proper maintenance. The most common issues are relatively minor, including infotainment glitches and brake wear. The hybrid system has proven particularly durable with few reported problems.`
      });
      
      suggestions.push({
        id: `ai-2-${Date.now()}`,
        text: `Honda Accord vs Toyota Camry comparison`,
        type: 'aiSuggestion',
        aiResponse: `The Honda Accord and Toyota Camry are both excellent midsize sedans with slight differences. The Accord offers sportier handling, a more spacious interior (especially rear seat legroom), and a more refined infotainment system. The Camry provides slightly better fuel economy, more engine options including a V6, and typically comes with more standard safety features. Both have excellent reliability ratings, though the Camry slightly edges out the Accord in long-term dependability studies.`
      });
    } else {
      // Generic AI suggestions for any other query
      suggestions.push({
        id: `ai-1-${Date.now()}`,
        text: `What should I know about ${query}?`,
        type: 'aiSuggestion',
        aiResponse: `Here's what you should know about ${query}: We've analyzed the latest expert reviews, owner feedback, and technical specifications to provide you with comprehensive information. Our experts can answer specific questions about performance, features, reliability, and value compared to competitors. If you're considering a purchase, we can also provide pricing guidance and availability information.`
      });
      
      suggestions.push({
        id: `ai-2-${Date.now()}`,
        text: `Compare top options for ${query}`,
        type: 'aiSuggestion',
        aiResponse: `When comparing top options for ${query}, consider these key factors: price range, reliability ratings, performance specifications, feature sets, and owner satisfaction. Based on our analysis, the leading options provide the best balance of these factors. We recommend comparing at least 3-4 alternatives before making a decision, focusing on the features most important to your specific needs and preferences.`
      });
    }
    
    // Limit to 2 AI suggestions
    return suggestions.slice(0, 2);
  };

  // Memoize the return value to prevent unnecessary re-renders in consuming components
  return useMemo(() => ({
    suggestions,
    isLoading,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  }), [suggestions, isLoading, selectedIndex, handleKeyDown]);
}
