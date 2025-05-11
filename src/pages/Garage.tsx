
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSavedItems, SavedItem } from "../contexts/SavedItemsContext";
import MainNavigation from "../components/MainNavigation";
import { useIsMobile } from "../hooks/use-mobile";
import SearchBar from "../components/SearchBar";
import { Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GarageQuickAdd from "../components/GarageQuickAdd";

// Import refactored components
import ProfileSidebar from "../components/garage/ProfileSidebar";
import GarageFilterTabs from "../components/garage/GarageFilterTabs";
import GarageCars from "../components/garage/GarageCars";
import EmptyGarage from "../components/garage/EmptyGarage";

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

  const handleAddCar = (
    carSelection: { makeId: string | null, modelId: string | null, year: number | null },
    ownership: 'owned' | 'interested' | 'testDriven'
  ) => {
    if (!carSelection.makeId || !carSelection.modelId) {
      toast({
        title: "Selection required",
        description: "Please select at least a make and model",
        variant: "destructive"
      });
      return;
    }

    // This would normally fetch actual car data from an API
    const make = carSelection.makeId;
    const model = carSelection.modelId;
    const year = carSelection.year || new Date().getFullYear();

    const newCarId = `car-${Date.now()}`;
    const carTitle = `${year} ${make} ${model}`;

    updateSavedItem(newCarId, {
      id: newCarId,
      title: carTitle,
      type: 'newCar',
      imageUrl: '/placeholder.svg',
      savedAt: new Date().toISOString(),
      metadata: {
        price: 'Contact dealer',
        category: 'Vehicle',
        year: year.toString(),
        ownership: ownership,
        notes: `Added on ${new Date().toLocaleDateString()}`
      }
    });

    toast({
      title: "Car added to garage",
      description: `${carTitle} was added to your ${ownership} collection.`,
    });
    
    // Change tab to the one where the car was added
    setActiveTab(ownership);
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
          <ProfileSidebar 
            userData={userData}
            savedCars={savedCars}
            countByOwnership={countByOwnership}
            selectedCars={selectedCars}
            onToggleCar={handleToggleSelectCar}
            onCompare={handleCompare}
          />
          
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
                  <GarageFilterTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    countAll={savedCars.length}
                    countOwned={countByOwnership('owned')}
                    countTestDriven={countByOwnership('testDriven')}
                    countInterested={countByOwnership('interested')}
                  />
                )}
                
                {/* Car listing */}
                {filteredCars.length === 0 ? (
                  <EmptyGarage 
                    onAddCar={handleAddCar}
                    noMatchingCars={savedCars.length > 0}
                    activeTab={activeTab}
                  />
                ) : (
                  <GarageCars 
                    filteredCars={filteredCars}
                    selectedCars={selectedCars}
                    selectedCarDetails={selectedCarDetails}
                    onUnsave={handleUnsave}
                    onToggleSelect={handleToggleSelectCar}
                    onShowDetails={handleShowCarDetails}
                    onUpdateCar={handleUpdateCar}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Garage;
