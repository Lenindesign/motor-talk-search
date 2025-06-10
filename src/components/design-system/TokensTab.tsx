import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TokensTab = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("colors");

  const copyToClipboard = (text: string) => {
    try {
      // Try using the modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            setCopiedToken(text);
            setTimeout(() => setCopiedToken(null), 2000);
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyToClipboard(text);
          });
      } else {
        // Fall back to the older execCommand method
        fallbackCopyToClipboard(text);
      }
    } catch (err) {
      console.error('Copy failed: ', err);
      fallbackCopyToClipboard(text);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Make the textarea out of viewport
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      
      // Select and copy the text
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      
      // Clean up
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopiedToken(text);
        setTimeout(() => setCopiedToken(null), 2000);
      } else {
        console.error('Fallback copy failed');
      }
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
  };
  
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    const tabTrigger = document.querySelector(`[value="${tabValue}"]`) as HTMLElement;
    if (tabTrigger) {
      tabTrigger.click();
    }
  };

  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Design token categories
  const colorTokens = [
    // Brand Colors
    { 
      name: '--motortrend-red', 
      value: '#c11b17', 
      description: 'Primary MotorTrend brand red color, used for main CTAs and key UI elements',
      preview: <div className="h-8 rounded-md bg-[var(--motortrend-red)]" />
    },
    { 
      name: '--motortrend-red-hover', 
      value: '#e90c17', 
      description: 'Hover state for MotorTrend red elements',
      preview: <div className="h-8 rounded-md bg-[var(--motortrend-red-hover)]" />
    },
    { 
      name: '--motortrend-red-light', 
      value: '#e6e8ec', 
      description: 'Light gray version, used for secondary elements',
      preview: <div className="h-8 rounded-md bg-[var(--motortrend-red-light)]" />
    },
    
    // Semantic Colors
    { 
      name: '--color-primary', 
      value: 'var(--motortrend-red)', 
      description: 'Semantic primary color (maps to MotorTrend red)',
      preview: <div className="h-8 rounded-md bg-[var(--color-primary)]" />
    },
    { 
      name: '--color-primary-hover', 
      value: 'var(--motortrend-red-hover)', 
      description: 'Semantic primary hover color (maps to MotorTrend red hover)',
      preview: <div className="h-8 rounded-md bg-[var(--color-primary-hover)]" />
    },
    
    // Neutral Colors
    { 
      name: '--neutral-1', 
      value: '#141416', 
      description: 'Darkest neutral, used for headings and primary text',
      preview: <div className="h-8 rounded-md bg-neutral-1" />
    },
    { 
      name: '--neutral-4', 
      value: '#6e7481', 
      description: 'Mid-tone neutral, used for secondary text and borders',
      preview: <div className="h-8 rounded-md bg-neutral-4" />
    },
    { 
      name: '--neutral-8', 
      value: '#fcfcfd', 
      description: 'Lightest neutral, used for backgrounds',
      preview: <div className="h-8 rounded-md bg-neutral-8" />
    },
    
    // Status Colors
    { 
      name: '--color-success', 
      value: '#22c55e', 
      description: 'Used for success states and positive actions',
      preview: <div className="h-8 rounded-md bg-[var(--color-success)]" />
    },
    { 
      name: '--color-error', 
      value: '#ef4444', 
      description: 'Used for error states and destructive actions',
      preview: <div className="h-8 rounded-md bg-[var(--color-error)]" />
    },
  ];

  const spacingTokens = [
    { 
      name: '--spacing-1', 
      value: '0.25rem', 
      description: '4px - Used for minimal spacing and tight layouts',
      preview: <div className="h-1 w-full bg-neutral-4 rounded-full" />
    },
    { 
      name: '--spacing-2', 
      value: '0.5rem', 
      description: '8px - Used for compact component padding',
      preview: <div className="h-2 w-full bg-neutral-4 rounded-full" />
    },
    { 
      name: '--spacing-4', 
      value: '1rem', 
      description: '16px - Base spacing unit, used for standard padding and margins',
      preview: <div className="h-4 w-full bg-neutral-4 rounded-full" />
    },
    { 
      name: '--spacing-6', 
      value: '1.5rem', 
      description: '24px - Used for larger component spacing',
      preview: <div className="h-6 w-full bg-neutral-4 rounded-full" />
    },
    { 
      name: '--spacing-8', 
      value: '2rem', 
      description: '32px - Used for section spacing',
      preview: <div className="h-8 w-full bg-neutral-4 rounded-full" />
    },
  ];

  const typographyTokens = [
    { 
      name: '--font-display', 
      value: 'var(--font-display)', 
      description: 'Used for headlines and large text',
      preview: <div className="typography-title">Display Font</div>
    },
    { 
      name: '--font-body', 
      value: 'var(--font-body)', 
      description: 'Used for body text and general content',
      preview: <div className="typography-body">Body Font</div>
    },
    { 
      name: '--font-mono', 
      value: 'var(--font-mono)', 
      description: 'Used for code and technical content',
      preview: <div className="typography-code">Mono Font</div>
    },
    { 
      name: '--line-height-tight', 
      value: '1.2', 
      description: 'Used for headings and short text',
      preview: <div className="typography-body leading-tight">Line Height Tight</div>
    },
    { 
      name: '--line-height-normal', 
      value: '1.5', 
      description: 'Used for body text and general content',
      preview: <div className="typography-body leading-normal">Line Height Normal</div>
    },
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
  interface Token {
    name: string;
    value: string;
    description?: string;
    preview?: React.ReactNode;
  }

  const TokenCard = ({ title, description, tokens }: { title: string, description: string, tokens: Token[] }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tokens.map((token) => (
            <div key={token.name} className="p-3 border border-neutral-6 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="typography-caption-bold text-neutral-1">{token.name}</p>
                  <div className="typography-code text-neutral-4">{token.value}</div>
                  {token.description && (
                    <p className="typography-small text-neutral-4">{token.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0"
                  onClick={() => copyToClipboard(`var(${token.name})`)}>
                  {copiedToken === token.name ? (
                    <Check className="h-4 w-4 text-success" />
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
          <p className="typography-body text-neutral-4 mb-4">
            Design tokens are the visual design atoms of the design system — specifically, they are named entities that store 
            visual design attributes. We use them in place of hard-coded values to ensure flexibility and consistency.
          </p>
          
          <Tabs defaultValue="colors" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <div className="relative mb-4">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="shadow-sm hover:shadow-md"
                  onClick={goToPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="px-10">
                <TabsList className="hidden">  {/* Hidden original TabsList for accessibility */}
                  <TabsTrigger value="buttons">Buttons</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="spacing">Spacing</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="borders">Borders</TabsTrigger>
                  <TabsTrigger value="shadows">Shadows</TabsTrigger>
                  <TabsTrigger value="z-index">Z-Index</TabsTrigger>
                  <TabsTrigger value="animation">Animation</TabsTrigger>
                  <TabsTrigger value="breakpoints">Breakpoints</TabsTrigger>
                </TabsList>
                
                <div className="custom-tabs-list">
                  <Slider ref={sliderRef} {...sliderSettings} className="token-tabs-slider">
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'buttons' ? 'solid-primary' : 'ghost'}
                        size="sm"
                        className="w-full transition-all duration-200"
                        onClick={() => handleTabChange('buttons')}
                      >
                        Buttons
                      </Button>
                    </div>
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'colors' ? 'solid-primary' : 'ghost'}
                        size="sm"
                        className="w-full transition-all duration-200"
                        onClick={() => handleTabChange('colors')}
                      >
                        Colors
                      </Button>
                    </div>
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'spacing' ? 'solid' : 'ghost'}
                        className="w-full"
                        onClick={() => handleTabChange('spacing')}
                      >
                        Spacing
                      </Button>
                    </div>
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'typography' ? 'solid' : 'ghost'}
                        className="w-full"
                        onClick={() => handleTabChange('typography')}
                      >
                        Typography
                      </Button>
                    </div>
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'borders' ? 'solid' : 'ghost'}
                        className="w-full"
                        onClick={() => handleTabChange('borders')}
                      >
                        Borders
                      </Button>
                    </div>
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'shadows' ? 'solid' : 'ghost'}
                        className="w-full"
                        onClick={() => handleTabChange('shadows')}
                      >
                        Shadows
                      </Button>
                    </div>
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'z-index' ? 'solid' : 'ghost'}
                        className="w-full"
                        onClick={() => handleTabChange('z-index')}
                      >
                        Z-Index
                      </Button>
                    </div>
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'animation' ? 'solid' : 'ghost'}
                        className="w-full"
                        onClick={() => handleTabChange('animation')}
                      >
                        Animation
                      </Button>
                    </div>
                    <div className="px-1">
                      <Button
                        variant={activeTab === 'breakpoints' ? 'solid' : 'ghost'}
                        className="w-full"
                        onClick={() => handleTabChange('breakpoints')}
                      >
                        Breakpoints
                      </Button>
                    </div>
                  </Slider>
                </div>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="shadow-sm hover:shadow-md"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="buttons">
              <Card>
                <CardHeader>
                  <CardTitle>Button Documentation</CardTitle>
                  <CardDescription>
                    For a comprehensive view of all button variants, sizes, and states, please visit the UI Components tab.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="typography-body text-neutral-4 mb-4">
                    The UI Components section contains a complete demonstration of all button styles including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-4 typography-body-small">
                    <li>Color variants (Red, Black, Primary)</li>
                    <li>Style variants (Solid, Outline, Ghost, Minimal)</li>
                    <li>Size options (Small to Extra Large)</li>
                    <li>Icon buttons</li>
                    <li>States (Disabled, Loading)</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="typography-title text-neutral-1 mb-2">CSS Implementation</h3>
              <div className="typography-code mb-4 whitespace-pre overflow-x-auto shadow-sm border border-neutral-6">
{`.button-primary {
  background-color: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-6);
  border-radius: var(--radius-xl);
  font-family: var(--font-display);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-normal) var(--ease-in-out);
}`}
              </div>
              <p className="typography-small text-neutral-4">
                Use CSS custom properties to reference tokens in your stylesheets
              </p>
            </div>
            <div>
              <h3 className="typography-title text-neutral-1 mb-2">Tailwind Implementation</h3>
              <div className="bg-neutral-7 p-4 rounded-md typography-code mb-2 whitespace-pre overflow-x-auto">
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
