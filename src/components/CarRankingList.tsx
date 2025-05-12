
import React, { useState, useMemo } from "react";
import { Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarScore } from "./CarScoreCard";
import { CarData } from "./CarCard";
import CarRankingFilter from "./CarRankingFilter";

interface RankedCar {
  id: string;
  title: string;
  imageUrl: string;
  year?: string;
  bodyStyle?: "SUV" | "Sedan" | "Truck" | "Sports Car" | "Minivan";
  score: CarScore;
}

interface CarRankingListProps {
  cars: RankedCar[];
  title?: string;
}

const CarRankingList: React.FC<CarRankingListProps> = ({ 
  cars,
  title = "MotorTrend Rankings"
}) => {
  const [sortBy, setSortBy] = useState<string>("overall_desc");
  const [filterBy, setFilterBy] = useState<string>("all");
  
  const filteredAndSortedCars = useMemo(() => {
    // First apply filters
    let filtered = [...cars];
    
    switch (filterBy) {
      case "top_rated":
        filtered = filtered.filter(car => car.score.overall >= 8);
        break;
      case "high_performance":
        filtered = filtered.filter(car => car.score.performance >= 8);
        break;
      case "high_safety":
        filtered = filtered.filter(car => car.score.safety >= 8);
        break;
      case "economical":
        filtered = filtered.filter(car => car.score.fuelEfficiency >= 8);
        break;
      case "top_class":
        filtered = filtered.filter(car => car.score.rankInClass && car.score.rankInClass <= 3);
        break;
    }
    
    // Then sort
    return filtered.sort((a, b) => {
      const [field, direction] = sortBy.split('_');
      const multiplier = direction === 'asc' ? 1 : -1;
      
      if (field === 'rank') {
        // For rank, lower is better
        return multiplier * ((a.score.rankInClass || 999) - (b.score.rankInClass || 999));
      }
      
      return multiplier * (a.score[field as keyof CarScore] - b.score[field as keyof CarScore]);
    });
  }, [cars, sortBy, filterBy]);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="text-motortrend-red" size={20} />
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <CarRankingFilter
          sortValue={sortBy}
          filterValue={filterBy}
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
        />
        
        {filteredAndSortedCars.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedCars.map((car, index) => (
              <div key={car.id} className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                <div className="font-bold text-lg text-gray-400 w-8 text-center">{index + 1}</div>
                <div className="h-16 w-24 flex-shrink-0">
                  <img 
                    src={car.imageUrl} 
                    alt={car.title} 
                    className="h-full w-full object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }} 
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">{car.title}</h3>
                  <div className="text-xs text-gray-500">{car.year} • {car.bodyStyle}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-motortrend-red fill-motortrend-red" />
                  <span className="font-bold">{car.score.overall.toFixed(1)}</span>
                  {car.score.rankInClass && (
                    <span className="text-xs text-gray-500 ml-1">
                      #{car.score.rankInClass} in class
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No vehicles match your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarRankingList;
