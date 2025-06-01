import React from "react";
import CarCard from "../CarCard";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { CarData } from "../CarCard/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
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
    <div className="mt-6">
      <GarageStats activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Notification alert for proper car viewing */}
      {validCars.length > 0 && (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Click on any vehicle card to view detailed information on the research page.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Responsive grid for car cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {validCars.length > 0 ? (
          enhancedCarData.map(car => (
            <CarCard 
              key={car.id} 
              car={car} 
              type={car.isNew ? 'new' : 'used'} 
            />
          ))
        ) : (
          <div className="text-center p-6 col-span-full bg-white rounded-xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-1">You have no cars in your garage</h3>
            <p className="text-gray-600">Add your first car by using the button above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GarageTabContent;