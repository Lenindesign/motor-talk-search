import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CarData } from '@/components/CarCard';

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
