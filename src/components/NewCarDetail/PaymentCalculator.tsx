import React, { useState } from 'react';
import { Car } from '../../types/car';

interface Props {
  car: Car;
}

const PaymentCalculator: React.FC<Props> = ({ car }) => {
  const [downPayment, setDownPayment] = useState(5000);
  const [term, setTerm] = useState(60);
  const [apr, setApr] = useState(3.9);

  const calculateMonthlyPayment = () => {
    const principal = car.price - downPayment;
    const monthlyRate = apr / 1200;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return monthlyPayment;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <label className="block text-gray-400 mb-2">Down Payment</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full bg-gray-700 rounded-lg py-2 px-8 text-white"
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <label className="block text-gray-400 mb-2">Loan Term (months)</label>
          <select
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white"
          >
            <option value={36}>36 months</option>
            <option value={48}>48 months</option>
            <option value={60}>60 months</option>
            <option value={72}>72 months</option>
          </select>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <label className="block text-gray-400 mb-2">APR (%)</label>
          <div className="relative">
            <input
              type="number"
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
          </div>
        </div>
      </div>

      <div className="bg-motortrend-dark rounded-lg p-6 border border-motortrend-red/20">
        <div className="text-center">
          <div className="text-gray-400 mb-2">Estimated Monthly Payment</div>
          <div className="text-4xl font-bold text-white">
            ${Math.round(calculateMonthlyPayment()).toLocaleString()}/mo
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 text-center">
        This is an estimate. Your actual payment may vary based on your credit score and other factors.
      </p>
    </div>
  );
};

export default PaymentCalculator;
