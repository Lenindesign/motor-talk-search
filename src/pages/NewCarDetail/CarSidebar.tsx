import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Heart, Car } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const savedItem = getSavedItemById(car.id);
  const currentOwnership = savedItem?.metadata?.ownership as 'owned' | 'testDriven' | 'interested' | undefined;

  // Handle click outside to close dropdown
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
    <div className="bg-white shadow-modern border-modern rounded-xl p-4 space-y-4">
      {/* Vehicle Title */}
      <div className="space-y-1">
        <h1 className="typography-title text-neutral-1">{car.title}</h1>
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-200"></div>
      
      {/* Vehicle Selection */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-no-repeat bg-[position:right_12px_center] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]">
            <option>2025 - New</option>
          </select>
        </div>
        <div>
          <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-no-repeat bg-[position:right_12px_center] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]">
            <option>Electric</option>
          </select>
        </div>
      </div>
        
      {/* Trim Selector */}
      <div>
        <select className="w-full border rounded-lg pl-3 pr-12 py-2 text-sm appearance-none bg-no-repeat bg-[position:right_12px_center] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M3.5%205.25L7%208.75L10.5%205.25%22%20stroke%3D%22%23374151%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]">
          <option>Dual-Motor - $78,000 MSRP</option>
          <option>Performance Dual-Motor - $89,000 MSRP</option>
          <option>Max Pack Dual-Motor - $93,000 MSRP</option>
          <option>Performance Max Pack - $99,000 MSRP</option>
        </select>
      </div>
        
      {/* Price Divider */}
      <div className="h-px bg-neutral-200"></div>
      
      {/* Suggested Price */}
      <div className="space-y-1">
        <div className="typography-body-small text-neutral-3">MotorTrend suggests you pay</div>
        <div className="typography-title">{car.price}</div>
        <a 
          href="#payment-calculator" 
          className="flex items-baseline gap-1.5 hover:opacity-80 transition-opacity cursor-pointer group"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('payment-calculator');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <Calculator className="h-4 w-4 text-neutral-1 mr-1 self-center group-hover:text-motortrend-red transition-colors" />
          <span className="typography-subtitle text-motortrend-dark">$1,290.79</span>
          <span className="typography-body-small text-neutral-3">/mo*</span>
        </a>
        <div className="typography-caption text-neutral-3">*Est. payment with $7,600 down for 60 months</div>
      </div>
      
      {/* Find Price Button */}
      <Button 
        className="w-full" 
        onClick={() => navigate(`/find-best-price/${car.title.toLowerCase().replace(/ /g, '-')}-${carData.year}`)}
      >
        Find Best Price
      </Button>

      {/* Add to Garage Button */}
      <div className="relative" ref={dropdownRef}>
        {!currentOwnership ? (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setShowOwnershipOptions(!showOwnershipOptions)}
          >
            {getGarageButtonIcon()}
            {getGarageButtonText()}
          </Button>
        ) : (
          <Button 
            variant={currentOwnership === 'owned' ? 'solid-light' : 'outline'} 
            className={cn(
              "w-full",
              currentOwnership === 'owned' && "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
              currentOwnership === 'testDriven' && "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
              currentOwnership === 'interested' && "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            )}
            onClick={() => setShowOwnershipOptions(!showOwnershipOptions)}
          >
            {getGarageButtonIcon()}
            {getGarageButtonText()}
          </Button>
        )}
        
        {/* Ownership Options Dropdown */}
        {showOwnershipOptions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10">
            <div className="p-2 space-y-1">
              <button
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-green-50 hover:text-green-700 flex items-center"
                onClick={() => handleAddToGarage('owned')}
              >
                <Car size={14} className="mr-2" />
                I Own This Car
              </button>
              <button
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-50 hover:text-blue-700 flex items-center"
                onClick={() => handleAddToGarage('testDriven')}
              >
                <Car size={14} className="mr-2" />
                I've Test Driven
              </button>
              <button
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-amber-50 hover:text-amber-700 flex items-center"
                onClick={() => handleAddToGarage('interested')}
              >
                <Heart size={14} className="mr-2" />
                I'm Interested
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Additional Info */}
      <div className="typography-caption space-y-1 text-neutral-3">
        <p>12 for sale near you</p>
        <p>Prices based on sales in CA thru 5/19/25</p>
        <p>Final assembly in Normal, Illinois</p>
      </div>
    </div>
  );
};

export default CarSidebar;
