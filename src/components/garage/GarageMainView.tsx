
import React from "react";
import { SavedItem } from "../../contexts/SavedItemsContext";
import GarageStats from "../GarageStats";
import GarageCompare from "../GarageCompare";
import UserReviews from "./UserReviews";
import QuickAddCar from "../QuickAddCar";
import { GarageTab } from "./hooks/useGarageView";
import GarageTabContent from "./GarageTabContent";
import { CarData } from "../CarCard";

interface GarageMainViewProps {
  activeTab: GarageTab;
  onTabChange: (tab: GarageTab) => void;
  displayCars: SavedItem[];
  savedCars: SavedItem[];
  selectedCars: string[];
  minScore: number;
  onToggleCar: (carId: string) => void;
  onCompare: () => void;
  savedItemToCarData: (item: SavedItem) => CarData;
}

const GarageMainView: React.FC<GarageMainViewProps> = ({
  activeTab,
  onTabChange,
  displayCars,
  savedCars,
  selectedCars,
  minScore,
  onToggleCar,
  onCompare,
  savedItemToCarData
}) => {
  return (
    <>
      <GarageStats />
      
      {/* Comparison Selection */}
      <div className="mb-6">
        <GarageCompare
          savedCars={savedCars}
          selectedCars={selectedCars}
          onToggleCar={onToggleCar}
          onCompare={onCompare}
        />
      </div>
      
      <GarageTabContent 
        activeTab={activeTab}
        onTabChange={onTabChange}
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
  );
};

export default GarageMainView;
