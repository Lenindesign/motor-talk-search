
import React from 'react';
import { useSavedItems } from "../contexts/SavedItemsContext";

interface GarageStatsProps {
  onTabChange?: (value: 'all' | 'owned' | 'testDriven' | 'interested') => void;
  activeTab?: 'all' | 'owned' | 'testDriven' | 'interested';
}

// Pill-shaped badges with solid colors that act as clickable buttons
const GarageStats: React.FC<GarageStatsProps> = ({ onTabChange, activeTab = 'all' }) => {
  const { savedItems } = useSavedItems();
  
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;
  const allCount = savedCars.length;
  
  const tabData = [
    { id: 'all', label: 'All', count: allCount },
    { id: 'owned', label: 'Owned', count: ownedCount },
    { id: 'testDriven', label: 'Test Drive', count: testDrivenCount },
    { id: 'interested', label: 'Interested', count: interestedCount }
  ] as const;

  return (
    <div className="flex space-x-2 mb-6">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            activeTab === tab.id
              ? 'bg-motortrend-red text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tab.label}
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            activeTab === tab.id
              ? 'bg-white/20 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default GarageStats;
