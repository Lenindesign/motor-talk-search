import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, Flag, MoreHorizontal } from 'lucide-react';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  articleId: string;
  comments: Comment[];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  articleId,
  comments: initialComments,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        name: 'Current User',
        avatar: '/avatars/default.png',
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const CommentCard: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply }) => (
    <div className={`flex gap-4 ${isReply ? 'ml-4 sm:ml-12 mt-4' : 'mt-6'}`}>
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 bg-neutral-100">
        <img 
          src={comment.author.avatar} 
          alt={comment.author.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://i.pravatar.cc/150?u=default';
          }} 
        />
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="typography-body-large text-neutral-1">{comment.author.name}</span>
            <span className="typography-small sm:typography-caption text-neutral-3">
              {new Date(comment.timestamp).toLocaleDateString()}
            </span>
          </div>
          <button className="p-1 text-neutral-3 hover:text-neutral-1 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
        <p className="typography-caption sm:typography-body text-neutral-2">{comment.content}</p>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="flex items-center gap-1 text-neutral-3 hover:text-neutral-1 transition-colors">
            <ThumbsUp size={14} className="sm:w-4 sm:h-4" />
            <span>{comment.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-neutral-3 hover:text-neutral-1 transition-colors">
            <ThumbsDown size={14} className="sm:w-4 sm:h-4" />
            <span>{comment.dislikes}</span>
          </button>
          <button className="typography-small sm:typography-caption text-neutral-3 hover:text-neutral-1 transition-colors">Reply</button>
          <button className="flex items-center gap-1 typography-small sm:typography-caption text-neutral-3 hover:text-neutral-1 transition-colors ml-auto">
            <Flag size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Report</span>
          </button>
        </div>
        {comment.replies?.map((reply) => (
          <CommentCard key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-6 sm:py-8 border-t border-neutral-6">
      <h2 className="typography-title text-neutral-1 mb-4 sm:mb-6">Comments</h2>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-3 sm:space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="min-h-[80px] sm:min-h-[100px] resize-none typography-caption sm:typography-body"
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!newComment.trim()}
            className="typography-button2 sm:typography-button1 px-3 py-1.5 sm:px-4 sm:py-2"
          >
            Post Comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-neutral-3 py-6 sm:py-8 typography-caption sm:typography-body">Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
};
