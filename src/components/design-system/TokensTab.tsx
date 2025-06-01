import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const TokensTab = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Design token categories
  const colorTokens = [
    { name: 'Primary Red', value: '#c11b17', token: '--color-primary-1' },
    { name: 'MotorTrend Red', value: '#e90c17', token: '--color-primary-2' },
    { name: 'Light Red', value: '#ff858a', token: '--color-primary-3' },
    { name: 'Neutral Dark', value: '#141416', token: '--color-neutral-1' },
    { name: 'Neutral Gray', value: '#23262f', token: '--color-neutral-2' },
    { name: 'Neutral Medium', value: '#4e5566', token: '--color-neutral-3' },
    { name: 'Neutral Text', value: '#777e90', token: '--color-neutral-4' },
    { name: 'Neutral Light', value: '#b1b5c3', token: '--color-neutral-5' },
    { name: 'Neutral Border', value: '#e6e8ec', token: '--color-neutral-6' },
    { name: 'Neutral Background', value: '#f4f5f6', token: '--color-neutral-7' },
    { name: 'Neutral White', value: '#fcfcfd', token: '--color-neutral-8' },
    { name: 'Success Green', value: '#58bd7d', token: '--color-success' },
    { name: 'Warning Yellow', value: '#ffb800', token: '--color-warning' },
    { name: 'Error Red', value: '#ff4747', token: '--color-error' },
    { name: 'Info Blue', value: '#3b82f6', token: '--color-info' },
  ];

  const spacingTokens = [
    { name: 'xs', value: '0.25rem', token: '--spacing-xs' },
    { name: 'sm', value: '0.5rem', token: '--spacing-sm' },
    { name: 'md', value: '1rem', token: '--spacing-md' },
    { name: 'lg', value: '1.5rem', token: '--spacing-lg' },
    { name: 'xl', value: '2rem', token: '--spacing-xl' },
    { name: '2xl', value: '3rem', token: '--spacing-2xl' },
    { name: '3xl', value: '4rem', token: '--spacing-3xl' },
  ];

  const typographyTokens = [
    { name: 'Font Family Primary', value: 'Poppins, sans-serif', token: '--font-primary' },
    { name: 'Font Family Secondary', value: 'Geist, sans-serif', token: '--font-secondary' },
    { name: 'Font Family Mono', value: 'Roboto Mono, monospace', token: '--font-mono' },
    { name: 'Font Size XS', value: '0.75rem', token: '--font-size-xs' },
    { name: 'Font Size SM', value: '0.875rem', token: '--font-size-sm' },
    { name: 'Font Size Base', value: '1rem', token: '--font-size-base' },
    { name: 'Font Size LG', value: '1.125rem', token: '--font-size-lg' },
    { name: 'Font Size XL', value: '1.25rem', token: '--font-size-xl' },
    { name: 'Font Size 2XL', value: '1.5rem', token: '--font-size-2xl' },
    { name: 'Font Size 3XL', value: '1.875rem', token: '--font-size-3xl' },
    { name: 'Font Size 4XL', value: '2.25rem', token: '--font-size-4xl' },
    { name: 'Font Size 5XL', value: '3rem', token: '--font-size-5xl' },
    { name: 'Font Weight Light', value: '300', token: '--font-weight-light' },
    { name: 'Font Weight Regular', value: '400', token: '--font-weight-regular' },
    { name: 'Font Weight Medium', value: '500', token: '--font-weight-medium' },
    { name: 'Font Weight Semibold', value: '600', token: '--font-weight-semibold' },
    { name: 'Font Weight Bold', value: '700', token: '--font-weight-bold' },
    { name: 'Font Weight Black', value: '900', token: '--font-weight-black' },
    { name: 'Line Height Tight', value: '1.25', token: '--line-height-tight' },
    { name: 'Line Height Normal', value: '1.5', token: '--line-height-normal' },
    { name: 'Line Height Relaxed', value: '1.75', token: '--line-height-relaxed' },
    { name: 'Letter Spacing Tight', value: '-0.025em', token: '--letter-spacing-tight' },
    { name: 'Letter Spacing Normal', value: '0', token: '--letter-spacing-normal' },
    { name: 'Letter Spacing Wide', value: '0.025em', token: '--letter-spacing-wide' },
    { name: 'Letter Spacing Wider', value: '0.05em', token: '--letter-spacing-wider' },
  ];

  const borderTokens = [
    { name: 'Border Radius None', value: '0', token: '--border-radius-none' },
    { name: 'Border Radius XS', value: '0.125rem', token: '--border-radius-xs' },
    { name: 'Border Radius Small', value: '0.25rem', token: '--border-radius-sm' },
    { name: 'Border Radius Default', value: '0.5rem', token: '--border-radius-default' },
    { name: 'Border Radius Large', value: '0.75rem', token: '--border-radius-lg' },
    { name: 'Border Radius XL', value: '1rem', token: '--border-radius-xl' },
    { name: 'Border Radius 2XL', value: '1.5rem', token: '--border-radius-2xl' },
    { name: 'Border Radius Full', value: '9999px', token: '--border-radius-full' },
    { name: 'Border Width 0', value: '0px', token: '--border-width-0' },
    { name: 'Border Width 1', value: '1px', token: '--border-width-1' },
    { name: 'Border Width 2', value: '2px', token: '--border-width-2' },
    { name: 'Border Width 4', value: '4px', token: '--border-width-4' },
    { name: 'Border Width 8', value: '8px', token: '--border-width-8' },
    { name: 'Border Style Solid', value: 'solid', token: '--border-style-solid' },
    { name: 'Border Style Dashed', value: 'dashed', token: '--border-style-dashed' },
    { name: 'Border Style Dotted', value: 'dotted', token: '--border-style-dotted' },
  ];

  const shadowTokens = [
    { name: 'Shadow None', value: 'none', token: '--shadow-none' },
    { name: 'Shadow Small', value: '0 1px 2px rgba(0,0,0,0.05)', token: '--shadow-sm' },
    { name: 'Shadow Medium', value: '0 4px 6px -1px rgba(0,0,0,0.1)', token: '--shadow-md' },
    { name: 'Shadow Large', value: '0 10px 15px -3px rgba(0,0,0,0.1)', token: '--shadow-lg' },
    { name: 'Shadow XL', value: '0 20px 25px -5px rgba(0,0,0,0.1)', token: '--shadow-xl' },
    { name: 'Shadow 2XL', value: '0 25px 50px -12px rgba(0,0,0,0.25)', token: '--shadow-2xl' },
    { name: 'Shadow Inner', value: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)', token: '--shadow-inner' },
    { name: 'Shadow Focus', value: '0 0 0 3px rgba(233,12,23,0.5)', token: '--shadow-focus' },
  ];

  const zIndexTokens = [
    { name: 'Z-Index Auto', value: 'auto', token: '--z-auto' },
    { name: 'Z-Index 0', value: '0', token: '--z-0' },
    { name: 'Z-Index 10', value: '10', token: '--z-10' },
    { name: 'Z-Index 20', value: '20', token: '--z-20' },
    { name: 'Z-Index 30', value: '30', token: '--z-30' },
    { name: 'Z-Index 40', value: '40', token: '--z-40' },
    { name: 'Z-Index 50', value: '50', token: '--z-50' },
    { name: 'Z-Index Dropdown', value: '1000', token: '--z-dropdown' },
    { name: 'Z-Index Sticky', value: '1100', token: '--z-sticky' },
    { name: 'Z-Index Fixed', value: '1200', token: '--z-fixed' },
    { name: 'Z-Index Modal', value: '1300', token: '--z-modal' },
    { name: 'Z-Index Popover', value: '1400', token: '--z-popover' },
    { name: 'Z-Index Tooltip', value: '1500', token: '--z-tooltip' },
  ];

  const animationTokens = [
    { name: 'Transition Duration Fast', value: '100ms', token: '--duration-fast' },
    { name: 'Transition Duration Normal', value: '200ms', token: '--duration-normal' },
    { name: 'Transition Duration Slow', value: '300ms', token: '--duration-slow' },
    { name: 'Transition Duration Slower', value: '500ms', token: '--duration-slower' },
    { name: 'Easing Linear', value: 'linear', token: '--ease-linear' },
    { name: 'Easing In', value: 'cubic-bezier(0.4, 0, 1, 1)', token: '--ease-in' },
    { name: 'Easing Out', value: 'cubic-bezier(0, 0, 0.2, 1)', token: '--ease-out' },
    { name: 'Easing In-Out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', token: '--ease-in-out' },
  ];

  const breakpointTokens = [
    { name: 'Breakpoint XS', value: '320px', token: '--breakpoint-xs' },
    { name: 'Breakpoint SM', value: '640px', token: '--breakpoint-sm' },
    { name: 'Breakpoint MD', value: '768px', token: '--breakpoint-md' },
    { name: 'Breakpoint LG', value: '1024px', token: '--breakpoint-lg' },
    { name: 'Breakpoint XL', value: '1280px', token: '--breakpoint-xl' },
    { name: 'Breakpoint 2XL', value: '1536px', token: '--breakpoint-2xl' },
  ];

  // Custom token card component for reusability
  const TokenCard = ({ title, description, tokens }: { title: string, description: string, tokens: any[] }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tokens.map((token) => (
            <div key={token.token} className="p-3 border border-neutral-6 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="typography-caption font-medium text-neutral-1">{token.name}</p>
                  <p className="typography-small text-neutral-4">{token.value}</p>
                  <p className="typography-small text-neutral-4 font-mono">{token.token}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(`var(${token.token})`)}
                  className="h-8 w-8 p-0"
                >
                  {copiedToken === `var(${token.token})` ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens</CardTitle>
          <CardDescription>
            Centralized design decisions that ensure consistency across the entire product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-4 mb-4">
            Design tokens are the visual design atoms of the design system — specifically, they are named entities that store 
            visual design attributes. We use them in place of hard-coded values to ensure flexibility and consistency.
          </p>
          
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-4">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="borders">Borders</TabsTrigger>
              <TabsTrigger value="shadows">Shadows</TabsTrigger>
              <TabsTrigger value="z-index">Z-Index</TabsTrigger>
              <TabsTrigger value="animation">Animation</TabsTrigger>
              <TabsTrigger value="breakpoints">Breakpoints</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors">
              <TokenCard 
                title="Color Tokens" 
                description="Core color values used throughout the application" 
                tokens={colorTokens} 
              />
            </TabsContent>
            
            <TabsContent value="spacing">
              <TokenCard 
                title="Spacing Tokens" 
                description="Consistent spacing values for margins and padding" 
                tokens={spacingTokens} 
              />
            </TabsContent>
            
            <TabsContent value="typography">
              <TokenCard 
                title="Typography Tokens" 
                description="Font families, sizes, and weights" 
                tokens={typographyTokens} 
              />
            </TabsContent>
            
            <TabsContent value="borders">
              <TokenCard 
                title="Border Tokens" 
                description="Border radius values for consistent component styling" 
                tokens={borderTokens} 
              />
            </TabsContent>
            
            <TabsContent value="shadows">
              <TokenCard 
                title="Shadow Tokens" 
                description="Elevation and depth through consistent shadow values" 
                tokens={shadowTokens} 
              />
            </TabsContent>
            
            <TabsContent value="z-index">
              <TokenCard 
                title="Z-Index Tokens" 
                description="Control the stacking order of elements with consistent z-index values" 
                tokens={zIndexTokens} 
              />
            </TabsContent>
            
            <TabsContent value="animation">
              <TokenCard 
                title="Animation Tokens" 
                description="Consistent timing and easing functions for animations and transitions" 
                tokens={animationTokens} 
              />
            </TabsContent>
            
            <TabsContent value="breakpoints">
              <TokenCard 
                title="Breakpoint Tokens" 
                description="Standard screen size breakpoints for responsive design" 
                tokens={breakpointTokens} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Usage in Code</CardTitle>
          <CardDescription>How to implement design tokens in your components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="typography-title text-neutral-1 mb-2">CSS Implementation</h3>
              <div className="bg-neutral-7 p-4 rounded-md font-mono text-sm mb-2 whitespace-pre overflow-x-auto">
{`.button-primary {
  background-color: var(--color-primary-2);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-default);
  font-family: var(--font-primary);
  box-shadow: var(--shadow-sm);
}`}
              </div>
              <p className="typography-small text-neutral-4">
                Use CSS custom properties to reference tokens in your stylesheets
              </p>
            </div>
            <div>
              <h3 className="typography-title text-neutral-1 mb-2">Tailwind Implementation</h3>
              <div className="bg-neutral-7 p-4 rounded-md font-mono text-sm mb-2 whitespace-pre overflow-x-auto">
{`<button 
  className="
    bg-primary-2
    px-lg py-sm
    rounded-default
    font-primary
    shadow-sm
  "
>
  Click Me
</button>`}
              </div>
              <p className="typography-small text-neutral-4">
                Use tailwind classes that map to our design tokens
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokensTab;
