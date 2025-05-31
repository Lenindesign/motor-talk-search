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
  const {
    savedItems,
    removeSavedItem
  } = useSavedItems();
  const {
    preferences
  } = usePersonalization();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("saved");
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(localStorage.getItem("userProfileImage") || undefined);

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
  const onSubmit = (data: {
    name: string;
    email: string;
  }) => {
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);

    // Show a success message or notification
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
  const filterItemsByType = (type: SavedItemType | 'all') => {
    if (type === 'all') return savedItems;
    return savedItems.filter(item => item.type === type);
  };

  // Filter by current tab
  const [filterType, setFilterType] = useState<SavedItemType | 'all'>('all');
  const filteredItems = filterItemsByType(filterType);
  return <>
      <div className="min-h-screen bg-motortrend-gray">
        
        {/* Spacer for fixed header + search bar on mobile */}
      <div className="sm:hidden" style={{
        height: 112
      }} />
      <main className="max-w-[980px] mx-auto py-8 px-0">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Sidebar */}
            <aside className="w-full md:w-64 space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
                      <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">Member since {userData.joined}</p>
                    
                    <div className="w-full mt-6 flex justify-between items-center">
                      <span className="text-sm font-medium">Saved Items</span>
                      <span className="font-bold">{savedItems.length}</span>
                    </div>
                    
                    <div className="w-full mt-4 space-y-3">
                      <Button variant="default" size="sm" className="w-full flex items-center justify-center gap-2 text-motortrend-light bg-motortrend-dark text-sm">
                        <User size={16} />
                        Profile
                      </Button>
                      
                      <Button variant="outline" size="sm" onClick={() => setPersonalizationOpen(true)} className="w-full flex items-center justify-center gap-2 text-sm">
                        <Palette size={16} />
                        Personalize
                      </Button>
                      
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2 text-sm">
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
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Saved Items</h2>
                      <div className="flex gap-2">
                        <Button variant={filterType === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterType("all")} className="bg-motortrend-light">
                          All
                        </Button>
                        <Button variant={filterType === "article" ? "default" : "outline"} size="sm" onClick={() => setFilterType("article")} className="bg-motortrend-dark">
                          Articles
                        </Button>
                        <Button variant={filterType === "newCar" ? "default" : "outline"} size="sm" onClick={() => setFilterType("newCar")}>
                          New Cars
                        </Button>
                        <Button variant={filterType === "usedCar" ? "default" : "outline"} size="sm" onClick={() => setFilterType("usedCar")}>
                          Used Cars
                        </Button>
                      </div>
                    </div>
                    
                    {filteredItems.length === 0 ? <div className="text-center py-10">
                        <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No saved items yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Use the bookmark button on articles, cars, videos, and photos to collect them here
                        </p>
                        <Button onClick={() => navigate("/")} className="mt-4 text-motortrend-dark">
                          Browse Content
                        </Button>
                      </div> : <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {filteredItems.map(item => {
                      switch (item.type) {
                        case 'article':
                          return <ArticleCard key={item.id} article={{
                            id: item.id,
                            imageUrl: item.imageUrl,
                            title: item.title,
                            date: item.metadata?.date || '',
                            category: item.metadata?.category || '',
                            featured: item.metadata?.featured,
                            photoCount: item.metadata?.photoCount
                          }} />;
                        case 'photo':
                          return <PhotoCard key={item.id} photo={{
                            id: item.id,
                            imageUrl: item.imageUrl,
                            title: item.title,
                            position: item.metadata?.position || '',
                            make: item.metadata?.make || '',
                            carModel: item.metadata?.carModel || '',
                            year: item.metadata?.year || ''
                          }} />;
                        case 'video':
                          return <VideoCard key={item.id} video={{
                            id: item.id,
                            imageUrl: item.imageUrl,
                            title: item.title,
                            duration: item.metadata?.duration || '',
                            views: item.metadata?.views,
                            publishDate: item.metadata?.publishDate
                          }} />;
                        case 'newCar':
                        case 'usedCar':
                          return <CarCard key={item.id} car={{
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
                            bodyStyle: item.metadata?.bodyStyle as any,
                            isNew: item.type === 'newCar' ? true : false
                          }} type={item.type === 'newCar' ? 'new' : 'used'} />;
                        default:
                          return null;
                      }
                    })}
                      </div>}
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
                          <FormField control={form.control} name="name" render={({
                          field
                        }) => <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>} />
                          <FormField control={form.control} name="email" render={({
                          field
                        }) => <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" />
                                </FormControl>
                              </FormItem>} />
                          <div className="flex items-center justify-between pt-2">
                            <Button type="button" variant="outline" onClick={() => setPersonalizationOpen(true)} className="flex items-center gap-2">
                              <Palette size={16} />
                              Personalize Experience
                            </Button>
                            <Button type="submit">Save Changes</Button>
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
    </>;
};
export default Profile;