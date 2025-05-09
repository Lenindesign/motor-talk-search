import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSavedItems, SavedItem } from "../contexts/SavedItemsContext";
import MainNavigation from "../components/MainNavigation";
import { useIsMobile } from "../hooks/use-mobile";
import SearchBar from "../components/SearchBar";
import { User, Settings, Car, Save } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const Garage = () => {
  const {
    savedItems,
    removeSavedItem
  } = useSavedItems();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');

  // Mock user data - in a real app, this would come from auth context or API
  const userData = {
    name: "John Driver",
    email: "john.driver@example.com",
    avatar: "/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png", // Updated to use the uploaded image
    joined: "January 2023"
  };
  const handleUnsave = (id: string) => {
    removeSavedItem(id);
  };
  return <div className="min-h-screen bg-motortrend-gray">
      <header className="sticky top-0 z-20 bg-motortrend-dark px-6 py-4 shadow-md">
        <div className="flex items-center justify-between max-w-[980px] mx-auto w-full">
          <div className="flex items-center">
            {isMobile && <MainNavigation />}
            <Link to="/" className="flex-shrink-0">
              <img src="/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png" alt="MotorTrend Logo" className="h-7 w-auto" />
            </Link>
            <div className="hidden sm:flex ml-6">
              <MainNavigation />
            </div>
          </div>
          <div className="hidden sm:block ml-4">
            <SearchBar onSearch={query => navigate(`/?q=${query}`)} isLoading={false} variant="header" />
          </div>
        </div>
      </header>
      
      <main className="max-w-[980px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{userData.name}</CardTitle>
                  
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Member since {userData.joined}</p>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm font-medium">Cars in Garage</span>
                  <span className="text-sm font-bold">{savedCars.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 w-full">
                    <User size={18} />
                    Profile
                  </Link>
                  <Link to="/garage" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-motortrend-dark text-white w-full">
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
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Car size={20} />
                    My Garage
                  </CardTitle>
                  <Button onClick={() => navigate("/")}>Browse Cars</Button>
                </div>
                <CardDescription>
                  View and manage your saved vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedCars.length === 0 ? <div className="text-center py-10">
                    <Car size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Your garage is empty</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Save cars you're interested in to add them to your garage
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/")}>
                      Find Cars
                    </Button>
                  </div> : <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {savedCars.map(car => <GarageCarCard key={car.id} car={car} onUnsave={handleUnsave} />)}
                    </div>
                  </div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>;
};

// Component to display a saved car in garage
const GarageCarCard = ({
  car,
  onUnsave
}: {
  car: SavedItem;
  onUnsave: (id: string) => void;
}) => {
  const metadata = car.metadata || {};
  return <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border bg-white">
      <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0">
        <img src={car.imageUrl} alt={car.title} className="w-full h-full object-cover" onError={e => {
        (e.target as HTMLImageElement).src = '/placeholder.svg';
      }} />
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="bg-motortrend-red/10 text-motortrend-red border-motortrend-red/30">
            {car.type === 'newCar' ? 'New' : 'Used'}
          </Badge>
          {metadata.year && <Badge variant="outline">{metadata.year}</Badge>}
          {metadata.category && <Badge variant="outline">{metadata.category}</Badge>}
        </div>
        
        <h3 className="text-lg font-bold">{car.title}</h3>
        
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          {metadata.price && <div className="text-sm">
              <span className="font-semibold">Price:</span> {metadata.price}
            </div>}
          {metadata.mileage && <div className="text-sm">
              <span className="font-semibold">Mileage:</span> {metadata.mileage}
            </div>}
          {metadata.location && <div className="text-sm col-span-2">
              <span className="font-semibold">Location:</span> {metadata.location}
            </div>}
        </div>
        
        <div className="mt-auto pt-4 flex flex-wrap gap-3">
          <Button>View Details</Button>
          <Button variant="outline">Compare</Button>
          <Button variant="ghost" className="text-gray-500 hover:text-motortrend-red ml-auto" onClick={() => onUnsave(car.id)}>
            <Save className="mr-1" size={16} /> Unsave
          </Button>
        </div>
      </div>
    </div>;
};
export default Garage;
