import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Eye } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import { Card } from './ui/card';
import CardSkeleton from './ui/CardSkeleton';
import { cn } from '@/lib/utils';

export interface VideoData {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  videoUrl?: string;
  duration: string;
  tag?: string;
  tagColor?: string;
  author?: string;
  readTime?: string;
  views?: string;
  publishDate?: string;
  detailUrl?: string;
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
    return <Card isLoading className={className} />;
  }
  return <Card
    variant="video"
    className={cn('group relative hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-gray-800 border-0', className)}
    isSaved={isSaved}
    onToggleSave={toggleSave}
    metadata={{
      duration: video.duration,
      views: video.views,
      publishDate: video.publishDate
    }}
    onClick={handleClick}
  >
    {/* Image and overlays */}
    <div className="relative pt-[56.25%]">
      <img src={currentImage} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-300 rounded-t-xl" loading="lazy" />
      {/* Overlays absolutely positioned on top of Card image */}
      <div className="absolute top-2 right-2 z-20 pointer-events-none">
        <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">{video.duration}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="bg-motortrend-red/90 rounded-full p-3 flex items-center justify-center">
          <Play className="text-white ml-0.5 w-8 h-8" />
        </div>
      </div>
    </div>
    {/* Card content below image */}
    <div className="p-8">
      <h3 className="leading-tight text-white mb-1 line-clamp-2 typography-subtitle font-semibold">
        {video.title}
      </h3>
      <div className="flex items-center text-sm text-gray-400">
        {video.publishDate && <span>{video.publishDate}</span>}
      </div>
    </div>
  </Card>;
});

VideoCard.displayName = 'VideoCard';
export default VideoCard;
