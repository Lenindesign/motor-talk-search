
import React from 'react';
import { useSavedItems } from "../../contexts/SavedItemsContext";

// Minimalist with just numbers and text
const GarageStatsVariation4 = () => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;

  return (
    <div className="flex justify-center gap-12 my-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-green-600 mb-1">{ownedCount}</div>
        <div className="text-sm font-medium text-gray-700 uppercase tracking-wider">Owned</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-1">{testDrivenCount}</div>
        <div className="text-sm font-medium text-gray-700 uppercase tracking-wider">Test Driven</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-amber-600 mb-1">{interestedCount}</div>
        <div className="text-sm font-medium text-gray-700 uppercase tracking-wider">Interested</div>
      </div>
    </div>
  );
};

export default GarageStatsVariation4;
