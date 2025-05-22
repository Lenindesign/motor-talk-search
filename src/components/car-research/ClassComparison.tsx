
import React, { useState } from 'react';
import { ArrowRight, ChartBar, TrendingUp, TrendingDown, Info, BarChart3, PieChart, LineChart, ListFilter, LayoutGrid } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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
  PieChart as RechartsPieChart,
  Pie,
  LineChart as RechartsLineChart,
  Line,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

interface ClassComparisonProps {
  vehicle: any;
  detailed?: boolean;
}

const ClassComparison: React.FC<ClassComparisonProps> = ({ vehicle, detailed = false }) => {
  const [viewType, setViewType] = useState<string>('bar');
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

  // Prepare data for pie chart (simplified representation)
  const preparePieData = () => {
    return chartData.map(item => ({
      name: item.name,
      value: Math.abs(item.percentDiff), // Use absolute value for pie size
      isBetter: item.isBetter,
      color: item.isBetter ? '#4ade80' : '#f87171',
    }));
  };

  // Prepare data for radar chart (different format needed)
  const prepareRadarData = () => {
    return [
      {
        subject: 'This Vehicle',
        ...chartData.reduce((acc, item) => {
          acc[item.name] = item.vehicleValue;
          return acc;
        }, {}),
      },
      {
        subject: 'Class Average',
        ...chartData.reduce((acc, item) => {
          acc[item.name] = item.classAvg;
          return acc;
        }, {}),
      },
    ];
  };
  
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

  // Custom tooltip for radar chart
  const RadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded border shadow-md">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-xs">This Vehicle: <span className="font-medium">{payload[0].value}</span></p>
          <p className="text-xs">Class Average: <span className="font-medium">{payload[1]?.value}</span></p>
        </div>
      );
    }
    return null;
  };

  // Function to render detailed comparison card for a category
  const renderDetailedCategoryCard = (data: any) => {
    const isBetter = isHigherBetter(data.key) ? data.percentDiff > 0 : data.percentDiff < 0;
    return (
      <div key={data.key} className="border rounded-lg p-4 bg-white shadow-sm">
        <h4 className="text-md font-semibold mb-2">{data.name}</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">This Vehicle</p>
            <p className="font-medium text-lg">{data.format(data.vehicleValue)}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">Class Average</p>
            <p className="font-medium text-lg">{data.format(data.classAvg)}</p>
          </div>
        </div>
        
        <div className={`flex items-center ${isBetter ? 'text-green-600' : 'text-red-600'}`}>
          {isBetter ? 
            <TrendingUp className="h-4 w-4 mr-1" /> : 
            <TrendingDown className="h-4 w-4 mr-1" />
          }
          <span className="font-medium">
            {formatPercentage(data.percentDiff)} {isBetter ? 'better' : 'worse'} than average
          </span>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">{data.tooltip}</p>
      </div>
    );
  };
  
  // Render different visualization types
  const renderVisualization = () => {
    switch (viewType) {
      case 'bar':
        return (
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
          </div>
        );
      
      case 'pie':
        return (
          <div className="my-4">
            <ResponsiveContainer width="100%" height={400}>
              <RechartsPieChart>
                <Pie
                  data={preparePieData()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {preparePieData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="middle" align="right" />
                <RechartsTooltip 
                  formatter={(value, name) => {
                    const item = chartData.find(d => d.name === name);
                    return [formatPercentage(item?.percentDiff || 0), name];
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center gap-8">
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
        );
      
      case 'radar':
        return (
          <div className="my-4">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart outerRadius={150} data={prepareRadarData()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                {chartData.map(item => (
                  <Radar
                    key={item.name}
                    name={item.name}
                    dataKey={item.name}
                    stroke={item.isBetter ? '#4ADE80' : '#F87171'}
                    fill={item.isBetter ? 'rgba(74, 222, 128, 0.5)' : 'rgba(248, 113, 113, 0.5)'}
                    fillOpacity={0.6}
                  />
                ))}
                <Legend />
                <RechartsTooltip content={RadarTooltip} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'table':
        return (
          <div className="my-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 border-b border-gray-200">Category</th>
                  <th className="text-right p-3 border-b border-gray-200">This Vehicle</th>
                  <th className="text-right p-3 border-b border-gray-200">Class Average</th>
                  <th className="text-right p-3 border-b border-gray-200">Difference</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border-b border-gray-200 font-medium">{item.name}</td>
                    <td className="p-3 border-b border-gray-200 text-right">
                      {item.format(item.vehicleValue)}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-right">
                      {item.format(item.classAvg)}
                    </td>
                    <td className={`p-3 border-b border-gray-200 text-right font-medium ${getDifferenceColor(item.key, item.percentDiff)}`}>
                      <div className="flex items-center justify-end gap-1">
                        {getDifferenceIcon(item.key, item.percentDiff)}
                        {formatPercentage(item.percentDiff)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'cards':
        return (
          <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chartData.map((item, index) => renderDetailedCategoryCard(item))}
          </div>
        );
      
      default:
        return null;
    }
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
        
        <Tabs defaultValue={viewType} value={viewType} onValueChange={setViewType} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="bar" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Bar</span>
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex items-center gap-1">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Pie</span>
            </TabsTrigger>
            <TabsTrigger value="radar" className="flex items-center gap-1">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Radar</span>
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-1">
              <ListFilter className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-1">
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Cards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={viewType}>
            {renderVisualization()}
          </TabsContent>
        </Tabs>
        
        {detailed && !['cards', 'table'].includes(viewType) && (
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
      </CardContent>
    </Card>
  );
};

export default ClassComparison;
