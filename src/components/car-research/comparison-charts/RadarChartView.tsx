
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ChartDataItem, prepareRadarData } from '../utils/dataPreparation';

interface RadarChartViewProps {
  chartData: ChartDataItem[];
}

const RadarChartView: React.FC<RadarChartViewProps> = ({ chartData }) => {
  const radarData = prepareRadarData(chartData);
  
  const config = {
    thisVehicle: {
      label: "This Vehicle",
      theme: {
        light: "#3b82f6",
        dark: "#60a5fa"
      }
    },
    classAverage: {
      label: "Class Average",
      theme: {
        light: "#6b7280",
        dark: "#9ca3af"
      }
    },
  };

  return (
    <div className="my-4">
      <ChartContainer config={config} className="h-[400px]">
        <RadarChart outerRadius={150} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
          <Radar
            name="This Vehicle"
            dataKey="This Vehicle"
            stroke="var(--color-thisVehicle)"
            fill="var(--color-thisVehicle)"
            fillOpacity={0.6}
          />
          <Radar
            name="Class Average"
            dataKey="Class Average"
            stroke="var(--color-classAverage)"
            fill="var(--color-classAverage)"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ChartContainer>
    </div>
  );
};

export default RadarChartView;
