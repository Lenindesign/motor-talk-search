
import React from 'react';
import { Bookmark, Share } from 'lucide-react';

interface ArticleActionsProps {
  isArticleSaved: boolean;
  readTime: string;
  onSave: () => void;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({
  isArticleSaved,
  readTime,
  onSave
}) => {
  return (
    <div className="flex items-center justify-between mt-8 pt-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onSave}
          className="flex items-center typography-button2 text-neutral-3 hover:text-motortrend-red transition-colors"
          aria-label={isArticleSaved ? 'Remove from saved' : 'Save article'}
        >
          <Bookmark
            size={20}
            className={`mr-1 ${isArticleSaved ? 'fill-current text-motortrend-red' : ''}`}
          />
          {isArticleSaved ? 'Saved' : 'Save'}
        </button>
        <button className="flex items-center typography-button2 text-neutral-3 hover:text-motortrend-red transition-colors">
          <Share size={20} className="mr-1" />
          Share
        </button>
      </div>
      <div className="typography-caption text-neutral-3">
        {readTime}
      </div>
    </div>
  );
};

export default ArticleActions;
