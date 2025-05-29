
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TypographyTab = () => {
  const fontSizes = [
    { name: 'Hero', size: 'clamp(3rem, 6vw, 5rem)', class: 'typography-hero' },
    { name: 'Display', size: 'clamp(2rem, 4vw, 3rem)', class: 'typography-display' },
    { name: 'Title', size: 'clamp(1.25rem, 2vw, 1.5rem)', class: 'typography-title' },
    { name: 'Body Large', size: '1.125rem', class: 'typography-body-large' },
    { name: 'Body', size: '1rem', class: 'typography-body' },
    { name: 'Caption', size: '0.875rem', class: 'typography-caption' },
    { name: 'Small', size: '0.75rem', class: 'typography-small' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
          <CardDescription>Responsive typography system with consistent hierarchy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {fontSizes.map((font) => (
            <div key={font.name} className="flex items-center gap-6 p-4 border border-neutral-6 rounded-lg">
              <div className="min-w-32">
                <p className="typography-caption font-medium text-neutral-1">{font.name}</p>
                <p className="typography-small text-neutral-4">{font.size}</p>
                <p className="typography-small text-neutral-4 font-mono">.{font.class}</p>
              </div>
              <div className={font.class}>
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Font Families</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Poppins
              </h4>
              <p className="typography-body text-neutral-4 mb-2">
                Used for headings, titles, and brand elements
              </p>
              <p className="typography-small text-neutral-4 font-mono">
                font-family: 'Poppins', sans-serif
              </p>
            </div>
            <div className="p-4 border border-neutral-6 rounded-lg">
              <h4 className="typography-title mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>
                Geist
              </h4>
              <p className="typography-body text-neutral-4 mb-2">
                Used for body text, captions, and UI text
              </p>
              <p className="typography-small text-neutral-4 font-mono">
                font-family: 'Geist', sans-serif
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypographyTab;
