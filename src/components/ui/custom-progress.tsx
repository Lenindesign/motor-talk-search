import * as React from "react"
import { cn } from "@/lib/utils"

interface CustomProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  color: string;
}

const CustomProgress = React.forwardRef<
  HTMLDivElement,
  CustomProgressProps
>(({ className, value, color, ...props }, ref) => {
  // Ensure value is between 0 and 100
  const safeValue = Math.min(Math.max(value || 0, 0), 100);
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-black",
        className
      )}
      {...props}
    >
      <div
        className={`absolute left-0 top-0 h-full ${color} transition-all duration-200`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
});

CustomProgress.displayName = "CustomProgress";

export { CustomProgress };
