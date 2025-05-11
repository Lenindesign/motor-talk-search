
import React from "react";
import { SavedItem } from "../../contexts/SavedItemsContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface GarageCarCardProps {
  car: SavedItem;
  onUnsave: (id: string) => void;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onShowDetails?: () => void;
}

const GarageCarCard: React.FC<GarageCarCardProps> = ({
  car,
  onUnsave,
  isSelected,
  onToggleSelect,
  onShowDetails
}) => {
  const metadata = car.metadata || {};
  
  // Micro-animation for card interaction
  const cardClasses = `flex flex-col sm:flex-row rounded-lg overflow-hidden border ${
    isSelected 
      ? 'bg-motortrend-red/5 border-motortrend-red/30' 
      : 'bg-white border-gray-200'
  } transition-all duration-300 hover:shadow-md animate-fade-in transform hover:-translate-y-1`;

  return (
    <div className={cardClasses}>
      <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          onError={e => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="bg-motortrend-red/10 text-motortrend-red border-motortrend-red/30">
            {car.type === 'newCar' ? 'New' : 'Used'}
          </Badge>
          {metadata.year && <Badge variant="outline">{metadata.year}</Badge>}
          {metadata.category && <Badge variant="outline">{metadata.category}</Badge>}
          
          {metadata.ownership && (
            <Badge className={`ml-auto ${
              metadata.ownership === 'owned' 
                ? 'bg-green-100 text-green-800' 
                : metadata.ownership === 'testDriven' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-amber-100 text-amber-800'
            }`}>
              {metadata.ownership === 'owned' 
                ? 'Owned' 
                : metadata.ownership === 'testDriven' 
                  ? 'Test Driven' 
                  : 'Interested'
              }
            </Badge>
          )}
        </div>
        
        <h3 className="text-lg font-bold">{car.title}</h3>
        
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          {metadata.price && (
            <div className="text-sm">
              <span className="font-semibold">Price:</span> {metadata.price}
            </div>
          )}
          {metadata.mileage && (
            <div className="text-sm">
              <span className="font-semibold">Mileage:</span> {metadata.mileage}
            </div>
          )}
          {metadata.location && (
            <div className="text-sm col-span-2">
              <span className="font-semibold">Location:</span> {metadata.location}
            </div>
          )}
        </div>
        
        {metadata.notes && (
          <div className="mt-2 bg-gray-50 p-2 rounded-md">
            <p className="text-sm line-clamp-2">{metadata.notes}</p>
          </div>
        )}
        
        <div className="mt-auto pt-4 flex flex-wrap gap-3">
          <Button 
            onClick={onShowDetails}
            className="transition-transform hover:scale-105"
          >
            View Details
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onToggleSelect}
            className={`transition-all ${
              isSelected 
                ? 'bg-motortrend-red/10 text-motortrend-red border-motortrend-red/30' 
                : 'hover:bg-gray-100'
            }`}
          >
            {isSelected ? 'Selected for Compare' : 'Compare'}
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-gray-500 hover:text-motortrend-red transition-colors ml-auto" 
            onClick={() => onUnsave(car.id)}
          >
            <Trash className="mr-1" size={16} /> Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GarageCarCard;
