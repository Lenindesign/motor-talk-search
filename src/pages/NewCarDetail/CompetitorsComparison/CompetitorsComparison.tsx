import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Zap, Shield, DollarSign } from 'lucide-react';
import { mockCompetitors } from './utils';

const CompetitorsComparison: React.FC = () => {
  const currentVehicle = {
    name: 'Our Vehicle',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67c222d600145b000869b9f8/1-2025-lucid-air-front-view.jpg',
    price: 85000,
    rating: 8.5,
    specs: {
      engine: '400 HP Electric Motor',
      acceleration: '4.2 seconds 0-60 mph',
      range: '405 miles EPA',
      charging: '350kW DC Fast Charging'
    },
    highlights: ['Premium interior', 'Advanced tech', 'Excellent range'],
    isOurVehicle: true
  };

  const [selectedVehicle, setSelectedVehicle] = useState(0);
  
  // Add missing properties to competitors with defaults
  const enhancedCompetitors = mockCompetitors.slice(0, 3).map(competitor => ({
    ...competitor,
    rating: 7.5, // Default rating since competitors don't have this property
    highlights: competitor.pros || ['Good performance', 'Reliable', 'Value for money'],
    isOurVehicle: false
  }));
  
  const allVehicles = [currentVehicle, ...enhancedCompetitors];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="typography-subtitle text-neutral-1">Compare with Competitors</h3>
        <p className="text-sm text-neutral-3">See how this vehicle stacks up against similar models</p>
      </div>

      {/* Vehicle Selector */}
      <div className="flex justify-center">
        <div className="flex bg-neutral-8 rounded-2xl p-1 gap-1">
          {allVehicles.map((vehicle, index) => (
            <button
              key={index}
              onClick={() => setSelectedVehicle(index)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedVehicle === index
                  ? 'bg-white text-neutral-1 shadow-sm'
                  : 'text-neutral-3 hover:text-neutral-1'
              }`}
            >
              {vehicle.isOurVehicle ? 'Our Pick' : vehicle.name.split(' ').slice(-1)[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Vehicle Details */}
      <div className="bg-white rounded-2xl border border-neutral-6 overflow-hidden">
        <div className="relative">
          {/* Badge for our vehicle */}
          {allVehicles[selectedVehicle].isOurVehicle && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-motortrend-red text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Our Pick
              </div>
            </div>
          )}

          {/* Vehicle Image */}
          <div className="aspect-[16/9] bg-neutral-100">
            <img 
              src={allVehicles[selectedVehicle].imageUrl} 
              alt={allVehicles[selectedVehicle].name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Vehicle Info */}
          <div className="text-center space-y-2">
            <h4 className="typography-title text-neutral-1">{allVehicles[selectedVehicle].name}</h4>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-neutral-3" />
                <span className="typography-subtitle text-neutral-1">
                  ${allVehicles[selectedVehicle].price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="typography-subtitle text-neutral-1">
                  {allVehicles[selectedVehicle].rating}/10
                </span>
              </div>
            </div>
          </div>

          {/* Key Specs */}
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-neutral-1">Key Specifications</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(allVehicles[selectedVehicle].specs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-neutral-8 rounded-xl">
                  <span className="text-sm text-neutral-3 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium text-neutral-1">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-neutral-1">Key Highlights</h5>
            <div className="flex flex-wrap gap-2">
              {allVehicles[selectedVehicle].highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allVehicles.map((vehicle, index) => (
          <div
            key={index}
            className={`relative rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              selectedVehicle === index
                ? 'border-motortrend-red bg-red-50'
                : 'border-neutral-6 bg-white hover:border-neutral-4'
            }`}
            onClick={() => setSelectedVehicle(index)}
          >
            {vehicle.isOurVehicle && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-motortrend-red text-white px-2 py-1 rounded-full text-xs font-medium">
                  Our Pick
                </div>
              </div>
            )}

            <div className="p-4 space-y-3">
              <div className="aspect-[4/3] bg-neutral-100 rounded-xl overflow-hidden">
                <img 
                  src={vehicle.imageUrl} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="text-center space-y-1">
                <h6 className="text-sm font-medium text-neutral-1 line-clamp-1">{vehicle.name}</h6>
                <div className="text-xs text-neutral-3">
                  ${vehicle.price.toLocaleString()}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-neutral-2">{vehicle.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Button variant="outline" className="px-8">
          View Detailed Comparison
        </Button>
      </div>
    </div>
  );
};

export default CompetitorsComparison;
