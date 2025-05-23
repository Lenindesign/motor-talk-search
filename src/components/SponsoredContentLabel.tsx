
import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SponsoredContentLabelProps {
  className?: string;
  variant?: 'default' | 'subtle';
}

const SponsoredContentLabel: React.FC<SponsoredContentLabelProps> = ({
  className,
  variant = 'default'
}) => {
  return (
    <div className={cn(
      "flex items-center gap-1 rounded px-2 py-1 text-xs font-medium",
      variant === 'default' 
        ? "bg-gray-100 text-gray-600" 
        : "text-gray-500",
      className
    )}>
      <Info size={12} />
      <span>Sponsored Content</span>
    </div>
  );
};

export default SponsoredContentLabel;
