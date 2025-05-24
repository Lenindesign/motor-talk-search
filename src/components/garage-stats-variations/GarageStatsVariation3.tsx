
import React from 'react';
import { useSavedItems } from "../../contexts/SavedItemsContext";

// Horizontal cards with icons and borders
const GarageStatsVariation3 = () => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  return (
    <div className="flex justify-center gap-4 my-8">
      <div className="px-4 py-3 bg-white border-l-4 border-green-500 rounded-r-lg shadow-sm flex items-center gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div>
          <div className="text-2xl font-bold text-green-600">{ownedCount}</div>
          <div className="text-sm text-gray-600">Owned</div>
        </div>
      </div>
      <div className="px-4 py-3 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm flex items-center gap-3">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <div>
          <div className="text-2xl font-bold text-blue-600">{testDrivenCount}</div>
          <div className="text-sm text-gray-600">Test Driven</div>
        </div>
      </div>
      <div className="px-4 py-3 bg-white border-l-4 border-amber-500 rounded-r-lg shadow-sm flex items-center gap-3">
        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
        <div>
          <div className="text-2xl font-bold text-amber-600">{interestedCount}</div>
          <div className="text-sm text-gray-600">Interested</div>
        </div>
      </div>
    </div>
  );
};

export default GarageStatsVariation3;
