
import React from 'react';
import { User, Calendar, MessageSquare } from 'lucide-react';
import { BuyersGuideCard } from '@/components/BuyersGuideCard';
import { ArticleData } from '@/types/article';
import { mockComments } from '@/services/mockData';

interface ArticleContentProps {
  article: ArticleData;
  isFirst?: boolean;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article, isFirst = false }) => {
  const mockContent = {
    subtitle: "Revolutionary electric SUVs are pushing the boundaries of range and efficiency, with some models now exceeding 400 miles on a single charge.",
    author: "Sarah Rodriguez",
    authorTitle: "Senior Automotive Editor",
    readTime: "8 min read",
    sections: [
      {
        type: 'paragraph',
        content: article.content?.sections?.[0]?.content || "The automotive landscape continues to evolve with new technologies and innovations shaping the future of transportation."
      }
    ]
  };

  return (
    <article className={`py-12 ${!isFirst ? 'border-t border-neutral-200' : ''}`}>
      <header className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
          {mockContent.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
          <div className="flex items-center">
            <User size={16} className="mr-2" />
            <span className="font-medium">{mockContent.author}</span>
            <span className="mx-2">•</span>
            <span>{mockContent.authorTitle}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span>{article.date}</span>
          </div>

          <a href="#comments" className="flex items-center hover:text-motortrend-red transition-colors">
            <MessageSquare size={16} className="mr-2" />
            <span>{mockComments.reduce((count, comment) => count + 1 + (comment.replies?.length || 0), 0)} comments</span>
          </a>
        </div>
      </header>

      <div className="mb-8 sm:mb-12">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            loading="lazy" 
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
            <p className="text-sm sm:text-base text-white opacity-90">
              {article.category} - {article.title}
            </p>
          </div>
        </div>
      </div>

      <section className="prose prose-lg max-w-none mb-8 sm:mb-12">
        {/* First show the BuyersGuideCard */}
        {article.title.toLowerCase().includes('honda accord') && (
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

        {/* Show article content */}
        {mockContent.sections.map((section, index) => (
          <div key={index} className="mb-6">
            {section.type === 'paragraph' && (
              <p>{section.content}</p>
            )}
          </div>
        ))}
      </section>
    </article>
  );
};

export default ArticleContent;
