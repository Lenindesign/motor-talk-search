import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import PaymentCalculator from './PaymentCalculator';
import { CarData } from '@/components/CarCard/types';

interface PricingModuleProps {
  car: CarData;
  selectedTrimPrice?: string;
  destinationFee?: number;
}

const PricingModule: React.FC<PricingModuleProps> = ({ 
  car, 
  selectedTrimPrice,
  destinationFee = 1395
}) => {
  const [showAllPricing, setShowAllPricing] = useState(false);
  const basePrice = parseFloat((selectedTrimPrice || car.price || '0').toString().replace(/[^\d.-]/g, ''));
  
  return (
    <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5 mb-6" id="pricing">
      <div className="space-y-6">
        <h2 className="text-base md:text-lg text-neutral-1 font-bold">Pricing & Payment Options</h2>

        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="pricing" className="text-xs">Pricing</TabsTrigger>
            <TabsTrigger value="incentives" className="text-xs">Incentives</TabsTrigger>
            <TabsTrigger value="calculator" className="text-xs">Payment Calculator</TabsTrigger>
          </TabsList>

          
          <TabsContent value="pricing">
            <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium">Base MSRP</h3>
                <p className="text-xs text-neutral-3">Starting price for base trim</p>
              </div>
              <span className="text-lg font-bold">${basePrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium">Destination Fee</h3>
                <p className="text-xs text-neutral-3">Standard shipping charge</p>
              </div>
              <span className="text-base font-medium">${destinationFee.toLocaleString()}</span>
            </div>
            
            {showAllPricing && (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">Options & Accessories</h3>
                    <p className="text-xs text-neutral-3">Added features and upgrades</p>
                  </div>
                  <span className="text-base font-medium">$3,500</span>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">Tax, Title & Registration</h3>
                    <p className="text-xs text-neutral-3">Estimated fees</p>
                  </div>
                  <span className="text-base font-medium">$4,200</span>
                </div>
                
                <div className="border-t border-neutral-6 pt-3 mt-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold">Estimated Total Price</h3>
                      <p className="text-xs text-neutral-3">Before incentives</p>
                    </div>
                    <span className="text-lg font-bold">${(basePrice + destinationFee + 3500 + 4200).toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}
            
            <Button 
              variant="ghost-black" 
              size="sm" 
              className="text-motortrend-red w-full flex items-center justify-center"
              onClick={() => setShowAllPricing(!showAllPricing)}
            >
              {showAllPricing ? 'Hide pricing details' : 'View all pricing details'}
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showAllPricing ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="incentives">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium">Federal EV Tax Credit</h3>
                <p className="text-xs text-neutral-3">For qualified buyers</p>
              </div>
              <span className="text-base font-medium text-green-600">-$7,500</span>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium">Manufacturer Rebate</h3>
                <p className="text-xs text-neutral-3">Limited time offer</p>
              </div>
              <span className="text-base font-medium text-green-600">-$2,000</span>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium">Loyalty Bonus</h3>
                <p className="text-xs text-neutral-3">For current owners</p>
              </div>
              <span className="text-base font-medium text-green-600">-$1,000</span>
            </div>
            
            <div className="border-t border-neutral-6 pt-3 mt-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold">Potential Savings</h3>
                  <p className="text-xs text-neutral-3">If you qualify for all incentives</p>
                </div>
                <span className="text-lg font-bold text-green-600">-$10,500</span>
              </div>
            </div>
            
            <Button variant="outline-black" size="sm" className="w-full">
              Check Your Eligibility
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="calculator">
          <PaymentCalculator car={car} selectedTrimPrice={selectedTrimPrice} />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default PricingModule;
