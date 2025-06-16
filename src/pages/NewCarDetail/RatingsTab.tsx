import React from 'react';
import { Progress } from '@/components/ui/progress';
import { expertRatings } from './utils';
import { Award, TrendingUp, Shield, Zap, Users, Star } from 'lucide-react';

const categoryIcons = {
  'Performance': Zap,
  'Comfort': Users,
  'Safety': Shield,
  'Value': TrendingUp,
  'Technology': Award,
  'Design': Star
};

const RatingsTab: React.FC = () => {
  const overallScore = expertRatings.reduce((acc, rating) => acc + rating.score, 0) / expertRatings.length;

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-motortrend-red to-red-600 rounded-3xl shadow-modern-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{overallScore.toFixed(1)}</div>
            <div className="text-xs text-white/80">out of 10</div>
          </div>
        </div>
        <div>
          <h3 className="typography-subtitle text-neutral-1">Expert Rating</h3>
          <p className="text-sm text-neutral-3">Based on comprehensive testing and evaluation</p>
        </div>
      </div>

      {/* Rating Categories */}
      <div className="space-y-4">
        {expertRatings.map((rating) => {
          const IconComponent = categoryIcons[rating.category as keyof typeof categoryIcons] || Award;
          const scorePercentage = (rating.score / 10) * 100;
          
          return (
            <div key={rating.category} className="bg-neutral-8 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5 text-neutral-2" />
                  </div>
                  <div>
                    <h4 className="typography-subtitle text-neutral-1">{rating.category}</h4>
                    <p className="text-xs text-neutral-3">Expert evaluation</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-1">{rating.score}</div>
                  <div className="text-xs text-neutral-3">/10</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress 
                  value={scorePercentage} 
                  className="h-2 bg-neutral-6"
                />
                <p className="text-sm text-neutral-2 leading-relaxed">{rating.description}</p>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};

export default RatingsTab;
