import React from 'react';
import { Car } from '../../types/car';

interface Props {
  car: Car;
}

const competitors = [
  {
    make: 'Toyota',
    model: 'Camry',
    image: '/images/cars/toyota-camry.jpg',
    price: 35000,
    pros: [
      'Excellent fuel economy',
      'Strong safety features',
      'Comfortable ride'
    ],
    cons: [
      'Conservative styling',
      'Basic infotainment',
      'Limited trunk space'
    ]
  },
  {
    make: 'Honda',
    model: 'Accord',
    image: '/images/cars/honda-accord.jpg',
    price: 36000,
    pros: [
      'Sporty handling',
      'Premium interior',
      'Advanced tech features'
    ],
    cons: [
      'Higher price point',
      'Firm ride quality',
      'Road noise at speed'
    ]
  }
];

const CompetitorsComparison: React.FC<Props> = ({ car }) => {
  return (
    <div className="space-y-8">
      {competitors.map((competitor) => (
        <div 
          key={`${competitor.make}-${competitor.model}`}
          className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="aspect-[4/3] md:aspect-auto">
              <img 
                src={competitor.image}
                alt={`${competitor.make} ${competitor.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="col-span-2 p-6 space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-2">
                  {competitor.make} {competitor.model}
                </h4>
                <div className="text-2xl font-bold text-motortrend-red">
                  ${competitor.price.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-green-500 font-medium mb-3">Pros</h5>
                  <ul className="space-y-2">
                    {competitor.pros.map((pro, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500">+</span>
                        <span className="text-gray-400">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-red-500 font-medium mb-3">Cons</h5>
                  <ul className="space-y-2">
                    {competitor.cons.map((con, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-500">-</span>
                        <span className="text-gray-400">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompetitorsComparison;
