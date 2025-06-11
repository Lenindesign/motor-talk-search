import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { useCardSave } from '../../hooks/useCardSave';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface OwnerReviewsProps {
  vehicle: any;
  limit?: number;
}

// Individual review component with bookmark functionality
const ReviewWithBookmark: React.FC<{ 
  review: any; 
  isExpanded: boolean; 
  onToggleExpanded: () => void;
}> = ({ review, isExpanded, onToggleExpanded }) => {
  const { isSaved, toggleSave } = useCardSave({
    id: review.id,
    type: 'review',
    title: review.title,
    imageUrl: '',
    metadata: {
      user: review.user,
      rating: review.rating.toString(),
      date: review.date,
      content: review.content,
      ownershipLength: review.ownershipLength,
      verified: review.verified?.toString() || 'false',
      pros: review.pros?.join(', ') || '',
      cons: review.cons?.join(', ') || ''
    }
  });

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {review.ownershipLength}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave();
              }}
              className={`flex items-center gap-1 transition-colors text-xs p-1 h-auto ${
                isSaved ? 'text-motortrend-red' : 'text-gray-500 hover:text-motortrend-red'
              }`}
              aria-label={isSaved ? "Remove from saved reviews" : "Save review"}
            >
              <Bookmark className={`h-3 w-3 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
          </div>
          <h4 className="font-bold">{review.title}</h4>
        </div>
        <div className="text-right text-xs text-gray-500">
          {review.verified && <div className="mb-1 rounded bg-green-100 px-1.5 py-0.5 text-green-800">Verified Owner</div>}
          <div>{new Date(review.date).toLocaleDateString()}</div>
        </div>
      </div>
      
      <p className={`mt-2 text-gray-700 ${isExpanded ? '' : 'line-clamp-2'}`}>
        {review.content}
      </p>
      
      {/* Expand/Collapse Button */}
      {review.content.length > 120 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-1 h-auto p-0 text-xs font-medium text-primary"
          onClick={onToggleExpanded}
        >
          {isExpanded ? (
            <div className="flex items-center">
              <span>Show less</span>
              <ChevronUp size={14} className="ml-1" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Show more</span>
              <ChevronDown size={14} className="ml-1" />
            </div>
          )}
        </Button>
      )}

      {/* Pros and Cons */}
      {(review.pros || review.cons) && (
        <div className="mt-3 grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
          {review.pros && review.pros.length > 0 && (
            <div>
              <div className="mb-1 text-xs font-semibold text-green-600">PROS</div>
              <ul className="text-xs text-gray-700">
                {review.pros.map((pro: string, idx: number) => (
                  <li key={idx} className="mb-1">• {pro}</li>
                ))}
              </ul>
            </div>
          )}
          
          {review.cons && review.cons.length > 0 && (
            <div>
              <div className="mb-1 text-xs font-semibold text-red-600">CONS</div>
              <ul className="text-xs text-gray-700">
                {review.cons.map((con: string, idx: number) => (
                  <li key={idx} className="mb-1">• {con}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500">
        By {review.user}
      </div>
    </div>
  );
};

const OwnerReviews: React.FC<OwnerReviewsProps> = ({ vehicle, limit }) => {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<string[]>([]);
  
  // Filter and limit reviews
  const reviews = vehicle.reviews.filter((review: any) => {
    if (filter === 'all') return true;
    if (filter === 'positive' && review.rating >= 4) return true;
    if (filter === 'critical' && review.rating < 4) return true;
    return false;
  }).slice(0, limit || vehicle.reviews.length);
  
  // Calculate rating distribution
  const distribution = vehicle.ratings.user.distribution;
  const totalReviews = distribution.reduce((a: number, b: number) => a + b, 0);
  
  const toggleExpanded = (id: string) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter(item => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };
  
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Owner Reviews</CardTitle>
        <div className="flex items-center">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={16} 
                className={star <= vehicle.ratings.user.average ? 'fill-amber-500 text-amber-500' : 'text-gray-300'} 
              />
            ))}
          </div>
          <span className="ml-2 font-bold">{vehicle.ratings.user.average}/5</span>
          <span className="ml-1 text-sm text-gray-500">({vehicle.ratings.user.count})</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Rating Distribution */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium">Rating Distribution</h3>
          <div className="space-y-2">
            {distribution.slice().reverse().map((count: number, idx: number) => {
              const stars = 5 - idx;
              const percentage = Math.round((count / totalReviews) * 100);
              
              return (
                <div key={stars} className="flex items-center">
                  <div className="w-12 text-sm">{stars} {stars === 1 ? 'star' : 'stars'}</div>
                  <div className="mx-2 flex-1">
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <div className="w-10 text-right text-xs text-gray-500">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Review Filters */}
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
          </TabsList>
          
          <TabsContent value={filter} className="mt-0">
            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review: any) => {
                const isExpanded = expanded.includes(review.id);
                
                return (
                  <ReviewWithBookmark 
                    key={review.id} 
                    review={review} 
                    isExpanded={isExpanded}
                    onToggleExpanded={() => toggleExpanded(review.id)}
                  />
                );
              })}
            </div>
            
            {!limit && reviews.length === 0 && (
              <div className="my-8 text-center text-gray-500">
                No reviews match the selected filter.
              </div>
            )}
            
            {limit && vehicle.ratings.user.count > limit && (
              <div className="mt-4 text-center">
                <Button variant="outline">
                  Show all {vehicle.ratings.user.count} reviews
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OwnerReviews;
