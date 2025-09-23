import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FeedCardProps {
  id: string;
  type: 'article' | 'video' | 'photo' | 'review' | 'news';
  title: string;
  description?: string;
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  timestamp: string;
  image?: string;
  content?: {
    snippet?: string;
    url?: string;
  };
  engagement: {
    likes: number;
    dislikes: number;
    comments: number;
    shares: number;
  };
  metadata?: {
    category?: string;
    readTime?: string;
    tags?: string[];
  };
}

interface FeedCardState {
  userVote: 'like' | 'dislike' | null;
  isBookmarked: boolean;
  localLikes: number;
  localDislikes: number;
}

const FeedCard: React.FC<FeedCardProps> = ({ 
  id, 
  type, 
  title, 
  description, 
  author, 
  timestamp, 
  image, 
  content, 
  engagement, 
  metadata 
}) => {
  const [state, setState] = useState<FeedCardState>({
    userVote: null,
    isBookmarked: false,
    localLikes: engagement.likes,
    localDislikes: engagement.dislikes,
  });

  const handleVote = (voteType: 'like' | 'dislike') => {
    setState(prev => {
      let newLikes = prev.localLikes;
      let newDislikes = prev.localDislikes;
      let newUserVote: 'like' | 'dislike' | null = voteType;

      // Remove previous vote if it exists
      if (prev.userVote === 'like') {
        newLikes -= 1;
      } else if (prev.userVote === 'dislike') {
        newDislikes -= 1;
      }

      // Apply new vote (or remove if clicking same vote)
      if (prev.userVote === voteType) {
        newUserVote = null; // Remove vote if clicking same button
      } else {
        if (voteType === 'like') {
          newLikes += 1;
        } else {
          newDislikes += 1;
        }
      }

      return {
        ...prev,
        userVote: newUserVote,
        localLikes: newLikes,
        localDislikes: newDislikes,
      };
    });
  };

  const handleBookmark = () => {
    setState(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }));
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'photo':
        return '📷';
      case 'review':
        return '⭐';
      case 'news':
        return '📰';
      default:
        return '📝';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Header */}
      <div className="p-3 sm:p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {author.avatar ? (
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  onError={(e) => {
                    // Hide the image and show initials if avatar fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 flex items-center justify-center"><span class="text-gray-600 font-medium text-xs sm:text-sm">${author.name.charAt(0).toUpperCase()}</span></div>`;
                    }
                  }}
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">
                    {author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-gray-900 truncate text-sm sm:text-base">
                  {author.name}
                </p>
                {author.verified && (
                  <span className="text-blue-500 text-sm">✓</span>
                )}
                <span className="text-xs text-gray-500 hidden sm:inline">
                  {getTypeIcon()}
                </span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                <span>{timestamp}</span>
                {metadata?.category && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{metadata.category}</span>
                  </>
                )}
                {metadata?.readTime && (
                  <>
                    <span className="hidden md:inline">•</span>
                    <span className="hidden md:inline">{metadata.readTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 flex-shrink-0"
          >
            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-4 pb-3">
        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {description}
          </p>
        )}
        {content?.snippet && (
          <p className="text-gray-600 text-sm italic line-clamp-2">
            "{content.snippet}"
          </p>
        )}
      </div>

      {/* Image */}
      {image && (
        <div className="px-3 sm:px-4 pb-3">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 sm:h-64 object-cover rounded-lg"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = '/images/cars/placeholder.jpg';
            }}
          />
        </div>
      )}

      {/* Tags */}
      {metadata?.tags && metadata.tags.length > 0 && (
        <div className="px-3 sm:px-4 pb-3">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {/* Show first 2 tags on mobile, 3 on desktop */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {metadata.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                >
                  #{tag}
                </span>
              ))}
              {/* Third tag only visible on desktop */}
              {metadata.tags[2] && (
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  #{metadata.tags[2]}
                </span>
              )}
            </div>
            {/* More tags indicator */}
            {metadata.tags.length > 3 && (
              <span className="text-xs text-gray-500 hidden sm:inline">
                +{metadata.tags.length - 3} more
              </span>
            )}
            {metadata.tags.length > 2 && (
              <span className="text-xs text-gray-500 sm:hidden">
                +{metadata.tags.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-3 sm:px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Voting */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('like')}
                className={`p-1.5 sm:p-2 ${
                  state.userVote === 'like' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {formatNumber(state.localLikes)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('dislike')}
                className={`p-1.5 sm:p-2 ${
                  state.userVote === 'dislike' 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-500 hover:text-red-600'
                }`}
              >
                <ThumbsDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {formatNumber(state.localDislikes)}
              </span>
            </div>

            {/* Comments */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-gray-700"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">
                {formatNumber(engagement.comments)}
              </span>
            </Button>

            {/* Share */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-gray-700"
            >
              <Share className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                {formatNumber(engagement.shares)}
              </span>
            </Button>
          </div>

          {/* Bookmark */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`p-1.5 sm:p-2 ${
              state.isBookmarked 
                ? 'text-yellow-600 bg-yellow-50' 
                : 'text-gray-500 hover:text-yellow-600'
            }`}
          >
            <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${state.isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;
