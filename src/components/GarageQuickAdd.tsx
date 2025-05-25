
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

        if (!matchingCar) {
          toast({
            title: "Error",
            description: "Could not find car details. Please try again.",
            variant: "destructive"
          });
          return;
        }

        addSavedItem({
          id: suggestion.id,
          title: suggestion.text,
          type: 'newCar',
          imageUrl: matchingCar.imageUrl,
          savedAt: new Date().toISOString(),
          metadata: {
            price: matchingCar.price,
            category: matchingCar.category,
            year: matchingCar.year || new Date().getFullYear().toString(),
            ownership: ownership,
            bodyStyle: matchingCar.bodyStyle
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
            <div className="absolute left-0 right-0 z-10">
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
