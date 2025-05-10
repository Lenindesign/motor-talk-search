
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSavedItems, SavedItem } from "../contexts/SavedItemsContext";
import MainNavigation from "../components/MainNavigation";
import { useIsMobile } from "../hooks/use-mobile";
import SearchBar from "../components/SearchBar";
import { User, Settings, Car, Save, Tags, Bell, Car as CarIcon, X, Info, Trash } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import GarageQuickAdd from "../components/GarageQuickAdd";
import GarageCompare from "../components/GarageCompare";
import CarDetails from "../components/CarDetails";

const Garage = () => {
  const {
    savedItems,
    removeSavedItem,
    updateSavedItem
  } = useSavedItems();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // State for selected cars to compare
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  // State for selected car details to show
  const [selectedCarDetails, setSelectedCarDetails] = useState<string | null>(null);
  // State for active tab
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'interested' | 'testDriven'>('all');

  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Filter cars based on active tab
  const filteredCars = savedCars.filter(car => {
    if (activeTab === 'all') return true;
    return car.metadata?.ownership === activeTab;
  });

  // Mock user data - in a real app, this would come from auth context or API
  const userData = {
    name: "John Driver",
    email: "john.driver@example.com",
    avatar: "/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png",
    joined: "January 2023"
  };
  
  const handleUnsave = (id: string) => {
    removeSavedItem(id);
    // Also remove from selected cars if present
    setSelectedCars(prev => prev.filter(carId => carId !== id));
    // Clear selected details if this car was selected
    if (selectedCarDetails === id) {
      setSelectedCarDetails(null);
    }
    toast({
      title: "Car removed",
      description: "The vehicle has been removed from your garage",
    });
  };
  
  const handleToggleSelectCar = (id: string) => {
    setSelectedCars(prev => {
      if (prev.includes(id)) {
        return prev.filter(carId => carId !== id);
      } else {
        // Limit to 4 cars maximum
        if (prev.length < 4) {
          return [...prev, id];
        }
        return prev;
      }
    });
  };
  
  const handleCompare = () => {
    // In a real app, this would navigate to a compare page with the selected cars
    toast({
      title: "Compare feature",
      description: `Comparing ${selectedCars.length} cars. This feature would open a comparison page.`
    });
  };
  
  const handleUpdateCar = (id: string, updates: Partial<SavedItem>) => {
    updateSavedItem(id, updates);
  };
  
  const handleShowCarDetails = (id: string) => {
    setSelectedCarDetails(prev => prev === id ? null : id);
  };
  
  const countByOwnership = (type: string) => {
    return savedCars.filter(car => car.metadata?.ownership === type).length;
  };

  return (
    <div className="min-h-screen bg-motortrend-gray">
      <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-[980px] mx-auto w-full">
          <div className="flex items-center">
            {isMobile && <MainNavigation />}
            <Link to="/" className="flex-shrink-0">
              <img src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" alt="MotorTrend Logo" className="h-7 w-auto hover:opacity-80 transition-opacity" />
            </Link>
            <div className="hidden sm:flex ml-6">
              <MainNavigation />
            </div>
          </div>
          <div className="hidden sm:block ml-4">
            <SearchBar onSearch={query => navigate(`/?q=${query}`)} isLoading={false} variant="header" />
          </div>
        </div>
      </header>
      
      <main className="max-w-[980px] mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="w-16 h-16 transition-transform hover:scale-105">
                  <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{userData.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Member since {userData.joined}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cars in Garage</span>
                    <span className="text-sm font-bold">{savedCars.length}</span>
                  </div>
                  <div className="text-xs grid grid-cols-3 gap-1">
                    <div className="flex flex-col items-center p-1 rounded-md bg-green-50">
                      <span className="font-semibold text-green-800">{countByOwnership('owned')}</span>
                      <span className="text-green-600">Owned</span>
                    </div>
                    <div className="flex flex-col items-center p-1 rounded-md bg-blue-50">
                      <span className="font-semibold text-blue-800">{countByOwnership('testDriven')}</span>
                      <span className="text-blue-600">Test Driven</span>
                    </div>
                    <div className="flex flex-col items-center p-1 rounded-md bg-amber-50">
                      <span className="font-semibold text-amber-800">{countByOwnership('interested')}</span>
                      <span className="text-amber-600">Interested</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full transition-colors">
                    <User size={18} />
                    Profile
                  </Link>
                  <Link to="/garage" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-motortrend-dark text-white w-full">
                    <Car size={18} />
                    My Garage
                  </Link>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full transition-colors">
                    <Settings size={18} />
                    Settings
                  </button>
                </nav>
              </CardContent>
            </Card>
            
            {savedCars.length > 0 && (
              <GarageCompare 
                savedCars={savedCars}
                selectedCars={selectedCars}
                onToggleCar={handleToggleSelectCar}
                onCompare={handleCompare}
              />
            )}
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Car size={20} />
                    My Garage
                  </CardTitle>
                  <Button onClick={() => navigate("/")} className="transition-transform hover:scale-105">Browse Cars</Button>
                </div>
                <CardDescription>
                  View and manage your saved vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Quick Add Feature */}
                <div className="mb-6">
                  <GarageQuickAdd />
                </div>
                
                {/* Filter tabs */}
                {savedCars.length > 0 && (
                  <div className="flex mb-6 border-b overflow-x-auto scrollbar-none">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'all' 
                          ? 'border-motortrend-red text-motortrend-red font-medium' 
                          : 'border-transparent hover:text-gray-700'
                      }`}
                    >
                      All Cars ({savedCars.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('owned')}
                      className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'owned' 
                          ? 'border-motortrend-red text-motortrend-red font-medium' 
                          : 'border-transparent hover:text-gray-700'
                      }`}
                    >
                      Owned ({countByOwnership('owned')})
                    </button>
                    <button
                      onClick={() => setActiveTab('testDriven')}
                      className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'testDriven' 
                          ? 'border-motortrend-red text-motortrend-red font-medium' 
                          : 'border-transparent hover:text-gray-700'
                      }`}
                    >
                      Test Driven ({countByOwnership('testDriven')})
                    </button>
                    <button
                      onClick={() => setActiveTab('interested')}
                      className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'interested' 
                          ? 'border-motortrend-red text-motortrend-red font-medium' 
                          : 'border-transparent hover:text-gray-700'
                      }`}
                    >
                      Interested ({countByOwnership('interested')})
                    </button>
                  </div>
                )}
                
                {/* Car listing */}
                {filteredCars.length === 0 ? (
                  <div className="text-center py-10 animate-fade-in">
                    <Car size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      {savedCars.length === 0 
                        ? "Your garage is empty" 
                        : `No ${activeTab !== 'all' ? activeTab : ''} cars found`}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {savedCars.length === 0 
                        ? "Save cars you're interested in to add them to your garage" 
                        : `Try selecting a different category or add more cars`}
                    </p>
                    <Button className="mt-4 transition-transform hover:scale-105" onClick={() => navigate("/")}>
                      Find Cars
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {filteredCars.map(car => (
                        <React.Fragment key={car.id}>
                          <GarageCarCard 
                            car={car} 
                            onUnsave={handleUnsave}
                            isSelected={selectedCars.includes(car.id)}
                            onToggleSelect={() => handleToggleSelectCar(car.id)}
                            onShowDetails={() => handleShowCarDetails(car.id)}
                          />
                          
                          {selectedCarDetails === car.id && (
                            <div className="mt-2 ml-4 border-l-2 border-motortrend-red pl-4 animate-fade-in">
                              <CarDetails 
                                car={car}
                                onUpdate={handleUpdateCar}
                                onDelete={handleUnsave}
                              />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Component to display a saved car in garage
const GarageCarCard = ({
  car,
  onUnsave,
  isSelected,
  onToggleSelect,
  onShowDetails
}: {
  car: SavedItem;
  onUnsave: (id: string) => void;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onShowDetails?: () => void;
}) => {
  const metadata = car.metadata || {};
  
  // Micro-animation for card interaction
  const cardClasses = `flex flex-col sm:flex-row rounded-lg overflow-hidden border ${
    isSelected 
      ? 'bg-motortrend-red/5 border-motortrend-red/30' 
      : 'bg-white border-gray-200'
  } transition-all duration-300 hover:shadow-md animate-fade-in transform hover:-translate-y-1`;

  return (
    <div className={cardClasses}>
      <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          onError={e => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="bg-motortrend-red/10 text-motortrend-red border-motortrend-red/30">
            {car.type === 'newCar' ? 'New' : 'Used'}
          </Badge>
          {metadata.year && <Badge variant="outline">{metadata.year}</Badge>}
          {metadata.category && <Badge variant="outline">{metadata.category}</Badge>}
          
          {metadata.ownership && (
            <Badge className={`ml-auto ${
              metadata.ownership === 'owned' 
                ? 'bg-green-100 text-green-800' 
                : metadata.ownership === 'testDriven' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-amber-100 text-amber-800'
            }`}>
              {metadata.ownership === 'owned' 
                ? 'Owned' 
                : metadata.ownership === 'testDriven' 
                  ? 'Test Driven' 
                  : 'Interested'
              }
            </Badge>
          )}
        </div>
        
        <h3 className="text-lg font-bold">{car.title}</h3>
        
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          {metadata.price && (
            <div className="text-sm">
              <span className="font-semibold">Price:</span> {metadata.price}
            </div>
          )}
          {metadata.mileage && (
            <div className="text-sm">
              <span className="font-semibold">Mileage:</span> {metadata.mileage}
            </div>
          )}
          {metadata.location && (
            <div className="text-sm col-span-2">
              <span className="font-semibold">Location:</span> {metadata.location}
            </div>
          )}
        </div>
        
        {metadata.notes && (
          <div className="mt-2 bg-gray-50 p-2 rounded-md">
            <p className="text-sm line-clamp-2">{metadata.notes}</p>
          </div>
        )}
        
        <div className="mt-auto pt-4 flex flex-wrap gap-3">
          <Button 
            onClick={onShowDetails}
            className="transition-transform hover:scale-105"
          >
            View Details
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onToggleSelect}
            className={`transition-all ${
              isSelected 
                ? 'bg-motortrend-red/10 text-motortrend-red border-motortrend-red/30' 
                : 'hover:bg-gray-100'
            }`}
          >
            {isSelected ? 'Selected for Compare' : 'Compare'}
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-gray-500 hover:text-motortrend-red transition-colors ml-auto" 
            onClick={() => onUnsave(car.id)}
          >
            <Trash className="mr-1" size={16} /> Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Garage;
