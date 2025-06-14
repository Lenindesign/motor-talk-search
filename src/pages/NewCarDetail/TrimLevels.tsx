import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Shield } from 'lucide-react';

interface TrimLevelsProps {
  carTitle: string;
}

const trims = [
  {
    name: 'Base',
    price: 78000,
    popular: false,
    features: [
      'Dual-Motor All-Wheel Drive',
      '15.5-inch touchscreen display',
      'Premium audio system',
      'Autopilot included',
      'Over-the-air updates'
    ],
    highlights: ['Great value', 'Essential features']
  },
  {
    name: 'Performance',
    price: 89000,
    popular: true,
    features: [
      'Performance Dual-Motor AWD',
      'Track Mode',
      'Performance brakes',
      'Lowered suspension',
      'Carbon fiber spoiler'
    ],
    highlights: ['Most popular', 'Best performance']
  },
  {
    name: 'Max Pack',
    price: 93000,
    popular: false,
    features: [
      'Extended range battery',
      'Premium interior package',
      'Enhanced autopilot',
      'Full self-driving capability',
      'Premium connectivity'
    ],
    highlights: ['Longest range', 'Luxury features']
  }
];

const TrimLevels: React.FC<TrimLevelsProps> = ({ carTitle }) => {
  const [selectedTrim, setSelectedTrim] = useState('Performance');

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="typography-subtitle text-neutral-1">Choose Your Configuration</h3>
        <p className="text-sm text-neutral-3">
          Select the trim level that best fits your needs and budget
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trims.map((trim) => (
          <div
            key={trim.name}
            className={`relative rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              selectedTrim === trim.name
                ? 'border-motortrend-red bg-red-50 shadow-modern-lg'
                : 'border-neutral-6 bg-white hover:border-neutral-4 hover:shadow-modern'
            }`}
            onClick={() => setSelectedTrim(trim.name)}
          >
            {/* Popular Badge */}
            {trim.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-motortrend-red text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h4 className="typography-subtitle text-neutral-1">{trim.name}</h4>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-neutral-1">
                    ${trim.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-3">Starting MSRP</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap justify-center gap-2">
                {trim.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-8 text-neutral-2 rounded-full text-xs font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-neutral-1">Key Features</h5>
                <ul className="space-y-2">
                  {trim.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-neutral-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Select Button */}
              <Button
                className={`w-full h-12 transition-all duration-200 ${
                  selectedTrim === trim.name
                    ? 'bg-motortrend-red text-white shadow-modern'
                    : 'bg-neutral-8 text-neutral-1 hover:bg-neutral-7'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTrim(trim.name);
                }}
              >
                {selectedTrim === trim.name ? 'Selected' : 'Select This Trim'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Note */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h4 className="typography-subtitle text-neutral-1">Need Help Choosing?</h4>
            <p className="text-sm text-neutral-2">
              Our experts can help you find the perfect trim level based on your driving needs, 
              budget, and preferences. All trims come with our comprehensive warranty and 
              24/7 roadside assistance.
            </p>
            <Button variant="outline" size="sm" className="mt-3">
              Compare All Trims
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrimLevels;
