import React from 'react';
import { Car } from '../../types/car';
import { Star } from 'lucide-react';

interface ExpertRatingsProps {
  car: Car;
}

const ExpertRatings: React.FC<ExpertRatingsProps> = ({ car }) => {
  const ratings = {
    performance: 4.5,
    comfort: 4.2,
    interior: 4.3,
    technology: 4.4,
    value: 4.1,
    overall: 4.3
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i <= rating ? 'text-red-500 fill-current' : 'text-gray-500'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Expert Ratings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(ratings).map(([category, rating]) => (
          <div key={category} className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold capitalize mb-2">{category}</h3>
            <div className="flex items-center gap-1 mb-2">
              {renderStars(rating)}
            </div>
            <p className="text-gray-400">{rating} out of 5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertRatings;
