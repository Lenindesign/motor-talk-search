
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ColorsTab = () => {
  const colorPalette = [
    { name: 'Primary Red', value: '#c11b17', css: '--color-primary-1' },
    { name: 'MotorTrend Red', value: '#e90c17', css: '--color-primary-2' },
    { name: 'Light Red', value: '#ff858a', css: '--color-primary-3' },
    { name: 'Neutral Dark', value: '#141416', css: '--color-neutral-1' },
    { name: 'Neutral 2', value: '#23262f', css: '--color-neutral-2' },
    { name: 'Neutral 3', value: '#353945', css: '--color-neutral-3' },
    { name: 'Neutral 4', value: '#6e7481', css: '--color-neutral-4' },
    { name: 'Neutral 5', value: '#b1b5c3', css: '--color-neutral-5' },
    { name: 'Neutral 6', value: '#e6e8ec', css: '--color-neutral-6' },
    { name: 'Neutral 7', value: '#f4f5f6', css: '--color-neutral-7' },
    { name: 'Neutral Light', value: '#fcfcfd', css: '--color-neutral-8' },
    { name: 'Success Green', value: '#388e3c', css: '--color-success-2' },
    { name: 'Warning Orange', value: '#f57c00', css: '--color-warning-2' },
    { name: 'Error Red', value: '#d32f2f', css: '--color-error-2' },
    { name: 'Info Blue', value: '#0865b4', css: '--color-info-2' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>Our complete color system with CSS custom properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {colorPalette.map((color) => (
              <div key={color.name} className="space-y-2">
                <div 
                  className="w-full h-20 rounded-lg border border-neutral-6"
                  style={{ backgroundColor: color.value }}
                />
                <div>
                  <p className="typography-caption font-medium text-neutral-1">{color.name}</p>
                  <p className="typography-small text-neutral-4">{color.value}</p>
                  <p className="typography-small text-neutral-4 font-mono">{color.css}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="typography-title text-neutral-1 mb-2">Primary Colors</h4>
              <p className="typography-body text-neutral-4 mb-3">
                Use for primary actions, brand elements, and key interactive components.
              </p>
              <div className="flex gap-2">
                <Button>Primary Action</Button>
                <Button variant="outline">Secondary</Button>
              </div>
            </div>
            <div>
              <h4 className="typography-title text-neutral-1 mb-2">Neutral Colors</h4>
              <p className="typography-body text-neutral-4 mb-3">
                Use for text, backgrounds, borders, and subtle UI elements.
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-neutral-7 rounded">Background Light</div>
                <div className="p-3 bg-neutral-2 text-white rounded">Background Dark</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorsTab;
