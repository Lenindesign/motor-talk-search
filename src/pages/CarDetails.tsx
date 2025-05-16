
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Share2, ChevronRight, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSavedItems } from "../contexts/SavedItemsContext";
import CarReviews from "../components/reviews/CarReviews";
import WriteReviewDialog from "../components/reviews/WriteReviewDialog";
import MainNavigation from "../components/MainNavigation";
import MotorTrendScore from "../components/car-specs/MotorTrendScore";
import { mockNewCars, mockUsedCars } from "../services/mockData";
import { CarData } from "../components/CarCard";

const CarDetails = () => {
  const { carId } = useParams<{ carId: string }>();
  const { toast } = useToast();
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const { savedItems } = useSavedItems();
  
  // Find car in mock data
  const allCars = [...mockNewCars, ...mockUsedCars];
  const car = allCars.find(c => c.id === carId) || {
    id: "not-found",
    title: "Car not found",
    imageUrl: "/placeholder.svg",
    price: "$0",
    category: "Unknown",
    year: "Unknown",
    bodyStyle: "Sedan" as any,
    motorTrendScore: 0,
    motorTrendRank: 0
  };
  
  // Check if car is saved
  const isSaved = savedItems.some(item => item.id === carId);
  
  // Find or generate mock reviews
  const mockReviews = [
    {
      id: "review1",
      userName: "CarEnthusiast",
      userAvatar: "/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png",
      rating: 4.5,
      title: "Great daily driver with impressive fuel economy",
      content: "I've been driving this car for about 6 months now and I'm really impressed with the fuel economy. It's perfect for my daily commute and weekend trips. The infotainment system is intuitive and the safety features give me peace of mind.",
      date: "2024-04-15",
      helpfulCount: 24,
      carId: carId || "",
      carMake: car.title.split(" ")[0],
      carModel: car.title.split(" ").slice(1).join(" "),
      carYear: car.year || "2024"
    },
    {
      id: "review2",
      userName: "SpeedDemon",
      userAvatar: undefined,
      rating: 3.5,
      title: "Good performance but interior quality could be better",
      content: "The engine performance is quite good for the price point, but I'm disappointed with some of the interior materials. There are a few too many hard plastics for my liking. Handling is responsive though, and the tech features are up to date.",
      date: "2024-03-22",
      helpfulCount: 16,
      carId: carId || "",
      carMake: car.title.split(" ")[0],
      carModel: car.title.split(" ").slice(1).join(" "),
      carYear: car.year || "2024"
    }
  ];
  
  // Handle share functionality
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Car details link has been copied to clipboard"
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-motortrend-dark px-6 py-4 text-white">
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" 
                alt="MotorTrend Logo" 
                className="h-7 w-auto mr-6"
              />
              <MainNavigation />
            </div>
          </div>
        </div>
      </header>
      
      {/* Breadcrumbs */}
      <div className="bg-motortrend-gray py-2 px-6 border-b">
        <div className="max-w-[980px] mx-auto">
          <div className="flex text-sm text-gray-500">
            <a href="/" className="hover:text-motortrend-red">Home</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href="/cars" className="hover:text-motortrend-red">Cars</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-motortrend-dark font-medium truncate">{car.title}</span>
          </div>
        </div>
      </div>
      
      <main className="max-w-[980px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Car Image and Primary Info */}
          <div className="col-span-2">
            <div className="relative">
              <img 
                src={car.imageUrl} 
                alt={car.title}
                className="w-full aspect-[16/9] object-cover rounded-lg mb-4"
              />
              {car.motorTrendScore && car.motorTrendRank && (
                <div className="absolute top-4 left-4">
                  <MotorTrendScore score={car.motorTrendScore} rank={car.motorTrendRank} />
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{car.title}</h1>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="outline" className="bg-motortrend-red text-white">
                    {car.category}
                  </Badge>
                  {car.bodyStyle && (
                    <Badge variant="outline">
                      {car.bodyStyle}
                    </Badge>
                  )}
                  {car.year && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {car.year}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xl font-bold">{car.price}</div>
            </div>
            
            {/* Tabs for different sections */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews
                  <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                    {mockReviews.length}
                  </span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                    <p>
                      The {car.title} combines cutting-edge technology with dynamic performance.
                      Designed with both drivers and passengers in mind, it offers a blend of
                      comfort, efficiency, and modern features that make every journey enjoyable.
                    </p>
                    <p>
                      With its sleek design and impressive specifications, this vehicle stands out
                      in the {car.category} category. The interior provides ample space while
                      maintaining an elegant aesthetic, complemented by advanced infotainment and
                      safety systems.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {car.horsepowerTorque && (
                        <div className="text-sm">
                          <p className="font-medium">Performance</p>
                          <p className="text-gray-600">{car.horsepowerTorque}</p>
                        </div>
                      )}
                      
                      {car.fuelType && (
                        <div className="text-sm">
                          <p className="font-medium">Fuel Type</p>
                          <p className="text-gray-600">{car.fuelType}</p>
                        </div>
                      )}
                      
                      {car.drivetrain && (
                        <div className="text-sm">
                          <p className="font-medium">Drivetrain</p>
                          <p className="text-gray-600">{car.drivetrain}</p>
                        </div>
                      )}
                      
                      {car.bodyStyle === "SUV" && car.cargoCapacity && (
                        <div className="text-sm">
                          <p className="font-medium">Cargo Capacity</p>
                          <p className="text-gray-600">{car.cargoCapacity}</p>
                        </div>
                      )}
                      
                      {car.bodyStyle === "Sedan" && car.trunkCapacity && (
                        <div className="text-sm">
                          <p className="font-medium">Trunk Capacity</p>
                          <p className="text-gray-600">{car.trunkCapacity}</p>
                        </div>
                      )}
                      
                      {car.bodyStyle === "Truck" && car.towingCapacity && (
                        <div className="text-sm">
                          <p className="font-medium">Towing Capacity</p>
                          <p className="text-gray-600">{car.towingCapacity}</p>
                        </div>
                      )}
                      
                      {car.bodyStyle === "Sports Car" && car.zeroToSixty && (
                        <div className="text-sm">
                          <p className="font-medium">0-60 mph</p>
                          <p className="text-gray-600">{car.zeroToSixty}</p>
                        </div>
                      )}
                      
                      {car.bodyStyle === "Minivan" && car.familyFeatures && (
                        <div className="text-sm">
                          <p className="font-medium">Family Features</p>
                          <p className="text-gray-600">{car.familyFeatures}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">User Reviews</h3>
                  <Button 
                    onClick={() => setReviewDialogOpen(true)} 
                    className="bg-motortrend-red hover:bg-motortrend-red/90"
                  >
                    Write a Review
                  </Button>
                </div>
                <CarReviews 
                  carId={carId || ""} 
                  carName={car.title} 
                  reviews={mockReviews} 
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="col-span-1">
            <Card className="mb-4">
              <CardContent className="pt-4">
                <div className="flex flex-col space-y-4">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => setReviewDialogOpen(true)}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Write Review
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      const newWindow = window.open(`#/reviews/${carId}`, '_blank');
                      if (newWindow) newWindow.focus();
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View All Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Similar Cars */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Similar Cars</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {allCars
                    .filter(c => 
                      c.id !== carId && 
                      c.category === car.category && 
                      c.bodyStyle === car.bodyStyle
                    )
                    .slice(0, 3)
                    .map(similarCar => (
                      <a 
                        key={similarCar.id} 
                        href={`#/cars/${similarCar.id}`}
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50"
                      >
                        <img 
                          src={similarCar.imageUrl}
                          alt={similarCar.title}
                          className="h-12 w-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{similarCar.title}</p>
                          <p className="text-xs text-gray-500">{similarCar.price}</p>
                        </div>
                      </a>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Write Review Dialog */}
      <WriteReviewDialog 
        open={reviewDialogOpen} 
        onOpenChange={setReviewDialogOpen}
        carId={carId || ""}
        carTitle={car.title}
      />
    </div>
  );
};

export default CarDetails;
