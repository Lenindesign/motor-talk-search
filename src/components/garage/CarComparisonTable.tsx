
import React from "react";
import { ArrowLeftRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CarData } from "../CarCard";

interface CarComparisonTableProps {
  cars: CarData[];
}

const CarComparisonTable: React.FC<CarComparisonTableProps> = ({ cars }) => {
  // Get all possible specs across all cars
  const getSpecCategories = () => {
    const categories: Record<string, string[]> = {
      'Basic Info': ['year', 'mileage', 'price', 'category'],
      'Performance': ['horsepowerTorque', 'fuelType', 'drivetrain', 'zeroToSixty', 'topSpeed', 'weightPowerRatio'],
      'Capacity': ['passengerCapacity', 'cargoCapacity', 'cargoCapacityFolded', 'trunkCapacity', 'towingCapacity', 'payloadCapacity'],
      'Features': ['seatingConfiguration', 'slidingDoorFeatures', 'familyFeatures', 'bedDimensions', 'safetyRating'],
      'MotorTrend': ['motorTrendScore', 'motorTrendRank', 'motorTrendCategoryRank']
    };
    return categories;
  };

  // Format spec value for display
  const formatSpecValue = (car: CarData, spec: string): string => {
    const value = car[spec as keyof CarData];
    
    // Handle specific formatting for some specs
    if (spec === 'motorTrendScore' && typeof value === 'number') {
      return value.toFixed(1);
    }
    
    if (value === undefined || value === null) {
      return 'N/A';
    }
    
    return String(value);
  };

  // Find the best value in a category (like highest MotorTrend score)
  const getBestValueClass = (cars: CarData[], spec: string, value: string): string => {
    if (spec === 'motorTrendScore' || spec === 'motorTrendRank' || spec === 'motorTrendCategoryRank') {
      const numericValues = cars.map(car => {
        const val = car[spec as keyof CarData];
        return typeof val === 'number' ? val : 0;
      }).filter(v => v > 0);
      
      if (numericValues.length === 0) return '';
      
      const currentValue = parseFloat(value);
      if (isNaN(currentValue)) return '';
      
      // For rank, lower is better
      if (spec.includes('Rank')) {
        const bestValue = Math.min(...numericValues);
        if (bestValue === currentValue) return 'font-bold text-green-700';
      } 
      // For scores, higher is better
      else {
        const bestValue = Math.max(...numericValues);
        if (bestValue === currentValue) return 'font-bold text-green-700';
      }
    }
    
    return '';
  };

  const formatSpecLabel = (spec: string): string => {
    // Convert camelCase to Title Case with spaces
    return spec
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Get all spec categories
  const specCategories = getSpecCategories();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeftRight size={18} className="text-motortrend-red" />
        <h3 className="font-bold">Comparing {cars.length} Vehicles</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Specification</TableHead>
              {cars.map(car => (
                <TableHead key={car.id} className="min-w-[200px]">
                  {car.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(specCategories).map(([category, specs]) => (
              <React.Fragment key={category}>
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={cars.length + 1} className="font-bold">
                    {category}
                  </TableCell>
                </TableRow>
                {specs.map(spec => (
                  <TableRow key={spec}>
                    <TableCell className="font-medium">{formatSpecLabel(spec)}</TableCell>
                    {cars.map(car => {
                      const value = formatSpecValue(car, spec);
                      const bestValueClass = getBestValueClass(cars, spec, value);
                      return (
                        <TableCell key={`${car.id}-${spec}`} className={bestValueClass}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CarComparisonTable;
