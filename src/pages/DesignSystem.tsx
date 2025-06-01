import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import OverviewTab from '@/components/design-system/OverviewTab';
import ColorsTab from '@/components/design-system/ColorsTab';
import TypographyTab from '@/components/design-system/TypographyTab';
import SpacingTab from '@/components/design-system/SpacingTab';
import ComponentsTab from '@/components/design-system/ComponentsTab';
import CardsTab from '@/components/design-system/CardsTab';
import IconsTab from '@/components/design-system/IconsTab';
import AnimationsTab from '@/components/design-system/AnimationsTab';
import TokensTab from '@/components/design-system/TokensTab';
import PatternsTab from '@/components/design-system/PatternsTab';
import SearchTab from '@/components/design-system/SearchTab';
import PlaygroundTab from '@/components/design-system/PlaygroundTab';
import AccessibilityTab from '@/components/design-system/AccessibilityTab';
import { Download, Github, Code, Palette, BookOpen, FileText, Search } from 'lucide-react';

const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-color-neutral-8">
      <div className="w-full">
        <div className="py-6 px-0">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="typography-hero text-color-neutral-1 mb-4 md:mb-0 uppercase">DESIGN SYSTEM</h1>
              <p className="typography-body-large text-color-neutral-4 max-w-3xl">
                A comprehensive style guide and component library for the MotorTrend application. 
                Built with atomic design principles and modern design tokens.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar Navigation */}
          <div className="md:w-1/3 lg:w-1/4 md:min-h-[calc(100vh-160px)] md:border-r border-color-neutral-6 md:sticky md:top-0 md:self-start md:max-h-screen md:overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full p-4">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent">
                <div className="p-4 typography-small text-color-neutral-4 uppercase tracking-wider text-left w-full">Getting Started</div>
                <TabsTrigger value="overview" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="tokens" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <FileText className="h-4 w-4 mr-2" />
                  Design Tokens
                </TabsTrigger>
                
                <div className="p-4 typography-small text-color-neutral-4 uppercase tracking-wider mt-2 text-left w-full">Foundation</div>
                <TabsTrigger value="colors" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <Palette className="h-4 w-4 mr-2" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <span className="font-serif font-bold text-xs mr-2">A</span>
                  Typography
                </TabsTrigger>
                <TabsTrigger value="spacing" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <span className="text-xs mr-2">⟷</span>
                  Spacing
                </TabsTrigger>
                <TabsTrigger value="icons" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <span className="text-xs mr-2">★</span>
                  Icons
                </TabsTrigger>
                <TabsTrigger value="animations" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <span className="text-xs mr-2">⟳</span>
                  Animations
                </TabsTrigger>
                
                <div className="p-4 typography-small text-color-neutral-4 uppercase tracking-wider mt-2 text-left w-full">Components</div>
                <TabsTrigger value="components" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <span className="text-xs mr-2">⬚</span>
                  UI Components
                </TabsTrigger>
                <TabsTrigger value="cards" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <span className="text-xs mr-2">❏</span>
                  Cards
                </TabsTrigger>
                <TabsTrigger value="patterns" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <span className="text-xs mr-2">⌘</span>
                  Patterns
                </TabsTrigger>
                <TabsTrigger value="search" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </TabsTrigger>
                
                <div className="p-4 typography-small text-color-neutral-4 uppercase tracking-wider mt-2 text-left w-full">Resources</div>
                <TabsTrigger value="playground" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <Code className="h-4 w-4 mr-2" />
                  Playground
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="justify-start text-left w-full rounded-none border-l-2 border-transparent data-[state=active]:border-color-primary-2 px-4 py-3">
                  <span className="text-xs mr-2">♿</span>
                  Accessibility
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Content Area */}
          <div className="md:w-2/3 lg:w-3/4 py-6 px-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="overview">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="colors">
                <ColorsTab />
              </TabsContent>

              <TabsContent value="typography">
                <TypographyTab />
              </TabsContent>

              <TabsContent value="spacing">
                <SpacingTab />
              </TabsContent>

              <TabsContent value="components">
                <ComponentsTab />
              </TabsContent>

              <TabsContent value="cards">
                <CardsTab />
              </TabsContent>

              <TabsContent value="icons">
                <IconsTab />
              </TabsContent>

              <TabsContent value="animations">
                <AnimationsTab />
              </TabsContent>

              <TabsContent value="tokens">
                <TokensTab />
              </TabsContent>

              <TabsContent value="patterns" className="py-6 px-0">
                <PatternsTab />
              </TabsContent>
              
              <TabsContent value="search" className="py-6 px-0">
                <SearchTab />
              </TabsContent>

              <TabsContent value="playground">
                <PlaygroundTab />
              </TabsContent>

              <TabsContent value="accessibility">
                <AccessibilityTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;
