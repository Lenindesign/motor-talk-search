import React from 'react';
import { Award, Users, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
interface QuickStatsProps {
  overallRating: number;
  ownerRating: number;
}
const QuickStats: React.FC<QuickStatsProps> = ({
  overallRating,
  ownerRating
}) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-white shadow-modern border-modern rounded-xl overflow-hidden hover:shadow-modern-lg transition-all duration-200">
        <CardContent className="card-spacing text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full mr-3 bg-motortrend-dark">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <div className="flex items-baseline">
                <span className="typography-display text-neutral-1 font-bold">
                  {overallRating.toFixed(1)}
                </span>
                <span className="typography-body text-neutral-4 ml-1">/10</span>
              </div>
            </div>
          </div>
          <p className="typography-caption text-neutral-4 font-medium">Expert Rating</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-modern border-modern rounded-xl overflow-hidden hover:shadow-modern-lg transition-all duration-200">
        <CardContent className="card-spacing text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-motortrend-dark rounded-full mr-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <div className="flex items-baseline">
                <span className="typography-display text-neutral-1 font-bold">
                  {ownerRating}
                </span>
                <span className="typography-body text-neutral-4 ml-1">/5</span>
              </div>
            </div>
          </div>
          <p className="typography-caption text-neutral-4 font-medium">Owner Rating</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-modern border-modern rounded-xl overflow-hidden hover:shadow-modern-lg transition-all duration-200">
        <CardContent className="card-spacing text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-motortrend-dark rounded-full mr-0">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <div className="flex items-baseline">
                <span className="typography-display text-neutral-1 font-bold">405</span>
                <span className="typography-body text-neutral-4 ml-1">mi</span>
              </div>
            </div>
          </div>
          <p className="typography-caption text-neutral-4 font-medium">EPA Range</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-modern border-modern rounded-xl overflow-hidden hover:shadow-modern-lg transition-all duration-200">
        <CardContent className="card-spacing text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-motortrend-dark rounded-full mr-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <div className="flex items-baseline">
                <span className="typography-display text-neutral-1 font-bold">5</span>
                <span className="typography-body text-neutral-4 ml-1">★</span>
              </div>
            </div>
          </div>
          <p className="typography-caption text-neutral-4 font-medium">Safety Rating</p>
        </CardContent>
      </Card>
    </div>;
};
export default QuickStats;