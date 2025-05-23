
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import { ChartDataItem, prepareRadarData } from '../utils/dataPreparation';

interface RadarChartViewProps {
  chartData: ChartDataItem[];
}

interface RadarTooltipProps {
  active?: boolean;
  payload?: any[];
}

// Custom tooltip for radar chart
const RadarTooltip = ({ active, payload }: RadarTooltipProps) => {
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

const RadarChartView: React.FC<RadarChartViewProps> = ({ chartData }) => {
  const radarData = prepareRadarData(chartData);

  return (
    <div className="my-4">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} data={radarData}>
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
};

export default RadarChartView;
