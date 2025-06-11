import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DesignSystemTest = () => {
  return (
    <div className="min-h-screen bg-color-neutral-8 p-8">
      <div className="max-w-[980px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Design System Test Page</CardTitle>
            <CardDescription>A simplified test page to diagnose loading issues</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This is a simplified version of the design system page to help diagnose loading issues.</p>
            <Button>Test Button</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesignSystemTest;
