import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, Plus, Download, ExternalLink, Settings } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

interface PropertyControl {
  type: 'select' | 'boolean' | 'text' | 'range';
  label: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface ComponentConfig {
  name: string;
  description: string;
  properties: Record<string, PropertyControl>;
}

const ComponentPlayground = () => {
  // Define available components for the playground
  const components: Record<string, ComponentConfig> = {
    button: {
      name: 'Button',
      description: 'Interactive button component with various styles and states',
      properties: {
        variant: {
          type: 'select',
          label: 'Variant',
          options: ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive']
        },
        size: {
          type: 'select',
          label: 'Size',
          options: ['sm', 'default', 'lg']
        },
        disabled: {
          type: 'boolean',
          label: 'Disabled'
        },
        withIcon: {
          type: 'boolean',
          label: 'With Icon'
        },
        text: {
          type: 'text',
          label: 'Button Text'
        }
      }
    },
    badge: {
      name: 'Badge',
      description: 'Small status descriptors for UI elements',
      properties: {
        variant: {
          type: 'select',
          label: 'Variant',
          options: ['default', 'secondary', 'outline', 'destructive']
        },
        text: {
          type: 'text',
          label: 'Badge Text'
        }
      }
    },
    card: {
      name: 'Card',
      description: 'Container for related content and actions',
      properties: {
        withHeader: {
          type: 'boolean',
          label: 'With Header'
        },
        withFooter: {
          type: 'boolean',
          label: 'With Footer'
        },
        title: {
          type: 'text',
          label: 'Title'
        },
        description: {
          type: 'text',
          label: 'Description'
        }
      }
    }
  };
  
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [properties, setProperties] = useState<Record<string, any>>({
    variant: 'default',
    size: 'default',
    disabled: false,
    withIcon: false,
    text: 'Button Text',
    withHeader: true,
    withFooter: false,
    title: 'Card Title',
    description: 'Card Description'
  });
  
  // Handle property changes
  const handlePropertyChange = (property: string, value: any) => {
    setProperties((prev) => ({
      ...prev,
      [property]: value
    }));
  };
  
  // Generate code snippets based on selected component and properties
  const generateSnippets = () => {
    if (selectedComponent === 'button') {
      const { variant, size, disabled, withIcon, text } = properties;
      
      const tsxCode = `import { Button } from "@/components/ui/button";
${withIcon ? 'import { Download } from "lucide-react";\n' : ''}
export function ButtonDemo() {
  return (
    <Button
      variant="${variant}"
      size="${size}"${disabled ? '\n      disabled' : ''}
    >${withIcon ? '\n      <Download className="mr-2 h-4 w-4" />' : ''}
      ${text}
    </Button>
  );
}`;

      const tailwindCode = `<button 
  class="${variant === 'default' ? 'bg-primary text-white' : 
         variant === 'destructive' ? 'bg-red-500 text-white' : 
         variant === 'outline' ? 'border border-input bg-transparent' :
         variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : 
         variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : 
         ''} ${
           size === 'sm' ? 'h-8 text-xs px-3' : 
           size === 'lg' ? 'h-12 px-6 text-base' : 
           'h-9 px-4 text-sm'
         } rounded-md font-medium shadow inline-flex items-center justify-center${
           disabled ? ' opacity-50 cursor-not-allowed' : ''
         }"${disabled ? ' disabled' : ''}>
  ${withIcon ? '<svg class="mr-2 h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>' : ''}
  ${text}
</button>`;
      
      return { tsx: tsxCode, tailwind: tailwindCode };
    }
    
    if (selectedComponent === 'badge') {
      const { variant, text } = properties;
      
      const tsxCode = `import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return <Badge variant="${variant}">${text}</Badge>;
}`;

      const tailwindCode = `<span class="${
        variant === 'default' ? 'bg-primary text-primary-foreground' :
        variant === 'secondary' ? 'bg-secondary text-secondary-foreground' :
        variant === 'destructive' ? 'bg-destructive text-destructive-foreground' :
        variant === 'outline' ? 'border border-input bg-transparent text-foreground' :
        ''} rounded-md px-2 py-1 text-xs font-medium">
  ${text}
</span>`;
      
      return { tsx: tsxCode, tailwind: tailwindCode };
    }
    
    if (selectedComponent === 'card') {
      const { withHeader, withFooter, title, description } = properties;
      
      const tsxCode = `import {
  Card,${withHeader ? '\n  CardHeader,' : ''}${withHeader ? '\n  CardTitle,' : ''}${withHeader && description ? '\n  CardDescription,' : ''}
  CardContent,${withFooter ? '\n  CardFooter,' : ''}
} from "@/components/ui/card";${withFooter ? '\nimport { Button } from "@/components/ui/button";' : ''}

export function CardDemo() {
  return (
    <Card>
      ${withHeader ? `<CardHeader>
        <CardTitle>${title}</CardTitle>${description ? `\n        <CardDescription>${description}</CardDescription>` : ''}
      </CardHeader>` : ''}
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>${withFooter ? `\n      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>` : ''}
    </Card>
  );
}`;

      const tailwindCode = `<div class="rounded-lg border shadow-sm">
  ${withHeader ? `<div class="p-6 flex flex-col space-y-1.5">
    <h3 class="text-lg font-semibold leading-none">${title}</h3>${description ? `\n    <p class="text-sm text-muted-foreground">${description}</p>` : ''}
  </div>` : ''}
  <div class="p-6">
    <p>Card content goes here</p>
  </div>${withFooter ? `\n  <div class="p-6 flex justify-between items-center border-t">
    <button class="inline-flex items-center justify-center rounded-md border px-4 h-9">Cancel</button>
    <button class="inline-flex items-center justify-center rounded-md bg-primary px-4 h-9 text-white">Save</button>
  </div>` : ''}
</div>`;
      
      return { tsx: tsxCode, tailwind: tailwindCode };
    }
    
    return { tsx: '// Select a component to see code', tailwind: '// Select a component to see code' };
  };
  
  const snippets = generateSnippets();
  
  // Render component based on selected properties
  const renderComponent = () => {
    if (selectedComponent === 'button') {
      const { variant, size, disabled, withIcon, text } = properties;
      
      return (
        <Button
          variant={variant as any}
          size={size as any}
          disabled={disabled}
        >
          {withIcon && <Download className="mr-2 h-4 w-4" />}
          {text}
        </Button>
      );
    }
    
    if (selectedComponent === 'badge') {
      const { variant, text } = properties;
      
      return (
        <Badge variant={variant as any}>
          {text}
        </Badge>
      );
    }
    
    if (selectedComponent === 'card') {
      const { withHeader, withFooter, title, description } = properties;
      
      return (
        <Card className="w-full max-w-md">
          {withHeader && (
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          {withFooter && (
            <div className="flex justify-between p-6 pt-0">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </div>
          )}
        </Card>
      );
    }
    
    return null;
  };
  
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Component Selection */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">1. Select Component</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {Object.entries(components).map(([id, component]) => (
                  <Button
                    key={id}
                    variant={selectedComponent === id ? 'default' : 'outline'}
                    onClick={() => setSelectedComponent(id)}
                    className="justify-start"
                  >
                    {component.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Properties Panel */}
            <div>
              <h3 className="font-medium text-sm mb-4">2. Customize Properties</h3>
              <div className="space-y-4">
                {selectedComponent && components[selectedComponent] && 
                  Object.entries(components[selectedComponent].properties).map(([propName, control]) => (
                    <div key={propName} className="grid gap-2">
                      <Label htmlFor={propName}>{control.label}</Label>
                      
                      {control.type === 'select' && (
                        <Select 
                          value={properties[propName] || control.options?.[0]}
                          onValueChange={(value) => handlePropertyChange(propName, value)}
                        >
                          <SelectTrigger id={propName}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {control.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      {control.type === 'boolean' && (
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={propName} 
                            checked={!!properties[propName]}
                            onCheckedChange={(checked) => handlePropertyChange(propName, checked)}
                          />
                          <Label htmlFor={propName}>{properties[propName] ? 'On' : 'Off'}</Label>
                        </div>
                      )}
                      
                      {control.type === 'text' && (
                        <Input 
                          id={propName} 
                          value={properties[propName] || ''}
                          onChange={(e) => handlePropertyChange(propName, e.target.value)}
                        />
                      )}
                      
                      {control.type === 'range' && (
                        <Slider 
                          id={propName}
                          min={control.min || 0}
                          max={control.max || 100}
                          step={control.step || 1}
                          value={[properties[propName] || control.min || 0]}
                          onValueChange={([value]) => handlePropertyChange(propName, value)}
                        />
                      )}
                    </div>
                  ))
                }
              </div>
            </div>
            
            {/* Preview */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">3. Preview Result</h3>
              <div className="border rounded-md bg-gray-50 min-h-40 flex items-center justify-center p-12">
                {renderComponent()}
              </div>
            </div>
          </div>
          
          {/* Code Snippets */}
          <div className="mt-8">
            <h3 className="font-medium text-sm mb-4">4. Get Code</h3>
            <CodeSnippet 
              tsx={snippets.tsx}
              tailwind={snippets.tailwind}
              caption="Copy and paste this code into your project"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentPlayground;
