
import React from "react";
import { Star, ThumbsUp, MessageSquare, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

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
  userName, 
  userAvatar, 
  rating, 
  title, 
  content, 
  date, 
  helpfulCount 
}) => {
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
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{formatDate(date)}</p>
            </div>
          </div>
          <div className="flex">{renderStars(rating)}</div>
        </div>
        
        <h4 className="font-medium mt-3">{title}</h4>
        <p className="text-sm mt-2 text-gray-700">{content}</p>
        
        <div className="flex justify-between items-center mt-4 pt-2 border-t text-sm text-gray-500">
          <button className="flex items-center hover:text-motortrend-red">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>Helpful ({helpfulCount})</span>
          </button>
          <button className="flex items-center hover:text-motortrend-red">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>Reply</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserReview;
