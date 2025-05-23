
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TabsContent } from '@/components/ui/tabs';

import { prepareComparisonData } from './utils/dataPreparation';
import BarChartView from './comparison-charts/BarChartView';
import PieChartView from './comparison-charts/PieChartView';
import RadarChartView from './comparison-charts/RadarChartView';
import TableView from './comparison-charts/TableView';
import CardsView from './comparison-charts/CardsView';
import LegendView from './comparison-charts/LegendView';
import VisualizationControls from './comparison-charts/VisualizationControls';
import DetailedExplanation from './comparison-charts/DetailedExplanation';

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
        
        <VisualizationControls viewType={viewType} setViewType={setViewType} />

        <TabsContent value={viewType}>
          {renderVisualization()}
        </TabsContent>
        
        {detailed && !['cards', 'table'].includes(viewType) && (
          <DetailedExplanation vehicle={vehicle} />
        )}
        
        {/* Only show legend outside of pie chart view since pie has its own */}
        {viewType !== 'pie' && <LegendView />}
      </CardContent>
    </Card>
  );
};

export default ClassComparison;
