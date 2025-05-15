import React, { useState } from "react";
import { Car, Award, SlidersHorizontal, ArrowLeftRight } from "lucide-react";
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
import UserReviews from "./UserReviews";
import QuickAddCar from "../QuickAddCar";
import GarageCompare from "../GarageCompare";
import { CarData } from "../CarCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
            </>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {/* Comparison View */}
        {showComparison ? (
          <div className="mt-2">
            <CarComparisonTable cars={selectedCarData} />
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

// Car Comparison Table Component
const CarComparisonTable: React.FC<{ cars: CarData[] }> = ({ cars }) => {
  // Get all possible specs across all cars
  const getSpecCategories = () => {
    const categories: Record<string, string[]> = {
      'Basic Info': ['year', 'mileage', 'price', 'category'],
      'Performance': ['horsepowerTorque', 'fuelType', 'drivetrain', 'zeroToSixty', 'topSpeed', 'weightPowerRatio'],
      'Capacity': ['passengerCapacity', 'cargoCapacity', 'cargoCapacityFolded', 'trunkCapacity', 'towingCapacity', 'payloadCapacity'],
      'Features': ['seatingConfiguration', 'slidingDoorFeatures', 'familyFeatures', 'bedDimensions', 'safetyRating'],
      'MotorTrend': ['motorTrendScore', 'motorTrendRank', 'motorTrendCategoryRank']
    };
    return categories;
  };

  // Format spec value for display
  const formatSpecValue = (car: CarData, spec: string): string => {
    const value = car[spec as keyof CarData];
    
    // Handle specific formatting for some specs
    if (spec === 'motorTrendScore' && typeof value === 'number') {
      return value.toFixed(1);
    }
    
    if (value === undefined || value === null) {
      return 'N/A';
    }
    
    return String(value);
  };

  // Find the best value in a category (like highest MotorTrend score)
  const getBestValueClass = (cars: CarData[], spec: string, value: string): string => {
    if (spec === 'motorTrendScore' || spec === 'motorTrendRank' || spec === 'motorTrendCategoryRank') {
      const numericValues = cars.map(car => {
        const val = car[spec as keyof CarData];
        return typeof val === 'number' ? val : 0;
      });
      
      if (numericValues.length === 0) return '';
      
      // For rank, lower is better
      if (spec.includes('Rank')) {
        const bestValue = Math.min(...numericValues.filter(v => v > 0));
        if (bestValue === parseFloat(value)) return 'font-bold text-green-700';
      } 
      // For scores, higher is better
      else {
        const bestValue = Math.max(...numericValues);
        if (bestValue === parseFloat(value)) return 'font-bold text-green-700';
      }
    }
    
    return '';
  };

  const formatSpecLabel = (spec: string): string => {
    // Convert camelCase to Title Case with spaces
    return spec
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Get all spec categories
  const specCategories = getSpecCategories();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeftRight size={18} className="text-motortrend-red" />
        <h3 className="font-bold">Comparing {cars.length} Vehicles</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Specification</TableHead>
              {cars.map(car => (
                <TableHead key={car.id} className="min-w-[200px]">
                  {car.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(specCategories).map(([category, specs]) => (
              <React.Fragment key={category}>
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={cars.length + 1} className="font-bold">
                    {category}
                  </TableCell>
                </TableRow>
                {specs.map(spec => (
                  <TableRow key={spec}>
                    <TableCell className="font-medium">{formatSpecLabel(spec)}</TableCell>
                    {cars.map(car => {
                      const value = formatSpecValue(car, spec);
                      const bestValueClass = getBestValueClass(cars, spec, value);
                      return (
                        <TableCell key={`${car.id}-${spec}`} className={bestValueClass}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GarageContent;
