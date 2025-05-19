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
    <div className="border rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <ArrowLeftRight size={18} className="text-motortrend-red" />
          Compare Cars
        </h3>
        <Button 
          onClick={onCompare}
          disabled={!canCompare}
          variant={canCompare ? "default" : "outline"}
          className="transition-all hover:scale-105"
        >
          Compare Selected
        </Button>
      </div>
      {/* Select All Option */}
      {savedCars.length > 1 && (
        <div className="mb-2 flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (selectedCars.length === Math.min(savedCars.length, 4)) {
                onToggleCar('ALL_DESELECT', 'newCar'); // Custom signal to deselect all
              } else {
                onToggleCar('ALL_SELECT', 'newCar'); // Custom signal to select all
              }
            }}
            className="text-sm text-motortrend-red hover:underline"
          >
            {selectedCars.length === Math.min(savedCars.length, 4) ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
      )}
      
      {savedCars.length > 0 ? (
        <div>
          <p className="text-sm text-gray-600 mb-2">Select 2-4 cars to compare:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {savedCars.map(car => (
              <button
                key={car.id}
                onClick={() => onToggleCar(car.id, car.type)}
                className={`flex items-center gap-2 p-2 rounded-md ${selectedCars.includes(car.id) ? 'bg-motortrend-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
              >
                {selectedCars.includes(car.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                {car.title}
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
