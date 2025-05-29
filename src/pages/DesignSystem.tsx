
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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
import AccessibilityTab from '@/components/design-system/AccessibilityTab';
import { Download, Github } from 'lucide-react';

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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-11 mb-8 gap-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
            <TabsTrigger value="accessibility">A11y</TabsTrigger>
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

          <TabsContent value="accessibility">
            <AccessibilityTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystem;
