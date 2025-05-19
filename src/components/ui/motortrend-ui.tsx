
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";

interface MotorScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const MotorScore: React.FC<MotorScoreProps> = ({ 
  score, 
  size = "md", 
  className 
}) => {
  const getScoreColor = (value: number) => {
    if (value >= 8.5) return "bg-green-600 text-white";
    if (value >= 7.5) return "bg-green-500 text-white";
    if (value >= 6.5) return "bg-amber-500 text-white";
    if (value >= 5) return "bg-amber-400 text-white";
    return "bg-red-500 text-white";
  };
  
  const getSizeClasses = () => {
    switch(size) {
      case "sm": return "h-8 w-8 text-sm";
      case "lg": return "h-14 w-14 text-xl";
      default: return "h-10 w-10 text-base";
    }
  };
  
  const scoreDisplay = typeof score === 'number' ? score.toFixed(1) : 'N/A';
  
  return (
    <div 
      className={cn(
        "rounded-md flex items-center justify-center font-bold", 
        getScoreColor(+score),
        getSizeClasses(),
        className
      )}
    >
      {scoreDisplay}
    </div>
  );
};

interface FeatureBadgeProps {
  children: React.ReactNode;
  variant?: "positive" | "neutral" | "negative";
  className?: string;
}

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({
  children,
  variant = "neutral",
  className
}) => {
  const getVariantClasses = () => {
    switch(variant) {
      case "positive": return "bg-green-50 text-green-700 border-green-200";
      case "negative": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        getVariantClasses(),
        className
      )}
    >
      {children}
    </span>
  );
};

interface MotorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  imageUrl: string;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  aspectRatio?: "video" | "square" | "auto";
}

export const MotorCard: React.FC<MotorCardProps> = ({
  title,
  subtitle,
  imageUrl,
  badge,
  footer,
  aspectRatio = "auto",
  className,
  ...props
}) => {
  const getAspectRatioClass = () => {
    switch(aspectRatio) {
      case "video": return "aspect-video";
      case "square": return "aspect-square";
      default: return "";
    }
  };
  
  return (
    <Card 
      className={cn("overflow-hidden border-0 shadow-sm group hover:shadow-md transition-shadow duration-200", className)}
      {...props}
    >
      <div className="relative">
        <div className={cn("overflow-hidden bg-gray-100", getAspectRatioClass())}>
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
        {badge && (
          <div className="absolute top-2 left-2">
            {badge}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-800 line-clamp-2 mb-1">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        {footer && (
          <div className="mt-3 pt-3 border-t">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
