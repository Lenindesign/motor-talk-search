
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Car size={18} />
          My Garage
        </CardTitle>
      </CardHeader>
      <CardContent>
        {savedCars.length === 0 ? (
          <div className="text-center py-4">
            <Car size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500 mb-3">No cars saved yet</p>
            <Link 
              to="/buyers-guide" 
              className="text-xs text-motortrend-red hover:underline"
            >
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {savedCars.map((car) => (
              <div key={car.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <img 
                  src={car.imageUrl} 
                  alt={car.title} 
                  className="w-12 h-8 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{car.title}</h4>
                  <p className="text-xs text-gray-500">{car.metadata?.price}</p>
                </div>
                <Link 
                  to={getResearchUrl(car.id)} 
                  className="text-gray-400 hover:text-motortrend-red"
                >
                  <ChevronRight size={16} />
                </Link>
              </div>
            ))}
            {savedCars.length > 0 && (
              <Link 
                to="/garage" 
                className="block text-center text-xs text-motortrend-red hover:underline pt-2"
              >
                View All ({savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar').length})
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyGarageSkinny;
