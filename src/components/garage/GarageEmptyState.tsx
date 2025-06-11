import React from 'react';
import { Car, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface GarageEmptyStateProps {
  onAddVehicle: () => void;
  searchQuery?: string;
}

export const GarageEmptyState: React.FC<GarageEmptyStateProps> = ({ onAddVehicle, searchQuery }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        {searchQuery ? (
          <Search className="h-12 w-12 text-gray-400" />
        ) : (
          <Car className="h-12 w-12 text-gray-400" />
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {searchQuery 
          ? 'No matching vehicles found' 
          : 'Your garage is empty'}
      </h3>
      
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        {searchQuery
          ? `We couldn't find any vehicles matching "${searchQuery}". Try adjusting your search or browse our recommendations.`
          : 'Save vehicles you own, have test driven, or are interested in to keep track of them all in one place.'}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={onAddVehicle}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add a Vehicle
        </Button>
        
        {searchQuery ? (
          <Button 
            variant="outline"
            onClick={() => navigate('/inventory')}
          >
            Browse Inventory
          </Button>
        ) : (
          <Button 
            variant="outline"
            onClick={() => navigate('/research')}
          >
            Research Vehicles
          </Button>
        )}
      </div>
      

    </div>
  );
};
