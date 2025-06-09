import React, { useState } from 'react';
import { Award, Users, Shield, Star, Gauge, Zap, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
        <Card className="bg-white shadow-sm border border-neutral-6 rounded-xl overflow-hidden">
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="typography-title text-neutral-1">Vehicle Overview</h2>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Avatar className="h-8 w-8 border border-neutral-6 overflow-hidden">
                            <AvatarImage 
                              src="https://d2kde5ohu8qb21.cloudfront.net/files/66b0c284018fc100080e47eb/billyrehbock.jpg" 
                              alt="Billy Rehbock" 
                              className="object-cover object-center" 
                            />
                            <AvatarFallback className="text-xs bg-neutral-7 text-neutral-1">BR</AvatarFallback>
                          </Avatar>
                          <span className="typography-caption text-neutral-3">Billy Rehbock</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="typography-caption-small">Motortrend Senior Editor</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
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
                <div className="mt-4 bg-neutral-8 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <Zap className="h-5 w-5 text-neutral-1" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="typography-subtitle text-neutral-1">AI Quick Summary</h3>
                      <p className="typography-body text-neutral-2">
                        The {carTitle}, formerly bZ4X, features improved range, charging, and design. It offers 
                        FWD and AWD options with enhanced powertrains and a revamped interior with a 14-inch 
                        touchscreen. Safety features and a suite of driver aids are standard, with the Limited FWD 
                        trim offering the best balance.
                      </p>
                      <p className="typography-caption text-neutral-3 italic">
                        This summary was generated by AI using content from this MotorTrend article
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="ghost-black" 
                  className="w-full flex items-center justify-center gap-2 text-neutral-3 hover:text-neutral-1 mt-4"
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
