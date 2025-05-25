
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { classComparison } from './utils';

const ComparisonTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How It Compares to Class Average</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {classComparison.map((item) => (
            <div key={item.metric} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.metric}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">
                    This Car: <span className="font-bold">{item.thisVehicle}{item.unit}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Average: {item.classAverage}{item.unit}
                  </span>
                </div>
              </div>
              <div className="relative">
                <Progress value={item.classAverage} className="h-2 bg-gray-200" />
                <Progress 
                  value={item.thisVehicle} 
                  className={`h-2 absolute top-0 ${item.thisVehicle > item.classAverage ? 'bg-green-500' : 'bg-red-500'}`} 
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.thisVehicle > item.classAverage ? 'Above Average' : 'Below Average'}</span>
                <TrendingUp size={12} className={item.thisVehicle > item.classAverage ? 'text-green-500' : 'text-red-500'} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonTab;
