import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSavedItems, SavedItem, SavedItemType } from "../../contexts/SavedItemsContext";
import CarComparisonTable from "./CarComparisonTable";
import { CarData } from "../CarCard";
import GarageTabContent from "./GarageTabContent";
import CarsYouMayLike from "./CarsYouMayLike";
import { toast } from "@/components/ui/use-toast";
import GarageHeader from "./GarageHeader";
import GarageActionBar from "./GarageActionBar";
import GarageComparisonSection from "./GarageComparisonSection";

const GarageContent = () => {
  const { savedItems } = useSavedItems();
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'testDriven' | 'interested'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minScore, setMinScore] = useState<number>(0);
  const [sortByScore, setSortByScore] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');

  // Helper function to convert SavedItem to CarData format
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
      msrp: item.metadata?.msrp,
      mpg: item.metadata?.mpg,
      mpge: item.metadata?.mpge,
      range: item.metadata?.range,
      engine: item.metadata?.engine,
      horsepower: item.metadata?.horsepower,
      transmission: item.metadata?.transmission,
      cargoCapacity: item.metadata?.cargoCapacity,
      cargoCapacityFolded: item.metadata?.cargoCapacityFolded,
      passengerCapacity: item.metadata?.passengerCapacity,
      seatingConfiguration: item.metadata?.seatingConfiguration,
      trunkCapacity: item.metadata?.trunkCapacity,
      safetyRating: item.metadata?.safetyRating,
      horsepowerTorque: item.metadata?.horsepowerTorque,
      towingCapacity: item.metadata?.towingCapacity,
      payloadCapacity: item.metadata?.payloadCapacity,
      bedDimensions: item.metadata?.bedDimensions,
      powertrainOptions: item.metadata?.powertrainOptions,
      zeroToSixty: item.metadata?.zeroToSixty,
      topSpeed: item.metadata?.topSpeed,
      weightPowerRatio: item.metadata?.weightPowerRatio,
      slidingDoorFeatures: item.metadata?.slidingDoorFeatures,
      familyFeatures: item.metadata?.familyFeatures,
      motorTrendRank: item.metadata?.motorTrendRank,
      motorTrendScore: item.metadata?.motorTrendScore,
      motorTrendCategoryRank: item.metadata?.motorTrendCategoryRank
    };
  };

  // Enhanced filter and sort cars with search functionality
  const getDisplayCars = () => {
    let filteredCars = [...savedCars];

    // Filter by tab
    if (activeTab !== 'all') {
      filteredCars = filteredCars.filter(car => car.metadata?.ownership === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filteredCars = filteredCars.filter(car => 
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        car.metadata?.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by minimum score
    if (minScore > 0) {
      filteredCars = filteredCars.filter(car => (car.metadata?.motorTrendScore || 0) >= minScore);
    }

    // Sort by score if enabled
    if (sortByScore) {
      filteredCars.sort((a, b) => (b.metadata?.motorTrendScore || 0) - (a.metadata?.motorTrendScore || 0));
    }
    
    return filteredCars;
  };

  // Handler for toggling car selection for comparison
  const handleToggleCarForComparison = (carId: string, carType: SavedItemType) => {
    if (carId === 'ALL_SELECT') {
      setSelectedCars(savedCars.slice(0, 4).map(car => car.id));
      return;
    }
    if (carId === 'ALL_DESELECT') {
      setSelectedCars([]);
      return;
    }
    
    setSelectedCars(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      } else {
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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <GarageHeader />
        <GarageActionBar 
          activeTab={activeTab}
          minScore={minScore}
          sortByScore={sortByScore}
          showFilters={showFilters}
          onMinScoreChange={setMinScore}
          onSortByScoreChange={setSortByScore}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
      </div>

      {/* Main Content */}
      {showComparison ? (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-motortrend-dark">Car Comparison</h2>
            <Button variant="outline" onClick={() => setShowComparison(false)}>
              Back to Garage
            </Button>
          </div>
          <CarComparisonTable cars={getSelectedCarData()} />
        </div>
      ) : (
        <>
          {/* Tab Content */}
          <div className="mb-6">
            <GarageTabContent 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              displayCars={displayCars} 
              savedItemToCarData={savedItemToCarData} 
              minScore={minScore} 
            />
          </div>

          {/* Compare Section */}
          <GarageComparisonSection 
            savedCars={savedCars}
            selectedCars={selectedCars}
            onToggleCar={handleToggleCarForComparison}
            onCompare={handleCompare}
          />

          {/* Recommendations */}
          <CarsYouMayLike />
        </>
      )}
    </div>
  );
};

export default GarageContent;
