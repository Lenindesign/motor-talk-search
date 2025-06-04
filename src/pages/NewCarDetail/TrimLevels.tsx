import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface TrimLevelsProps {
  carTitle: string;
}

const trims = [
  {
    name: 'LE',
    price: 25945,
    features: [
      'LED headlights',
      'Dual-zone automatic climate control',
      '7-inch touchscreen',
      'Apple CarPlay & Android Auto',
      'Toyota Safety Sense 2.5+'
    ]
  },
  {
    name: 'SE',
    price: 27685,
    features: [
      'Sport-tuned suspension',
      '18-inch black machined-finish alloy wheels',
      'Single exhaust with dual chrome tips',
      'Sport SofTex®-trimmed front seats',
      'Leather-trimmed steering wheel'
    ]
  },
  {
    name: 'XLE',
    price: 30695,
    features: [
      'Leather-trimmed seats',
      'Heated front seats',
      '9-inch touchscreen',
      'Wireless charging',
      'Blind spot monitor with rear cross-traffic alert'
    ]
  }
];

const TrimLevels: React.FC<TrimLevelsProps> = ({ carTitle }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Pricing & Trim Levels</h2>
        <p className="text-gray-600 mt-1 text-sm">
          The 2023 Toyota Camry is available in several trim levels with different features and price points.
        </p>
      </div>

      <div className="space-y-6">
        {trims.map((trim) => (
          <Card key={trim.name} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Toyota Camry {trim.name}</h3>
                  <p className="text-2xl font-bold">${trim.price.toLocaleString()}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">Key Features:</p>
                  <ul className="space-y-2">
                    {trim.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:w-24 flex md:flex-col md:items-end gap-2">
                <Button variant="outline" className="w-full">
                  Select
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrimLevels;
