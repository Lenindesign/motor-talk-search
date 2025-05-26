
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ownerReviews } from './utils';

const mockReviews = [
  {
    author: 'John Smith',
    rating: 5,
    date: 'May 20, 2025',
    content: 'I absolutely love this car! The acceleration is insane and it handles like a dream. The interior is luxurious and the tech features are top-notch. Highly recommend!',
    pros: ['Amazing acceleration', 'Luxurious interior', 'Advanced tech'],
    cons: ['Expensive options']
  },
  {
    author: 'Sarah Johnson',
    rating: 4,
    date: 'May 15, 2025',
    content: 'Great car overall. The ride is smooth and comfortable, and the electric powertrain is fantastic. The only downside is the learning curve for all the tech features.',
    pros: ['Quiet cabin', 'Premium materials'],
    cons: ['Learning curve for tech']
  },
  {
    author: 'Mike Davis',
    rating: 3,
    date: 'May 10, 2025',
    content: 'Solid car but not perfect. The performance is great, but the ride can be a bit firm. The tech features are impressive but take some time to master.',
    pros: ['Good performance', 'Impressive tech'],
    cons: ['Firm ride', 'Steep learning curve']
  },
  {
    author: 'Emily Chen',
    rating: 4,
    date: 'May 5, 2025',
    content: 'Love this car! The electric range is excellent and the charging speed is impressive. The interior is comfortable and the tech features are intuitive.',
    pros: ['Excellent range', 'Fast charging'],
    cons: ['Expensive options']
  },
  {
    author: 'David Lee',
    rating: 5,
    date: 'May 1, 2025',
    content: 'This is my dream car. The performance is outstanding, the interior is luxurious, and the tech features are amazing. Worth every penny!',
    pros: ['Outstanding performance', 'Luxury interior', 'Advanced features'],
    cons: []
  }
];

const ReviewsTab: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const displayedReviews = showMore ? mockReviews : mockReviews.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Owner Reviews Summary</CardTitle>
            <span className="text-sm text-gray-500">{ownerReviews.totalReviews} reviews</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold">{ownerReviews.overallScore}</div>
                <div className="text-gray-500">out of 5 stars</div>
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
              <div className="flex justify-between items-start mb-4">
                <div>
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
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      {displayedReviews.map((review, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">{review.rating}★</div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
              <div className="text-sm font-medium">{review.author}</div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{review.content}</p>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                <ul className="space-y-1">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
                <ul className="space-y-1">
                  {review.cons.map((con, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {!showMore && (
        <div className="text-center">
          <Button
            onClick={() => setShowMore(true)}
            variant="outline"
            className="mt-4"
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
