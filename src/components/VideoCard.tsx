
import React, { useState } from "react";
import { Bookmark, AlertCircle } from "lucide-react";
import { useSavedItems } from "../contexts/SavedItemsContext";

export interface VideoData {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
}

interface VideoCardProps {
  video: VideoData;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const saved = isSaved(video.id, 'video');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(video.id, 'video');
    } else {
      addSavedItem({
        id: video.id,
        title: video.title,
        type: 'video',
        imageUrl: video.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          duration: video.duration
        }
      });
    }
  };
  
  // Function to get a fallback image based on the video title
  const getFallbackImage = () => {
    if (!video.title) return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    
    const lowerTitle = video.title.toLowerCase();
    
    // Check for car makes and models in title
    if (lowerTitle.includes("bmw") || lowerTitle.includes("m5")) {
      return 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("ford") || lowerTitle.includes("f-150") || lowerTitle.includes("lightning")) {
      return 'https://images.unsplash.com/photo-1647983216233-e16d8f364ece?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("rivian")) {
      return 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("ferrari") || lowerTitle.includes("lamborghini") || lowerTitle.includes("mclaren") || lowerTitle.includes("supercar")) {
      return 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("lucid") || lowerTitle.includes("air")) {
      return 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("maintenance") || lowerTitle.includes("diy")) {
      return 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("audio") || lowerTitle.includes("sound")) {
      return 'https://images.unsplash.com/photo-1624628639856-100bf817a80f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    }
    
    // Default fallback
    return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
  };
  
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md">
      <div className="relative">
        {!imageLoaded && !imageError && (
          <div className="h-40 w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading video thumbnail...</span>
          </div>
        )}
      
        <img
          src={video.imageUrl}
          alt={video.title}
          className={`h-40 w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageError(true);
            setImageLoaded(true);
            (e.target as HTMLImageElement).src = getFallbackImage();
          }}
        />
        
        {imageError && (
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
            <span className="flex items-center">
              <AlertCircle size={12} className="mr-1" />
              Using alternate thumbnail
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
          {video.duration}
        </div>
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${saved ? 'bg-motortrend-red text-white' : 'bg-black/70 text-white hover:bg-motortrend-red'} transition-colors`}
          aria-label={saved ? "Unsave video" : "Save video"}
        >
          <Bookmark size={16} className={saved ? 'fill-white' : ''} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-bold">{video.title}</h3>
      </div>
    </div>
  );
};

export default VideoCard;
