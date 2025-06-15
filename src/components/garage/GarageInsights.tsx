
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SavedItem } from '../../contexts/SavedItemsContext';
import { TrendingUp, DollarSign, Calendar, Star } from 'lucide-react';

interface GarageInsightsProps {
  cars: SavedItem[];
}

const GarageInsights: React.FC<GarageInsightsProps> = ({ cars }) => {
  // Calculate insights from the cars data
  const totalCars = cars.length;
  const ownedCars = cars.filter(car => car.metadata?.ownership === 'owned').length;
  const newCars = cars.filter(car => car.type === 'newCar').length;
  const usedCars = cars.filter(car => car.type === 'usedCar').length;

  const insights = [
    {
      title: 'Total Value',
      value: 'Calculating...',
      icon: <DollarSign className="w-5 h-5" />,
      trend: '+12%',
      description: 'Estimated garage value'
    },
    {
      title: 'Portfolio Mix',
      value: `${Math.round((newCars / totalCars) * 100)}% New`,
      icon: <TrendingUp className="w-5 h-5" />,
      trend: `${usedCars} Used`,
      description: 'New vs used vehicles'
    },
    {
      title: 'Average Year',
      value: '2021',
      icon: <Calendar className="w-5 h-5" />,
      trend: 'Modern',
      description: 'Fleet average model year'
    },
    {
      title: 'Top Rated',
      value: '9.2/10',
      icon: <Star className="w-5 h-5" />,
      trend: 'Excellent',
      description: 'Highest rated vehicle'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="typography-title text-neutral-1 mb-2">Garage Insights</h3>
        <p className="typography-body text-neutral-4">
          Analysis of your {totalCars} vehicle{totalCars !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-white border-neutral-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-neutral-3">
                  {insight.icon}
                </div>
                <span className="typography-caption text-success font-medium">
                  {insight.trend}
                </span>
              </div>
              <div className="space-y-1">
                <p className="typography-body-large font-semibold text-neutral-1">
                  {insight.value}
                </p>
                <p className="typography-caption text-neutral-4">
                  {insight.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GarageInsights;
