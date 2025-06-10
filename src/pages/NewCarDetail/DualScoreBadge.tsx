import React from 'react';
import { Award, Users } from 'lucide-react';

interface DualScoreBadgeProps {
  expertRating: number;   // out of 10
  ownerRating: number;    // out of 5 (will be converted to 0-10 scale for display)
  rank?: {
    position: number;
    total: number;
  };
}

const DualScoreBadge: React.FC<DualScoreBadgeProps> = ({
  expertRating,
  ownerRating,
  rank
}) => {
  // Format ratings as text with one decimal place
  const formattedExpertRating = expertRating.toFixed(1);
  // Convert owner rating from 0-5 scale to 0-10 scale for consistency
  const ownerRatingConverted = ownerRating * 2;
  const formattedOwnerRating = ownerRatingConverted.toFixed(1);

  return (
    <div className="absolute top-4 right-4 z-10">
      {/* Container */}
      <div className="bg-black/60 backdrop-blur-md rounded-lg overflow-hidden shadow-lg border border-white/15 flex flex-col w-[90px]">
        {/* Expert Score */}
        <div className="p-2 border-b border-white/10 flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <Award size={11} className="text-white/70" />
            <span className="text-[9px] uppercase tracking-wider text-white/70 font-medium">MT Score</span>
          </div>
          <div className="flex items-baseline justify-center mb-1">
            <span className="text-lg font-bold text-white leading-none">{formattedExpertRating}</span>
            <span className="text-[9px] text-white/60 ml-0.5">/10</span>
          </div>
          {/* MT Score Stars */}
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star, index) => {
              const expertRatingOutOf5 = expertRating / 2; // Convert 10-point scale to 5-point scale
              return (
                <svg 
                  key={index} 
                  width="9" 
                  height="9" 
                  viewBox="0 0 24 24" 
                  fill={index < Math.floor(expertRatingOutOf5) ? "currentColor" : (index < Math.ceil(expertRatingOutOf5) && index >= Math.floor(expertRatingOutOf5)) ? "url(#halfStarExpert)" : "none"} 
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  className="text-white"
                  style={{ margin: '0 -0.5px' }}
                >
                  <defs>
                    <linearGradient id="halfStarExpert" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                      <stop offset="50%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              );
            })}
          </div>
        </div>
        
        {/* Owner Score */}
        <div className="p-2 flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <Users size={11} className="text-white/70" />
            <span className="text-[9px] uppercase tracking-wider text-white/70 font-medium">Owners</span>
          </div>
          <div className="flex items-baseline justify-center mb-1">
            <span className="text-lg font-bold text-white leading-none">{formattedOwnerRating}</span>
            <span className="text-[9px] text-white/60 ml-0.5">/10</span>
          </div>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <svg 
                key={index} 
                width="9" 
                height="9" 
                viewBox="0 0 24 24" 
                fill={index < Math.floor(ownerRating) ? "currentColor" : (index < Math.ceil(ownerRating) && index >= Math.floor(ownerRating)) ? "url(#halfStarOwner)" : "none"} 
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.3"
                className="text-white"
                style={{ margin: '0 -0.5px' }}
              >
                <defs>
                  <linearGradient id="halfStarOwner" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                    <stop offset="50%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualScoreBadge; 