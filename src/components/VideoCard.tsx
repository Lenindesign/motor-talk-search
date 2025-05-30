import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Eye } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import BaseCard from './ui/BaseCard';
import CardSkeleton from './ui/CardSkeleton';
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
  isLoading?: boolean;
  priority?: boolean;
}
const VideoCard: React.FC<VideoCardProps> = memo(({
  video,
  className,
  onClick,
  isLoading = false,
  priority = false
}) => {
  const navigate = useNavigate();
  const {
    currentImage,
    isLoading: imageLoading
  } = useOptimizedImageLoader({
    imageUrl: video.imageUrl,
    priority
  });
  const {
    isSaved,
    toggleSave
  } = useCardSave({
    id: video.id,
    type: 'video',
    title: video.title,
    imageUrl: video.imageUrl,
    metadata: {
      duration: video.duration,
      views: video.views,
      publishDate: video.publishDate
    }
  });
  const handleClick = onClick || (() => navigate(`/video/${video.id}`));
  if (isLoading) {
    return <CardSkeleton className={className} />;
  }
  return <BaseCard type="video" className={cn('group relative hover:shadow-xl transition-shadow duration-300 cursor-pointer', className)} isSaved={isSaved} onToggleSave={toggleSave} onClick={handleClick}>
      <div className="relative pt-[56.25%]">
        <img src={currentImage} alt={video.title} className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-300", imageLoading ? "opacity-0" : "opacity-100")} loading={priority ? "eager" : "lazy"} />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="bg-motortrend-red/90 group-hover:bg-motortrend-red rounded-full p-3 transition-colors">
            <Play className="text-white ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="leading-tight text-gray-900 mb-1 line-clamp-2 text-lg font-semibold">
          {video.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-3">MotorTrend</span>
          {video.views && <>
              <Eye className="mr-1" size={14} />
              <span className="mr-3">{video.views} views</span>
            </>}
          {video.publishDate && <span>{video.publishDate}</span>}
        </div>
      </div>
    </BaseCard>;
});
VideoCard.displayName = 'VideoCard';
export default VideoCard;