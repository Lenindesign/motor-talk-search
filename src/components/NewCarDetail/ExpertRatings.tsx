import React from 'react';
import { Car } from '../../types/car';

interface Props {
  car: Car;
}

const ratings = {
  performance: 8.5,
  comfort: 9.0,
  interior: 8.8,
  technology: 9.2,
  value: 8.7,
  overall: 8.8
};

const ExpertRatings: React.FC<Props> = ({ car }) => {
  const renderRatingBar = (rating: number) => {
    return (
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-motortrend-red transition-all duration-500 ease-out"
          style={{ width: `${rating * 10}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-motortrend-dark rounded-lg p-6 text-center border border-motortrend-red/20">
        <div className="text-4xl font-bold mb-2">{ratings.overall}</div>
        <div className="text-gray-400">Overall Rating</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Performance</span>
              <span className="font-medium">{ratings.performance}</span>
            </div>
            {renderRatingBar(ratings.performance)}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Comfort</span>
              <span className="font-medium">{ratings.comfort}</span>
            </div>
            {renderRatingBar(ratings.comfort)}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Interior</span>
              <span className="font-medium">{ratings.interior}</span>
            </div>
            {renderRatingBar(ratings.interior)}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Technology</span>
              <span className="font-medium">{ratings.technology}</span>
            </div>
            {renderRatingBar(ratings.technology)}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Value</span>
              <span className="font-medium">{ratings.value}</span>
            </div>
            {renderRatingBar(ratings.value)}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="font-bold mb-4">Expert Review Summary</h4>
        <p className="text-gray-400 leading-relaxed">
          The {car.year} {car.make} {car.model} impresses with its excellent technology features and comfortable ride. 
          The interior quality is top-notch, and performance is strong for its class. While the price point is slightly 
          higher than some competitors, the overall value proposition remains strong given the comprehensive feature set 
          and build quality.
        </p>
      </div>
    </div>
  );
};

export default ExpertRatings;
