import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockCompetitors, comparisonMetrics } from './utils';
const CompetitorsComparison: React.FC = () => {
  const currentVehicle = {
    name: 'Our Vehicle',
    imageUrl: '/images/our-vehicle.jpg',
    price: 85000,
    specs: {
      engine: '400 HP Electric Motor',
      acceleration: '4.2 seconds 0-60 mph',
      range: '405 miles EPA',
      charging: '350kW DC Fast Charging',
      drivetrain: 'All-Wheel Drive',
      seating: '5 passengers',
      cargo: '28.1 cu ft',
      warranty: '4 years/50,000 miles'
    },
    pros: ['Premium interior', 'Advanced tech features', 'Excellent range'],
    cons: ['Expensive options', 'Learning curve for tech', 'Firm ride']
  };
  return <div className="space-y-6">
      {/* Comparison Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Class Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Current Vehicle */}
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <img src={currentVehicle.imageUrl} alt={currentVehicle.name} className="w-32 h-20 object-cover rounded-lg mb-2" />
                  <h4 className="font-semibold">{currentVehicle.name}</h4>
                  <p className="text-sm text-gray-500">
                    ${currentVehicle.price.toLocaleString()} MSRP
                  </p>
                </div>
                <div className="space-y-8 mt-4">
                  <h5 className="text-sm font-medium text-green-600">Pros</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {currentVehicle.pros.map((pro, index) => <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {pro}
                      </li>)}
                  </ul>
                </div>
                <div className="space-y-2 mt-4">
                  <h5 className="text-sm font-medium text-red-600">Cons</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {currentVehicle.cons.map((con, index) => <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        {con}
                      </li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Competitors */}
            {mockCompetitors.map(competitor => <Card key={competitor.name} className="h-full">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <img src={competitor.imageUrl} alt={competitor.name} className="w-32 h-20 object-cover rounded-lg mb-2" />
                    <h4 className="font-semibold">{competitor.name}</h4>
                    <p className="text-sm text-gray-500">
                      ${competitor.price.toLocaleString()} MSRP
                    </p>
                  </div>
                  <div className="space-y-2 mt-4">
                    <h5 className="text-sm font-medium text-green-600">Pros</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {competitor.pros.map((pro, index) => <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {pro}
                        </li>)}
                    </ul>
                  </div>
                  <div className="space-y-2 mt-4">
                    <h5 className="text-sm font-medium text-red-600">Cons</h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {competitor.cons.map((con, index) => <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          {con}
                        </li>)}
                    </ul>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default CompetitorsComparison;