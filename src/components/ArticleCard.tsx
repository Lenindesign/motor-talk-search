import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Camera, Bookmark } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';

export interface ArticleData {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  category: string;
  featured?: boolean;
  photoCount?: number;
}

export interface ArticleCardProps {
  article: ArticleData;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const isArticleSaved = isSaved(article.id, 'article');
  const savedItem = {
    id: article.id,
    title: article.title,
    type: 'article' as const,
    imageUrl: article.imageUrl,
    savedAt: new Date().toISOString(),
    metadata: {
      category: article.category,
      date: article.date,
      photoCount: article.photoCount,
      featured: article.featured
    }
  };

  const handleSave = () => {
    if (isArticleSaved) {
      removeSavedItem(article.id, 'article');
    } else {
      addSavedItem(savedItem);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSave();
        }}
        className="absolute top-2.5 left-2.5 p-2.5 rounded-full bg-white/90 hover:bg-gray-50 shadow-md transition-all duration-300 transform hover:scale-110 z-50"
      >
        <Bookmark 
          size={22} 
          className={`text-gray-600 ${isArticleSaved ? 'fill-current' : 'stroke-current'} transition-colors duration-300 ${isArticleSaved ? 'text-blue-600' : ''}`}
        />
      </button>
      <div className="relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-48 w-full object-cover"
        />
        {article.photoCount && (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center text-xs">
            <Camera size={12} className="mr-1" />
            {article.photoCount}
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <span className="bg-motortrend-red text-white px-2 py-1 rounded text-xs font-bold">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          <h3 className="font-bold text-lg line-clamp-2 text-left">{article.title}</h3>
          <div className="flex items-center text-sm text-gray-500 text-left">
            <Calendar size={14} className="mr-1" />
            <span className="mr-3">{article.date}</span>
            <User size={14} className="mr-1" />
            <span>MotorTrend</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
