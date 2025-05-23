
import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehicleFinderProps {
  onSearch?: (filters: VehicleFilterOptions) => void;
}

export interface VehicleFilterOptions {
  budget: string;
  vehicleType: string;
  brand: string;
  query: string;
}

const VehicleFinder: React.FC<VehicleFinderProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<VehicleFilterOptions>({
    budget: "",
    vehicleType: "",
    brand: "",
    query: "",
  });

  const handleFilterChange = (key: keyof VehicleFilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="bg-gray-100 pb-3 pt-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Search size={18} />
          Vehicle Finder
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by make, model, or keyword"
              className="pl-9"
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Select
              value={filters.budget}
              onValueChange={(value) => handleFilterChange("budget", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-25k">Under $25,000</SelectItem>
                <SelectItem value="25k-40k">$25,000 - $40,000</SelectItem>
                <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                <SelectItem value="60k-plus">$60,000+</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.vehicleType}
              onValueChange={(value) => handleFilterChange("vehicleType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="sports-car">Sports Car</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.brand}
              onValueChange={(value) => handleFilterChange("brand", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="tesla">Tesla</SelectItem>
                <SelectItem value="audi">Audi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" className="gap-1">
              <SlidersHorizontal size={14} />
              Advanced Filters
            </Button>
            <Button onClick={handleSearch} className="bg-motortrend-red hover:bg-motortrend-red/90">
              Find Vehicles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleFinder;
