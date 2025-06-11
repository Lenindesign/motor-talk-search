import React from 'react';
import { Car } from '../../types/car';

interface Props {
  car: Car;
}

const reviews = [
  {
    author: "John D.",
    rating: 4.5,
    date: "2024-05-15",
    title: "Great daily driver",
    content: "I've had this car for 6 months now and it's been fantastic. The fuel economy is great and it's very comfortable for long trips.",
    pros: ["Comfortable ride", "Good fuel economy", "Quality interior"],
    cons: ["Some road noise", "Basic sound system"]
  },
  {
    author: "Sarah M.",
    rating: 5,
    date: "2024-04-28",
    title: "Exceeded expectations",
    content: "This car has everything I need and more. The technology features are intuitive and the safety features give me peace of mind.",
    pros: ["Advanced safety features", "User-friendly tech", "Smooth transmission"],
    cons: ["Price on higher end"]
  }
];

const ReviewsTab: React.FC<Props> = ({ car }) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-motortrend-red'
                : star - 0.5 <= rating
                ? 'text-motortrend-red/50'
                : 'text-gray-600'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {reviews.map((review, index) => (
        <div 
          key={index}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold mb-2">{review.title}</h4>
              <div className="flex items-center space-x-4">
                <div className="text-gray-400">{review.author}</div>
                <div className="text-gray-400">{new Date(review.date).toLocaleDateString()}</div>
              </div>
            </div>
            {renderStars(review.rating)}
          </div>

          <p className="text-gray-400 leading-relaxed">{review.content}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-green-500 font-medium mb-2">Pros</h5>
              <ul className="space-y-1">
                {review.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-gray-400">
                    <span className="text-green-500">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-red-500 font-medium mb-2">Cons</h5>
              <ul className="space-y-1">
                {review.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-gray-400">
                    <span className="text-red-500">-</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTab;
