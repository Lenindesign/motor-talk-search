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
import { User, Settings, Car, Bookmark, Save, Palette, Activity, Award } from "lucide-react";
import ArticleCard from "../components/ArticleCard";
import CarCard from "../components/CarCard";
import PhotoCard from "../components/PhotoCard";
import VideoCard from "../components/VideoCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MyGarageSkinny from "../components/profile/MyGarageSkinny";
import GlobalHeader from '../components/GlobalHeader';
import UserReviews from '../components/garage/UserReviews';
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

  // Form setup for account settings
  const form = useForm({
    defaultValues: {
      name: localStorage.getItem("userName") || "John Driver",
      email: localStorage.getItem("userEmail") || "john.driver@example.com"
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
    avatar: "/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png",
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
  return <div className="min-h-screen bg-motortrend-gray">
      <GlobalHeader isLoading={false} />
      
      <main className="max-w-[980px] mx-auto py-8 px-0">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{userData.name}</CardTitle>
                  
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Member since {userData.joined}</p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium">Saved Items</span>
                  <span className="text-sm font-bold">{savedItems.length}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 flex items-center justify-center gap-2" onClick={() => setPersonalizationOpen(true)}>
                  <Palette size={16} />
                  Personalize
                </Button>
              </CardContent>
            </Card>
            
            <UserPoints />
            
            <MyGarageSkinny />
            
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-motortrend-dark text-white w-full">
                    <User size={18} />
                    Profile
                  </Link>
                  <Link to="/garage" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full">
                    <Car size={18} />
                    My Garage
                  </Link>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full">
                    <Settings size={18} />
                    Settings
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="saved" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none">
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
                <TabsTrigger value="myreviews" className="flex items-center gap-1">
                  <Save size={16} />
                  <span>My Reviews</span>
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
                      <Button variant={filterType === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterType("all")}>
                        All
                      </Button>
                      <Button variant={filterType === "article" ? "default" : "outline"} size="sm" onClick={() => setFilterType("article")}>
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
                      <Save size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No saved items yet</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Use the bookmark button on articles, cars, videos, and photos to collect them here
                      </p>
                      <Button className="mt-4" onClick={() => navigate("/")}>
                        Browse Content
                      </Button>
                    </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredItems.map(item => {
  switch(item.type) {
    case 'article':
      return <ArticleCard key={item.id} article={{
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        date: item.metadata?.date || '',
        category: item.metadata?.category || '',
        photoCount: item.metadata?.photoCount,
        featured: item.metadata?.featured
      }} />;
    case 'newCar':
    case 'usedCar':
      return <CarCard key={item.id} car={{
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
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
        title: item.title,
        imageUrl: item.imageUrl,
        duration: item.metadata?.duration || '',
        views: item.metadata?.views,
        publishDate: item.metadata?.publishDate
      }} />;
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
              
              <TabsContent value="myreviews" className="space-y-6">
                <UserReviews />
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ProfilePictureUpload currentImageUrl={profileImage} onImageChange={setProfileImage} />
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({
                        field
                      }) => <FormItem>
                              <FormLabel>Display Name</FormLabel>
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
      
      {/* Personalization Dialog */}
      <PersonalizationDialog open={personalizationOpen} onOpenChange={setPersonalizationOpen} />
    </div>;
};

// Component to display a saved item card
const SavedItemCard = ({
  item,
  onUnsave
}: {
  item: SavedItem;
  onUnsave: (id: string) => void;
}) => {
  // Safe formatDate function that handles invalid dates gracefully
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Unknown date";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Unknown date";
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Unknown date";
    }
  };
  const getItemTypeLabel = (type: SavedItemType) => {
    switch (type) {
      case 'article':
        return 'Article';
      case 'newCar':
        return 'New Car';
      case 'usedCar':
        return 'Used Car';
      case 'photo':
        return 'Photo';
      case 'video':
        return 'Video';
      default:
        return 'Item';
    }
  };
  return <div className="flex rounded-md overflow-hidden border bg-white">
      <div className="w-24 h-24 flex-shrink-0">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" onError={e => {
        (e.target as HTMLImageElement).src = '/placeholder.svg';
      }} />
      </div>
      <div className="flex-1 p-3 flex flex-col">
        <div className="flex justify-between">
          <span className="text-xs font-medium text-motortrend-red">
            {getItemTypeLabel(item.type)}
          </span>
          <span className="text-xs text-gray-500">
            Saved on {formatDate(item.savedAt)}
          </span>
        </div>
        <h3 className="text-sm font-medium mt-1 line-clamp-2">{item.title}</h3>
        <div className="mt-auto flex justify-between items-center pt-2">
          <Button variant="outline" size="sm">View</Button>
          <Button variant="ghost" size="sm" onClick={() => onUnsave(item.id)} className="text-gray-500 hover:text-motortrend-red">
            Unsave
          </Button>
        </div>
      </div>
    </div>;
};
export default Profile;