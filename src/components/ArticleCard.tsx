
import React from "react";

export interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  category: string;
  featured?: boolean;
  photoCount?: number;
}

interface ArticleCardProps {
  article: ArticleData;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-40 w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        {article.featured && (
          <span className="absolute left-2 top-2 rounded bg-motortrend-red px-2 py-1 text-xs font-bold text-white">
            Featured
          </span>
        )}
        {article.photoCount && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            {article.photoCount} Photos
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 text-xs font-medium text-motortrend-red">
          {article.category}
        </div>
        <h3 className="mb-2 line-clamp-2 text-sm font-bold">{article.title}</h3>
        <div className="text-xs text-gray-500">{article.date}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
