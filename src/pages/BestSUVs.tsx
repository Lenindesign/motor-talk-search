
import React, { useState } from 'react';
import { ArrowRight, Trophy, Star, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarCard from '@/components/CarCard';
import { mockNewCars } from '@/services/mockData';
import SUVClassRankings from '@/components/suv-hub/SUVClassRankings';
import SUVOverallRankings from '@/components/suv-hub/SUVOverallRankings';
import SUVFilters from '@/components/suv-hub/SUVFilters';
import { cn } from '@/lib/utils';

const BestSUVs: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('score');

  // Filter SUVs from mock data (in real app, this would be an API call)
  const allSUVs = mockNewCars.filter(car => 
    car.category?.toLowerCase().includes('suv') || 
    car.bodyStyle?.toLowerCase().includes('suv')
  );

  // Apply filters
  const filteredSUVs = allSUVs.filter(suv => {
    if (selectedClass !== 'all') {
      const suvClass = getSUVClass(suv.title);
      if (suvClass !== selectedClass) return false;
    }
    
    if (priceRange !== 'all') {
      const price = parseFloat(suv.price?.replace(/[^0-9.]/g, '') || '0');
      switch (priceRange) {
        case 'under-30k':
          return price < 30000;
        case '30k-50k':
          return price >= 30000 && price < 50000;
        case '50k-75k':
          return price >= 50000 && price < 75000;
        case 'over-75k':
          return price >= 75000;
        default:
          return true;
      }
    }
    
    return true;
  });

  // Sort SUVs
  const sortedSUVs = [...filteredSUVs].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return (b.motorTrendScore || 0) - (a.motorTrendScore || 0);
      case 'price-low':
        return parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0') - parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0');
      case 'price-high':
        return parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0') - parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0');
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-neutral-1 to-neutral-2 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="typography-display text-4xl md:text-5xl font-bold mb-4">
              Best SUVs of 2024
            </h1>
            <p className="typography-body text-xl text-neutral-6 max-w-3xl mx-auto">
              Discover the top-rated SUVs across all categories. From compact crossovers to full-size luxury SUVs, 
              find your perfect vehicle with expert ratings, comprehensive reviews, and detailed comparisons.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <Trophy className="w-8 h-8 text-motortrend-red mx-auto mb-3" />
              <h3 className="typography-title text-lg font-semibold mb-2">Expert Tested</h3>
              <p className="typography-small text-neutral-6">
                Every SUV rated by our expert testing team
              </p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <Star className="w-8 h-8 text-motortrend-red mx-auto mb-3" />
              <h3 className="typography-title text-lg font-semibold mb-2">MotorTrend Scores</h3>
              <p className="typography-small text-neutral-6">
                Comprehensive ratings across all categories
              </p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-motortrend-red mx-auto mb-3" />
              <h3 className="typography-title text-lg font-semibold mb-2">Updated Rankings</h3>
              <p className="typography-small text-neutral-6">
                Latest rankings based on 2024 model testing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overall" className="flex items-center gap-2">
              <Trophy size={16} />
              Overall Rankings
            </TabsTrigger>
            <TabsTrigger value="by-class" className="flex items-center gap-2">
              <Filter size={16} />
              By Class
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Star size={16} />
              Browse All
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overall">
            <SUVOverallRankings suvs={allSUVs} />
          </TabsContent>

          <TabsContent value="by-class">
            <SUVClassRankings suvs={allSUVs} />
          </TabsContent>

          <TabsContent value="browse">
            <div className="space-y-6">
              <SUVFilters
                selectedClass={selectedClass}
                priceRange={priceRange}
                sortBy={sortBy}
                onClassChange={setSelectedClass}
                onPriceRangeChange={setPriceRange}
                onSortChange={setSortBy}
              />
              
              <div className="flex items-center justify-between">
                <h2 className="typography-title text-2xl font-bold">
                  All SUVs ({sortedSUVs.length})
                </h2>
                <p className="typography-small text-neutral-4">
                  Showing {sortedSUVs.length} of {allSUVs.length} SUVs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedSUVs.map((suv) => (
                  <CarCard
                    key={suv.id}
                    car={suv}
                    type="new"
                    className="h-full"
                  />
                ))}
              </div>

              {sortedSUVs.length === 0 && (
                <div className="text-center py-12">
                  <p className="typography-body text-neutral-4">
                    No SUVs found matching your criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper function to determine SUV class based on title/model
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

export default BestSUVs;
