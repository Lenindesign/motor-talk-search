
import React from 'react';
import { useSavedItems } from "../contexts/SavedItemsContext";

interface GarageStatsProps {
  onTabChange?: (value: 'all' | 'owned' | 'testDriven' | 'interested') => void;
  activeTab?: 'all' | 'owned' | 'testDriven' | 'interested';
}

// Segmented control style tabs matching the provided design
const GarageStats: React.FC<GarageStatsProps> = ({
  onTabChange,
  activeTab = 'all'
}) => {
  const {
    savedItems
  } = useSavedItems();
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;
  const allCount = savedCars.length;
  const tabData = [
    {
      id: 'all',
      label: 'All',
      count: allCount
    },
    {
      id: 'owned',
      label: 'Owned',
      count: ownedCount
    },
    {
      id: 'testDriven',
      label: 'Test Drive',
      count: testDrivenCount
    },
    {
      id: 'interested',
      label: 'Interested',
      count: interestedCount
    }
  ] as const;

  return (
    <div className="flex w-full mb-6">
      {/* Segmented control container with light gray background */}
      <div className="flex w-full bg-gray-100 rounded-lg p-1">
        {tabData.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md typography-small font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tab.label}
            <span className={`min-w-[18px] h-4 px-1 rounded-full typography-caption font-medium flex items-center justify-center text-xs ${
              activeTab === tab.id 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GarageStats;
