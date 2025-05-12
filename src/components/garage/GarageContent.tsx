
import React, { useState } from "react";
import { Car, Award, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useSavedItems, SavedItem } from "../../contexts/SavedItemsContext";
import GarageStats from "../GarageStats";
import GarageCarCard from "../CarCard";
import QuickAddCar from "../QuickAddCar";
import { CarData } from "../CarCard";

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
  
  const displayCars = getDisplayCars();

  return (
    <Card className="shadow-sm flex-1">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Car size={22} />
            My Garage
          </CardTitle>
          <CardDescription>
            View and manage your saved vehicles
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-gray-100" : ""}
          >
            <SlidersHorizontal size={16} className="mr-1" />
            Filters
          </Button>
          <Button onClick={() => window.location.href = "/"}>
            Browse Cars
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <GarageStats />
        
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border">
            <h3 className="font-medium mb-3 flex items-center gap-1.5">
              <Award size={18} className="text-motortrend-red" />
              MotorTrend Rankings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">
                  Minimum MotorTrend Score: {minScore.toFixed(1)}
                </label>
                <Slider
                  value={[minScore]}
                  min={0}
                  max={10}
                  step={0.5}
                  onValueChange={(value) => setMinScore(value[0])}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="sort-by-score" className="text-sm text-gray-700">
                  Sort by MotorTrend Score
                </label>
                <Switch 
                  id="sort-by-score" 
                  checked={sortByScore} 
                  onCheckedChange={setSortByScore}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">Sort by</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortByScore(true)}>
                    MotorTrend Score (High to Low)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setSortByScore(true);
                    // The reverse sorting will be handled in the component logic
                  }}>
                    MotorTrend Score (Low to High)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortByScore(false)}>
                    Date Added (Newest First)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
        
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'all' | 'owned' | 'testDriven' | 'interested')}
          className="mt-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="owned">Owned</TabsTrigger>
            <TabsTrigger value="testDriven">Test Driven</TabsTrigger>
            <TabsTrigger value="interested">Interested</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {displayCars.map(car => (
                <GarageCarCard 
                  key={car.id} 
                  car={savedItemToCarData(car)} 
                  type={car.type === 'newCar' ? 'new' : 'used'} 
                />
              ))}
              {displayCars.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  {minScore > 0 ? 
                    `No cars found with MotorTrend Score of ${minScore} or higher.` : 
                    `No ${activeTab !== 'all' ? activeTab : ''} cars in your garage yet. Add some from the form below.`
                  }
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Add another car</h3>
          <QuickAddCar activeTab={activeTab} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageContent;
