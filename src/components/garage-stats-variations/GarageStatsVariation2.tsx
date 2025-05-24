
import React from 'react';
import { useSavedItems } from "../../contexts/SavedItemsContext";

// Circular badges with gradient backgrounds
const GarageStatsVariation2 = () => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  return (
    <div className="flex justify-center gap-6 my-8">
      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
        <span className="text-lg font-bold">{ownedCount}</span>
        <span className="text-xs">Owned</span>
      </div>
      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
        <span className="text-lg font-bold">{testDrivenCount}</span>
        <span className="text-xs">Test</span>
      </div>
      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
        <span className="text-lg font-bold">{interestedCount}</span>
        <span className="text-xs">Interest</span>
      </div>
    </div>
  );
};

export default GarageStatsVariation2;
