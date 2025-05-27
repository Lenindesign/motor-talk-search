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
  const [ownership, setOwnership] = useState<'owned' | 'testDriven' | 'interested'>(activeTab !== 'all' ? activeTab as 'owned' | 'testDriven' | 'interested' : 'interested');

  // For selecting body style
  const [bodyStyle, setBodyStyle] = useState<'SUV' | 'Sedan' | 'Truck' | 'Sports Car' | 'Minivan' | undefined>(undefined);

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

  // Generate mock specifications based on body style
  const generateSpecsForBodyStyle = (style: string) => {
    switch (style) {
      case 'SUV':
        return {
          cargoCapacity: Math.floor(30 + Math.random() * 20) + " cu ft",
          cargoCapacityFolded: Math.floor(60 + Math.random() * 30) + " cu ft",
          passengerCapacity: Math.floor(5 + Math.random() * 3) + " passengers",
          seatingConfiguration: Math.random() > 0.5 ? "2-3-2" : "2-3"
        };
      case 'Sedan':
        return {
          trunkCapacity: Math.floor(12 + Math.random() * 8) + " cu ft",
          safetyRating: Math.random() > 0.7 ? "5-Star NHTSA" : "Top Safety Pick IIHS",
          horsepowerTorque: Math.floor(150 + Math.random() * 150) + " hp / " + Math.floor(150 + Math.random() * 200) + " lb-ft"
        };
      case 'Truck':
        return {
          towingCapacity: Math.floor(5000 + Math.random() * 7000) + " lbs",
          payloadCapacity: Math.floor(1000 + Math.random() * 2000) + " lbs",
          bedDimensions: Math.floor(5 + Math.random() * 3) + "' x " + Math.floor(4 + Math.random()) + "'",
          powertrainOptions: Math.random() > 0.5 ? "V6 with 8-spd auto" : "V8 with 10-spd auto"
        };
      case 'Sports Car':
        return {
          zeroToSixty: (Math.random() * 2 + 2).toFixed(1) + " seconds",
          topSpeed: Math.floor(155 + Math.random() * 45) + " mph",
          weightPowerRatio: (Math.random() * 3 + 5).toFixed(1) + " lbs/hp",
          horsepowerTorque: Math.floor(300 + Math.random() * 400) + " hp / " + Math.floor(300 + Math.random() * 300) + " lb-ft"
        };
      case 'Minivan':
        return {
          passengerCapacity: Math.floor(7 + Math.random() * 2) + " passengers",
          seatingConfiguration: "2-3-3",
          cargoCapacity: "Behind 3rd row: " + Math.floor(20 + Math.random() * 15) + " cu ft",
          slidingDoorFeatures: Math.random() > 0.5 ? "Power sliding doors" : "Hands-free power doors",
          familyFeatures: Math.random() > 0.5 ? "Rear entertainment system" : "Vacuum cleaner"
        };
      default:
        return {};
    }
  };
  const handleAddCar = (suggestion: Suggestion) => {
    if (suggestion.type === 'newCar' || suggestion.type === 'carModel') {
      if (!isSaved(suggestion.id, 'newCar')) {
        // Generate specs based on body style
        const specs = bodyStyle ? generateSpecsForBodyStyle(bodyStyle) : {};

        // Common fields for all cars
        const fuelType = Math.random() > 0.3 ? Math.floor(20 + Math.random() * 15) + " city / " + Math.floor(25 + Math.random() * 15) + " hwy" : "Electric - " + Math.floor(85 + Math.random() * 50) + " MPGe";
        const drivetrain = ['FWD', 'RWD', 'AWD', '4WD'][Math.floor(Math.random() * 4)];
        addSavedItem({
          id: suggestion.id,
          title: suggestion.text,
          type: 'newCar',
          imageUrl: '/placeholder.svg',
          savedAt: new Date().toISOString(),
          metadata: {
            price: '$' + Math.floor(20000 + Math.random() * 60000).toLocaleString(),
            category: suggestion.type === 'carModel' ? 'Model' : 'New Car',
            year: new Date().getFullYear().toString(),
            ownership: ownership,
            bodyStyle: bodyStyle,
            fuelType: fuelType,
            drivetrain: drivetrain,
            ...specs
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
  const filteredSuggestions = suggestions.filter(suggestion => suggestion.type === 'newCar' || suggestion.type === 'carModel' || suggestion.type === 'carMake').slice(0, 8); // Limit to prevent overwhelming UI

  return <div className="w-full max-w-md mx-auto">
      {/* Ownership selector */}
      <div className="flex mb-2 justify-center text-sm">
        <span className="mr-2 text-gray-500 py-[15px] px-[14px]">Add as:</span>
        <div className="flex space-x-2">
          <button onClick={() => setOwnership('owned')} className={`px-2 py-1 rounded ${ownership === 'owned' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}>
            Owned
          </button>
          <button onClick={() => setOwnership('testDriven')} className={`px-2 py-1 rounded ${ownership === 'testDriven' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}>
            Test Driven
          </button>
          <button onClick={() => setOwnership('interested')} className="">
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
        }} onFocus={() => setShowSuggestions(true)} onKeyDown={handleInputKeyDown} placeholder="Search for make, model, or trim..." className="w-full rounded-l-md border border-input px-10 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-motortrend-red h-11" />
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