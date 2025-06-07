
import React from 'react';
import { Shield, Fuel, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Vehicle } from '@/types/vehicle';

interface QuickStatsProps {
  vehicle: Vehicle;
}

const QuickStats: React.FC<QuickStatsProps> = ({ vehicle }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const formatMPG = (mpg: { city: number; highway: number } | undefined) => {
    if (vehicle.specs.fuel === 'Electric') {
      return `${vehicle.specs.range} mi range`;
    }
    return `${mpg.city} / ${mpg.highway} mpg`;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="typography-subtitle">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Expert Rating */}
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
            <span className="typography-title">{vehicle.ratings.expert.overall}</span>
          </div>
          <div>
            <div className="typography-caption text-neutral-4">Expert Rating</div>
            <div className="typography-body-bold">
              {vehicle.ratings.expert.overall >= 9 ? 'Outstanding' : 
               vehicle.ratings.expert.overall >= 8 ? 'Excellent' : 
               vehicle.ratings.expert.overall >= 7 ? 'Very Good' : 
               vehicle.ratings.expert.overall >= 6 ? 'Good' : 'Average'}
            </div>
          </div>
        </div>
        
        {/* User Rating */}
        <div className="mb-4 flex items-center">
          <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-md bg-amber-500 text-white">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-white" />
              <span className="ml-1 typography-subtitle">{vehicle.ratings.user.average}</span>
            </div>
          </div>
          <div>
            <div className="typography-caption text-neutral-4">User Rating</div>
            <div className="typography-body-bold">
              From {vehicle.ratings.user.count} owner reviews
            </div>
          </div>
        </div>
        
        {/* Price Range */}
        <div className="mb-4 flex items-center">
          <div className="mr-3 rounded-md bg-gray-100 p-2">
            <span className="typography-title text-neutral-1">$</span>
          </div>
          <div>
            <div className="typography-caption text-neutral-4">Starting Price</div>
            <div className="typography-body-bold">
              {formatPrice(vehicle.price.base)} - {formatPrice(vehicle.price.asConfigured)}
            </div>
          </div>
        </div>
        
        {/* Fuel Economy */}
        <div className="mb-4 flex items-center">
          <div className="mr-3 rounded-md bg-gray-100 p-2">
            <Fuel className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Fuel Economy</div>
            <div className="font-semibold">
              {formatMPG(vehicle.specs.mpg)}
            </div>
          </div>
        </div>
        
        {/* Key Selling Points */}
        <div>
          <div className="mb-2 text-sm text-gray-500">Key Selling Points</div>
          <ul className="space-y-2">
            {vehicle.keyPoints.map((point: string, index: number) => (
              <li key={index} className="flex items-start">
                <Shield className="mr-2 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
