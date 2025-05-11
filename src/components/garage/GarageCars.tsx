
import React from "react";
import { SavedItem } from "../../contexts/SavedItemsContext";
import GarageCarCard from "./GarageCarCard";
import CarDetails from "../CarDetails";

interface GarageCarsProps {
  filteredCars: SavedItem[];
  selectedCars: string[];
  selectedCarDetails: string | null;
  onUnsave: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onShowDetails: (id: string) => void;
  onUpdateCar: (id: string, updates: Partial<SavedItem>) => void;
}

const GarageCars: React.FC<GarageCarsProps> = ({
  filteredCars,
  selectedCars,
  selectedCarDetails,
  onUnsave,
  onToggleSelect,
  onShowDetails,
  onUpdateCar
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {filteredCars.map(car => (
          <React.Fragment key={car.id}>
            <GarageCarCard 
              car={car} 
              onUnsave={onUnsave}
              isSelected={selectedCars.includes(car.id)}
              onToggleSelect={() => onToggleSelect(car.id)}
              onShowDetails={() => onShowDetails(car.id)}
            />
            
            {selectedCarDetails === car.id && (
              <div className="mt-2 ml-4 border-l-2 border-motortrend-red pl-4 animate-fade-in">
                <CarDetails 
                  car={car}
                  onUpdate={onUpdateCar}
                  onDelete={onUnsave}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GarageCars;
