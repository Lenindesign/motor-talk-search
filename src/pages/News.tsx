import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Clock, Star, Video, Image } from 'lucide-react';
import HeroCarousel from '@/components/home/HeroCarousel';
import ArticleCard from '@/components/ArticleCard';
import VideoCard from '@/components/VideoCard';
import PhotoCard from '@/components/PhotoCard';
import CarCard from '@/components/CarCard';
import { mockArticles, mockVideos, mockPhotos, mockNewCars } from '@/services/mockData';
const News: React.FC = () => {
  const [activeTab, setActiveTab] = useState('latest');

  // Latest news (first 3 articles instead of skipping the first one)
  const latestNews = mockArticles.slice(0, 3);

  // For you section (next 3 articles)
  const forYouNews = mockArticles.slice(3, 6);

  // Trending section (next 3 articles)
  const trendingNews = mockArticles.slice(6, 9);

  // Videos section (first 3 videos)
  const featuredVideos = mockVideos.slice(0, 3);

  // Photos section (first 3 photos)
  const featuredPhotos = mockPhotos.slice(0, 3);

  // Latest cars section (first 3 cars)
  const latestCars = mockNewCars.slice(0, 3);
  return <div className="min-h-screen bg-transparent">
      
      <div className="max-w-[1024px] mx-auto py-[32px] px-4 md:px-0">
        {/* Hero Carousel */}
        <div className="mb-8">
          <HeroCarousel slides={[{
          id: 'n1',
          title: '2025 Porsche Macan EV: First Drive',
          subtitle: 'Porsche enters the electric SUV market with a bang. Here\'s how the Macan EV stacks up.',
          imageUrl: 'https://cdn.motor1.com/images/mgl/8ANLNB/s1/2024-porsche-macan-ev.jpg',
          tag: 'First Drive',
          tagColor: 'bg-blue-700',
          author: 'Alexandra Smith',
          readTime: '3 hours ago',
          linkTo: '/article/v1'
        }, {
          id: 'n2',
          title: 'Inside the 2025 Detroit Auto Show',
          subtitle: 'The biggest reveals, surprises, and electric debuts from Detroit.',
          imageUrl: 'https://www.usnews.com/dims4/USNEWS/1f68db0/2147483647/thumbnail/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2Fff%2Fb8%2F1541dfa646598a340d0e1d5cd797%2Fmaverick-lobo-2.jpg',
          tag: 'Event',
          tagColor: 'bg-green-700',
          author: 'Brian Lee',
          readTime: '5 hours ago',
          linkTo: '/article/v2'
        }, {
          id: 'n3',
          title: 'How Autonomous Tech is Changing Road Trips',
          subtitle: 'From hands-free driving to smart navigation, a look at the new era of travel.',
          imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a284d1b3bf12000821ef3f/waymo-i-pace-pacifica.jpeg',
          tag: 'Tech',
          tagColor: 'bg-purple-700',
          author: 'Dana Patel',
          readTime: '7 hours ago',
          linkTo: '/article/v3'
        }]} />
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
            {/* Mobile: Horizontal list, Desktop: 3-column grid */}
            <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
              {latestNews.map(article => 
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  layout="horizontal"
                  className="md:hidden"
                />
              )}
              {latestNews.map(article => 
                <ArticleCard 
                  key={`desktop-${article.id}`} 
                  article={article} 
                  layout="vertical"
                  className="hidden md:block"
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            {/* Mobile: Horizontal list, Desktop: 3-column grid */}
            <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
              {trendingNews.map(article => 
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  layout="horizontal"
                  className="md:hidden"
                />
              )}
              {trendingNews.map(article => 
                <ArticleCard 
                  key={`desktop-${article.id}`} 
                  article={article} 
                  layout="vertical"
                  className="hidden md:block"
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="for-you">
            {/* Mobile: Horizontal list, Desktop: 3-column grid */}
            <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
              {forYouNews.map(article => 
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  layout="horizontal"
                  className="md:hidden"
                />
              )}
              {forYouNews.map(article => 
                <ArticleCard 
                  key={`desktop-${article.id}`} 
                  article={article} 
                  layout="vertical"
                  className="hidden md:block"
                />
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Videos Section */}
        <section className="mb-8">
          <div className="component-header">
            <h2 className="component-title">
              <Video size={24} />
              Featured Videos
            </h2>
            <Button variant="ghost" className="component-view-all">
              View All
              <ArrowRight size={16} />
            </Button>
          </div>
          {/* Mobile: Horizontal list, Desktop: 3-column grid */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
            {featuredVideos.map(video => 
              <VideoCard 
                key={video.id} 
                video={video} 
                layout="horizontal"
                className="md:hidden"
              />
            )}
            {featuredVideos.map(video => 
              <VideoCard 
                key={`desktop-${video.id}`} 
                video={video} 
                layout="vertical"
                className="hidden md:block"
              />
            )}
          </div>
        </section>

        {/* Photos Section */}
        <section className="mb-8">
          <div className="component-header">
            <h2 className="component-title">
              <Image size={24} />
              Photo Gallery
            </h2>
            <Button variant="ghost" className="component-view-all">
              View All
              <ArrowRight size={16} />
            </Button>
          </div>
          {/* Mobile: Horizontal list, Desktop: 3-column grid */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
            {featuredPhotos.map(photo => 
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                layout="horizontal"
                className="md:hidden"
              />
            )}
            {featuredPhotos.map(photo => 
              <PhotoCard 
                key={`desktop-${photo.id}`} 
                photo={photo} 
                layout="vertical"
                className="hidden md:block"
              />
            )}
          </div>
        </section>

        {/* Latest Cars Section */}
        <section className="mb-8">
          <div className="component-header">
            <h2 className="component-title">Latest Cars</h2>
            <Button variant="ghost" className="component-view-all">
              View All
              <ArrowRight size={16} />
            </Button>
          </div>
          {/* Mobile: Horizontal list, Desktop: 3-column grid */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
            {latestCars.map(car => 
              <CarCard 
                key={car.id} 
                car={car} 
                type="new" 
                layout="horizontal"
                className="md:hidden"
              />
            )}
            {latestCars.map(car => 
              <CarCard 
                key={`desktop-${car.id}`} 
                car={car} 
                type="new" 
                layout="vertical"
                className="hidden md:block"
              />
            )}
          </div>
        </section>
      </div>
    </div>;
};
export default News;