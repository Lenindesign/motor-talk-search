import React from 'react';
import { Button } from '@/components/ui/button';

interface CompactPricingModuleProps {
  title: string;
  year: string;
  category: string;
  msrp: string;
  suggestedPrice: number;
  monthlyPayment: number;
  downPayment: number;
  term: number;
  availableCount?: number;
  location?: string;
  assemblyLocation?: string;
  rank?: number;
  totalRanked?: number;
}

const CompactPricingModule: React.FC<CompactPricingModuleProps> = ({
  title,
  year,
  category,
  msrp,
  suggestedPrice,
  monthlyPayment,
  downPayment,
  term,
  availableCount = 0,
  location = '',
  assemblyLocation = '',
  rank,
  totalRanked
}) => {
  // Format numbers with commas
  const formattedSuggestedPrice = suggestedPrice.toLocaleString();
  const formattedMonthlyPayment = monthlyPayment.toLocaleString();
  const formattedDownPayment = downPayment.toLocaleString();

  return (
    <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden">
      {/* Rank badge (if provided) */}
      {rank && totalRanked && (
        <div className="absolute top-0 left-0 bg-neutral-9 text-white px-3 py-1 rounded-br-lg text-xs font-medium">
          RANKED
          <div className="font-bold">{`#${rank} of ${totalRanked}`}</div>
        </div>
      )}

      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-neutral-1 mb-4">{`${year} ${title}`}</h2>
        
        {/* Selectors */}
        <div className="space-y-2 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <select className="px-3 py-2 border border-neutral-5 rounded-md text-sm bg-white">
              <option>{`${year} - New`}</option>
            </select>
            <select className="px-3 py-2 border border-neutral-5 rounded-md text-sm bg-white">
              <option>{category}</option>
            </select>
          </div>
          <select className="w-full px-3 py-2 border border-neutral-5 rounded-md text-sm bg-white">
            <option>{`Dual-Motor - ${msrp} MSRP`}</option>
          </select>
        </div>
        
        {/* Price info */}
        <div className="mb-4">
          <p className="text-sm text-neutral-3">MotorTrend suggests you pay</p>
          <div className="text-3xl font-bold text-neutral-1">${formattedSuggestedPrice}</div>
          <div className="text-lg font-semibold text-green-600">${formattedMonthlyPayment} <span className="text-sm font-normal">/mo*</span></div>
          <p className="text-xs text-neutral-4">*Est. payment with ${formattedDownPayment} down for {term} months</p>
        </div>
        
        {/* CTA Button */}
        <Button className="w-full bg-motortrend-red hover:bg-motortrend-red/90 text-white">
          Find Best Price
        </Button>
        
        {/* Additional info */}
        <div className="mt-3 space-y-1">
          {availableCount > 0 && (
            <p className="text-xs text-neutral-3">{availableCount} for sale near you</p>
          )}
          {location && (
            <p className="text-xs text-neutral-3">Prices based on sales in {location}</p>
          )}
          {assemblyLocation && (
            <p className="text-xs text-neutral-3">Final assembly in {assemblyLocation}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactPricingModule;
