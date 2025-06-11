import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface TrimSelectorProps {
  onSelect: (trim: string) => void;
}

interface TrimLevel {
  name: string;
  price: number;
  keyFeatures: string[];
  differences?: string[];
}

const trims: TrimLevel[] = [
  {
    name: 'Dual-Motor',
    price: 78000,
    keyFeatures: [
      'Standard Range Battery',
      'Dual Motor All-Wheel Drive',
      'EPA est. 300 miles',
      '19" Aero Wheels',
      'Basic Autopilot'
    ],
    differences: []
  },
  {
    name: 'Performance Dual-Motor',
    price: 89000,
    keyFeatures: [
      'Standard Range Battery',
      'Enhanced Dual Motor All-Wheel Drive',
      'EPA est. 280 miles',
      '20" Sport Wheels',
      'Enhanced Autopilot'
    ],
    differences: [
      'Upgraded motors (+100hp)',
      'Sport-tuned suspension',
      'Performance brakes',
      'Enhanced Autopilot included'
    ]
  },
  {
    name: 'Max Pack Dual-Motor',
    price: 93000,
    keyFeatures: [
      'Extended Range Battery',
      'Dual Motor All-Wheel Drive',
      'EPA est. 400 miles',
      '19" Aero Wheels',
      'Basic Autopilot'
    ],
    differences: [
      'Extended range battery (+100 miles)',
      'Faster DC charging',
      'Enhanced range display',
      'Trip planner included'
    ]
  }
];

const TrimSelector: React.FC<TrimSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-4">
      {/* Trims Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Trim</h3>
        <span className="text-sm text-gray-500">3 options available</span>
      </div>

      {/* Trim Cards */}
      <div className="space-y-3">
        {trims.map((trim, index) => (
          <div 
            key={trim.name}
            className="bg-white rounded-lg border hover:border-blue-500 transition-colors cursor-pointer"
          >
            {/* Trim Header */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{trim.name}</h4>
                  <p className="text-lg font-bold">${trim.price.toLocaleString()}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => onSelect(trim.name)}
                >
                  Select
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Key Features */}
              <div className="mt-3">
                <div className="grid grid-cols-2 gap-2">
                  {trim.keyFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Differences from base */}
              {index > 0 && trim.differences && trim.differences.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">What's Different:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {trim.differences.map((diff, i) => (
                      <div key={i} className="flex items-center text-sm text-green-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                        {diff}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrimSelector;
