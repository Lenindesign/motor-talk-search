import React from "react";
import { SlidersHorizontal, Filter } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
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
  return <Popover>
      <PopoverTrigger asChild>
        
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-motortrend-red" />
            <h3 className="font-semibold">Filter & Sort</h3>
          </div>
          
          {/* Score Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Minimum MT Score: {minScore.toFixed(1)}
            </Label>
            <Slider value={[minScore]} onValueChange={value => onMinScoreChange(value[0])} max={10} min={0} step={0.1} className="w-full" />
          </div>

          {/* Sort Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="sort-by-score" className="text-sm font-medium">
              Sort by MT Score
            </Label>
            <Switch id="sort-by-score" checked={sortByScore} onCheckedChange={onSortByScoreChange} />
          </div>
        </div>
      </PopoverContent>
    </Popover>;
};
export default GarageFilters;