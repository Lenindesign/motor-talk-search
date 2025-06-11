import React from 'react';
import { Car } from '../../types/car';

interface CompetitorsComparisonProps {
  car: Car;
}

const CompetitorsComparison: React.FC<CompetitorsComparisonProps> = ({ car }) => {
  const competitors = [
    {
      name: `${car.make} ${car.model}`,
      price: car.price,
      image: car.image,
      pros: ['Excellent fuel economy', 'Spacious interior', 'Advanced safety features'],
      cons: ['Average acceleration', 'Some road noise', 'Base engine could use more power']
    },
    {
      name: 'Honda Accord',
      price: 35000,
      image: '/images/cars/honda-accord.jpg',
      pros: ['Strong performance', 'Premium interior', 'Excellent value'],
      cons: ['Firm ride', 'No all-wheel drive', 'Conservative styling']
    },
    {
      name: 'Hyundai Sonata',
      price: 33000,
      image: '/images/cars/hyundai-sonata.jpg',
      pros: ['Bold design', 'Feature-rich', 'Good warranty'],
      cons: ['Average handling', 'Some cheap materials', 'Limited rear headroom']
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Competitors Comparison</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitors.map((competitor) => (
          <div 
            key={competitor.name}
            className={`bg-gray-700 rounded-lg overflow-hidden ${competitor.name === `${car.make} ${car.model}` ? 'ring-2 ring-red-500' : ''}`}
          >
            <img 
              src={competitor.image} 
              alt={competitor.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{competitor.name}</h3>
                <p className="text-gray-400">${competitor.price.toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-500 mb-2">Pros</h4>
                <ul className="list-disc list-inside space-y-1">
                  {competitor.pros.map((pro, index) => (
                    <li key={index} className="text-sm">{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-500 mb-2">Cons</h4>
                <ul className="list-disc list-inside space-y-1">
                  {competitor.cons.map((con, index) => (
                    <li key={index} className="text-sm">{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorsComparison;
