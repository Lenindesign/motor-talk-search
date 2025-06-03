
import React from 'react';
import { useSavedItems } from "../contexts/SavedItemsContext";

interface GarageStatsProps {
  onTabChange?: (value: 'all' | 'owned' | 'testDriven' | 'interested') => void;
  activeTab?: 'all' | 'owned' | 'testDriven' | 'interested';
}

const GarageStats: React.FC<GarageStatsProps> = ({
  onTabChange,
  activeTab = 'all'
}) => {
  const { savedItems } = useSavedItems();
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;
  const allCount = savedCars.length;

  const tabData = [
    { id: 'all', label: 'All Vehicles', count: allCount },
    { id: 'owned', label: 'Owned', count: ownedCount },
    { id: 'testDriven', label: 'Test Driven', count: testDrivenCount },
    { id: 'interested', label: 'Interested', count: interestedCount }
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {tabData.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          className={`p-4 rounded-lg transition-all duration-200 text-left ${
            activeTab === tab.id
              ? 'bg-white text-black'
              : 'border-2 border-gray-200 bg-white hover:border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="text-2xl font-bold mb-1">{tab.count}</div>
          <div className="text-sm font-medium">{tab.label}</div>
        </button>
      ))}
    </div>
  );
};

export default GarageStats;
