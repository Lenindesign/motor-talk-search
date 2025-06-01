import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { VideoData } from './VideoCard';

export interface ShortVideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  video: VideoData;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  priority?: boolean;
}

const ShortVideoCard: React.FC<ShortVideoCardProps> = memo(({
  video,
  className,
  onClick,
  isLoading = false,
  priority = false
}) => {
  const navigate = useNavigate();
  const { currentImage, isLoading: imageLoading } = useOptimizedImageLoader({
    imageUrl: video.imageUrl,
    priority
  });
  
  const { isSaved, toggleSave } = useCardSave({
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
  
  return (
    <Card
      variant="video"
      className={cn(
        'group relative hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-gray-800 border-gray-700 h-full',
        className
      )}
      isSaved={isSaved}
      onToggleSave={toggleSave}
      metadata={{
        duration: video.duration,
        views: video.views,
        publishDate: video.publishDate
      }}
      onClick={handleClick}
    >
      {/* Image container with 9:16 aspect ratio */}
      <div className="relative pt-[177.78%]"> {/* 9:16 aspect ratio (16/9 * 100 = 177.78%) */}
        <img 
          src={currentImage} 
          alt={video.title} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 rounded-t-xl" 
          loading="lazy" 
        />
        
        {/* Duration badge */}
        <div className="absolute top-2 right-2 z-20 pointer-events-none">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
            {video.duration}
          </span>
        </div>
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-motortrend-red/90 rounded-full p-3 flex items-center justify-center">
            <Play className="text-white ml-0.5 w-8 h-8" />
          </div>
        </div>
      </div>
      
      {/* Card content below image */}
      <div className="p-3">
        <h3 className="leading-tight text-white mb-1 line-clamp-2 text-sm font-semibold">
          {video.title}
        </h3>
        <div className="flex items-center text-xs text-gray-400">
          {video.publishDate && <span>{video.publishDate}</span>}
        </div>
      </div>
    </Card>
  );
});

ShortVideoCard.displayName = 'ShortVideoCard';
export default ShortVideoCard;
