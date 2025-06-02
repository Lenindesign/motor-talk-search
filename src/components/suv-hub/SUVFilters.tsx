
import React from 'react';
import { Filter, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SUVFiltersProps {
  minScore: number;
  maxPrice: number;
  fuelType: string;
  sortBy: string;
  onMinScoreChange: (score: number) => void;
  onMaxPriceChange: (price: number) => void;
  onFuelTypeChange: (type: string) => void;
  onSortByChange: (sort: string) => void;
}

const fuelTypes = [
  { id: 'all', name: 'All Fuel Types' },
  { id: 'gasoline', name: 'Gasoline' },
  { id: 'hybrid', name: 'Hybrid' },
  { id: 'electric', name: 'Electric' },
  { id: 'diesel', name: 'Diesel' },
];

const sortOptions = [
  { id: 'rank', name: 'Overall Rank' },
  { id: 'score', name: 'MotorTrend Score' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'name', name: 'Name A-Z' },
];

const SUVFilters: React.FC<SUVFiltersProps> = ({
  minScore,
  maxPrice,
  fuelType,
  sortBy,
  onMinScoreChange,
  onMaxPriceChange,
  onFuelTypeChange,
  onSortByChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-6 space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-motortrend-red" />
        <h3 className="typography-title text-lg font-semibold">Filter & Sort SUVs</h3>
      </div>

      {/* Score Filter */}
      <div>
        <h4 className="typography-body font-semibold mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Minimum MT Score: {minScore.toFixed(1)}
        </h4>
        <Slider
          value={[minScore]}
          onValueChange={(value) => onMinScoreChange(value[0])}
          max={10}
          min={0}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="typography-body font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Max Price: ${maxPrice.toLocaleString()}
        </h4>
        <Slider
          value={[maxPrice]}
          onValueChange={(value) => onMaxPriceChange(value[0])}
          max={100000}
          min={20000}
          step={5000}
          className="w-full"
        />
      </div>

      {/* Fuel Type Filter */}
      <div>
        <h4 className="typography-body font-semibold mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Fuel Type
        </h4>
        <Select value={fuelType} onValueChange={onFuelTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            {fuelTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="typography-body font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Sort By
        </h4>
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SUVFilters;
