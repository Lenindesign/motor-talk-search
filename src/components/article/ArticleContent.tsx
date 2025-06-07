
import React from 'react';

interface ContentSection {
  type: 'paragraph' | 'heading' | 'quote' | 'specs';
  content?: string;
  author?: string;
  title?: string;
  data?: Array<{ label: string; value: string }>;
}

interface ArticleContentProps {
  subtitle: string;
  sections: ContentSection[];
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  subtitle,
  sections
}) => {
  const renderContentSection = (section: ContentSection, index: number) => {
    switch (section.type) {
      case 'heading':
        return (
          <h2 key={index} className="typography-title mt-8 mb-4">
            {section.content}
          </h2>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-motortrend-red pl-4 my-6 italic">
            <p className="typography-body-large">"{section.content}"</p>
            {section.author && (
              <footer className="text-right mt-2 typography-caption text-neutral-4">— {section.author}</footer>
            )}
          </blockquote>
        );
      case 'specs':
        return (
          <div key={index} className="bg-neutral-7 p-6 rounded-lg my-6">
            {section.title && (
              <h3 className="typography-title mb-4">{section.title}</h3>
            )}
            <div className="grid gap-4">
              {section.data?.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-neutral-6 pb-2">
                  <span className="typography-caption">{item.label}</span>
                  <span className="typography-caption text-neutral-3">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <p key={index} className="typography-body my-4">
            {section.content}
          </p>
        );
    }
  };

  return (
    <div className="prose max-w-none">
      <p className="typography-subtitle mb-6">{subtitle}</p>
      {sections.map((section, index) => renderContentSection(section, index))}
    </div>
  );
};

export default ArticleContent;
