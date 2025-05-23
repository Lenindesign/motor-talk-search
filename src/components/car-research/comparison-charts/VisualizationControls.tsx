
import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  ListFilter, 
  LayoutGrid 
} from 'lucide-react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

interface VisualizationControlsProps {
  viewType: string;
  setViewType: (view: string) => void;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({ 
  viewType, 
  setViewType 
}) => {
  return (
    <div className="w-full mb-6">
      <Tabs defaultValue={viewType} value={viewType} onValueChange={setViewType} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4 w-full">
          <TabsTrigger value="bar" className="flex items-center justify-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Bar</span>
          </TabsTrigger>
          <TabsTrigger value="pie" className="flex items-center justify-center gap-1">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Pie</span>
          </TabsTrigger>
          <TabsTrigger value="radar" className="flex items-center justify-center gap-1">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Radar</span>
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center justify-center gap-1">
            <ListFilter className="h-4 w-4" />
            <span className="hidden sm:inline">Table</span>
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center justify-center gap-1">
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Cards</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default VisualizationControls;
