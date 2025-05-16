
import { useState } from "react";

export interface GarageFiltersState {
  minScore: number;
  sortByScore: boolean;
  showFilters: boolean;
}

export const useGarageFilters = () => {
  const [minScore, setMinScore] = useState<number>(0);
  const [sortByScore, setSortByScore] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const toggleFilters = () => setShowFilters(!showFilters);

  return {
    minScore,
    setMinScore,
    sortByScore,
    setSortByScore,
    showFilters,
    toggleFilters
  };
};
