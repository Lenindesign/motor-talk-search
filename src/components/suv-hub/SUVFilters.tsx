
import React from 'react';
import { Filter, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SUVFiltersProps {
  selectedClass: string;
  priceRange: string;
  sortBy: string;
  onClassChange: (classType: string) => void;
  onPriceRangeChange: (range: string) => void;
  onSortChange: (sort: string) => void;
}

const suvClasses = [
  { id: 'all', name: 'All Classes' },
  { id: 'subcompact', name: 'Subcompact' },
  { id: 'compact', name: 'Compact' },
  { id: 'mid-size', name: 'Mid-Size' },
  { id: 'full-size', name: 'Full-Size' },
  { id: 'luxury', name: 'Luxury' },
];

const priceRanges = [
  { id: 'all', name: 'All Prices' },
  { id: 'under-30k', name: 'Under $30k' },
  { id: '30k-50k', name: '$30k - $50k' },
  { id: '50k-75k', name: '$50k - $75k' },
  { id: 'over-75k', name: 'Over $75k' },
];

const sortOptions = [
  { id: 'score', name: 'MotorTrend Score' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'name', name: 'Name A-Z' },
];

const SUVFilters: React.FC<SUVFiltersProps> = ({
  selectedClass,
  priceRange,
  sortBy,
  onClassChange,
  onPriceRangeChange,
  onSortChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-6 space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-motortrend-red" />
        <h3 className="typography-title text-lg font-semibold">Filter & Sort SUVs</h3>
      </div>

      {/* Class Filter */}
      <div>
        <h4 className="typography-body font-semibold mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          SUV Class
        </h4>
        <div className="flex flex-wrap gap-2">
          {suvClasses.map((suvClass) => (
            <Button
              key={suvClass.id}
              variant={selectedClass === suvClass.id ? "default" : "outline"}
              size="sm"
              onClick={() => onClassChange(suvClass.id)}
              className="text-sm"
            >
              {suvClass.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="typography-body font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Price Range
        </h4>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <Button
              key={range.id}
              variant={priceRange === range.id ? "default" : "outline"}
              size="sm"
              onClick={() => onPriceRangeChange(range.id)}
              className="text-sm"
            >
              {range.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="typography-body font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Sort By
        </h4>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.id}
              variant={sortBy === option.id ? "default" : "outline"}
              size="sm"
              onClick={() => onSortChange(option.id)}
              className="text-sm"
            >
              {option.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SUVFilters;
