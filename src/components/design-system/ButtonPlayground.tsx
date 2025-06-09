import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, Download, ExternalLink, Plus, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CodeSnippet from './CodeSnippet';

// Import button variant types from the button component
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

// Extract variant and size types from the buttonVariants
type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonVariant = NonNullable<ButtonVariantProps["variant"]>;
type ButtonSize = NonNullable<ButtonVariantProps["size"]>;

interface ButtonProperties {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  withIcon: boolean;
  text: string;
}

const ButtonPlayground: React.FC = () => {
  // State
  const [buttonProps, setButtonProps] = useState<ButtonProperties>({
    variant: 'solid',
    size: 'md',
    disabled: false,
    withIcon: false,
    text: 'Button'
  });

  // Button variants for the select dropdown
  const buttonVariantOptions: ButtonVariant[] = [
    'solid', 'solid-light', 'outline-black', 'ghost-black',
    'solid-red', 'solid-red-light', 'outline-red', 'ghost-red',
    'solid-primary', 'solid-primary-light', 'outline-primary', 'ghost-primary',
    'outline', 'ghost', 'link', 'minimal'
  ];

  // Button sizes for the select dropdown
  const buttonSizes: ButtonSize[] = [
    'sm', 'md', 'lg', 'xl', 'icon-sm', 'icon', 'icon-lg'
  ];

  // Generate code snippet
  const generateSnippet = () => {
    const { variant, size, disabled, withIcon, text } = buttonProps;
    
    let snippet = `<Button`;
    
    if (variant !== 'solid') {
      snippet += `\n  variant="${variant}"`;
    }
    
    if (size !== 'md') {
      snippet += `\n  size="${size}"`;
    }
    
    if (disabled) {
      snippet += `\n  disabled`;
    }
    
    if (withIcon) {
      snippet += `\n  className="flex items-center gap-2"`;
      snippet += `\n>`;
      snippet += `\n  {withIcon && <Plus className="h-4 w-4" />}`;
      snippet += `\n  ${text}`;
      snippet += `\n</Button>`;
    } else {
      snippet += `\n>`;
      snippet += `\n  ${text}`;
      snippet += `\n</Button>`;
    }
    
    return {
      tsx: snippet,
      tailwind: ''
    };
  };

  // Render button preview
  const renderButtonPreview = () => {
    const { variant, size, disabled, withIcon, text } = buttonProps;
    
    return (
      <Button
        variant={variant as ButtonVariant}
        size={size as ButtonSize}
        disabled={disabled}
        className={withIcon ? "flex items-center gap-2" : ""}
      >
        {withIcon && <Plus className="h-4 w-4" />}
        {text}
      </Button>
    );
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="typography-title">Button Playground</CardTitle>
          <CardDescription className="typography-body-small text-color-neutral-3">
            Customize and test button components with different properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Properties Panel */}
            <div className="space-y-6 md:col-span-1">
              <div className="typography-subtitle mb-4">Properties</div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="variant" className="typography-body-small">Variant</Label>
                  <Select
                    value={buttonProps.variant}
                    onValueChange={(value) => setButtonProps(prev => ({ ...prev, variant: value as ButtonVariant }))}
                  >
                    <SelectTrigger id="variant">
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                      {buttonVariantOptions.map(variant => (
                        <SelectItem key={variant} value={variant}>
                          {variant}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size" className="typography-body-small">Size</Label>
                  <Select
                    value={buttonProps.size}
                    onValueChange={(value) => setButtonProps(prev => ({ ...prev, size: value as ButtonSize }))}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {buttonSizes.map(size => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="text" className="typography-body-small">Button Text</Label>
                  <Input
                    id="text"
                    value={buttonProps.text}
                    onChange={(e) => setButtonProps(prev => ({ ...prev, text: e.target.value }))}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="with-icon"
                    checked={buttonProps.withIcon}
                    onCheckedChange={(checked) => setButtonProps(prev => ({ ...prev, withIcon: checked }))}
                  />
                  <Label htmlFor="with-icon" className="typography-body-small">With Icon</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="disabled"
                    checked={buttonProps.disabled}
                    onCheckedChange={(checked) => setButtonProps(prev => ({ ...prev, disabled: checked }))}
                  />
                  <Label htmlFor="disabled" className="typography-body-small">Disabled</Label>
                </div>
              </div>
            </div>
            
            {/* Preview Panel */}
            <div className="md:col-span-2 space-y-6">
              <div className="typography-subtitle mb-4">Preview</div>
              
              <div className="p-8 border rounded-md flex items-center justify-center bg-color-neutral-8">
                {renderButtonPreview()}
              </div>
              
              <div className="space-y-2">
                <div className="typography-subtitle">Code</div>
                <Tabs defaultValue="tsx">
                  <TabsList>
                    <TabsTrigger value="tsx">TSX</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tsx">
                    <CodeSnippet code={generateSnippet().tsx} language="tsx" />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ButtonPlayground;
