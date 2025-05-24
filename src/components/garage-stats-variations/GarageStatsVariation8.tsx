
import React from 'react';
import { useSavedItems } from "../../contexts/SavedItemsContext";

// Hexagonal design with outlined style
const GarageStatsVariation8 = () => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  return (
    <div className="flex justify-center gap-4 my-8">
      <div className="w-24 h-24 border-4 border-green-500 transform rotate-45 flex flex-col items-center justify-center">
        <div className="transform -rotate-45 text-center">
          <span className="text-lg font-bold text-green-600 block">{ownedCount}</span>
          <span className="text-green-600 text-xs">Owned</span>
        </div>
      </div>
      <div className="w-24 h-24 border-4 border-blue-500 transform rotate-45 flex flex-col items-center justify-center">
        <div className="transform -rotate-45 text-center">
          <span className="text-lg font-bold text-blue-600 block">{testDrivenCount}</span>
          <span className="text-blue-600 text-xs">Test</span>
        </div>
      </div>
      <div className="w-24 h-24 border-4 border-amber-500 transform rotate-45 flex flex-col items-center justify-center">
        <div className="transform -rotate-45 text-center">
          <span className="text-lg font-bold text-amber-600 block">{interestedCount}</span>
          <span className="text-amber-600 text-xs">Interest</span>
        </div>
      </div>
    </div>
  );
};

export default GarageStatsVariation8;
