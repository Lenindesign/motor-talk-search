
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GarageStats from '@/components/GarageStats';
import ArticleCard from '@/components/ArticleCard';
import { CarData } from '@/components/CarCard';
import GarageCarCard from '@/components/CarCard';
import VideoCard from '@/components/VideoCard';
import PhotoCard from '@/components/PhotoCard';

const CardsTab = () => {
  // New Car Card Sample Data
  const sampleNewCarData: CarData = {
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
    motorTrendScore: 9.2,
    motorTrendRank: 1,
    motorTrendCategoryRank: 1
  };

  // Used Car Card Sample Data
  const sampleUsedCarData: CarData = {
    id: '2',
    title: '2022 Toyota Camry XSE',
    imageUrl: 'https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-23.jpg',
    price: '$28,500',
    category: 'Sedan',
    year: '2022',
    mileage: '15,000 miles',
    fuelType: 'Hybrid',
    drivetrain: 'FWD',
    location: 'Los Angeles, CA',
    bodyStyle: 'Sedan',
    isNew: false,
    motorTrendScore: 8.5,
    motorTrendRank: 3,
    motorTrendCategoryRank: 1
  };

  // Generic Car Card Sample Data (could be new or used)
  const sampleCarData: CarData = {
    id: '3',
    title: '2024 Ford Mustang GT',
    imageUrl: 'https://www.motortrend.com/uploads/2023/08/003-2024-Mustang-GT-6MT-front-three-quarters-in-action.jpg',
    price: '$46,800',
    category: 'Sports Car',
    year: '2024',
    fuelType: 'Gasoline',
    drivetrain: 'RWD',
    location: 'Detroit, MI',
    bodyStyle: 'Coupe',
    isNew: true,
    motorTrendScore: 8.8,
    motorTrendRank: 2,
    motorTrendCategoryRank: 1
  };

  // Article Card Sample Data
  const sampleArticle = {
    id: 'art1',
    title: 'Best SUVs for Families in 2025',
    imageUrl: 'https://www.motortrend.com/files/67eeb24ae58cfc000822372c/bestmidsizesuvs.jpg',
    date: '2025-03-15',
    category: 'SUV',
    author: 'Jane Smith',
    readTime: '5 min read'
  };

  // Photo Card Sample Data
  const samplePhoto = {
    id: 'ph1',
    title: '2025 Porsche 911 GT3 RS - Track Ready',
    imageUrl: 'https://www.motortrend.com/files/679a40fb03dfa1000846f1f8/2025porsche911gt3weissach1.jpg',
    date: '2025-04-02',
    category: 'Sports Car',
    photoCount: 24,
    photographer: 'Michael Johnson',
    // Required properties for PhotoCard
    position: '1',
    make: 'Porsche',
    carModel: '911 GT3 RS',
    year: '2025'
  };

  // Video Card Sample Data
  const sampleVideo = {
    id: 'vid1',
    title: '2025 Rivian R2 Off-Road Test: Better Than a Jeep?',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65ebc644c7bc5b000866ad3e/0051-rivian-r2-first-look-fullcut-thumbnail-1920x1080.jpg',
    date: '2025-03-28',
    category: 'SUV',
    duration: '12:48',
    views: '245K',
    channelName: 'MotorTrend',
    // Additional props that might be required by VideoCard
    description: 'We take the all-new Rivian R2 off-road to see how it compares to traditional off-roaders',
    url: '#video-player'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Cards</CardTitle>
          <CardDescription>All six card types used throughout the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* New Car Card */}
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">New Car Card</h4>
            <p className="text-neutral-4 text-sm mb-4">Displays new car listings with pricing, specs, and MT ratings</p>
            <div className="max-w-md">
              <GarageCarCard car={sampleNewCarData} type="new" />
            </div>
            <div className="mt-4 bg-neutral-9 p-4 rounded-md">
              <h5 className="font-medium mb-2">Elements:</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>New badge:</strong> Indicates factory-new vehicle</li>
                <li>• <strong>Hero image:</strong> Professional vehicle photography</li>
                <li>• <strong>Price:</strong> MSRP with prominent display</li>
                <li>• <strong>MT Rating:</strong> Expert score from MotorTrend</li>
                <li>• <strong>Key specs:</strong> Year, drivetrain, body style</li>
                <li>• <strong>Garage actions:</strong> Add to personal collection</li>
              </ul>
            </div>
          </div>
          <Separator />

          {/* Used Car Card */}
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Used Car Card</h4>
            <p className="text-neutral-4 text-sm mb-4">Displays pre-owned vehicles with mileage, condition, and location</p>
            <div className="max-w-md">
              <GarageCarCard car={sampleUsedCarData} type="used" />
            </div>
            <div className="mt-4 bg-neutral-9 p-4 rounded-md">
              <h5 className="font-medium mb-2">Elements:</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Used indicator:</strong> Shows pre-owned status</li>
                <li>• <strong>Mileage display:</strong> Odometer reading</li>
                <li>• <strong>Location:</strong> Where the vehicle is available</li>
                <li>• <strong>Price:</strong> Current asking price</li>
                <li>• <strong>History indicators:</strong> Accident history, owners</li>
                <li>• <strong>Condition rating:</strong> Vehicle condition assessment</li>
              </ul>
            </div>
          </div>
          <Separator />

          {/* Generic Car Card */}
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Car Card (Alternative Style)</h4>
            <p className="text-neutral-4 text-sm mb-4">Alternative styling for new car cards used in search results and comparisons</p>
            <div className="max-w-md">
              <GarageCarCard car={sampleCarData} type="new" />
            </div>
            <div className="mt-4 bg-neutral-9 p-4 rounded-md">
              <h5 className="font-medium mb-2">Elements:</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Vehicle photo:</strong> Main exterior shot</li>
                <li>• <strong>Model name:</strong> Make, model, and trim</li>
                <li>• <strong>Price range:</strong> MSRP or market value</li>
                <li>• <strong>Basic specs:</strong> Year, category, fuel type</li>
                <li>• <strong>Compare button:</strong> Add to comparison tool</li>
                <li>• <strong>Save option:</strong> Bookmark for later viewing</li>
              </ul>
            </div>
          </div>
          <Separator />

          {/* Article Card */}
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Article Card</h4>
            <p className="text-neutral-4 text-sm mb-4">Displays editorial content with category, date, and reading time</p>
            <div className="max-w-md">
              <ArticleCard article={sampleArticle} />
            </div>
            <div className="mt-4 bg-neutral-9 p-4 rounded-md">
              <h5 className="font-medium mb-2">Elements:</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Featured image:</strong> High-quality article thumbnail</li>
                <li>• <strong>Headline:</strong> Article title with line clamping</li>
                <li>• <strong>Category badge:</strong> Article topic classification</li>
                <li>• <strong>Publication date:</strong> When the article was published</li>
                <li>• <strong>Author attribution:</strong> Writer's name</li>
                <li>• <strong>Read time:</strong> Estimated reading duration</li>
              </ul>
            </div>
          </div>
          <Separator />

          {/* Photo Card */}
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Photo Card</h4>
            <p className="text-neutral-4 text-sm mb-4">Showcases vehicle photography with gallery indicators</p>
            <div className="max-w-md">
              <PhotoCard photo={samplePhoto} />
            </div>
            <div className="mt-4 bg-neutral-9 p-4 rounded-md">
              <h5 className="font-medium mb-2">Elements:</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Gallery preview:</strong> Lead image from collection</li>
                <li>• <strong>Photo count:</strong> Number of images in gallery</li>
                <li>• <strong>Vehicle identification:</strong> Make, model, year</li>
                <li>• <strong>Caption:</strong> Brief descriptive text</li>
                <li>• <strong>Photographer credit:</strong> Image attribution</li>
                <li>• <strong>Gallery indicator:</strong> Visual cue for multiple photos</li>
              </ul>
            </div>
          </div>
          <Separator />

          {/* Video Card */}
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Video Card</h4>
            <p className="text-neutral-4 text-sm mb-4">Presents video content with duration, views, and channel information</p>
            <div className="max-w-md">
              <VideoCard video={sampleVideo} />
            </div>
            <div className="mt-4 bg-neutral-9 p-4 rounded-md">
              <h5 className="font-medium mb-2">Elements:</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Thumbnail:</strong> Video preview image</li>
                <li>• <strong>Play button:</strong> Prominent video indicator</li>
                <li>• <strong>Duration:</strong> Length of video content</li>
                <li>• <strong>View count:</strong> Popularity metric</li>
                <li>• <strong>Title:</strong> Video headline with hover effect</li>
                <li>• <strong>Channel attribution:</strong> Content creator</li>
                <li>• <strong>Date published:</strong> When video was uploaded</li>
              </ul>
            </div>
          </div>
          <Separator />

          {/* Garage Stats Component */}
          <div>
            <h4 className="typography-title text-neutral-1 mb-2">Garage Stats</h4>
            <p className="text-neutral-4 text-sm mb-4">Summary component for user's saved vehicles</p>
            <GarageStats />
            <div className="mt-4 bg-neutral-9 p-4 rounded-md">
              <h5 className="font-medium mb-2">Elements:</h5>
              <ul className="text-sm space-y-1">
                <li>• <strong>Count indicators:</strong> Number of vehicles by status</li>
                <li>• <strong>Status categories:</strong> Owned, Test driven, Interested</li>
                <li>• <strong>Visual indicators:</strong> Icons and progress bars</li>
                <li>• <strong>Interactive elements:</strong> Quick filters to garage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card Anatomy</CardTitle>
          <CardDescription>Structure and components of content cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="typography-title text-neutral-1">Card Elements</h4>
              <ul className="typography-body text-neutral-4 space-y-2">
                <li>• <strong>Image:</strong> 16:9 aspect ratio, optimized loading</li>
                <li>• <strong>Title:</strong> Typography-title, line clamp for overflow</li>
                <li>• <strong>Metadata:</strong> Small text with icons</li>
                <li>• <strong>Actions:</strong> Save, share, and menu buttons</li>
                <li>• <strong>Badges:</strong> Status indicators and categories</li>
                <li>• <strong>Price:</strong> Prominent pricing display</li>
                <li>• <strong>Rating:</strong> Expert or user scoring indicators</li>
                <li>• <strong>Timestamps:</strong> Publication or listing dates</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="typography-title text-neutral-1">Interactive States</h4>
              <ul className="typography-body text-neutral-4 space-y-2">
                <li>• <strong>Hover:</strong> Subtle shadow elevation</li>
                <li>• <strong>Focus:</strong> Keyboard accessibility outline</li>
                <li>• <strong>Loading:</strong> Skeleton states</li>
                <li>• <strong>Saved:</strong> Visual indication of saved state</li>
                <li>• <strong>Error:</strong> Fallback images and states</li>
                <li>• <strong>Disabled:</strong> Unavailable or sold items</li>
                <li>• <strong>New:</strong> Freshly added content indicators</li>
                <li>• <strong>Featured:</strong> Highlighted premium content</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="typography-title text-neutral-1 mb-3">Card Type Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-neutral-8">
                    <th className="p-3 text-left">Card Type</th>
                    <th className="p-3 text-left">Primary Purpose</th>
                    <th className="p-3 text-left">Unique Elements</th>
                    <th className="p-3 text-left">Typical Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-7">
                    <td className="p-3 font-medium">New Car</td>
                    <td className="p-3">MSRP and feature showcase</td>
                    <td className="p-3">New badge, MT rating, trim options</td>
                    <td className="p-3">Add to garage, build & price, compare</td>
                  </tr>
                  <tr className="border-b border-neutral-7">
                    <td className="p-3 font-medium">Used Car</td>
                    <td className="p-3">Pre-owned vehicle listings</td>
                    <td className="p-3">Mileage, condition, history</td>
                    <td className="p-3">Contact seller, save, get directions</td>
                  </tr>
                  <tr className="border-b border-neutral-7">
                    <td className="p-3 font-medium">Article</td>
                    <td className="p-3">Editorial content</td>
                    <td className="p-3">Author, read time, publish date</td>
                    <td className="p-3">Read, share, save for later</td>
                  </tr>
                  <tr className="border-b border-neutral-7">
                    <td className="p-3 font-medium">Photo</td>
                    <td className="p-3">Image galleries</td>
                    <td className="p-3">Photo count, gallery indicator</td>
                    <td className="p-3">View gallery, download, share</td>
                  </tr>
                  <tr className="border-b border-neutral-7">
                    <td className="p-3 font-medium">Video</td>
                    <td className="p-3">Video content</td>
                    <td className="p-3">Duration, play button, views</td>
                    <td className="p-3">Play, add to playlist, share</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardsTab;
