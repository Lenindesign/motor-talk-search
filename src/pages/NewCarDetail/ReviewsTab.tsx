import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { ownerReviews } from './utils';
import { CommentsSection } from '@/components/CommentsSection';
import { mockComments } from '@/services/mockData';
import { useCardSave } from '../../hooks/useCardSave';
const mockReviews = [{
  author: 'John Smith',
  rating: 5,
  date: 'May 20, 2025',
  content: 'I absolutely love this car! The acceleration is insane and it handles like a dream. The interior is luxurious and the tech features are top-notch. Highly recommend!',
  pros: ['Amazing acceleration', 'Luxurious interior', 'Advanced tech'],
  cons: ['Expensive options']
}, {
  author: 'Sarah Johnson',
  rating: 4,
  date: 'May 15, 2025',
  content: 'Great car overall. The ride is smooth and comfortable, and the electric powertrain is fantastic. The only downside is the learning curve for all the tech features.',
  pros: ['Quiet cabin', 'Premium materials'],
  cons: ['Learning curve for tech']
}, {
  author: 'Mike Davis',
  rating: 3,
  date: 'May 10, 2025',
  content: 'Solid car but not perfect. The performance is great, but the ride can be a bit firm. The tech features are impressive but take some time to master.',
  pros: ['Good performance', 'Impressive tech'],
  cons: ['Firm ride', 'Steep learning curve']
}, {
  author: 'Emily Chen',
  rating: 4,
  date: 'May 5, 2025',
  content: 'Love this car! The electric range is excellent and the charging speed is impressive. The interior is comfortable and the tech features are intuitive.',
  pros: ['Excellent range', 'Fast charging'],
  cons: ['Expensive options']
}, {
  author: 'David Lee',
  rating: 5,
  date: 'May 1, 2025',
  content: 'This is my dream car. The performance is outstanding, the interior is luxurious, and the tech features are amazing. Worth every penny!',
  pros: ['Outstanding performance', 'Luxury interior', 'Advanced features'],
  cons: []
}];

// Individual Review Card Component with Bookmark
const ReviewCard: React.FC<{ review: any; index: number }> = ({ review, index }) => {
  const { isSaved, toggleSave } = useCardSave({
    id: `review-${index}`,
    type: 'review',
    title: review.content.substring(0, 50) + '...',
    imageUrl: '',
    metadata: {
      author: review.author,
      rating: review.rating.toString(),
      date: review.date,
      content: review.content,
      pros: review.pros?.join(', ') || '',
      cons: review.cons?.join(', ') || ''
    }
  });

  return (
    <Card key={index} className="border border-neutral-6 bg-white hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-neutral-5'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="typography-caption text-neutral-3">{review.rating}/5</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleSave();
            }}
            className={`flex items-center gap-1 transition-colors ${
              isSaved ? 'text-motortrend-red' : 'text-neutral-4 hover:text-motortrend-red'
            }`}
            aria-label={isSaved ? "Remove from saved reviews" : "Save review"}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="typography-body-bold text-neutral-1">{review.author}</span>
          <span className="typography-caption text-neutral-4">{review.date}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <p className="text-base text-neutral-2 leading-relaxed">{review.content}</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-green-600">Pros</h4>
            <ul className="space-y-3">
              {review.pros.map((pro, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-neutral-2">
                  <span className="flex-none w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-red-600">Cons</h4>
            <ul className="space-y-3">
              {review.cons.map((con, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-neutral-2">
                  <span className="flex-none w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewsTab: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const displayedReviews = showMore ? mockReviews : mockReviews.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Summary Card */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-neutral-6 bg-neutral-7">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardTitle className="text-lg">Owner Reviews Summary</CardTitle>
              <p className="text-sm text-neutral-3">{ownerReviews.totalReviews.toLocaleString()} verified owner reviews</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rating Score and Distribution */}
            <div className="space-y-6">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-neutral-1">{ownerReviews.overallScore}</span>
                <div className="space-y-0.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-neutral-3">out of 5</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {ownerReviews.ratingDistribution.map(rating => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium text-neutral-2">{rating.stars}</span>
                      <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    </div>
                    <Progress 
                      value={rating.count / ownerReviews.totalReviews * 100} 
                      className="flex-1 h-2 bg-neutral-6"
                    />
                    <span className="text-sm text-neutral-3 w-12 text-right">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-green-600">Top Pros</h4>
                <ul className="space-y-3">
                  {ownerReviews.topPros.map((pro, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-neutral-2">
                      <span className="flex-none w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-red-600">Top Cons</h4>
                <ul className="space-y-3">
                  {ownerReviews.topCons.map((con, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-neutral-2">
                      <span className="flex-none w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      {displayedReviews.map((review, index) => (
        <ReviewCard key={index} review={review} index={index} />
      ))}

      {!showMore && (
        <div className="text-center">
          <Button 
            onClick={() => setShowMore(true)} 
            variant="outline-black" 
            className="min-w-[200px] bg-white hover:bg-neutral-8"
          >
            Load More Reviews
          </Button>
        </div>
      )}
      {/* User Comments Section */}
      <div className="mt-12">
        <CommentsSection articleId="rivian-r1s-2025" comments={mockComments} />
      </div>
    </div>
  );
}

export default ReviewsTab;