import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useCardSave } from '../../hooks/useCardSave';
import { CarData, CarCardProps } from '../CarCard/types';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface GarageCardNewProps extends CarCardProps {
  className?: string;
}

const GarageCardNew: React.FC<GarageCardNewProps> = ({
  car,
  type,
  className
}) => {
  const {
    isSaved,
    toggleSave
  } = useCardSave({
    id: car?.id || '',
    type: type === 'new' ? 'newCar' : 'usedCar',
    title: car?.title || '',
    imageUrl: car?.imageUrl || '/placeholder-vehicle.jpg',
    metadata: {
      price: car?.price || '',
      category: car?.category || '',
      year: car?.year || '',
      mileage: car?.mileage || '',
      fuelType: car?.fuelType || '',
      drivetrain: car?.drivetrain || '',
      location: car?.location || '',
      dealerName: car?.dealerName || '',
      dealerLocation: car?.dealerLocation || '',
      bodyStyle: car?.bodyStyle || '',
      isNew: car?.isNew || false,
      msrp: car?.msrp || '',
      mpg: car?.mpg || '',
      mpge: car?.mpge || '',
      range: car?.range || '',
      engine: car?.engine || '',
      horsepower: car?.horsepower || '',
      transmission: car?.transmission || '',
      motorTrendScore: car?.motorTrendScore || '',
      motorTrendRank: car?.motorTrendRank || '',
      motorTrendCategoryRank: car?.motorTrendCategoryRank || false,
      ownership: car?.metadata?.ownership || ''
    }
  });

  const linkPath = type === 'new' ? `/new-car/${car?.id || ''}` : `/used-car/${car?.id || ''}`;
  const mtScore = parseFloat(car?.motorTrendScore || '0');
  const scoreColor = mtScore >= 8.5 ? 'text-red-600' : 'text-gray-900';
  
  const getOwnershipStatus = () => {
    const ownership = car?.metadata?.ownership;
    if (ownership === 'owned') return 'Owned';
    if (ownership === 'testDriven') return 'Test Drive';
    if (ownership === 'interested') return 'Interested';
    return 'Add to Garage';
  };

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden", className)}>
      {/* Card Header - Image with Save Button */}
      <div className="relative">
        <Link to={linkPath}>
          <img 
            src={car?.imageUrl || '/placeholder-vehicle.jpg'} 
            alt={car?.title || 'Vehicle'} 
            className="w-full h-44 object-cover"
          />
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave();
          }}
          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md"
          aria-label={isSaved ? "Remove from saved" : "Save to garage"}
        >
          <Bookmark
            size={20}
            fill={isSaved ? "#000000" : "none"}
            stroke={isSaved ? "#000000" : "currentColor"}
            strokeWidth={2}
          />
        </button>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        {/* Car Title */}
        <Link to={linkPath} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{car?.title || 'Untitled Vehicle'}</h3>
        </Link>
        
        {/* MT Score and Rank */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className={cn("text-2xl font-bold", scoreColor)}>{car?.motorTrendScore || '0.0'}</span>
            <span className="text-sm text-gray-500 ml-1">MT Score</span>
          </div>
          
          {car?.motorTrendRank && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">
                Rank: {car?.motorTrendRank} in {car?.category || 'Car'}
              </span>
            </div>
          )}
        </div>
        
        {/* Car Specs Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
          {car?.msrp && (
            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 mr-1">MSRP:</span>
              <span className="text-sm text-gray-900">{car.msrp}</span>
            </div>
          )}
          
          {car?.mpg && (
            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 mr-1">MPG:</span>
              <span className="text-sm text-gray-900">{car.mpg}</span>
            </div>
          )}
          
          {car?.engine && (
            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 mr-1">Engine:</span>
              <span className="text-sm text-gray-900">{car.engine}</span>
            </div>
          )}
          
          {car?.horsepower && (
            <div className="flex items-start">
              <span className="text-sm font-medium text-gray-700 mr-1">Horsepower:</span>
              <span className="text-sm text-gray-900">{car.horsepower}</span>
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-1 py-2 border-gray-300 hover:bg-gray-50"
        >
          <span className="text-sm font-medium">{getOwnershipStatus()}</span>
          {getOwnershipStatus() === 'Add to Garage' && (
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GarageCardNew;
