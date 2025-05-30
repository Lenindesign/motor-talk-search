
import React from "react";
import GarageCarCard from "../CarCard";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { CarData } from "../CarCard";
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
          validCars.map(car => (
            <GarageCarCard 
              key={car.id} 
              car={savedItemToCarData(car)} 
              type={car.type === 'newCar' ? 'new' : 'used'} 
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8 col-span-full">
            {minScore > 0 
              ? `No cars found with MotorTrend Score of ${minScore} or higher.` 
              : `No ${activeTab === 'testDriven' ? 'Test Drive' : activeTab !== 'all' ? activeTab : ''} cars in your garage yet. Add some from the form below.`
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default GarageTabContent;
