
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Trim {
  name: string;
  price: string;
  features: string[];
}

interface TrimsTabProps {
  trims: Trim[];
  selectedTrim: string;
  onTrimSelect: (trimName: string) => void;
  selectedTrimData: Trim;
}

const TrimsTab: React.FC<TrimsTabProps> = ({ trims, selectedTrim, onTrimSelect, selectedTrimData }) => {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        {trims.map((trim) => (
          <button
            key={trim.name}
            onClick={() => onTrimSelect(trim.name)}
            className={`px-4 py-2 rounded ${
              selectedTrim === trim.name
                ? 'bg-motortrend-red text-white'
                : 'bg-white border hover:bg-gray-50'
            }`}
          >
            {trim.name}
          </button>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{selectedTrimData.name} - {selectedTrimData.price}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {selectedTrimData.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrimsTab;
