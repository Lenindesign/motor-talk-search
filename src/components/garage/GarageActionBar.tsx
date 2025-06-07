
import React from 'react';
import QuickAddCar from '../QuickAddCar';
import GarageFilters from './GarageFilters';

interface GarageActionBarProps {
  activeTab: 'all' | 'owned' | 'testDriven' | 'interested';
  minScore: number;
  sortByScore: boolean;
  showFilters: boolean;
  onMinScoreChange: (value: number) => void;
  onSortByScoreChange: (value: boolean) => void;
  onToggleFilters: () => void;
}

const GarageActionBar: React.FC<GarageActionBarProps> = ({
  activeTab,
  minScore,
  sortByScore,
  showFilters,
  onMinScoreChange,
  onSortByScoreChange,
  onToggleFilters
}) => {
  return (
    <div className="bg-neutral-8 rounded-xl border border-neutral-6 shadow-sm mb-6 p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Quick Actions */}
        <div className="flex flex-1 gap-3 w-full md:w-auto">
          <QuickAddCar activeTab={activeTab} />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <GarageFilters 
            minScore={minScore}
            sortByScore={sortByScore}
            showFilters={showFilters}
            onMinScoreChange={onMinScoreChange}
            onSortByScoreChange={onSortByScoreChange}
            onToggleFilters={onToggleFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default GarageActionBar;
