
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
import PlaygroundTab from '@/components/design-system/PlaygroundTab';
import AccessibilityTab from '@/components/design-system/AccessibilityTab';
import { Download, Github, Code, Palette, BookOpen, FileText } from 'lucide-react';

const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-neutral-8 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="typography-hero text-neutral-1 mb-4">Design System</h1>
            <p className="typography-body-large text-neutral-4 max-w-2xl">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-12 mb-8 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 md:mr-1" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 md:mr-1" />
              <span className="hidden md:inline">Tokens</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 md:mr-1" />
              <span className="hidden md:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xs md:mr-1">A</span>
              <span className="hidden md:inline">Typography</span>
            </TabsTrigger>
            <TabsTrigger value="spacing" className="flex items-center gap-1.5">
              <span className="text-xs">⟷</span>
              <span className="hidden md:inline">Spacing</span>
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-1.5">
              <span className="text-xs">⬚</span>
              <span className="hidden md:inline">Components</span>
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-1.5">
              <span className="text-xs">⌘</span>
              <span className="hidden md:inline">Patterns</span>
            </TabsTrigger>
            <TabsTrigger value="playground" className="flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 md:mr-1" />
              <span className="hidden md:inline">Playground</span>
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-1.5">
              <span className="text-xs">❏</span>
              <span className="hidden md:inline">Cards</span>
            </TabsTrigger>
            <TabsTrigger value="icons" className="flex items-center gap-1.5">
              <span className="text-xs">★</span>
              <span className="hidden md:inline">Icons</span>
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex items-center gap-1.5">
              <span className="text-xs">⟳</span>
              <span className="hidden md:inline">Animations</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-1.5">
              <span className="text-xs">A11y</span>
              <span className="hidden md:inline">Accessibility</span>
            </TabsTrigger>
          </TabsList>

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

          <TabsContent value="patterns">
            <PatternsTab />
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
  );
};

export default DesignSystem;
