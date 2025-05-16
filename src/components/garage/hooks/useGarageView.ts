
import { useState } from "react";
import { SavedItem } from "../../../contexts/SavedItemsContext";

export type GarageTab = 'all' | 'owned' | 'testDriven' | 'interested';

export const useGarageView = (savedCars: SavedItem[]) => {
  const [activeTab, setActiveTab] = useState<GarageTab>('all');

  const getDisplayCars = (minScore: number, sortByScore: boolean) => {
    let filteredCars = [...savedCars];
    
    // Filter by tab
    if (activeTab !== 'all') {
      filteredCars = filteredCars.filter(car => car.metadata?.ownership === activeTab);
    }
    
    // Filter by minimum score
    if (minScore > 0) {
      filteredCars = filteredCars.filter(car => 
        (car.metadata?.motorTrendScore || 0) >= minScore
      );
    }
    
    // Sort by score if enabled
    if (sortByScore) {
      filteredCars.sort((a, b) => 
        (b.metadata?.motorTrendScore || 0) - (a.metadata?.motorTrendScore || 0)
      );
    }
    
    return filteredCars;
  };

  return {
    activeTab,
    setActiveTab,
    getDisplayCars
  };
};
