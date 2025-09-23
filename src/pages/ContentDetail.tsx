import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockFeedData } from '@/data/socialFeedData';
import ContentDetailModal from '@/components/social-feed/ContentDetailModal';

const ContentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const content = mockFeedData.find(item => item.id === id);
  
  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Not Found</h1>
          <p className="text-gray-600 mb-4">The content you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            Return to Feed
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-lg">
                {content.type === 'video' && '🎥'}
                {content.type === 'photo' && '📷'}
                {content.type === 'review' && '⭐'}
                {content.type === 'news' && '📰'}
                {content.type === 'article' && '📝'}
              </span>
              <span className="font-medium text-gray-900">{content.metadata?.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Using modal component in full page mode */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                {content.author.avatar ? (
                  <img 
                    src={content.author.avatar} 
                    alt={content.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {content.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{content.author.name}</h3>
                  {content.author.verified && (
                    <span className="text-blue-500">✓</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{content.timestamp}</span>
                  {content.metadata?.category && (
                    <>
                      <span>•</span>
                      <span>{content.metadata.category}</span>
                    </>
                  )}
                  {content.metadata?.readTime && (
                    <>
                      <span>•</span>
                      <span>{content.metadata.readTime}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {content.title}
            </h1>
            
            {content.description && (
              <p className="text-gray-700 text-lg leading-relaxed">
                {content.description}
              </p>
            )}
          </div>

          {/* Main Image */}
          {content.image && (
            <div className="px-6 py-4">
              <img 
                src={content.image} 
                alt={content.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content Body */}
          <div className="p-6">
            {content.content?.snippet && (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
                "{content.content.snippet}"
              </blockquote>
            )}

            {/* Expanded content based on type */}
            {content.type === 'review' && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">Our Take</h3>
                <p className="text-gray-700 leading-relaxed">
                  After extensive testing, we found the 2024 Toyota Prius Prime to be a significant 
                  improvement over previous generations. The new design language is bold and modern, 
                  while the hybrid powertrain delivers exceptional efficiency without compromising on 
                  driving dynamics. The interior tech has finally caught up to competitors, making 
                  this a compelling choice for eco-conscious buyers.
                </p>
              </div>
            )}

            {content.type === 'news' && (
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">Key Details</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Enhanced towing capacity up to 10,000 lbs</li>
                  <li>Extended range of 400+ miles on a single charge</li>
                  <li>New STX trim level with off-road capabilities</li>
                  <li>Available late September 2025</li>
                  <li>Starting price expected around $65,000</li>
                </ul>
              </div>
            )}

            {content.type === 'video' && (
              <div className="bg-red-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">Video Highlights</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Watch as we put these two supercars through their paces on Laguna Seca's 
                  challenging 2.238-mile circuit. The Porsche GT3's naturally aspirated engine 
                  vs the McLaren's twin-turbo V8 - which approach to track performance reigns supreme?
                </p>
                <div className="text-sm text-gray-600 bg-white rounded p-3">
                  <strong>Video Details:</strong> Duration: 12:45 | Track: Laguna Seca | Weather: Sunny, 72°F
                </div>
              </div>
            )}

            {/* Tags */}
            {content.metadata?.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {content.metadata.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Engagement Stats */}
            <div className="flex items-center justify-between py-4 border-t border-gray-200">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span>{content.engagement.likes} likes</span>
                <span>{content.engagement.dislikes} dislikes</span>
                <span>{content.engagement.comments} comments</span>
                <span>{content.engagement.shares} shares</span>
              </div>
              <div className="text-sm text-gray-500">
                Share this article
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
