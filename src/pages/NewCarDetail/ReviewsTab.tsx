import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Bookmark, Star, ThumbsUp, MessageCircle, Users, TrendingUp } from 'lucide-react';
import { ownerReviews } from './utils';
import { useCardSave } from '../../hooks/useCardSave';

const mockReviews = [
  {
    author: 'John Smith',
    rating: 5,
    date: 'May 20, 2025',
    content: 'I absolutely love this car! The acceleration is insane and it handles like a dream. The interior is luxurious and the tech features are top-notch.',
    pros: ['Amazing acceleration', 'Luxurious interior', 'Advanced tech'],
    cons: ['Expensive options'],
    helpful: 24,
    verified: true
  },
  {
    author: 'Sarah Johnson',
    rating: 4,
    date: 'May 15, 2025',
    content: 'Great car overall. The ride is smooth and comfortable, and the electric powertrain is fantastic. The only downside is the learning curve for all the tech features.',
    pros: ['Quiet cabin', 'Premium materials', 'Smooth ride'],
    cons: ['Learning curve for tech'],
    helpful: 18,
    verified: true
  },
  {
    author: 'Mike Davis',
    rating: 4,
    date: 'May 10, 2025',
    content: 'Solid car but not perfect. The performance is great, but the ride can be a bit firm. The tech features are impressive but take some time to master.',
    pros: ['Good performance', 'Impressive tech'],
    cons: ['Firm ride', 'Steep learning curve'],
    helpful: 12,
    verified: false
  }
];

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
    <div className="bg-white rounded-2xl border border-neutral-6 p-6 space-y-4 hover:shadow-modern transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-blue-700">
              {review.author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="typography-subtitle text-neutral-1">{review.author}</span>
              {review.verified && (
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? 'text-yellow-400 fill-current' : 'text-neutral-5'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-3">{review.date}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            toggleSave();
          }}
          className={`transition-colors ${
            isSaved ? 'text-motortrend-red' : 'text-neutral-4 hover:text-motortrend-red'
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Content */}
      <p className="text-sm text-neutral-2 leading-relaxed">{review.content}</p>

      {/* Pros and Cons */}
      {(review.pros.length > 0 || review.cons.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-6">
          {review.pros.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-green-600 uppercase tracking-wide">Pros</h5>
              <ul className="space-y-1">
                {review.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {review.cons.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-red-600 uppercase tracking-wide">Cons</h5>
              <ul className="space-y-1">
                {review.cons.map((con, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-2">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-6">
        <div className="flex items-center gap-1 text-xs text-neutral-3">
          <ThumbsUp className="w-3 h-3" />
          <span>{review.helpful} found helpful</span>
        </div>
        {review.verified && (
          <span className="text-xs text-green-600 font-medium">Verified Purchase</span>
        )}
      </div>
    </div>
  );
};

const ReviewsTab: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const displayedReviews = showMore ? mockReviews : mockReviews.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="bg-gradient-to-r from-neutral-8 to-neutral-7 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-neutral-1">{ownerReviews.overallScore}</div>
                <div className="flex justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-neutral-3 mt-1">out of 5</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-neutral-3" />
                  <span className="text-sm text-neutral-2">
                    {ownerReviews.totalReviews.toLocaleString()} reviews
                  </span>
                </div>
                <div className="space-y-1">
                  {ownerReviews.ratingDistribution.slice().reverse().map(rating => (
                    <div key={rating.stars} className="flex items-center gap-2">
                      <span className="text-xs text-neutral-3 w-2">{rating.stars}</span>
                      <Progress 
                        value={(rating.count / ownerReviews.totalReviews) * 100} 
                        className="flex-1 h-1.5 bg-neutral-6"
                      />
                      <span className="text-xs text-neutral-3 w-8 text-right">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Mentions */}
          <div className="space-y-4">
            <h4 className="typography-subtitle text-neutral-1">What Owners Love</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="text-xs font-medium text-green-600 uppercase tracking-wide">Top Pros</h5>
                <ul className="space-y-1">
                  {ownerReviews.topPros.slice(0, 3).map((pro, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-neutral-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="text-xs font-medium text-red-600 uppercase tracking-wide">Top Cons</h5>
                <ul className="space-y-1">
                  {ownerReviews.topCons.slice(0, 3).map((con, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-neutral-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="typography-subtitle text-neutral-1">Recent Reviews</h4>
          <div className="flex items-center gap-2 text-sm text-neutral-3">
            <TrendingUp className="w-4 h-4" />
            <span>Sorted by most helpful</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {!showMore && mockReviews.length > 2 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowMore(true)}
              className="px-8"
            >
              Show More Reviews ({mockReviews.length - 2} remaining)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;