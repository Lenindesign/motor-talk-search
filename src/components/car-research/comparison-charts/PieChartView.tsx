
import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import { ChartDataItem, preparePieData } from '../utils/dataPreparation';
import { formatPercentage } from '../utils/formatting';

interface PieChartViewProps {
  chartData: ChartDataItem[];
}

const PieChartView: React.FC<PieChartViewProps> = ({ chartData }) => {
  const pieData = preparePieData(chartData);

  return (
    <div className="my-4">
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
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
};

export default PieChartView;
