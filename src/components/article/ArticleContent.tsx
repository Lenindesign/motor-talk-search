
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
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {section.content}
          </h2>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-motortrend-red pl-4 my-6 italic">
            <p className="text-lg">"{section.content}"</p>
            {section.author && (
              <footer className="text-right mt-2 text-gray-600">— {section.author}</footer>
            )}
          </blockquote>
        );
      case 'specs':
        return (
          <div key={index} className="bg-gray-50 p-6 rounded-lg my-6">
            {section.title && (
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
            )}
            <div className="grid gap-4">
              {section.data?.map((item, i) => (
                <div key={i} className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <p key={index} className="my-4 leading-relaxed">
            {section.content}
          </p>
        );
    }
  };

  return (
    <div className="prose max-w-none">
      <p className="text-xl text-gray-700 mb-6">{subtitle}</p>
      {sections.map((section, index) => renderContentSection(section, index))}
    </div>
  );
};

export default ArticleContent;
