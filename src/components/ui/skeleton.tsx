import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the skeleton
   * @default "rectangular"
   */
  variant?: "text" | "circular" | "rectangular";
  
  /**
   * The width of the skeleton
   */
  width?: string | number;
  
  /**
   * The height of the skeleton
   */
  height?: string | number;
}

/**
 * Skeleton component for displaying loading states
 * 
 * @example
 * ```tsx
 * <Skeleton className="w-[100px] h-[20px]" />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="text" width="75%" />
 * ```
 */
function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted", 
        {
          "rounded-full": variant === "circular",
          "rounded-md": variant === "rectangular",
          "h-4 w-2/3 rounded-md": variant === "text",
        },
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      {...props}
    />
  )
}

export { Skeleton }
