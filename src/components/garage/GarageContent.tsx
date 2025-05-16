
import React from "react";
import { CardContent, CardHeader, Card } from "@/components/ui/card";
import { useSavedItems } from "../../contexts/SavedItemsContext";
import CarComparisonTable from "./CarComparisonTable";
import { useGarageFilters } from "./hooks/useGarageFilters";
import { useCarComparison } from "./hooks/useCarComparison";
import { useGarageView } from "./hooks/useGarageView";
import { savedItemToCarData } from "./utils/carDataConverter";
import GarageContentHeader from "./GarageContentHeader";
import GarageMainView from "./GarageMainView";

const GarageContent = () => {
  const { savedItems } = useSavedItems();
  
  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Setup hooks for garage functionality
  const { 
    minScore, setMinScore, 
    sortByScore, setSortByScore, 
    showFilters, toggleFilters 
  } = useGarageFilters();
  
  const { 
    selectedCars, 
    showComparison, 
    toggleCarForComparison, 
    startComparison, 
    exitComparison,
    getSelectedCarData 
  } = useCarComparison(savedCars, savedItemToCarData);
  
  const { activeTab, setActiveTab, getDisplayCars } = useGarageView(savedCars);
  
  // Get the cars to display based on filters
  const displayCars = getDisplayCars(minScore, sortByScore);

  return (
    <Card className="shadow-sm flex-1">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <GarageContentHeader
          showComparison={showComparison}
          showFilters={showFilters}
          minScore={minScore}
          sortByScore={sortByScore}
          onToggleFilters={toggleFilters}
          onMinScoreChange={setMinScore}
          onSortByScoreChange={setSortByScore}
          onExitComparison={exitComparison}
        />
      </CardHeader>

      <CardContent>
        {/* Comparison View */}
        {showComparison ? (
          <div className="mt-2">
            <CarComparisonTable cars={getSelectedCarData()} />
          </div>
        ) : (
          // Regular Garage View
          <GarageMainView
            activeTab={activeTab}
            onTabChange={setActiveTab}
            displayCars={displayCars}
            savedCars={savedCars}
            selectedCars={selectedCars}
            minScore={minScore}
            onToggleCar={toggleCarForComparison}
            onCompare={startComparison}
            savedItemToCarData={savedItemToCarData}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GarageContent;
