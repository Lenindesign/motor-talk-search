import React, { useState } from 'react';
import { MapPin, Calendar, Gauge, Fuel, Settings, DollarSign, Zap, Battery, Car, Cpu, Cog, Award, Medal, Calculator } from 'lucide-react';
import { CarData } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PaymentCalculator } from '../PaymentCalculator/PaymentCalculator';

interface CarSpecsProps {
  car: CarData;
  type: 'new' | 'used';
}

const calculateEstimatedPayment = (price: number) => {
  const loanTerm = 60; // 60 months
  const apr = 0.05; // 5% APR
  const downPayment = price * 0.1; // 10% down payment
  const loanAmount = price - downPayment;
  const monthlyRate = apr / 12;
  const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
  return Math.round(payment);
};

const CarSpecs: React.FC<CarSpecsProps> = ({ car, type }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Display different specs based on car type
  // Prioritize the type prop over the isNew property
  const isNewCar = type === 'new';
  
  return (
    <div className="mt-3 space-y-4">
      {/* Basic specs that appear only for used cars */}
      {!isNewCar && (
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {car.price && (
            <>
              <div className="flex items-center">
                <DollarSign size={14} className="mr-1 text-motortrend-dark" />
                <span className="font-medium">Price:</span>
                <span className="ml-1">{car.price}</span>
              </div>
              <Dialog 
                open={isPaymentModalOpen} 
                onOpenChange={(open) => {
                  setIsPaymentModalOpen(open);
                  if (!open) {
                    // Prevent any navigation when modal closes
                    setTimeout(() => {
                      // Small delay to ensure modal close completes
                    }, 0);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <div 
                    className="flex items-center cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsPaymentModalOpen(true);
                    }}
                  >
                    <DollarSign size={14} className="mr-1 text-motortrend-red" />
                    <span className="font-medium">Est. Payment:</span>
                    <span className="ml-1">
                      ${calculateEstimatedPayment(parseInt(car.price.replace(/[^0-9]/g, '')))}/mo
                    </span>
                    <Calculator size={12} className="ml-1 text-motortrend-red" />
                  </div>
                </DialogTrigger>
                <DialogContent 
                  className="max-w-2xl"
                  onPointerDownOutside={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onInteractOutside={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <div 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle>Payment Calculator</DialogTitle>
                    </DialogHeader>
                    <PaymentCalculator car={{
                      id: car.id,
                      title: car.title,
                      msrp: car.price || '$0',
                      imageUrl: car.imageUrl
                    }} />
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
          {/* Year removed since it's already in the headline */}
          {car.mileage && (
            <div className="flex items-center">
              <Gauge size={14} className="mr-1 text-motortrend-dark" />
              <span>{car.mileage}</span>
            </div>
          )}
          {car.fuelType && (
            <div className="flex items-center">
              <Fuel size={14} className="mr-1 text-motortrend-dark" />
              <span>{car.fuelType}</span>
            </div>
          )}
          {car.dealerName && (
            <div className="flex items-center font-medium">
              <MapPin size={14} className="mr-1 text-motortrend-red" />
              <span>Dealer: {car.dealerName}</span>
            </div>
          )}
          {!car.dealerName && car.location && (
            <div className="flex items-center font-medium">
              <MapPin size={14} className="mr-1 text-motortrend-red" />
              <span>Dealer: {car.location}</span>
            </div>
          )}
        </div>
      )}
      
      {/* MotorTrend score and owner score for new cars */}
      {isNewCar && car.motorTrendScore && (
        <div className="flex flex-col space-y-2 mb-2">
          <div className="flex items-center gap-2">
            {/* MT Score */}
            <div className="flex items-center bg-neutral-100 rounded px-2 py-1">
              <span className="text-motortrend-red font-bold mr-1">{car.motorTrendScore}</span>
              <span className="text-sm font-medium">MT Score</span>
            </div>
            
            {/* Owner Score */}
            {car.userReviewsScore && (
              <div className="flex items-center bg-neutral-100 rounded px-2 py-1">
                <span className="text-motortrend-red font-bold mr-1">
                  {(() => {
                    const score = parseFloat(car.userReviewsScore);
                    // If score is > 5, it's already on 10-point scale, otherwise convert from 5-point to 10-point
                    return score > 5 ? score.toFixed(1) : (score * 2).toFixed(1);
                  })()}
                </span>
                <span className="text-sm font-medium">Owner</span>
              </div>
            )}
          </div>
          {car.motorTrendRank && (
            <div className="flex items-center text-sm">
              <Medal size={14} className="mr-1 text-motortrend-dark" />
              <span className="font-medium">Rank:</span>
              <span className="ml-1 font-bold">{car.motorTrendRank}{car.motorTrendCategoryRank ? ` in ${car.category}` : ''}</span>
            </div>
          )}
        </div>
      )}
      
      {/* Additional specs for new cars - show only 3 most relevant specs based on body style */}
      {isNewCar && (
        <div className="grid grid-cols-1 gap-y-2 text-sm border-t border-gray-100 pt-3">
          {/* Always show MSRP as the first spec for all cars */}
          {car.msrp && (
            <div className="flex items-center">
              <DollarSign size={14} className="mr-1 text-motortrend-dark" />
              <span className="font-medium">MSRP:</span>
              <span className="ml-1">{car.msrp}</span>
            </div>
          )}

          {/* Show estimated monthly payment for new cars */}
          {car.msrp && (
            <Dialog 
              open={isPaymentModalOpen} 
              onOpenChange={(open) => {
                setIsPaymentModalOpen(open);
                if (!open) {
                  // Prevent any navigation when modal closes
                  setTimeout(() => {
                    // Small delay to ensure modal close completes
                  }, 0);
                }
              }}
            >
              <DialogTrigger asChild>
                <div 
                  className="flex items-center cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsPaymentModalOpen(true);
                  }}
                >
                  <DollarSign size={14} className="mr-1 text-motortrend-red" />
                  <span className="font-medium">Est. Payment:</span>
                  <span className="ml-1">
                    ${calculateEstimatedPayment(parseInt(car.msrp.replace(/[^0-9]/g, '')))}
                    /mo
                  </span>
                  <Calculator size={12} className="ml-1 text-motortrend-red" />
                </div>
              </DialogTrigger>
              <DialogContent 
                className="max-w-2xl"
                onPointerDownOutside={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onInteractOutside={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Payment Calculator</DialogTitle>
                  </DialogHeader>
                  <PaymentCalculator car={{
                    id: car.id,
                    title: car.title,
                    msrp: car.msrp || '$0',
                    imageUrl: car.imageUrl
                  }} />
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          {/* For electric cars, show range and MPGe */}
          {car.fuelType === 'Electric' && car.range && (
            <div className="flex items-center">
              <Battery size={14} className="mr-1 text-motortrend-dark" />
              <span className="font-medium">Range:</span>
              <span className="ml-1">{car.range}</span>
            </div>
          )}
          {car.fuelType === 'Electric' && car.mpge && (
            <div className="flex items-center">
              <Zap size={14} className="mr-1 text-motortrend-dark" />
              <span className="font-medium">MPGe:</span>
              <span className="ml-1">{car.mpge}</span>
            </div>
          )}
          
          {/* For gas/hybrid cars, show MPG and engine */}
          {car.fuelType !== 'Electric' && car.mpg && (
            <div className="flex items-center">
              <Fuel size={14} className="mr-1 text-motortrend-dark" />
              <span className="font-medium">MPG:</span>
              <span className="ml-1">{car.mpg}</span>
            </div>
          )}
          {car.fuelType !== 'Electric' && car.engine && (
            <div className="flex items-center">
              <Car size={14} className="mr-1 text-motortrend-dark" />
              <span className="font-medium">Engine:</span>
              <span className="ml-1">{car.engine}</span>
            </div>
          )}
          
          {/* For sports cars and performance vehicles, show horsepower */}
          {(car.category === 'Sports Car' || car.category === 'Luxury' || car.horsepower?.includes('hp')) && car.horsepower && (
            <div className="flex items-center">
              <Cpu size={14} className="mr-1 text-motortrend-dark" />
              <span className="font-medium">Horsepower:</span>
              <span className="ml-1">{car.horsepower}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarSpecs;
