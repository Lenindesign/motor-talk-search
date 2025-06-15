import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Car, Info, Users, Clock, Zap, ArrowRight } from 'lucide-react';
import MyGarageSkinny from '../profile/MyGarageSkinny';
import MyGarageSlideshow from './MyGarageSlideshow';

const GarageTab = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="typography-title text-neutral-1 mb-4">My Garage</h2>
        <p className="typography-body text-neutral-3 mb-6">
          The My Garage feature allows users to save, organize, compare, and track vehicles they own, are interested in, or have test-driven.
          This section provides an overview of the garage components, user journeys, and implementation guidelines.
        </p>
        
        {/* My Garage Slideshow */}
        <div className="mb-8">
          <h3 className="typography-subtitle text-neutral-1 mb-4">Feature Overview</h3>
          <MyGarageSlideshow />
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="typography-subtitle">Documentation</CardTitle>
            <CardDescription>
              Comprehensive documentation is available in the resources section
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <a 
                href="/design-system/resources/my-garage-guide" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-motortrend-red hover:underline flex items-center"
              >
                View My Garage Guide <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div>
        <h3 className="typography-subtitle text-neutral-1 mb-4">Core Components</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="typography-caption flex items-center gap-2">
                <Car size={16} />
                My Garage Skinny
              </CardTitle>
              <CardDescription>Compact garage view for profile and sidebar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-neutral-7 rounded-lg p-4 bg-neutral-8">
                <MyGarageSkinny />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="typography-caption flex items-center gap-2">
                <Car size={16} />
                Garage Content
              </CardTitle>
              <CardDescription>Full garage experience with comparison tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-neutral-7 rounded-lg p-4 bg-neutral-8">
                <div className="flex items-center justify-center p-6">
                  <div className="text-center">
                    <Car size={32} className="mx-auto text-neutral-4 mb-3" />
                    <p className="typography-caption text-neutral-3 mb-2">Full Garage Experience</p>
                    <p className="typography-caption-small text-neutral-4">
                      Includes vehicle management, comparison tools, and payment calculator
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="typography-subtitle text-neutral-1 mb-4">User Journeys</h3>
        
        <Tabs defaultValue="adding" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="adding">Adding Vehicles</TabsTrigger>
            <TabsTrigger value="comparing">Comparing</TabsTrigger>
            <TabsTrigger value="managing">Managing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="adding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="typography-caption flex items-center gap-2">
                  <Zap size={16} />
                  Adding a Vehicle to Garage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">1</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Browse Vehicle Listings</h4>
                      <p className="typography-caption-small text-neutral-4">User explores new or used car listings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">2</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Click Save Button</h4>
                      <p className="typography-caption-small text-neutral-4">User clicks the bookmark icon on a vehicle card</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">3</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Select Ownership Status</h4>
                      <p className="typography-caption-small text-neutral-4">User chooses: Owned, Test Drive, or Interested</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">4</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Vehicle Added to Garage</h4>
                      <p className="typography-caption-small text-neutral-4">Vehicle appears in My Garage section</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="typography-caption flex items-center gap-2">
                  <Users size={16} />
                  Comparing Vehicles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">1</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Open My Garage</h4>
                      <p className="typography-caption-small text-neutral-4">User navigates to their garage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">2</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Select Multiple Vehicles</h4>
                      <p className="typography-caption-small text-neutral-4">User checks boxes next to vehicles to compare</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">3</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">View Side-by-Side Comparison</h4>
                      <p className="typography-caption-small text-neutral-4">System displays specifications in comparative format</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">4</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Calculate Payments</h4>
                      <p className="typography-caption-small text-neutral-4">User compares financing options across vehicles</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="managing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="typography-caption flex items-center gap-2">
                  <Clock size={16} />
                  Managing Garage Vehicles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">1</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Select Vehicle</h4>
                      <p className="typography-caption-small text-neutral-4">User clicks on a vehicle in their garage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">2</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Update Ownership Status</h4>
                      <p className="typography-caption-small text-neutral-4">User can change from Interested to Owned, etc.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">3</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Add Notes</h4>
                      <p className="typography-caption-small text-neutral-4">User can add personal notes about the vehicle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-7 rounded-full w-8 h-8 flex items-center justify-center text-neutral-1 font-medium">4</div>
                    <div>
                      <h4 className="typography-caption text-neutral-1">Remove from Garage</h4>
                      <p className="typography-caption-small text-neutral-4">User can delete vehicles they no longer want to track</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Separator />

      <div>
        <h3 className="typography-subtitle text-neutral-1 mb-4">Mobile Optimization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="typography-caption flex items-center gap-2">
                <Info size={16} />
                List vs. Grid Layout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="typography-caption-small text-neutral-4">
                Mobile view uses a vertical list layout for vehicles while desktop uses a grid layout with more visible information.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="typography-caption flex items-center gap-2">
                <Info size={16} />
                Touch Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="typography-caption-small text-neutral-4">
                Larger touch targets for vehicle selection, swipe gestures for quick actions, and bottom sheet modals for comparison.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="typography-caption flex items-center gap-2">
                <Info size={16} />
                Progressive Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="typography-caption-small text-neutral-4">
                Essential information shown first with expandable sections for detailed specifications and optimized comparison view.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="typography-subtitle text-neutral-1 mb-4">Implementation Example</h3>
        
        <Card>
          <CardHeader>
            <CardTitle className="typography-caption">Saving a Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-neutral-8 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`const { addSavedItem } = useSavedItems();

// Example of saving a new car
const saveVehicle = () => {
  addSavedItem({
    id: carData.id,
    title: carData.title,
    type: 'newCar', // or 'usedCar'
    imageUrl: carData.imageUrl,
    savedAt: new Date().toISOString(),
    metadata: {
      price: carData.price,
      year: carData.year,
      ownership: 'interested', // or 'owned', 'testDriven'
      // other car details
    }
  });
};`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GarageTab;
