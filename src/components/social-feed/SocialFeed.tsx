import React, { useState, useEffect, useCallback } from 'react';
import FeedCard, { FeedCardProps } from './FeedCard';
import Container from '../Container';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SocialFeedProps {
  initialData?: FeedCardProps[];
  loadMoreData?: () => Promise<FeedCardProps[]>;
  className?: string;
}

const SocialFeed: React.FC<SocialFeedProps> = ({
  initialData = [],
  loadMoreData,
  className = '',
}) => {
  const [feedItems, setFeedItems] = useState<FeedCardProps[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !loadMoreData) return;
    
    setLoading(true);
    try {
      const newItems = await loadMoreData();
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setFeedItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading more feed items:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, loadMoreData]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  if (feedItems.length === 0 && !loading) {
    return (
      <Container className={className}>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No content yet
          </h3>
          <p className="text-gray-500">
            Check back later for updates from the community.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className={className}>
      <div className="max-w-2xl mx-auto">
        {/* Feed Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
            Your Feed
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Latest automotive content from the community
          </p>
        </div>

        {/* Feed Items */}
        <div className="space-y-4 sm:space-y-6">
          {feedItems.map((item, index) => (
            <FeedCard
              key={`${item.id}-${index}`}
              {...item}
            />
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading more content...</span>
          </div>
        )}

        {/* Load More Button (fallback for infinite scroll) */}
        {!loading && hasMore && loadMoreData && feedItems.length > 0 && (
          <div className="flex justify-center py-8">
            <Button
              onClick={loadMore}
              variant="outline"
              className="px-8"
            >
              Load More
            </Button>
          </div>
        )}

        {/* End of Feed */}
        {!hasMore && feedItems.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              You've reached the end of your feed
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SocialFeed;
