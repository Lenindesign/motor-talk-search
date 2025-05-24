
import React from 'react';
import { useSavedItems } from "../../contexts/SavedItemsContext";

// Progress bar style indicators
const GarageStatsVariation10 = () => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;
  const totalCount = savedCars.length || 1;

  return (
    <div className="space-y-4 my-8 max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Owned</span>
        <span className="text-lg font-bold text-green-600">{ownedCount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-green-500 h-2 rounded-full" style={{width: `${(ownedCount/totalCount)*100}%`}}></div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Test Driven</span>
        <span className="text-lg font-bold text-blue-600">{testDrivenCount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(testDrivenCount/totalCount)*100}%`}}></div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Interested</span>
        <span className="text-lg font-bold text-amber-600">{interestedCount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-amber-500 h-2 rounded-full" style={{width: `${(interestedCount/totalCount)*100}%`}}></div>
      </div>
    </div>
  );
};

export default GarageStatsVariation10;
