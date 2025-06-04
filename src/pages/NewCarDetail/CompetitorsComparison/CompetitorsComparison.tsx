import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCompetitors } from './utils';

const CompetitorsComparison: React.FC = () => {
  const currentVehicle = {
    name: 'Our Vehicle',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/67c222d600145b000869b9f8/1-2025-lucid-air-front-view.jpg',
    price: 85000,
    specs: {
      engine: '400 HP Electric Motor',
      acceleration: '4.2 seconds 0-60 mph',
      range: '405 miles EPA',
      charging: '350kW DC Fast Charging',
      drivetrain: 'All-Wheel Drive',
      seating: '5 passengers',
      cargo: '28.1 cu ft',
      warranty: '4 years/50,000 miles'
    },
    pros: ['Premium interior', 'Advanced tech features', 'Excellent range'],
    cons: ['Expensive options', 'Learning curve for tech', 'Firm ride']
  };
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil((mockCompetitors.length + 1) / itemsPerPage);
  
  const handlePrevious = () => {
    setCurrentPage(prev => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentPage(prev => (prev === totalPages - 1 ? 0 : prev + 1));
  };
  
  // Combine current vehicle with competitors for pagination
  const allVehicles = [currentVehicle, ...mockCompetitors];
  const displayedVehicles = allVehicles.slice(
    currentPage * itemsPerPage, 
    Math.min((currentPage + 1) * itemsPerPage, allVehicles.length)
  );

  return (
    <div className="space-y-6">
      <h3 className="text-sm text-neutral-1 font-semibold mb-2">Class Comparison</h3>
      
      {/* Carousel Navigation */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-neutral-3">
          {currentPage + 1} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full" 
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full" 
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedVehicles.map((vehicle, index) => (
          <Card key={index} className="overflow-hidden border border-neutral-6 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col items-center mb-3">
                <img 
                  src={vehicle.imageUrl} 
                  alt={vehicle.name} 
                  className="w-full h-32 object-cover rounded-md mb-3" 
                />
                <h4 className="text-sm font-semibold text-neutral-1">{vehicle.name}</h4>
                <p className="text-xs text-neutral-3 font-medium">
                  ${vehicle.price.toLocaleString()} MSRP
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-green-600 mb-1.5">Pros</h5>
                  <ul className="space-y-1">
                    {vehicle.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        <span className="text-xs text-neutral-2">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-red-500 mb-1.5">Cons</h5>
                  <ul className="space-y-1">
                    {vehicle.cons.map((con, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                        <span className="text-xs text-neutral-2">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    <div className="flex justify-center mt-6">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs px-4 py-2 text-neutral-1 bg-white border-neutral-6 hover:bg-neutral-8 transition-colors" 
      >
        See Full Comparison
      </Button>
    </div>
  </div>
  );
};

export default CompetitorsComparison;
