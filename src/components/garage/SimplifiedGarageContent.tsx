import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useSavedItems, SavedItem, SavedItemType } from "../../contexts/SavedItemsContext";
import CarCard from "../CarCard";
import { CarData } from "../CarCard";
import { toast } from "@/components/ui/use-toast";
import { 
  Car, 
  Key, 
  Eye, 
  Heart, 
  Search, 
  Filter, 
  BarChart3 as Compare,
  Share2,
  Trophy,
  Star,
  TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import CarComparisonTable from "./CarComparisonTable";

const SimplifiedGarageContent = () => {
  const { savedItems } = useSavedItems();
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'testDriven' | 'interested'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
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
      bodyStyle: item.metadata?.bodyStyle as 'SUV' | 'Sedan' | 'Truck' | 'Sports Car' | 'Minivan' | 'Crossover' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon',
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
      motorTrendCategoryRank: item.metadata?.motorTrendCategoryRank,
      userReviewsScore: item.metadata?.userReviewsScore || '8.5'
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
    
    return filteredCars;
  };

  // Handler for toggling car selection for comparison
  const handleToggleCarForComparison = (carId: string) => {
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

  // Calculate stats for tabs
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  // Quick stats for header
  const totalValue = savedCars.reduce((sum, car) => {
    const price = car.metadata?.price;
    if (typeof price === 'string' && price.includes('$')) {
      return sum + (parseFloat(price.replace(/[^0-9.]/g, '')) || 0);
    }
    return sum;
  }, 0);

  const avgScore = savedCars.reduce((sum, car) => {
    const score = car.metadata?.motorTrendScore;
    const numericScore = typeof score === 'string' ? parseFloat(score) : score;
    return sum + (numericScore || 0);
  }, 0) / (savedCars.length || 1);

  return (
    <div className="w-full space-y-6">
      {/* Simple Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-motortrend-dark">My Garage</h1>
        <p className="text-neutral-3">Manage your saved vehicles and track your automotive journey</p>
        
        {/* Quick Stats */}
        {savedCars.length > 0 && (
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-motortrend-dark">{savedCars.length}</div>
              <div className="text-neutral-4">Vehicles</div>
            </div>
            {totalValue > 0 && (
              <div className="text-center">
                <div className="font-bold text-lg text-green-600">${totalValue.toLocaleString()}</div>
                <div className="text-neutral-4">Total Value</div>
              </div>
            )}
            <div className="text-center">
              <div className="font-bold text-lg text-blue-600">{avgScore.toFixed(1)}</div>
              <div className="text-neutral-4">Avg Score</div>
            </div>
          </div>
        )}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-4" />
          <Input
            placeholder="Search your vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {selectedCars.length > 0 && (
            <Button onClick={handleCompare} className="gap-2">
              <Compare className="h-4 w-4" />
              Compare ({selectedCars.length})
            </Button>
          )}
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Garage
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="gap-2">
            <Car className="h-4 w-4" />
            All <Badge variant="secondary" className="ml-1">{savedCars.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="owned" className="gap-2">
            <Key className="h-4 w-4" />
            Owned <Badge variant="secondary" className="ml-1">{ownedCount}</Badge>
          </TabsTrigger>
          <TabsTrigger value="testDriven" className="gap-2">
            <Eye className="h-4 w-4" />
            Test Drive List <Badge variant="secondary" className="ml-1">{testDrivenCount}</Badge>
          </TabsTrigger>
          <TabsTrigger value="interested" className="gap-2">
            <Heart className="h-4 w-4" />
            Interested <Badge variant="secondary" className="ml-1">{interestedCount}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={activeTab} className="mt-6">
          {showComparison ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Vehicle Comparison</CardTitle>
                <Button variant="outline" onClick={() => setShowComparison(false)}>
                  Back to Garage
                </Button>
              </CardHeader>
              <CardContent>
                <CarComparisonTable cars={getSelectedCarData()} />
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Context-specific content */}
              {activeTab === 'owned' && ownedCount > 0 && (
                <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-green-800">Vehicle Management</h3>
                        <p className="text-sm text-green-600">Track modifications, maintenance, and performance</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-green-300">
                        <Trophy className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'interested' && interestedCount > 0 && (
                <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-800">Research Tools</h3>
                        <p className="text-sm text-blue-600">Compare specs, read reviews, and find dealers</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-blue-300">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Market Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Vehicle Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCars.length > 0 ? (
                  displayCars.map(car => {
                    const carData = savedItemToCarData(car);
                    return (
                                             <div key={car.id} className="relative">
                         <CarCard
                           car={carData}
                           type={car.type === 'newCar' ? 'new' : 'used'}
                         />
                         {/* Selection overlay for comparison */}
                         <div className="absolute top-2 right-2">
                           <Button
                             size="sm"
                             variant={selectedCars.includes(car.id) ? "default" : "outline"}
                             onClick={(e) => {
                               e.stopPropagation();
                               handleToggleCarForComparison(car.id);
                             }}
                           >
                             {selectedCars.includes(car.id) ? "Selected" : "Select"}
                           </Button>
                         </div>
                       </div>
                    );
                  })
                ) : (
                  <Card className="col-span-full bg-neutral-8 border-neutral-6">
                    <CardContent className="p-8 text-center">
                      <Car className="h-12 w-12 text-neutral-4 mx-auto mb-4" />
                      <h3 className="font-semibold text-neutral-2 mb-2">
                        {activeTab === 'all' ? 'No vehicles in your garage' : `No ${activeTab} vehicles`}
                      </h3>
                      <p className="text-neutral-4 mb-4">
                        {activeTab === 'all' 
                          ? 'Start building your garage by browsing and saving vehicles'
                          : `You haven't marked any vehicles as ${activeTab} yet`
                        }
                      </p>
                      <Button variant="outline">
                        Browse Vehicles
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimplifiedGarageContent; 