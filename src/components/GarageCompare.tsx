
import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SavedItem } from '../contexts/SavedItemsContext';

interface GarageCompareProps {
  savedCars: SavedItem[];
  selectedCars: string[];
  onToggleCar: (id: string) => void;
  onCompare: () => void;
}

const GarageCompare: React.FC<GarageCompareProps> = ({
  savedCars,
  selectedCars,
  onToggleCar,
  onCompare
}) => {
  const canCompare = selectedCars.length >= 2 && selectedCars.length <= 4;
  
  return (
    <div className="border rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Compare Cars</h3>
        <Button 
          onClick={onCompare}
          disabled={!canCompare}
          className="transition-all hover:scale-105"
        >
          Compare Selected
        </Button>
      </div>
      
      {savedCars.length > 0 ? (
        <div>
          <p className="text-sm text-gray-600 mb-2">Select 2-4 cars to compare:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {savedCars.map(car => (
              <button
                key={car.id}
                onClick={() => onToggleCar(car.id)}
                className={`flex items-center gap-2 p-2 rounded-md text-left transition-colors ${
                  selectedCars.includes(car.id) 
                    ? 'bg-motortrend-red/10 border border-motortrend-red/30' 
                    : 'hover:bg-gray-100 border border-transparent'
                }`}
              >
                {selectedCars.includes(car.id) ? (
                  <CheckSquare size={18} className="text-motortrend-red flex-shrink-0" />
                ) : (
                  <Square size={18} className="text-gray-400 flex-shrink-0" />
                )}
                <span className="truncate">{car.title}</span>
              </button>
            ))}
          </div>
          
          {!canCompare && selectedCars.length > 0 && (
            <p className="text-sm text-amber-600 mt-2">
              {selectedCars.length === 1 
                ? "Please select at least one more car to compare" 
                : "Maximum of 4 cars can be compared at once"}
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-600">Add cars to your garage to compare them</p>
      )}
    </div>
  );
};

export default GarageCompare;
