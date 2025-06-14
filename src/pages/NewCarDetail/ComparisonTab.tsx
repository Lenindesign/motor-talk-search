import React from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { classComparison } from './utils';

interface ComparisonTabProps {
  carTitle: string;
  carCategory: string;
}

const ComparisonTab: React.FC<ComparisonTabProps> = ({
  carTitle,
  carCategory
}) => {
  // Calculate overall score (weighted average)
  const overallScore = classComparison.reduce((acc, item) => {
    const percentage = (item.thisVehicle - item.classAverage) / item.classAverage * 100;
    return acc + percentage;
  }, 0) / classComparison.length;

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-8">
      {/* Header with Overall Score */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-motortrend-red" />
          <h3 className="typography-title text-neutral-1">Class Comparison</h3>
        </div>
        <div className="bg-gradient-to-r from-neutral-8 to-neutral-7 rounded-2xl p-6 mb-6">
          <p className="typography-caption text-neutral-3 mb-2">Overall Performance vs {carCategory}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="typography-headline text-neutral-1">{carTitle}</span>
            <span className={`typography-title font-semibold px-3 py-1 rounded-full ${
              overallScore >= 0 
                ? 'text-green-700 bg-green-100' 
                : 'text-red-700 bg-red-100'
            }`}>
              {formatPercentage(overallScore)}
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Metrics */}
      <div className="space-y-6">
        {classComparison.map(item => {
          const thisVehicleValue = item.thisVehicle;
          const classAverageValue = item.classAverage;
          const percentageDiff = (thisVehicleValue - classAverageValue) / classAverageValue * 100;
          
          let isThisVehicleBetterByDefault = thisVehicleValue > classAverageValue;
          if (item.metric === 'Price') {
            isThisVehicleBetterByDefault = thisVehicleValue < classAverageValue;
          }

          let thisVehicleBarColor = 'bg-blue-500';
          if (item.metric === 'Price') {
            if (thisVehicleValue < classAverageValue) thisVehicleBarColor = 'bg-green-500';
            else if (thisVehicleValue > classAverageValue) thisVehicleBarColor = 'bg-red-500';
          } else {
            if (thisVehicleValue > classAverageValue) thisVehicleBarColor = 'bg-green-500';
            else if (thisVehicleValue < classAverageValue) thisVehicleBarColor = 'bg-red-500';
          }

          // Determine max value for scaling bars
          let maxValueScale = 100;
          if (item.metric === 'Price' || item.unit === 'MPGe' || item.unit === 'cu ft') {
            maxValueScale = Math.max(thisVehicleValue, classAverageValue, 0) * 1.25;
            if (maxValueScale === 0) maxValueScale = 100;
          }
          
          const thisVehicleWidth = thisVehicleValue / maxValueScale * 100;
          const classAverageWidth = classAverageValue / maxValueScale * 100;

          return (
            <Card key={item.metric} className="border-neutral-6 shadow-modern hover:shadow-modern-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="typography-body-large font-semibold text-neutral-1">{item.metric}</h4>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    isThisVehicleBetterByDefault 
                      ? 'text-green-700 bg-green-100' 
                      : percentageDiff === 0 
                        ? 'text-neutral-3 bg-neutral-7' 
                        : 'text-red-700 bg-red-100'
                  }`}>
                    {percentageDiff !== 0 && (
                      isThisVehicleBetterByDefault 
                        ? <TrendingUp className="w-4 h-4" />
                        : <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{formatPercentage(percentageDiff)}</span>
                  </div>
                </div>

                {/* This Vehicle's Bar */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="typography-body text-neutral-2">{carTitle}</span>
                    <span className="typography-body-large font-semibold text-neutral-1">
                      {item.thisVehicle}{item.unit}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-7 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${thisVehicleBarColor}`}
                      style={{ width: `${Math.max(0, Math.min(thisVehicleWidth, 100))}%` }}
                    />
                  </div>
                </div>

                {/* Class Average Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="typography-body text-neutral-3">{carCategory} Average</span>
                    <span className="typography-body font-medium text-neutral-2">
                      {item.classAverage}{item.unit}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-7 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-neutral-4 transition-all duration-500"
                      style={{ width: `${Math.max(0, Math.min(classAverageWidth, 100))}%` }}
                    />
                  </div>
                </div>

                <p className="typography-caption text-neutral-3 mt-3 text-center">
                  {item.metric === 'Price' ? 'Lower' : 'Higher'} is better
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Section */}
      <Card className="border-neutral-6 shadow-modern bg-gradient-to-br from-neutral-8 to-neutral-7">
        <CardContent className="p-6">
          <h3 className="typography-body-large font-semibold text-neutral-1 mb-4">How it Compares</h3>
          <p className="typography-body text-neutral-2 leading-relaxed">
            The {carTitle} stands out in its class with superior fuel economy and safety ratings. While 
            priced slightly higher than the class average, it delivers more value through better technology 
            features and reliability ratings. The cargo space is about average for the segment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonTab;