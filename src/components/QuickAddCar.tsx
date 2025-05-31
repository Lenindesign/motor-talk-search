import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAutocomplete, Suggestion } from "../hooks/use-autocomplete";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { useToast } from "@/hooks/use-toast";
import { mockNewCars, mockUsedCars } from '@/services/mockData';
interface QuickAddCarProps {
  onAddCar?: () => void;
  activeTab?: 'all' | 'owned' | 'testDriven' | 'interested';
}

// Helper function to get car image based on title
const getCarImageByTitle = (title: string): string => {
  // First try to find exact match in mock data
  const exactMatch = [...mockNewCars, ...mockUsedCars].find(car => car.title.toLowerCase() === title.toLowerCase());
  if (exactMatch) {
    return exactMatch.imageUrl;
  }

  // Try to find partial match
  const partialMatch = [...mockNewCars, ...mockUsedCars].find(car => title.toLowerCase().includes(car.title.toLowerCase().split(' ').slice(-2).join(' ').toLowerCase()) || car.title.toLowerCase().includes(title.toLowerCase().split(' ').slice(-2).join(' ').toLowerCase()));
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
        // Find matching car from mock data
        const matchingCar = mockNewCars.find(car => car.id === suggestion.id) || mockUsedCars.find(car => car.id === suggestion.id);

        // Get the appropriate image
        const carImageUrl = matchingCar ? matchingCar.imageUrl : getCarImageByTitle(suggestion.text);

        // Generate specs based on body style
        const specs = bodyStyle ? generateSpecsForBodyStyle(bodyStyle) : {};

        // Common fields for all cars
        const fuelType = Math.random() > 0.3 ? Math.floor(20 + Math.random() * 15) + " city / " + Math.floor(25 + Math.random() * 15) + " hwy" : "Electric - " + Math.floor(85 + Math.random() * 50) + " MPGe";
        const drivetrain = ['FWD', 'RWD', 'AWD', '4WD'][Math.floor(Math.random() * 4)];
        addSavedItem({
          id: suggestion.id,
          title: suggestion.text,
          type: 'newCar',
          imageUrl: carImageUrl,
          savedAt: new Date().toISOString(),
          metadata: {
            price: matchingCar?.price || '$' + Math.floor(20000 + Math.random() * 60000).toLocaleString(),
            category: matchingCar?.category || suggestion.type === 'carModel' ? 'Model' : 'New Car',
            year: matchingCar?.year || new Date().getFullYear().toString(),
            ownership: ownership,
            bodyStyle: matchingCar?.bodyStyle || bodyStyle,
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

  return <div className="w-full">
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
          <button onClick={() => setOwnership('interested')} className={`px-2 py-1 rounded ${ownership === 'interested' ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:bg-gray-100'}`}>
            Interested
          </button>
        </div>
      </div>
      
      <div className="relative flex w-full">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={18} />
          </div>
          <input type="text" value={query} onChange={e => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }} onFocus={() => setShowSuggestions(true)} onKeyDown={handleInputKeyDown} placeholder="Search for make, model, or trim..." className="w-full rounded-full border border-input px-12 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-motortrend-red h-11 rounded-r-lg" />
          {query && <button onClick={() => {
          setQuery('');
          setShowSuggestions(false);
        }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
              <span className="sr-only">Clear</span>
              <span aria-hidden="true">&times;</span>
            </button>}
        </div>
        <Button onClick={() => {
        if (query && filteredSuggestions.length > 0) {
          handleAddCar(filteredSuggestions[0]);
        } else {
          toast({
            title: "Please select a car",
            description: "Type and select a car from the suggestions"
          });
        }
      }} className="ml-2 rounded-full px-4 bg-motortrend-red rounded-l-lg">
          <Plus size={18} className="mr-1" /> Add Car
        </Button>
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && <div className="absolute z-10 bg-white w-full shadow-lg rounded-b-md mt-1">
          <AutocompleteSuggestions suggestions={filteredSuggestions} selectedIndex={selectedIndex} isLoading={suggestionsLoading} onSelect={suggestion => handleAddCar(suggestion)} onMouseEnter={index => setSelectedIndex(index)} />
        </div>}
    </div>;
};
export default QuickAddCar;