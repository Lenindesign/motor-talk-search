
import React from 'react';

interface NavigationProgressBarProps {
  readingProgress: number;
}

const NavigationProgressBar: React.FC<NavigationProgressBarProps> = ({
  readingProgress
}) => {
  return (
    <div className="h-1 bg-gray-100">
      <div 
        className="h-full bg-motortrend-red transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default NavigationProgressBar;
