import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Playground } from './resources';

const ResourcesPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Design System Resources</CardTitle>
          <CardDescription>
            Tools and resources for working with the MotorTrend Design System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="playground" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
              <TabsTrigger value="playground">Component Playground</TabsTrigger>
              <TabsTrigger value="tokens" disabled>
                Design Tokens
              </TabsTrigger>
              <TabsTrigger value="icons" disabled>
                Icons
              </TabsTrigger>
              <TabsTrigger value="templates" disabled>
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playground">
              <Playground />
            </TabsContent>

            <TabsContent value="tokens">
              <div className="p-6 text-center text-muted-foreground">
                <p>Design tokens coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="icons">
              <div className="p-6 text-center text-muted-foreground">
                <p>Icons documentation coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="p-6 text-center text-muted-foreground">
                <p>Templates coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesPage;
