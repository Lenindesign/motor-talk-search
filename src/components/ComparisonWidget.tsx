import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Zap, 
  Fuel, 
  DollarSign, 
  TrendingUp,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ComparisonCar {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  monthlyPayment: number;
  horsepower: number;
  mpg: number;
  mpgUnit: string;
  acceleration: string;
  motorTrendScore: number;
  bodyStyle: string;
  isWinner?: boolean;
}

interface ComparisonWidgetProps {
  cars: ComparisonCar[];
  title?: string;
  showAiInsights?: boolean;
  aiInsight?: string;
  onViewFullComparison?: () => void;
  className?: string;
}

const ComparisonWidget: React.FC<ComparisonWidgetProps> = ({
  cars,
  title = "Vehicle Comparison",
  showAiInsights = true,
  aiInsight,
  onViewFullComparison,
  className = ""
}) => {
  if (cars.length === 0) return null;

  const getBestValue = (metric: keyof ComparisonCar) => {
    switch (metric) {
      case 'price':
        return cars.reduce((min, car) => car.price < min.price ? car : min);
      case 'mpg':
        return cars.reduce((max, car) => car.mpg > max.mpg ? car : max);
      case 'horsepower':
        return cars.reduce((max, car) => car.horsepower > max.horsepower ? car : max);
      case 'motorTrendScore':
        return cars.reduce((max, car) => car.motorTrendScore > max.motorTrendScore ? car : max);
      default:
        return cars[0];
    }
  };

  const defaultInsight = cars.length >= 2 
    ? `The ${cars[0].name} offers better value at $${cars[0].price.toLocaleString()}, while the ${cars[1].name} provides ${cars[1].horsepower > cars[0].horsepower ? 'superior performance' : 'better efficiency'}.`
    : `The ${cars[0].name} stands out with its ${cars[0].motorTrendScore}/10 Motor Trend score and competitive pricing.`;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            {title}
          </CardTitle>
          {onViewFullComparison && (
            <Button variant="outline" size="sm" onClick={onViewFullComparison}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Full Comparison
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Insights */}
        {showAiInsights && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start">
              <Sparkles className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">AI Insights</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {aiInsight || defaultInsight}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cars.slice(0, 2).map((car) => (
            <div key={car.id} className="relative">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90">
                      {car.bodyStyle}
                    </Badge>
                  </div>
                  {car.isWinner && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-600 text-white">
                        Winner
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-neutral-1 mb-2 line-clamp-1">
                    {car.name}
                  </h4>
                  
                  {/* Key Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-3 flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />
                        MSRP
                      </span>
                      <span className={`font-semibold ${getBestValue('price').id === car.id ? 'text-green-600' : 'text-neutral-1'}`}>
                        ${(car.price / 1000).toFixed(0)}k
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-3 flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Score
                      </span>
                      <span className={`font-semibold ${getBestValue('motorTrendScore').id === car.id ? 'text-green-600' : 'text-neutral-1'}`}>
                        {car.motorTrendScore}/10
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-3 flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        HP
                      </span>
                      <span className={`font-semibold ${getBestValue('horsepower').id === car.id ? 'text-green-600' : 'text-neutral-1'}`}>
                        {car.horsepower}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-3 flex items-center">
                        <Fuel className="w-3 h-3 mr-1" />
                        {car.mpgUnit}
                      </span>
                      <span className={`font-semibold ${getBestValue('mpg').id === car.id ? 'text-green-600' : 'text-neutral-1'}`}>
                        {car.mpg}
                      </span>
                    </div>
                  </div>
                  
                  {/* Monthly Payment */}
                  <div className="mt-2 pt-2 border-t border-neutral-6">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-3 text-xs">Est. Monthly</span>
                      <span className="font-semibold text-sm text-neutral-1">
                        ${car.monthlyPayment}/mo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Comparison Stats */}
        {cars.length >= 2 && (
          <div className="bg-neutral-7 rounded-lg p-4">
            <h4 className="font-semibold text-neutral-1 mb-3 text-sm">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-neutral-3">Price Difference:</span>
                <span className="font-semibold text-neutral-1 ml-2">
                  ${Math.abs(cars[0].price - cars[1].price).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-neutral-3">Performance Gap:</span>
                <span className="font-semibold text-neutral-1 ml-2">
                  {Math.abs(cars[0].horsepower - cars[1].horsepower)} HP
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View Full Comparison Button */}
        {onViewFullComparison && (
          <Button 
            onClick={onViewFullComparison} 
            className="w-full"
            variant="outline"
          >
            View Detailed Comparison
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonWidget;