
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Medal, Star } from 'lucide-react';

// Mock data for different SUV classes with proper number types
const suvClasses = {
  subcompact: [
    {
      id: 'sc1',
      rank: 1,
      title: '2024 Mazda CX-30',
      imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
      motorTrendScore: 8.5,
      msrp: '$24,200',
      mpg: '24/32',
      engine: '2.5L I4',
      horsepower: '186 hp'
    }
    // ... more subcompact SUVs
  ].map(suv => ({
    ...suv,
    motorTrendScore: typeof suv.motorTrendScore === 'string' ? parseFloat(suv.motorTrendScore) : suv.motorTrendScore
  })),
  compact: [
    {
      id: 'c1',
      rank: 1,
      title: '2024 Honda CR-V',
      imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
      motorTrendScore: 8.7,
      msrp: '$28,200',
      mpg: '28/34',
      engine: '1.5L Turbo I4',
      horsepower: '190 hp'
    }
    // ... more compact SUVs
  ].map(suv => ({
    ...suv,
    motorTrendScore: typeof suv.motorTrendScore === 'string' ? parseFloat(suv.motorTrendScore) : suv.motorTrendScore
  })),
  midsize: [
    {
      id: 'm1',
      rank: 1,
      title: '2024 Toyota Highlander',
      imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
      motorTrendScore: 8.3,
      msrp: '$36,420',
      mpg: '21/29',
      engine: '3.5L V6',
      horsepower: '295 hp'
    }
    // ... more midsize SUVs
  ].map(suv => ({
    ...suv,
    motorTrendScore: typeof suv.motorTrendScore === 'string' ? parseFloat(suv.motorTrendScore) : suv.motorTrendScore
  })),
  fullsize: [
    {
      id: 'f1',
      rank: 1,
      title: '2024 Chevrolet Tahoe',
      imageUrl: '/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png',
      motorTrendScore: 8.1,
      msrp: '$54,200',
      mpg: '16/20',
      engine: '5.3L V8',
      horsepower: '355 hp'
    }
    // ... more full-size SUVs
  ].map(suv => ({
    ...suv,
    motorTrendScore: typeof suv.motorTrendScore === 'string' ? parseFloat(suv.motorTrendScore) : suv.motorTrendScore
  }))
};

const SUVClassRankings: React.FC = () => {
  const [activeClass, setActiveClass] = useState<keyof typeof suvClasses>('compact');

  const renderClassGrid = (suvs: typeof suvClasses.compact) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suvs.map((suv) => (
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
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Medal className="text-motortrend-red" size={24} />
        <h2 className="typography-title text-2xl">Best SUVs by Class</h2>
      </div>

      <Tabs value={activeClass} onValueChange={(value) => setActiveClass(value as keyof typeof suvClasses)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subcompact">Subcompact</TabsTrigger>
          <TabsTrigger value="compact">Compact</TabsTrigger>
          <TabsTrigger value="midsize">Midsize</TabsTrigger>
          <TabsTrigger value="fullsize">Full-size</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subcompact" className="mt-6">
          {renderClassGrid(suvClasses.subcompact)}
        </TabsContent>
        
        <TabsContent value="compact" className="mt-6">
          {renderClassGrid(suvClasses.compact)}
        </TabsContent>
        
        <TabsContent value="midsize" className="mt-6">
          {renderClassGrid(suvClasses.midsize)}
        </TabsContent>
        
        <TabsContent value="fullsize" className="mt-6">
          {renderClassGrid(suvClasses.fullsize)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SUVClassRankings;
