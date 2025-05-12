
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAutocomplete, Suggestion } from "../hooks/use-autocomplete";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { useToast } from "@/hooks/use-toast";

interface QuickAddCarProps {
  onAddCar?: () => void;
  activeTab?: 'all' | 'owned' | 'testDriven' | 'interested';
}

const QuickAddCar: React.FC<QuickAddCarProps> = ({
  onAddCar,
  activeTab = 'interested'
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {
    addSavedItem,
    isSaved
  } = useSavedItems();
  const {
    toast
  } = useToast();

  // For selecting ownership category - default to the active tab or interested
  const [ownership, setOwnership] = useState<'owned' | 'testDriven' | 'interested'>(
    activeTab !== 'all' ? activeTab as 'owned' | 'testDriven' | 'interested' : 'interested'
  );

  // Update ownership when activeTab changes
  React.useEffect(() => {
    if (activeTab !== 'all') {
      setOwnership(activeTab as 'owned' | 'testDriven' | 'interested');
    }
  }, [activeTab]);
  
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
          savedAt: new Date().toISOString(),
          metadata: {
            price: 'Contact dealer',
            category: suggestion.type === 'carModel' ? 'Model' : 'New Car',
            year: new Date().getFullYear().toString(),
            ownership: ownership // Ensure this gets set properly
          }
        });
        toast({
          title: "Car added to garage",
          description: `${suggestion.text} was added to your ${ownership} collection.`
        });
      } else {
        toast({
          title: "Already in your garage",
          description: `${suggestion.text} is already in your garage.`
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
  
  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.type === 'newCar' || suggestion.type === 'carModel' || suggestion.type === 'carMake'
  ).slice(0, 8); // Limit to prevent overwhelming UI

  return <div className="w-full max-w-md mx-auto">
      {/* Ownership selector */}
      <div className="flex mb-2 justify-center text-sm">
        <span className="mr-2 text-gray-500">Add as:</span>
        <div className="flex space-x-2">
          <button 
            onClick={() => setOwnership('owned')} 
            className={`px-2 py-1 rounded ${ownership === 'owned' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Owned
          </button>
          <button 
            onClick={() => setOwnership('testDriven')} 
            className={`px-2 py-1 rounded ${ownership === 'testDriven' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Test Driven
          </button>
          <button 
            onClick={() => setOwnership('interested')} 
            className={`px-2 py-1 rounded ${ownership === 'interested' ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            Interested
          </button>
        </div>
      </div>
      
      <div className="relative flex">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={18} />
          </div>
          <input type="text" value={query} onChange={e => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }} onFocus={() => setShowSuggestions(true)} onKeyDown={handleInputKeyDown} placeholder="Search for make, model, or trim..." className="w-full rounded-l-md border border-input px-10 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-motortrend-red" />
          {query && <button onClick={() => {
          setQuery('');
          setShowSuggestions(false);
        }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
              <span className="sr-only">Clear</span>
              <span aria-hidden="true">&times;</span>
            </button>}
        </div>
        <Button className="rounded-l-none bg-red-500 hover:bg-red-600" onClick={() => {
        if (query && filteredSuggestions.length > 0) {
          handleAddCar(filteredSuggestions[0]);
        } else {
          toast({
            title: "Please select a car",
            description: "Type and select a car from the suggestions"
          });
        }
      }}>
          <Plus size={18} className="mr-1" /> Add Car
        </Button>
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && <div className="absolute z-10 bg-white w-full max-w-md shadow-lg rounded-b-md">
          <AutocompleteSuggestions suggestions={filteredSuggestions} selectedIndex={selectedIndex} isLoading={suggestionsLoading} onSelect={suggestion => handleAddCar(suggestion)} onMouseEnter={index => setSelectedIndex(index)} />
        </div>}
    </div>;
};

export default QuickAddCar;
