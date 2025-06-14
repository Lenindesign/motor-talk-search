import React, { useState } from "react";
import { useSavedItems } from "../../contexts/SavedItemsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Plus, Grid, List, Filter, Search, ChevronDown, Settings, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import GarageVehicleGrid from "./GarageVehicleGrid";
import GarageQuickActions from "./GarageQuickActions";
import GarageInsights from "./GarageInsights";
import GarageQuickAdd from "../GarageQuickAdd";
import TestDriveList from "./TestDriveList";
import OwnedCarsManager from "./OwnedCarsManager";
import { CarData } from "../CarCard/types";

type ViewMode = 'grid' | 'list';
type FilterTab = 'all' | 'owned' | 'testDriven' | 'interested';

const GarageLayout = () => {
  const { savedItems } = useSavedItems();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  // Helper function to convert SavedItem to CarData
  const savedItemToCarData = (item: any): CarData => {
    return {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      price: item.metadata?.price || 'N/A',
      category: item.metadata?.category || 'Unknown',
      year: item.metadata?.year || 'N/A',
      mileage: item.metadata?.mileage,
      fuelType: item.metadata?.fuelType || 'N/A',
      drivetrain: item.metadata?.drivetrain || 'N/A',
      location: item.metadata?.location || 'N/A',
      bodyStyle: item.metadata?.bodyStyle || 'N/A',
      isNew: item.type === 'newCar',
      motorTrendScore: item.metadata?.motorTrendScore || '0.0',
      motorTrendRank: item.metadata?.motorTrendRank || 'N/A',
      motorTrendCategoryRank: item.metadata?.motorTrendCategoryRank || false,
      msrp: item.metadata?.msrp,
      mpg: item.metadata?.mpg,
      mpge: item.metadata?.mpge,
      range: item.metadata?.range,
      engine: item.metadata?.engine,
      horsepower: item.metadata?.horsepower,
      transmission: item.metadata?.transmission,
      userReviewsScore: '8.5'
    };
  };

  const getTabIcon = (tab: FilterTab) => {
    switch (tab) {
      case 'all': return <Grid className="w-4 h-4" />;
      case 'owned': return <Car className="w-4 h-4" />;
      case 'testDriven': return <Search className="w-4 h-4" />;
      case 'interested': return <Settings className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  const getTabLabel = (tab: FilterTab) => {
    switch (tab) {
      case 'all': return 'All';
      case 'owned': return 'Owned';
      case 'testDriven': return 'Test Drive';
      case 'interested': return 'Interested';
      default: return 'All';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="sticky top-0 bg-white border-b border-neutral-6 px-4 py-3 z-50 -mx-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-neutral-6 to-neutral-7 rounded-xl flex items-center justify-center">
                <Car className="w-4 h-4 text-neutral-2" />
              </div>
              <div>
                <h1 className="typography-subtitle text-neutral-1">My Garage</h1>
                <p className="typography-small text-neutral-4">{savedCars.length} vehicles</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2"
              >
                <Menu className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                className="bg-motortrend-red text-white hover:bg-red-600 px-3 py-2 shadow-modern"
                onClick={() => setShowAddVehicle(!showAddVehicle)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="bg-white rounded-xl border border-neutral-6 p-4 mb-6 shadow-modern animate-in slide-in-from-top-2">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setShowAdvancedOptions(!showAdvancedOptions);
                  setShowMobileMenu(false);
                }}
              >
                <Search className="w-4 h-4 mr-2" />
                Search & Filter
              </Button>
              {savedCars.length > 1 && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Compare Vehicles
                </Button>
              )}
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Settings className="w-4 h-4 mr-2" />
                Garage Settings
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Tab Navigation */}
        <div className="bg-neutral-8 rounded-2xl p-2 border border-neutral-6 mb-6">
          <div className="flex overflow-x-auto gap-1 scrollbar-hide">
            {(['all', 'owned', 'testDriven', 'interested'] as FilterTab[]).map(tab => (
              <button
                key={tab}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[80px] text-center ${
                  activeFilter === tab 
                    ? 'bg-white shadow-modern text-neutral-1' 
                    : 'text-neutral-3 hover:text-neutral-1 hover:bg-neutral-7'
                }`}
                onClick={() => setActiveFilter(tab)}
              >
                <div className="flex items-center gap-1 mb-1">
                  {getTabIcon(tab)}
                  <span className="text-xs font-medium">{getTabLabel(tab)}</span>
                </div>
                <span className="text-xs text-neutral-4">{counts[tab]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-neutral-6 to-neutral-7 rounded-2xl flex items-center justify-center shadow-modern">
            <Car className="w-6 h-6 text-neutral-2" />
          </div>
          <div>
            <h1 className="typography-display text-neutral-1">My Garage</h1>
            <p className="typography-body text-neutral-4">
              {savedCars.length} vehicle{savedCars.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        {/* Primary Action */}
        <Button 
          variant="solid" 
          className="bg-motortrend-red text-white hover:bg-red-600 shadow-modern px-6 py-3"
          onClick={() => setShowAddVehicle(!showAddVehicle)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Progressive Disclosure - Add Vehicle Section */}
      {showAddVehicle && (
        <div className="bg-white rounded-2xl shadow-modern border border-neutral-6 p-4 lg:p-8 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div>
              <h3 className="typography-subtitle lg:typography-title text-neutral-1 mb-2">Add a Vehicle</h3>
              <p className="typography-caption lg:typography-body text-neutral-4">Search and add vehicles to your garage</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAddVehicle(false)}
              className="text-neutral-4 hover:text-neutral-2 min-h-[44px] min-w-[44px]"
            >
              ×
            </Button>
          </div>
          <GarageQuickAdd onAddCar={() => {
            setShowAddVehicle(false);
            console.log('Vehicle added successfully');
          }} />
        </div>
      )}

      {/* Desktop Tab Navigation */}
      <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterTab)} className="hidden lg:block">
        <div className="bg-neutral-8 rounded-2xl p-2 shadow-modern border border-neutral-6">
          <TabsList className="grid w-full grid-cols-4 bg-transparent gap-2 h-auto">
            <TabsTrigger 
              value="all" 
              className="flex flex-col items-center justify-center py-3 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-modern transition-all duration-200 h-auto min-h-[60px] text-center"
            >
              <div className="flex items-center gap-2 mb-1">
                <Grid className="w-4 h-4" />
                <span className="text-sm font-medium">All</span>
              </div>
              <span className="text-xs text-neutral-4">{counts.all} vehicles</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="owned" 
              className="flex flex-col items-center justify-center py-3 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-modern transition-all duration-200 h-auto min-h-[60px] text-center"
            >
              <div className="flex items-center gap-2 mb-1">
                <Car className="w-4 h-4" />
                <span className="text-sm font-medium">Owned</span>
              </div>
              <span className="text-xs text-neutral-4">{counts.owned} cars</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="testDriven" 
              className="flex flex-col items-center justify-center py-3 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-modern transition-all duration-200 h-auto min-h-[60px] text-center"
            >
              <div className="flex items-center gap-2 mb-1">
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium">Test Drive</span>
              </div>
              <span className="text-xs text-neutral-4">{counts.testDriven} cars</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="interested" 
              className="flex flex-col items-center justify-center py-3 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-modern transition-all duration-200 h-auto min-h-[60px] text-center"
            >
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Interested</span>
              </div>
              <span className="text-xs text-neutral-4">{counts.interested} cars</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Main Content Area with improved spacing */}
        <div className="space-y-6 mt-6">
          {/* Progressive Disclosure - Advanced Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {savedCars.length > 1 && (
                <>
                  <Button variant="solid" className="bg-neutral-1 text-white hover:bg-neutral-2">
                    Compare Selected
                  </Button>
                  <Button variant="outline" className="border-neutral-5 text-neutral-2 hover:bg-neutral-8">
                    Share Garage
                  </Button>
                </>
              )}
              
              {savedCars.length > 0 && (
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="text-neutral-3 hover:bg-neutral-8 hover:text-neutral-1"
                >
                  More Options
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${showAdvancedOptions ? 'rotate-180' : ''}`} />
                </Button>
              )}
            </div>

            {/* View Controls */}
            {savedCars.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex bg-neutral-8 rounded-xl p-1 border border-neutral-6">
                  <Button
                    variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3 min-h-[36px] rounded-lg"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'solid' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-3 min-h-[36px] rounded-lg"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Advanced Options */}
          {showAdvancedOptions && (
            <div className="bg-neutral-8 rounded-xl p-6 border border-neutral-6 animate-in slide-in-from-top-2">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-4" />
                    <Input
                      placeholder="Search your vehicles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-neutral-6 focus:border-motortrend-red focus:ring-1 focus:ring-motortrend-red"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-neutral-5 text-neutral-2 hover:bg-white min-h-[44px]"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          )}

          {/* Quick Actions - Only show when there are cars */}
          {savedCars.length > 0 && (
            <GarageQuickActions carCount={savedCars.length} />
          )}

          {/* Vehicle Content */}
          <TabsContent value={activeFilter} className="mt-0">
            <div className="bg-white rounded-2xl shadow-modern border border-neutral-6 min-h-[400px]">
              {activeFilter === 'testDriven' ? (
                <TestDriveList 
                  cars={savedCars}
                  savedItemToCarData={savedItemToCarData}
                />
              ) : activeFilter === 'owned' ? (
                <OwnedCarsManager 
                  cars={savedCars}
                  savedItemToCarData={savedItemToCarData}
                />
              ) : (
                <GarageVehicleGrid 
                  cars={filteredCars}
                  viewMode={viewMode}
                  emptyStateFilter={activeFilter}
                />
              )}
            </div>
          </TabsContent>

          {/* Insights Section - Enhanced visual treatment */}
          {savedCars.length > 0 && (
            <div className="bg-gradient-to-br from-neutral-8 to-neutral-7 rounded-2xl shadow-modern border border-neutral-6">
              <GarageInsights cars={savedCars} />
            </div>
          )}
        </div>
      </Tabs>

      {/* Mobile Content */}
      <div className="lg:hidden space-y-4">
        {/* Mobile Advanced Options */}
        {showAdvancedOptions && (
          <div className="bg-neutral-8 rounded-xl p-4 border border-neutral-6 animate-in slide-in-from-top-2">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-4" />
                <Input
                  placeholder="Search your vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-neutral-6 focus:border-motortrend-red focus:ring-1 focus:ring-motortrend-red"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full border-neutral-5 text-neutral-2 hover:bg-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Quick Actions */}
        {savedCars.length > 0 && (
          <GarageQuickActions carCount={savedCars.length} />
        )}

        {/* Mobile Vehicle Content */}
        <div className="bg-white rounded-2xl shadow-modern border border-neutral-6 min-h-[400px]">
          {activeFilter === 'testDriven' ? (
            <TestDriveList 
              cars={savedCars}
              savedItemToCarData={savedItemToCarData}
            />
          ) : activeFilter === 'owned' ? (
            <OwnedCarsManager 
              cars={savedCars}
              savedItemToCarData={savedItemToCarData}
            />
          ) : (
            <GarageVehicleGrid 
              cars={filteredCars}
              viewMode="grid" // Force grid on mobile for better UX
              emptyStateFilter={activeFilter}
            />
          )}
        </div>

        {/* Mobile Insights */}
        {savedCars.length > 0 && (
          <div className="bg-gradient-to-br from-neutral-8 to-neutral-7 rounded-2xl shadow-modern border border-neutral-6">
            <GarageInsights cars={savedCars} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GarageLayout;
