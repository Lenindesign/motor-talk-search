
import React from 'react';

interface DetailedExplanationProps {
  vehicle: any;
}

const DetailedExplanation: React.FC<DetailedExplanationProps> = ({ vehicle }) => {
  return (
    <div className="mt-6 rounded-lg bg-gray-50 p-4">
      <h3 className="mb-2 text-sm font-semibold">How it Compares</h3>
      <p className="text-sm text-gray-700">
        The {vehicle.year} {vehicle.make} {vehicle.model} stands out in its class with 
        superior fuel economy and safety ratings. While priced slightly higher than the class average, 
        it delivers more value through better technology features and reliability ratings. 
        The cargo space is about average for the segment.
      </p>
    </div>
  );
};

export default DetailedExplanation;
