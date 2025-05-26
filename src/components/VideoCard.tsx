
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Clock, Eye, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';

export interface VideoData {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  views?: string;
  publishDate?: string;
}

interface VideoCardProps {
  video: VideoData;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate();
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const isVideoSaved = isSaved(video.id, 'video');
  const savedItem = {
    id: video.id,
    title: video.title,
    type: 'video' as const,
    imageUrl: video.imageUrl,
    savedAt: new Date().toISOString(),
    metadata: {
      duration: video.duration,
      views: video.views,
      publishDate: video.publishDate
    }
  };

  const handleSave = () => {
    if (isVideoSaved) {
      removeSavedItem(video.id, 'video');
    } else {
      addSavedItem(savedItem);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/video/${video.id}`)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSave();
        }}
        className="absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50"
      >
        <Bookmark 
          size={22} 
          className={`text-gray-600 ${isVideoSaved ? 'fill-current' : 'stroke-current'} transition-colors duration-300 ${isVideoSaved ? 'text-blue-600' : ''}`}
        />
      </button>
      <div className="relative">
        <img
          src={video.imageUrl}
          alt={video.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="bg-motortrend-red/90 group-hover:bg-motortrend-red rounded-full p-3 transition-colors">
            <Play size={20} className="text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs">
          <Clock size={12} className="mr-1" />
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-3">MotorTrend</span>
          {video.views && (
            <>
              <Eye size={12} className="mr-1" />
              <span className="mr-3">{video.views} views</span>
            </>
          )}
          {video.publishDate && <span>{video.publishDate}</span>}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
