
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { MessageSquare, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import UserReview, { UserReviewProps } from "./UserReview";

interface CarReviewsProps {
  carId: string;
  carName: string;
  reviews: UserReviewProps[];
}

const CarReviews: React.FC<CarReviewsProps> = ({ carId, carName, reviews }) => {
  const [sortOption, setSortOption] = useState<'recent' | 'helpful' | 'rating'>('recent');
  
  // Sort reviews based on current option
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption === 'helpful') {
      return b.helpfulCount - a.helpfulCount;
    } else {
      // rating
      return b.rating - a.rating;
    }
  });
  
  // Calculate average rating
  const averageRating = reviews.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-base flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              User Reviews for {carName}
            </CardTitle>
            <CardDescription>
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} • Average Rating: {averageRating.toFixed(1)}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption('recent')}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('helpful')}>
                Most Helpful
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('rating')}>
                Highest Rating
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {sortedReviews.length > 0 ? (
          sortedReviews.map(review => (
            <UserReview key={review.id} {...review} />
          ))
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-10 w-10 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No reviews yet for this vehicle</p>
            <Button variant="outline" className="mt-4">
              Write a Review
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarReviews;
