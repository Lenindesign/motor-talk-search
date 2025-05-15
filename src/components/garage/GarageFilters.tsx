
import React from "react";
import { Award, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

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
  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onToggleFilters}
        className={showFilters ? "bg-gray-100" : ""}
      >
        <SlidersHorizontal size={16} className="mr-1" />
        Filters
      </Button>
      
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border">
          <h3 className="font-medium mb-3 flex items-center gap-1.5">
            <Award size={18} className="text-motortrend-red" />
            MotorTrend Rankings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Minimum MotorTrend Score: {minScore.toFixed(1)}
              </label>
              <Slider
                value={[minScore]}
                min={0}
                max={10}
                step={0.5}
                onValueChange={(value) => onMinScoreChange(value[0])}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="sort-by-score" className="text-sm text-gray-700">
                Sort by MotorTrend Score
              </label>
              <Switch 
                id="sort-by-score" 
                checked={sortByScore} 
                onCheckedChange={onSortByScoreChange}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">Sort by</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSortByScoreChange(true)}>
                  MotorTrend Score (High to Low)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortByScoreChange(true)}>
                  MotorTrend Score (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortByScoreChange(false)}>
                  Date Added (Newest First)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </>
  );
};

export default GarageFilters;
