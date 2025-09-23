import React from 'react';
import { TrendingUp, Clock, MessageCircle, ExternalLink, Star, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TrendingSidebar: React.FC = () => {
  const navigate = useNavigate();

  const trendingStories = [
    {
      id: 1,
      title: '2025 Tesla Model 3 Gets Major Update',
      category: 'Electric',
      views: '2.4K',
      comments: 89,
      timestamp: '2h ago',
      trending: true,
    },
    {
      id: 2,
      title: 'Ford Recalls 150K F-150 Lightning Trucks',
      category: 'News',
      views: '1.8K',
      comments: 156,
      timestamp: '4h ago',
      trending: true,
    },
    {
      id: 3,
      title: 'Best SUVs Under $30K for 2024',
      category: 'Reviews',
      views: '3.1K',
      comments: 67,
      timestamp: '6h ago',
      trending: false,
    },
    {
      id: 4,
      title: 'McLaren Unveils New Hybrid Supercar',
      category: 'Luxury',
      views: '1.2K',
      comments: 34,
      timestamp: '8h ago',
      trending: false,
    },
    {
      id: 5,
      title: 'Gas Prices Drop to 18-Month Low',
      category: 'Market',
      views: '4.2K',
      comments: 203,
      timestamp: '12h ago',
      trending: true,
    },
  ];

  const weeklyTopStories = [
    {
      rank: 1,
      title: 'Why Everyone\'s Talking About the New Prius',
      views: '45K',
      author: 'Alex Chen',
    },
    {
      rank: 2,
      title: 'Electric vs Hybrid: 2024 Buying Guide',
      views: '38K',
      author: 'Sarah Martinez',
    },
    {
      rank: 3,
      title: 'Track Test: Porsche 911 vs BMW M3',
      views: '32K',
      author: 'Mike Johnson',
    },
  ];

  const quickStats = [
    { label: 'New Reviews', value: '12', period: 'this week' },
    { label: 'Price Drops', value: '89', period: 'today' },
    { label: 'Active Deals', value: '234', period: 'nationwide' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Trending Now */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-red-600" />
          <h2 className="font-bold text-lg text-gray-900">Trending Now</h2>
        </div>
        <div className="space-y-3">
          {trendingStories.slice(0, 5).map((story, index) => (
            <div
              key={story.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/content/${story.id}`)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 pt-1">
                  <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded ${
                    index < 3 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600 line-clamp-2 transition-colors">
                    {story.title}
                  </h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-gray-500">{story.category}</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      <span>{story.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <MessageCircle className="w-3 h-3" />
                      <span>{story.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{story.timestamp}</span>
                    {story.trending && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600">
                        🔥 Hot
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button 
          variant="ghost" 
          className="w-full mt-3 text-red-600 hover:text-red-700"
          onClick={() => navigate('/trending')}
        >
          See All Trending
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Ad Space 1 */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2">Find Your Perfect Car</h3>
          <p className="text-sm text-blue-100 mb-3">
            Over 500,000 new & used cars from trusted dealers
          </p>
          <Button 
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            onClick={() => navigate('/cars')}
          >
            Start Shopping
          </Button>
        </div>
      </div>

      {/* Top Stories This Week */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            Top Stories This Week
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {weeklyTopStories.map((story) => (
            <div
              key={story.rank}
              className="flex items-start space-x-3 group cursor-pointer"
              onClick={() => navigate(`/top-stories/${story.rank}`)}
            >
              <div className="flex-shrink-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  story.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                  story.rank === 2 ? 'bg-gray-100 text-gray-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {story.rank}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-red-600 line-clamp-2 transition-colors">
                  {story.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">by {story.author}</span>
                  <span className="text-xs text-gray-400">{story.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
        <div className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600">{stat.label}</span>
                <p className="text-xs text-gray-400">{stat.period}</p>
              </div>
              <span className="text-xl font-bold text-gray-900">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Space 2 */}
      <div className="bg-gray-900 rounded-lg p-4 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-2">CarMax</h3>
          <p className="text-sm text-gray-300 mb-3">
            7-Day Money Back Guarantee on every car
          </p>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900"
          >
            Shop Now
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-500 to-transparent opacity-20 rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>

      {/* Market Updates */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-green-900 text-sm mb-1">
              Market Update
            </h4>
            <p className="text-xs text-green-700 mb-2">
              Used car prices stabilizing after 6-month decline. Inventory up 15%.
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs border-green-300 text-green-700 hover:bg-green-100"
              >
                Market Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-3">
          Get the latest car news and deals delivered to your inbox
        </p>
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter email"
            className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <Button size="sm" className="bg-red-600 hover:bg-red-700">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;
