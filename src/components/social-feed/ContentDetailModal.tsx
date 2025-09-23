import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, MessageCircle, Share, Bookmark, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeedCardProps } from './FeedCard';
import { useNavigate } from 'react-router-dom';

interface ContentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: FeedCardProps;
}

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'CarEnthusiast92',
    content: 'Great review! I\'ve been considering the Prius and this really helps. How does it handle on the highway?',
    timestamp: '1 hour ago',
    likes: 12,
  },
  {
    id: '2',
    author: 'EcoDriver',
    avatar: '/personas/gearhead-greg.jpg',
    content: 'I\'ve had mine for 6 months now. The fuel economy is incredible - averaging 58 MPG in mixed driving.',
    timestamp: '45 minutes ago',
    likes: 8,
    replies: [
      {
        id: '2-1',
        author: 'CarEnthusiast92',
        content: 'That\'s amazing! What kind of driving do you do mostly?',
        timestamp: '30 minutes ago',
        likes: 3,
      }
    ]
  },
  {
    id: '3',
    author: 'TechReviewer',
    content: 'The tech in this generation is finally competitive. Apple CarPlay works seamlessly.',
    timestamp: '20 minutes ago',
    likes: 5,
  }
];

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ isOpen, onClose, content }) => {
  const navigate = useNavigate();
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleVote = (voteType: 'like' | 'dislike') => {
    setUserVote(userVote === voteType ? null : voteType);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In real implementation, this would add to backend
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  const getTypeIcon = () => {
    switch (content.type) {
      case 'video': return '🎥';
      case 'photo': return '📷';
      case 'review': return '⭐';
      case 'news': return '📰';
      default: return '📝';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getTypeIcon()}</span>
            <div>
              <h2 className="font-bold text-lg">{content.title}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{content.author.name}</span>
                {content.author.verified && <span className="text-blue-500">✓</span>}
                <span>•</span>
                <span>{content.timestamp}</span>
                {content.metadata?.category && (
                  <>
                    <span>•</span>
                    <span>{content.metadata.category}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate(`/content/${content.id}`);
                onClose();
              }}
              className="text-gray-500 hover:text-blue-600"
              title="Open in full page"
            >
              <ExternalLink className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Main Image */}
            {content.image && (
              <img 
                src={content.image} 
                alt={content.title}
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
            )}

            {/* Content Body */}
            <div className="prose max-w-none mb-6">
              {content.description && (
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {content.description}
                </p>
              )}
              
              {content.content?.snippet && (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                  "{content.content.snippet}"
                </blockquote>
              )}

              {/* Expanded content based on type */}
              {content.type === 'review' && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">Our Take</h3>
                  <p className="text-gray-700">
                    After extensive testing, we found the 2024 Toyota Prius Prime to be a significant 
                    improvement over previous generations. The new design language is bold and modern, 
                    while the hybrid powertrain delivers exceptional efficiency without compromising on 
                    driving dynamics. The interior tech has finally caught up to competitors, making 
                    this a compelling choice for eco-conscious buyers.
                  </p>
                </div>
              )}

              {content.type === 'news' && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">Key Details</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Enhanced towing capacity up to 10,000 lbs</li>
                    <li>Extended range of 400+ miles on a single charge</li>
                    <li>New STX trim level with off-road capabilities</li>
                    <li>Available late September 2025</li>
                    <li>Starting price expected around $65,000</li>
                  </ul>
                </div>
              )}

              {content.type === 'video' && (
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">Video Highlights</h3>
                  <p className="text-gray-700">
                    Watch as we put these two supercars through their paces on Laguna Seca's 
                    challenging 2.238-mile circuit. The Porsche GT3's naturally aspirated engine 
                    vs the McLaren's twin-turbo V8 - which approach to track performance reigns supreme?
                  </p>
                  <div className="mt-3 text-sm text-gray-600">
                    Duration: 12:45 | Track: Laguna Seca | Weather: Sunny, 72°F
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {content.metadata?.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {content.metadata.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote('like')}
                    className={`${
                      userVote === 'like' 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </Button>
                  <span className="font-medium">{content.engagement.likes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote('dislike')}
                    className={`${
                      userVote === 'dislike' 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-500 hover:text-red-600'
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                  </Button>
                  <span className="font-medium">{content.engagement.dislikes}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{content.engagement.comments}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                  <Share className="w-5 h-5" />
                  <span className="font-medium">{content.engagement.shares}</span>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`${
                  isBookmarked 
                    ? 'text-yellow-600 bg-yellow-50' 
                    : 'text-gray-500 hover:text-yellow-600'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Comments Section */}
            {showComments && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-4">
                  Comments ({content.engagement.comments})
                </h3>

                {/* Add Comment */}
                <div className="mb-6">
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 font-medium text-sm">U</span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                      />
                      <div className="flex justify-end mt-2">
                        <Button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          size="sm"
                        >
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        {comment.avatar ? (
                          <img 
                            src={comment.avatar} 
                            alt={comment.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-medium text-sm">
                              {comment.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center space-x-1">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="text-xs text-gray-500 hover:text-gray-700">
                            Reply
                          </button>
                        </div>

                        {/* Replies */}
                        {comment.replies && (
                          <div className="mt-3 ml-4 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex space-x-3">
                                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-gray-600 font-medium text-xs">
                                    {reply.author.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="bg-gray-50 rounded-lg p-2">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-sm">{reply.author}</span>
                                      <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{reply.content}</p>
                                  </div>
                                  <div className="flex items-center space-x-4 mt-1">
                                    <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center space-x-1">
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>{reply.likes}</span>
                                    </button>
                                    <button className="text-xs text-gray-500 hover:text-gray-700">
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailModal;
