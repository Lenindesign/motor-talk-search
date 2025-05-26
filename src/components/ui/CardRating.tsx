import React from 'react';
import { Star } from 'lucide-react';

interface CardRatingProps {
  rating: number;
  className?: string;
}

export const CardRating: React.FC<CardRatingProps> = ({
  rating,
  className = ''
}) => {
  const renderStars = () => {
    const stars: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className={`flex items-center ${className}`}>
      {renderStars()}
      <span className="ml-1 text-sm text-gray-500">{rating}/5</span>
    </div>
  );
};

export default CardRating;
