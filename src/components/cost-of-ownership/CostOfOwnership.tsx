import React from 'react';
import { Car } from '../../types/car';
import { DollarSign, Calendar, Tool, GasPump, Shield } from 'lucide-react';

interface CostOfOwnershipProps {
  car: Car;
}

const CostOfOwnership: React.FC<CostOfOwnershipProps> = ({ car }) => {
  const costs = {
    depreciation: 15000,
    maintenance: 3000,
    repairs: 2000,
    fuel: 8000,
    insurance: 6000
  };

  const totalCost = Object.values(costs).reduce((acc, curr) => acc + curr, 0);

  const costItems = [
    {
      name: 'Depreciation',
      amount: costs.depreciation,
      icon: DollarSign,
      description: '5-year estimated depreciation'
    },
    {
      name: 'Maintenance',
      amount: costs.maintenance,
      icon: Calendar,
      description: 'Scheduled maintenance costs'
    },
    {
      name: 'Repairs',
      amount: costs.repairs,
      icon: Tool,
      description: 'Estimated repair costs'
    },
    {
      name: 'Fuel',
      amount: costs.fuel,
      icon: GasPump,
      description: 'Estimated fuel costs'
    },
    {
      name: 'Insurance',
      amount: costs.insurance,
      icon: Shield,
      description: 'Average insurance costs'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">5-Year Cost of Ownership</h2>
      <div className="bg-gray-700 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Total Cost</h3>
        <p className="text-3xl font-bold text-red-500">${totalCost.toLocaleString()}</p>
        <p className="text-gray-400 mt-1">Over 5 years</p>
      </div>
      <div className="space-y-4">
        {costItems.map((item) => (
          <div
            key={item.name}
            className="bg-gray-700 p-4 rounded-lg flex items-center gap-4"
          >
            <div className="bg-gray-600 p-3 rounded-lg">
              <item.icon className="w-6 h-6" />
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${item.amount.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostOfOwnership;
