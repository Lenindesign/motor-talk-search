import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Download, Github, Code, Palette, BookOpen, FileText, Search } from 'lucide-react';

/**
 * Fixed version of the Design System page that uses relative imports
 * instead of path aliases to avoid potential path resolution issues
 */
const DesignSystemFix = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-color-neutral-8">
      <div className="max-w-[980px] mx-auto">
        <div className="p-6 pb-0">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="typography-hero text-color-neutral-1 mb-4 md:mb-0 uppercase">DESIGN SYSTEM</h1>
              <p className="typography-body-large text-color-neutral-4 max-w-3xl">
                A comprehensive style guide and component library for the MotorTrend application. 
                Built with atomic design principles and modern design tokens.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Design Assets
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Github size={16} />
                Component Code
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar Navigation */}
          <div className="md:w-1/3 lg:w-1/4 md:min-h-[calc(100vh-160px)] md:border-r border-color-neutral-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full p-4">
              <TabsList className="flex flex-col items-start h-auto bg-transparent space-y-1">
                <TabsTrigger 
                  value="overview" 
                  className="w-full justify-start text-left px-3 py-2 h-auto"
                >
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>Overview</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="colors" 
                  className="w-full justify-start text-left px-3 py-2 h-auto"
                >
                  <div className="flex items-center">
                    <Palette className="h-4 w-4 mr-2" />
                    <span>Colors</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="typography" 
                  className="w-full justify-start text-left px-3 py-2 h-auto"
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Typography</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="components" 
                  className="w-full justify-start text-left px-3 py-2 h-auto"
                >
                  <div className="flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    <span>Components</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="search" 
                  className="w-full justify-start text-left px-3 py-2 h-auto"
                >
                  <div className="flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    <span>Search</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Main Content Area */}
          <div className="md:w-2/3 lg:w-3/4 p-6">
            <TabsContent value="overview" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Design System Overview</CardTitle>
                  <CardDescription>
                    Core principles and guidelines for the MotorTrend design system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The MotorTrend design system provides a comprehensive set of guidelines, 
                    components, and resources to create consistent and high-quality user experiences 
                    across all MotorTrend digital products.
                  </p>
                  
                  <h3 className="text-lg font-semibold mt-4">Core Principles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="border border-neutral-6 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Consistency</h4>
                      <p className="text-sm text-neutral-4">
                        Create familiar patterns and experiences across all touchpoints
                      </p>
                    </div>
                    <div className="border border-neutral-6 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Accessibility</h4>
                      <p className="text-sm text-neutral-4">
                        Design for all users regardless of ability or context
                      </p>
                    </div>
                    <div className="border border-neutral-6 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Performance</h4>
                      <p className="text-sm text-neutral-4">
                        Optimize for speed and efficiency across devices
                      </p>
                    </div>
                    <div className="border border-neutral-6 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Modularity</h4>
                      <p className="text-sm text-neutral-4">
                        Build with reusable, composable components
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colors" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Color System</CardTitle>
                  <CardDescription>
                    Primary, secondary, and neutral color palettes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Brand Colors</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="h-20 bg-red-600 rounded-md"></div>
                          <div>
                            <p className="font-medium">MotorTrend Red</p>
                            <p className="text-sm text-neutral-4">#D81E05</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 bg-gray-900 rounded-md"></div>
                          <div>
                            <p className="font-medium">MotorTrend Dark</p>
                            <p className="text-sm text-neutral-4">#1A1A1A</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 bg-gray-100 rounded-md"></div>
                          <div>
                            <p className="font-medium">MotorTrend Gray</p>
                            <p className="text-sm text-neutral-4">#F5F5F5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Neutral Colors</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                        {[100, 200, 300, 400, 500, 600, 700, 800].map((weight) => (
                          <div key={weight} className="space-y-1">
                            <div className={`h-10 bg-gray-${weight} rounded-md`}></div>
                            <p className="text-xs font-medium">{weight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Typography</CardTitle>
                  <CardDescription>
                    Type scale, fonts, and text styles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Font Family</h3>
                      <p className="font-medium">Primary: Inter</p>
                      <p className="text-sm text-neutral-4 mb-4">
                        A clean, versatile sans-serif typeface designed for screens
                      </p>
                      
                      <div className="border border-neutral-6 rounded-lg p-4">
                        <p className="font-normal">
                          The quick brown fox jumps over the lazy dog.
                        </p>
                        <p className="font-medium">
                          The quick brown fox jumps over the lazy dog.
                        </p>
                        <p className="font-semibold">
                          The quick brown fox jumps over the lazy dog.
                        </p>
                        <p className="font-bold">
                          The quick brown fox jumps over the lazy dog.
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Type Scale</h3>
                      <div className="space-y-4">
                        <div>
                          <h1 className="text-4xl font-bold">Heading 1</h1>
                          <p className="text-sm text-neutral-4">2.5rem / 40px</p>
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">Heading 2</h2>
                          <p className="text-sm text-neutral-4">2rem / 32px</p>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">Heading 3</h3>
                          <p className="text-sm text-neutral-4">1.5rem / 24px</p>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">Heading 4</h4>
                          <p className="text-sm text-neutral-4">1.25rem / 20px</p>
                        </div>
                        <div>
                          <p className="text-base">Body</p>
                          <p className="text-sm text-neutral-4">1rem / 16px</p>
                        </div>
                        <div>
                          <p className="text-sm">Small</p>
                          <p className="text-sm text-neutral-4">0.875rem / 14px</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="components" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Components</CardTitle>
                  <CardDescription>
                    Core UI components and patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Buttons</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Cards</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card description goes here</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Card content and information</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card description goes here</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Card content and information</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Search Patterns</CardTitle>
                  <CardDescription>
                    Search UI components and behaviors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p>
                      The search system is designed to help users quickly find relevant content 
                      across the MotorTrend ecosystem, including articles, videos, car specifications, 
                      and more.
                    </p>
                    
                    <div className="border border-neutral-6 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Search Input</h3>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-4" />
                        <input 
                          type="text" 
                          placeholder="Search for cars, articles, videos..." 
                          className="w-full pl-10 pr-4 py-2 border border-neutral-6 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemFix;
