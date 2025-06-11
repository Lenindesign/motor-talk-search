
import { useEffect } from "react";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { getMotorTrendDataForCar } from "../services/motorTrendDataService";

export const useGarageData = () => {
  const { savedItems, updateSavedItem } = useSavedItems();

  // Effect to add MotorTrend data to all cars
  useEffect(() => {
    const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
    
    savedCars.forEach(car => {
      // Skip if already has MotorTrend data
      if (car.metadata?.motorTrendScore) return;
      
      const mtData = getMotorTrendDataForCar(car.title);

      // Update the car with MotorTrend data
      updateSavedItem(car.id, {
        metadata: {
          ...car.metadata,
          motorTrendScore: mtData.score?.toString() || '',
          motorTrendRank: mtData.rank?.toString() || '',
          motorTrendCategoryRank: mtData.categoryRank?.toString() || ''
        }
      });
    });
  }, [savedItems, updateSavedItem]);

  return {
    savedItems
  };
};
