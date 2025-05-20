
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
import { useIsMobile } from "../hooks/use-mobile";
import PersonalizationDialog from "../components/PersonalizationDialog";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import RecentActivity from "../components/RecentActivity";
import UserAchievements from "../components/UserAchievements";
import UserPoints from "../components/UserPoints";
import { User, Settings, Car, Bookmark, Save, Palette, Activity, Award, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MyGarageSkinny from "../components/profile/MyGarageSkinny";
import GlobalHeader from '../components/GlobalHeader';
import UserReviews from '../components/garage/UserReviews';
import { Badge } from "@/components/ui/badge";

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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalHeader isLoading={false} />
      
      <main className="max-w-[980px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-gradient-to-r from-motortrend-dark to-gray-800 text-white">
                <Avatar className="w-16 h-16 border-2 border-white">
                  <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
                  <AvatarFallback className="bg-motortrend-red text-white">{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-white">{userData.name}</CardTitle>
                  <p className="text-xs text-gray-300">Member since {userData.joined}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">Saved Items</span>
                  <span className="text-sm font-bold bg-motortrend-red text-white px-2 py-0.5 rounded-full">{savedItems.length}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 border-motortrend-red text-motortrend-red hover:bg-motortrend-red/10 flex items-center justify-center gap-2" onClick={() => setPersonalizationOpen(true)}>
                  <Palette size={16} />
                  Personalize Experience
                </Button>
              </CardContent>
            </Card>
            
            <UserPoints />
            
            <MyGarageSkinny />
            
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-base">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="divide-y divide-gray-100">
                  <Link to="/profile" className="flex items-center justify-between px-4 py-3 bg-motortrend-red text-white hover:bg-motortrend-red/90">
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span className="font-medium">Profile</span>
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                  <Link to="/garage" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Car size={18} />
                      <span className="font-medium">My Garage</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                  <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Settings size={18} />
                      <span className="font-medium">Settings</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            <Card className="border-0 shadow-sm overflow-hidden">
              <Tabs defaultValue="saved" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none bg-white">
                  <TabsTrigger value="saved" className="data-[state=active]:border-b-2 data-[state=active]:border-motortrend-red data-[state=active]:text-motortrend-red rounded-none">
                    <Bookmark size={16} className="mr-1" />
                    <span>Saved</span>
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:border-b-2 data-[state=active]:border-motortrend-red data-[state=active]:text-motortrend-red rounded-none">
                    <Activity size={16} className="mr-1" />
                    <span>Activity</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="data-[state=active]:border-b-2 data-[state=active]:border-motortrend-red data-[state=active]:text-motortrend-red rounded-none">
                    <Award size={16} className="mr-1" />
                    <span>Achievements</span>
                  </TabsTrigger>
                  <TabsTrigger value="myreviews" className="data-[state=active]:border-b-2 data-[state=active]:border-motortrend-red data-[state=active]:text-motortrend-red rounded-none">
                    <Save size={16} className="mr-1" />
                    <span>Reviews</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:border-b-2 data-[state=active]:border-motortrend-red data-[state=active]:text-motortrend-red rounded-none">
                    <Settings size={16} className="mr-1" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="saved" className="bg-white p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-motortrend-dark flex items-center">
                        <Bookmark size={20} className="mr-2 text-motortrend-red" />
                        Saved Items
                      </h2>
                      <div className="flex gap-2">
                        <Button variant={filterType === "all" ? "default" : "outline"} size="sm" 
                               className={filterType === "all" ? "bg-motortrend-red hover:bg-motortrend-red/90" : "border-motortrend-red text-motortrend-red hover:bg-motortrend-red/10"}>
                          All
                        </Button>
                        <Button variant={filterType === "article" ? "default" : "outline"} size="sm" 
                               className={filterType === "article" ? "bg-motortrend-red hover:bg-motortrend-red/90" : "border-motortrend-red text-motortrend-red hover:bg-motortrend-red/10"}
                               onClick={() => setFilterType("article")}>
                          Articles
                        </Button>
                        <Button variant={filterType === "newCar" ? "default" : "outline"} size="sm" 
                               className={filterType === "newCar" ? "bg-motortrend-red hover:bg-motortrend-red/90" : "border-motortrend-red text-motortrend-red hover:bg-motortrend-red/10"}
                               onClick={() => setFilterType("newCar")}>
                          Cars
                        </Button>
                      </div>
                    </div>
                    
                    {filteredItems.length === 0 ? (
                      <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-100">
                        <Save size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No saved items yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Use the bookmark button on articles, cars, videos, and photos to collect them here
                        </p>
                        <Button className="mt-4 bg-motortrend-red hover:bg-motortrend-red/90" onClick={() => navigate("/")}>
                          Browse Content
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredItems.map(item => <SavedItemCard key={item.id} item={item} onUnsave={(id) => handleUnsave(id, item.type)} />)}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="bg-white p-6">
                  <RecentActivity />
                </TabsContent>
                
                <TabsContent value="achievements" className="bg-white p-6">
                  <UserAchievements />
                </TabsContent>
                
                <TabsContent value="myreviews" className="bg-white p-6">
                  <UserReviews />
                </TabsContent>
                
                <TabsContent value="settings" className="bg-white p-6">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold text-motortrend-dark flex items-center mb-6">
                      <Settings size={20} className="mr-2 text-motortrend-red" />
                      Account Settings
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <ProfilePictureUpload currentImageUrl={profileImage} onImageChange={setProfileImage} />
                      </div>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Display Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="border-gray-300 focus-visible:ring-motortrend-red" />
                              </FormControl>
                            </FormItem>
                          )} />
                          
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Email Address</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" className="border-gray-300 focus-visible:ring-motortrend-red" />
                              </FormControl>
                            </FormItem>
                          )} />
                          
                          <div className="flex items-center justify-between pt-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setPersonalizationOpen(true)} 
                              className="border-motortrend-red text-motortrend-red hover:bg-motortrend-red/10 flex items-center gap-2"
                            >
                              <Palette size={16} />
                              Personalize Experience
                            </Button>
                            
                            <Button type="submit" className="bg-motortrend-red hover:bg-motortrend-red/90">
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Personalization Dialog */}
      <PersonalizationDialog open={personalizationOpen} onOpenChange={setPersonalizationOpen} />
    </div>
  );
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
  
  return (
    <div className="flex rounded-md overflow-hidden border bg-white hover:shadow-md transition-shadow duration-200">
      <div className="w-24 h-24 flex-shrink-0">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover" 
          onError={e => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }} 
        />
      </div>
      <div className="flex-1 p-3 flex flex-col">
        <div className="flex justify-between">
          <Badge variant="default" className="bg-motortrend-red text-white text-xs">
            {getItemTypeLabel(item.type)}
          </Badge>
          <span className="text-xs text-gray-500">
            Saved on {formatDate(item.savedAt)}
          </span>
        </div>
        <h3 className="text-sm font-medium mt-1 line-clamp-2">{item.title}</h3>
        <div className="mt-auto flex justify-between items-center pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-motortrend-red text-motortrend-red hover:bg-motortrend-red/10"
          >
            View
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onUnsave(item.id)} 
            className="text-gray-500 hover:text-motortrend-red"
          >
            Unsave
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
