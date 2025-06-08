import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSavedItems, SavedItem, SavedItemType } from "../contexts/SavedItemsContext";
import { usePersonalization } from "../contexts/PersonalizationContext";
import MainNavigation from "../components/MainNavigation";
import { useIsMobile } from "../hooks/use-mobile";
import SearchBar from "../components/SearchBar";
import PersonalizationDialog from "../components/PersonalizationDialog";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import RecentActivity from "../components/RecentActivity";
import UserAchievements from "../components/UserAchievements";
import UserPoints from "../components/UserPoints";
import { User, Settings, Car, Bookmark, Palette, Activity, Award } from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import CarCard from "../components/CarCard";
import PhotoCard from "../components/PhotoCard";
import VideoCard from "../components/VideoCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MyGarageSkinny from "../components/profile/MyGarageSkinny";
import GarageContent from '../components/garage/GarageContent';

const Profile = () => {
  const { savedItems, removeSavedItem } = useSavedItems();
  const { preferences } = usePersonalization();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("saved");
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(localStorage.getItem("userProfileImage") || undefined);

  // Filter by current tab - fix the filter logic
  const [filterType, setFilterType] = useState<SavedItemType | 'all'>('all');

  // Save profile image to localStorage when it changes
  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("userProfileImage", profileImage);
    }
  }, [profileImage]);

  // Set default name to Greg Driver if not already set
  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      localStorage.setItem("userName", "Greg Driver");
    }
    if (!localStorage.getItem("userEmail")) {
      localStorage.setItem("userEmail", "greg.driver@example.com");
    }
  }, []);

  // Form setup for account settings
  const form = useForm({
    defaultValues: {
      name: localStorage.getItem("userName") || "Greg Driver",
      email: localStorage.getItem("userEmail") || "greg.driver@example.com"
    }
  });

  const onSubmit = (data: { name: string; email: string; }) => {
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    console.log("Profile updated:", data);
  };

  // Mock user data - in a real app, this would come from auth context or API
  const userData = {
    name: form.watch("name"),
    email: form.watch("email"),
    avatar: "https://d2kde5ohu8qb21.cloudfront.net/files/6839e7e53277480008013d30/greg.jpg",
    joined: "January 2023"
  };

  const handleUnsave = (id: string, type: SavedItemType) => {
    removeSavedItem(id, type);
  };

  // Fix the filter function to properly handle all item types
  const filterItemsByType = (type: SavedItemType | 'all') => {
    if (type === 'all') return savedItems;
    
    // Handle car types - both newCar and usedCar should be shown when filtering for either
    if (type === 'newCar') {
      return savedItems.filter(item => item.type === 'newCar');
    }
    if (type === 'usedCar') {
      return savedItems.filter(item => item.type === 'usedCar');
    }
    
    // Handle other content types
    return savedItems.filter(item => item.type === type);
  };

  const filteredItems = filterItemsByType(filterType);

  return (
    <>
      <div className="min-h-screen bg-motortrend-gray">
        <main className="mx-auto px-0 py-0 pt-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <aside className="w-full md:w-64 space-y-6 px-[8px]">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
                      <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="typography-title">{userData.name}</h2>
                    <p className="typography-caption text-neutral-4 mt-1">Member since {userData.joined}</p>
                    
                    <div className="w-full mt-6 flex justify-between items-center">
                      <span className="typography-caption">Saved Items</span>
                      <span className="typography-body-large">{savedItems.length}</span>
                    </div>
                    
                    <div className="w-full mt-4 space-y-3">
                      <Button variant="solid-primary" size="sm" className="w-full flex items-center justify-center gap-2 typography-caption">
                        <User size={16} />
                        Profile
                      </Button>
                      
                      <Button variant="ghost-black" size="sm" onClick={() => setPersonalizationOpen(true)} className="w-full flex items-center justify-center gap-2 typography-caption">
                        <Palette size={16} />
                        Personalize
                      </Button>
                      
                      <Button variant="ghost-black" size="sm" className="w-full flex items-center justify-center gap-2 typography-caption">
                        <Settings size={16} />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <UserPoints />
              
              <MyGarageSkinny />
            </aside>
            
            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="saved" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none overflow-x-auto whitespace-nowrap scrollbar-hide flex-nowrap">
                  <TabsTrigger value="saved" className="flex items-center gap-1">
                    <Bookmark size={16} />
                    <span>Saved Items</span>
                  </TabsTrigger>
                  <TabsTrigger value="garage" className="flex items-center gap-1">
                    <Car size={16} />
                    <span>My Garage</span>
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex items-center gap-1">
                    <Activity size={16} />
                    <span>Recent Activity</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-1">
                    <Award size={16} />
                    <span>Achievements</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-1">
                    <Settings size={16} />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="saved" className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="mb-4">
                      <h2 className="typography-title mb-3">Saved Items</h2>
                      <div className="overflow-x-auto hide-scrollbar">
                        <div className="flex gap-2 pb-2 whitespace-nowrap">
                          <Button 
                            variant={filterType === "all" ? "solid-primary" : "outline-black"} 
                            size="sm" 
                            onClick={() => setFilterType("all")}
                            className="flex-shrink-0"
                          >
                            All ({savedItems.length})
                          </Button>
                          <Button 
                            variant={filterType === "article" ? "solid-primary" : "outline-black"} 
                            size="sm" 
                            onClick={() => setFilterType("article")}
                            className="flex-shrink-0"
                          >
                            Articles ({savedItems.filter(item => item.type === 'article').length})
                          </Button>
                          <Button 
                            variant={filterType === "newCar" ? "solid-primary" : "ghost-black"} 
                            size="sm" 
                            onClick={() => setFilterType("newCar")}
                            className="flex-shrink-0"
                          >
                            New Cars ({savedItems.filter(item => item.type === 'newCar').length})
                          </Button>
                          <Button 
                            variant={filterType === "usedCar" ? "solid-primary" : "ghost-black"} 
                            size="sm" 
                            onClick={() => setFilterType("usedCar")}
                            className="flex-shrink-0"
                          >
                            Used Cars ({savedItems.filter(item => item.type === 'usedCar').length})
                          </Button>
                          <Button 
                            variant={filterType === "photo" ? "solid-red" : "ghost-red"} 
                            size="sm" 
                            onClick={() => setFilterType("photo")}
                            className="flex-shrink-0"
                          >
                            Photos ({savedItems.filter(item => item.type === 'photo').length})
                          </Button>
                          <Button 
                            variant={filterType === "video" ? "solid-red" : "ghost-red"} 
                            size="sm" 
                            onClick={() => setFilterType("video")}
                            className="flex-shrink-0"
                          >
                            Videos ({savedItems.filter(item => item.type === 'video').length})
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {filteredItems.length === 0 ? (
                      <div className="text-center py-10">
                        <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          {filterType === 'all' ? 'No saved items yet' : `No ${filterType === 'newCar' ? 'new cars' : filterType === 'usedCar' ? 'used cars' : filterType + 's'} saved yet`}
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          {filterType === 'all' 
                            ? 'Use the bookmark button on articles, cars, videos, and photos to collect them here'
                            : `Save some ${filterType === 'newCar' ? 'new cars' : filterType === 'usedCar' ? 'used cars' : filterType + 's'} to see them here`
                          }
                        </p>
                        <Button onClick={() => navigate("/")} className="mt-4 text-white bg-color-primary-1 hover:bg-color-primary-2 bg-black">
                          Browse Content
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {filteredItems.map(item => {
                          switch (item.type) {
                            case 'article':
                              return (
                                <ArticleCard 
                                  key={item.id} 
                                  article={{
                                    id: item.id,
                                    imageUrl: item.imageUrl,
                                    title: item.title,
                                    date: item.metadata?.date || '',
                                    category: item.metadata?.category || '',
                                    featured: item.metadata?.featured,
                                    photoCount: item.metadata?.photoCount
                                  }} 
                                />
                              );
                            case 'photo':
                              return (
                                <PhotoCard 
                                  key={item.id} 
                                  photo={{
                                    id: item.id,
                                    imageUrl: item.imageUrl,
                                    title: item.title,
                                    position: item.metadata?.position || '',
                                    make: item.metadata?.make || '',
                                    carModel: item.metadata?.carModel || '',
                                    year: item.metadata?.year || ''
                                  }} 
                                />
                              );
                            case 'video':
                              return (
                                <VideoCard 
                                  key={item.id} 
                                  video={{
                                    id: item.id,
                                    imageUrl: item.imageUrl,
                                    title: item.title,
                                    duration: item.metadata?.duration || '',
                                    views: item.metadata?.views,
                                    publishDate: item.metadata?.publishDate
                                  }} 
                                />
                              );
                            case 'newCar':
                            case 'usedCar':
                              return (
                                <CarCard 
                                  key={item.id} 
                                  car={{
                                    id: item.id,
                                    imageUrl: item.imageUrl,
                                    title: item.title,
                                    price: item.metadata?.price || '',
                                    category: item.metadata?.category || '',
                                    year: item.metadata?.year,
                                    mileage: item.metadata?.mileage,
                                    fuelType: item.metadata?.fuelType,
                                    drivetrain: item.metadata?.drivetrain,
                                    location: item.metadata?.location,
                                    dealerName: item.metadata?.dealerName,
                                    dealerLocation: item.metadata?.dealerLocation,
                                    bodyStyle: item.metadata?.bodyStyle as 'SUV' | 'Sedan' | 'Truck' | 'Sports Car' | 'Minivan' | 'Crossover' | 'Coupe' | 'Convertible' | 'Hatchback' | 'Wagon',
                                    isNew: item.type === 'newCar',
                                    // Add new car specs that are shown in My Garage
                                    msrp: item.metadata?.msrp,
                                    mpg: item.metadata?.mpg,
                                    mpge: item.metadata?.mpge,
                                    range: item.metadata?.range,
                                    engine: item.metadata?.engine,
                                    horsepower: item.metadata?.horsepower,
                                    transmission: item.metadata?.transmission,
                                    // MotorTrend ratings
                                    motorTrendScore: item.metadata?.motorTrendScore,
                                    motorTrendRank: item.metadata?.motorTrendRank,
                                    motorTrendCategoryRank: item.metadata?.motorTrendCategoryRank
                                  }} 
                                  type={item.type === 'newCar' ? 'new' : 'used'} 
                                />
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="garage" className="space-y-6">
                  <GarageContent />
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-6">
                  <RecentActivity />
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-6">
                  <UserAchievements />
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField 
                            control={form.control} 
                            name="name" 
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )} 
                          />
                          <FormField 
                            control={form.control} 
                            name="email" 
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" />
                                </FormControl>
                              </FormItem>
                            )} 
                          />
                          <div className="flex items-center justify-between pt-2">
                            <Button 
                              type="button" 
                              variant="outline-black" 
                              onClick={() => setPersonalizationOpen(true)} 
                              className="flex items-center gap-2 text-gray-900 bg-white border-gray-300 hover:bg-gray-50"
                            >
                              <Palette size={16} />
                              Personalize Experience
                            </Button>
                            <Button type="submit" className="text-white bg-color-primary-1 hover:bg-color-primary-2">
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      <PersonalizationDialog open={personalizationOpen} onOpenChange={setPersonalizationOpen} />
    </>
  );
};

export default Profile;
