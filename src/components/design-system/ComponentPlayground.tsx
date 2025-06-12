
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CodeSnippet from './CodeSnippet';
import PropertyControls from './playground/PropertyControls';
import ComponentRenderer from './playground/ComponentRenderer';
import { 
  ComponentType, 
  ButtonProperties, 
  BadgeProperties, 
  CardProperties 
} from './playground/types';
import { components } from './playground/componentConfigs';
import { generateSnippets } from './playground/codeGenerator';

const ComponentPlayground: React.FC = () => {
  // State for component properties
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('button');
  const [buttonProps, setButtonProps] = useState<ButtonProperties>({
    variant: 'solid',
    size: 'md',
    disabled: false,
    withIcon: false,
    text: 'Click me'
  });
  const [badgeProps, setBadgeProps] = useState<BadgeProperties>({
    variant: 'solid',
    text: 'Badge'
  });
  const [cardProps, setCardProps] = useState<CardProperties>({
    withHeader: true,
    withFooter: true,
    title: 'Card Title',
    description: 'Card Description',
    cardType: 'article'
  });

  // Function to update component properties
  const handlePropertyChange = (propName: string, value: any) => {
    if (selectedComponent === 'button') {
      setButtonProps(prev => ({ ...prev, [propName]: value }));
    } else if (selectedComponent === 'badge') {
      setBadgeProps(prev => ({ ...prev, [propName]: value }));
    } else {
      setCardProps(prev => ({ ...prev, [propName]: value }));
    }
  };

  // Get the code snippets for the current component and properties
  const { tsx, tailwind } = generateSnippets(selectedComponent, buttonProps, badgeProps, cardProps);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Component Playground</CardTitle>
          <CardDescription>
            Experiment with components, adjust properties, and generate code snippets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Component Selection */}
            <div className="lg:col-span-1 space-y-8">
              <h3 className="font-medium text-sm">1. Select Component</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(components).map(([id, component]) => (
                  <Button
                    key={id}
                    variant={selectedComponent === id ? 'default' : 'outline'}
                    onClick={() => setSelectedComponent(id as ComponentType)}
                    className="justify-start"
                  >
                    {component.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Properties Panel */}
            <div>
              <PropertyControls
                selectedComponent={selectedComponent}
                properties={components[selectedComponent].properties}
                buttonProps={buttonProps}
                badgeProps={badgeProps}
                cardProps={cardProps}
                onPropertyChange={handlePropertyChange}
              />
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">3. Preview Result</h3>
              <div className="border rounded-md bg-gray-50 min-h-40 flex items-center justify-center p-12 py-[4px] px-[4px]">
                <ComponentRenderer
                  selectedComponent={selectedComponent}
                  buttonProps={buttonProps}
                  badgeProps={badgeProps}
                  cardProps={cardProps}
                />
              </div>
            </div>
          </div>

          {/* Code Snippets */}
          <div className="mt-8">
            <h3 className="font-medium text-sm mb-4">4. Get Code</h3>
            <div className="space-y-4">
              <CodeSnippet code={tsx} language="tsx" title="TypeScript/React" />
              <CodeSnippet code={tailwind} language="html" title="HTML/Tailwind" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentPlayground;
