import * as React from "react"

import { cn } from "@/lib/utils"

export interface UnifiedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'photo' | 'video' | 'newCar' | 'usedCar' | 'article';
  isSaved?: boolean;
  onToggleSave?: () => void;
  isLoading?: boolean;
  metadata?: Record<string, string>;
  imageUrl?: string;
  showSaveButton?: boolean;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, UnifiedCardProps>(
  ({
    variant = 'default',
    isSaved,
    onToggleSave,
    isLoading,
    metadata,
    imageUrl,
    showSaveButton,
    className,
    children,
    ...props
  }, ref) => {
    // Save button logic
    const renderSaveButton = () => {
      if (!onToggleSave && !showSaveButton) return null;
      return (
        <button
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            onToggleSave && onToggleSave();
          }}
          className={cn(
            "absolute z-20 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors",
            "top-3 left-3"
          )}
          aria-label={isSaved ? "Unsave item" : "Save item"}
        >
          <svg width="18" height="18" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
      );
    };

    // Loading state
    if (isLoading) {
      return (
        <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow-modern animate-pulse", className)} {...props}>
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "group rounded-xl border bg-card text-card-foreground shadow-modern relative",
          className
        )}
        {...props}
      >
        {renderSaveButton()}
        {imageUrl && (
          <div className="relative pt-[56.25%] overflow-hidden">
            <img src={imageUrl} alt="Card visual" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl" loading="lazy" />
          </div>
        )}
        {children}

      </div>
    );
  }
);
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 lg:p-8", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "typography-title text-neutral-1 font-semibold leading-tight tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("typography-body text-neutral-4", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 lg:p-8 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 lg:p-8 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
