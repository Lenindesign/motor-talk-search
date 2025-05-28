import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSpecs } from './utils';
interface OverviewTabProps {
  carTitle: string;
}
const OverviewTab: React.FC<OverviewTabProps> = ({
  carTitle
}) => {
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-motortrend-dark">
              The {carTitle} represents the pinnacle of modern automotive engineering, 
              combining cutting-edge electric technology with luxurious comfort and 
              impressive performance capabilities.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(mockSpecs).map(([key, value]) => <div key={key} className="border-b pb-2">
                  <dt className="font-semibold text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </dt>
                  <dd className="text-gray-900">{value}</dd>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Key Selling Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Advanced Autopilot
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Premium Interior
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Long Range Battery
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Fast Charging
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default OverviewTab;