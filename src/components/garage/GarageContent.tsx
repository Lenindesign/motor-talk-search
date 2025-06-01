import React, { useState, useEffect } from "react";
import { Car, BookOpen, Sparkles, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSavedItems, SavedItem, SavedItemType } from "../../contexts/SavedItemsContext";
import CarComparisonTable from "./CarComparisonTable";
import GarageCompare from "../GarageCompare";
import QuickAddCar from "../QuickAddCar";
import { CarData } from "../CarCard";
import GarageFilters from "./GarageFilters";
import GarageTabContent from "./GarageTabContent";
import CarsYouMayLike from "./CarsYouMayLike";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import ArticleCard from "../ArticleCard";

// Sample articles related to cars (in a real app, these would come from an API)
const relatedArticles = [{
  id: 'art1',
  title: 'Best SUVs for Families in 2025',
  category: 'SUV',
  excerpt: 'Looking for a family-friendly SUV? Here are our top picks for 2025...',
  imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
  date: '2025-03-15'
}, {
  id: 'art2',
  title: 'Electric Vehicle Maintenance: What You Need to Know',
  category: 'EV',
  excerpt: 'Maintaining an electric vehicle is different from traditional cars. Learn the essentials...',
  imageUrl: '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
  date: '2025-03-10'
}, {
  id: 'art3',
  title: 'Sports Car Buyer\'s Guide: Performance on a Budget',
  category: 'Sports Car',
  excerpt: 'Get thrilling performance without breaking the bank with these affordable sports cars...',
  imageUrl: '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
  date: '2025-03-05'
}];
const GarageContent = () => {
  const {
    savedItems
  } = useSavedItems();
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'testDriven' | 'interested'>('all');

  // Add filtering states
  const [minScore, setMinScore] = useState<number>(0);
  const [sortByScore, setSortByScore] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Comparison states
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  // Content view states
  const [contentView, setContentView] = useState<'garage' | 'articles'>('garage');

  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');

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
      // New car specs
      msrp: item.metadata?.msrp,
      mpg: item.metadata?.mpg,
      mpge: item.metadata?.mpge,
      range: item.metadata?.range,
      engine: item.metadata?.engine,
      horsepower: item.metadata?.horsepower,
      transmission: item.metadata?.transmission,
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
      // Select up to 4 cars
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
    return savedCars.filter(car => selectedCars.includes(car.id)).map(car => savedItemToCarData(car));
  };

  // Filter articles related to user's saved cars
  const getRelatedArticles = () => {
    // Get car categories from saved cars
    const carCategories = savedCars.map(car => {
      if (car.metadata?.bodyStyle) return car.metadata.bodyStyle;
      if (car.title.toLowerCase().includes('suv')) return 'SUV';
      if (car.title.toLowerCase().includes('sedan')) return 'Sedan';
      if (car.title.toLowerCase().includes('truck')) return 'Truck';
      if (car.title.toLowerCase().includes('electric') || car.title.toLowerCase().includes('ev')) return 'EV';
      return 'Car';
    });

    // Filter articles that match car categories (in a real app, this would be more sophisticated)
    const uniqueCategories = Array.from(new Set(carCategories));
    return relatedArticles.filter(article => uniqueCategories.some(category => article.category.toLowerCase() === category.toLowerCase() || article.title.toLowerCase().includes(category.toLowerCase())));
  };
  const displayCars = getDisplayCars();
  const filteredArticles = getRelatedArticles();
  const navigate = useNavigate();
  return <div className="">
      <Card className="py-0">
        <CardHeader className="p-6 pb-0">
          <div className="text-center px-4 py-2">
            <CardTitle className="flex items-center justify-center gap-2 typography-title text-color-neutral-1 text-5xl mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor">
                <path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z" />
              </svg>
              {showComparison ? "Car Comparison" : "My Garage"}
            </CardTitle>
            <CardDescription className="typography-body text-color-neutral-4 text-center text-lg mb-2">
              {showComparison ? "Compare your selected vehicles side by side" : "View, manage, and get insights about your vehicles"}
            </CardDescription>
          </div>
          
          <div className="flex gap-2 justify-center md:justify-end">
            {showComparison ? <Button variant="outline" onClick={() => setShowComparison(false)} size="sm">
                Back to Garage
              </Button> : <>
                <div className="flex gap-2">
                  
                </div>
                
                {contentView === 'garage' && <GarageFilters minScore={minScore} sortByScore={sortByScore} showFilters={showFilters} onMinScoreChange={setMinScore} onSortByScoreChange={setSortByScore} onToggleFilters={() => setShowFilters(!showFilters)} />}
              </>}
          </div>
        </CardHeader>

        <CardContent className="pt-0 px-[8px] -mt-14">
          {/* Comparison View */}
          {showComparison ? <div className="mt-2">
              <CarComparisonTable cars={getSelectedCarData()} />
            </div> : (/* Regular Garage View */
        <>
              {contentView === 'garage' && <>
                  {/* Add Another Car - More compact on mobile */}
                  <div className="mb-2 md:mb-3">
                    <QuickAddCar activeTab={activeTab} />
                  </div>
                  
                  <GarageTabContent activeTab={activeTab} onTabChange={setActiveTab} displayCars={displayCars} savedItemToCarData={savedItemToCarData} minScore={minScore} />
                  
                  {/* Compare Cars */}
                  <div className="mt-4">
                    <GarageCompare savedCars={savedCars} selectedCars={selectedCars} onToggleCar={(id, type) => handleToggleCarForComparison(id, type)} onCompare={handleCompare} />
                  </div>
                </>}
              
              <CarsYouMayLike />
              
              {contentView === 'articles' && <div className="mt-6">
                  <h3 className="typography-title text-color-neutral-1 mb-4">Articles Related to Your Garage</h3>
                  {filteredArticles.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredArticles.map(article => <ArticleCard key={article.id} article={{
                id: article.id,
                title: article.title,
                imageUrl: article.imageUrl,
                date: article.date,
                category: article.category
              }} />)}
                    </div> : <div className="text-center py-10 bg-color-neutral-7 rounded-lg">
                      <BookOpen size={48} className="mx-auto text-color-neutral-5 mb-4" />
                      <h3 className="typography-subtitle1 text-color-neutral-2 mb-2">No related articles</h3>
                      <p className="typography-body text-color-neutral-4 max-w-md mx-auto">
                        Add cars to your garage to see articles related to your vehicles
                      </p>
                    </div>}
                </div>}
            </>)}
        </CardContent>
      </Card>
    </div>;
};
export default GarageContent;