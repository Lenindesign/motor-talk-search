import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Heart, Car, ChevronDown, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CarData } from '@/components/CarCard';
import { useSavedItems } from '@/contexts/SavedItemsContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CarSidebarProps {
  car: {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    price: string;
  };
  carData: CarData;
}

const CarSidebar: React.FC<CarSidebarProps> = ({
  car,
  carData,
}) => {
  const navigate = useNavigate();
  const { addSavedItem, removeSavedItem, isSaved, getSavedItemById, updateSavedItem } = useSavedItems();
  const { toast } = useToast();
  const [showOwnershipOptions, setShowOwnershipOptions] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const savedItem = getSavedItemById(car.id);
  const currentOwnership = savedItem?.metadata?.ownership as 'owned' | 'testDriven' | 'interested' | undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOwnershipOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddToGarage = (ownership: 'owned' | 'testDriven' | 'interested') => {
    const itemType = 'newCar';
    
    if (savedItem) {
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
      addSavedItem({
        id: car.id,
        title: car.title,
        type: itemType,
        imageUrl: car.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          price: car.price,
          category: car.category,
          year: carData.year || new Date().getFullYear().toString(),
          ownership: ownership,
          bodyStyle: carData.bodyStyle,
          mileage: carData.mileage,
          fuelType: carData.fuelType,
          drivetrain: carData.drivetrain,
          location: carData.location
        }
      });
      toast({
        title: "Added to garage",
        description: `${car.title} added to your ${ownership === 'testDriven' ? 'Test Drive' : ownership} collection.`,
        action: <Button variant="outline" size="sm" onClick={() => navigate('/garage')}>My Garage</Button>,
        duration: 3000
      });
    }
    setShowOwnershipOptions(false);
  };

  const getGarageButtonText = () => {
    if (currentOwnership === 'owned') return 'Owned';
    if (currentOwnership === 'testDriven') return 'Test Drive';
    if (currentOwnership === 'interested') return 'Interested';
    return 'Add to Garage';
  };

  const getGarageButtonIcon = () => {
    if (currentOwnership === 'owned') return <Car size={16} className="mr-2" />;
    if (currentOwnership === 'testDriven') return <Car size={16} className="mr-2" />;
    if (currentOwnership === 'interested') return <Heart size={16} className="mr-2" />;
    return <Heart size={16} className="mr-2" />;
  };
  
  return (
    <div className="space-y-6">
      {/* Main Action Card */}
      <div className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Price Section */}
          <div className="text-center space-y-2">
            <div className="text-sm text-neutral-3">MotorTrend suggests you pay</div>
            <div className="typography-display text-neutral-1">{car.price}</div>
            <button 
              onClick={() => {
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center justify-center gap-2 w-full p-3 bg-neutral-8 rounded-xl hover:bg-neutral-7 transition-colors group"
            >
              <Calculator className="h-4 w-4 text-neutral-2 group-hover:text-motortrend-red transition-colors" />
              <div className="text-left">
                <div className="typography-subtitle text-neutral-1">$1,290.79</div>
                <div className="text-xs text-neutral-3">/mo with $7,600 down</div>
              </div>
            </button>
          </div>

          {/* Primary Actions */}
          <div className="space-y-3">
            <Button 
              className="w-full h-12 text-base font-medium" 
              onClick={() => navigate(`/find-best-price/${car.title.toLowerCase().replace(/ /g, '-')}-${carData.year}`)}
            >
              Find Best Price
            </Button>

            {/* Add to Garage Button */}
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant={currentOwnership ? "outline" : "outline"} 
                className={cn(
                  "w-full h-12 text-base font-medium",
                  currentOwnership === 'owned' && "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
                  currentOwnership === 'testDriven' && "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
                  currentOwnership === 'interested' && "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                )}
                onClick={() => setShowOwnershipOptions(!showOwnershipOptions)}
              >
                {getGarageButtonIcon()}
                {getGarageButtonText()}
                <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", showOwnershipOptions && "rotate-180")} />
              </Button>

              {/* Ownership Options Dropdown */}
              {showOwnershipOptions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-modern-lg border border-neutral-6 overflow-hidden z-50">
                  <button
                    onClick={() => handleAddToGarage('interested')}
                    className="w-full px-4 py-3 text-left hover:bg-amber-50 transition-colors flex items-center gap-3"
                  >
                    <Heart className="h-4 w-4 text-amber-600" />
                    <div>
                      <div className="font-medium text-neutral-1">Interested</div>
                      <div className="text-xs text-neutral-3">I'm considering this vehicle</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAddToGarage('testDriven')}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3"
                  >
                    <Car className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium text-neutral-1">Test Drive</div>
                      <div className="text-xs text-neutral-3">I've test driven this vehicle</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAddToGarage('owned')}
                    className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center gap-3"
                  >
                    <Car className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium text-neutral-1">Owned</div>
                      <div className="text-xs text-neutral-3">I own this vehicle</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Configuration Options */}
          <div className="space-y-3 pt-4 border-t border-neutral-6">
            <div className="text-sm font-medium text-neutral-1">Configuration</div>
            <select className="w-full h-10 px-3 border border-neutral-6 rounded-xl text-sm bg-white focus:ring-2 focus:ring-motortrend-red focus:border-transparent">
              <option>2025 Model Year</option>
            </select>
            <select className="w-full h-10 px-3 border border-neutral-6 rounded-xl text-sm bg-white focus:ring-2 focus:ring-motortrend-red focus:border-transparent">
              <option>Dual-Motor - $78,000 MSRP</option>
              <option>Performance Dual-Motor - $89,000 MSRP</option>
              <option>Max Pack Dual-Motor - $93,000 MSRP</option>
              <option>Performance Max Pack - $99,000 MSRP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
        <div className="p-6">
          <div className="text-sm font-medium text-neutral-1 mb-4">Quick Actions</div>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-8 transition-colors text-left">
              <MapPin className="h-4 w-4 text-neutral-3" />
              <span className="text-sm text-neutral-2">Find a Dealer</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-8 transition-colors text-left">
              <Phone className="h-4 w-4 text-neutral-3" />
              <span className="text-sm text-neutral-2">Schedule Test Drive</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-8 transition-colors text-left">
              <Mail className="h-4 w-4 text-neutral-3" />
              <span className="text-sm text-neutral-2">Get Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Options - Progressive Disclosure */}
      <div className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
        <button
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
          className="w-full p-4 flex items-center justify-between hover:bg-neutral-8 transition-colors"
        >
          <span className="text-sm font-medium text-neutral-1">Advanced Options</span>
          <ChevronDown className={cn("h-4 w-4 text-neutral-3 transition-transform", showAdvancedOptions && "rotate-180")} />
        </button>
        
        {showAdvancedOptions && (
          <div className="px-4 pb-4 space-y-2 border-t border-neutral-6">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-8 transition-colors text-left">
              <span className="text-sm text-neutral-2">Build & Price</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-8 transition-colors text-left">
              <span className="text-sm text-neutral-2">Compare Trims</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-8 transition-colors text-left">
              <span className="text-sm text-neutral-2">View Incentives</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarSidebar;
