
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedItems } from '@/contexts/SavedItemsContext';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/types/vehicle';
import { 
  Car, 
  Heart, 
  Calendar, 
  DollarSign,
  PanelsTopLeft,
  MessageSquare,
  RotateCw,
  ArrowRight,
  Check,
  BadgeDollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ActionButtonsProps {
  vehicle: Vehicle;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ vehicle }) => {
  const navigate = useNavigate();
  const { addSavedItem, removeSavedItem, isSaved, getSavedItemById } = useSavedItems();
  
  const [dealerQuoteOpen, setDealerQuoteOpen] = useState(false);
  const [financingOpen, setFinancingOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  
  const isOwned = isSaved(vehicle.id, 'owned');
  const isWishlisted = isSaved(vehicle.id, 'interested');
  
  const handleAddToGarage = () => {
    if (isOwned) {
      removeSavedItem(vehicle.id, 'owned');
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
      removeSavedItem(vehicle.id, 'interested');
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

  // Add the missing handler functions
  const handleDealerQuote = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Price quotes requested for ${vehicle.make} ${vehicle.model}. Dealers in ${zipCode} will contact you soon.`);
    setDealerQuoteOpen(false);
  };

  const handleFinancingCheck = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Financing options for ${vehicle.make} ${vehicle.model} will be sent to ${email}.`);
    setFinancingOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Premium Badge */}
      <div className="rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 p-4 shadow-md border border-amber-300">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="bg-amber-500 text-white border-amber-600">PRO</Badge>
            <h3 className="mt-2 typography-subtitle">MotorTrend+ Premium</h3>
            <p className="typography-caption text-neutral-3">Unlock expert reviews, price history, and unlimited comparisons</p>
          </div>
          <Button className="whitespace-nowrap" variant="default">
            Try Free
          </Button>
        </div>
      </div>
      
      {/* Main Actions */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 typography-subtitle">Actions</h2>
        
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
            <PanelsTopLeft className="h-4 w-4" />
            Compare
          </Button>
          
          <Button 
            onClick={() => setDealerQuoteOpen(true)}
            variant="default" 
            className="flex items-center justify-center gap-2 col-span-2 bg-green-600 hover:bg-green-700"
          >
            <DollarSign className="h-4 w-4" />
            Get Price Quotes from Dealers
          </Button>
          
          <Button 
            onClick={() => setFinancingOpen(true)}
            variant="outline" 
            className="flex items-center justify-center gap-2 col-span-2 border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <BadgeDollarSign className="h-4 w-4" />
            Check Financing Options
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
      
      {/* Dealer Quote Dialog */}
      <Dialog open={dealerQuoteOpen} onOpenChange={setDealerQuoteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Get Price Quotes from Local Dealers</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDealerQuote}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your@email.com" 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="(123) 456-7890" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input 
                  id="zip" 
                  type="text" 
                  value={zipCode} 
                  onChange={(e) => setZipCode(e.target.value)} 
                  placeholder="90210" 
                  required 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Request Quotes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Financing Dialog */}
      <Dialog open={financingOpen} onOpenChange={setFinancingOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Check Financing Options</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFinancingCheck}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="finance-email">Email</Label>
                <Input 
                  id="finance-email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your@email.com" 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="finance-zip">ZIP Code</Label>
                <Input 
                  id="finance-zip" 
                  type="text" 
                  value={zipCode} 
                  onChange={(e) => setZipCode(e.target.value)} 
                  placeholder="90210" 
                  required 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Check Rates</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
