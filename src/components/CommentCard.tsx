import React, { memo } from 'react';
import { MessageSquare, User, Calendar } from 'lucide-react';
import { useCardSave } from '../hooks/useCardSave';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

export interface CommentData {
  id: string;
  content: string;
  author: string;
  date: string;
  articleTitle?: string;
  articleId?: string;
  likes?: number;
  replies?: number;
  metadata?: {
    author?: string;
    date?: string;
    articleTitle?: string;
    articleId?: string;
    likes?: number;
    replies?: number;
  };
}

export interface CommentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: CommentData;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

const CommentCard: React.FC<CommentCardProps> = memo(({
  comment,
  className,
  onClick,
  isLoading = false
}) => {
  const { isSaved, toggleSave } = useCardSave({
    id: comment.id,
    type: 'comment',
    title: comment.content.substring(0, 50) + '...',
    imageUrl: '', // Comments don't have images
    metadata: {
      author: comment.author,
      date: comment.date,
      articleTitle: comment.articleTitle,
      articleId: comment.articleId,
      likes: comment.likes?.toString(),
      replies: comment.replies?.toString()
    }
  });

  const handleClick = onClick || (() => {
    if (comment.articleId) {
      window.location.href = `/article/${comment.articleId}#comment-${comment.id}`;
    }
  });

  if (isLoading) {
    return <Card isLoading className={className} />;
  }

  return (
    <Card
      className={cn('group relative hover:shadow-lg transition-shadow duration-300 cursor-pointer', className)}
      isSaved={isSaved}
      onToggleSave={toggleSave}
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-gray-900">{comment.author}</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">{comment.date}</span>
            </div>
            {comment.articleTitle && (
              <div className="text-xs text-gray-500 mb-2">
                on "{comment.articleTitle}"
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-3 mb-3">
          {comment.content}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MessageSquare size={12} />
            <span>{comment.replies || 0} replies</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👍</span>
            <span>{comment.likes || 0} likes</span>
          </div>
        </div>
      </div>
    </Card>
  );
});

CommentCard.displayName = 'CommentCard';
export default CommentCard; 