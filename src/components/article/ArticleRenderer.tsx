
import React from 'react';
import { useSavedItems } from '@/contexts/SavedItemsContext';
import { mockComments } from '@/services/mockData';
import { CommentsSection } from '@/components/CommentsSection';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleContentView from '@/components/article/ArticleContent';
import ArticleActions from '@/components/article/ArticleActions';
import { ArticleData, ArticleContent, ContentSection } from '@/types';

interface ArticleRendererProps {
  article: ArticleData;
  mockContent: ArticleContent;
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({
  article,
  mockContent
}) => {
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const isArticleSaved = isSaved(article.id, 'article');
  const content = (article.content || mockContent) as ArticleContent;
  
  const handleSave = () => {
    if (isArticleSaved) {
      removeSavedItem(article.id, 'article');
    } else {
      addSavedItem({
        id: article.id,
        type: 'article',
        title: article.title,
        imageUrl: article.imageUrl,
        savedAt: new Date().toISOString(),
        metadata: {
          category: article.category || '',
          date: article.date
        }
      });
    }
  };
  
  return (
    <article key={article.id} data-article-id={article.id} className="max-w-3xl mx-auto px-4 py-8">
      <ArticleHeader
        title={article.title}
        author={content.author}
        date={article.date}
        commentsCount={mockComments.length}
        imageUrl={article.imageUrl}
        showBuyersGuide={article.title.toLowerCase().includes('honda accord')}
        articleId={article.id}
      />

      <ArticleContentView
        subtitle={content.subtitle}
        sections={content.sections}
      />

      <ArticleActions
        isArticleSaved={isArticleSaved}
        readTime={content.readTime}
        onSave={handleSave}
      />

      <div id="comments">
        <CommentsSection comments={mockComments} articleId={article.id} />
      </div>
    </article>
  );
};

export default ArticleRenderer;
