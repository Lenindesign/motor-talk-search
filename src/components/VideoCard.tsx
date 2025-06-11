import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Eye } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { useOptimizedImageLoader } from '../hooks/useOptimizedImageLoader';
import { Card } from './ui/card';
import CardSkeleton from './ui/CardSkeleton';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

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
  category?: string;
}

export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  video: VideoData;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  priority?: boolean;
  layout?: 'vertical' | 'horizontal';
}

const VideoCard: React.FC<VideoCardProps> = memo(({
  video,
  className,
  onClick,
  isLoading = false,
  priority = false,
  layout = 'vertical'
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

  if (layout === 'horizontal') {
    return (
      <Card 
        className={cn('group overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-0 rounded-2xl', className)}
        showSaveButton={false}
      >
        <Link to={`/video/${video.id}`} className="block">
          <div className="flex p-6">
            {/* Content - Left side */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
              <div>
                {video.category && (
                  <div className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {video.category}
                  </div>
                )}
                <h3 className="text-base font-semibold line-clamp-3 group-hover:text-motortrend-red transition-colors leading-tight text-gray-900 mb-3">
                  {video.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <div className="flex items-center">
                  {video.publishDate && (
                    <span>{video.publishDate}</span>
                  )}
                </div>
                {/* Bookmark button next to date */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleSave();
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-3"
                  aria-label={isSaved ? "Unsave video" : "Save video"}
                >
                  <svg width="16" height="16" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                  </svg>
                </button>
              </div>
            </div>
            {/* Video thumbnail with play button - Right side */}
            <div className="w-32 h-24 flex-shrink-0 relative overflow-hidden rounded-xl">
              <img 
                src={currentImage} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Duration overlay - bottom right */}
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                  {video.duration}
                </div>
              )}
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800 ml-0.5">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
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
    <div className="relative pt-[56.25%] overflow-hidden">
      <img src={currentImage} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl" loading="lazy" />
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
