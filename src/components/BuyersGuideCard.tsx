
import React from "react";
import { Star, DollarSign, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface VehicleData {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  category: string;
  rating?: number;
  year: string;
  features?: string[];
  mpg?: string;
  horsepower?: string;
  url: string;
  isSponsored?: boolean;
  comparisonUrl?: string;
}

interface BuyersGuideCardProps {
  vehicle: VehicleData;
  compact?: boolean;
  className?: string;
}

const BuyersGuideCard: React.FC<BuyersGuideCardProps> = ({ 
  vehicle, 
  compact = false,
  className 
}) => {
  return (
    <div className={cn(
      "group rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md",
      compact ? "flex gap-4" : "flex flex-col",
      className
    )}>
      <div className={cn(
        "overflow-hidden rounded-lg",
        compact ? "h-24 w-24 flex-shrink-0" : "h-40 w-full"
      )}>
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-grow flex-col">
        <div className="flex items-center justify-between">
          <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            {vehicle.year}
          </Badge>
          {vehicle.isSponsored && (
            <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
              Sponsored
            </Badge>
          )}
        </div>
        
        <h3 className={cn(
          "mt-2 font-bold tracking-tight",
          compact ? "text-sm" : "text-lg"
        )}>
          <a href={vehicle.url} className="hover:text-motortrend-red">
            {vehicle.name}
          </a>
        </h3>
        
        <div className="mt-1">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign size={14} className="text-gray-600" />
            <span className="font-medium">{vehicle.price}</span>
          </div>
          
          {vehicle.rating && !compact && (
            <div className="my-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={star <= vehicle.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-1 text-xs text-gray-500">({vehicle.rating}/5)</span>
            </div>
          )}
          
          {!compact && (
            <div className="mt-2 flex flex-wrap gap-2">
              {vehicle.features?.map((feature, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
          
          {!compact && (
            <div className="mt-3 flex items-center justify-between">
              <Button
                asChild
                size="sm"
                className="bg-motortrend-red hover:bg-motortrend-red/90"
              >
                <a href={vehicle.url}>View Details</a>
              </Button>
              
              {vehicle.comparisonUrl && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <a href={vehicle.comparisonUrl}>Compare</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyersGuideCard;
