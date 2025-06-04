import React from 'react';
import { Award, Users, Zap, Shield, Fuel, Car, DollarSign, Gauge, ThumbsUp, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
interface QuickStatsProps {
  overallRating: number;
  ownerRating: number;
}
const QuickStats: React.FC<QuickStatsProps> = ({
  overallRating,
  ownerRating
}) => {
  return (
    <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5">
      <h2 className="text-lg text-neutral-1 font-bold mb-3">Vehicle Overview</h2>
      
      <div className="space-y-4">
        {/* Ratings Section */}
        <div className="border-b border-neutral-6 pb-4">
          <h3 className="text-sm text-neutral-1 font-semibold mb-3">Ratings</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs text-neutral-1 flex items-center">
                  <Award size={14} className="text-motortrend-red mr-1" />
                  Expert Rating
                </h4>
                <span className="text-base text-neutral-1 font-bold leading-tight">
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
                <span className="text-base text-neutral-1 font-bold leading-tight">
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
        </div>
        
        {/* Performance Section */}
        <div className="border-b border-neutral-6 pb-4">
          <h3 className="text-sm text-neutral-1 font-semibold flex items-center mb-2">
            <Gauge size={14} className="text-motortrend-red mr-1" />
            Performance
          </h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-xs text-neutral-3 block">Horsepower</span>
              <span className="text-xs font-medium text-neutral-1">400 hp</span>
            </div>
            <div>
              <span className="text-xs text-neutral-3 block">Torque</span>
              <span className="text-xs font-medium text-neutral-1">415 lb-ft</span>
            </div>
            <div>
              <span className="text-xs text-neutral-3 block">0-60 mph</span>
              <span className="text-xs font-medium text-neutral-1">4.8 sec</span>
            </div>
            <div>
              <span className="text-xs text-neutral-3 block">Top Speed</span>
              <span className="text-xs font-medium text-neutral-1">130 mph</span>
            </div>
          </div>
        </div>
        
        {/* Electric Range Section */}
        <div className="border-b border-neutral-6 pb-4">
          <h3 className="text-sm text-neutral-1 font-semibold flex items-center mb-2">
            <Zap size={14} className="text-motortrend-red mr-1" />
            Electric Range
          </h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-xs text-neutral-3 block">EPA Range</span>
              <span className="text-xs font-medium text-neutral-1">405 mi</span>
            </div>
            <div>
              <span className="text-xs text-neutral-3 block">City</span>
              <span className="text-xs font-medium text-neutral-1">420 mi</span>
            </div>
            <div>
              <span className="text-xs text-neutral-3 block">Highway</span>
              <span className="text-xs font-medium text-neutral-1">390 mi</span>
            </div>
            <div>
              <span className="text-xs text-neutral-3 block">MPGe</span>
              <span className="text-xs font-medium text-neutral-1">92</span>
            </div>
          </div>
        </div>
        
        {/* Value & Ownership Section */}
        <div className="border-b border-neutral-6 pb-4">
          <h3 className="text-sm text-neutral-1 font-semibold flex items-center mb-2">
            <DollarSign size={14} className="text-motortrend-red mr-1" />
            Value & Ownership
          </h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-xs text-neutral-3 block">Est. 5-Year Cost</span>
              <span className="text-xs font-medium text-neutral-1">$48,250</span>
            </div>
            <div>
              <span className="text-xs text-neutral-3 block">Insurance (Annual)</span>
              <span className="text-xs font-medium text-neutral-1">$2,100</span>
            </div>
            <div>
              <span className="text-xs text-neutral-3 block">Warranty</span>
              <span className="text-xs font-medium text-neutral-1">5yr / 60,000mi</span>
            </div>
          </div>
        </div>
        
        {/* Pros & Cons Section */}
        <div>
          <h3 className="text-sm text-neutral-1 font-semibold flex items-center mb-2">
            <ThumbsUp size={14} className="text-motortrend-red mr-1" />
            Pros & Cons
          </h3>
          
          <div className="space-y-2">
            <div>
              <h4 className="text-xs text-green-600 font-medium flex items-center mb-1">
                <ThumbsUp size={12} className="mr-1" />
                Pros
              </h4>
              <ul className="text-xs text-neutral-2 space-y-0.5">
                <li>• Impressive electric range</li>
                <li>• Premium interior materials</li>
                <li>• Cutting-edge technology</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs text-red-500 font-medium flex items-center mb-1">
                <ThumbsUp size={12} className="mr-1 rotate-180" />
                Cons
              </h4>
              <ul className="text-xs text-neutral-2 space-y-0.5">
                <li>• Higher price than competitors</li>
                <li>• Limited cargo space</li>
                <li>• Firm ride quality</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default QuickStats;