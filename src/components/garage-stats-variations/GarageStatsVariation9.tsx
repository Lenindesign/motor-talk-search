
import React from 'react';
import { useSavedItems } from "../../contexts/SavedItemsContext";

// Modern glass morphism style
const GarageStatsVariation9 = () => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  return (
    <div className="flex justify-center gap-4 my-8">
      <div className="w-28 h-22 backdrop-blur-sm bg-white/20 rounded-xl border border-white/30 flex flex-col items-center justify-center shadow-lg">
        <span className="text-2xl font-bold text-green-700">{ownedCount}</span>
        <span className="text-green-600 text-sm font-medium">Owned</span>
      </div>
      <div className="w-28 h-22 backdrop-blur-sm bg-white/20 rounded-xl border border-white/30 flex flex-col items-center justify-center shadow-lg">
        <span className="text-2xl font-bold text-blue-700">{testDrivenCount}</span>
        <span className="text-blue-600 text-sm font-medium">Test Driven</span>
      </div>
      <div className="w-28 h-22 backdrop-blur-sm bg-white/20 rounded-xl border border-white/30 flex flex-col items-center justify-center shadow-lg">
        <span className="text-2xl font-bold text-amber-700">{interestedCount}</span>
        <span className="text-amber-600 text-sm font-medium">Interested</span>
      </div>
    </div>
  );
};

export default GarageStatsVariation9;
