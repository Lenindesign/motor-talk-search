
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { CarData } from "../../CarCard";
import { SavedItem } from "../../../contexts/SavedItemsContext";

export const useCarComparison = (savedCars: SavedItem[], savedItemToCarData: (item: SavedItem) => CarData) => {
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const toggleCarForComparison = (carId: string) => {
    setSelectedCars(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      } else {
        // Limit to max 4 cars
        if (prev.length >= 4) {
          toast({
            title: "Comparison limit reached",
            description: "You can compare up to 4 cars at a time",
            variant: "destructive"
          });
          return prev;
        }
        return [...prev, carId];
      }
    });
  };

  const startComparison = () => {
    if (selectedCars.length < 2) {
      toast({
        title: "Select at least 2 cars",
        description: "You need to select at least 2 cars to compare",
        variant: "destructive"
      });
      return;
    }
    setShowComparison(true);
  };

  const exitComparison = () => {
    setShowComparison(false);
  };

  const getSelectedCarData = (): CarData[] => {
    return savedCars
      .filter(car => selectedCars.includes(car.id))
      .map(car => savedItemToCarData(car));
  };

  return {
    selectedCars,
    showComparison,
    toggleCarForComparison,
    startComparison,
    exitComparison,
    getSelectedCarData
  };
};
