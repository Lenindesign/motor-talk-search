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
import GarageQuickAdd from "../GarageQuickAdd";

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
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" className="text-neutral-2">
                <path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/>
              </svg>
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


              </div>

      {/* Add Vehicle Section - Above tabs */}
      <div className="bg-white rounded-lg border border-neutral-6 p-4 relative mb-6" style={{ minHeight: '240px', zIndex: 1000 }}>
        <div className="mb-4">
          <h3 className="typography-subtitle text-neutral-1 mb-2">Add a Vehicle</h3>
          <p className="typography-caption text-neutral-4">Search and add vehicles to your garage</p>
        </div>
        <GarageQuickAdd onAddCar={() => {
          // Refresh the component or show success message
          console.log('Vehicle added successfully');
        }} />
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
