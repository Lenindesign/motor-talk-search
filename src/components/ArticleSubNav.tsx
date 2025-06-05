import React from 'react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import '@/styles/article-subnav.css';

interface ArticleSubNavProps {
  currentArticleIndex: number;
  articles: Array<{
    id: string;
    title: string;
    imageUrl: string;
    category: string;
  }>;
  readingProgress: number;
}

const ArticleSubNav: React.FC<ArticleSubNavProps> = ({
  currentArticleIndex,
  articles,
  readingProgress,
}) => {
  return (
    <div className="sticky top-16 z-40 w-full bg-white border-b border-neutral-200 shadow-sm">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-100">
          <div
            className="h-full bg-motortrend-red transition-all duration-300 ease-in-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Articles navigation */}
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3 overflow-x-auto hide-scrollbar">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className={cn(
                  "flex items-center gap-3 min-w-[280px] max-w-[280px] group",
                  index === currentArticleIndex && "opacity-100",
                  index !== currentArticleIndex && "opacity-60 hover:opacity-100 transition-opacity"
                )}
              >
                <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-motortrend-red mb-0.5">
                    {article.category}
                  </p>
                  <h3 className="text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-motortrend-red transition-colors">
                    {article.title}
                  </h3>
                </div>
                {index === currentArticleIndex && (
                  <div className="w-1.5 h-1.5 rounded-full bg-motortrend-red flex-shrink-0" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSubNav;
