
import React from "react";
import { Bookmark } from "lucide-react";
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
  const saved = isSaved(video.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(video.id);
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
  
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={video.imageUrl}
          alt={video.title}
          className="h-40 w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
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
