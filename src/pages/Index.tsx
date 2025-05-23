
import React, { useState, useEffect } from "react";
import { Newspaper, Video, Car, Zap, Star, TrendingUp, Clock, BarChart2, Tag } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HeroCarousel, { HeroNewsItem } from "@/components/HeroCarousel";
import NewsCard, { NewsItem } from "@/components/NewsCard";
import VideoCard, { VideoData } from "@/components/VideoCard";
import BuyersGuideCard, { VehicleData } from "@/components/BuyersGuideCard";
import VehicleFinder, { VehicleFilterOptions } from "@/components/VehicleFinder";
import SectionHeader from "@/components/SectionHeader";
import AdPlaceholder from "@/components/AdPlaceholder";
import SponsoredContentLabel from "@/components/SponsoredContentLabel";
import TrendingComparisons, { ComparisonItem } from "@/components/TrendingComparisons";
import { mockArticles, mockVideos, mockNewCars } from "@/services/mockData";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleVehicleSearch = (filters: VehicleFilterOptions) => {
    console.log("Search with filters:", filters);
    // In a real app, navigate to search results with these filters
  };

  // Mock data for hero carousel
  const heroItems: HeroNewsItem[] = [
    {
      id: "hero-1",
      title: "2025 Tesla Cybertruck: Everything We Know About the Electric Pickup Revolution",
      excerpt: "The highly anticipated electric truck is finally here, and it's changing the pickup landscape forever. Here's our exclusive first drive and in-depth analysis.",
      imageUrl: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?w=800&auto=format&fit=crop",
      category: "First Drive",
      timestamp: "2 hours ago",
      author: "John Carter",
      url: "/article/tesla-cybertruck-first-drive"
    },
    {
      id: "hero-2",
      title: "2025 Ford Mustang GT: The Last Great American Muscle Car?",
      excerpt: "As the industry shifts to electrification, Ford keeps the tradition alive with its most powerful naturally aspirated V8 yet. We take it to the track.",
      imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop",
      category: "Track Test",
      timestamp: "5 hours ago",
      author: "Laura Chen",
      url: "/article/ford-mustang-gt-track-test"
    },
    {
      id: "hero-3",
      title: "Hyundai Ioniq 5 vs Tesla Model Y: The New EV Rivalry Heats Up",
      excerpt: "Can Hyundai's striking newcomer outperform Tesla's best-seller? Our comprehensive comparison reveals which electric SUV deserves your money.",
      imageUrl: "https://images.unsplash.com/photo-1619767886558-9db6ae775236?w=800&auto=format&fit=crop",
      category: "Comparison",
      timestamp: "Yesterday",
      author: "Michael Wong",
      url: "/article/ioniq-5-vs-model-y-comparison"
    }
  ];

  // Mock data for latest news
  const latestNews: NewsItem[] = mockArticles.slice(0, 8).map((article, idx) => ({
    id: `latest-${idx}`,
    title: article.title,
    imageUrl: article.imageUrl,
    category: article.category,
    timestamp: article.date,
    author: "MotorTrend Staff",
    url: `/articles/${article.id}`,
    hasVideo: idx % 3 === 0
  }));

  // Mock data for featured videos
  const featuredVideos: VideoData[] = mockVideos.slice(0, 6).map((video, idx) => ({
    id: `video-${idx}`,
    title: video.title,
    thumbnail: video.imageUrl,
    category: idx % 2 === 0 ? "Review" : "Comparison",
    author: "MotorTrend Video",
    timestamp: "3 days ago",
    duration: video.duration,
    views: `${Math.floor(Math.random() * 500) + 100}K`,
    url: `/videos/${video.id}`
  }));

  // Mock data for buyer's guide
  const featuredVehicles: VehicleData[] = mockNewCars.slice(0, 5).map((car, idx) => ({
    id: `vehicle-${idx}`,
    name: car.title,
    imageUrl: car.imageUrl,
    price: car.price,
    category: car.category,
    rating: 4 + (idx % 2 === 0 ? 0.5 : 0),
    year: car.year,
    features: ["Automatic", "AWD", idx % 2 === 0 ? "Hybrid" : "Turbo"],
    mpg: "28/34",
    horsepower: "280 hp",
    url: `/buyers-guide/${car.id}`,
    isSponsored: idx === 0,
    comparisonUrl: `/compare/${car.id}`
  }));

  // Mock data for trending comparisons
  const trendingComparisons: ComparisonItem[] = [
    {
      id: "comp-1",
      title: "Toyota RAV4 Prime vs Honda CR-V Hybrid",
      cars: ["Toyota RAV4 Prime", "Honda CR-V Hybrid"],
      imageUrls: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100&auto=format&fit=crop"
      ],
      views: "234K",
      url: "/compare/toyota-rav4-prime-vs-honda-crv-hybrid"
    },
    {
      id: "comp-2",
      title: "Ford F-150 Lightning vs Rivian R1T",
      cars: ["Ford F-150 Lightning", "Rivian R1T"],
      imageUrls: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1575992545359-ba20912b682f?w=100&auto=format&fit=crop"
      ],
      views: "189K",
      url: "/compare/ford-f150-lightning-vs-rivian-r1t"
    },
    {
      id: "comp-3",
      title: "BMW i4 vs Tesla Model 3",
      cars: ["BMW i4", "Tesla Model 3"],
      imageUrls: [
        "https://images.unsplash.com/photo-1523983254932-9845e3e6e51b?w=100&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593941707882-a5bba72a4a99?w=100&auto=format&fit=crop"
      ],
      views: "156K",
      url: "/compare/bmw-i4-vs-tesla-model-3"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <GlobalHeader />
        <main className="flex-1 p-4">
          <div className="mx-auto max-w-7xl">
            <div className="h-[500px] w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <GlobalHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 pt-6">
          <HeroCarousel items={heroItems} />
        </section>
        
        {/* Ad Banner */}
        <section className="mx-auto my-6 max-w-7xl px-4">
          <div className="relative">
            <AdPlaceholder height={100} label="Leaderboard Advertisement (970x90)" />
            <div className="absolute right-2 top-2">
              <SponsoredContentLabel variant="subtle" />
            </div>
          </div>
        </section>
        
        {/* Main Content Grid - 3 Columns */}
        <section className="mx-auto max-w-7xl px-4 pb-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Left Column - Latest News */}
            <div className="lg:col-span-1">
              <SectionHeader 
                title="Latest News" 
                icon={<Newspaper size={20} className="text-motortrend-red" />}
                viewAllUrl="/news"
              />
              
              <div className="space-y-4">
                {latestNews.slice(0, 6).map((item) => (
                  <NewsCard key={item.id} item={item} variant="compact" />
                ))}
              </div>
              
              <Button
                variant="outline"
                className="mt-4 w-full border-motortrend-red/30 text-motortrend-red hover:bg-motortrend-red/5"
              >
                View More News
              </Button>
            </div>
            
            {/* Middle Column - Featured Content */}
            <div className="lg:col-span-2">
              {/* Vehicle Finder Widget */}
              <div className="mb-6">
                <VehicleFinder onSearch={handleVehicleSearch} />
              </div>
              
              {/* Latest Reviews with Video Integration */}
              <div className="mb-6">
                <SectionHeader 
                  title="Latest Reviews" 
                  icon={<Star size={20} className="text-motortrend-red" />}
                  viewAllUrl="/reviews"
                />
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {latestNews.slice(0, 2).map((item, idx) => (
                    <NewsCard 
                      key={item.id} 
                      item={{
                        ...item,
                        hasVideo: true,
                        title: idx === 0 
                          ? "2024 Honda Accord Hybrid Review: The Smart Choice" 
                          : "Hyundai Santa Fe XRT Off-Road Review: Surprisingly Capable"
                      }} 
                    />
                  ))}
                </div>
              </div>
              
              {/* Native Ad - Sponsored Content */}
              <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Maximizing Your EV's Range in Winter</h3>
                  <SponsoredContentLabel />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1593941707882-a5bba72a4a99?w=500&auto=format&fit=crop" 
                      alt="EV Charging in Winter" 
                      className="mb-2 rounded-lg" 
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-gray-700">
                      Cold weather can significantly reduce your electric vehicle's range. These expert tips will help you maximize efficiency during winter months.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      Read Expert Advice
                    </Button>
                    <p className="mt-2 text-xs text-gray-500">Presented by ChargePoint</p>
                  </div>
                </div>
              </div>
              
              {/* Featured Video */}
              <div className="mb-6">
                <SectionHeader 
                  title="Featured Videos" 
                  icon={<Video size={20} className="text-motortrend-red" />}
                  viewAllUrl="/videos"
                />
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {featuredVideos.slice(0, 4).map((video) => (
                    <VideoCard key={video.id} video={video} size="medium" />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  className="mt-4 w-full border-motortrend-red/30 text-motortrend-red hover:bg-motortrend-red/5"
                >
                  More Videos
                </Button>
              </div>
              
              {/* Top Stories */}
              <div className="mb-6">
                <SectionHeader 
                  title="Top Stories" 
                  icon={<TrendingUp size={20} className="text-motortrend-red" />}
                  viewAllUrl="/news/top"
                />
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {latestNews.slice(2, 6).map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Buyer's Guide & Ads */}
            <div className="lg:col-span-1">
              {/* Buyer's Guide Spotlight */}
              <SectionHeader 
                title="Buyer's Guide" 
                icon={<Car size={20} className="text-motortrend-red" />}
                viewAllUrl="/buyers-guide"
              />
              
              <div className="space-y-4">
                {featuredVehicles.slice(0, 4).map((vehicle) => (
                  <BuyersGuideCard key={vehicle.id} vehicle={vehicle} compact />
                ))}
              </div>
              
              {/* Browse By Category Quick Links */}
              <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 flex items-center gap-1 font-bold">
                  <Tag size={16} className="text-motortrend-red" />
                  Browse By Category
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {["SUVs", "Sedans", "Trucks", "Electric", "Luxury", "Sports Cars"].map((category) => (
                    <a 
                      key={category}
                      href={`/buyers-guide/category/${category.toLowerCase().replace(" ", "-")}`}
                      className="rounded-md bg-gray-50 px-3 py-2 text-sm font-medium hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Trending Comparisons */}
              <div className="mt-6">
                <TrendingComparisons items={trendingComparisons} />
              </div>
              
              {/* Sidebar Ad */}
              <div className="mt-6 relative">
                <AdPlaceholder height={600} label="Sidebar Advertisement (300x600)" />
                <div className="absolute right-2 top-2">
                  <SponsoredContentLabel variant="subtle" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Car Reviews Section with Video Integration */}
        <section className="bg-gray-100 py-10">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader 
              title="Latest Car Reviews" 
              icon={<Star size={24} className="text-motortrend-red" />}
              viewAllUrl="/reviews"
            />
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredVehicles.slice(0, 3).map((vehicle, idx) => (
                <div key={vehicle.id} className="rounded-lg bg-white p-3 shadow-sm">
                  <div className="relative mb-3 h-48 overflow-hidden rounded">
                    <img 
                      src={vehicle.imageUrl} 
                      alt={vehicle.name} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 rounded bg-motortrend-red p-2 text-white">
                      <Video size={20} />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    <a href={vehicle.url} className="hover:text-motortrend-red">
                      {idx === 0 
                        ? "2024 Toyota Crown: Review & Road Test" 
                        : idx === 1 
                          ? "2023 Honda Pilot TrailSport Off-Road Review" 
                          : "2024 Kia EV9: First Drive Review"
                      }
                    </a>
                  </h3>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= (vehicle.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">Overall Rating: {vehicle.rating || 4}/5</span>
                  </div>
                  <Button 
                    className="bg-motortrend-red hover:bg-motortrend-red/90" 
                    size="sm"
                    asChild
                  >
                    <a href={`/reviews/${vehicle.id}`}>Watch Review</a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Full-Width Ad Banner */}
        <section className="py-6 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="relative">
              <AdPlaceholder height={250} label="Billboard Advertisement (970x250)" />
              <div className="absolute right-2 top-2">
                <SponsoredContentLabel variant="subtle" />
              </div>
            </div>
          </div>
        </section>
        
        {/* EV News & Coverage */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeader 
              title="Electric Vehicle News & Coverage" 
              icon={<Zap size={24} className="text-motortrend-red" />}
              viewAllUrl="/electric-vehicles"
            />
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <NewsCard 
                  item={{
                    id: "ev-main",
                    title: "The Future of EV Charging: 350kW Stations Rolling Out Nationwide",
                    excerpt: "A new network of ultra-fast charging stations is addressing range anxiety with charges that can add 200 miles in just 15 minutes.",
                    imageUrl: "https://images.unsplash.com/photo-1649972908249-800eb3800889?w=800&auto=format&fit=crop",
                    category: "EV Technology",
                    timestamp: "2 days ago",
                    author: "Sarah Johnson",
                    url: "/article/ev-charging-network-expansion",
                    hasVideo: true
                  }}
                />
              </div>
              
              {latestNews.slice(0, 2).map((item) => (
                <NewsCard 
                  key={item.id} 
                  item={{
                    ...item,
                    category: "Electric"
                  }}
                />
              ))}
              
              <div className="lg:col-span-4 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold">Trending EV Topics</h3>
                  <Separator className="flex-1" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    "Charging Infrastructure", "Battery Technology", "EV Tax Credits", 
                    "Tesla Updates", "Solid State Batteries", "Range Improvements", 
                    "Electric Trucks", "Home Charging", "EV vs Hybrid"
                  ].map((topic) => (
                    <a 
                      key={topic} 
                      href={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
                    >
                      {topic}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Recently Tested */}
        <section className="bg-gray-900 py-10 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <BarChart2 size={24} className="text-motortrend-red" />
                Recently Tested
              </h2>
              
              <a href="/car-reviews/tested" className="flex items-center gap-1 text-sm font-medium text-motortrend-red hover:underline">
                View All Test Results
                <ArrowRight size={14} />
              </a>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredVehicles.slice(0, 4).map((vehicle, idx) => (
                <div key={vehicle.id} className="overflow-hidden rounded-lg bg-gray-800 transition-transform hover:scale-105">
                  <div className="relative h-48">
                    <img 
                      src={vehicle.imageUrl} 
                      alt={vehicle.name} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-lg font-bold">
                        {vehicle.year} {vehicle.name.split(' ')[0]} {vehicle.name.split(' ')[1]}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-300">
                            {idx === 0 ? "0-60 mph:" : idx === 1 ? "Quarter Mile:" : idx === 2 ? "Braking 60-0:" : "MT Score:"}
                          </span>
                          <span className="font-bold text-white">
                            {idx === 0 ? "4.3 sec" : idx === 1 ? "12.9 sec" : idx === 2 ? "123 ft" : "8.9/10"}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-gray-600 text-white hover:bg-gray-700 hover:text-white"
                          asChild
                        >
                          <a href={`/tested/${vehicle.id}`}>View Results</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
