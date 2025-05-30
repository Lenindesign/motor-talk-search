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
  
  return <></>;
};
export default GarageStats;