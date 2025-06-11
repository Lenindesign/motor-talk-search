import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type ComponentType = 'button' | 'badge' | 'input' | 'card';

interface ComponentProps {
  variant: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  disabled?: boolean;
  [key: string]: any;
}

const Playground = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('button');
  const [componentProps, setComponentProps] = useState<ComponentProps>({
    variant: 'default',
    size: 'md',
    children: 'Click me',
    disabled: false,
  });

  const renderComponent = () => {
    const commonProps = {
      ...componentProps,
      className: 'mt-4',
    };

    switch (selectedComponent) {
      case 'button':
        return <Button {...commonProps}>{componentProps.children}</Button>;
      case 'badge':
        return <Badge {...commonProps}>{componentProps.children || 'Badge'}</Badge>;
      case 'input':
        return <Input {...commonProps} placeholder="Type something..." />;
      case 'card':
        return (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="typography-body">This is a sample card component.</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const componentVariants = {
    button: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    badge: ['default', 'secondary', 'destructive', 'outline'],
    input: ['default', 'search'],
    card: ['default'],
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Component Playground</CardTitle>
          <CardDescription>
            Test and interact with global components in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={selectedComponent} 
            onValueChange={(value) => setSelectedComponent(value as ComponentType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="button">Button</TabsTrigger>
              <TabsTrigger value="badge">Badge</TabsTrigger>
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="card">Card</TabsTrigger>
            </TabsList>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="typography-subtitle mb-4">Properties</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="variant">Variant</Label>
                    <Select
                      value={componentProps.variant}
                      onValueChange={(value) =>
                        setComponentProps({ ...componentProps, variant: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {componentVariants[selectedComponent].map((variant) => (
                          <SelectItem key={variant} value={variant}>
                            {variant.charAt(0).toUpperCase() + variant.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedComponent !== 'card' && (
                    <>
                      <div>
                        <Label htmlFor="size">Size</Label>
                        <Select
                          value={componentProps.size}
                          onValueChange={(value) =>
                            setComponentProps({ ...componentProps, size: value as 'sm' | 'md' | 'lg' })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {['sm', 'md', 'lg'].map((size) => (
                              <SelectItem key={size} value={size}>
                                {size.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="disabled"
                          checked={componentProps.disabled}
                          onCheckedChange={(checked) =>
                            setComponentProps({ ...componentProps, disabled: checked })
                          }
                        />
                        <Label htmlFor="disabled">Disabled</Label>
                      </div>

                      {selectedComponent === 'button' && (
                        <div>
                          <Label htmlFor="button-text">Text</Label>
                          <Input
                            id="button-text"
                            value={componentProps.children as string}
                            onChange={(e) =>
                              setComponentProps({ ...componentProps, children: e.target.value })
                            }
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="typography-subtitle mb-4">Preview</h3>
                <div className="p-6 border rounded-lg bg-background flex justify-center items-center min-h-[200px]">
                  {renderComponent()}
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Playground;
