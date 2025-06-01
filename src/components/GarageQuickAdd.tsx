import React, { useState } from 'react';
import { Search, Plus, Car } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAutocomplete, Suggestion } from "../hooks/use-autocomplete";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { useToast } from "@/hooks/use-toast";
import { useCarMakes, useCarModelsByMakeId } from '@/hooks/use-car-database';
import { mockNewCars, mockUsedCars } from '@/services/mockData';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GarageQuickAddProps {
  onAddCar?: () => void;
}

// Helper function to get car image based on title
const getCarImageByTitle = (title: string): string => {
  // First try to find exact match in mock data
  const exactMatch = [...mockNewCars, ...mockUsedCars].find(car => 
    car.title.toLowerCase() === title.toLowerCase()
  );
  
  if (exactMatch) {
    return exactMatch.imageUrl;
  }

  // Try to find partial match
  const partialMatch = [...mockNewCars, ...mockUsedCars].find(car => 
    title.toLowerCase().includes(car.title.toLowerCase().split(' ').slice(-2).join(' ').toLowerCase()) ||
    car.title.toLowerCase().includes(title.toLowerCase().split(' ').slice(-2).join(' ').toLowerCase())
  );
  
  if (partialMatch) {
    return partialMatch.imageUrl;
  }

  // Fallback to brand-specific images based on make
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('honda')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg';
  } else if (lowerTitle.includes('hyundai') || lowerTitle.includes('ioniq')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/683a13b525213f0008ca3bff/001-2025-hyundai-ioniq-5-xrt-lead.jpg';
  } else if (lowerTitle.includes('ford')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/67803d741f7f8d00081b8228/2025fordmustanggtdspiritofamerica8.png';
  } else if (lowerTitle.includes('toyota')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4c435544c890008b8417b/2025-toyota-crown-signia-suv-reveal-4.jpg';
  } else if (lowerTitle.includes('bmw')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/66f1b4fea063c100087ac1dc/002-2025-bmw-i5-m60-front-view.jpg';
  } else if (lowerTitle.includes('lucid')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/67eebe7faf98e400084a3e75/001-2025-lucid-air-pure-front-three-quarter-static-lead.jpg';
  } else if (lowerTitle.includes('rivian')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/6700323d9326e80008726afc/018-2025-rivian-r1s-dual-max.jpg';
  } else if (lowerTitle.includes('tesla')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/663515bddbe9350008773b00/002-2023-tesla-model-y.jpg';
  } else if (lowerTitle.includes('porsche')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/65c44b3fb907d30008f1b5b9/2022-porsche-911-gt3-9.jpg';
  } else if (lowerTitle.includes('jeep')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/65c37e5d81670a0008bdb6df/2020-jeep-wrangler-unlimited-rubicon-ecodiesel-22.jpg';
  } else if (lowerTitle.includes('audi')) {
    return 'https://d2kde5ohu8qb21.cloudfront.net/files/65c42d9dadc7280009f459e8/2021-audi-rs-e-tron-gt-prototype-20.jpg';
  }

  // Generic fallback image
  return 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3';
};

const GarageQuickAdd: React.FC<GarageQuickAddProps> = ({ onAddCar }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { addSavedItem, isSaved } = useSavedItems();
  const { toast } = useToast();
  
  // For selecting ownership category
  const [ownership, setOwnership] = useState<'owned' | 'testDriven' | 'interested'>('interested');

  // Get car makes from database
  const { data: carMakes, isLoading: makesLoading } = useCarMakes();

  const { 
    suggestions, 
    isLoading: suggestionsLoading, 
    selectedIndex, 
    setSelectedIndex,
    handleKeyDown
  } = useAutocomplete(query);

  const handleAddCar = (suggestion: Suggestion) => {
    if (suggestion.type === 'newCar' || suggestion.type === 'carModel') {
      if (!isSaved(suggestion.id, 'newCar')) {
        // Find matching car from mock data
        const matchingCar = mockNewCars.find(car => car.id === suggestion.id) || 
                           mockUsedCars.find(car => car.id === suggestion.id);

        // Get the appropriate image
        const carImageUrl = matchingCar ? matchingCar.imageUrl : getCarImageByTitle(suggestion.text);

        addSavedItem({
          id: suggestion.id,
          title: suggestion.text,
          type: 'newCar',
          imageUrl: carImageUrl,
          savedAt: new Date().toISOString(),
          metadata: {
            price: matchingCar?.price || '$' + Math.floor(20000 + Math.random() * 60000).toLocaleString(),
            category: matchingCar?.category || (suggestion.text.toLowerCase().includes('electric') ? 'Electric' : 'Vehicle'),
            year: matchingCar?.year || new Date().getFullYear().toString(),
            ownership: ownership,
            bodyStyle: matchingCar?.bodyStyle,
            // New car specs
            msrp: matchingCar?.msrp || '$' + Math.floor(25000 + Math.random() * 70000).toLocaleString(),
            mpg: matchingCar?.mpg || (suggestion.text.toLowerCase().includes('electric') ? null : Math.floor(20 + Math.random() * 15) + ' city / ' + Math.floor(25 + Math.random() * 20) + ' hwy'),
            mpge: matchingCar?.mpge || (suggestion.text.toLowerCase().includes('electric') ? Math.floor(90 + Math.random() * 40).toString() : null),
            range: matchingCar?.range || (suggestion.text.toLowerCase().includes('electric') ? Math.floor(200 + Math.random() * 150) + ' miles' : null),
            engine: matchingCar?.engine || (suggestion.text.toLowerCase().includes('electric') ? 'Electric Motor' : suggestion.text.toLowerCase().includes('hybrid') ? 'Hybrid' : '2.0L 4-cylinder'),
            horsepower: matchingCar?.horsepower || Math.floor(180 + Math.random() * 300) + ' hp',
            transmission: matchingCar?.transmission || (suggestion.text.toLowerCase().includes('electric') ? 'Single-speed automatic' : 'Automatic'),
            fuelType: matchingCar?.fuelType || (suggestion.text.toLowerCase().includes('electric') ? 'Electric' : suggestion.text.toLowerCase().includes('hybrid') ? 'Hybrid' : 'Gasoline'),
            drivetrain: matchingCar?.drivetrain || (Math.random() > 0.5 ? 'FWD' : 'AWD'),
            // MotorTrend ratings
            motorTrendScore: matchingCar?.motorTrendScore || (Math.floor(75 + Math.random() * 25) / 10).toFixed(1),
            motorTrendRank: matchingCar?.motorTrendRank || '#' + Math.floor(1 + Math.random() * 5),
            motorTrendCategoryRank: matchingCar?.motorTrendCategoryRank || true
          }
        });
        
        toast({
          title: "Car added to garage",
          description: `${suggestion.text} was added to your ${ownership} collection.`,
        });
      } else {
        toast({
          title: "Already in your garage",
          description: `${suggestion.text} is already in your garage.`,
        });
      }
    }
    setQuery('');
    setShowSuggestions(false);
    
    if (onAddCar) {
      onAddCar();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e);
    
    if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < suggestions.length) {
      e.preventDefault();
      handleAddCar(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Generate dynamic suggestions from database
  const databaseSuggestions = () => {
    if (!query || query.length < 2 || !carMakes) return [];
    
    return carMakes
      .filter(make => make.name.toLowerCase().includes(query.toLowerCase()))
      .map(make => ({
        id: make.id,
        text: make.name,
        type: 'carMake' as 'carMake',
      }));
  };
  
  // Combine database suggestions with static ones
  const combinedSuggestions = [
    ...databaseSuggestions(),
    ...suggestions.filter(
      suggestion => suggestion.type === 'newCar' || suggestion.type === 'carModel' || suggestion.type === 'carMake'
    )
  ];

  const filteredSuggestions = combinedSuggestions.slice(0, 8); // Limit to prevent overwhelming UI

  return (
    <Card className="border-0 shadow-md bg-white rounded-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="relative w-full">
          {/* Ownership selector */}
          <div className="flex mb-4 justify-between items-center">
            <span className="text-sm font-medium text-motortrend-dark">Add as:</span>
            <div className="flex space-x-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="owned" 
                  checked={ownership === 'owned'} 
                  onCheckedChange={() => setOwnership('owned')}
                  className="data-[state=checked]:bg-motortrend-red data-[state=checked]:border-motortrend-red"
                />
                <label
                  htmlFor="owned"
                  className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Owned
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="testDriven" 
                  checked={ownership === 'testDriven'} 
                  onCheckedChange={() => setOwnership('testDriven')}
                  className="data-[state=checked]:bg-motortrend-red data-[state=checked]:border-motortrend-red"
                />
                <label
                  htmlFor="testDriven"
                  className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Test Driven
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="interested" 
                  checked={ownership === 'interested'} 
                  onCheckedChange={() => setOwnership('interested')}
                  className="data-[state=checked]:bg-motortrend-red data-[state=checked]:border-motortrend-red"
                />
                <label
                  htmlFor="interested"
                  className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Interested
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search for make, model, or trim..."
                className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-motortrend-red"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <span className="sr-only">Clear</span>
                  <span aria-hidden="true">&times;</span>
                </button>
              )}
            </div>
            <Button 
              className="gap-1 px-3 py-2 h-9 bg-motortrend-red hover:bg-motortrend-red/90 transition-transform hover:scale-105"
              onClick={() => {
                if (query && filteredSuggestions.length > 0) {
                  handleAddCar(filteredSuggestions[0]);
                } else {
                  toast({
                    title: "Please select a car",
                    description: "Type and select a car from the suggestions"
                  });
                }
              }}
            >
              <Plus size={16} />
              Add Car
            </Button>
          </div>
          {showSuggestions && filteredSuggestions.length > 0 && (
  <div className="absolute left-0 right-0 z-10 max-w-[632px] mx-auto">
    <AutocompleteSuggestions
      suggestions={filteredSuggestions}
      selectedIndex={selectedIndex}
      isLoading={suggestionsLoading || makesLoading}
      onSelect={(suggestion) => handleAddCar(suggestion)}
      onMouseEnter={(index) => setSelectedIndex(index)}
    />
  </div>
)}
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageQuickAdd;
