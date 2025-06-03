
import React from 'react';
import { CheckSquare, Square, ArrowLeftRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SavedItem, SavedItemType } from '../contexts/SavedItemsContext';

interface GarageCompareProps {
  savedCars: SavedItem[];
  selectedCars: string[];
  onToggleCar: (id: string, type: SavedItemType) => void;
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-motortrend-dark flex items-center gap-2">
            <ArrowLeftRight size={20} className="text-motortrend-red" />
            Compare Your Cars
          </h3>
          <p className="text-gray-600">Select vehicles to compare side by side</p>
        </div>
        <Button 
          onClick={onCompare}
          disabled={!canCompare}
          className="bg-motortrend-red hover:bg-motortrend-red/90 disabled:bg-gray-400"
        >
          Compare Selected ({selectedCars.length})
        </Button>
      </div>

      {/* Select All/Deselect All */}
      {savedCars.length > 1 && (
        <div className="mb-4 flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (selectedCars.length === Math.min(savedCars.length, 4)) {
                onToggleCar('ALL_DESELECT', 'newCar');
              } else {
                onToggleCar('ALL_SELECT', 'newCar');
              }
            }}
            className="text-sm text-motortrend-red border-motortrend-red hover:bg-motortrend-red hover:text-white"
          >
            {selectedCars.length === Math.min(savedCars.length, 4) ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
      )}
      
      {savedCars.length > 0 ? (
        <div>
          <p className="text-sm text-gray-600 mb-4">Select 2-4 cars to compare:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedCars.map(car => (
              <button
                key={car.id}
                onClick={() => onToggleCar(car.id, car.type)}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  selectedCars.includes(car.id) 
                    ? 'bg-motortrend-red text-white border-motortrend-red shadow-md' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-motortrend-red hover:bg-motortrend-red/5'
                }`}
              >
                {selectedCars.includes(car.id) ? 
                  <CheckSquare size={18} /> : 
                  <Square size={18} />
                }
                <span className="font-medium">{car.title}</span>
              </button>
            ))}
          </div>
          
          {!canCompare && selectedCars.length > 0 && (
            <p className="text-sm text-amber-600 mt-4 p-3 bg-amber-50 rounded-md border border-amber-200">
              {selectedCars.length === 1 
                ? "Please select at least one more car to compare" 
                : "Maximum of 4 cars can be compared at once"}
            </p>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Add cars to your garage to compare them</p>
        </div>
      )}
    </div>
  );
};

export default GarageCompare;
