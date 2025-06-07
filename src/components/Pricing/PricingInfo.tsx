import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface PricingInfoProps {
  car: {
    id: string;
    title: string;
    price: string;
    msrp: string;
    destinationFee: number;
  };
}

export const PricingInfo = ({ car }: PricingInfoProps) => {
  return (
    <Card className="p-4 md:p-5 mb-6">
      <h2 className="typography-subtitle md:typography-title text-neutral-1 mb-4">Pricing</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-neutral-2">MSRP</span>
          <span className="typography-body-bold">{car.msrp}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-2">Destination Fee</span>
          <span className="typography-body-bold">${car.destinationFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center typography-body-bold">
          <span>Total Price</span>
          <span>{car.price}</span>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          View Price Details <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </Card>
  );
};
