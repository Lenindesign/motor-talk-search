
import React from 'react';
import { ArrowRight, ChartBar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  CartesianGrid,
} from 'recharts';

interface ClassComparisonProps {
  vehicle: any;
  detailed?: boolean;
}

const ClassComparison: React.FC<ClassComparisonProps> = ({ vehicle, detailed = false }) => {
  const classData = vehicle.classComparison;
  
  // Prepare data for the chart
  const prepareData = () => {
    // These are the categories we want to compare
    const categories = [
      { key: 'price', label: 'Price', format: (val: number) => `$${Math.round(val / 1000)}k`, vehicleValue: vehicle.price.base },
      { key: 'mpg', label: 'MPG', format: (val: number) => `${val}`, vehicleValue: vehicle.specs.mpg.combined },
      { key: 'cargo', label: 'Cargo', format: (val: number) => `${val} ft³`, vehicleValue: vehicle.specs.dimensions.cargo },
      { key: 'safety', label: 'Safety', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.safety },
      { key: 'reliability', label: 'Reliability', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.reliability },
      { key: 'tech', label: 'Technology', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.technology },
    ];
    
    return categories.map(category => {
      // Get the class average from our data
      let classAverage = 0;
      
      switch(category.key) {
        case 'price':
          classAverage = classData.avgPrice;
          break;
        case 'mpg':
          classAverage = classData.avgMpg;
          break;
        case 'cargo':
          classAverage = classData.avgCargoSpace;
          break;
        case 'safety':
          classAverage = classData.avgSafetyRating;
          break;
        case 'reliability':
          classAverage = classData.avgReliabilityRating;
          break;
        case 'tech':
          classAverage = classData.avgTechRating;
          break;
      }
      
      // Calculate the percentage difference
      const percentDiff = ((category.vehicleValue - classAverage) / classAverage) * 100;
      
      // Determine if this is better or worse than average
      // For price, lower is better, for everything else higher is better
      let isBetter = category.key === 'price' ? percentDiff < 0 : percentDiff > 0;
      
      return {
        name: category.label,
        classAvg: classAverage,
        vehicleValue: category.vehicleValue,
        percentDiff,
        isBetter,
        format: category.format,
      };
    });
  };
  
  const chartData = prepareData();
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Class Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-sm text-gray-500 mb-2">
          Compared to average {vehicle.type}
        </div>
        
        {detailed ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis 
                type="number" 
                domain={['dataMin - 10', 'dataMax + 10']}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                scale="band" 
              />
              <Tooltip 
                formatter={(value: any) => [`${value.toFixed(1)}%`, 'Difference']}
                labelFormatter={(label) => `${label} vs. Class Average`}
              />
              <Bar dataKey="percentDiff" fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isBetter ? '#4ade80' : '#f87171'} 
                  />
                ))}
                <LabelList 
                  dataKey="percentDiff" 
                  position="right" 
                  formatter={(value: any) => `${value.toFixed(1)}%`}
                  style={{ fill: '#374151', fontWeight: 500 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="mt-2">
            <ul className="space-y-2">
              {chartData.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">
                      {item.format(item.vehicleValue)}
                    </span>
                    <span className={`text-xs font-medium ${
                      item.isBetter ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.percentDiff > 0 ? '+' : ''}{item.percentDiff.toFixed(1)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            
            {!detailed && (
              <div className="mt-4 text-center">
                <button className="text-sm text-primary hover:underline">
                  View detailed comparison
                </button>
              </div>
            )}
          </div>
        )}
        
        {detailed && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-semibold">How it Compares</h3>
            <p className="text-sm text-gray-700">
              The {vehicle.year} {vehicle.make} {vehicle.model} stands out in its class with 
              superior fuel economy and safety ratings. While priced slightly higher than the class average, 
              it delivers more value through better technology features and reliability ratings. 
              The cargo space is about average for the segment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassComparison;
