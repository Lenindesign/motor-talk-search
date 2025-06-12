
import React from "react";
import { useNavigate } from "react-router-dom";
import { SavedItem } from "../../contexts/SavedItemsContext";
import CarCard from "../CarCard";
import { savedItemToCarData } from "./carDataEnrichment";
import { Button } from "@/components/ui/button";
import { Plus, Car } from "lucide-react";

interface GarageVehicleGridProps {
  cars: SavedItem[];
  viewMode: 'grid' | 'list';
  emptyStateFilter: 'all' | 'owned' | 'testDriven' | 'interested';
}

const GarageVehicleGrid: React.FC<GarageVehicleGridProps> = ({
  cars,
  viewMode,
  emptyStateFilter
}) => {
  const navigate = useNavigate();

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-neutral-7 rounded-full flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 h-8 text-neutral-4" />
        </div>
        <h3 className="typography-subtitle text-neutral-2 mb-2">
          {emptyStateFilter === 'all' ? 'No vehicles in your garage' : 
           emptyStateFilter === 'owned' ? 'No owned vehicles' :
           emptyStateFilter === 'testDriven' ? 'No test driven vehicles' :
           'No vehicles you\'re interested in'}
        </h3>
        <p className="typography-body text-neutral-4 max-w-md mx-auto mb-6">
          {emptyStateFilter === 'all' 
            ? 'Start building your garage by saving vehicles you\'re interested in, have test driven, or own.'
            : `Add vehicles to the ${emptyStateFilter === 'testDriven' ? 'test driven' : emptyStateFilter} category.`
          }
        </p>
        <Button 
          onClick={() => navigate('/buyers-guide')}
          className="bg-neutral-1 text-white hover:bg-neutral-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Browse Vehicles
        </Button>
      </div>
    );
  }

  const gridClass = viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'
    : 'space-y-4';

  return (
    <div className={gridClass}>
      {cars.map(car => {
        const carData = savedItemToCarData(car);
        return (
          <CarCard
            key={car.id}
            car={carData}
            type={car.type === 'newCar' ? 'new' : 'used'}
            layout={viewMode === 'list' ? 'horizontal' : 'vertical'}
          />
        );
      })}
    </div>
  );
};

export default GarageVehicleGrid;
