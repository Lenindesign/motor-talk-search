import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface RatingProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
  color?: string;
}

const RatingProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  RatingProgressProps
>(({ className, value, ...props }, ref) => {
  // Ensure value is between 0 and 100
  const safeValue = Math.min(Math.max(value || 0, 0), 100);
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-black transition-all"
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

RatingProgress.displayName = "RatingProgress";

export { RatingProgress };
