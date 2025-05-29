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
    // ... other colors
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
    { name: 'Font Size Base', value: '16px', token: '--font-size-base' },
    { name: 'Font Weight Regular', value: '400', token: '--font-weight-regular' },
    { name: 'Font Weight Medium', value: '500', token: '--font-weight-medium' },
    { name: 'Font Weight Bold', value: '700', token: '--font-weight-bold' },
  ];

  const borderTokens = [
    { name: 'Border Radius Small', value: '0.25rem', token: '--border-radius-sm' },
    { name: 'Border Radius Default', value: '0.5rem', token: '--border-radius-default' },
    { name: 'Border Radius Large', value: '0.75rem', token: '--border-radius-lg' },
    { name: 'Border Radius XL', value: '1rem', token: '--border-radius-xl' },
    { name: 'Border Radius Full', value: '9999px', token: '--border-radius-full' },
  ];

  const shadowTokens = [
    { name: 'Shadow Small', value: '0 1px 2px rgba(0,0,0,0.05)', token: '--shadow-sm' },
    { name: 'Shadow Medium', value: '0 4px 6px -1px rgba(0,0,0,0.1)', token: '--shadow-md' },
    { name: 'Shadow Large', value: '0 10px 15px -3px rgba(0,0,0,0.1)', token: '--shadow-lg' },
    { name: 'Shadow XL', value: '0 20px 25px -5px rgba(0,0,0,0.1)', token: '--shadow-xl' },
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
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="borders">Borders</TabsTrigger>
              <TabsTrigger value="shadows">Shadows</TabsTrigger>
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
