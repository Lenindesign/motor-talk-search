
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SpacingTab = () => {
  const spacingSystem = [
    { name: 'Tight', value: '0.5rem', class: 'space-tight' },
    { name: 'Element', value: '1rem', class: 'space-element' },
    { name: 'Content', value: '2rem', class: 'space-content' },
    { name: 'Section', value: '4rem', class: 'space-section' }
  ];

  const shadowStyles = [
    { name: 'Modern', class: 'shadow-modern', description: 'Subtle shadow for cards' },
    { name: 'Modern Large', class: 'shadow-modern-lg', description: 'Medium shadow for elevated content' },
    { name: 'Modern XL', class: 'shadow-modern-xl', description: 'Large shadow for modals' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Spacing System</CardTitle>
          <CardDescription>Consistent spacing scale for layout and component spacing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {spacingSystem.map((space) => (
            <div key={space.name} className="flex items-center gap-6 p-4 border border-neutral-6 rounded-lg">
              <div className="min-w-32">
                <p className="typography-caption font-medium text-neutral-1">{space.name}</p>
                <p className="typography-small text-neutral-4">{space.value}</p>
                <p className="typography-small text-neutral-4 font-mono">.{space.class}</p>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="bg-blue-200 rounded"
                  style={{ width: space.value, height: '24px' }}
                />
                <span className="typography-small text-neutral-4">Visual representation</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shadow System</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shadowStyles.map((shadow) => (
            <div key={shadow.name} className={`p-6 bg-white rounded-lg ${shadow.class}`}>
              <h4 className="typography-title text-neutral-1 mb-2">{shadow.name}</h4>
              <p className="typography-caption text-neutral-4 mb-2">{shadow.description}</p>
              <p className="typography-small text-neutral-4 font-mono">.{shadow.class}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpacingTab;
