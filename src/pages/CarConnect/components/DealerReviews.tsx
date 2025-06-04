import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Review, Dealer } from '../types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DealerReviewsProps {
  dealer: Dealer;
}

const DealerReviews: React.FC<DealerReviewsProps> = ({ dealer }) => {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  // Mock reviews - replace with API call
  const reviews: Review[] = [
    {
      id: '1',
      userId: 'user1',
      dealerId: dealer.id,
      rating: 5,
      content: 'Great experience! Very professional and helpful staff.',
      timestamp: new Date('2025-05-30'),
    },
    {
      id: '2',
      userId: 'user2',
      dealerId: dealer.id,
      rating: 4,
      content: 'Good communication and fair pricing.',
      timestamp: new Date('2025-05-28'),
    },
  ];

  const handleSubmitReview = () => {
    // Add API call to submit review
    setIsWritingReview(false);
    setReviewText('');
    setRating(0);
  };

  const StarRating = ({ value, onChange }: { value: number; onChange?: (rating: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange?.(star)}
          className={`${onChange ? 'cursor-pointer' : ''}`}
        >
          <Star
            className={`h-5 w-5 ${
              star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <Dialog open={isWritingReview} onOpenChange={setIsWritingReview}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mb-4">
            Write a Review
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review for {dealer.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full h-32 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-motortrend-red/20"
                placeholder="Share your experience with this dealer..."
              />
            </div>
            <Button
              onClick={handleSubmitReview}
              disabled={!rating || !reviewText.trim()}
              className="w-full"
            >
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <StarRating value={review.rating} />
              <span className="text-sm text-gray-500">
                {review.timestamp.toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{review.content}</p>
            <div className="flex items-center text-sm text-gray-500">
              <button className="flex items-center hover:text-motortrend-red">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealerReviews;
