
import React from 'react';
import { useSavedItems } from "../../contexts/SavedItemsContext";

// Card style with shadows and hover effects
const GarageStatsVariation5 = () => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  return (
    <div className="flex justify-center gap-4 my-8">
      <div className="w-28 h-24 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-500 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{ownedCount}</span>
        <span className="text-green-600 text-sm font-medium">Owned</span>
      </div>
      <div className="w-28 h-24 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-500 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{testDrivenCount}</span>
        <span className="text-blue-600 text-sm font-medium">Test Driven</span>
      </div>
      <div className="w-28 h-24 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-amber-500 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{interestedCount}</span>
        <span className="text-amber-600 text-sm font-medium">Interested</span>
      </div>
    </div>
  );
};

export default GarageStatsVariation5;
