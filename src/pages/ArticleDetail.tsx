import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share, Bookmark, Eye, Clock, ChevronUp } from 'lucide-react';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockArticles } from '@/services/mockData';
import '@/styles/progress-bar.css';
const ArticleDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    addSavedItem,
    removeSavedItem,
    isSaved
  } = useSavedItems();
  const isArticleSaved = isSaved(id, 'article');
  const handleSave = () => {
    const savedItem = {
      id,
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
    if (isArticleSaved) {
      removeSavedItem(id, 'article');
    } else {
      addSavedItem(savedItem);
    }
  };
  const article = mockArticles.find(a => a.id === id);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight * 100;
      setReadingProgress(Math.min(progress, 100));
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  if (!article) {
    return <div className="min-h-screen bg-gray-50">
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link to="/" className="text-motortrend-red hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
      </div>;
  }
  const mockContent = {
    subtitle: "Revolutionary electric SUVs are pushing the boundaries of range and efficiency, with some models now exceeding 400 miles on a single charge.",
    author: "Sarah Rodriguez",
    authorTitle: "Senior Automotive Editor",
    readTime: "8 min read",
    sections: [{
      type: "paragraph",
      content: "The electric SUV landscape has transformed dramatically in 2025, with manufacturers achieving unprecedented range figures that were once thought impossible. These aren't just incremental improvements—they represent quantum leaps in battery technology and aerodynamic efficiency."
    }, {
      type: "paragraph",
      content: "After extensive testing across varied terrain and weather conditions, we've identified the electric SUVs that truly deliver on their range promises. Here's what sets the leaders apart from the pack."
    }, {
      type: "heading",
      content: "Performance That Defies Physics"
    }, {
      type: "paragraph",
      content: "The 2025 Mercedes EQS SUV leads our range test with an EPA-estimated 450 miles, but real-world testing revealed even more impressive results. During our highway efficiency test, we achieved 470 miles on a single charge."
    }, {
      type: "paragraph",
      content: "What makes this achievement remarkable isn't just the raw numbers—it's how these vehicles maintain performance while maximizing efficiency. Advanced thermal management keeps batteries at optimal temperature, while regenerative braking systems recapture energy that would otherwise be lost."
    }, {
      type: "specs",
      title: "Range Leaders: 2025 Models",
      data: [{
        label: "Mercedes EQS SUV",
        value: "450 miles EPA"
      }, {
        label: "Lucid Air Dream Range",
        value: "425 miles EPA"
      }, {
        label: "BMW iX xDrive50",
        value: "410 miles EPA"
      }, {
        label: "Tesla Model S",
        value: "405 miles EPA"
      }, {
        label: "Cadillac Celestiq",
        value: "400 miles EPA"
      }]
    }, {
      type: "quote",
      content: "The transition from 300 to 400+ mile range isn't just evolutionary—it's revolutionary. It fundamentally changes how we think about electric vehicle ownership.",
      author: "Dr. Elena Vasquez, Battery Technology Institute"
    }, {
      type: "heading",
      content: "Interior: Where Luxury Meets Purpose"
    }, {
      type: "paragraph",
      content: "Step inside these long-range leaders and you'll discover interiors that redefine automotive luxury. Sustainable materials meet cutting-edge technology in cabins designed for the modern driver."
    }, {
      type: "paragraph",
      content: "The Mercedes EQS SUV's MBUX Hyperscreen spans the entire dashboard with three high-resolution displays. Voice commands respond with human-like accuracy, while ambient lighting adapts to driving conditions and time of day."
    }, {
      type: "heading",
      content: "Charging Infrastructure Reality Check"
    }, {
      type: "paragraph",
      content: "Extended range means less frequent charging, but when you do need to charge, infrastructure matters. Tesla's Supercharger network remains the gold standard, but CCS networks are rapidly expanding."
    }, {
      type: "paragraph",
      content: "All our range leaders support ultra-fast charging at 150kW or higher. The Lucid Air Dream Range can add 200 miles of range in just 15 minutes under optimal conditions."
    }, {
      type: "cta",
      title: "Find Your Perfect Electric SUV",
      description: "Use our interactive tool to compare range, pricing, and features across all 2025 electric SUV models.",
      buttonText: "Start Comparison"
    }]
  };
  return <div className="min-h-screen bg-gray-50">
      

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 progress-indicator-red">
        <Progress 
          value={readingProgress} 
          className="h-3 rounded-none bg-gray-200" 
        />
      </div>

      <main className="max-w-[720px] mx-auto px-[16px] py-[6px]">
        {/* Article Header */}
        <header className="mb-8">
          {/* Guide flag removed while maintaining padding */}
          <div className="mb-4"></div>

          <h1 className="md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-3xl">
            {article.title}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
            {mockContent.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span className="font-medium text-sm">{mockContent.author}</span>
              <span className="mx-2">•</span>
              <span className="text-sm">{mockContent.authorTitle}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span className="text-sm">{article.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">{mockContent.readTime}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} className="mr-2" />
              <span className="text-sm">2,847 views</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <img src={article.imageUrl} alt={article.title} className="w-full h-[400px] md:h-[500px] object-cover" loading="eager" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white text-sm opacity-90">
                Mercedes EQS SUV showcases the future of electric luxury with industry-leading range capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-12 p-6 bg-white rounded-xl shadow-sm border">
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" onClick={handleSave} className={`hover:bg-motortrend-red hover:text-white transition-colors ${isArticleSaved ? 'bg-motortrend-red text-white' : ''}`}>
              <Bookmark size={16} className="mr-2" />
              {isArticleSaved ? 'Saved' : 'Save Article'}
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-motortrend-red hover:text-white transition-colors">
              <Share size={16} className="mr-2" />
              Share
            </Button>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {mockContent.readTime}
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-left">
          {mockContent.sections.map((section, index) => {
          switch (section.type) {
            case 'paragraph':
              return <p key={index} className="mb-6 text-gray-700 leading-relaxed text-lg text-left">
                    {section.content}
                  </p>;
            case 'heading':
              return <h2 key={index} className="text-3xl font-bold mt-12 mb-6 text-gray-900 relative text-left">
                    <span className="text-xl font-bold mb-4 text-gray-900">
                      {section.content}
                    </span>
                  </h2>;
            case 'specs':
              return <Card key={index} className="my-8 border-l-4 border-l-motortrend-red">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">{section.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.data.map((spec, specIndex) => <div key={specIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-700">{spec.label}</span>
                            <span className="font-bold text-motortrend-red">{spec.value}</span>
                          </div>)}
                      </div>
                    </CardContent>
                  </Card>;
            case 'quote':
              return <blockquote key={index} className="my-8 p-6 bg-gradient-to-r from-motortrend-red/5 to-red-50 border-l-4 border-l-motortrend-red rounded-r-lg">
                    <p className="text-xl italic text-gray-800 mb-3 leading-relaxed">
                      "{section.content}"
                    </p>
                    <cite className="text-sm font-medium text-gray-600">
                      — {section.author}
                    </cite>
                  </blockquote>;
            case 'cta':
              return <Card key={index} className="my-12 bg-gradient-to-r from-motortrend-red to-red-600 text-white">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
                      <p className="text-lg mb-6 opacity-90">{section.description}</p>
                      <Button size="lg" variant="secondary" className="bg-white text-motortrend-red hover:bg-gray-100 font-semibold">
                        {section.buttonText}
                      </Button>
                    </CardContent>
                  </Card>;
            default:
              return null;
          }
        })}
        </article>

        {/* Related Articles */}
        <section className="mt-16 p-8 bg-white rounded-xl shadow-sm border">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockArticles.slice(0, 3).filter(a => a.id !== id).map(relatedArticle => <Link key={relatedArticle.id} to={`/article/${relatedArticle.id}`} className="block group hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border hover:border-motortrend-red/20">
                <img src={relatedArticle.imageUrl} alt={relatedArticle.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="p-4">
                  <h4 className="font-semibold text-sm mb-2 group-hover:text-motortrend-red transition-colors line-clamp-2">
                    {relatedArticle.title}
                  </h4>
                  <p className="text-xs text-gray-500">{relatedArticle.date}</p>
                </div>
              </Link>)}
          </div>
        </section>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-motortrend-red text-white p-3 rounded-full shadow-lg hover:bg-motortrend-dark transition-all duration-300 z-40" aria-label="Scroll to top">
          <ChevronUp size={20} />
        </button>}
    </div>;
};
export default ArticleDetail;