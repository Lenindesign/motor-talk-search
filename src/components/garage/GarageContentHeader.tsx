
import React from "react";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import GarageFilters from "./GarageFilters";

interface GarageContentHeaderProps {
  showComparison: boolean;
  showFilters: boolean;
  minScore: number;
  sortByScore: boolean;
  onToggleFilters: () => void;
  onMinScoreChange: (value: number) => void;
  onSortByScoreChange: (value: boolean) => void;
  onExitComparison: () => void;
}

const GarageContentHeader: React.FC<GarageContentHeaderProps> = ({
  showComparison,
  showFilters,
  minScore,
  sortByScore,
  onToggleFilters,
  onMinScoreChange,
  onSortByScoreChange,
  onExitComparison
}) => {
  return (
    <div className="flex flex-row justify-between items-center pb-2">
      <div>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Car size={22} />
          {showComparison ? "Car Comparison" : "My Garage"}
        </CardTitle>
        <CardDescription>
          {showComparison 
            ? "Compare your selected vehicles side by side" 
            : "View and manage your saved vehicles"}
        </CardDescription>
      </div>
      <div className="flex gap-2">
        {showComparison ? (
          <Button variant="outline" onClick={onExitComparison}>
            Back to Garage
          </Button>
        ) : (
          <>
            <GarageFilters 
              minScore={minScore}
              sortByScore={sortByScore}
              showFilters={showFilters}
              onMinScoreChange={onMinScoreChange}
              onSortByScoreChange={onSortByScoreChange}
              onToggleFilters={onToggleFilters}
            />
            <Button onClick={() => window.location.href = "/"}>
              Browse Cars
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default GarageContentHeader;
