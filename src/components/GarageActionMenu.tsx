
import React, { useState } from 'react';
import { Heart, Calendar, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { useToast } from "@/hooks/use-toast";
import { CarData } from "./CarCard";
import { useNavigate } from 'react-router-dom';

interface GarageActionMenuProps {
  car: CarData;
  type: 'new' | 'used';
  className?: string;
}

const GarageActionMenu: React.FC<GarageActionMenuProps> = ({
  car,
  type,
  className = ""
}) => {
  const [open, setOpen] = useState(false);
  const {
    addSavedItem,
    isSaved,
    getSavedItemById,
    updateSavedItem
  } = useSavedItems();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const savedItem = getSavedItemById(car.id);
  const currentOwnership = savedItem?.metadata?.ownership as 'owned' | 'testDriven' | 'interested' | undefined;

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
        description: `${car.title} moved to ${ownership === 'testDriven' ? 'Test Drive' : ownership} collection.`,
        action: <Button variant="outline" size="sm" onClick={() => navigate('/garage')}>My Garage</Button>,
        duration: 3000
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
        description: `${car.title} added to your ${ownership === 'testDriven' ? 'Test Drive' : ownership} collection.`,
        action: <Button variant="outline" size="sm" onClick={() => navigate('/garage')}>My Garage</Button>,
        duration: 3000
      });
    }
    setOpen(false);
  };

  const handleScheduleTestDrive = () => {
    toast({
      title: "Scheduling Test Drive",
      description: "Connecting you with local dealers for a test drive appointment.",
      duration: 3000
    });
    setOpen(false);
  };

  const handleContactDealer = () => {
    toast({
      title: "Contacting Dealer",
      description: "Opening dealer contact information.",
      duration: 3000
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
    if (currentOwnership) return 'solid-light';
    return 'outline-black';
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={getButtonVariant()}
          size="lg"
          className={`gap-1 ${className}`}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Heart size={18} fill={currentOwnership ? 'currentColor' : 'none'} />
          <span className="hidden sm:inline">{getButtonText()}</span>
          <ChevronDown size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <Card>
          <CardContent className="p-2 space-y-2 px-2 py-2">
            <div className="typography-caption-bold text-neutral-1 mb-2">Add to Garage</div>
            <div className="space-y-1">
              <Button
                variant={currentOwnership === 'owned' ? 'solid' : 'ghost-black'}
                size="sm"
                className={`w-full justify-start gap-2 text-neutral-1 hover:text-neutral-1 ${
                  currentOwnership === 'owned' ? 'bg-neutral-1 text-white hover:bg-neutral-1 hover:text-white' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  handleAddToGarage('owned');
                }}
              >
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Owned
              </Button>
              <Button
                variant={currentOwnership === 'testDriven' ? 'solid' : 'ghost-black'}
                size="sm"
                className={`w-full justify-start gap-2 text-neutral-1 hover:text-neutral-1 ${
                  currentOwnership === 'testDriven' ? 'bg-black text-white hover:bg-black hover:text-white' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  handleAddToGarage('testDriven');
                }}
              >
                <div className="w-2 h-2 bg-info rounded-full"></div>
                Test Drive
              </Button>
              <Button
                variant={currentOwnership === 'interested' ? 'solid' : 'ghost-black'}
                size="sm"
                className={`w-full justify-start gap-2 text-neutral-1 hover:text-neutral-1 ${
                  currentOwnership === 'interested' ? 'bg-black text-white hover:bg-black hover:text-white' : ''
                }`}
                onClick={e => {
                  e.stopPropagation();
                  handleAddToGarage('interested');
                }}
              >
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                Interested
              </Button>
            </div>
            {currentOwnership === 'testDriven' && (
              <div className="border-t border-neutral-6 pt-2 mt-2">
                <div className="typography-caption-bold text-neutral-1 mb-2">Test Drive Actions</div>
                <div className="space-y-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 text-neutral-1 hover:text-neutral-1"
                    onClick={e => {
                      e.stopPropagation();
                      handleScheduleTestDrive();
                    }}
                  >
                    <Calendar size={14} />
                    Book Appointment
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 text-neutral-1 hover:text-neutral-1"
                    onClick={e => {
                      e.stopPropagation();
                      handleContactDealer();
                    }}
                  >
                    <Phone size={14} />
                    Contact Dealer
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

export default GarageActionMenu;
