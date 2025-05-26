import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { classComparison } from './utils';

interface ComparisonTabProps {
  carTitle: string;
  carCategory: string;
}

const ComparisonTab: React.FC<ComparisonTabProps> = ({ carTitle, carCategory }) => {
  // Calculate overall score (weighted average)
  const overallScore = classComparison.reduce((acc, item) => {
    const percentage = (item.thisVehicle - item.classAverage) / item.classAverage * 100;
    return acc + percentage;
  }, 0) / classComparison.length;
  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  return <div className="space-y-8">
      {/* Overall Comparison Header */}
      <Card>
        <CardHeader>
          <div className="space-y-2">
            
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{carTitle} vs Average {carCategory}</span>
              <span className={`text-lg font-semibold ${overallScore >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {formatPercentage(overallScore)}
              </span>
            </div>
            <p className="text-sm text-gray-500">Overall score based on weighted average of all metrics</p>
          </div>
        </CardHeader>
        <CardContent>
          {/* New Horizontal Bar Chart Section */}
          <div className="space-y-6 pt-4">
            {classComparison.map(item => {
              const thisVehicleValue = item.thisVehicle;
              const classAverageValue = item.classAverage;
              const percentageDiff = (thisVehicleValue - classAverageValue) / classAverageValue * 100;

              let isThisVehicleBetterByDefault = thisVehicleValue > classAverageValue; // Higher is better
              if (item.metric === 'Price') {
                isThisVehicleBetterByDefault = thisVehicleValue < classAverageValue; // Lower is better for Price
              }

              let thisVehicleBarColor = 'bg-sky-500'; // Neutral default
              if (item.metric === 'Price') {
                if (thisVehicleValue < classAverageValue) thisVehicleBarColor = 'bg-green-500';
                else if (thisVehicleValue > classAverageValue) thisVehicleBarColor = 'bg-red-500';
              } else {
                if (thisVehicleValue > classAverageValue) thisVehicleBarColor = 'bg-green-500';
                else if (thisVehicleValue < classAverageValue) thisVehicleBarColor = 'bg-red-500';
              }

              // Determine max value for scaling bars
              let maxValueScale = 100; // Default for 0-100 scores
              if (item.metric === 'Price' || item.unit === 'MPGe' || item.unit === 'cu ft') {
                maxValueScale = Math.max(thisVehicleValue, classAverageValue, 0) * 1.25; // Scale to 125% of the max observed value
                if (maxValueScale === 0) maxValueScale = 100; // Fallback if values are 0
              }
              
              const thisVehicleWidth = (thisVehicleValue / maxValueScale) * 100;
              const classAverageWidth = (classAverageValue / maxValueScale) * 100;

              return (
                <div key={item.metric} className="space-y-2 pb-2 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-md text-gray-700">{item.metric}</span>
                    <span className={`font-semibold text-sm ${isThisVehicleBetterByDefault ? 'text-green-600' : (percentageDiff === 0 ? 'text-gray-600' : 'text-red-600')}`}>
                      {formatPercentage(percentageDiff)}
                      {percentageDiff !== 0 ? (isThisVehicleBetterByDefault ? ' Better' : ' Worse') : ' Average'}
                    </span>
                  </div>

                  {/* This Vehicle's Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{carTitle}</span>
                      <span className={`font-medium ${thisVehicleBarColor.includes('green') ? 'text-green-700' : (thisVehicleBarColor.includes('red') ? 'text-red-700' : 'text-sky-700')}`}>
                        {item.thisVehicle}{item.unit}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${thisVehicleBarColor}`}
                        style={{ width: `${Math.max(0, Math.min(thisVehicleWidth, 100))}%` }} 
                      />
                    </div>
                  </div>

                  {/* Class Average Bar */}
                  <div className="space-y-1 mt-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{carCategory} Average</span>
                      <span className="font-medium text-gray-700">
                        {item.classAverage}{item.unit}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gray-400 transition-all duration-300" 
                        style={{ width: `${Math.max(0, Math.min(classAverageWidth, 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How it Compares Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">How it Compares</h3>
            <p className="text-gray-600">
              The {carTitle} stands out in its class with superior fuel economy and safety ratings. While 
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
                          <p className="text-xs text-gray-500 mb-1">{carTitle}</p>
                          <p className="text-2xl font-bold">{item.thisVehicle}{item.unit}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">{carCategory} Average</p>
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
        </CardContent>
      </Card>
    </div>;
};
export default ComparisonTab;