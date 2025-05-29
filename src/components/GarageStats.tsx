import React from 'react';
import { useSavedItems } from "../contexts/SavedItemsContext";

interface GarageStatsProps {
  onTabChange?: (value: 'all' | 'owned' | 'testDriven' | 'interested') => void;
  activeTab?: 'all' | 'owned' | 'testDriven' | 'interested';
}

// Pill-shaped badges with solid colors that act as clickable buttons
const GarageStats: React.FC<GarageStatsProps> = ({ onTabChange, activeTab = 'all' }) => {
  const {
    savedItems
  } = useSavedItems();
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  const ownedCount = savedCars.filter(car => car.metadata?.ownership === 'owned').length;
  const testDrivenCount = savedCars.filter(car => car.metadata?.ownership === 'testDriven').length;
  const interestedCount = savedCars.filter(car => car.metadata?.ownership === 'interested').length;
  
  return <div className="flex justify-center gap-3 my-8 px-0">
      <button 
        onClick={() => onTabChange && onTabChange('owned')} 
        className={`px-6 py-3 rounded-full flex items-center gap-2 text-white bg-motortrend-red hover:bg-red-600 transition-colors cursor-pointer ${activeTab === 'owned' ? 'ring-2 ring-offset-2 ring-red-500' : ''}`}
      >
        <span className="text-lg font-bold">{ownedCount}</span>
        <span className="text-sm">Owned</span>
      </button>
      <button 
        onClick={() => onTabChange && onTabChange('testDriven')} 
        className={`px-6 py-3 rounded-full flex items-center gap-2 text-white bg-motortrend-dark hover:bg-gray-900 transition-colors cursor-pointer ${activeTab === 'testDriven' ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
      >
        <span className="text-lg font-bold">{testDrivenCount}</span>
        <span className="text-sm">Test Driven</span>
      </button>
      <button 
        onClick={() => onTabChange && onTabChange('interested')} 
        className={`px-6 py-3 rounded-full flex items-center gap-2 text-white bg-gray-600 hover:bg-gray-700 transition-colors cursor-pointer ${activeTab === 'interested' ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
      >
        <span className="text-lg font-bold">{interestedCount}</span>
        <span className="text-sm">Interested</span>
      </button>
    </div>;
};
export default GarageStats;