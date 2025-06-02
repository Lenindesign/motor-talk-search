
import React from 'react';
import { Trophy, Star, TrendingUp, Award } from 'lucide-react';
import CarCard from '@/components/CarCard';
import { CarData } from '@/components/CarCard/types';
import { cn } from '@/lib/utils';

interface SUVOverallRankingsProps {
  suvs: CarData[];
}

const SUVOverallRankings: React.FC<SUVOverallRankingsProps> = ({ suvs }) => {
  // Sort by MotorTrend score descending
  const rankedSUVs = [...suvs].sort((a, b) => (b.motorTrendScore || 0) - (a.motorTrendScore || 0));
  
  // Get top performers
  const topSUV = rankedSUVs[0];
  const topThree = rankedSUVs.slice(0, 3);
  const topTen = rankedSUVs.slice(0, 10);

  return (
    <div className="space-y-12">
      {/* Winner Spotlight */}
      {topSUV && (
        <div className="bg-gradient-to-r from-motortrend-red/5 to-yellow-500/5 p-8 rounded-2xl border-2 border-motortrend-red/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-motortrend-red rounded-full">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="typography-title text-2xl font-bold">2024 SUV of the Year</h2>
              <p className="typography-small text-neutral-4">Highest-rated SUV overall</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <CarCard car={topSUV} type="new" className="shadow-xl" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-motortrend-red">
                    {topSUV.motorTrendScore?.toFixed(1) || 'N/A'}
                  </div>
                  <div className="typography-small text-neutral-4">MotorTrend Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">#1</div>
                  <div className="typography-small text-neutral-4">Overall Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {topSUV.motorTrendCategoryRank || 'N/A'}
                  </div>
                  <div className="typography-small text-neutral-4">Class Rank</div>
                </div>
              </div>
              
              <div className="prose prose-sm">
                <p className="typography-body text-neutral-2">
                  Our top-rated SUV combines exceptional performance, safety, and value. 
                  With outstanding scores across all testing categories, this vehicle sets 
                  the standard for what an SUV should be in 2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Podium */}
      <div>
        <h3 className="typography-title text-xl font-bold mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-motortrend-red" />
          Top 3 SUVs Overall
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThree.map((suv, index) => (
            <div key={suv.id} className="relative">
              <div className={cn(
                "absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg z-10",
                index === 0 && "bg-yellow-500",
                index === 1 && "bg-gray-400",
                index === 2 && "bg-amber-600"
              )}>
                #{index + 1}
              </div>
              <CarCard car={suv} type="new" className="shadow-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 Rankings */}
      <div>
        <h3 className="typography-title text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-motortrend-red" />
          Top 10 Rankings
        </h3>
        
        <div className="bg-white rounded-xl border border-neutral-6 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-neutral-7 border-b border-neutral-6 font-semibold typography-small">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Vehicle</div>
            <div className="col-span-2 text-center">MT Score</div>
            <div className="col-span-2 text-center">Starting Price</div>
            <div className="col-span-2 text-center">Class Rank</div>
          </div>
          
          {topTen.map((suv, index) => (
            <div key={suv.id} className="grid grid-cols-12 gap-4 p-4 border-b border-neutral-6 last:border-b-0 hover:bg-neutral-7/50 transition-colors">
              <div className="col-span-1 text-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm",
                  index === 0 && "bg-yellow-500",
                  index === 1 && "bg-gray-400", 
                  index === 2 && "bg-amber-600",
                  index > 2 && "bg-neutral-4"
                )}>
                  {index + 1}
                </div>
              </div>
              <div className="col-span-5">
                <div className="typography-body font-semibold">{suv.title}</div>
                <div className="typography-small text-neutral-4">{suv.category}</div>
              </div>
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">{suv.motorTrendScore?.toFixed(1) || 'N/A'}</span>
                </div>
              </div>
              <div className="col-span-2 text-center font-semibold">
                {suv.price || 'TBD'}
              </div>
              <div className="col-span-2 text-center">
                <span className="text-green-600 font-semibold">
                  #{suv.motorTrendCategoryRank || 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SUVOverallRankings;
