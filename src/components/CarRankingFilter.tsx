
import React from "react";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CarRankingFilterProps {
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  sortValue: string;
  filterValue: string;
}

const CarRankingFilter: React.FC<CarRankingFilterProps> = ({
  onSortChange,
  onFilterChange,
  sortValue,
  filterValue,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-gray-50 p-4 rounded-md border">
      <div className="space-y-2 flex-1">
        <label className="text-sm font-medium flex items-center gap-1">
          <SortAsc size={16} className="text-gray-500" />
          Sort by
        </label>
        <Select value={sortValue} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overall_desc">Overall Score (High to Low)</SelectItem>
            <SelectItem value="overall_asc">Overall Score (Low to High)</SelectItem>
            <SelectItem value="performance_desc">Best Performance</SelectItem>
            <SelectItem value="safety_desc">Best Safety Rating</SelectItem>
            <SelectItem value="value_desc">Best Value</SelectItem>
            <SelectItem value="reliability_desc">Most Reliable</SelectItem>
            <SelectItem value="comfort_desc">Most Comfortable</SelectItem>
            <SelectItem value="rank_asc">Class Ranking</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 flex-1">
        <label className="text-sm font-medium flex items-center gap-1">
          <Filter size={16} className="text-gray-500" />
          Filter by
        </label>
        <Select value={filterValue} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vehicles</SelectItem>
            <SelectItem value="top_rated">Top Rated (8+)</SelectItem>
            <SelectItem value="high_performance">High Performance (8+)</SelectItem>
            <SelectItem value="high_safety">High Safety (8+)</SelectItem>
            <SelectItem value="economical">Most Economical (8+)</SelectItem>
            <SelectItem value="top_class">Top in Class</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CarRankingFilter;
