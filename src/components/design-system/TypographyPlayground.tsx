import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import CodeSnippet from './CodeSnippet';

type TypographyCategory = 'headlines' | 'body' | 'ui' | 'buttons';
type TypographyClass = 
  | 'typography-hero' 
  | 'typography-display' 
  | 'typography-title' 
  | 'typography-subtitle'
  | 'typography-body-large'
  | 'typography-body'
  | 'typography-body-small'
  | 'typography-caption'
  | 'typography-small'
  | 'typography-label'
  | 'typography-button1'
  | 'typography-button2';

interface TypographyStyle {
  name: string;
  class: TypographyClass;
  description: string;
  defaultText: string;
}

type TypographyPlaygroundProps = Record<string, never>;

const TypographyPlayground: React.FC<TypographyPlaygroundProps> = () => {
  // Typography styles organized by category
  const typographyStyles: Record<TypographyCategory, TypographyStyle[]> = {
    headlines: [
      {
        name: 'Hero',
        class: 'typography-hero',
        description: 'Main hero headlines, large feature titles',
        defaultText: 'The Future of Cars'
      },
      {
        name: 'Display',
        class: 'typography-display',
        description: 'Page titles, major section headers',
        defaultText: '2025 Honda Accord Review'
      },
      {
        name: 'Title',
        class: 'typography-title',
        description: 'Section headers, card titles',
        defaultText: 'Latest Car Reviews & News'
      },
      {
        name: 'Subtitle',
        class: 'typography-subtitle',
        description: 'Card headlines, smaller titles',
        defaultText: '2025 Honda Civic Type R'
      }
    ],
    body: [
      {
        name: 'Body Large',
        class: 'typography-body-large',
        description: 'Lead paragraphs, featured content',
        defaultText: 'The all-new Honda Accord redefines the midsize sedan segment with bold styling and advanced technology.'
      },
      {
        name: 'Body',
        class: 'typography-body',
        description: 'Main content, descriptions',
        defaultText: 'Experience exceptional handling and a smooth ride with the redesigned suspension system.'
      },
      {
        name: 'Body Small',
        class: 'typography-body-small',
        description: 'Secondary content, specifications',
        defaultText: 'EPA estimated 30 city / 38 highway MPG for LX trim.'
      }
    ],
    ui: [
      {
        name: 'Caption',
        class: 'typography-caption',
        description: 'Timestamps, metadata',
        defaultText: 'Last updated: March 15, 2025'
      },
      {
        name: 'Small',
        class: 'typography-small',
        description: 'Legal text, footnotes',
        defaultText: '© 2025 MotorTrend. All rights reserved.'
      },
      {
        name: 'Label',
        class: 'typography-label',
        description: 'Tags, badges, labels',
        defaultText: 'NEW • FEATURED • TRENDING'
      }
    ],
    buttons: [
      {
        name: 'Button 1',
        class: 'typography-button1',
        description: 'Primary buttons, large CTAs',
        defaultText: 'VIEW ALL REVIEWS'
      },
      {
        name: 'Button 2',
        class: 'typography-button2',
        description: 'Standard buttons, form controls',
        defaultText: 'Search'
      }
    ]
  };

  // State for selected category and style
  const [selectedCategory, setSelectedCategory] = useState<TypographyCategory>('headlines');
  const [selectedStyle, setSelectedStyle] = useState<TypographyClass>('typography-hero');
  
  // State for customizable properties
  const [customText, setCustomText] = useState('The Future of Cars');
  const [textColor, setTextColor] = useState('text-color-neutral-1');
  const [fontWeight, setFontWeight] = useState('font-normal');
  const [textAlign, setTextAlign] = useState('text-left');
  const [letterSpacing, setLetterSpacing] = useState('tracking-normal');
  const [lineHeight, setLineHeight] = useState('leading-normal');
  
  // Find the currently selected style object
  const currentStyleObj = typographyStyles[selectedCategory].find(style => style.class === selectedStyle);

  // Generate code snippet based on selected style and customizations
  const generateCodeSnippet = () => {
    const classes = [
      selectedStyle,
      textColor,
      fontWeight,
      textAlign,
      letterSpacing,
      lineHeight
    ].join(' ');
    
    return {
      jsx: `<p className="${classes}">${customText}</p>`,
      html: `<p class="${classes}">${customText}</p>`
    };
  };

  // Handle style selection
  const handleStyleChange = (value: string) => {
    const newStyle = value as TypographyClass;
    setSelectedStyle(newStyle);
    
    // Update text to the default for this style
    const newStyleObj = Object.values(typographyStyles)
      .flat()
      .find(style => style.class === newStyle);
      
    if (newStyleObj) {
      setCustomText(newStyleObj.defaultText);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="typography-title">Typography Playground</CardTitle>
          <CardDescription className="typography-body-small text-color-neutral-3">
            Customize and test typography styles with various properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="typography-body">Typography Category</Label>
              <Tabs 
                value={selectedCategory} 
                onValueChange={(value) => setSelectedCategory(value as TypographyCategory)}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="headlines">Headlines</TabsTrigger>
                  <TabsTrigger value="body">Body Text</TabsTrigger>
                  <TabsTrigger value="ui">UI Elements</TabsTrigger>
                  <TabsTrigger value="buttons">Buttons</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Properties Panel */}
              <div className="space-y-6">
                <div className="typography-subtitle mb-4">Properties</div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="typography-style" className="typography-body-small">Style</Label>
                    <Select
                      value={selectedStyle}
                      onValueChange={handleStyleChange}
                    >
                      <SelectTrigger id="typography-style">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        {typographyStyles[selectedCategory].map((style) => (
                          <SelectItem key={style.class} value={style.class}>
                            {style.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {currentStyleObj && (
                      <p className="typography-caption text-color-neutral-4 mt-1">{currentStyleObj.description}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="custom-text" className="typography-body-small">Text Content</Label>
                    <Input
                      id="custom-text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-color" className="typography-body-small">Text Color</Label>
                    <Select
                      value={textColor}
                      onValueChange={setTextColor}
                    >
                      <SelectTrigger id="text-color">
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-color-neutral-1">Neutral 1 (Darkest)</SelectItem>
                        <SelectItem value="text-color-neutral-2">Neutral 2</SelectItem>
                        <SelectItem value="text-color-neutral-3">Neutral 3</SelectItem>
                        <SelectItem value="text-color-neutral-4">Neutral 4</SelectItem>
                        <SelectItem value="text-color-neutral-5">Neutral 5</SelectItem>
                        <SelectItem value="text-color-primary-1">Primary 1 (Red)</SelectItem>
                        <SelectItem value="text-color-primary-2">Primary 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="font-weight" className="typography-body-small">Font Weight</Label>
                    <Select
                      value={fontWeight}
                      onValueChange={setFontWeight}
                    >
                      <SelectTrigger id="font-weight">
                        <SelectValue placeholder="Select weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="font-light">Light (300)</SelectItem>
                        <SelectItem value="font-normal">Regular (400)</SelectItem>
                        <SelectItem value="font-medium">Medium (500)</SelectItem>
                        <SelectItem value="font-semibold">Semibold (600)</SelectItem>
                        <SelectItem value="font-bold">Bold (700)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-align" className="typography-body-small">Text Alignment</Label>
                    <Select
                      value={textAlign}
                      onValueChange={setTextAlign}
                    >
                      <SelectTrigger id="text-align">
                        <SelectValue placeholder="Select alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-left">Left</SelectItem>
                        <SelectItem value="text-center">Center</SelectItem>
                        <SelectItem value="text-right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Preview Panel */}
              <div className="md:col-span-2 space-y-6">
                <div className="typography-subtitle mb-4">Preview</div>
                
                <div className="border rounded-md p-4 md:p-6 bg-color-neutral-8">
                  <div className="min-h-[200px] flex items-center justify-center">
                    <p className={`${selectedStyle} ${textColor} ${fontWeight} ${textAlign} ${letterSpacing} ${lineHeight} max-w-full`}>
                      {customText}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="typography-subtitle">Code</div>
                  <Tabs defaultValue="jsx">
                    <TabsList>
                      <TabsTrigger value="jsx">JSX</TabsTrigger>
                      <TabsTrigger value="html">HTML</TabsTrigger>
                    </TabsList>
                    <TabsContent value="jsx">
                      <CodeSnippet code={generateCodeSnippet().jsx} language="jsx" />
                    </TabsContent>
                    <TabsContent value="html">
                      <CodeSnippet code={generateCodeSnippet().html} language="html" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypographyPlayground;
