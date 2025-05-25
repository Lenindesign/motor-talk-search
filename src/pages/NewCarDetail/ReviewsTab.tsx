
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ownerReviews } from './utils';

const ReviewsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Owner Reviews Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold">{ownerReviews.overallScore}</div>
                <div className="text-gray-500">out of 5 stars</div>
                <div className="text-sm text-gray-500">{ownerReviews.totalReviews} reviews</div>
              </div>
              <div className="space-y-2">
                {ownerReviews.ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{rating.stars}★</span>
                    <Progress value={(rating.count / ownerReviews.totalReviews) * 100} className="flex-1 h-2" />
                    <span className="text-sm text-gray-500 w-12">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4">
                <h4 className="font-semibold text-green-600 mb-2">Top Pros</h4>
                <ul className="space-y-1">
                  {ownerReviews.topPros.map((pro, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Top Cons</h4>
                <ul className="space-y-1">
                  {ownerReviews.topCons.map((con, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsTab;
