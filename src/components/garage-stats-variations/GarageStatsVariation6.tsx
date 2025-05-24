
import React from 'react';
import { useSavedItems } from "../../contexts/SavedItemsContext";

// Dark theme with neon accents
const GarageStatsVariation6 = () => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  return (
    <div className="flex justify-center gap-4 my-8">
      <div className="w-24 h-20 bg-gray-900 rounded-lg border border-green-400 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-green-400 opacity-10"></div>
        <span className="text-xl font-bold text-green-400 relative z-10">{ownedCount}</span>
        <span className="text-green-400 text-sm relative z-10">Owned</span>
      </div>
      <div className="w-24 h-20 bg-gray-900 rounded-lg border border-blue-400 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-400 opacity-10"></div>
        <span className="text-xl font-bold text-blue-400 relative z-10">{testDrivenCount}</span>
        <span className="text-blue-400 text-sm relative z-10">Test</span>
      </div>
      <div className="w-24 h-20 bg-gray-900 rounded-lg border border-amber-400 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-400 opacity-10"></div>
        <span className="text-xl font-bold text-amber-400 relative z-10">{interestedCount}</span>
        <span className="text-amber-400 text-sm relative z-10">Interest</span>
      </div>
    </div>
  );
};

export default GarageStatsVariation6;
