
import React from "react";
import { Link } from "react-router-dom";
import { Car, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSavedItems } from "@/contexts/SavedItemsContext";
import { Button } from "@/components/ui/button";

const MyGarageSkinny = () => {
  const { savedItems } = useSavedItems();
  
  // Filter car items only
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar').slice(0, 3);
  
  // Get research URL for a car - ensure this matches the format in CarCard.tsx
  const getResearchUrl = (carId: string) => {
    return `/research/${carId}`;
  };
  
  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-motortrend-red/10">
        <CardTitle className="text-base font-medium text-motortrend-dark">
          <span className="flex items-center">
            <Car className="mr-2 h-4 w-4 text-motortrend-red" /> My Garage
          </span>
        </CardTitle>
        <Link to="/garage" className="text-xs text-motortrend-red hover:underline flex items-center">
          View All <ChevronRight className="h-3 w-3 ml-1" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {savedCars.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {savedCars.map(car => (
              <Link 
                to={getResearchUrl(car.id)} 
                key={car.id} 
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-sm overflow-hidden mr-3 bg-gray-100 flex-shrink-0 border border-gray-200">
                    {car.imageUrl && (
                      <img 
                        src={car.imageUrl} 
                        alt={car.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          // Fallback image if the car image fails to load
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1 text-gray-800">{car.title}</p>
                    {car.metadata?.motorTrendScore && (
                      <div className="flex items-center mt-0.5">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs ml-1 text-gray-600">{car.metadata.motorTrendScore.toFixed(1)}/10</span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant={car.type === 'newCar' ? 'default' : 'outline'} className={car.type === 'newCar' ? "bg-motortrend-red text-white" : "border-motortrend-red text-motortrend-red"}>
                  {car.type === 'newCar' ? 'New' : 'Used'}
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <Car size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">No cars in your garage yet</p>
            <Link to="/garage">
              <Button className="mt-4 bg-motortrend-red hover:bg-motortrend-red/90 text-white text-sm">
                Add your first car
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyGarageSkinny;
