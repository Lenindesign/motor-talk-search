import React from 'react';
import { Award, Users } from 'lucide-react';

interface DualScoreBadgeProps {
  expertRating: number;   // out of 10
  ownerRating: number;    // out of 5
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
  // Calculate color based on expert rating
  const getExpertRatingColor = (rating: number) => {
    if (rating >= 8.5) return 'bg-green-600';
    if (rating >= 7.5) return 'bg-green-500';
    if (rating >= 6.5) return 'bg-amber-500';
    if (rating >= 5.5) return 'bg-amber-400';
    return 'bg-red-500';
  };

  // Calculate color based on owner rating
  const getOwnerRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-600';
    if (rating >= 3.5) return 'bg-green-500';
    if (rating >= 2.5) return 'bg-amber-500';
    if (rating >= 1.5) return 'bg-amber-400';
    return 'bg-red-500';
  };

  // Get the appropriate rating text
  const getExpertRatingText = (rating: number) => {
    if (rating >= 8.5) return 'Exceptional';
    if (rating >= 7.5) return 'Excellent';
    if (rating >= 6.5) return 'Very Good';
    if (rating >= 5.5) return 'Good';
    return 'Average';
  };

  // Calculate percentage for display
  const expertPercentage = Math.round(expertRating * 10);
  const ownerPercentage = Math.round(ownerRating * 20);

  const expertColor = getExpertRatingColor(expertRating);
  const ownerColor = getOwnerRatingColor(ownerRating);

  return (
    <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
      {/* Container */}
      <div className="bg-black/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/10">
        {/* Expert Score */}
        <div className="flex items-stretch">
          {/* Score Circle */}
          <div className={`${expertColor} w-[72px] h-[72px] flex items-center justify-center rounded-l-xl overflow-hidden relative`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="text-center relative z-10">
              <div className="text-3xl text-white font-bold leading-none">{expertPercentage}</div>
              <div className="text-xs text-white/80 leading-none">%</div>
            </div>
          </div>
          
          {/* Score Details */}
          <div className="p-3 flex flex-col justify-between">
            <div className="flex items-center">
              <Award size={14} className="text-motortrend-red mr-1.5" />
              <span className="text-xs uppercase tracking-wider text-white/70 font-medium">MT Score</span>
            </div>
            <div className="text-sm text-white font-medium mt-1">
              {getExpertRatingText(expertRating)}
            </div>
            {rank && (
              <div className="text-xs text-white/70 mt-1">
                Ranked #{rank.position} of {rank.total}
              </div>
            )}
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-white/10 mx-3"></div>
        
        {/* Owner Score */}
        <div className="flex items-stretch">
          {/* Score Circle */}
          <div className={`${ownerColor} w-[72px] h-[72px] flex items-center justify-center rounded-l-xl overflow-hidden relative`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="text-center relative z-10">
              <div className="text-3xl text-white font-bold leading-none">{ownerPercentage}</div>
              <div className="text-xs text-white/80 leading-none">%</div>
            </div>
          </div>
          
          {/* Score Details */}
          <div className="p-3 flex flex-col justify-between">
            <div className="flex items-center">
              <Users size={14} className="text-motortrend-red mr-1.5" />
              <span className="text-xs uppercase tracking-wider text-white/70 font-medium">Owner Score</span>
            </div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star} 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill={star <= Math.round(ownerRating) ? "currentColor" : "none"} 
                  stroke={star <= Math.round(ownerRating) ? "none" : "currentColor"}
                  strokeWidth="1.5"
                  className="text-yellow-400"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <div className="text-xs text-white/70 mt-1">
              Based on {Math.round(40 + Math.random() * 100)} reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualScoreBadge; 