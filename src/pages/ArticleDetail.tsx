
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share, Bookmark, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlobalHeader from '@/components/GlobalHeader';
import { mockArticles } from '@/services/mockData';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = mockArticles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <GlobalHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link to="/" className="text-motortrend-red hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const mockContent = `
    The automotive industry continues to evolve rapidly, with electric vehicles leading the charge in innovation and performance. In this comprehensive review, we dive deep into the latest developments that are shaping the future of transportation.

    ## Key Highlights

    Electric vehicles have reached a new milestone in 2025, with improved battery technology and extended range capabilities. The latest models offer unprecedented performance while maintaining environmental sustainability.

    ### Performance Metrics

    - **Range**: Up to 400+ miles on a single charge
    - **Acceleration**: 0-60 mph in under 4 seconds
    - **Charging**: Fast charging capabilities up to 350kW
    - **Efficiency**: Industry-leading energy consumption ratings

    ## Design and Technology

    The interior showcases cutting-edge technology with intuitive interfaces and premium materials. Advanced driver assistance systems provide enhanced safety and convenience features.

    ### Interior Features

    - Premium leather seating with heating and cooling
    - Advanced infotainment system with wireless connectivity
    - Panoramic sunroof for an open, airy feel
    - State-of-the-art sound system for exceptional audio quality

    ## Conclusion

    This represents a significant step forward in automotive excellence, combining performance, luxury, and sustainability in a package that sets new industry standards.
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-motortrend-red hover:text-motortrend-dark transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <span className="inline-block bg-motortrend-red text-white px-3 py-1 rounded text-sm font-semibold mb-3">
                {article.category}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">{article.title}</h1>
              <div className="flex items-center text-gray-200 text-sm">
                <Calendar size={16} className="mr-2" />
                <span className="mr-4">{article.date}</span>
                <User size={16} className="mr-2" />
                <span className="mr-4">MotorTrend Editorial</span>
                <Eye size={16} className="mr-2" />
                <span>2,847 views</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Bookmark size={16} className="mr-2" />
                  Save Article
                </Button>
                <Button variant="outline" size="sm">
                  <Share size={16} className="mr-2" />
                  Share
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                5 min read
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              {mockContent.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('###')) {
                  return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('-')) {
                  return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
                }
                if (paragraph.trim()) {
                  return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>;
                }
                return null;
              })}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockArticles.slice(0, 3).filter(a => a.id !== id).map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                to={`/article/${relatedArticle.id}`}
                className="block hover:shadow-md transition-shadow"
              >
                <img
                  src={relatedArticle.imageUrl}
                  alt={relatedArticle.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h4 className="font-semibold text-sm mb-1">{relatedArticle.title}</h4>
                <p className="text-xs text-gray-500">{relatedArticle.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetail;
