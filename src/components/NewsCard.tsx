
import React from "react";
import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  imageUrl: string;
  category: string;
  timestamp: string;
  author: string;
  url: string;
  hasVideo?: boolean;
}

interface NewsCardProps {
  item: NewsItem;
  variant?: "compact" | "standard";
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  item, 
  variant = "standard",
  className 
}) => {
  const isCompact = variant === "compact";

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md",
      isCompact ? "flex gap-3" : "flex flex-col",
      className
    )}>
      <div className={cn(
        "overflow-hidden",
        isCompact ? "h-20 w-20 flex-shrink-0" : "h-48"
      )}>
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {item.hasVideo && (
          <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5,3 19,12 5,21" fill="white" />
            </svg>
          </div>
        )}
      </div>

      <div className={cn(
        "flex flex-grow flex-col",
        isCompact ? "p-1" : "p-3"
      )}>
        <div className="mb-1 flex items-center gap-2">
          <Badge 
            className="bg-motortrend-red text-white text-xs px-1.5 py-0.5" 
            variant="secondary"
          >
            {item.category}
          </Badge>
          {!isCompact && (
            <>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={10} />
                <span>{item.timestamp}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <User size={10} />
                <span>{item.author}</span>
              </div>
            </>
          )}
        </div>
        
        <h3 className={cn(
          "font-bold tracking-tight",
          isCompact ? "text-sm line-clamp-2" : "text-lg line-clamp-2"
        )}>
          <a href={item.url} className="hover:text-motortrend-red">
            {item.title}
          </a>
        </h3>
        
        {!isCompact && item.excerpt && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
        )}
        
        {isCompact && (
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <Clock size={10} className="mr-1" />
            <span>{item.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
