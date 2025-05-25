
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSpecs } from './utils';

const SpecsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(mockSpecs).map(([key, value]) => (
            <div key={key} className="border-b pb-3">
              <dt className="font-semibold text-gray-600 capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </dt>
              <dd className="text-gray-900 text-lg">{value}</dd>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecsTab;
