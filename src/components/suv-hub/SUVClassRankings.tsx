
import React, { useState } from 'react';
import { Car, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarCard from '@/components/CarCard';
import { CarData } from '@/components/CarCard/types';
import { cn } from '@/lib/utils';

interface SUVClassRankingsProps {
  suvs: CarData[];
}

const suvClasses = [
  { id: 'subcompact', name: 'Subcompact SUVs', description: 'City-friendly SUVs under $30k' },
  { id: 'compact', name: 'Compact SUVs', description: 'Perfect balance of size and efficiency' },
  { id: 'mid-size', name: 'Mid-Size SUVs', description: 'Family-focused with 3-row seating' },
  { id: 'full-size', name: 'Full-Size SUVs', description: 'Maximum space and capability' },
  { id: 'luxury', name: 'Luxury SUVs', description: 'Premium features and performance' },
];

const SUVClassRankings: React.FC<SUVClassRankingsProps> = ({ suvs }) => {
  const [activeClass, setActiveClass] = useState('compact');

  const getSUVClass = (title: string): string => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('full-size') || titleLower.includes('tahoe') || titleLower.includes('suburban') || titleLower.includes('expedition')) {
      return 'full-size';
    }
    if (titleLower.includes('mid-size') || titleLower.includes('grand cherokee') || titleLower.includes('pilot') || titleLower.includes('explorer')) {
      return 'mid-size';
    }
    if (titleLower.includes('compact') || titleLower.includes('cr-v') || titleLower.includes('rav4') || titleLower.includes('escape')) {
      return 'compact';
    }
    if (titleLower.includes('subcompact') || titleLower.includes('ecosport') || titleLower.includes('trailblazer')) {
      return 'subcompact';
    }
    if (titleLower.includes('luxury') || titleLower.includes('bmw') || titleLower.includes('mercedes') || titleLower.includes('audi')) {
      return 'luxury';
    }
    
    return 'mid-size'; // Default fallback
  };

  const getClassSUVs = (classId: string) => {
    return suvs
      .filter(suv => getSUVClass(suv.title) === classId)
      .sort((a, b) => (b.motorTrendScore || 0) - (a.motorTrendScore || 0));
  };

  const activeClassSUVs = getClassSUVs(activeClass);
  const activeClassInfo = suvClasses.find(c => c.id === activeClass);

  return (
    <div className="space-y-8">
      {/* Class Navigation */}
      <div>
        <h2 className="typography-title text-2xl font-bold mb-6">SUV Classes</h2>
        <div className="flex flex-wrap gap-3">
          {suvClasses.map((suvClass) => {
            const classCount = getClassSUVs(suvClass.id).length;
            return (
              <Button
                key={suvClass.id}
                variant={activeClass === suvClass.id ? "default" : "outline"}
                onClick={() => setActiveClass(suvClass.id)}
                className="flex items-center gap-2"
              >
                <Car size={16} />
                {suvClass.name}
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">
                  {classCount}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Active Class Content */}
      {activeClassInfo && (
        <div className="bg-gradient-to-r from-neutral-7 to-white p-6 rounded-xl border border-neutral-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-motortrend-red rounded-lg">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="typography-title text-xl font-bold">{activeClassInfo.name}</h3>
              <p className="typography-small text-neutral-4">{activeClassInfo.description}</p>
            </div>
          </div>

          {activeClassSUVs.length > 0 ? (
            <div className="space-y-6">
              {/* Class Winner */}
              {activeClassSUVs[0] && (
                <div className="bg-white p-6 rounded-xl border-2 border-motortrend-red/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-motortrend-red" />
                    <span className="typography-small font-semibold text-motortrend-red">
                      Best {activeClassInfo.name.replace(' SUVs', '')} SUV
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    <div className="lg:col-span-1">
                      <CarCard car={activeClassSUVs[0]} type="new" />
                    </div>
                    <div className="lg:col-span-2 space-y-3">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-motortrend-red">
                            {activeClassSUVs[0].motorTrendScore?.toFixed(1) || 'N/A'}
                          </div>
                          <div className="typography-small text-neutral-4">MotorTrend Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">#1</div>
                          <div className="typography-small text-neutral-4">Class Rank</div>
                        </div>
                      </div>
                      <p className="typography-body text-neutral-2">
                        The top-rated SUV in the {activeClassInfo.name.toLowerCase()} category, 
                        offering the best combination of performance, features, and value.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Class Rankings Table */}
              <div>
                <h4 className="typography-title text-lg font-bold mb-4">
                  {activeClassInfo.name} Rankings
                </h4>
                
                <div className="bg-white rounded-xl border border-neutral-6 overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-neutral-7 border-b border-neutral-6 font-semibold typography-small">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-6">Vehicle</div>
                    <div className="col-span-2 text-center">MT Score</div>
                    <div className="col-span-3 text-center">Starting Price</div>
                  </div>
                  
                  {activeClassSUVs.slice(0, 10).map((suv, index) => (
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
                      <div className="col-span-6">
                        <div className="typography-body font-semibold">{suv.title}</div>
                        <div className="typography-small text-neutral-4">{suv.category}</div>
                      </div>
                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{suv.motorTrendScore?.toFixed(1) || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="col-span-3 text-center font-semibold">
                        {suv.price || 'TBD'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top 3 Cards */}
              {activeClassSUVs.length >= 3 && (
                <div>
                  <h4 className="typography-title text-lg font-bold mb-4">
                    Top 3 {activeClassInfo.name}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activeClassSUVs.slice(0, 3).map((suv, index) => (
                      <div key={suv.id} className="relative">
                        <div className={cn(
                          "absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10",
                          index === 0 && "bg-yellow-500",
                          index === 1 && "bg-gray-400",
                          index === 2 && "bg-amber-600"
                        )}>
                          #{index + 1}
                        </div>
                        <CarCard car={suv} type="new" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-neutral-4 mx-auto mb-3" />
              <p className="typography-body text-neutral-4">
                No SUVs available in this class yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SUVClassRankings;
