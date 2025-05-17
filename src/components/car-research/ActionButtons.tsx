
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedItems } from '@/contexts/SavedItemsContext';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Heart, 
  Calendar, 
  Bookmark,
  ArrowRight,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface ActionButtonsProps {
  vehicle: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ vehicle }) => {
  const navigate = useNavigate();
  const { addSavedItem, removeSavedItem, isSaved, getSavedItemById } = useSavedItems();
  
  const isOwned = isSaved(vehicle.id) && getSavedItemById(vehicle.id)?.type === 'owned';
  const isWishlisted = isSaved(vehicle.id) && getSavedItemById(vehicle.id)?.type === 'interested';
  
  const handleAddToGarage = () => {
    if (isOwned) {
      removeSavedItem(vehicle.id);
      toast.success("Removed from your garage");
      return;
    }
    
    addSavedItem({
      id: vehicle.id,
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
      type: 'owned',
      imageUrl: vehicle.photos[0],
      savedAt: new Date().toISOString(),
      metadata: {
        price: `${vehicle.price.base}`,
        category: vehicle.type,
        year: `${vehicle.year}`,
        motorTrendScore: vehicle.motorTrendScore,
        motorTrendRank: vehicle.motorTrendRank,
        horsepowerTorque: `${vehicle.specs.horsepower} hp`,
        fuelType: vehicle.specs.fuel,
        drivetrain: vehicle.specs.drivetrains[0]
      }
    });
    
    toast.success("Added to your garage");
  };
  
  const handleAddToWishlist = () => {
    if (isWishlisted) {
      removeSavedItem(vehicle.id);
      toast.success("Removed from your wishlist");
      return;
    }
    
    addSavedItem({
      id: vehicle.id,
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
      type: 'interested',
      imageUrl: vehicle.photos[0],
      savedAt: new Date().toISOString(),
      metadata: {
        price: `${vehicle.price.base}`,
        category: vehicle.type,
        year: `${vehicle.year}`,
        motorTrendScore: vehicle.motorTrendScore,
        motorTrendRank: vehicle.motorTrendRank,
        horsepowerTorque: `${vehicle.specs.horsepower} hp`,
        fuelType: vehicle.specs.fuel,
        drivetrain: vehicle.specs.drivetrains[0]
      }
    });
    
    toast.success("Added to your wishlist");
  };
  
  const scheduleTestDrive = () => {
    toast.success("Test drive request submitted. A dealer will contact you shortly.");
  };
  
  const compareVehicles = () => {
    navigate('/garage', { state: { compare: true, vehicleId: vehicle.id } });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Actions</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={handleAddToGarage}
          variant={isOwned ? "default" : "outline"}
          className="flex items-center justify-center gap-2"
        >
          {isOwned ? <Check className="h-4 w-4" /> : <Car className="h-4 w-4" />}
          {isOwned ? 'In Garage' : 'Add to Garage'}
        </Button>
        
        <Button 
          onClick={handleAddToWishlist}
          variant={isWishlisted ? "default" : "outline"} 
          className="flex items-center justify-center gap-2"
        >
          {isWishlisted ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </Button>
        
        <Button 
          onClick={scheduleTestDrive}
          variant="outline" 
          className="flex items-center justify-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Schedule Test Drive
        </Button>
        
        <Button 
          onClick={compareVehicles}
          variant="outline" 
          className="flex items-center justify-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          Compare
        </Button>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="secondary"
          className="w-full"
          onClick={() => window.open(`https://www.${vehicle.make.toLowerCase()}.com`, '_blank')}
        >
          Visit {vehicle.make} Website
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
