import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, AlertCircle, Info, Eye } from 'lucide-react';

const AccessibilityTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Guidelines</CardTitle>
          <CardDescription>
            Ensuring our product is accessible to all users, including those with disabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="typography-title text-neutral-1 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                WCAG 2.1 AA Compliance
              </h3>
              <p className="typography-body text-neutral-4">
                All components should meet or exceed WCAG 2.1 AA standards for accessibility.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="typography-title text-neutral-1 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Keyboard Navigation
              </h3>
              <p className="typography-body text-neutral-4">
                All interactive elements must be accessible via keyboard with clear focus states.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="color" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="color">Color & Contrast</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="assistive">Assistive Tech</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="color">
          <Card>
            <CardHeader>
              <CardTitle>Color & Contrast Ratio</CardTitle>
              <CardDescription>Guidelines for ensuring readable content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-neutral-4">
                  Text should have a contrast ratio of at least 4.5:1 against its background 
                  (3:1 for large text).
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="typography-title text-neutral-1">Good Examples</h4>
                  
                  <div className="p-4 bg-neutral-1 rounded flex items-center">
                    <p className="text-white">White text on dark background</p>
                    <span className="ml-auto text-green-500">7.5:1</span>
                  </div>
                  
                  <div className="p-4 bg-white border border-neutral-6 rounded flex items-center">
                    <p className="text-neutral-1">Dark text on white background</p>
                    <span className="ml-auto text-green-500">12:1</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="typography-title text-neutral-1">Poor Examples</h4>
                  
                  <div className="p-4 bg-neutral-5 rounded flex items-center">
                    <p className="text-white">White text on light grey</p>
                    <span className="ml-auto text-red-500">2.1:1</span>
                  </div>
                  
                  <div className="p-4 bg-blue-500 rounded flex items-center">
                    <p className="text-blue-800">Blue text on blue background</p>
                    <span className="ml-auto text-red-500">1.8:1</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="typography-title text-neutral-1 mb-2">Don't rely on color alone</h4>
                <p className="typography-body text-neutral-4 mb-4">
                  Always use additional indicators beyond color to convey information:
                </p>
                
                <div className="flex space-x-4">
                  <div className="border border-neutral-6 p-3 rounded">
                    <p className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <Check className="w-4 h-4 mr-1 text-green-500" />
                      Success state
                    </p>
                  </div>
                  <div className="border border-neutral-6 p-3 rounded">
                    <p className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <AlertCircle className="w-4 h-4 mr-1 text-red-500" />
                      Error state
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Semantic Structure</CardTitle>
              <CardDescription>Proper HTML structure for accessibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="typography-title text-neutral-1">Heading Hierarchy</h4>
                <p className="typography-body text-neutral-4">
                  Use proper heading levels (h1-h6) to maintain document structure
                </p>
                <div className="bg-neutral-7 p-4 rounded-md font-mono text-sm">
                  <pre>{`<h1>Page Title</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<!-- Not: <h6>Skipping levels</h6> -->`}</pre>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="typography-title text-neutral-1">Landmark Regions</h4>
                <p className="typography-body text-neutral-4">
                  Use semantic HTML5 elements to define page regions
                </p>
                <div className="bg-neutral-7 p-4 rounded-md font-mono text-sm">
                  <pre>{`<header>Site header and navigation</header>
<main>Main content area</main>
<aside>Sidebar content</aside>
<footer>Site footer</footer>`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assistive">
          <Card>
            <CardHeader>
              <CardTitle>Assistive Technology Support</CardTitle>
              <CardDescription>Guidelines for screen reader compatibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="typography-title text-neutral-1">ARIA Attributes</h4>
                <p className="typography-body text-neutral-4">
                  Use ARIA attributes when native HTML semantics aren't sufficient
                </p>
                <div className="bg-neutral-7 p-4 rounded-md font-mono text-sm">
                  <pre>{`<!-- Custom toggle button -->
<div 
  role="button"
  tabindex="0"
  aria-pressed="false"
  aria-label="Toggle dark mode"
>
  Toggle
</div>`}</pre>
                </div>
              </div>
              
              <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Always prefer native HTML elements when possible before using ARIA roles.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <h4 className="typography-title text-neutral-1">Screen Reader Text</h4>
                <p className="typography-body text-neutral-4">
                  Provide text for screen readers that is visually hidden
                </p>
                <div className="bg-neutral-7 p-4 rounded-md font-mono text-sm">
                  <pre>{`<button>
  <svg>...</svg>
  <span className="sr-only">Close menu</span>
</button>`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="testing">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Testing</CardTitle>
              <CardDescription>Tools and methods for testing accessibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-neutral-6 p-4 rounded">
                  <h4 className="typography-title text-neutral-1 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Manual Testing
                  </h4>
                  <ul className="typography-body text-neutral-4 space-y-2 mt-2">
                    <li>• Test keyboard navigation (Tab, Enter, Space, Esc)</li>
                    <li>• Use screen readers (NVDA, VoiceOver, JAWS)</li>
                    <li>• Test at 200% zoom level</li>
                    <li>• Disable CSS to check document structure</li>
                  </ul>
                </div>
                
                <div className="border border-neutral-6 p-4 rounded">
                  <h4 className="typography-title text-neutral-1 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Automated Testing
                  </h4>
                  <ul className="typography-body text-neutral-4 space-y-2 mt-2">
                    <li>• Axe DevTools</li>
                    <li>• Lighthouse Accessibility Audit</li>
                    <li>• WAVE Web Accessibility Evaluation Tool</li>
                    <li>• Color contrast analyzers</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="mt-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription>
                  Automated testing can catch many issues, but manual testing is essential 
                  for comprehensive accessibility evaluation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessibilityTab;
