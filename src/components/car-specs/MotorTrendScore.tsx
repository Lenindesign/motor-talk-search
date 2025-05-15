
import React from "react";

interface MotorTrendScoreProps {
  score?: number;
  rank?: number;
}

export const MotorTrendScore: React.FC<MotorTrendScoreProps> = ({ score, rank }) => {
  if (!score) return null;
  
  // Calculate color based on score (0-10 scale)
  let scoreColor = "bg-red-500";
  
  if (score >= 9) {
    scoreColor = "bg-green-600";
  } else if (score >= 7) {
    scoreColor = "bg-green-500";
  } else if (score >= 5) {
    scoreColor = "bg-amber-500";
  } else if (score >= 3) {
    scoreColor = "bg-orange-500";
  }
  
  return (
    <div className="absolute top-2 left-2 flex items-center gap-1">
      <div className={`text-white text-xs font-bold px-2 py-1 rounded ${scoreColor} flex items-center`}>
        <span className="mr-1">MT</span>
        {score.toFixed(1)}
      </div>
      {rank && (
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
          #{rank}
        </div>
      )}
    </div>
  );
};

export default MotorTrendScore;
