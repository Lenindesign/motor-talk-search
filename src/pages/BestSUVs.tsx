
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Filter } from 'lucide-react';
import SUVOverallRankings from '../components/suv-hub/SUVOverallRankings';
import SUVClassRankings from '../components/suv-hub/SUVClassRankings';
import SUVFilters from '../components/suv-hub/SUVFilters';

const BestSUVs = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [minScore, setMinScore] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [fuelType, setFuelType] = useState('all');
  const [sortBy, setSortBy] = useState('rank');

  // Mock stats with proper number types
  const stats = {
    totalSUVs: 156,
    averageScore: 8.2,
    topScore: 9.1,
    priceRange: '$24,200 - $95,800'
  };

  const displayStats = {
    ...stats,
    averageScore: typeof stats.averageScore === 'string' ? parseFloat(stats.averageScore) : stats.averageScore,
    topScore: typeof stats.topScore === 'string' ? parseFloat(stats.topScore) : stats.topScore
  };

  return (
    <div className="min-h-screen bg-motortrend-gray">
              <div className="max-w-[1200px] mx-auto px-2 sm:px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="typography-display text-4xl md:text-5xl font-bold text-motortrend-dark mb-4">
            Best SUVs 2025
          </h1>
          <p className="typography-body text-lg text-neutral-4 max-w-3xl mx-auto">
            Discover the top-rated SUVs based on MotorTrend's comprehensive testing and expert analysis. 
            From compact crossovers to full-size luxury SUVs, find the perfect vehicle for your lifestyle.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="typography-title text-2xl font-bold text-motortrend-red">
                {displayStats.totalSUVs}
              </div>
              <div className="typography-small text-neutral-4">SUVs Tested</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="typography-title text-2xl font-bold text-motortrend-red">
                {displayStats.averageScore.toFixed(1)}
              </div>
              <div className="typography-small text-neutral-4">Avg MT Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="typography-title text-2xl font-bold text-motortrend-red">
                {displayStats.topScore.toFixed(1)}
              </div>
              <div className="typography-small text-neutral-4">Top Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="typography-title text-xl font-bold text-motortrend-red">
                {displayStats.priceRange}
              </div>
              <div className="typography-small text-neutral-4">Price Range</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="text-motortrend-red" size={24} />
                SUV Rankings & Reviews
              </CardTitle>
              <SUVFilters 
                minScore={minScore}
                maxPrice={maxPrice}
                fuelType={fuelType}
                sortBy={sortBy}
                onMinScoreChange={setMinScore}
                onMaxPriceChange={setMaxPrice}
                onFuelTypeChange={setFuelType}
                onSortByChange={setSortBy}
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overall" className="flex items-center gap-2">
                  <Trophy size={16} />
                  Overall Best
                </TabsTrigger>
                <TabsTrigger value="class" className="flex items-center gap-2">
                  <Medal size={16} />
                  By Class
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overall" className="mt-6">
                <SUVOverallRankings />
              </TabsContent>
              
              <TabsContent value="class" className="mt-6">
                <SUVClassRankings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BestSUVs;
