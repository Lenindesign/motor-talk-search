import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Package, DollarSign, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface FamilyReadinessScoreProps {
  safetyRating?: number;
  cargoCapacity?: string;
  passengerCapacity?: string;
  fuelEfficiency?: string;
  price?: string;
  familyFeatures?: string[];
}

const FamilyReadinessScore: React.FC<FamilyReadinessScoreProps> = ({
  safetyRating = 0,
  cargoCapacity,
  passengerCapacity,
  fuelEfficiency,
  price,
  familyFeatures = []
}) => {
  // Calculate scores for each category
  const safetyScore = (safetyRating / 5) * 100;
  
  const spaceScore = (() => {
    let score = 0;
    if (passengerCapacity && parseInt(passengerCapacity) >= 7) score += 50;
    else if (passengerCapacity && parseInt(passengerCapacity) >= 5) score += 30;
    
    if (cargoCapacity) {
      const cargo = parseFloat(cargoCapacity);
      if (cargo >= 30) score += 50;
      else if (cargo >= 20) score += 30;
      else if (cargo >= 15) score += 20;
    }
    return Math.min(score, 100);
  })();

  const valueScore = (() => {
    let score = 0;
    if (fuelEfficiency) {
      const mpg = parseInt(fuelEfficiency);
      if (mpg >= 30) score += 50;
      else if (mpg >= 25) score += 30;
      else if (mpg >= 20) score += 20;
    }
    // Price consideration would need market comparison
    score += 30; // Base score for having price info
    return Math.min(score, 100);
  })();

  const featuresScore = (familyFeatures.length / 5) * 100;

  const overallScore = Math.round((safetyScore + spaceScore + valueScore + featuresScore) / 4);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Family Readiness Score
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </div>
            <Badge variant="secondary" className="text-xs">
              {getScoreLabel(overallScore)}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Safety */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-neutral-4" />
              <span className="text-sm font-medium">Safety</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < safetyRating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-5'
                  }`}
                />
              ))}
            </div>
          </div>
          <Progress value={safetyScore} className="h-2" />
        </div>

        {/* Space & Comfort */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-neutral-4" />
              <span className="text-sm font-medium">Space & Comfort</span>
            </div>
            <span className="text-xs text-neutral-3">
              {passengerCapacity} passengers, {cargoCapacity} cu ft
            </span>
          </div>
          <Progress value={spaceScore} className="h-2" />
        </div>

        {/* Value */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-neutral-4" />
              <span className="text-sm font-medium">Value & Efficiency</span>
            </div>
            <span className="text-xs text-neutral-3">{fuelEfficiency} MPG</span>
          </div>
          <Progress value={valueScore} className="h-2" />
        </div>

        {/* Family Features */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-neutral-4" />
              <span className="text-sm font-medium">Family Features</span>
            </div>
            <span className="text-xs text-neutral-3">{familyFeatures.length} features</span>
          </div>
          <Progress value={featuresScore} className="h-2" />
        </div>

        {familyFeatures.length > 0 && (
          <div className="pt-2 border-t border-neutral-6">
            <div className="flex flex-wrap gap-1">
              {familyFeatures.slice(0, 4).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {familyFeatures.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{familyFeatures.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyReadinessScore; 