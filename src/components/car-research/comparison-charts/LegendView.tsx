
import React from 'react';

const LegendView: React.FC = () => {
  return (
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
  );
};

export default LegendView;
