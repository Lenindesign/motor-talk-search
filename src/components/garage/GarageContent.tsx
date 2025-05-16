
import React, { useState } from "react";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSavedItems, SavedItem } from "../../contexts/SavedItemsContext";
import GarageStats from "../GarageStats";
import CarComparisonTable from "./CarComparisonTable";
import GarageCompare from "../GarageCompare";
import UserReviews from "./UserReviews";
import QuickAddCar from "../QuickAddCar";
import { CarData } from "../CarCard";
import GarageFilters from "./GarageFilters";
import GarageTabContent from "./GarageTabContent";
import { toast } from "@/components/ui/use-toast";

const GarageContent = () => {
  const { savedItems } = useSavedItems();
  
  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Default tab is 'all'
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'testDriven' | 'interested'>('all');
  
  // Add filtering states
  const [minScore, setMinScore] = useState<number>(0);
  const [sortByScore, setSortByScore] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Comparison states
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  // Helper function to convert SavedItem to CarData format expected by GarageCarCard
  const savedItemToCarData = (item: SavedItem): CarData => {
    return {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl || '/placeholder.svg',
      price: item.metadata?.price || 'Contact dealer',
      category: item.metadata?.category || 'Car',
      year: item.metadata?.year,
      mileage: item.metadata?.mileage,
      fuelType: item.metadata?.fuelType,
      drivetrain: item.metadata?.drivetrain,
      location: item.metadata?.location,
      bodyStyle: item.metadata?.bodyStyle as any,
      isNew: item.type === 'newCar',
      
      // SUV specs
      cargoCapacity: item.metadata?.cargoCapacity,
      cargoCapacityFolded: item.metadata?.cargoCapacityFolded,
      passengerCapacity: item.metadata?.passengerCapacity,
      seatingConfiguration: item.metadata?.seatingConfiguration,
      
      // Sedan specs
      trunkCapacity: item.metadata?.trunkCapacity,
      safetyRating: item.metadata?.safetyRating,
      horsepowerTorque: item.metadata?.horsepowerTorque,
      
      // Truck specs
      towingCapacity: item.metadata?.towingCapacity,
      payloadCapacity: item.metadata?.payloadCapacity,
      bedDimensions: item.metadata?.bedDimensions,
      powertrainOptions: item.metadata?.powertrainOptions,
      
      // Sports Car specs
      zeroToSixty: item.metadata?.zeroToSixty,
      topSpeed: item.metadata?.topSpeed,
      weightPowerRatio: item.metadata?.weightPowerRatio,
      
      // Minivan specs
      slidingDoorFeatures: item.metadata?.slidingDoorFeatures,
      familyFeatures: item.metadata?.familyFeatures,
      
      // MotorTrend Rankings and Scores
      motorTrendRank: item.metadata?.motorTrendRank,
      motorTrendScore: item.metadata?.motorTrendScore,
      motorTrendCategoryRank: item.metadata?.motorTrendCategoryRank
    };
  };
  
  // Filter and sort cars based on user selections
  const getDisplayCars = () => {
    let filteredCars = [...savedCars];
    
    // Filter by tab
    if (activeTab !== 'all') {
      filteredCars = filteredCars.filter(car => car.metadata?.ownership === activeTab);
    }
    
    // Filter by minimum score
    if (minScore > 0) {
      filteredCars = filteredCars.filter(car => 
        (car.metadata?.motorTrendScore || 0) >= minScore
      );
    }
    
    // Sort by score if enabled
    if (sortByScore) {
      filteredCars.sort((a, b) => 
        (b.metadata?.motorTrendScore || 0) - (a.metadata?.motorTrendScore || 0)
      );
    }
    
    return filteredCars;
  };
  
  // Handler for toggling car selection for comparison
  const handleToggleCarForComparison = (carId: string) => {
    setSelectedCars(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      } else {
        // Limit to max 4 cars
        if (prev.length >= 4) {
          toast({
            title: "Comparison limit reached",
            description: "You can compare up to 4 cars at a time",
            variant: "destructive"
          });
          return prev;
        }
        return [...prev, carId];
      }
    });
  };

  // Handler to start comparison
  const handleCompare = () => {
    if (selectedCars.length < 2) {
      toast({
        title: "Select at least 2 cars",
        description: "You need to select at least 2 cars to compare",
        variant: "destructive"
      });
      return;
    }
    setShowComparison(true);
  };
  
  // Get car data for selected cars
  const getSelectedCarData = (): CarData[] => {
    return savedCars
      .filter(car => selectedCars.includes(car.id))
      .map(car => savedItemToCarData(car));
  };
  
  const displayCars = getDisplayCars();

  return (
    <Card className="shadow-sm flex-1">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Car size={22} />
            {showComparison ? "Car Comparison" : "My Garage"}
          </CardTitle>
          <CardDescription>
            {showComparison 
              ? "Compare your selected vehicles side by side" 
              : "View and manage your saved vehicles"}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {showComparison ? (
            <Button variant="outline" onClick={() => setShowComparison(false)}>
              Back to Garage
            </Button>
          ) : (
            <>
              <GarageFilters 
                minScore={minScore}
                sortByScore={sortByScore}
                showFilters={showFilters}
                onMinScoreChange={setMinScore}
                onSortByScoreChange={setSortByScore}
                onToggleFilters={() => setShowFilters(!showFilters)}
              />
              <Button onClick={() => window.location.href = "/"}>
                Browse Cars
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {/* Comparison View */}
        {showComparison ? (
          <div className="mt-2">
            <CarComparisonTable cars={getSelectedCarData()} />
          </div>
        ) : (
          // Regular Garage View
          <>
            <GarageStats />
            
            {/* Comparison Selection */}
            <div className="mb-6">
              <GarageCompare
                savedCars={savedCars}
                selectedCars={selectedCars}
                onToggleCar={handleToggleCarForComparison}
                onCompare={handleCompare}
              />
            </div>
            
            <GarageTabContent 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              displayCars={displayCars}
              savedItemToCarData={savedItemToCarData}
              minScore={minScore}
            />
            
            <UserReviews />
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Add another car</h3>
              <QuickAddCar activeTab={activeTab} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GarageContent;
