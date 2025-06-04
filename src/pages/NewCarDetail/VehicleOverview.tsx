import React, { useState } from 'react';
import { Award, Users, Shield, Star, Gauge, Zap, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface VehicleOverviewProps {
  overallRating: number;
  ownerRating: number;
  carTitle: string;
  specs: {
    engine: string;
    acceleration: string;
    range: string;
    charging: string;
    drivetrain: string;
    seating: string;
    cargo: string;
    warranty: string;
  };
}

const VehicleOverview: React.FC<VehicleOverviewProps> = ({
  overallRating,
  ownerRating,
  carTitle,
  specs
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="space-y-6">
        <Card>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-neutral-1 mb-4">Vehicle Overview</h2>
              <div className="space-y-4">
                <p className="text-neutral-2">
                  The {carTitle} represents the pinnacle of modern automotive engineering, 
                  combining cutting-edge electric technology with luxurious comfort and 
                  impressive performance capabilities.
                </p>
                <div className={`space-y-4 overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
                  <p className="text-neutral-2">
                    At the heart of this remarkable vehicle lies a state-of-the-art electric powertrain, 
                    delivering an exhilarating blend of instantaneous torque and sustainable performance. 
                    The meticulously crafted interior showcases premium materials and advanced technology, 
                    creating an environment that perfectly balances luxury with functionality.
                  </p>
                  <p className="text-neutral-2">
                    The vehicle's exterior design is a testament to aerodynamic efficiency, 
                    with clean lines and thoughtful details that not only enhance its visual appeal 
                    but also contribute to its impressive range and performance metrics. Advanced 
                    driver assistance systems and cutting-edge safety features work seamlessly together, 
                    providing peace of mind for both driver and passengers.
                  </p>
                  <p className="text-neutral-2">
                    Charging capabilities are equally impressive, with support for rapid DC charging 
                    that can add significant range in just minutes. The sophisticated battery management 
                    system ensures optimal performance and longevity, while the regenerative braking 
                    system maximizes efficiency during daily driving.
                  </p>
                  <p className="text-neutral-2">
                    The infotainment system represents the latest in connected car technology, 
                    offering intuitive controls, seamless smartphone integration, and over-the-air 
                    updates that keep the vehicle's features and functionality current. The spacious 
                    interior provides ample room for both passengers and cargo, making it an ideal 
                    choice for both daily commuting and longer journeys.
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center gap-2 text-neutral-3 hover:text-neutral-1"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? (
                    <>
                      Show Less
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                  Read More
                      <ChevronDown size={16} />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-1">Ratings</h3>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs text-neutral-1 flex items-center">
                    <Award size={14} className="text-motortrend-red mr-1" />
                    Expert Rating
                  </h4>
                  <span className="text-base font-bold text-neutral-1">
                    {overallRating.toFixed(1)}/10
                  </span>
                </div>
                <Progress value={overallRating * 10} className="h-1.5 bg-neutral-6" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-neutral-4">Poor</span>
                  <span className="text-xs text-neutral-4">Excellent</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs text-neutral-1 flex items-center">
                    <Users size={14} className="text-motortrend-red mr-1" />
                    Owner Rating
                  </h4>
                  <span className="text-base font-bold text-neutral-1">
                    {ownerRating}/5
                  </span>
                </div>
                <Progress value={ownerRating * 20} className="h-1.5 bg-neutral-6" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-neutral-4">Poor</span>
                  <span className="text-xs text-neutral-4">Excellent</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs text-neutral-1 flex items-center">
                    <Shield size={14} className="text-motortrend-red mr-1" />
                    Safety Rating
                  </h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-neutral-4">NHTSA Overall Rating</span>
                  <span className="text-xs font-medium text-green-600">Top Safety Pick+</span>
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-1">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-neutral-3 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-medium text-neutral-1">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default VehicleOverview;
