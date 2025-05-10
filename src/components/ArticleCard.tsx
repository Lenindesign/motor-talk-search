
import React from "react";
import { Bookmark } from "lucide-react";
import { useSavedItems } from "../contexts/SavedItemsContext";

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
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const saved = isSaved(article.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(article.id);
    } else {
      addSavedItem({
        id: article.id,
        title: article.title,
        type: 'article',
        imageUrl: article.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          category: article.category,
          date: article.date
        }
      });
    }
  };

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
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 p-1.5 rounded-full ${saved ? 'bg-motortrend-red text-white' : 'bg-black/70 text-white hover:bg-motortrend-red'} transition-colors`}
          aria-label={saved ? "Unsave article" : "Save article"}
        >
          <Bookmark size={16} className={saved ? 'fill-white' : ''} />
        </button>
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
