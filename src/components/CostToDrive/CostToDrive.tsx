import React from 'react';
import { Info, ChevronRight, Zap, Fuel } from 'lucide-react';

interface CostToDriveProps {
  monthlyCost: number;
  comparisonCost: number;
  vehicleName: string;
  comparisonVehicleType: string;
  location: string;
  isElectric?: boolean;
  comparisonIsElectric?: boolean;
}

export const CostToDrive: React.FC<CostToDriveProps> = ({
  monthlyCost,
  comparisonCost,
  vehicleName,
  comparisonVehicleType,
  location,
  isElectric = true,
  comparisonIsElectric = false
}) => {
  return (
    <div className="bg-white shadow-modern border-modern rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-neutral-1">Cost to Drive</h3>
        <Info size={16} className="text-neutral-3" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="flex items-center justify-center h-12 w-12 mx-auto mb-2 bg-neutral-100 rounded-full p-3">
            <Zap size={32} className="text-neutral-1" />
          </div>
          <div className="text-2xl font-bold text-neutral-1">${monthlyCost}<span className="text-sm font-normal text-neutral-3">/mo</span></div>
          <div className="text-xs text-neutral-3 mt-1">Rivian</div>
        </div>
        
        <div className="text-lg text-neutral-3 font-medium px-2">vs</div>
        
        <div className="text-center">
          <div className="flex items-center justify-center h-12 w-12 mx-auto mb-2 bg-neutral-100 rounded-full p-3">
            {comparisonIsElectric ? (
              <Zap size={32} className="text-neutral-1" />
            ) : (
              <Fuel size={32} className="text-neutral-1" />
            )}
          </div>
          <div className="text-2xl font-bold text-neutral-1">${comparisonCost}<span className="text-sm font-normal text-neutral-3">/mo</span></div>
          <div className="text-xs text-neutral-3 mt-1">Avg. {comparisonVehicleType}</div>
        </div>
      </div>
      
      <button className="w-full mt-4 flex items-center justify-center text-lg font-medium text-neutral-1 hover:text-black py-2 border-t border-neutral-200">
        Monthly estimates based on costs in {location}
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default CostToDrive;
