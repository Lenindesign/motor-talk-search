
import React from 'react';
import { ArrowRight, ChartBar, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

interface ClassComparisonProps {
  vehicle: any;
  detailed?: boolean;
}

const ClassComparison: React.FC<ClassComparisonProps> = ({ vehicle, detailed = false }) => {
  const classData = vehicle.classComparison;
  
  // Format currency to nearest thousand with k suffix
  const formatCurrency = (value: number) => {
    return `$${Math.abs(value) >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`;
  };
  
  // Format percentage with + or - sign
  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };
  
  // Determine if higher or lower value is better for each category
  const isHigherBetter = (category: string) => {
    return category !== 'price'; // For price, lower is better
  };
  
  // Get appropriate color for difference based on whether higher or lower is better
  const getDifferenceColor = (category: string, diff: number) => {
    const better = isHigherBetter(category) ? diff > 0 : diff < 0;
    return better ? 'text-green-600' : 'text-red-600';
  };
  
  // Get appropriate icon based on difference and category
  const getDifferenceIcon = (category: string, diff: number) => {
    const better = isHigherBetter(category) ? diff > 0 : diff < 0;
    return better ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  // Prepare data for the chart
  const prepareData = () => {
    // These are the categories we want to compare
    const categories = [
      { key: 'price', label: 'Price', format: formatCurrency, vehicleValue: vehicle.price.base, 
        tooltip: 'Vehicle price compared to class average. Lower is better.' },
      { key: 'mpg', label: 'MPG', format: (val: number) => `${val}`, vehicleValue: vehicle.specs.mpg.combined,
        tooltip: 'Combined MPG compared to class average. Higher is better.' },
      { key: 'cargo', label: 'Cargo', format: (val: number) => `${val} ft³`, vehicleValue: vehicle.specs.dimensions.cargo,
        tooltip: 'Cargo volume compared to class average. Higher is better.' },
      { key: 'safety', label: 'Safety', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.safety,
        tooltip: 'Safety rating compared to class average. Higher is better.' },
      { key: 'reliability', label: 'Reliability', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.reliability,
        tooltip: 'Reliability rating compared to class average. Higher is better.' },
      { key: 'tech', label: 'Technology', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.technology,
        tooltip: 'Technology rating compared to class average. Higher is better.' },
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
        tooltip: category.tooltip,
        key: category.key,
      };
    });
  };
  
  const chartData = prepareData();
  
  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isBetter = isHigherBetter(data.key) ? data.percentDiff > 0 : data.percentDiff < 0;
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-sm">
          <p className="font-semibold mb-1">{data.name}</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-500">This Vehicle</p>
              <p className="font-medium">{data.format(data.vehicleValue)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Class Average</p>
              <p className="font-medium">{data.format(data.classAvg)}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className={`font-medium ${isBetter ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(data.percentDiff)} {isBetter ? 'better' : 'worse'} than average
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Class Comparison</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Comparing this vehicle to the average in its class. Percentages show how much better or worse this vehicle performs.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="text-center text-sm text-gray-500 mb-4">
          Compared to average {vehicle.type}
        </div>
        
        {detailed ? (
          <div className="my-4">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              >
                {/* Added specific gridlines that align with labels */}
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  horizontal={true}
                  vertical={false}
                  verticalPoints={chartData.map((_item, index) => index)} 
                />
                <XAxis 
                  type="number" 
                  domain={['dataMin - 10', 'dataMax + 10']}
                  tickFormatter={(value) => `${value.toFixed(1)}%`}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  scale="band" 
                  tick={{ fontWeight: 500 }}
                  axisLine={true}
                  tickLine={true}
                />
                <ReferenceLine x={0} stroke="#666" strokeWidth={1.5} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="percentDiff" barSize={24}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isBetter ? '#4ade80' : '#f87171'} 
                    />
                  ))}
                  <LabelList 
                    dataKey="percentDiff" 
                    position="right"
                    formatter={(value: number) => formatPercentage(value)}
                    style={{ fill: '#374151', fontWeight: 500, fontSize: '12px' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-6 flex justify-center gap-8">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-green-500 rounded-sm"></div>
                <span className="text-xs text-gray-600">Better than average</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-red-400 rounded-sm"></div>
                <span className="text-xs text-gray-600">Worse than average</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2 space-y-4">
            <ul className="space-y-3">
              {chartData.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="block text-sm font-medium">
                        {item.format(item.vehicleValue)}
                      </span>
                      <span className="block text-xs text-gray-500">
                        vs. avg {item.format(item.classAvg)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 min-w-[60px]">
                      {getDifferenceIcon(item.key, item.percentDiff)}
                      <span className={`text-xs font-medium ${getDifferenceColor(item.key, item.percentDiff)}`}>
                        {formatPercentage(item.percentDiff)}
                      </span>
                    </div>
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
