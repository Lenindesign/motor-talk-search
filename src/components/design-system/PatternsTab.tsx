import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Info, X, Check } from 'lucide-react';
import ResponsivePreview from './ResponsivePreview';

const PatternsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Common UI Patterns</CardTitle>
          <CardDescription>
            Standardized interaction patterns to maintain consistency across the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-4 mb-6">
            UI Patterns are recurring solutions to common design problems. Using these consistent patterns 
            reduces cognitive load for users and helps create a familiar, intuitive experience.
          </p>
          
          <Tabs defaultValue="navigation" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
              <TabsTrigger value="forms">Forms & Inputs</TabsTrigger>
              <TabsTrigger value="feedback">User Feedback</TabsTrigger>
            </TabsList>
            
            <TabsContent value="navigation">
              <div className="space-y-6">
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Breadcrumb Navigation</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Help users understand their location in the application hierarchy.
                  </p>
                  <Card>
                    <CardContent className="p-4">
                      <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                          <li>
                            <a href="#" className="text-neutral-4 hover:text-primary-2 text-sm">Home</a>
                          </li>
                          <li className="flex items-center">
                            <span className="mx-1 text-neutral-5">/</span>
                            <a href="#" className="text-neutral-4 hover:text-primary-2 text-sm">Cars</a>
                          </li>
                          <li className="flex items-center">
                            <span className="mx-1 text-neutral-5">/</span>
                            <a href="#" className="text-neutral-4 hover:text-primary-2 text-sm">SUVs</a>
                          </li>
                          <li className="flex items-center">
                            <span className="mx-1 text-neutral-5">/</span>
                            <span className="text-neutral-1 font-medium text-sm">Honda CR-V</span>
                          </li>
                        </ol>
                      </nav>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Tab Navigation</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Allow users to switch between related content sections.
                  </p>
                  <Card>
                    <CardContent className="p-4">
                      <div className="border-b">
                        <div className="flex -mb-px space-x-6">
                          <button className="text-primary-2 border-b-2 border-primary-2 py-2 px-1 font-medium">
                            Overview
                          </button>
                          <button className="text-neutral-4 hover:text-neutral-1 py-2 px-1">
                            Specs
                          </button>
                          <button className="text-neutral-4 hover:text-neutral-1 py-2 px-1">
                            Reviews
                          </button>
                          <button className="text-neutral-4 hover:text-neutral-1 py-2 px-1">
                            Compare
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Mobile Navigation</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Consistent navigation patterns for mobile devices.
                  </p>
                  <ResponsivePreview defaultDevice="mobile">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="p-4 border-b flex justify-between items-center">
                        <div>
                          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="120" height="24" fill="#E90C17"/>
                            <path d="M12 6H108V18H12V6Z" fill="white"/>
                          </svg>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2">
                            <Search size={20} />
                          </button>
                          <button className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="4" x2="20" y1="12" y2="12" />
                              <line x1="4" x2="20" y1="6" y2="6" />
                              <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Content Area */}
                      <div className="flex-1 bg-neutral-7 p-4">
                        <div className="h-40 bg-white rounded shadow flex items-center justify-center">
                          Content Area
                        </div>
                      </div>
                      
                      {/* Bottom Navigation */}
                      <div className="grid grid-cols-5 border-t">
                        {['Home', 'Search', 'News', 'Videos', 'Profile'].map((item, i) => (
                          <div key={i} className={`flex flex-col items-center py-2 text-xs ${i === 0 ? 'text-primary-2' : 'text-neutral-4'}`}>
                            <div className="w-5 h-5 mb-1"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ResponsivePreview>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="forms">
              <div className="space-y-6">
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Search Pattern</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Consistent search input with predictable behavior.
                  </p>
                  <Card>
                    <CardContent className="p-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-4 h-4 w-4" />
                        <Input placeholder="Search cars, news, videos..." className="pl-10" />
                      </div>
                      <div className="mt-4 max-w-md">
                        <div className="text-sm text-neutral-4 mb-2">Recent searches:</div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="flex gap-1 items-center">
                            2025 Honda Civic
                            <X className="h-3 w-3 cursor-pointer" />
                          </Badge>
                          <Badge variant="outline" className="flex gap-1 items-center">
                            Electric SUVs
                            <X className="h-3 w-3 cursor-pointer" />
                          </Badge>
                          <Badge variant="outline" className="flex gap-1 items-center">
                            Best trucks
                            <X className="h-3 w-3 cursor-pointer" />
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Form Validation</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Consistent error and success states for form fields.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-2 text-sm font-medium">Email</label>
                            <div className="relative">
                              <Input className="border-red-500 pr-10" defaultValue="invalidemail" />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <X className="h-4 w-4 text-red-500" />
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-red-500">Please enter a valid email address</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-2 text-sm font-medium">Password</label>
                            <div className="relative">
                              <Input type="password" className="border-green-500 pr-10" defaultValue="password123" />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <Check className="h-4 w-4 text-green-500" />
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-green-500">Password strength: Good</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="feedback">
              <div className="space-y-6">
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Toast Notifications</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Temporary notifications to provide feedback to users.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Success Toast</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="border border-neutral-6 rounded-lg p-4 flex items-center gap-3 bg-green-50">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">Success</div>
                            <div className="text-xs text-neutral-4">Your changes have been saved</div>
                          </div>
                          <button className="ml-auto">
                            <X className="h-4 w-4 text-neutral-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Error Toast</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="border border-neutral-6 rounded-lg p-4 flex items-center gap-3 bg-red-50">
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                            <X className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">Error</div>
                            <div className="text-xs text-neutral-4">There was a problem saving your changes</div>
                          </div>
                          <button className="ml-auto">
                            <X className="h-4 w-4 text-neutral-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Loading States</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Consistent loading indicators across the application.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex justify-center items-center">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full border-4 border-neutral-6 border-t-primary-2 animate-spin"></div>
                          <p className="mt-2 text-sm text-neutral-4">Spinner</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex justify-center items-center">
                        <div className="flex flex-col items-center">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary-2 animate-bounce"></div>
                            <div className="h-2 w-2 rounded-full bg-primary-2 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="h-2 w-2 rounded-full bg-primary-2 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                          <p className="mt-2 text-sm text-neutral-4">Dots</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="h-4 bg-neutral-6 rounded animate-pulse w-3/4"></div>
                          <div className="h-4 bg-neutral-6 rounded animate-pulse"></div>
                          <div className="h-4 bg-neutral-6 rounded animate-pulse w-5/6"></div>
                          <p className="mt-2 text-sm text-neutral-4">Skeleton</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="typography-title text-neutral-1 mb-2">Empty States</h3>
                  <p className="typography-body text-neutral-4 mb-3">
                    Guiding users when there's no content to display.
                  </p>
                  <Card>
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-neutral-6 rounded-full flex items-center justify-center mb-4">
                          <Info className="w-8 h-8 text-neutral-4" />
                        </div>
                        <h3 className="typography-title mb-2">No cars saved yet</h3>
                        <p className="text-neutral-4 mb-4 max-w-md">
                          Save cars to your garage to compare them, track prices, and get notified about special offers.
                        </p>
                        <Button>Browse cars</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Design Pattern Documentation</CardTitle>
          <CardDescription>Guidelines for documenting UI patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="typography-body text-neutral-4">
              Each UI pattern should be documented with the following information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-neutral-6 p-4 rounded-lg">
                <h4 className="typography-title text-neutral-1 mb-2">Documentation Template</h4>
                <ul className="typography-body text-neutral-4 space-y-2">
                  <li>• <span className="font-medium">Pattern name:</span> Descriptive, unique name</li>
                  <li>• <span className="font-medium">Problem:</span> What user/business problem does it solve?</li>
                  <li>• <span className="font-medium">Solution:</span> How the pattern solves the problem</li>
                  <li>• <span className="font-medium">Usage guidelines:</span> When to use and not use</li>
                  <li>• <span className="font-medium">Examples:</span> Visual examples in different states</li>
                  <li>• <span className="font-medium">Behaviors:</span> How it responds to user interaction</li>
                </ul>
              </div>
              <div className="border border-neutral-6 p-4 rounded-lg">
                <h4 className="typography-title text-neutral-1 mb-2">When to Create a Pattern</h4>
                <ul className="typography-body text-neutral-4 space-y-2">
                  <li>• When the same solution is needed in multiple places</li>
                  <li>• When users expect consistent behavior</li>
                  <li>• When the solution can be abstracted and reused</li>
                  <li>• When the pattern addresses a common use case</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatternsTab;
