import React from "react";
import CarCard from "../CarCard";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { CarData } from "../CarCard/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Car } from "lucide-react";
import GarageStats from "../GarageStats";

interface GarageTabContentProps {
  activeTab: 'all' | 'owned' | 'testDriven' | 'interested';
  onTabChange: (value: 'all' | 'owned' | 'testDriven' | 'interested') => void;
  displayCars: SavedItem[];
  savedItemToCarData: (item: SavedItem) => CarData;
  minScore: number;
}

// Sample car data that matches the format in BuyersGuide
const sampleCars: CarData[] = [
  {
    id: 'honda-1',
    title: '2025 Honda Accord',
    price: '$29,500',
    msrp: '$29,500',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    isNew: true,
    year: "2025",
    category: 'Sedan',
    fuelType: 'Gasoline',
    mpg: '30 city / 38 hwy',
    engine: '1.5L Turbo 4-cylinder',
    horsepower: '192 hp',
    transmission: 'CVT',
    motorTrendScore: '8.8',
    motorTrendRank: '2',
    motorTrendCategoryRank: true
  },
  {
    id: 'lucid-1',
    title: '2025 Lucid Air Grand Touring',
    price: '$87,400',
    msrp: '$87,400',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67eebefe5107540008d18c50/020-2025-lucid-air-pure.jpg',
    isNew: true,
    year: "2025",
    category: 'Luxury Sedan',
    fuelType: 'Electric',
    range: '516 miles',
    mpge: '131 MPGe',
    motorTrendScore: '9.2',
    motorTrendRank: '#1',
    motorTrendCategoryRank: true
  }
];

const GarageTabContent: React.FC<GarageTabContentProps> = ({
  activeTab,
  onTabChange,
  displayCars,
  savedItemToCarData,
  minScore
}) => {
  // Ensure all car data has an ID
  const validateCarData = (item: SavedItem): boolean => {
    return !!item.id && !!item.title && !!item.type;
  };

  // Filter out any invalid car data
  const validCars = displayCars.filter(validateCarData);
  
  // Convert saved items to car data with enhanced specs
  const enhancedCarData = validCars.map(car => {
    const baseCarData = savedItemToCarData(car);
    
    // For new cars, ensure they have all the necessary specs
    if (car.type === 'newCar' || baseCarData.isNew) {
      // Find a matching sample car to use as a template
      const matchingSample = sampleCars.find(sample => 
        sample.title.toLowerCase().includes(baseCarData.title.toLowerCase()) ||
        baseCarData.title.toLowerCase().includes(sample.title.toLowerCase())
      );
      
      // If we found a match, use its specs
      if (matchingSample) {
        return {
          ...baseCarData,
          msrp: baseCarData.msrp || matchingSample.msrp,
          mpg: baseCarData.mpg || matchingSample.mpg,
          mpge: baseCarData.mpge || matchingSample.mpge,
          range: baseCarData.range || matchingSample.range,
          engine: baseCarData.engine || matchingSample.engine,
          horsepower: baseCarData.horsepower || matchingSample.horsepower,
          transmission: baseCarData.transmission || matchingSample.transmission,
          motorTrendScore: baseCarData.motorTrendScore || matchingSample.motorTrendScore,
          motorTrendRank: baseCarData.motorTrendRank || matchingSample.motorTrendRank,
          motorTrendCategoryRank: baseCarData.motorTrendCategoryRank || matchingSample.motorTrendCategoryRank
        };
      }
      
      // If no match, use default values for a new car
      return {
        ...baseCarData,
        msrp: baseCarData.msrp || '$' + Math.floor(25000 + Math.random() * 40000).toLocaleString(),
        mpg: baseCarData.mpg || (baseCarData.fuelType === 'Electric' ? null : '28 city / 36 hwy'),
        mpge: baseCarData.mpge || (baseCarData.fuelType === 'Electric' ? '120 MPGe' : null),
        range: baseCarData.range || (baseCarData.fuelType === 'Electric' ? '300 miles' : null),
        engine: baseCarData.engine || (baseCarData.fuelType === 'Electric' ? 'Electric Motor' : '2.0L 4-cylinder'),
        horsepower: baseCarData.horsepower || '200 hp',
        transmission: baseCarData.transmission || (baseCarData.fuelType === 'Electric' ? 'Single-speed' : 'Automatic'),
        motorTrendScore: baseCarData.motorTrendScore || '8.5',
        motorTrendRank: baseCarData.motorTrendRank || '#3',
        motorTrendCategoryRank: baseCarData.motorTrendCategoryRank || true
      };
    }
    
    return baseCarData;
  });

  return (
    <div>
      {/* Improved Stats/Tabs Section */}
      <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-motortrend-dark">Your Vehicles</h2>
          <div className="text-sm text-gray-500">
            {validCars.length} {validCars.length === 1 ? 'vehicle' : 'vehicles'}
          </div>
        </div>
        
        <GarageStats activeTab={activeTab} onTabChange={onTabChange} />
        
        {validCars.length > 0 && (
          <Alert className="mt-4 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Click on any vehicle card to view detailed specifications and reviews.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      {/* Car Grid - Updated to show 2 columns on desktop */}
      {validCars.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enhancedCarData.map(car => (
            <CarCard 
              key={car.id} 
              car={car} 
              type={car.isNew ? 'new' : 'used'} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border shadow-sm">
          <Car size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {activeTab === 'all' ? 'No vehicles in your garage' : `No ${activeTab} vehicles`}
          </h3>
          <p className="text-gray-500 mb-6">
            {activeTab === 'all' 
              ? 'Start building your garage by adding your first vehicle'
              : `Add vehicles and mark them as ${activeTab} to see them here`
            }
          </p>
          <div className="max-w-sm mx-auto">
            {/* QuickAddCar would go here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default GarageTabContent;
