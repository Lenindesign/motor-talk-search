import React from 'react';
import { Car } from '../../types/car';

interface ClassComparisonProps {
  car: Car;
}

const ClassComparison: React.FC<ClassComparisonProps> = ({ car }) => {
  const classComparison = [
    {
      make: car.make,
      model: car.model,
      price: car.price,
      mpg: '28/39',
      horsepower: 203,
      cargo: 15.1
    },
    {
      make: 'Honda',
      model: 'Accord',
      price: 35000,
      mpg: '29/37',
      horsepower: 192,
      cargo: 16.7
    },
    {
      make: 'Nissan',
      model: 'Altima',
      price: 32000,
      mpg: '27/37',
      horsepower: 188,
      cargo: 15.4
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Class Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4">Vehicle</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">MPG (City/Hwy)</th>
              <th className="text-left p-4">Horsepower</th>
              <th className="text-left p-4">Cargo Space (cu.ft)</th>
            </tr>
          </thead>
          <tbody>
            {classComparison.map((vehicle, index) => (
              <tr 
                key={`${vehicle.make}-${vehicle.model}`}
                className={`${index === 0 ? 'bg-red-900/20' : ''} hover:bg-gray-700/50`}
              >
                <td className="p-4">{vehicle.make} {vehicle.model}</td>
                <td className="p-4">${vehicle.price.toLocaleString()}</td>
                <td className="p-4">{vehicle.mpg}</td>
                <td className="p-4">{vehicle.horsepower}</td>
                <td className="p-4">{vehicle.cargo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassComparison;
