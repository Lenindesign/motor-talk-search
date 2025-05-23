
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  viewAllUrl?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  viewAllUrl,
  className
}) => {
  return (
    <div className={cn(
      "mb-4 flex items-center justify-between border-b border-gray-200 pb-2",
      className
    )}>
      <h2 className="flex items-center gap-2 text-xl font-bold">
        {icon}
        {title}
      </h2>
      
      {viewAllUrl && (
        <a href={viewAllUrl} className="flex items-center gap-1 text-sm font-medium text-motortrend-red hover:underline">
          View All
          <ArrowRight size={14} />
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
