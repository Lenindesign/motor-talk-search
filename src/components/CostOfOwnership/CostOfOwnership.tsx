import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { DollarSign, TrendingDown, Calculator } from 'lucide-react';
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
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <Calculator className="w-5 h-5 text-motortrend-red" />
          <h3 className="typography-title text-neutral-1">Cost of Ownership</h3>
        </div>
        <p className="typography-body text-neutral-3">
          Comprehensive analysis of total ownership costs over time
        </p>
      </div>

      {/* Ownership Period Selection */}
      <Card className="border-neutral-6 shadow-modern">
        <div className="p-6">
          <p className="typography-body-large font-semibold text-neutral-1 mb-4">Ownership Period</p>
          <Tabs defaultValue="5" onValueChange={setPeriod} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-neutral-7 rounded-xl p-1 h-12">
              <TabsTrigger value="3" className="rounded-lg typography-body font-medium">3 Years</TabsTrigger>
              <TabsTrigger value="5" className="rounded-lg typography-body font-medium">5 Years</TabsTrigger>
              <TabsTrigger value="7" className="rounded-lg typography-body font-medium">7 Years</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Card>

      {/* Total Cost Display */}
      <Card className="border-neutral-6 shadow-modern bg-gradient-to-br from-neutral-8 to-neutral-7">
        <div className="p-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <DollarSign className="w-6 h-6 text-motortrend-red" />
            <p className="typography-body text-neutral-3">Total {period}-Year Cost</p>
          </div>
          <p className="typography-display text-neutral-1 mb-2">{formatCurrency(totalCost)}</p>
          <div className="flex items-center justify-center gap-2 text-neutral-3">
            <span className="typography-body">{formatCurrency(Math.round(monthlyPayment))}</span>
            <span className="typography-caption">per month</span>
          </div>
        </div>
      </Card>

      {/* Cost Breakdown */}
      <Card className="border-neutral-6 shadow-modern">
        <div className="p-6">
          <h4 className="typography-body-large font-semibold text-neutral-1 mb-6">Cost Breakdown</h4>
          <div className="space-y-6">
            {adjustedCostBreakdown.map((item) => (
              <div key={item.category} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="typography-body text-neutral-2">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="typography-body-large font-semibold text-neutral-1">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="typography-caption text-neutral-3 bg-neutral-7 px-2 py-1 rounded-full">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-neutral-7 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Yearly Cost Breakdown */}
      <Card className="border-neutral-6 shadow-modern">
        <div className="p-6">
          <h4 className="typography-body-large font-semibold text-neutral-1 mb-6">Yearly Cost Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-6">
                  <th className="text-left py-3 typography-body font-semibold text-neutral-2">Year</th>
                  <th className="text-right py-3 typography-body font-semibold text-neutral-2">Insurance</th>
                  <th className="text-right py-3 typography-body font-semibold text-neutral-2">Maintenance</th>
                  <th className="text-right py-3 typography-body font-semibold text-neutral-2">Electricity</th>
                  <th className="text-right py-3 typography-body font-semibold text-neutral-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: parseInt(period) }, (_, i) => {
                  const year = i + 1;
                  const insurance = 4800;
                  const maintenance = Math.round(1600 * (1 + i * 0.2));
                  const electricity = 960;
                  const total = insurance + maintenance + electricity;
                  return (
                    <tr key={year} className="border-b border-neutral-6 last:border-none hover:bg-neutral-8 transition-colors duration-200">
                      <td className="py-4 typography-body text-neutral-1">Year {year}</td>
                      <td className="text-right py-4 typography-body text-neutral-2">{formatCurrency(insurance)}</td>
                      <td className="text-right py-4 typography-body text-neutral-2">{formatCurrency(maintenance)}</td>
                      <td className="text-right py-4 typography-body text-neutral-2">{formatCurrency(electricity)}</td>
                      <td className="text-right py-4 typography-body-large font-semibold text-neutral-1">{formatCurrency(total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Depreciation Chart */}
      <Card className="border-neutral-6 shadow-modern">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingDown className="w-5 h-5 text-motortrend-red" />
            <h4 className="typography-body-large font-semibold text-neutral-1">Estimated Depreciation</h4>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={depreciationData}
                margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
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
                  width={70}
                  domain={['dataMin - 5000', 'dataMax + 5000']}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  labelFormatter={(value) => `Year ${value}`}
                  contentStyle={{ 
                    fontSize: '12px',
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  wrapperStyle={{ outline: 'none' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#DC2626"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#DC2626', strokeWidth: 2, stroke: 'white' }}
                  activeDot={{ r: 7, fill: '#DC2626' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="typography-caption text-neutral-3 mt-4 text-center">
            Depreciation estimates based on industry averages and vehicle category
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CostOfOwnership;
