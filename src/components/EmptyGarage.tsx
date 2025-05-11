
import React from 'react';
import { Car } from 'lucide-react';

interface EmptyGarageProps {
  onSearchFocus?: () => void;
}

const EmptyGarage: React.FC<EmptyGarageProps> = ({ onSearchFocus }) => {
  return (
    <div className="text-center py-10">
      <Car size={48} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        Your garage is empty
      </h3>
      <p className="text-gray-500 mb-8">
        Save cars you're interested in to add them to your garage
      </p>
    </div>
  );
};

export default EmptyGarage;
