import React from 'react';
import { Car } from '../../types/car';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReviewsTabProps {
  car: Car;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ car }) => {
  const reviews = [
    {
      author: 'John D.',
      rating: 5,
      title: 'Best car in its class',
      content: 'After driving this car for 6 months, I can confidently say it exceeds all expectations. The fuel economy is excellent, and the interior quality is top-notch.',
      date: '2024-01-15',
      helpful: 45,
      notHelpful: 3
    },
    {
      author: 'Sarah M.',
      rating: 4,
      title: 'Great value for money',
      content: 'Very satisfied with my purchase. The only minor complaint is some road noise at highway speeds, but overall an excellent vehicle.',
      date: '2024-01-10',
      helpful: 32,
      notHelpful: 5
    },
    {
      author: 'Mike R.',
      rating: 5,
      title: 'Impressive technology',
      content: 'The tech features in this car are amazing. The infotainment system is intuitive, and the driver assistance features work flawlessly.',
      date: '2024-01-05',
      helpful: 28,
      notHelpful: 2
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-red-500 fill-current' : 'text-gray-500'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div 
            key={index}
            className="bg-gray-700 rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{review.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-gray-400">by {review.author}</span>
                </div>
              </div>
              <span className="text-gray-400">{review.date}</span>
            </div>
            <p className="text-gray-200">{review.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{review.helpful}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="w-4 h-4" />
                <span>{review.notHelpful}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
