
import React from "react";
import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  width?: number | string;
  height?: number | string;
  label?: string;
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  width = "100%",
  height = 250,
  label = "Advertisement",
  className
}) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-center border border-dashed border-gray-300 bg-gray-100 p-4",
        className
      )}
      style={{ width, height }}
    >
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
};

export default AdPlaceholder;
