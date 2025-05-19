
import React, { useState } from "react";
import { Bookmark, AlertCircle } from "lucide-react";
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
  const saved = isSaved(article.id, 'article');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removeSavedItem(article.id, 'article');
    } else {
      addSavedItem({
        id: article.id,
        title: article.title,
        type: 'article',
        imageUrl: article.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          date: article.date,
          category: article.category,
          featured: article.featured,
          photoCount: article.photoCount
        }
      });
    }
  };

  // Function to find a fallback image based on article title
  const getFallbackImage = () => {
    if (!article.title) return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    
    const lowerTitle = article.title.toLowerCase();
    
    // Check for car makes and article categories
    if (lowerTitle.includes("ferrari")) {
      return 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("electric") || lowerTitle.includes("ev")) {
      return 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("performance") || lowerTitle.includes("sports car")) {
      return 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("cybertruck") || lowerTitle.includes("tesla")) {
      return 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("hybrid")) {
      return 'https://images.unsplash.com/photo-1562504208-03d85cc8c23e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    } else if (lowerTitle.includes("off-road") || lowerTitle.includes("4x4")) {
      return 'https://images.unsplash.com/photo-1519752594763-2633d8d4c94f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
    }
    
    // Default fallback
    return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md">
      <div className="relative">
        {!imageLoaded && !imageError && (
          <div className="h-40 w-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading article image...</span>
          </div>
        )}
        
        <img
          src={article.imageUrl}
          alt={article.title}
          className={`h-40 w-full object-cover ${!imageLoaded ? 'hidden' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageError(true);
            setImageLoaded(true);
            (e.target as HTMLImageElement).src = getFallbackImage();
          }}
        />
        
        {imageError && (
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
            <span className="flex items-center">
              <AlertCircle size={12} className="mr-1" />
              Using alternate image
            </span>
          </div>
        )}
        
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
