import React, { useState, lazy, Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/design-system/Button';
import { Separator } from '@/components/ui/separator';
import { Download, Github, Code, Palette, BookOpen, FileText, Search, Layout, FormInput, CreditCard, Type, Car, DollarSign, Sparkles, Zap } from 'lucide-react';

// Lazy load components
const OverviewTab = lazy(() => import('@/components/design-system/OverviewTab'));
const ColorsTab = lazy(() => import('@/components/design-system/ColorsTab'));
const TypographyTab = lazy(() => import('@/components/design-system/TypographyTab'));
const SpacingTab = lazy(() => import('@/components/design-system/SpacingTab'));
const ComponentsTab = lazy(() => import('@/components/design-system/ComponentsTab'));
const CardsTab = lazy(() => import('@/components/design-system/CardsTab'));
const IconsTab = lazy(() => import('@/components/design-system/IconsTab'));
const AnimationsTab = lazy(() => import('@/components/design-system/AnimationsTab'));
const TokensTab = lazy(() => import('@/components/design-system/TokensTab'));
const PatternsTab = lazy(() => import('@/components/design-system/PatternsTab'));
const SearchTab = lazy(() => import('@/components/design-system/SearchTab'));
const ButtonPlaygroundTab = lazy(() => import('@/components/design-system/ButtonPlayground'));
const CardPlaygroundTab = lazy(() => import('@/components/design-system/CardPlayground'));
const TypographyPlaygroundTab = lazy(() => import('@/components/design-system/TypographyPlayground'));
const GarageTab = lazy(() => import('@/components/design-system/GarageTab'));
const AccessibilityTab = lazy(() => import('@/components/design-system/AccessibilityTab'));
const LayoutTab = lazy(() => import('@/components/design-system/LayoutTab'));
const FormsTab = lazy(() => import('@/components/design-system/FormsTab'));
const FindBestPriceTab = lazy(() => import('@/components/design-system/FindBestPriceTab'));

const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-neutral-8">
      <div className="container-modern">
        {/* Apple-style Header */}
        <div className="py-12 border-b border-neutral-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-2 to-primary-1 rounded-2xl flex items-center justify-center shadow-modern">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="typography-display text-neutral-1">Design System</h1>
                </div>
              </div>
              <p className="typography-body-large text-neutral-3 max-w-2xl">
                A comprehensive design system featuring modern components, consistent tokens, and delightful interactions.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="md" icon={<Download className="w-4 h-4" />}>
                Download
              </Button>
              <Button variant="ghost" size="md" icon={<Github className="w-4 h-4" />}>
                GitHub
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Apple-style Sidebar Navigation */}
          <div className="lg:w-80 lg:border-r border-neutral-6 lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto scrollbar-modern">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent w-full">
                
                {/* Getting Started Section */}
                <div className="w-full">
                  <div className="px-6 py-4 border-b border-neutral-6">
                    <h3 className="typography-small text-neutral-4">Getting Started</h3>
                  </div>
                  <div className="space-y-1 p-2">
                    <TabsTrigger 
                      value="overview" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <BookOpen className="h-4 w-4 mr-3" />
                      <span className="typography-body">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="patterns" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <FileText className="h-4 w-4 mr-3" />
                      <span className="typography-body">Patterns</span>
                    </TabsTrigger>
                  </div>
                </div>

                {/* Foundation Section */}
                <div className="w-full">
                  <div className="px-6 py-4 border-b border-neutral-6">
                    <h3 className="typography-small text-neutral-4">Foundation</h3>
                  </div>
                  <div className="space-y-1 p-2">
                    <TabsTrigger 
                      value="colors" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <Palette className="h-4 w-4 mr-3" />
                      <span className="typography-body">Colors</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="typography" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <Type className="h-4 w-4 mr-3" />
                      <span className="typography-body">Typography</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="layout" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <Layout className="h-4 w-4 mr-3" />
                      <span className="typography-body">Layout</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="spacing" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <span className="text-sm mr-3">⟷</span>
                      <span className="typography-body">Spacing</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="icons" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <span className="text-sm mr-3">★</span>
                      <span className="typography-body">Icons</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="animations" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <Zap className="h-4 w-4 mr-3" />
                      <span className="typography-body">Animations</span>
                    </TabsTrigger>
                  </div>
                </div>

                {/* Components Section */}
                <div className="w-full">
                  <div className="px-6 py-4 border-b border-neutral-6">
                    <h3 className="typography-small text-neutral-4">Components</h3>
                  </div>
                  <div className="space-y-1 p-2">
                    <TabsTrigger 
                      value="components" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <span className="text-sm mr-3">⬚</span>
                      <span className="typography-body">UI Components</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="forms" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <FormInput className="h-4 w-4 mr-3" />
                      <span className="typography-body">Forms</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="cards" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <CreditCard className="h-4 w-4 mr-3" />
                      <span className="typography-body">Cards</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="search" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <Search className="h-4 w-4 mr-3" />
                      <span className="typography-body">Search</span>
                    </TabsTrigger>
                  </div>
                </div>

                {/* Playground Section */}
                <div className="w-full">
                  <div className="px-6 py-4 border-b border-neutral-6">
                    <h3 className="typography-small text-neutral-4">Playground</h3>
                  </div>
                  <div className="space-y-1 p-2">
                    <TabsTrigger 
                      value="button-playground" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <Code className="h-4 w-4 mr-3" />
                      <span className="typography-body">Button Playground</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="card-playground" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <CreditCard className="h-4 w-4 mr-3" />
                      <span className="typography-body">Card Playground</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="typography-playground" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <Type className="h-4 w-4 mr-3" />
                      <span className="typography-body">Typography Playground</span>
                    </TabsTrigger>
                  </div>
                </div>

                {/* Resources Section */}
                <div className="w-full">
                  <div className="px-6 py-4 border-b border-neutral-6">
                    <h3 className="typography-small text-neutral-4">Resources</h3>
                  </div>
                  <div className="space-y-1 p-2">
                    <TabsTrigger 
                      value="garage" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <Car className="h-4 w-4 mr-3" />
                      <span className="typography-body">My Garage</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="find-best-price" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <DollarSign className="h-4 w-4 mr-3" />
                      <span className="typography-body">Find Best Price</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="accessibility" 
                      className="w-full justify-start text-left rounded-lg px-4 py-3 data-[state=active]:bg-neutral-6 data-[state=active]:text-neutral-1 hover:bg-neutral-7 transition-apple"
                    >
                      <span className="text-sm mr-3">♿</span>
                      <span className="typography-body">Accessibility</span>
                    </TabsTrigger>
                  </div>
                </div>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Apple-style Content Area */}
          <div className="flex-1 lg:pl-8 min-w-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="py-4 px-4 sm:py-8 sm:px-0">
                <TabsContent value="overview" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <OverviewTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="colors" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <ColorsTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="typography" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <TypographyTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="spacing" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <SpacingTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="components" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <ComponentsTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="forms" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <FormsTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="cards" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <CardsTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="icons" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <IconsTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="animations" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <AnimationsTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="tokens" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <TokensTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="layout" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <LayoutTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="patterns" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <PatternsTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="search" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <SearchTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="find-best-price" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <FindBestPriceTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="garage" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <GarageTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="button-playground" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <ButtonPlaygroundTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="card-playground" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <CardPlaygroundTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="typography-playground" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <TypographyPlaygroundTab />
                  </Suspense>
                </TabsContent>

                <TabsContent value="accessibility" className="mt-0">
                  <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="skeleton-modern w-full h-64 rounded-2xl"></div>
                    </div>
                  }>
                    <AccessibilityTab />
                  </Suspense>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;
