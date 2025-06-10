import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputWithAffix } from '@/components/ui/input-with-affix';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator } from 'lucide-react';

interface PaymentCalculatorProps {
  car: {
    id: string;
    title: string;
    msrp: string;
    imageUrl?: string;
  };
}

export const PaymentCalculator = ({ car }: PaymentCalculatorProps) => {
  const [calculationType, setCalculationType] = useState<'finance' | 'lease'>('finance');
  const [downPayment, setDownPayment] = useState('7600');
  const [tradeIn, setTradeIn] = useState('0');
  const [dealerDiscount, setDealerDiscount] = useState('0');
  const [term, setTerm] = useState('60');
  const [rate, setRate] = useState('5.0');
  const [residualValue, setResidualValue] = useState('60'); // Percentage
  const [mileageAllowance, setMileageAllowance] = useState('12000');
  const [acquisitionFee, setAcquisitionFee] = useState('895');

  // Clean and parse numeric inputs
  const cleanNumber = (str: string) => {
    const cleaned = str.replace(/[^0-9.]/g, '');
    return cleaned ? parseFloat(cleaned) : 0;
  };

  const msrpValue = cleanNumber(car.msrp);
  const downPaymentValue = cleanNumber(downPayment);
  const tradeInValue = cleanNumber(tradeIn);
  const dealerDiscountValue = cleanNumber(dealerDiscount);
  const rateValue = cleanNumber(rate);
  const termMonths = parseInt(term);

  // Calculate finance amount
  const financeAmount = msrpValue - downPaymentValue - tradeInValue - dealerDiscountValue;

  // Calculate monthly payment
  let monthlyPayment = 0;
  if (calculationType === 'finance') {
    if (financeAmount > 0 && rateValue > 0 && termMonths > 0) {
      const monthlyRate = rateValue / 100 / 12;
      monthlyPayment = (
        financeAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
        (Math.pow(1 + monthlyRate, termMonths) - 1)
      );
    } else if (financeAmount > 0 && termMonths > 0) {
      // Handle 0% APR case
      monthlyPayment = financeAmount / termMonths;
    }
  } else {
    // Lease payment calculation
    const residualAmount = msrpValue * (cleanNumber(residualValue) / 100);
    const capitalizedCost = msrpValue - cleanNumber(downPayment) + cleanNumber(acquisitionFee);
    const depreciationFee = (capitalizedCost - residualAmount) / termMonths;
    const moneyFactor = rateValue / 2400; // Convert APR to money factor
    const financeFee = (capitalizedCost + residualAmount) * moneyFactor;
    monthlyPayment = depreciationFee + financeFee;
  }

  return (
    <Card className="p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5" />
        <h2 className="text-lg md:text-xl text-neutral-1 font-bold">Payment Calculator</h2>
      </div>

      <div className="flex items-center gap-3 p-3 bg-neutral-8 rounded-lg mb-4">
        <div className="w-20 h-15 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={car.imageUrl || 'https://via.placeholder.com/80x60?text=Car'} 
            alt={car.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <h3 className="typography-title">{car.title}</h3>
          <p className="text-sm text-neutral-2">MSRP: {car.msrp}</p>
        </div>
      </div>

      <Tabs value={calculationType} onValueChange={(value) => setCalculationType(value as 'finance' | 'lease')} className="w-full mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="lease">Lease</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {calculationType === 'finance' ? (
          <>
            <div>
              <label className="text-sm text-neutral-2 mb-1 block">Down Payment</label>
              <InputWithAffix 
                type="text"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                prefix="$"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-2 mb-1 block">Trade-in Value</label>
              <InputWithAffix 
                type="text"
                value={tradeIn}
                onChange={(e) => setTradeIn(e.target.value)}
                prefix="$"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-2 mb-1 block">Dealer Discount</label>
              <InputWithAffix 
                type="text"
                value={dealerDiscount}
                onChange={(e) => setDealerDiscount(e.target.value)}
                prefix="$"
              />
            </div>

            <div className="bg-neutral-8 p-3 rounded-lg">
              <p className="text-sm mb-1">Estimated Finance Amount</p>
              <p className="text-lg font-semibold">
                ${Math.max(0, financeAmount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-neutral-3">Includes Available Offers and Rebates (if any)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-2 mb-1 block">Term</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-neutral-6"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <option value="36">36 Months</option>
                  <option value="48">48 Months</option>
                  <option value="60">60 Months</option>
                  <option value="72">72 Months</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-neutral-2 mb-1 block">Interest Rate (APR)</label>
                <InputWithAffix 
                  type="text"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  suffix="%"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-sm text-neutral-2 mb-1 block">Down Payment</label>
              <InputWithAffix 
                type="text"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                prefix="$"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-2 mb-1 block">Term</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-neutral-6"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                  <option value="48">48 Months</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-neutral-2 mb-1 block">Money Factor</label>
                <InputWithAffix 
                  type="text"
                  value={(parseFloat(rate) / 2400).toFixed(4)}
                  onChange={(e) => setRate((parseFloat(e.target.value) * 2400).toString())}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-2 mb-1 block">Residual Value</label>
                <InputWithAffix 
                  type="text"
                  value={residualValue}
                  onChange={(e) => setResidualValue(e.target.value)}
                  suffix="%"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-2 mb-1 block">Annual Mileage</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-neutral-6"
                  value={mileageAllowance}
                  onChange={(e) => setMileageAllowance(e.target.value)}
                >
                  <option value="10000">10,000 miles</option>
                  <option value="12000">12,000 miles</option>
                  <option value="15000">15,000 miles</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-neutral-2 mb-1 block">Acquisition Fee</label>
              <InputWithAffix 
                type="text"
                value={acquisitionFee}
                onChange={(e) => setAcquisitionFee(e.target.value)}
                prefix="$"
              />
            </div>

            <div className="bg-neutral-8 p-3 rounded-lg">
              <p className="text-sm mb-1">Estimated Capitalized Cost</p>
              <p className="text-lg font-semibold">
                ${Math.max(0, msrpValue - cleanNumber(downPayment) + cleanNumber(acquisitionFee)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-neutral-3">Vehicle price + fees - down payment</p>
            </div>
          </>
        )}


        <div>
          <p className="text-sm mb-1">Estimated Monthly Payment*</p>
          <p className="text-2xl font-semibold">
            ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-neutral-3">
            *{calculationType === 'lease' 
              ? `${mileageAllowance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} miles/year. Excludes tax, title, license, and fees.`
              : 'Excludes taxes, title, registration, and other fees.'}
          </p>
        </div>

        <Button className="w-full">Get Pre-Approved</Button>
      </div>
    </Card>
  );
};
