
import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface CarScore {
  overall: number;
  performance: number;
  fuelEfficiency: number;
  safety: number;
  value: number;
  reliability: number;
  comfort: number;
  rankInClass?: number;
  totalInClass?: number;
  editorNote?: string;
}

interface CarScoreCardProps {
  score: CarScore;
  className?: string;
}

const CarScoreCard: React.FC<CarScoreCardProps> = ({ score, className }) => {
  // Render stars based on score (0-10)
  const renderStars = (value: number) => {
    const fullStars = Math.floor(value / 2);
    const hasHalfStar = value % 2 >= 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="text-motortrend-red fill-motortrend-red" />
        ))}
        {hasHalfStar && <StarHalf size={16} className="text-motortrend-red" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} size={16} className="text-gray-300" />
        ))}
        <span className="ml-2 text-sm font-medium">{value.toFixed(1)}/10</span>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>MotorTrend Score</span>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-motortrend-red">{score.overall.toFixed(1)}</span>
            <span className="text-sm text-gray-500">/10</span>
          </div>
        </CardTitle>
        {score.rankInClass && score.totalInClass && (
          <p className="text-sm font-medium text-gray-600">
            Ranked #{score.rankInClass} out of {score.totalInClass} in its class
          </p>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Performance</TableCell>
              <TableCell>{renderStars(score.performance)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fuel Efficiency</TableCell>
              <TableCell>{renderStars(score.fuelEfficiency)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Safety</TableCell>
              <TableCell>{renderStars(score.safety)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Value</TableCell>
              <TableCell>{renderStars(score.value)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reliability</TableCell>
              <TableCell>{renderStars(score.reliability)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Comfort</TableCell>
              <TableCell>{renderStars(score.comfort)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        {score.editorNote && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-1">Editor's Note</h4>
            <p className="text-sm text-gray-700 italic">{score.editorNote}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarScoreCard;
