import React from 'react';
import { useSavedItems } from "../contexts/SavedItemsContext";

interface GarageStatsProps {
  onTabChange?: (value: 'all' | 'owned' | 'testDriven' | 'interested') => void;
  activeTab?: 'all' | 'owned' | 'testDriven' | 'interested';
}

// Segmented control style tabs similar to iOS design
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
      {/* Segmented control container with background */}
      <div className="flex w-full bg-color-neutral-6 rounded-xl p-1 gap-1">
        {tabData.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`flex-1 px-3 py-2.5 rounded-lg typography-small font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-white text-color-neutral-1 shadow-sm' 
                : 'text-color-neutral-3 hover:text-color-neutral-2'
            }`}
          >
            {tab.label}
            <span className={`min-w-[20px] h-5 px-1.5 rounded-full typography-caption font-semibold flex items-center justify-center ${
              activeTab === tab.id 
                ? 'bg-color-neutral-1 text-white' 
                : 'bg-color-neutral-5 text-color-neutral-3'
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
