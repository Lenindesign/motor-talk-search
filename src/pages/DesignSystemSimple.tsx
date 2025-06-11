import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

/**
 * A simplified design system page that doesn't rely on complex imports
 * This helps diagnose issues with the full design system page
 */
const DesignSystemSimple = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-[980px] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Design System</h1>
        <p className="mb-6 text-gray-600">
          A simplified version of the design system to help diagnose loading issues.
        </p>
        
        <Tabs defaultValue="components">
          <TabsList className="mb-4">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
          </TabsList>
          
          <TabsContent value="components" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Buttons</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="link">Link Button</Button>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Cards</h2>
              <p>This is a card component with padding applied.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="colors" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Color Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-20 w-full bg-red-600 rounded-md mb-2"></div>
                  <p className="text-sm font-medium">MotorTrend Red</p>
                  <p className="text-xs text-gray-500">#D81E05</p>
                </div>
                <div>
                  <div className="h-20 w-full bg-gray-900 rounded-md mb-2"></div>
                  <p className="text-sm font-medium">MotorTrend Dark</p>
                  <p className="text-xs text-gray-500">#1A1A1A</p>
                </div>
                <div>
                  <div className="h-20 w-full bg-gray-100 rounded-md mb-2"></div>
                  <p className="text-sm font-medium">MotorTrend Gray</p>
                  <p className="text-xs text-gray-500">#F5F5F5</p>
                </div>
                <div>
                  <div className="h-20 w-full bg-white border border-gray-200 rounded-md mb-2"></div>
                  <p className="text-sm font-medium">White</p>
                  <p className="text-xs text-gray-500">#FFFFFF</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Typography</h2>
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold">Heading 1</h1>
                  <p className="text-sm text-gray-500">typography-h1</p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Heading 2</h2>
                  <p className="text-sm text-gray-500">typography-h2</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Heading 3</h3>
                  <p className="text-sm text-gray-500">typography-h3</p>
                </div>
                <div>
                  <p className="text-base">Body Text</p>
                  <p className="text-sm text-gray-500">typography-body</p>
                </div>
                <div>
                  <p className="text-sm">Small Text</p>
                  <p className="text-sm text-gray-500">typography-small</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystemSimple;
