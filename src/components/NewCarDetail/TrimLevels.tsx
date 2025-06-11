import React from 'react';
import { Car } from '../../types/car';

interface Props {
  car: Car;
  selectedTrim: string;
  onTrimChange: (trim: string) => void;
}

const trims = [
  {
    name: 'Base',
    price: 35000,
    features: [
      'LED headlights',
      '17-inch alloy wheels',
      'Apple CarPlay/Android Auto',
      'Forward collision warning',
      'Lane departure warning'
    ]
  },
  {
    name: 'Sport',
    price: 37500,
    features: [
      '19-inch sport wheels',
      'Sport-tuned suspension',
      'Leather-wrapped steering wheel',
      'Paddle shifters',
      'Sport seats'
    ]
  },
  {
    name: 'Touring',
    price: 40000,
    features: [
      'Leather upholstery',
      'Navigation system',
      'Premium audio system',
      'Heated/ventilated seats',
      'Panoramic sunroof'
    ]
  }
];

const TrimLevels: React.FC<Props> = ({ car, selectedTrim, onTrimChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trims.map((trim) => (
          <button
            key={trim.name}
            onClick={() => onTrimChange(trim.name)}
            className={`
              p-6 rounded-lg border transition-all duration-200 text-left
              ${selectedTrim === trim.name
                ? 'bg-motortrend-dark border-motortrend-red/20 shadow-lg scale-[1.02]'
                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }
            `}
          >
            <div className="font-bold mb-2">{trim.name}</div>
            <div className="text-2xl font-bold mb-4">
              ${trim.price.toLocaleString()}
            </div>
            <ul className="space-y-2">
              {trim.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-400">
                  <svg
                    className="w-4 h-4 text-motortrend-red flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="font-bold mb-4">Trim Level Comparison</h4>
        <p className="text-gray-400 leading-relaxed">
          Each trim level of the {car.year} {car.make} {car.model} offers a unique blend of features 
          and value. The base model provides excellent standard features, while the Sport adds 
          performance-oriented upgrades. The Touring trim represents the pinnacle of luxury and 
          technology in the lineup.
        </p>
      </div>
    </div>
  );
};

export default TrimLevels;
