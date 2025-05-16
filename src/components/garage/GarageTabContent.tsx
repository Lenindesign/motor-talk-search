
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GarageCarCard from "../CarCard";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { CarData } from "../CarCard";

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
  return (
    <Tabs 
      defaultValue="all" 
      value={activeTab} 
      onValueChange={(value) => onTabChange(value as 'all' | 'owned' | 'testDriven' | 'interested')}
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
  );
};

export default GarageTabContent;
