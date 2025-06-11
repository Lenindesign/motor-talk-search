import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComponentPlayground from './ComponentPlayground';

const PlaygroundTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="typography-title">Interactive Component Playground</CardTitle>
          <CardDescription className="typography-body-small text-color-neutral-3">
            Experiment with components, customize properties, and generate ready-to-use code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="typography-body text-color-neutral-4 mb-6">
            The playground allows you to visualize components with different property combinations 
            and instantly generate the code you need for your project. Perfect for prototyping and 
            exploring the design system's capabilities.
          </p>
        </CardContent>
      </Card>
      
      <ComponentPlayground />
    </div>
  );
};

export default PlaygroundTab;
