
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from '@/components/design-system/OverviewTab';
import ColorsTab from '@/components/design-system/ColorsTab';
import TypographyTab from '@/components/design-system/TypographyTab';
import SpacingTab from '@/components/design-system/SpacingTab';
import ComponentsTab from '@/components/design-system/ComponentsTab';
import CardsTab from '@/components/design-system/CardsTab';
import IconsTab from '@/components/design-system/IconsTab';
import AnimationsTab from '@/components/design-system/AnimationsTab';

const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-neutral-8 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="typography-hero text-neutral-1 mb-4">Design System</h1>
          <p className="typography-body-large text-neutral-4 max-w-2xl">
            A comprehensive style guide and component library for the MotorTrend application. 
            Built with atomic design principles and modern design tokens.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystem;
