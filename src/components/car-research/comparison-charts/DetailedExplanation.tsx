
import React from 'react';
import { useSavedItems } from '@/contexts/SavedItemsContext';

interface DetailedExplanationProps {
  vehicle: any;
}

const DetailedExplanation: React.FC<DetailedExplanationProps> = ({ vehicle }) => {
  const { savedItems } = useSavedItems();
  
  // Check if this vehicle is saved by the user
  const isSaved = savedItems.some(item => 
    (item.metadata?.make === vehicle.make && item.metadata?.model === vehicle.model) || 
    item.title.includes(`${vehicle.make} ${vehicle.model}`)
  );
  
  // Generate more personalized explanation based on vehicle data
  const getPerformanceDescription = () => {
    const performanceRating = vehicle.performanceScore || 7.5;
    if (performanceRating > 8.5) return "outstanding performance that exceeds class standards";
    if (performanceRating > 7.5) return "strong performance that meets class expectations";
    if (performanceRating > 6) return "adequate performance for daily driving";
    return "basic performance that may lag behind class leaders";
  };

  const getFeaturesDescription = () => {
    const featuresScore = vehicle.featuresScore || vehicle.technologyScore || 7.8;
    if (featuresScore > 8.5) return "cutting-edge technology features";
    if (featuresScore > 7.5) return "competitive technology package";
    if (featuresScore > 6) return "essential modern features";
    return "basic feature set";
  };

  return (
    <div className="mt-6 rounded-lg bg-gray-50 p-4">
      <h3 className="mb-2 text-sm font-semibold">How it Compares</h3>
      <p className="text-sm text-gray-700">
        The {vehicle.year} {vehicle.make} {vehicle.model} stands out in its class with 
        {vehicle.fuelEconomyScore > 7.5 ? ' superior' : ' average'} fuel economy and 
        {vehicle.safetyScore > 8 ? ' excellent' : ' good'} safety ratings. 
        It offers {getPerformanceDescription()} and {getFeaturesDescription()}.
        While priced {vehicle.valueScore > 7 ? 'competitively' : 'slightly higher'} than the class average, 
        it delivers {vehicle.valueScore > 8 ? 'exceptional' : 'solid'} value through its reliability and feature set.
        {isSaved ? ' This vehicle is currently in your garage.' : ''}
      </p>
    </div>
  );
};

export default DetailedExplanation;
