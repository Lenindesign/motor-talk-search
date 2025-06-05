
import React from 'react';
import { User, Calendar, MessageSquare } from 'lucide-react';
import { BuyersGuideCard } from '@/components/BuyersGuideCard';

interface ArticleHeaderProps {
  title: string;
  author: string;
  date: string;
  commentsCount: number;
  imageUrl: string;
  showBuyersGuide?: boolean;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  author,
  date,
  commentsCount,
  imageUrl,
  showBuyersGuide = false
}) => {
  return (
    <header className="mb-8" id="introduction">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="flex items-center text-gray-600 text-sm mb-6">
        <User size={16} className="mr-1" />
        <span>{author}</span>
        <span className="mx-2">•</span>
        <Calendar size={16} className="mr-1" />
        <span>{date}</span>
        <span className="mx-2">•</span>
        <MessageSquare size={16} className="mr-1" />
        <span>{commentsCount} comments</span>
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
