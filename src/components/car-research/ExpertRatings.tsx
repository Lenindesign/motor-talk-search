
import React from 'react';
import { 
  ChartBar, 
} from 'lucide-react';
import { 
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip 
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ExpertRatingsProps {
  vehicle: any;
  detailed?: boolean;
}

const ExpertRatings: React.FC<ExpertRatingsProps> = ({ vehicle, detailed = false }) => {
  const ratings = vehicle.ratings.expert;
  
  // Expert comments for each category
  const expertComments = {
    performance: "Strong and responsive hybrid powertrain with smooth acceleration. The e-CVT works well with the system for a refined driving experience.",
    comfort: "Exceptionally comfortable seats and a smooth ride. Cabin is well-insulated with minimal road and wind noise.",
    technology: "Intuitive infotainment system with a responsive touchscreen. Wireless Apple CarPlay and Android Auto work flawlessly.",
    safety: "Top scores in crash tests with comprehensive standard safety features including adaptive cruise control and collision mitigation.",
    reliability: "Excellent predicted reliability based on Honda's track record and the mature hybrid technology.",
    value: "Well-equipped even at base trim levels, though some competitors offer similar features for less."
  };

  // Categories to display
  const categories = [
    { id: 'performance', label: 'Performance' },
    { id: 'comfort', label: 'Comfort' },
    { id: 'technology', label: 'Technology' },
    { id: 'safety', label: 'Safety' },
    { id: 'reliability', label: 'Reliability' },
    { id: 'value', label: 'Value' }
  ];
  
  // Get a color based on the rating
  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'bg-green-600';
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 7) return 'bg-amber-500';
    if (rating >= 6) return 'bg-amber-400';
    return 'bg-red-500';
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Expert Ratings</CardTitle>
        <div className="flex items-center space-x-1">
          <div className={`px-3 py-1 text-lg font-bold text-white ${getRatingColor(ratings.overall)}`}>
            {ratings.overall}
          </div>
          <span className="text-sm text-gray-500">/ 10</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className={detailed ? 'mb-8' : 'mb-2'}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category.label}</span>
                <span className={`rounded-sm px-1.5 py-0.5 text-xs font-semibold ${
                  getRatingColor(ratings[category.id as keyof typeof ratings])
                } text-white`}>
                  {ratings[category.id as keyof typeof ratings]}
                </span>
              </div>
              <Progress 
                value={ratings[category.id as keyof typeof ratings] * 10} 
                className="h-2"
              />
              {detailed && (
                <p className="mt-2 text-sm text-gray-600">
                  {expertComments[category.id as keyof typeof expertComments]}
                </p>
              )}
            </div>
          ))}
          
          {detailed && (
            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 text-sm font-semibold">Expert Verdict</h3>
              <p className="text-sm text-gray-700">
                The {vehicle.year} {vehicle.make} {vehicle.model} excels in nearly every category, 
                especially in safety and reliability. The hybrid powertrain delivers both performance 
                and exceptional fuel economy. While the price is slightly higher than some competitors, 
                the overall package represents solid value for a vehicle that should continue to impress 
                for many years of ownership.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertRatings;
