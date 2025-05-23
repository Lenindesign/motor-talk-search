
import React from 'react';
import { ChartDataItem } from '../utils/dataPreparation';
import { getDifferenceColor, formatPercentage } from '../utils/formatting';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TableViewProps {
  chartData: ChartDataItem[];
}

// Get appropriate icon based on difference and category
const getDifferenceIcon = (category: string, diff: number) => {
  const better = category !== 'price' ? diff > 0 : diff < 0;
  return better ? 
    <TrendingUp className="h-4 w-4 text-green-600" /> : 
    <TrendingDown className="h-4 w-4 text-red-600" />;
};

const TableView: React.FC<TableViewProps> = ({ chartData }) => {
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
};

export default TableView;
