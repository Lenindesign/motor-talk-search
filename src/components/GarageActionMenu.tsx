import React, { useState } from 'react';
import { Heart, Calendar, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { useToast } from "@/hooks/use-toast";
import { CarData } from "./CarCard";

interface GarageActionMenuProps {
  car: CarData;
  type: 'new' | 'used';
  className?: string;
}

const GarageActionMenu: React.FC<GarageActionMenuProps> = ({ car, type, className = "" }) => {
  const [open, setOpen] = useState(false);
  const { addSavedItem, isSaved, getSavedItemById, updateSavedItem } = useSavedItems();
  const { toast } = useToast();

  const savedItem = getSavedItemById(car.id);
  const currentOwnership = savedItem?.metadata?.ownership;

  const handleAddToGarage = (ownership: 'owned' | 'testDriven' | 'interested') => {
    const itemType = type === 'new' ? 'newCar' : 'usedCar';
    
    if (savedItem) {
      // Update existing item
      updateSavedItem(car.id, {
        metadata: {
          ...savedItem.metadata,
          ownership: ownership,
          lastUpdated: new Date().toISOString()
        }
      });
      
      toast({
        title: "Updated in garage",
        description: `${car.title} moved to ${ownership === 'testDriven' ? 'Test Drive' : ownership} collection.`
      });
    } else {
      // Add new item
      addSavedItem({
        id: car.id,
        title: car.title,
        type: itemType,
        imageUrl: car.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          price: car.price,
          category: car.category,
          year: car.year || new Date().getFullYear().toString(),
          ownership: ownership,
          bodyStyle: car.bodyStyle,
          mileage: car.mileage,
          fuelType: car.fuelType,
          drivetrain: car.drivetrain,
          location: car.location
        }
      });
      
      toast({
        title: "Added to garage",
        description: `${car.title} added to your ${ownership === 'testDriven' ? 'Test Drive' : ownership} collection.`
      });
    }
    
    setOpen(false);
  };

  const handleScheduleTestDrive = () => {
    toast({
      title: "Scheduling Test Drive",
      description: "Connecting you with local dealers for a test drive appointment.",
    });
    setOpen(false);
  };

  const handleContactDealer = () => {
    toast({
      title: "Contacting Dealer",
      description: "Opening dealer contact information.",
    });
    setOpen(false);
  };

  const getButtonText = () => {
    if (currentOwnership === 'owned') return 'Owned';
    if (currentOwnership === 'testDriven') return 'Test Drive';
    if (currentOwnership === 'interested') return 'Interested';
    return 'Add to Garage';
  };

  const getButtonVariant = () => {
    if (currentOwnership) return 'default';
    return 'outline';
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant={getButtonVariant()} 
          size="lg" 
          className={`gap-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${className}`}
        >
          <Heart size={18} fill={currentOwnership ? 'currentColor' : 'none'} />
          <span className="hidden sm:inline">{getButtonText()}</span>
          <ChevronDown size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <Card>
          <CardContent className="p-3 space-y-2">
            <div className="font-medium text-sm text-gray-900 mb-2">
              Add to Garage
            </div>
            
            <div className="space-y-1">
              <Button
                variant={currentOwnership === 'owned' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => handleAddToGarage('owned')}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Owned
                {currentOwnership === 'owned' && <Badge variant="secondary" className="ml-auto text-xs">Current</Badge>}
              </Button>
              
              <Button
                variant={currentOwnership === 'testDriven' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => handleAddToGarage('testDriven')}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Test Drive
                {currentOwnership === 'testDriven' && <Badge variant="secondary" className="ml-auto text-xs">Current</Badge>}
              </Button>
              
              <Button
                variant={currentOwnership === 'interested' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => handleAddToGarage('interested')}
              >
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                Interested
                {currentOwnership === 'interested' && <Badge variant="secondary" className="ml-auto text-xs">Current</Badge>}
              </Button>
            </div>

            {currentOwnership === 'testDriven' && (
              <>
                <div className="border-t pt-2 mt-2">
                  <div className="font-medium text-sm text-gray-900 mb-2">
                    Test Drive Actions
                  </div>
                  <div className="space-y-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start gap-2"
                      onClick={handleScheduleTestDrive}
                    >
                      <Calendar size={14} />
                      Schedule Appointment
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start gap-2"
                      onClick={handleContactDealer}
                    >
                      <Phone size={14} />
                      Contact Dealer
                    </Button>
                  </div>
                </div>
              </>
            )}

            {(currentOwnership === 'interested' || !currentOwnership) && type === 'new' && (
              <div className="border-t pt-2 mt-2">
                <div className="space-y-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={handleScheduleTestDrive}
                  >
                    <Calendar size={14} />
                    Schedule Test Drive
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={handleContactDealer}
                  >
                    <MapPin size={14} />
                    Find Local Dealers
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default GarageActionMenu;
