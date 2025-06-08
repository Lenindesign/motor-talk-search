
import React from 'react';
import { User, Calendar, MessageSquare, Bookmark } from 'lucide-react';
import { BuyersGuideCard } from '@/components/BuyersGuideCard';
import { useSavedItems } from '@/contexts/SavedItemsContext';

interface ArticleHeaderProps {
  title: string;
  author: string;
  date: string;
  commentsCount: number;
  imageUrl: string;
  showBuyersGuide?: boolean;
  articleId: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  author,
  date,
  commentsCount,
  imageUrl,
  showBuyersGuide = false,
  articleId
}) => {
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const isArticleSaved = isSaved(articleId, 'article');
  
  const handleSave = () => {
    if (isArticleSaved) {
      removeSavedItem(articleId, 'article');
    } else {
      addSavedItem({
        id: articleId,
        type: 'article',
        title: title,
        imageUrl: imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          author: author,
          date: date
        }
      });
    }
  };
  return (
    <header className="mb-8" id="introduction">
      <h1 className="typography-display mb-4">{title}</h1>
      <div className="flex items-center justify-between text-neutral-4 typography-caption mb-6">
        <div className="flex items-center">
          <User size={16} className="mr-1" />
          <span>{author}</span>
          <span className="mx-2">•</span>
          <Calendar size={16} className="mr-1" />
          <span>{date}</span>
          <span className="mx-2">•</span>
          <MessageSquare size={16} className="mr-1" />
          <a href="#comments" className="hover:text-motortrend-red transition-colors">
            {commentsCount} comments
          </a>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center typography-button2 text-neutral-4 hover:text-motortrend-red transition-colors"
          aria-label={isArticleSaved ? 'Remove from saved' : 'Save article'}
        >
          <Bookmark
            size={16}
            className={`mr-1 ${isArticleSaved ? 'fill-current text-motortrend-red' : ''}`}
          />
          <span>{isArticleSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
      />
      
      {showBuyersGuide && (
        <div className="mb-6">
          <BuyersGuideCard
            make="Honda"
            model="Accord"
            year="2025"
            score={9.2}
            ranking="#1 in Midsize Cars"
            price="$28,990"
            mpg="48/38 City/Hwy"
            ownerRating={4.8}
            ownerCount={256}
          />
        </div>
      )}
    </header>
  );
};

export default ArticleHeader;
