
import React from "react";
import { Link } from "react-router-dom";
import { Car, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSavedItems } from "@/contexts/SavedItemsContext";

const MyGarageSkinny = () => {
  const { savedItems } = useSavedItems();
  
  // Filter car items only
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar').slice(0, 3);
  
  // Get research URL for a car - ensure this matches the format in CarCard.tsx
  const getResearchUrl = (carId: string) => {
    return `/research/${carId}`;
  };
  
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <span className="flex items-center">
            <Car className="mr-2 h-4 w-4" /> My Garage
          </span>
        </CardTitle>
        <Link to="/garage" className="text-xs text-gray-500 hover:text-motortrend-red flex items-center">
          View All <ChevronRight className="h-3 w-3 ml-1" />
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        {savedCars.length > 0 ? (
          <div className="space-y-2">
            {savedCars.map(car => (
              <Link 
                to={getResearchUrl(car.id)} 
                key={car.id} 
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-100">
                    {car.imageUrl && (
                      <img 
                        src={car.imageUrl} 
                        alt={car.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          // Fallback image if the car image fails to load
                          console.info(`Using fallback image for: ${car.title}`);
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{car.title}</p>
                    {car.metadata?.motorTrendScore && (
                      <div className="flex items-center mt-0.5">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs ml-1">{car.metadata.motorTrendScore.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant={car.type === 'newCar' ? 'default' : 'outline'} className="text-xs">
                  {car.type === 'newCar' ? 'New' : 'Used'}
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm">No cars in your garage yet</p>
            <Link to="/garage" className="text-sm text-motortrend-red hover:underline mt-2 inline-block">
              Add your first car
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyGarageSkinny;
