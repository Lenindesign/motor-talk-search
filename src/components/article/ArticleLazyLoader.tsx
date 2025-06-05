
import React, { useRef } from 'react';

interface ArticleLazyLoaderProps {
  loadedIndexes: number[];
  maxArticles: number;
  totalArticles: number;
  onLoadMore: () => void;
}

const ArticleLazyLoader: React.FC<ArticleLazyLoaderProps> = ({
  loadedIndexes,
  maxArticles,
  totalArticles,
  onLoadMore
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (loadedIndexes.length >= maxArticles || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadedIndexes, maxArticles, onLoadMore]);

  if (loadedIndexes.length >= maxArticles || loadedIndexes.length >= totalArticles) {
    return null;
  }

  return <div ref={observerRef} className="h-20" />;
};

export default ArticleLazyLoader;
