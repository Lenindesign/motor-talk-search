import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Medal, Trophy, Star } from 'lucide-react';

// Mock data for overall SUV rankings
const overallSUVs = [
  {
    id: '1',
    rank: 1,
    title: '2024 BMW X3',
    imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    motorTrendScore: 8.9,
    category: 'Compact Luxury SUV',
    msrp: '$45,400',
    mpg: '23/29',
    engine: '2.0L Turbo I4',
    horsepower: '248 hp'
  },
  {
    id: '2',
    rank: 2,
    title: '2024 Mercedes-Benz GLC',
    imageUrl: '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
    motorTrendScore: 8.7,
    category: 'Compact Luxury SUV',
    msrp: '$48,250',
    mpg: '22/29',
    engine: '2.0L Turbo I4',
    horsepower: '255 hp'
  },
  {
    id: '3',
    rank: 3,
    title: '2024 Audi Q5',
    imageUrl: '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png',
    motorTrendScore: 8.5,
    category: 'Compact Luxury SUV',
    msrp: '$44,200',
    mpg: '23/28',
    engine: '2.0L Turbo I4',
    horsepower: '261 hp'
  },
  {
    id: '4',
    rank: 4,
    title: '2024 Lexus RX',
    imageUrl: '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
    motorTrendScore: 8.3,
    category: 'Midsize Luxury SUV',
    msrp: '$48,950',
    mpg: '31/28',
    engine: '2.5L I4 Hybrid',
    horsepower: '246 hp'
  },
  {
    id: '5',
    rank: 5,
    title: '2024 Acura MDX',
    imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
    motorTrendScore: 8.2,
    category: 'Midsize Luxury SUV',
    msrp: '$49,550',
    mpg: '19/26',
    engine: '3.5L V6',
    horsepower: '290 hp'
  },
  {
    id: '6',
    rank: 6,
    title: '2024 Genesis GV70',
    imageUrl: '/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png',
    motorTrendScore: 8.8,
    category: 'Compact Luxury SUV',
    msrp: '$42,900',
    mpg: '22/29',
    engine: '2.5L Turbo I4',
    horsepower: '300 hp'
  }
].map(suv => ({
  ...suv,
  motorTrendScore: typeof suv.motorTrendScore === 'string' ? parseFloat(suv.motorTrendScore) : suv.motorTrendScore
}));

const SUVOverallRankings: React.FC = () => {
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'price'>('rank');

  const sortedSUVs = [...overallSUVs].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.motorTrendScore - a.motorTrendScore;
      case 'rank':
        return a.rank - b.rank;
      case 'price': {
        const priceA = parseFloat(a.msrp.replace(/[^0-9.-]+/g, ''));
        const priceB = parseFloat(b.msrp.replace(/[^0-9.-]+/g, ''));
        return priceA - priceB;
      }
      default:
        return a.rank - b.rank;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="text-motortrend-red" size={24} />
          <h2 className="typography-title text-2xl">Overall Best SUVs 2025</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'rank' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('rank')}
          >
            By Rank
          </Button>
          <Button
            variant={sortBy === 'score' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('score')}
          >
            By Score
          </Button>
          <Button
            variant={sortBy === 'price' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('price')}
          >
            By Price
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSUVs.map((suv, index) => (
          <Card key={suv.id} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="default" className="bg-motortrend-red text-white font-bold">
                #{suv.rank}
              </Badge>
            </div>
            
            <div className="relative pt-[56.25%]">
              <img 
                src={suv.imageUrl} 
                alt={suv.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2">{suv.title}</h3>
                  <p className="text-sm text-gray-600">{suv.category}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-neutral-100 rounded px-2 py-1">
                    <Star className="text-motortrend-red mr-1" size={16} />
                    <span className="font-bold text-motortrend-red">{suv.motorTrendScore.toFixed(1)}</span>
                    <span className="text-sm font-medium ml-1">MT Score</span>
                  </div>
                  <span className="font-semibold text-lg">{suv.msrp}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">MPG:</span>
                    <span className="ml-1 font-medium">{suv.mpg}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Power:</span>
                    <span className="ml-1 font-medium">{suv.horsepower}</span>
                  </div>
                </div>
                
                <div className="text-sm">
                  <span className="text-gray-600">Engine:</span>
                  <span className="ml-1 font-medium">{suv.engine}</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Add to Garage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SUVOverallRankings;
