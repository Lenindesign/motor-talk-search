import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, ArrowLeftRight, BookOpen, PlusCircle, Filter, ChevronRight } from 'lucide-react';

const GarageSystemTab = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="typography-headline text-color-neutral-1 mb-4">My Garage System</h2>
        <p className="typography-body-large text-color-neutral-4 mb-6">
          The My Garage feature allows users to save, organize, and compare vehicles they own or are interested in.
          This central hub for automotive interests helps users track their vehicles and get personalized content.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Key features and functionality of the My Garage system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4 bg-color-neutral-8">
                <div className="flex items-center gap-2 mb-2">
                  <Car size={16} className="text-motortrend-red" />
                  <h3 className="font-semibold text-color-neutral-1 text-xs">Vehicle Management</h3>
                </div>
                <p className="text-xs text-color-neutral-4">
                  Add, categorize, and manage vehicles in three categories: Owned, Test Driven, and Interested
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-color-neutral-8">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowLeftRight size={16} className="text-motortrend-red" />
                  <h3 className="font-semibold text-color-neutral-1 text-xs">Car Comparison</h3>
                </div>
                <p className="text-xs text-color-neutral-4">
                  Select and compare up to 4 vehicles side-by-side on key specifications and features
                </p>
              </div>
              
              <div className="border rounded-lg p-4 bg-color-neutral-8">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-motortrend-red" />
                  <h3 className="font-semibold text-color-neutral-1 text-xs">Related Content</h3>
                </div>
                <p className="text-xs text-color-neutral-4">
                  Discover articles, videos, and content related to vehicles in your garage
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="typography-title text-color-neutral-1 mb-4">Key Components</h3>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GarageContent</CardTitle>
              <CardDescription>
                The main container component that orchestrates all garage functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-color-neutral-3">
                  <code>GarageContent.tsx</code> is the primary component that manages the garage interface. It includes:
                </p>
                <ul className="list-disc pl-5 text-sm text-color-neutral-3 space-y-2">
                  <li>Tab navigation between All, Owned, Test Driven, and Interested vehicles</li>
                  <li>Filtering and sorting capabilities</li>
                  <li>State management for vehicle comparison</li>
                  <li>Content view switching between garage and related articles</li>
                </ul>
                <div className="bg-color-neutral-7 p-4 rounded-md">
                  <pre className="text-xs overflow-x-auto">
{`// GarageContent state management
const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'testDriven' | 'interested'>('all');
const [minScore, setMinScore] = useState<number>(0);
const [sortByScore, setSortByScore] = useState<boolean>(false);
const [showFilters, setShowFilters] = useState<boolean>(false);
const [selectedCars, setSelectedCars] = useState<string[]>([]);
const [showComparison, setShowComparison] = useState<boolean>(false);
const [contentView, setContentView] = useState<'garage' | 'articles'>('garage');`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>QuickAddCar</CardTitle>
              <CardDescription>
                Component for quickly adding vehicles to the garage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-color-neutral-3">
                  <code>QuickAddCar.tsx</code> provides a streamlined interface for adding vehicles to the garage:
                </p>
                <ul className="list-disc pl-5 text-sm text-color-neutral-3 space-y-2">
                  <li>Search field with autocomplete for finding vehicles</li>
                  <li>Ownership selection (Owned, Test Driven, Interested)</li>
                  <li>Body style classification for more detailed vehicle specifications</li>
                  <li>Integration with the SavedItemsContext for data persistence</li>
                </ul>
                <div className="bg-color-neutral-7 p-4 rounded-md mt-4">
                  <img 
                    src="/lovable-uploads/garage-quickadd-mockup.png" 
                    alt="QuickAddCar Component" 
                    className="w-full max-w-xl mx-auto border border-color-neutral-6 rounded-md"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://via.placeholder.com/600x300?text=QuickAddCar+Component';
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GarageCompare</CardTitle>
              <CardDescription>
                Component for selecting and comparing vehicles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-color-neutral-3">
                  <code>GarageCompare.tsx</code> enables users to select multiple vehicles for comparison:
                </p>
                <ul className="list-disc pl-5 text-sm text-color-neutral-3 space-y-2">
                  <li>Selection interface for picking up to 4 vehicles</li>
                  <li>Toggle buttons for each vehicle with visual feedback</li>
                  <li>Select/Deselect All functionality</li>
                  <li>Compare button that triggers the comparison view</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SavedItemsContext</CardTitle>
              <CardDescription>
                Context provider for garage data persistence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-color-neutral-3">
                  <code>SavedItemsContext.tsx</code> provides the data layer for the garage functionality:
                </p>
                <ul className="list-disc pl-5 text-sm text-color-neutral-3 space-y-2">
                  <li>Manages saved vehicles with localStorage persistence</li>
                  <li>Tracks user points, achievements, and activities</li>
                  <li>Provides methods for adding, removing, and updating saved items</li>
                  <li>Exposes a context hook (<code>useSavedItems</code>) for components to access garage data</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="typography-title text-color-neutral-1 mb-4">User Flows</h3>
        
        <Tabs defaultValue="adding" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="adding">Adding Vehicles</TabsTrigger>
            <TabsTrigger value="managing">Managing Garage</TabsTrigger>
            <TabsTrigger value="comparing">Comparing Vehicles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="adding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Adding Vehicles to Garage</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-color-neutral-6 space-y-6 pl-6 py-2">
                  <li className="mb-6">
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      1
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">Search for a Vehicle</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      User enters vehicle name or model in the QuickAddCar search field
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <PlusCircle size={16} className="mr-1" />
                      Component: <code className="ml-1">QuickAddCar</code>
                    </div>
                  </li>
                  
                  <li className="mb-6">
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      2
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">Select Ownership Status</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      User chooses whether the vehicle is Owned, Test Driven, or of Interest
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <PlusCircle size={16} className="mr-1" />
                      States: <code className="ml-1">owned</code>, <code className="ml-1">testDriven</code>, <code className="ml-1">interested</code>
                    </div>
                  </li>
                  
                  <li>
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      3
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">Add to Garage</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      System adds the vehicle to the garage with appropriate metadata and displays a success toast
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <PlusCircle size={16} className="mr-1" />
                      Context: <code className="ml-1">SavedItemsContext.addSavedItem()</code>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="managing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Managing Garage Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-color-neutral-6 space-y-6 pl-6 py-2">
                  <li className="mb-6">
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      1
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">Filter Vehicles</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      User selects a tab (All, Owned, Test Driven, Interested) to filter vehicles
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <Filter size={16} className="mr-1" />
                      Component: <code className="ml-1">GarageTabContent</code>
                    </div>
                  </li>
                  
                  <li className="mb-6">
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      2
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">Sort and Apply Additional Filters</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      User can sort by score or filter by minimum score requirements
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <Filter size={16} className="mr-1" />
                      Component: <code className="ml-1">GarageFilters</code>
                    </div>
                  </li>
                  
                  <li>
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      3
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">View Related Content</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      User can switch to view articles related to their saved vehicles
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <BookOpen size={16} className="mr-1" />
                      State: <code className="ml-1">contentView</code> switched to <code>'articles'</code>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comparing Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-color-neutral-6 space-y-6 pl-6 py-2">
                  <li className="mb-6">
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      1
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">Select Vehicles for Comparison</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      User selects 2-4 vehicles using the GarageCompare component
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <ArrowLeftRight size={16} className="mr-1" />
                      Component: <code className="ml-1">GarageCompare</code>
                    </div>
                  </li>
                  
                  <li className="mb-6">
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      2
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">Initiate Comparison</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      User clicks "Compare Selected" button to view side-by-side comparison
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <ChevronRight size={16} className="mr-1" />
                      Action: <code className="ml-1">handleCompare()</code>, sets <code>showComparison</code> to <code>true</code>
                    </div>
                  </li>
                  
                  <li>
                    <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-motortrend-red text-white">
                      3
                    </div>
                    <h4 className="typography-subtitle1 text-color-neutral-1 mb-1">View Comparison Table</h4>
                    <p className="text-sm text-color-neutral-3 mb-2">
                      System displays a detailed specification comparison table for the selected vehicles
                    </p>
                    <div className="flex items-center text-sm text-color-neutral-4">
                      <ArrowLeftRight size={16} className="mr-1" />
                      Component: <code className="ml-1">CarComparisonTable</code>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="typography-title text-color-neutral-1 mb-4">Implementation Notes</h3>
        <Card>
          <CardHeader>
            <CardTitle>Technical Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-color-neutral-3">
              The My Garage system is built using the following architecture:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4 bg-color-neutral-8">
                <h4 className="font-semibold text-color-neutral-1 mb-2">Data Layer</h4>
                <ul className="list-disc pl-5 text-sm text-color-neutral-3 space-y-1">
                  <li><code>SavedItemsContext</code> - Main data store with persistence</li>
                  <li><code>localStorage</code> - Client-side storage for saved vehicles</li>
                  <li><code>SavedItem</code> interface - Data model for garage entries</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-color-neutral-8">
                <h4 className="font-semibold text-color-neutral-1 mb-2">Component Layer</h4>
                <ul className="list-disc pl-5 text-sm text-color-neutral-3 space-y-1">
                  <li><code>GarageContent</code> - Main container component</li>
                  <li><code>QuickAddCar</code> - Vehicle addition component</li>
                  <li><code>GarageTabContent</code> - Filtered view of vehicles</li>
                  <li><code>GarageCompare</code> - Comparison selection interface</li>
                  <li><code>CarComparisonTable</code> - Side-by-side comparison</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-color-neutral-1 mb-2">Key Technical Considerations</h4>
              <ul className="list-disc pl-5 text-sm text-color-neutral-3 space-y-2">
                <li>
                  <strong>Persistence Strategy:</strong> Vehicle data is stored in localStorage for persistence across sessions
                </li>
                <li>
                  <strong>Type Safety:</strong> TypeScript interfaces ensure consistent data modeling for saved items
                </li>
                <li>
                  <strong>Context Usage:</strong> React Context provides a centralized state management solution
                </li>
                <li>
                  <strong>Component Composition:</strong> Modular components handle specific aspects of the garage functionality
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GarageSystemTab;
