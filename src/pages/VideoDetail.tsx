import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Share, Heart, ThumbsUp, ThumbsDown, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GlobalHeader from '@/components/GlobalHeader';
import { mockVideos } from '@/services/mockData';
const VideoDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const video = mockVideos.find(v => v.id === id);
  const [isPlaying, setIsPlaying] = useState(false);
  if (!video) {
    return <div className="min-h-screen bg-gray-50">
        <GlobalHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Video Not Found</h1>
            <Link to="/" className="text-motortrend-red hover:underline">
              Browse All Videos
            </Link>
          </div>
        </main>
      </div>;
  }
  const relatedVideos = mockVideos.filter(v => v.id !== id).slice(0, 4);
  const mockVideoStats = {
    views: "2,847,392",
    likes: "45,234",
    dislikes: "892",
    publishDate: "2 days ago",
    description: `In this comprehensive review, we take an in-depth look at the latest automotive innovation. From performance testing to interior analysis, we cover everything you need to know about this remarkable vehicle.

Our expert team puts this vehicle through its paces on both city streets and highway conditions, evaluating acceleration, handling, comfort, and overall driving experience.

Key topics covered in this video:
• Performance and acceleration testing
• Interior design and technology features  
• Safety ratings and driver assistance systems
• Fuel efficiency and environmental impact
• Pricing and value proposition
• Comparison with competitor vehicles

Subscribe to MotorTrend for the latest automotive content and stay up to date with industry trends, reviews, and exclusive behind-the-scenes footage.`,
    tags: ["automotive", "car review", "performance", "2025 models", "test drive"]
  };
  return <div className="min-h-screen bg-gray-50 py-[16px]">
      <GlobalHeader />
      <main className="max-w-[980px] mx-auto px-0 py-[32px]">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-motortrend-red hover:text-motortrend-dark transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Videos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              {!isPlaying ? <div className="relative cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  <img src={video.imageUrl} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="bg-motortrend-red hover:bg-motortrend-red/90 rounded-full p-4 transition-colors">
                      <Play size={32} className="text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div> : <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <Play size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Video Player</p>
                    <p className="text-sm opacity-75">Playing: {video.title}</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsPlaying(false)}>
                      Return to Thumbnail
                    </Button>
                  </div>
                </div>}
            </div>

            {/* Video Information */}
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h1>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      {mockVideoStats.views} views
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {mockVideoStats.publishDate}
                    </div>
                    <span>•</span>
                    <span>MotorTrend</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart size={16} className="mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share size={16} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Like/Dislike Bar */}
                <div className="flex items-center space-x-4 mb-6">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <ThumbsUp size={16} />
                    <span>{mockVideoStats.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <ThumbsDown size={16} />
                    <span>{mockVideoStats.dislikes}</span>
                  </Button>
                  <div className="flex-1 bg-gray-200 rounded-full h-1">
                    <div className="bg-motortrend-red h-1 rounded-full" style={{
                    width: '98%'
                  }}></div>
                  </div>
                </div>

                {/* Description */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Description</h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {mockVideoStats.description}
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {mockVideoStats.tags.map((tag, index) => <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Comments (234)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">CarEnthusiast2025</span>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Excellent review! Really helped me understand the key differences between these models.
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                            <ThumbsUp size={12} className="mr-1" />
                            24
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">TechReviewer</span>
                          <span className="text-xs text-gray-500">5 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          The acceleration test was impressive. Would love to see more detailed interior shots.
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                            <ThumbsUp size={12} className="mr-1" />
                            12
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Load More Comments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Videos Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Related Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedVideos.map(relatedVideo => <Link key={relatedVideo.id} to={`/video/${relatedVideo.id}`} className="flex space-x-3 hover:bg-gray-50 p-2 rounded transition-colors px-0 py-0">
                    <div className="relative flex-shrink-0">
                      <img src={relatedVideo.imageUrl} alt={relatedVideo.title} className="w-32 h-20 object-cover rounded" />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                        {relatedVideo.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {relatedVideo.title}
                      </h3>
                      <p className="text-xs text-gray-500">MotorTrend</p>
                      <p className="text-xs text-gray-500">1.2M views • 3 days ago</p>
                    </div>
                  </Link>)}
              </CardContent>
            </Card>

            {/* Channel Info */}
            <Card>
              <CardHeader>
                <CardTitle>MotorTrend Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-motortrend-red rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                    MT
                  </div>
                  <h3 className="font-semibold mb-1">MotorTrend</h3>
                  <p className="text-sm text-gray-600 mb-3">2.8M subscribers</p>
                  <Button className="w-full bg-motortrend-red hover:bg-motortrend-red/90">
                    Subscribe
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    The ultimate automotive authority featuring the latest car reviews, comparisons, and industry news.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>;
};
export default VideoDetail;