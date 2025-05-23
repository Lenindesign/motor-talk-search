
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { ChartDataItem } from '../utils/dataPreparation';
import { formatPercentage } from '../utils/formatting';

interface BarChartProps {
  chartData: ChartDataItem[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isBetter = data.isBetter;
    
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

const BarChartView: React.FC<BarChartProps> = ({ chartData }) => {
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
};

export default BarChartView;
