import React from "react";
import { useNavigate } from "react-router-dom";
import { SavedItem } from "../../contexts/SavedItemsContext";
import CarCard from "../CarCard";
import { savedItemToCarData } from "./carDataEnrichment";
import { Button } from "@/components/ui/button";
import { Plus, Car, Search, Heart, Settings } from "lucide-react";

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

  const getEmptyStateContent = () => {
    switch (emptyStateFilter) {
      case 'all':
        return {
          icon: <Car className="w-12 h-12 text-neutral-3" />,
          title: "Start Building Your Garage",
          description: "Save vehicles you're interested in, track test drives, and manage your current cars all in one place.",
          buttonText: "Browse Vehicles",
          buttonAction: () => navigate('/buyers-guide')
        };
      case 'owned':
        return {
          icon: <Car className="w-12 h-12 text-green-500" />,
          title: "No Owned Vehicles Yet",
          description: "Add vehicles you currently own to track maintenance, plan upgrades, and manage your automotive portfolio.",
          buttonText: "Add Owned Vehicle",
          buttonAction: () => navigate('/buyers-guide')
        };
      case 'testDriven':
        return {
          icon: <Search className="w-12 h-12 text-blue-500" />,
          title: "No Test Drive Cars Yet",
          description: "Add cars you're interested in test driving to keep track of your car buying journey. Schedule test drives, take notes, and track your purchase decisions.",
          buttonText: "Find Cars to Test Drive",
          buttonAction: () => navigate('/buyers-guide')
        };
      case 'interested':
        return {
          icon: <Heart className="w-12 h-12 text-red-500" />,
          title: "No Interested Vehicles",
          description: "Save vehicles that catch your eye for future consideration. Build your wishlist and compare options.",
          buttonText: "Explore Vehicles",
          buttonAction: () => navigate('/buyers-guide')
        };
      default:
        return {
          icon: <Car className="w-12 h-12 text-neutral-3" />,
          title: "No Vehicles Found",
          description: "Try adjusting your filters or search terms.",
          buttonText: "Browse All Vehicles",
          buttonAction: () => navigate('/buyers-guide')
        };
    }
  };

  if (cars.length === 0) {
    const emptyState = getEmptyStateContent();
    
    return (
      <div className="flex items-center justify-center min-h-[400px] p-6">
        <div className="text-center max-w-md">
          {/* Enhanced empty state icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-neutral-6 to-neutral-7 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-modern">
            {emptyState.icon}
          </div>
          
          {/* Improved typography hierarchy */}
          <h3 className="typography-title text-neutral-1 mb-4">
            {emptyState.title}
          </h3>
          <p className="typography-body text-neutral-4 mb-8 leading-relaxed">
            {emptyState.description}
          </p>
          
          {/* Enhanced CTA button */}
          <Button 
            onClick={emptyState.buttonAction}
            className="bg-motortrend-red text-white hover:bg-red-600 shadow-modern min-h-[48px] px-8"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            {emptyState.buttonText}
          </Button>
          
          {/* Additional helpful links */}
          <div className="mt-6 pt-6 border-t border-neutral-6">
            <p className="typography-caption text-neutral-4 mb-3">Popular categories:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/buyers-guide?category=sedan')}
                className="text-neutral-3 hover:text-neutral-1 hover:bg-neutral-8 rounded-full px-4"
              >
                Sedans
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/buyers-guide?category=suv')}
                className="text-neutral-3 hover:text-neutral-1 hover:bg-neutral-8 rounded-full px-4"
              >
                SUVs
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/buyers-guide?category=truck')}
                className="text-neutral-3 hover:text-neutral-1 hover:bg-neutral-8 rounded-full px-4"
              >
                Trucks
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const gridClass = viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6'
    : 'space-y-4 p-6';

  return (
    <div className={gridClass}>
      {cars.map(car => {
        const carData = savedItemToCarData(car);
        return (
          <div 
            key={car.id}
            className="transition-all duration-200 hover:shadow-modern-lg hover:-translate-y-1"
          >
            <CarCard
              car={carData}
              type={car.type === 'newCar' ? 'new' : 'used'}
              layout={viewMode === 'list' ? 'horizontal' : 'vertical'}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GarageVehicleGrid;
