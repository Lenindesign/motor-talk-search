import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaymentOptionsProps {
  car: {
    id: string;
    title: string;
    price: string;
  };
}

export const PaymentOptions = ({ car }: PaymentOptionsProps) => {
  return (
    <Card className="p-4 md:p-5 mb-6">
      <h2 className="typography-subtitle md:typography-title text-neutral-1 mb-4">Payment Options</h2>
      <Tabs defaultValue="finance" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="lease" disabled>Lease (Coming Soon)</TabsTrigger>
        </TabsList>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-neutral-2">Starting at</span>
            <span className="typography-body-bold">$1,291/mo</span>
          </div>
          <div className="typography-caption text-neutral-3">
            *Estimated payment based on $7,600 down for 60 months at 5.0% APR
          </div>
        </div>
      </Tabs>
    </Card>
  );
};
