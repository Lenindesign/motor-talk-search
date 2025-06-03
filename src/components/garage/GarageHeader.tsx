
import React from 'react';

const GarageHeader: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-motortrend-dark mb-2 flex items-center justify-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor" className="text-motortrend-dark">
          <path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/>
        </svg>
        My Garage
      </h1>
      <p className="text-gray-600 text-lg">
        Manage your vehicles, compare specs, and discover new cars
      </p>
    </div>
  );
};

export default GarageHeader;
