
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSavedItems } from "../contexts/SavedItemsContext";
import { usePersonalization } from "../contexts/PersonalizationContext";
import GlobalHeader from '../components/GlobalHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Car, ChevronRight, Clock, Heart, HomeIcon, Lightbulb, MessageCircle, Newspaper, PlayCircle, Search, Star, TrendingUp } from "lucide-react";
import { generateChatResponse, mockArticles, mockNewCars } from "../services/mockData";

const Dashboard = () => {
  const { savedItems } = useSavedItems();
  const { preferences } = usePersonalization();
  const [activeTab, setActiveTab] = useState("foryou");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Sample recent activities - in a real app this would come from an API
  const recentActivities = [
    { id: 1, type: 'view', item: 'Honda Civic 2023', timestamp: '2 hours ago' },
    { id: 2, type: 'search', item: 'Best SUVs under $30,000', timestamp: '1 day ago' },
    { id: 3, type: 'compare', item: 'Toyota Camry vs Honda Accord', timestamp: '3 days ago' },
  ];
  
  // Sample recommendations based on user behavior
  const recommendations = [
    { id: 1, type: 'article', title: '10 Best Family SUVs for 2023', image: '/lovable-uploads/5b8a120c-3d52-41cb-8e20-9a16e6b9bf6a.png' },
    { id: 2, type: 'car', title: 'Toyota RAV4', year: 2023, image: '/placeholder.svg' },
    { id: 3, type: 'video', title: '2023 Honda Civic Review', image: '/placeholder.svg' },
    { id: 4, type: 'article', title: 'Electric vs Hybrid: Which is Right for You?', image: '/placeholder.svg' },
  ];
  
  // Filter recent articles based on user preferences
  const filteredArticles = mockArticles.slice(0, 4);
  const filteredCars = mockNewCars.slice(0, 4);
  
  const handleSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simulate API search
    setTimeout(() => {
      const results = [
        ...mockArticles.filter(article => 
          article.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3),
        ...mockNewCars.filter(car => 
          car.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3)
      ];
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };
  
  const userName = localStorage.getItem("userName") || "Auto Enthusiast";
  const userInterests = preferences?.categories || ['SUVs', 'Hybrids', 'Reviews'];

  return (
    <div className="min-h-screen bg-motortrend-gray">
      <GlobalHeader onSearch={handleSearch} isLoading={isSearching} />
      
      {/* Breadcrumbs for navigation context */}
      <div className="bg-white border-b">
        <div className="max-w-[980px] mx-auto px-4 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">
                    <HomeIcon className="h-3.5 w-3.5" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <main className="max-w-[980px] mx-auto px-4 py-6">
        {/* Welcome section with personalization */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-motortrend-dark">
                Welcome back, {userName.split(' ')[0]}
              </h1>
              <p className="text-muted-foreground mt-1">
                Your personalized automotive dashboard
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {userInterests.map(interest => (
                <Badge key={interest} variant="outline" className="bg-white">
                  {interest}
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="bg-white">
                <Lightbulb className="h-3.5 w-3.5 mr-1" />
                Edit Interests
              </Button>
            </div>
          </div>
        </section>
        
        {/* Enhanced search experience */}
        <section className="mb-8 relative">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-motortrend-dark to-motortrend-red py-6">
              <CardTitle className="text-white">Find Your Perfect Vehicle</CardTitle>
              <CardDescription className="text-white/80">
                Search by make, model, price range, or specific features
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Command className="rounded-lg border shadow-md">
                <CommandInput 
                  placeholder="Type a make, model or feature..." 
                  value={searchQuery}
                  onValueChange={handleSearch}
                />
                <CommandList>
                  {isSearching ? (
                    <div className="flex items-center justify-center py-6">
                      <div className="animate-spinner h-8 w-8 border-2 border-motortrend-red border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <>
                      {searchResults.length > 0 ? (
                        <>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup heading="Vehicles">
                            {searchResults
                              .filter(item => 'price' in item)
                              .map((car) => (
                                <CommandItem key={car.id} className="flex items-center gap-2">
                                  <Car className="h-4 w-4" />
                                  <span>{car.title}</span>
                                </CommandItem>
                              ))
                            }
                          </CommandGroup>
                          <CommandGroup heading="Articles">
                            {searchResults
                              .filter(item => 'category' in item)
                              .map((article) => (
                                <CommandItem key={article.id} className="flex items-center gap-2">
                                  <Newspaper className="h-4 w-4" />
                                  <span>{article.title}</span>
                                </CommandItem>
                              ))
                            }
                          </CommandGroup>
                        </>
                      ) : searchQuery && (
                        <CommandEmpty>No results found.</CommandEmpty>
                      )}
                      
                      {!searchQuery && (
                        <CommandGroup heading="Popular Searches">
                          <CommandItem>Best SUVs under $30,000</CommandItem>
                          <CommandItem>Electric vehicles with longest range</CommandItem>
                          <CommandItem>Most reliable family sedans</CommandItem>
                        </CommandGroup>
                      )}
                    </>
                  )}
                </CommandList>
              </Command>
              
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">Quick filters:</span>
                <Button variant="outline" size="sm" className="rounded-full">SUVs</Button>
                <Button variant="outline" size="sm" className="rounded-full">Electric</Button>
                <Button variant="outline" size="sm" className="rounded-full">Under $40k</Button>
                <Button variant="outline" size="sm" className="rounded-full">Hybrids</Button>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Main content tabs */}
        <section className="mb-8">
          <Tabs defaultValue="foryou" onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none mb-6">
              <TabsTrigger value="foryou" className="flex items-center gap-1">
                <Heart size={16} />
                <span>For You</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1">
                <Bookmark size={16} />
                <span>Saved Items</span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-1">
                <Clock size={16} />
                <span>Recently Viewed</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="foryou" className="space-y-8">
              {/* Personalized recommendations */}
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-lg font-medium">Recommended For You</h2>
                  <Link to="/" className="text-sm text-primary hover:underline flex items-center">
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendations.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-[16/9] relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className={`${item.type === 'article' ? 'bg-blue-500' : item.type === 'car' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {item.type === 'article' ? 'Article' : item.type === 'car' ? 'Vehicle' : 'Video'}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2">
                          {item.title}
                        </h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Latest content */}
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-lg font-medium">Latest News & Reviews</h2>
                  <Link to="/news" className="text-sm text-primary hover:underline flex items-center">
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-[16/9] relative">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-motortrend-red text-white">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2">{article.title}</h3>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Featured vehicles */}
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-lg font-medium">Featured Vehicles</h2>
                  <Link to="/cars" className="text-sm text-primary hover:underline flex items-center">
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredCars.map((car) => (
                    <Card key={car.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                      <div className="aspect-[16/9] relative">
                        <img src={car.imageUrl} alt={car.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-green-500 text-white">
                            {car.category}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary" className="mx-2">View</Button>
                          <Button size="sm" variant="outline" className="mx-2 bg-white">Save</Button>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium">{car.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-semibold">{car.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">4.7</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-0">
              {savedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {savedItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-[16/9] relative">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline">
                            {item.type === 'article' ? 'Article' : 
                             item.type === 'newCar' ? 'New Car' :
                             item.type === 'usedCar' ? 'Used Car' : 'Item'}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Bookmark className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                        <h3 className="font-medium line-clamp-2">{item.title}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/40">
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No saved items yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Save articles, vehicles, and videos by clicking the bookmark icon
                    </p>
                    <Button>Browse Content</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Recent Activity</CardTitle>
                  <CardDescription>
                    Browse your recent searches, viewed content, and comparisons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {activity.type === 'view' ? (
                            <Eye className="h-5 w-5 text-muted-foreground" />
                          ) : activity.type === 'search' ? (
                            <Search className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <MessageCircle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">
                            {activity.type === 'view' ? 'Viewed' : 
                             activity.type === 'search' ? 'Searched for' : 
                             'Compared'} {activity.item}
                          </h4>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Trending section */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-motortrend-red" />
                <CardTitle>Trending Now</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground">Hot Topics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-muted-foreground">01</span>
                      <span className="text-sm">Electric Vehicle Tax Credits</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-muted-foreground">02</span>
                      <span className="text-sm">2023 Car of the Year Award</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-muted-foreground">03</span>
                      <span className="text-sm">Rising Gas Prices Impact</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-1 space-y-4">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground">Popular Videos</h3>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-3">
                        <div className="relative flex-shrink-0 w-20 h-12 bg-muted rounded overflow-hidden">
                          <img src="/placeholder.svg" alt="Video thumbnail" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs leading-tight line-clamp-2">2023 Tesla Model Y vs Ford Mustang Mach-E: Which is Better?</p>
                          <p className="text-xs text-muted-foreground mt-1">5.2K views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-1 space-y-4">
                  <h3 className="font-medium text-sm uppercase text-muted-foreground">Most Researched</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg`} alt="Car" />
                          <AvatarFallback>CA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium">Toyota RAV4</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

// Missing components to add
const Eye = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
