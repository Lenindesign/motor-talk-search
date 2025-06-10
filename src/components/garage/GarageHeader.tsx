
import React from 'react';

const GarageHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center gap-2 mb-4 bg-neutral-8 px-3 py-1.5 rounded-full shadow-sm border border-neutral-6">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor" className="text-primary">
          <path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/>
        </svg>
        <span className="typography-caption text-neutral-1">My Garage</span>
      </div>
      <h1 className="typography-display text-neutral-1 mb-4">
        Welcome to Your Garage
      </h1>
      <p className="typography-body-large text-neutral-4 max-w-2xl mx-auto">
        Manage your vehicles, compare specs, and discover new cars that match your interests
      </p>
    </div>
  );
};

export default GarageHeader;
