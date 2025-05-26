import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { classComparison } from './utils';
const ComparisonTab: React.FC = () => {
  // Calculate overall score (weighted average)
  const overallScore = classComparison.reduce((acc, item) => {
    const percentage = (item.thisVehicle - item.classAverage) / item.classAverage * 100;
    return acc + percentage;
  }, 0) / classComparison.length;
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };
  const getColorClass = (value: number, metric: string) => {
    // For price, lower is better (inverse logic)
    const isBetter = metric === 'Price' ? value < 0 : value > 0;
    return isBetter ? 'text-green-600' : 'text-red-500';
  };
  const getBarColor = (value: number, metric: string) => {
    const isBetter = metric === 'Price' ? value < 0 : value > 0;
    return isBetter ? 'bg-green-500' : 'bg-red-400';
  };
  return <div className="space-y-8">
      {/* Overall Comparison Header */}
      <Card>
        <CardHeader>
          <div className="space-y-2">
            
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">2025 Electric SUV vs Average Electric SUV</span>
              <span className={`text-lg font-semibold ${overallScore >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {formatPercentage(overallScore)}
              </span>
            </div>
            <p className="text-sm text-gray-500">Overall score based on weighted average of all metrics</p>
          </div>
        </CardHeader>
        <CardContent>
          {/* Horizontal Bar Chart */}
          <div className="space-y-4">
            {classComparison.map(item => {
            const percentage = (item.thisVehicle - item.classAverage) / item.classAverage * 100;
            const barWidth = Math.min(Math.abs(percentage) * 2, 100); // Scale for visual appeal

            return <div key={item.metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{item.metric}</span>
                    <span className={`font-semibold text-sm ${getColorClass(percentage, item.metric)}`}>
                      {formatPercentage(percentage)}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${getBarColor(percentage, item.metric)}`} style={{
                    width: `${barWidth}%`
                  }} />
                    </div>
                  </div>
                </div>;
          })}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-xs text-gray-600">Better Than Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
              <span className="text-xs text-gray-600">Worse than average</span>
            </div>
            
          </div>
        </CardContent>
      </Card>

      {/* How it Compares Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">How it Compares</h3>
        <p className="text-gray-600">
          The 2025 Electric SUV stands out in its class with superior fuel economy and safety ratings. While 
          priced slightly higher than the class average, it delivers more value through better technology 
          features and reliability ratings. The cargo space is about average for the segment.
        </p>
      </div>

      {/* Detailed Comparison Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Detailed Comparison Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classComparison.map(item => {
          const percentage = (item.thisVehicle - item.classAverage) / item.classAverage * 100;
          const isBetter = item.metric === 'Price' ? percentage < 0 : percentage > 0;
          return <Card key={item.metric} className="p-4">
                <div className="text-center space-y-3">
                  <h4 className="font-semibold text-lg">{item.metric}</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">2025 Electric SUV</p>
                      <p className="text-2xl font-bold">{item.thisVehicle}{item.unit}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Class Average</p>
                      <p className="text-2xl font-bold">{item.classAverage}{item.unit}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-center gap-1 ${isBetter ? 'text-green-600' : 'text-red-500'}`}>
                    {isBetter ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="font-semibold text-sm">
                      {formatPercentage(Math.abs(percentage))} {isBetter ? 'Better than Average' : 'Worse than Average'}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    {item.metric} compared to class average. {item.metric === 'Price' ? 'Lower' : 'Higher'} is better.
                  </p>
                </div>
              </Card>;
        })}
        </div>
      </div>
    </div>;
};
export default ComparisonTab;