
import React, { useState } from "react";
import { useSavedItems } from "../../contexts/SavedItemsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Plus, Grid, List, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GarageVehicleGrid from "./GarageVehicleGrid";
import GarageQuickActions from "./GarageQuickActions";
import GarageInsights from "./GarageInsights";

type ViewMode = 'grid' | 'list';
type FilterTab = 'all' | 'owned' | 'testDriven' | 'interested';

const GarageLayout = () => {
  const { savedItems } = useSavedItems();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter only car items
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');

  // Filter cars based on active tab and search
  const filteredCars = savedCars.filter(car => {
    const matchesFilter = activeFilter === 'all' || car.metadata?.ownership === activeFilter;
    const matchesSearch = searchQuery === '' || 
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.metadata?.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Get counts for each category
  const counts = {
    all: savedCars.length,
    owned: savedCars.filter(car => car.metadata?.ownership === 'owned').length,
    testDriven: savedCars.filter(car => car.metadata?.ownership === 'testDriven').length,
    interested: savedCars.filter(car => car.metadata?.ownership === 'interested').length,
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Section - Clean and minimal */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-neutral-7 rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-neutral-2" />
            </div>
            <div>
              <h1 className="typography-title text-neutral-1">My Garage</h1>
              <p className="typography-caption text-neutral-4">
                {savedCars.length} vehicle{savedCars.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* View Toggle */}
            <div className="flex bg-neutral-7 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'solid' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-4" />
          <Input
            placeholder="Search your vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Filter Tabs - Apple-style segmented control */}
      <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterTab)}>
        <TabsList className="grid w-full grid-cols-4 bg-neutral-7">
          <TabsTrigger value="all" className="typography-caption">
            All ({counts.all})
          </TabsTrigger>
          <TabsTrigger value="owned" className="typography-caption">
            Owned ({counts.owned})
          </TabsTrigger>
          <TabsTrigger value="testDriven" className="typography-caption">
            Test Driven ({counts.testDriven})
          </TabsTrigger>
          <TabsTrigger value="interested" className="typography-caption">
            Interested ({counts.interested})
          </TabsTrigger>
        </TabsList>

        {/* Main Content Area */}
        <div className="mt-6 space-y-6">
          {/* Quick Actions */}
          <GarageQuickActions carCount={savedCars.length} />

          {/* Vehicle Grid/List */}
          <TabsContent value={activeFilter} className="mt-0">
            <GarageVehicleGrid 
              cars={filteredCars}
              viewMode={viewMode}
              emptyStateFilter={activeFilter}
            />
          </TabsContent>

          {/* Insights Section */}
          {savedCars.length > 0 && (
            <GarageInsights cars={savedCars} />
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default GarageLayout;
