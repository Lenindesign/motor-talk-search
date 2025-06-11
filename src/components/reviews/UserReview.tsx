import React from "react";
import { Star, ThumbsUp, MessageSquare, User, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCardSave } from "../../hooks/useCardSave";

export interface UserReviewProps {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpfulCount: number;
  carId: string;
  carMake: string;
  carModel: string;
  carYear: string;
}

const UserReview: React.FC<UserReviewProps> = ({ 
  id,
  userName, 
  userAvatar, 
  rating, 
  title, 
  content, 
  date, 
  helpfulCount,
  carId,
  carMake,
  carModel,
  carYear
}) => {
  // Initialize bookmark functionality
  const { isSaved, toggleSave } = useCardSave({
    id: id,
    type: 'review',
    title: title,
    imageUrl: userAvatar || '',
    metadata: {
      userName: userName,
      rating: rating.toString(),
      date: date,
      helpfulCount: helpfulCount.toString(),
      carId: carId,
      carMake: carMake,
      carModel: carModel,
      carYear: carYear,
      content: content.substring(0, 100) + '...'
    }
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        // Full star
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />);
      } else if (i < rating && rating % 1 >= 0.5) {
        // Half star - using full star with reduced opacity as simple alternative
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500 opacity-50" />);
      } else {
        // Empty star
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="bg-motortrend-dark text-white text-xs">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="typography-caption-bold">{userName}</p>
              <p className="typography-caption2 text-neutral-4">{formatDate(date)}</p>
            </div>
          </div>
          <div className="flex">{renderStars(rating)}</div>
        </div>
        
        <h4 className="typography-body-bold mt-3">{title}</h4>
        <p className="typography-body mt-2 text-neutral-3">{content}</p>
        
        <div className="flex justify-between items-center mt-4 pt-2 border-t typography-caption text-neutral-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-motortrend-red">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>Helpful ({helpfulCount})</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-motortrend-red">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>Reply</span>
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              toggleSave();
            }}
            className={`flex items-center gap-1 transition-colors ${
              isSaved ? 'text-motortrend-red' : 'text-gray-500 hover:text-motortrend-red'
            }`}
            aria-label={isSaved ? "Remove from saved reviews" : "Save review"}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserReview;
