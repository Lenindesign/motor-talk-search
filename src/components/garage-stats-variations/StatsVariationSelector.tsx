
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GarageStatsVariation1 from './GarageStatsVariation1';
import GarageStatsVariation2 from './GarageStatsVariation2';
import GarageStatsVariation3 from './GarageStatsVariation3';
import GarageStatsVariation4 from './GarageStatsVariation4';
import GarageStatsVariation5 from './GarageStatsVariation5';
import GarageStatsVariation6 from './GarageStatsVariation6';
import GarageStatsVariation7 from './GarageStatsVariation7';
import GarageStatsVariation8 from './GarageStatsVariation8';
import GarageStatsVariation9 from './GarageStatsVariation9';
import GarageStatsVariation10 from './GarageStatsVariation10';

const variations = [
  { id: 1, name: 'Original Rounded Cards', component: GarageStatsVariation1 },
  { id: 2, name: 'Circular Gradients', component: GarageStatsVariation2 },
  { id: 3, name: 'Horizontal Border Cards', component: GarageStatsVariation3 },
  { id: 4, name: 'Minimalist Numbers', component: GarageStatsVariation4 },
  { id: 5, name: 'Shadow Cards with Top Border', component: GarageStatsVariation5 },
  { id: 6, name: 'Dark Theme Neon', component: GarageStatsVariation6 },
  { id: 7, name: 'Pill-shaped Badges', component: GarageStatsVariation7 },
  { id: 8, name: 'Hexagonal Diamond', component: GarageStatsVariation8 },
  { id: 9, name: 'Glass Morphism', component: GarageStatsVariation9 },
  { id: 10, name: 'Progress Bar Style', component: GarageStatsVariation10 },
];

const StatsVariationSelector = () => {
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Garage Stats Style</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {variations.map((variation) => {
              const VariationComponent = variation.component;
              return (
                <div 
                  key={variation.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedVariation === variation.id 
                      ? 'border-motortrend-red bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedVariation(variation.id)}
                >
                  <h3 className="text-sm font-medium mb-3 text-center">
                    Variation {variation.id}: {variation.name}
                  </h3>
                  <VariationComponent />
                  <div className="text-center mt-3">
                    <Button 
                      size="sm" 
                      variant={selectedVariation === variation.id ? "default" : "outline"}
                    >
                      {selectedVariation === variation.id ? 'Selected' : 'Select This Style'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedVariation && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-center">
                You've selected <strong>Variation {selectedVariation}</strong>. 
                Let me know if you'd like me to apply this style to your garage!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsVariationSelector;
