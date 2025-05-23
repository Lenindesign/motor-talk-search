import React from "react";
import { Award, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
interface GarageFiltersProps {
  minScore: number;
  sortByScore: boolean;
  showFilters: boolean;
  onMinScoreChange: (value: number) => void;
  onSortByScoreChange: (value: boolean) => void;
  onToggleFilters: () => void;
}
const GarageFilters: React.FC<GarageFiltersProps> = ({
  minScore,
  sortByScore,
  showFilters,
  onMinScoreChange,
  onSortByScoreChange,
  onToggleFilters
}) => {
  return <>
      
      
      {showFilters}
    </>;
};
export default GarageFilters;