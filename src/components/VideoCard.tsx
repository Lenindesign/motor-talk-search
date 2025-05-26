import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Clock, Eye, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import BaseCard from './ui/BaseCard';
import { CARD_STYLES } from '@/styles/cardStyles';
import { cn } from '@/lib/utils';
export interface VideoData {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  views?: string;
  publishDate?: string;
  metadata?: {
    duration?: string;
    views?: string;
    publishDate?: string;
  };
}
export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  video: VideoData;
  className?: string;
  onClick?: () => void;
}
const VideoCard: React.FC<VideoCardProps> = ({
  video,
  className,
  onClick
}) => {
  const navigate = useNavigate();
  const {
    addSavedItem,
    removeSavedItem,
    isSaved
  } = useSavedItems();
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
  return <BaseCard type="video" className={cn('group relative hover:shadow-xl transition-shadow duration-300 cursor-pointer', className)} isSaved={isVideoSaved} onToggleSave={handleSave} metadata={{
    duration: video.duration,
    views: video.views,
    publishDate: video.publishDate
  }} onClick={onClick || (() => navigate(`/video/${video.id}`))}>
      <div className="relative">
        <img src={video.imageUrl} alt={video.title} className="h-48 w-full object-cover" />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="bg-motortrend-red/90 group-hover:bg-motortrend-red rounded-full p-3 transition-colors">
            <Play className="text-white ml-0.5" />
          </div>
        </div>
        
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-bold leading-tight text-gray-900 mb-1 line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-3">MotorTrend</span>
          {video.views && <>
              <Eye className="mr-1" />
              <span className="mr-3">{video.views} views</span>
            </>}
          {video.publishDate && <span>{video.publishDate}</span>}
        </div>
      </div>
    </BaseCard>;
};
export default VideoCard;