
import React from 'react';
import { ChartDataItem } from '../utils/dataPreparation';
import { formatPercentage } from '../utils/formatting';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CardsViewProps {
  chartData: ChartDataItem[];
}

const CardsView: React.FC<CardsViewProps> = ({ chartData }) => {
  // Function to render detailed comparison card for a category
  const renderDetailedCategoryCard = (data: ChartDataItem) => {
    const isBetter = data.key !== 'price' ? data.percentDiff > 0 : data.percentDiff < 0;
    
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

  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {chartData.map((item) => renderDetailedCategoryCard(item))}
    </div>
  );
};

export default CardsView;
