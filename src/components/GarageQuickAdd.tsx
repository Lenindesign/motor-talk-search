
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAutocomplete, Suggestion } from "../hooks/use-autocomplete";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { useToast } from "@/hooks/use-toast";

interface GarageQuickAddProps {
  onAddCar?: () => void;
}

const GarageQuickAdd: React.FC<GarageQuickAddProps> = ({ onAddCar }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { addSavedItem, isSaved } = useSavedItems();
  const { toast } = useToast();

  const { 
    suggestions, 
    isLoading: suggestionsLoading, 
    selectedIndex, 
    setSelectedIndex,
    handleKeyDown
  } = useAutocomplete(query);

  const handleAddCar = (suggestion: Suggestion) => {
    if (suggestion.type === 'newCar' || suggestion.type === 'carModel') {
      if (!isSaved(suggestion.id)) {
        addSavedItem({
          id: suggestion.id,
          title: suggestion.text,
          type: 'newCar',
          imageUrl: '/placeholder.svg',
          metadata: {
            price: 'Contact dealer',
            category: suggestion.type === 'carModel' ? 'Model' : 'New Car',
            year: new Date().getFullYear().toString(),
          }
        });
        
        toast({
          title: "Car added to garage",
          description: `${suggestion.text} was added to your garage.`,
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

  const filteredSuggestions = suggestions.filter(
    suggestion => suggestion.type === 'newCar' || suggestion.type === 'carModel' || suggestion.type === 'carMake'
  );

  return (
    <div className="relative w-full">
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
        <Button className="gap-1 px-3 py-2 h-9 bg-motortrend-red hover:bg-motortrend-red/90 transition-transform hover:scale-105">
          <Plus size={16} />
          Add Car
        </Button>
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-10">
          <AutocompleteSuggestions
            suggestions={filteredSuggestions}
            selectedIndex={selectedIndex}
            isLoading={suggestionsLoading}
            onSelect={(suggestion) => handleAddCar(suggestion)}
            onMouseEnter={(index) => setSelectedIndex(index)}
          />
        </div>
      )}
    </div>
  );
};

export default GarageQuickAdd;
