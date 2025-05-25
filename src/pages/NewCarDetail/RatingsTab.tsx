
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { expertRatings } from './utils';

const RatingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expert Rating Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {expertRatings.map((rating) => (
            <div key={rating.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{rating.category}</span>
                <span className="text-lg font-bold">{rating.score}/10</span>
              </div>
              <Progress value={rating.score * 10} className="h-2" />
              <p className="text-sm text-gray-600">{rating.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingsTab;
