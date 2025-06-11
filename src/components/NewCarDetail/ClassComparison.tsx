import React from 'react';
import { Car } from '../../types/car';

interface Props {
  car: Car;
}

const competitors = [
  {
    make: 'Toyota',
    model: 'Camry',
    price: 35000,
    mpg: '28/39',
    horsepower: 203,
    rating: 8.8
  },
  {
    make: 'Honda',
    model: 'Accord',
    price: 36000,
    mpg: '29/37',
    horsepower: 192,
    rating: 8.9
  },
  {
    make: 'Nissan',
    model: 'Altima',
    price: 34000,
    mpg: '27/37',
    horsepower: 188,
    rating: 8.5
  }
];

const ClassComparison: React.FC<Props> = ({ car }) => {
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Model</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Price</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">MPG</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Horsepower</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Rating</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((comp, index) => (
              <tr 
                key={`${comp.make}-${comp.model}`}
                className={`border-b border-gray-700 ${
                  comp.make === car.make && comp.model === car.model
                    ? 'bg-motortrend-dark'
                    : 'hover:bg-gray-800'
                }`}
              >
                <td className="py-4 px-6 font-medium">
                  {comp.make} {comp.model}
                </td>
                <td className="py-4 px-6">${comp.price.toLocaleString()}</td>
                <td className="py-4 px-6">{comp.mpg}</td>
                <td className="py-4 px-6">{comp.horsepower} hp</td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{comp.rating}</span>
                    <div className="h-1.5 w-20 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-motortrend-red"
                        style={{ width: `${comp.rating * 10}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="font-bold mb-4">Class Analysis</h4>
        <p className="text-gray-400 leading-relaxed">
          In the midsize sedan segment, the {car.make} {car.model} stands out with competitive pricing
          and strong performance metrics. While fuel economy is on par with class leaders, its combination
          of features and build quality make it a compelling option in this highly competitive segment.
        </p>
      </div>
    </div>
  );
};

export default ClassComparison;
