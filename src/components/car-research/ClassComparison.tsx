
import React, { useState } from 'react';
import { Info, BarChart3, PieChart, LineChart, ListFilter, LayoutGrid } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { prepareComparisonData } from './utils/dataPreparation';
import BarChartView from './comparison-charts/BarChartView';
import PieChartView from './comparison-charts/PieChartView';
import RadarChartView from './comparison-charts/RadarChartView';
import TableView from './comparison-charts/TableView';
import CardsView from './comparison-charts/CardsView';
import LegendView from './comparison-charts/LegendView';

interface ClassComparisonProps {
  vehicle: any;
  detailed?: boolean;
}

const ClassComparison: React.FC<ClassComparisonProps> = ({ vehicle, detailed = false }) => {
  const [viewType, setViewType] = useState<string>('bar');
  
  // Prepare data for the charts
  const chartData = prepareComparisonData(vehicle);
  
  // Render different visualization types
  const renderVisualization = () => {
    switch (viewType) {
      case 'bar':
        return <BarChartView chartData={chartData} />;
      
      case 'pie':
        return <PieChartView chartData={chartData} />;
      
      case 'radar':
        return <RadarChartView chartData={chartData} />;
      
      case 'table':
        return <TableView chartData={chartData} />;
      
      case 'cards':
        return <CardsView chartData={chartData} />;
      
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
        
        {/* Only show legend outside of pie chart view since pie has its own */}
        {viewType !== 'pie' && <LegendView />}
      </CardContent>
    </Card>
  );
};

export default ClassComparison;
