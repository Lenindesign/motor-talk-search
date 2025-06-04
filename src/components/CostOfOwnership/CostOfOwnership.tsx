import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Progress } from '../ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface CostOfOwnershipProps {
  initialPrice: number;
  costBreakdown: CostBreakdown[];
  depreciationData: { year: number; value: number }[];
  className?: string;
}

const CostOfOwnership: React.FC<CostOfOwnershipProps> = ({
  initialPrice,
  costBreakdown,
  depreciationData,
  className = ''
}) => {
  const [period, setPeriod] = useState('5');

  // Calculate costs based on period
  const getPeriodMultiplier = (selectedPeriod: string) => {
    switch (selectedPeriod) {
      case '3': return 0.7;
      case '7': return 1.3;
      default: return 1;
    }
  };

  const multiplier = getPeriodMultiplier(period);
  const adjustedCostBreakdown = costBreakdown.map(item => ({
    ...item,
    amount: Math.round(item.amount * multiplier)
  }));

  const totalCost = adjustedCostBreakdown.reduce((acc, item) => acc + item.amount, 0);
  const monthlyPayment = totalCost / (parseInt(period) * 12);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className={`bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5 ${className}`}>
      <h2 className="text-lg md:text-xl text-neutral-1 font-bold mb-4">Cost of Ownership</h2>
      
      {/* Ownership Period Selection */}
      <div className="mb-6">
        <p className="text-sm text-neutral-3 mb-2">Ownership Period</p>
        <Tabs defaultValue="5" onValueChange={setPeriod} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-neutral-7 rounded-lg p-1">
            <TabsTrigger value="3">3 Years</TabsTrigger>
            <TabsTrigger value="5">5 Years</TabsTrigger>
            <TabsTrigger value="7">7 Years</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Total Cost Display */}
      <div className="text-center mb-6">
        <p className="text-sm text-neutral-3 mb-1">Total {period}-Year Cost</p>
        <p className="text-2xl font-semibold mb-1">${totalCost.toLocaleString()}</p>
        <p className="text-sm text-neutral-3">${Math.round(monthlyPayment)} per month</p>
      </div>

      {/* Cost Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-1 mb-3">Cost Breakdown</h4>
        <div className="space-y-3">
          {adjustedCostBreakdown.map((item) => (
            <div key={item.category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-2">{item.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-1 font-medium">
                    {formatCurrency(item.amount)}
                  </span>
                  <span className="text-neutral-3 text-xs">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <Progress
                value={item.percentage}
                className={`h-2 rounded-full bg-neutral-7 ${item.color}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Yearly Cost Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-1 mb-3">Yearly Cost Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-neutral-2 border-b border-neutral-6">
              <tr>
                <th className="text-left py-2 font-medium">Year</th>
                <th className="text-right py-2 font-medium">Insurance</th>
                <th className="text-right py-2 font-medium">Maintenance</th>
                <th className="text-right py-2 font-medium">Electricity</th>
                <th className="text-right py-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: parseInt(period) }, (_, i) => {
                const year = i + 1;
                // Higher insurance for luxury EV
                const insurance = 4800;
                // Lower maintenance costs, increasing slower
                const maintenance = Math.round(1600 * (1 + i * 0.2));
                // Electricity costs (based on average EV consumption and rates)
                const electricity = 960; // ~$80/month for charging
                const total = insurance + maintenance + electricity;
                return (
                  <tr key={year} className="border-b border-neutral-6 last:border-none">
                    <td className="py-3">Year {year}</td>
                    <td className="text-right py-3">${insurance.toLocaleString()}</td>
                    <td className="text-right py-3">${maintenance.toLocaleString()}</td>
                    <td className="text-right py-3">${electricity.toLocaleString()}</td>
                    <td className="text-right py-3 font-medium">${total.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Depreciation Chart */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-1 mb-3">Estimated Depreciation</h4>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={depreciationData}
              margin={{ top: 10, right: 30, left: 60, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                label={{ value: 'Years of Ownership', position: 'bottom', offset: 20, fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                width={60}
              />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelFormatter={(value) => `Year ${value}`}
                contentStyle={{ fontSize: '12px' }}
                wrapperStyle={{ outline: 'none' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 4, fill: '#6366F1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CostOfOwnership;
