import React, { useState } from 'react';
import { Car } from '../../types/car';

interface PaymentCalculatorProps {
  car: Car;
}

const PaymentCalculator: React.FC<PaymentCalculatorProps> = ({ car }) => {
  const [downPayment, setDownPayment] = useState(5000);
  const [term, setTerm] = useState(60);
  const [apr, setApr] = useState(3.9);

  const calculateMonthlyPayment = () => {
    const principal = car.price - downPayment;
    const monthlyRate = apr / 1200;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return monthlyPayment.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Down Payment</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Term (months)</label>
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded-lg"
            >
              <option value={36}>36 months</option>
              <option value={48}>48 months</option>
              <option value={60}>60 months</option>
              <option value={72}>72 months</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">APR (%)</label>
            <input
              type="number"
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              step="0.1"
              className="w-full p-2 bg-gray-700 rounded-lg"
            />
          </div>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Estimated Monthly Payment</h3>
          <p className="text-3xl font-bold text-red-500">${calculateMonthlyPayment()}</p>
          <p className="text-gray-400 mt-2">Based on your inputs</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCalculator;
