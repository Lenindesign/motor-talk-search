import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calculator } from 'lucide-react';

interface CarSpec {
  id: string;
  name: string;
  price: {
    msrp: number;
    monthlyPayment: number;
  };
  imageUrl: string;
}

interface PriceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: CarSpec | null;
}

const PriceCalculatorModal: React.FC<PriceCalculatorModalProps> = ({
  isOpen,
  onClose,
  car
}) => {
  const [downPayment, setDownPayment] = useState(7600);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [dealerDiscount, setDealerDiscount] = useState(0);
  const [term, setTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(5.0);

  if (!car) return null;

  // Calculate finance amount and monthly payment
  const msrp = car.price.msrp;
  const financeAmount = msrp - downPayment - tradeInValue - dealerDiscount;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = financeAmount > 0 
    ? (financeAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
      (Math.pow(1 + monthlyRate, term) - 1)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              <span className="font-semibold">Payment Calculator</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>

          {/* Vehicle Info */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-12 h-10 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{car.name}</h3>
                <p className="text-sm text-gray-600">MSRP: ${msrp.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Finance/Lease Tabs */}
          <Tabs defaultValue="finance" className="w-full">
            <TabsList className="grid grid-cols-2 mx-4 mt-4 max-w-xs">
              <TabsTrigger value="finance" className="text-sm px-3">Finance</TabsTrigger>
              <TabsTrigger value="lease" className="text-sm px-3">Lease</TabsTrigger>
            </TabsList>

            <TabsContent value="finance" className="p-4 space-y-4">
              {/* Down Payment */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Down Payment</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="pl-6 border-2 border-red-500 focus:border-red-600"
                  />
                </div>
              </div>

              {/* Trade-in Value */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Trade-in Value</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(Number(e.target.value))}
                    className="pl-6"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Dealer Discount */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Dealer Discount</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    value={dealerDiscount}
                    onChange={(e) => setDealerDiscount(Number(e.target.value))}
                    className="pl-6"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Estimated Finance Amount */}
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">Estimated Finance Amount</div>
                <div className="text-xl font-bold">${financeAmount.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Includes Available Offers and Rebates (if any)</div>
              </div>

              {/* Term and Interest Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Term</Label>
                  <select 
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value={36}>36 Months</option>
                    <option value={48}>48 Months</option>
                    <option value={60}>60 Months</option>
                    <option value={72}>72 Months</option>
                    <option value={84}>84 Months</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Interest Rate (APR)</Label>
                  <div className="relative mt-1">
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      step="0.1"
                      className="pr-6"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
              </div>

              {/* Monthly Payment Result */}
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600">Estimated Monthly Payment*</div>
                <div className="text-3xl font-bold">${Math.round(monthlyPayment).toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-1">*Excludes taxes, title, registration, and other fees.</div>
              </div>

              {/* Get Pre-Approved Button */}
              <Button className="w-full bg-black hover:bg-gray-800 text-white py-3">
                Get Pre-Approved
              </Button>
            </TabsContent>

            <TabsContent value="lease" className="p-4">
              <div className="text-center py-8 text-gray-500">
                <p>Lease calculator coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceCalculatorModal;