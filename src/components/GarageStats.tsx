import React from 'react';
import { useSavedItems } from "../contexts/SavedItemsContext";

// Pill-shaped badges with solid colors
const GarageStats = () => {
  const {
    savedItems
  } = useSavedItems();
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;
  return <div className="flex justify-center gap-3 my-8 px-0">
      <div className="px-6 py-3 rounded-full flex items-center gap-2 text-white bg-motortrend-red">
        <span className="text-lg font-bold">{ownedCount}</span>
        <span className="text-sm">Owned</span>
      </div>
      <div className="px-6 py-3 rounded-full flex items-center gap-2 text-white bg-motortrend-dark">
        <span className="text-lg font-bold">{testDrivenCount}</span>
        <span className="text-sm">Test Driven</span>
      </div>
      <div className="px-6 py-3 rounded-full flex items-center gap-2 text-white bg-gray-600">
        <span className="text-lg font-bold">{interestedCount}</span>
        <span className="text-sm">Interested</span>
      </div>
    </div>;
};
export default GarageStats;