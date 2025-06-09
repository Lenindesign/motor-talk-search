import React from "react";
import { ArrowLeftRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CarData } from "../CarCard";

interface CarComparisonTableProps {
  cars: CarData[];
}

const CarComparisonTable: React.FC<CarComparisonTableProps> = ({ cars }) => {
  console.log("CarComparisonTable received cars:", JSON.stringify(cars, null, 2)); // Log the cars prop

  // Get all possible specs across all cars
  const getSpecCategories = () => {
    const categories: Record<string, string[]> = {
      'Ratings': ['motorTrendScore', 'userReviewsScore', 'motorTrendRank', 'motorTrendCategoryRank'],
      'Basic Info': ['year', 'mileage', 'price', 'category'],
      'Performance': ['horsepowerTorque', 'fuelType', 'drivetrain', 'zeroToSixty', 'topSpeed', 'weightPowerRatio'],
      'Capacity': ['passengerCapacity', 'cargoCapacity', 'cargoCapacityFolded', 'trunkCapacity', 'towingCapacity', 'payloadCapacity'],
      'Features': ['seatingConfiguration', 'slidingDoorFeatures', 'familyFeatures', 'bedDimensions', 'safetyRating']
    };
    return categories;
  };

  // Format spec value for display
  const formatSpecValue = (car: CarData, spec: string): React.ReactNode => {
    const value = car[spec as keyof CarData];
    
    if (value === undefined || value === null || String(value).trim() === '') {
      return <span className="text-gray-400 italic">N/A</span>;
    }

    let displayValue = String(value);

    switch (spec) {
      case 'price':
        displayValue = `$${value}`;
        break;
      case 'mileage':
        displayValue = `${value} miles`;
        break;
      case 'horsepowerTorque': // Assuming format "XXX hp / YYY lb-ft" or just a number for hp
        displayValue = `${value}`.includes('/') ? `${value}` : `${value} hp`;
        break;
      case 'cargoCapacity':
      case 'cargoCapacityFolded':
      case 'trunkCapacity':
        displayValue = `${value} cu ft`;
        break;
      case 'towingCapacity':
      case 'payloadCapacity':
        displayValue = `${value} lbs`;
        break;
      case 'zeroToSixty':
        displayValue = `${value} s`;
        break;
      case 'topSpeed':
        displayValue = `${value} mph`;
        break;
      case 'weightPowerRatio':
        displayValue = `${value} lbs/hp`;
        break;
      case 'motorTrendScore':
        displayValue = typeof value === 'number' ? value.toFixed(1) : String(value);
        return (
          <div className="flex items-center justify-center gap-1">
            <span className="typography-body-large font-bold text-motortrend-red">{displayValue}</span>
            <span className="typography-caption text-neutral-4">/10</span>
          </div>
        );
      case 'userReviewsScore':
        displayValue = typeof value === 'number' ? value.toFixed(1) : String(value);
        return (
          <div className="flex items-center justify-center gap-1">
            <span className="typography-body-large font-bold text-blue-600">{displayValue}</span>
            <span className="typography-caption text-neutral-4">/10</span>
          </div>
        );
      default:
        displayValue = String(value);
    }
    
    return displayValue;
  };

  // Find the best value in a category (like highest MotorTrend score)
  const getBestValueClass = (cars: CarData[], spec: string, carForSpec: CarData): string => {
    const rawValue = carForSpec[spec as keyof CarData];
    if (rawValue === undefined || rawValue === null || String(rawValue).trim() === '') return '';

    if (spec === 'motorTrendScore' || spec === 'userReviewsScore' || spec === 'motorTrendRank' || spec === 'motorTrendCategoryRank') {
      const numericValues = cars.map(car => {
        const val = car[spec as keyof CarData];
        return typeof val === 'number' ? val : (spec.includes('Rank') ? Infinity : -Infinity); // Use -Infinity for scores if N/A
      }).filter(v => (spec.includes('Rank') ? v !== Infinity : v !== -Infinity));
      
      if (numericValues.length === 0) return '';
      
      const currentValue = typeof rawValue === 'number' ? rawValue : parseFloat(String(rawValue));
      if (isNaN(currentValue)) return '';
      
      if (spec.includes('Rank')) {
        const bestValue = Math.min(...numericValues);
        if (bestValue === currentValue) return 'font-bold text-green-700 bg-green-50 p-1 rounded-sm';
      } else { // For scores
        const bestValue = Math.max(...numericValues);
        if (bestValue === currentValue) return 'font-bold text-green-700 bg-green-50 p-1 rounded-sm';
      }
    }
    return '';
  };

  const formatSpecLabel = (spec: string): string => {
    switch (spec) {
      case 'year': return 'Year';
      case 'mileage': return 'Mileage';
      case 'price': return 'Price';
      case 'category': return 'Category';
      case 'horsepowerTorque': return 'Horsepower / Torque';
      case 'fuelType': return 'Fuel Type';
      case 'drivetrain': return 'Drivetrain';
      case 'zeroToSixty': return '0-60 mph';
      case 'topSpeed': return 'Top Speed';
      case 'weightPowerRatio': return 'Weight/Power Ratio';
      case 'passengerCapacity': return 'Passenger Capacity';
      case 'cargoCapacity': return 'Cargo Capacity';
      case 'cargoCapacityFolded': return 'Cargo (Seats Folded)';
      case 'trunkCapacity': return 'Trunk Capacity';
      case 'towingCapacity': return 'Towing Capacity';
      case 'payloadCapacity': return 'Payload Capacity';
      case 'seatingConfiguration': return 'Seating Config';
      case 'slidingDoorFeatures': return 'Sliding Door Features';
      case 'familyFeatures': return 'Family Features';
      case 'bedDimensions': return 'Bed Dimensions';
      case 'safetyRating': return 'Safety Rating';
      case 'motorTrendScore': return 'MotorTrend Score';
      case 'userReviewsScore': return 'User Reviews Score';
      case 'motorTrendRank': return 'MT Rank';
      case 'motorTrendCategoryRank': return 'MT Category Rank';
      default:
        return spec
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim();
    }
  };

  // Get all spec categories
  const specCategories = getSpecCategories();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeftRight size={18} className="text-motortrend-red" />
        <h3 className="typography-title">Comparing {cars.length} Vehicles</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px] align-bottom">Specification</TableHead>
              {cars.map(car => (
                <TableHead key={car.id} className="min-w-[200px] text-center">
                  <div className="flex flex-col items-center gap-2 mb-1">
                    <Avatar className="w-20 h-16 rounded-md">
                      <AvatarImage src={car.imageUrl || '/placeholder.svg'} alt={car.title} className="object-cover" />
                      <AvatarFallback>{car.title.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="typography-caption">{car.title}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(specCategories).map(([category, specs]) => (
              <React.Fragment key={category}>
                <TableRow className={category === 'Ratings' ? 'bg-neutral-2/10' : 'bg-gray-100'}>
                  <TableCell colSpan={cars.length + 1} className={`${category === 'Ratings' ? 'typography-subtitle text-motortrend-red' : 'typography-body-large'}`}>
                    {category}
                  </TableCell>
                </TableRow>
                {specs.map(spec => (
                  <TableRow key={spec}>
                    <TableCell className="typography-caption whitespace-nowrap">{formatSpecLabel(spec)}</TableCell>
                    {cars.map(car => {
                      const displayValue = formatSpecValue(car, spec);
                      const bestValueClass = getBestValueClass(cars, spec, car);
                      return (
                        <TableCell key={`${car.id}-${spec}`} className={`text-center ${bestValueClass}`.trim()}>
                          {displayValue}
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
