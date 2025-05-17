
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface CostOwnershipProps {
  vehicle: any;
}

const CostOwnership: React.FC<CostOwnershipProps> = ({ vehicle }) => {
  const [years, setYears] = useState(5);
  
  // Generate mock data for a 5-year projection
  const generateDepreciationData = () => {
    const data = [];
    const initialValue = vehicle.price.base;
    const depreciation = vehicle.ownership.depreciation;
    
    // Get the initial value
    data.push({
      year: 0,
      value: initialValue,
      formattedValue: formatCurrency(initialValue),
    });
    
    // Use the depreciation data points where available
    depreciation.forEach(point => {
      data.push({
        year: point.year,
        value: point.value,
        formattedValue: formatCurrency(point.value),
      });
    });
    
    // Fill in gaps if needed for a 5-year projection
    const lastKnownYear = depreciation[depreciation.length - 1]?.year || 0;
    const lastKnownValue = depreciation[depreciation.length - 1]?.value || initialValue;
    
    if (lastKnownYear < 5) {
      const yearlyRate = (initialValue - lastKnownValue) / lastKnownYear * 0.7; // Slowing depreciation rate
      
      for (let i = lastKnownYear + 1; i <= 5; i++) {
        const projectedValue = Math.max(lastKnownValue - (yearlyRate * (i - lastKnownYear)), lastKnownValue * 0.4);
        data.push({
          year: i,
          value: Math.round(projectedValue),
          formattedValue: formatCurrency(Math.round(projectedValue)),
        });
      }
    }
    
    return data.sort((a, b) => a.year - b.year);
  };
  
  const depreciation = generateDepreciationData();
  
  // Annual maintenance costs
  const maintenanceCosts = [
    { year: 1, cost: vehicle.ownership.maintenance.year1 },
    { year: 2, cost: vehicle.ownership.maintenance.year2 },
    { year: 3, cost: vehicle.ownership.maintenance.year3 },
    { year: 4, cost: vehicle.ownership.maintenance.year4 },
    { year: 5, cost: vehicle.ownership.maintenance.year5 },
  ];
  
  // Estimated annual insurance cost
  const insuranceCost = Math.round(vehicle.price.base * 0.035);
  
  // Total cost of ownership
  const calculateTotalCost = () => {
    const initialPrice = vehicle.price.base;
    const fuelCostPerYear = vehicle.ownership.fuelCost;
    const totalYears = years;
    
    let totalMaintenance = 0;
    for (let i = 0; i < totalYears && i < maintenanceCosts.length; i++) {
      totalMaintenance += maintenanceCosts[i].cost;
    }
    
    const totalInsurance = insuranceCost * totalYears;
    const totalFuel = fuelCostPerYear * totalYears;
    
    const estimatedResaleValue = 
      depreciation.find(d => d.year === totalYears)?.value || 
      depreciation[depreciation.length - 1].value * 0.85;
    
    const totalDepreciation = initialPrice - estimatedResaleValue;
    
    return {
      totalCost: totalDepreciation + totalMaintenance + totalInsurance + totalFuel,
      breakdown: {
        depreciation: totalDepreciation,
        maintenance: totalMaintenance,
        insurance: totalInsurance,
        fuel: totalFuel,
      }
    };
  };
  
  const totalCostData = calculateTotalCost();
  
  // Format currency
  function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  }
  
  // Generate ownership cost data for the chart
  const generateOwnershipData = () => {
    const data = [];
    const costBreakdown = totalCostData.breakdown;
    
    data.push({
      name: 'Depreciation',
      value: costBreakdown.depreciation,
      fill: '#8884d8',
      percent: Math.round((costBreakdown.depreciation / totalCostData.totalCost) * 100),
    });
    
    data.push({
      name: 'Fuel',
      value: costBreakdown.fuel,
      fill: '#82ca9d',
      percent: Math.round((costBreakdown.fuel / totalCostData.totalCost) * 100),
    });
    
    data.push({
      name: 'Insurance',
      value: costBreakdown.insurance,
      fill: '#ffc658',
      percent: Math.round((costBreakdown.insurance / totalCostData.totalCost) * 100),
    });
    
    data.push({
      name: 'Maintenance',
      value: costBreakdown.maintenance,
      fill: '#ff8042',
      percent: Math.round((costBreakdown.maintenance / totalCostData.totalCost) * 100),
    });
    
    return data;
  };
  
  const ownershipData = generateOwnershipData();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Cost of Ownership</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Time Period Selection */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Ownership Period</label>
          <Tabs defaultValue="5" value={years.toString()} onValueChange={(val) => setYears(parseInt(val))}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="3">3 Years</TabsTrigger>
              <TabsTrigger value="5">5 Years</TabsTrigger>
              <TabsTrigger value="7">7 Years</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Total Cost Summary */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4 text-center">
          <div className="text-sm text-gray-500">Total {years}-Year Cost</div>
          <div className="mt-1 text-3xl font-bold text-primary">
            {formatCurrency(totalCostData.totalCost)}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {formatCurrency(Math.round(totalCostData.totalCost / (years * 12)))} per month
          </div>
        </div>
        
        {/* Cost Breakdown */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium">Cost Breakdown</h3>
          <div className="space-y-2">
            {ownershipData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-24 text-sm">{item.name}</div>
                <div className="mx-2 flex-1">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ width: `${item.percent}%`, backgroundColor: item.fill }}
                    ></div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm">
                  {formatCurrency(item.value)}
                </div>
                <div className="w-12 text-right text-xs text-gray-500">
                  {item.percent}%
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Depreciation Chart */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium">Estimated Depreciation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={depreciation}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year"
                  label={{ value: 'Years of Ownership', position: 'bottom', offset: 0 }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value/1000}k`} 
                />
                <Tooltip formatter={(value) => [`${formatCurrency(Number(value))}`, 'Vehicle Value']} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Annual Costs Table */}
        <div>
          <h3 className="mb-3 text-sm font-medium">Yearly Cost Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Year</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Insurance</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Maintenance</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Fuel</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceCosts.slice(0, years).map((yearData, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-sm">Year {yearData.year}</td>
                    <td className="px-4 py-2 text-right text-sm">{formatCurrency(insuranceCost)}</td>
                    <td className="px-4 py-2 text-right text-sm">{formatCurrency(yearData.cost)}</td>
                    <td className="px-4 py-2 text-right text-sm">{formatCurrency(vehicle.ownership.fuelCost)}</td>
                    <td className="px-4 py-2 text-right text-sm font-medium">
                      {formatCurrency(insuranceCost + yearData.cost + vehicle.ownership.fuelCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostOwnership;
