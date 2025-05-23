
import React from "react";
import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  category?: string;
  author: string;
  timestamp: string;
  duration: string;
  views?: string;
  url: string;
}

interface VideoCardProps {
  video: VideoData;
  size?: "small" | "medium" | "large";
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  size = "medium",
  className 
}) => {
  return (
    <div className={cn(
      "group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md",
      className
    )}>
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ 
            height: size === "small" ? "120px" : size === "medium" ? "180px" : "240px",
            objectFit: "cover"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-motortrend-red/90 text-white">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <polygon points="7,4 21,12 7,20" fill="white" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
          {video.duration}
        </div>
        {video.category && (
          <Badge className="absolute left-2 top-2 bg-motortrend-red text-white">
            {video.category}
          </Badge>
        )}
      </div>

      <div className="p-3">
        <h3 className={cn(
          "font-bold tracking-tight line-clamp-2",
          size === "small" ? "text-sm" : size === "medium" ? "text-base" : "text-lg"
        )}>
          <a href={video.url} className="hover:text-motortrend-red">
            {video.title}
          </a>
        </h3>
        
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <span className="mr-3">{video.author}</span>
          <Clock size={12} className="mr-1" />
          <span className="mr-3">{video.timestamp}</span>
          {video.views && (
            <span>{video.views} views</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
