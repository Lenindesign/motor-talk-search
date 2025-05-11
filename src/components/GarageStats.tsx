
import React from 'react';
import { useSavedItems } from "../contexts/SavedItemsContext";

const GarageStats = () => {
  const { savedItems } = useSavedItems();
  
  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Count cars by ownership
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  return (
    <div className="flex justify-center gap-4 my-8">
      <div className="w-24 h-20 bg-green-50 rounded flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-green-600">{ownedCount}</span>
        <span className="text-green-600 text-sm">Owned</span>
      </div>
      <div className="w-24 h-20 bg-blue-50 rounded flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-blue-600">{testDrivenCount}</span>
        <span className="text-blue-600 text-sm">Test<br />Driven</span>
      </div>
      <div className="w-24 h-20 bg-amber-50 rounded flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-amber-600">{interestedCount}</span>
        <span className="text-amber-600 text-sm">Interested</span>
      </div>
    </div>
  );
};

export default GarageStats;
