import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Clock, Star, Video, Image } from 'lucide-react';
import GlobalHeader from '@/components/GlobalHeader';
import ArticleCard from '@/components/ArticleCard';
import VideoCard from '@/components/VideoCard';
import PhotoCard from '@/components/PhotoCard';
import CarCard from '@/components/CarCard';
import { mockArticles, mockVideos, mockPhotos, mockNewCars } from '@/services/mockData';
const News: React.FC = () => {
  const [activeTab, setActiveTab] = useState('latest');

  // Featured article (first article from mock data)
  const featuredArticle = mockArticles[0];

  // Latest news (next 3 articles)
  const latestNews = mockArticles.slice(1, 4);

  // For you section (next 3 articles)
  const forYouNews = mockArticles.slice(4, 7);

  // Trending section (next 3 articles)
  const trendingNews = mockArticles.slice(7, 10);

  // Videos section (first 3 videos)
  const featuredVideos = mockVideos.slice(0, 3);

  // Photos section (first 3 photos)
  const featuredPhotos = mockPhotos.slice(0, 3);

  // Latest cars section (first 3 cars)
  const latestCars = mockNewCars.slice(0, 3);
  return <div className="min-h-screen bg-gray-50">
      <GlobalHeader />
      <main className="max-w-[980px] mx-auto px-0 py-[32px]">
        {/* Featured Article */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Featured Story</h2>
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="relative">
              <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="h-[400px] w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span className="mb-2 inline-block rounded bg-motortrend-red px-2 py-1 text-xs font-bold text-white">
                  {featuredArticle.category}
                </span>
                <h1 className="mb-2 font-bold text-white text-5xl">{featuredArticle.title}</h1>
                <p className="text-sm text-gray-200">{featuredArticle.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="latest" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="latest" className="flex items-center gap-2">
              <Clock size={16} />
              Latest
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp size={16} />
              Trending
            </TabsTrigger>
            <TabsTrigger value="for-you" className="flex items-center gap-2">
              <Star size={16} />
              For You
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {latestNews.map(article => <ArticleCard key={article.id} article={article} />)}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {trendingNews.map(article => <ArticleCard key={article.id} article={article} />)}
            </div>
          </TabsContent>

          <TabsContent value="for-you">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {forYouNews.map(article => <ArticleCard key={article.id} article={article} />)}
            </div>
          </TabsContent>
        </Tabs>

        {/* Videos Section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Video size={24} />
              Featured Videos
            </h2>
            <Button variant="ghost" className="flex items-center gap-2">
              View All
              <ArrowRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredVideos.map(video => <VideoCard key={video.id} video={video} />)}
          </div>
        </section>

        {/* Photos Section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Image size={24} />
              Photo Gallery
            </h2>
            <Button variant="ghost" className="flex items-center gap-2">
              View All
              <ArrowRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredPhotos.map(photo => <PhotoCard key={photo.id} photo={photo} />)}
          </div>
        </section>

        {/* Latest Cars Section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Latest Cars</h2>
            <Button variant="ghost" className="flex items-center gap-2">
              View All
              <ArrowRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {latestCars.map(car => <CarCard key={car.id} car={car} type="new" />)}
          </div>
        </section>
      </main>
    </div>;
};
export default News;