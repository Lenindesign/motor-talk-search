import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Landmark, Percent, CalendarDays } from 'lucide-react';
import { CarData } from '@/components/CarCard/types';

interface PaymentCalculatorProps {
  car: CarData;
  selectedTrimPrice?: string;
}

const PaymentCalculator: React.FC<PaymentCalculatorProps> = ({ car, selectedTrimPrice }) => {
  const [activeTab, setActiveTab] = useState<'finance' | 'lease'>('finance');
  
  // Finance State
  const [vehiclePrice, setVehiclePrice] = useState<number>(
    parseFloat((selectedTrimPrice || car.price || '0').toString().replace(/[^\d.-]/g, ''))
  );
  const [downPayment, setDownPayment] = useState<string>((vehiclePrice * 0.1).toFixed(0)); // Default 10% down
  const [tradeInValue, setTradeInValue] = useState<string>('0');
  const [dealerDiscount, setDealerDiscount] = useState<string>('0');
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<string>('5.0'); // APR as percentage

  const parseCurrencyInput = (value: string): number => {
    if (!value) return 0;
    const numericString = String(value).replace(/[^\d.-]/g, '');
    const num = parseFloat(numericString);
    return isNaN(num) ? 0 : num;
  };

  const estimatedFinanceAmount = useMemo(() => {
    return Math.max(0, vehiclePrice - parseCurrencyInput(downPayment) - parseCurrencyInput(tradeInValue) - parseCurrencyInput(dealerDiscount));
  }, [vehiclePrice, downPayment, tradeInValue, dealerDiscount]);

  const monthlyPayment = useMemo(() => {
    if (estimatedFinanceAmount <= 0) return 0;
    const rate = parseFloat(interestRate);
    if (isNaN(rate) || rate < 0) return null; // Invalid interest rate

    const monthlyInterestRate = (rate / 100) / 12;
    if (monthlyInterestRate === 0) { // Simple division for 0% APR
        return loanTermMonths > 0 ? estimatedFinanceAmount / loanTermMonths : 0;
    }
    
    const payment = estimatedFinanceAmount * 
                    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
                    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
    return payment > 0 ? payment : 0;
  }, [estimatedFinanceAmount, loanTermMonths, interestRate]);

  const loanTerms = [24, 36, 48, 60, 72, 84];

  return (
    <Card className="overflow-hidden shadow-modern border-modern">
      <CardContent className="p-4 space-y-6">
        <div className="flex items-center text-lg font-semibold">
          <Landmark className="mr-2 h-5 w-5 text-primary" />
          Payment Calculator
        </div>
        <div className="p-3 border rounded-md bg-muted/20">
          <div className="flex items-center space-x-3">
            {car.imageUrl ? (
              <img src={car.imageUrl} alt={car.title} className="w-16 h-16 object-cover rounded" />
            ) : (
              <div className="w-16 h-16 bg-muted flex items-center justify-center rounded">
                <div className="h-10 w-10 bg-neutral-5 rounded-full" />
              </div>
            )}
            <div>
              <h4 className="font-semibold text-sm">{car.title}</h4>
              <p className="text-xs text-muted-foreground">
                MSRP: ${vehiclePrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'finance' | 'lease')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="lease" disabled>Lease (Coming Soon)</TabsTrigger>
          </TabsList>
          <TabsContent value="finance" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-3 items-end">
              <div>
                <Label htmlFor="down-payment">Down Payment</Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                  <Input id="down-payment" type="text" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="pl-6 h-9 text-sm" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Buy for</p>
                <p className="text-xl font-bold">${monthlyPayment !== null ? monthlyPayment.toFixed(0) : '---'}</p>
                <p className="text-xs text-muted-foreground">per month for {loanTermMonths} months</p>
              </div>
            </div>

            <div>
              <Label htmlFor="trade-in" className="text-sm">Trade-in Value</Label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                <Input id="trade-in" type="text" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} className="pl-6 h-9 text-sm"/>
              </div>
            </div>
            <div>
              <Label htmlFor="dealer-discount" className="text-sm">Dealer Discount</Label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                <Input id="dealer-discount" type="text" value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} className="pl-6 h-9 text-sm"/>
              </div>
            </div>
            
            <div className="p-3 border rounded-md bg-muted/20">
              <p className="text-sm font-medium">Estimated Finance Amount</p>
              <p className="text-lg font-bold">${estimatedFinanceAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Includes Available Offers and Rebates (if any)</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="loan-term" className="text-sm">Term</Label>
                <Select value={String(loanTermMonths)} onValueChange={(val) => setLoanTermMonths(Number(val))}>
                  <SelectTrigger id="loan-term" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTerms.map(term => (
                      <SelectItem key={term} value={String(term)}>{term} Months</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="interest-rate" className="text-sm">Interest Rate (APR)</Label>
                <div className="relative">
                  <Input id="interest-rate" type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="pr-7 h-9 text-sm"/>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-sm font-medium">Estimated Monthly Payment*</p>
              <p className="text-xl font-bold text-primary">${monthlyPayment !== null ? monthlyPayment.toFixed(2) : '---'}</p>
              <Button size="sm" className="text-xs w-full bg-motortrend-red hover:bg-motortrend-red/90 text-white mt-2">Get Pre-Approved</Button>
              <p className="text-xs text-muted-foreground mt-1">*Excludes taxes, title, registration, and other fees.</p>
            </div>
          </TabsContent>
          <TabsContent value="lease">
            <p className="text-sm text-muted-foreground py-4">Lease payment calculations coming soon!</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentCalculator;
