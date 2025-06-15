import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Gauge, DollarSign, Fuel, Battery, Award, Star, Users, ArrowRight } from 'lucide-react';

interface BuyersGuideCardProps {
  make: string;
  model: string;
  year: string;
  score: number;
  ranking: string;
  price: string;
  mpg?: string;
  range?: string;
  ownerRating?: number; // out of 5 (will be converted to 0-10 scale for display)
  ownerCount?: number;
}

export function BuyersGuideCard({
  make,
  model,
  year,
  score,
  ranking,
  price,
  mpg,
  range,
  ownerRating = 4.5,
  ownerCount = 128
}: BuyersGuideCardProps): JSX.Element {
  const isElectric = Boolean(range);
  const carId = `${make.toLowerCase()}-${model.toLowerCase()}`;
  // Convert owner rating from 0-5 scale to 0-10 scale for consistency
  const ownerRatingConverted = ownerRating * 2;

  return (
    <Card variant="newCar" className="overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">{year} {make} {model}</h3>
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4 text-motortrend-red" />
            <span className="typography-caption text-neutral-3">{ranking}</span>
          </div>
        </div>

        {/* MotorTrend Score - styled like owner review */}
        <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
          <div>
            <div className="flex items-center space-x-1 mb-1">
              <Award className="w-4 h-4 fill-current text-motortrend-red" />
              <span className="typography-body-large">{score}</span>
              <span className="typography-caption text-neutral-3">/ 10</span>
            </div>
            <div className="flex items-center typography-small text-neutral-3">
              <span>MotorTrend Score</span>
            </div>
          </div>
          <Progress value={score * 10} className="flex-1 h-1.5" />
        </div>

        {/* Owner Rating */}
        <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
          <div>
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 fill-current text-warning" />
              <span className="typography-body-large">{ownerRatingConverted.toFixed(1)}</span>
              <span className="typography-caption text-neutral-3">/ 10</span>
            </div>
            <div className="flex items-center typography-small text-neutral-3">
              <Users className="w-3 h-3 mr-1" />
              {ownerCount} owner reviews
            </div>
          </div>
          <Progress value={ownerRatingConverted * 10} className="flex-1 h-1.5" />
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="typography-caption text-neutral-3">Starting Price</div>
            <div className="typography-body-large">{price}</div>
          </div>
          <div className="space-y-1">
            <div className="typography-caption text-neutral-3">{isElectric ? 'Range' : 'MPG'}</div>
            <div className="typography-body-large flex items-center">
              {isElectric ? (
                <>
                  <Battery className="w-4 h-4 mr-1" />
                  {range}
                </>
              ) : (
                <>
                  <Fuel className="w-4 h-4 mr-1" />
                  {mpg}
                </>
              )}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 pt-2">
          <Button asChild className="flex-1 bg-motortrend-red hover:bg-motortrend-red/90">
            <Link to={`/find-best-price/${carId}`} className="flex items-center justify-center">
              Find Best Price
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/new-car/${carId}`} className="flex items-center justify-center">
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
