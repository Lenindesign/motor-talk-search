import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import CodeSnippet from './CodeSnippet';

// Import card components
import ArticleCard from '@/components/ArticleCard';
import CarCard, { CarData } from '@/components/CarCard';
import VideoCard from '@/components/VideoCard';
import PhotoCard from '@/components/PhotoCard';

type CardType = 'article' | 'newCar' | 'usedCar' | 'photo' | 'video';

// No props needed for this component, but using Record<string, never> instead of empty interface
type CardPlaygroundProps = Record<string, never>;

const CardPlayground: React.FC<CardPlaygroundProps> = () => {
  // State for selected card type
  const [selectedCardType, setSelectedCardType] = useState<CardType>('article');
  
  // Sample data for each card type
  const articleData = {
    id: 'art1',
    title: '2025 Porsche 911 GT3 RS First Drive: Track-Ready Performance',
    imageUrl: 'https://www.motortrend.com/files/679a40fb03dfa1000846f1f8/2025porsche911gt3weissach1.jpg',
    date: '2025-05-15',
    category: 'First Drives',
    author: 'Alex Rodriguez',
    readTime: '8 min read'
  };
  
  const newCarData: CarData = {
    id: '1',
    title: '2025 Tesla Model 3 Performance',
    imageUrl: 'https://media.ed.edmunds-media.com/tesla/model-3/2025/oem/2025_tesla_model-3_sedan_long-range_fq_oem_1_1600.jpg',
    price: '$54,990',
    category: 'Electric',
    year: '2025',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    location: 'San Francisco, CA',
    bodyStyle: 'Sedan',
    isNew: true,
    motorTrendScore: '9.2',
    motorTrendRank: '1',
    motorTrendCategoryRank: true,
    msrp: 'From $54,990',
    mpge: 'Up to 134 city / 126 highway',
    range: '315 to 341 mi battery-only',
    engine: 'Electric',
    horsepower: '450 to 510 hp',
    transmission: '1-speed automatic'
  };
  
  const usedCarData: CarData = {
    id: '2',
    title: '2022 Toyota Camry XSE',
    imageUrl: 'https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-23.jpg',
    price: '$28,500',
    category: 'Sedan',
    year: '2022',
    mileage: '15,000 miles',
    fuelType: 'Hybrid',
    drivetrain: 'FWD',
    dealerName: 'Toyota of Downtown LA',
    dealerLocation: 'Los Angeles, CA',
    location: 'Los Angeles, CA',
    bodyStyle: 'Sedan',
    isNew: false,
    motorTrendScore: '8.5',
    motorTrendRank: '3',
    motorTrendCategoryRank: true
  };
  
  // PhotoData only accepts specific props as defined in the PhotoCard component
  const photoData = {
    id: 'ph1',
    title: '2025 Porsche 911 GT3 RS - Track Ready',
    imageUrl: 'https://www.motortrend.com/files/679a40fb03dfa1000846f1f8/2025porsche911gt3weissach1.jpg',
    position: '1',
    make: 'Porsche',
    carModel: '911 GT3 RS',
    year: '2025',
    // Additional metadata for display purposes only
    _category: 'Sports Car',
    _photoCount: 24,
    _photographer: 'Michael Johnson',
    _date: '2025-04-02'
  };
  
  const videoData = {
    id: 'vid1',
    title: '2025 Rivian R2 Off-Road Test: Better Than a Jeep?',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65ebc644c7bc5b000866ad3e/0051-rivian-r2-first-look-fullcut-thumbnail-1920x1080.jpg',
    date: '2025-03-28',
    category: 'SUV',
    duration: '12:48',
    views: '245K',
    channelName: 'MotorTrend',
    description: 'We take the all-new Rivian R2 off-road to see how it compares to traditional off-roaders',
    url: '#video-player'
  };
  
  // State for customizable properties
  const [articleTitle, setArticleTitle] = useState(articleData.title);
  const [articleCategory, setArticleCategory] = useState(articleData.category);
  const [newCarTitle, setNewCarTitle] = useState(newCarData.title);
  const [newCarPrice, setNewCarPrice] = useState(newCarData.price);
  const [usedCarTitle, setUsedCarTitle] = useState(usedCarData.title);
  const [usedCarPrice, setUsedCarPrice] = useState(usedCarData.price);
  const [usedCarMileage, setUsedCarMileage] = useState(usedCarData.mileage || '');
  const [photoTitle, setPhotoTitle] = useState(photoData.title);
  const [photoCount, setPhotoCount] = useState(photoData._photoCount);
  const [videoTitle, setVideoTitle] = useState(videoData.title);
  const [videoDuration, setVideoDuration] = useState(videoData.duration);
  
  // Generate code snippet based on selected card type
  const generateCodeSnippet = () => {
    switch (selectedCardType) {
      case 'article':
        return {
          tsx: `<ArticleCard 
  article={{
    id: 'art1',
    title: '${articleTitle}',
    imageUrl: '${articleData.imageUrl}',
    date: '${articleData.date}',
    category: '${articleCategory}',
    author: '${articleData.author}',
    readTime: '${articleData.readTime}'
  }} 
/>`
        };
      
      case 'newCar':
        return {
          tsx: `<CarCard 
  car={{
    id: '1',
    title: '${newCarTitle}',
    imageUrl: '${newCarData.imageUrl}',
    price: '${newCarPrice}',
    category: '${newCarData.category}',
    year: '${newCarData.year}',
    fuelType: '${newCarData.fuelType}',
    drivetrain: '${newCarData.drivetrain}',
    location: '${newCarData.location}',
    bodyStyle: '${newCarData.bodyStyle}',
    isNew: true,
    motorTrendScore: '${newCarData.motorTrendScore}',
    motorTrendRank: '${newCarData.motorTrendRank}'
  }}
  type="new"
/>`
        };
      
      case 'usedCar':
        return {
          tsx: `<CarCard 
  car={{
    id: '2',
    title: '${usedCarTitle}',
    imageUrl: '${usedCarData.imageUrl}',
    price: '${usedCarPrice}',
    category: '${usedCarData.category}',
    year: '${usedCarData.year}',
    mileage: '${usedCarMileage}',
    fuelType: '${usedCarData.fuelType}',
    drivetrain: '${usedCarData.drivetrain}',
    dealerName: '${usedCarData.dealerName}',
    dealerLocation: '${usedCarData.dealerLocation}',
    isNew: false
  }}
  type="used"
/>`
        };
      
      case 'photo':
        return {
          tsx: `<PhotoCard 
  photo={{
    id: 'ph1',
    title: '${photoTitle}',
    imageUrl: '${photoData.imageUrl}',
    position: '${photoData.position}',
    make: '${photoData.make}',
    carModel: '${photoData.carModel}',
    year: '${photoData.year}'
    // Note: photoCount, date, category, and photographer aren't part of the PhotoData interface
    // but would be displayed in the UI
  }}
/>`
        };
      
      case 'video':
        return {
          tsx: `<VideoCard 
  video={{
    id: 'vid1',
    title: '${videoTitle}',
    imageUrl: '${videoData.imageUrl}',
    date: '${videoData.date}',
    category: '${videoData.category}',
    duration: '${videoDuration}',
    channelName: '${videoData.channelName}'
  }}
/>`
        };
      
      default:
        return { tsx: '' };
    }
  };
  
  // Render the selected card preview
  const renderCardPreview = () => {
    switch (selectedCardType) {
      case 'article':
        return (
          <ArticleCard 
            article={{
              ...articleData,
              title: articleTitle,
              category: articleCategory
            }} 
          />
        );
      
      case 'newCar':
        return (
          <CarCard 
            car={{
              ...newCarData,
              title: newCarTitle,
              price: newCarPrice
            }}
            type="new"
          />
        );
      
      case 'usedCar':
        return (
          <CarCard 
            car={{
              ...usedCarData,
              title: usedCarTitle,
              price: usedCarPrice,
              mileage: usedCarMileage
            }}
            type="used"
          />
        );
      
      case 'photo':
        return (
          <PhotoCard 
            photo={{
              ...photoData,
              title: photoTitle
              // photoCount is not part of the PhotoData interface
            }}
          />
        );
      
      case 'video':
        return (
          <VideoCard 
            video={{
              ...videoData,
              title: videoTitle,
              duration: videoDuration
            }}
          />
        );
      
      default:
        return null;
    }
  };
  
  // Render properties panel based on selected card type
  const renderPropertiesPanel = () => {
    switch (selectedCardType) {
      case 'article':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="article-title" className="typography-body-small">Title</Label>
              <Input
                id="article-title"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="article-category" className="typography-body-small">Category</Label>
              <Select
                value={articleCategory}
                onValueChange={setArticleCategory}
              >
                <SelectTrigger id="article-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Drives">First Drives</SelectItem>
                  <SelectItem value="Reviews">Reviews</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Features">Features</SelectItem>
                  <SelectItem value="Buyer's Guide">Buyer's Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'newCar':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-car-title" className="typography-body-small">Title</Label>
              <Input
                id="new-car-title"
                value={newCarTitle}
                onChange={(e) => setNewCarTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-car-price" className="typography-body-small">Price</Label>
              <Input
                id="new-car-price"
                value={newCarPrice}
                onChange={(e) => setNewCarPrice(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'usedCar':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="used-car-title" className="typography-body-small">Title</Label>
              <Input
                id="used-car-title"
                value={usedCarTitle}
                onChange={(e) => setUsedCarTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="used-car-price" className="typography-body-small">Price</Label>
              <Input
                id="used-car-price"
                value={usedCarPrice}
                onChange={(e) => setUsedCarPrice(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="used-car-mileage" className="typography-body-small">Mileage</Label>
              <Input
                id="used-car-mileage"
                value={usedCarMileage}
                onChange={(e) => setUsedCarMileage(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'photo':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="photo-title" className="typography-body-small">Title</Label>
              <Input
                id="photo-title"
                value={photoTitle}
                onChange={(e) => setPhotoTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="photo-count" className="typography-body-small">Photo Count (Display Only)</Label>
              <Input
                id="photo-count"
                type="number"
                value={photoCount}
                onChange={(e) => setPhotoCount(Number(e.target.value))}
              />
              <p className="typography-caption text-neutral-4">Note: This is for display purposes only and doesn't affect the component props</p>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-title" className="typography-body-small">Title</Label>
              <Input
                id="video-title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="video-duration" className="typography-body-small">Duration</Label>
              <Input
                id="video-duration"
                value={videoDuration}
                onChange={(e) => setVideoDuration(e.target.value)}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="typography-title">Card Playground</CardTitle>
          <CardDescription className="typography-body-small text-color-neutral-3">
            Customize and test different card components with various properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="typography-body">Card Type</Label>
              <Tabs 
                value={selectedCardType} 
                onValueChange={(value) => setSelectedCardType(value as CardType)}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
                  <TabsTrigger value="article">Article</TabsTrigger>
                  <TabsTrigger value="newCar">New Car</TabsTrigger>
                  <TabsTrigger value="usedCar">Used Car</TabsTrigger>
                  <TabsTrigger value="photo">Photo</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Properties Panel */}
              <div className="space-y-6">
                <div className="typography-subtitle mb-4">Properties</div>
                {renderPropertiesPanel()}
              </div>
              
              {/* Preview Panel */}
              <div className="md:col-span-2 space-y-6">
                <div className="typography-subtitle mb-4">Preview</div>
                
                <div className="border rounded-md p-4 md:p-6 bg-color-neutral-8">
                  <div className="max-w-md mx-auto">
                    {renderCardPreview()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="typography-subtitle">Code</div>
                  <Tabs defaultValue="tsx">
                    <TabsList>
                      <TabsTrigger value="tsx">TSX</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tsx">
                      <CodeSnippet code={generateCodeSnippet().tsx} language="tsx" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardPlayground;
